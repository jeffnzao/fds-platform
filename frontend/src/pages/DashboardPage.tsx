// src/pages/DashboardPage.tsx
import { useQuery } from '@tanstack/react-query';
import { Users, Layers, FolderKanban, Megaphone, Globe, TrendingUp } from 'lucide-react';
import api from '@/lib/api';
import { useAuthStore } from '@/store/auth.store';

const StatCard = ({ icon: Icon, label, value, color }: any) => (
  <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
      <Icon size={22} className="text-white" />
    </div>
    <div>
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="text-2xl font-bold text-gray-900">{value ?? '—'}</p>
    </div>
  </div>
);

export function DashboardPage() {
  const { user } = useAuthStore();

  const { data: stats } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: () => api.get('/users?stats=true').then(r => r.data).catch(() => null),
  });

  const { data: announcements } = useQuery({
    queryKey: ['announcements-recent'],
    queryFn: () => api.get('/announcements?limit=5').then(r => r.data).catch(() => ({ items: [] })),
  });

  const isSuperAdmin = ['SUPER_ADMIN', 'SECRETAIRE_GENERAL'].includes(user?.role || '');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Bonjour, {user?.firstName} 👋
        </h1>
        <p className="text-gray-500 mt-1">
          {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users}        label="Membres actifs"  value={stats?.membersCount}   color="bg-green-600" />
        <StatCard icon={Globe}        label="Pays actifs"     value={stats?.countriesCount} color="bg-blue-500" />
        <StatCard icon={Layers}       label="Pôles"           value={stats?.polesCount}     color="bg-purple-500" />
        <StatCard icon={FolderKanban} label="Projets en cours" value={stats?.projectsCount} color="bg-yellow-500" />
      </div>

      {/* Contenu selon le rôle */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Annonces récentes */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <Megaphone size={18} className="text-green-600" />
              Dernières annonces
            </h2>
          </div>
          <div className="divide-y divide-gray-50">
            {announcements?.items?.length === 0 && (
              <p className="text-gray-400 text-sm text-center py-8">Aucune annonce pour l'instant</p>
            )}
            {announcements?.items?.map((a: any) => (
              <div key={a.id} className="px-5 py-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{a.title}</p>
                    <p className="text-gray-500 text-xs mt-0.5 line-clamp-2">{a.content}</p>
                  </div>
                  {a.isPinned && (
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full flex-shrink-0">
                      Épinglé
                    </span>
                  )}
                </div>
                <p className="text-gray-400 text-xs mt-2">
                  {a.author?.firstName} {a.author?.lastName} —{' '}
                  {new Date(a.createdAt).toLocaleDateString('fr-FR')}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Accès rapides */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <TrendingUp size={18} className="text-green-600" />
              Accès rapides
            </h2>
          </div>
          <div className="p-4 space-y-2">
            {[
              { label: 'Voir les projets', href: '/projects', color: 'bg-green-50 text-green-700 hover:bg-green-100' },
              { label: 'Bibliothèque docs', href: '/documents', color: 'bg-blue-50 text-blue-700 hover:bg-blue-100' },
              { label: 'Fil de discussion', href: '/messages', color: 'bg-purple-50 text-purple-700 hover:bg-purple-100' },
              { label: 'Agenda', href: '/agenda', color: 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100' },
              ...(isSuperAdmin ? [{ label: 'Gérer les membres', href: '/members', color: 'bg-red-50 text-red-700 hover:bg-red-100' }] : []),
            ].map(({ label, href, color }) => (
              <a key={href} href={href}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition ${color}`}>
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
