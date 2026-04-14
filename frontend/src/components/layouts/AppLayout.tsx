// src/components/layouts/AppLayout.tsx
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, Layers, FolderKanban,
  FileText, MessageSquare, Megaphone, Calendar,
  Settings, LogOut, Bell, ChevronRight
} from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';
import api from '@/lib/api';
import clsx from 'clsx';

const navItems = [
  { to: '/dashboard',     icon: LayoutDashboard, label: 'Tableau de bord' },
  { to: '/members',       icon: Users,            label: 'Membres' },
  { to: '/poles',         icon: Layers,           label: 'Pôles' },
  { to: '/projects',      icon: FolderKanban,     label: 'Projets' },
  { to: '/documents',     icon: FileText,         label: 'Documents' },
  { to: '/messages',      icon: MessageSquare,    label: 'Messages' },
  { to: '/announcements', icon: Megaphone,        label: 'Annonces' },
  { to: '/agenda',        icon: Calendar,         label: 'Agenda' },
];

// Rôles qui peuvent voir certains menus
const adminRoles = ['SUPER_ADMIN', 'SECRETAIRE_GENERAL', 'RESPONSABLE_PAYS'];

export function AppLayout() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout', { refreshToken: useAuthStore.getState().refreshToken });
    } finally {
      logout();
      navigate('/login');
    }
  };

  const roleLabel: Record<string, string> = {
    SUPER_ADMIN: 'Super Admin',
    SECRETAIRE_GENERAL: 'Secrétaire Général',
    RESPONSABLE_PAYS: 'Resp. Pays',
    RESPONSABLE_POLE: 'Resp. Pôle',
    MEMBRE: 'Membre',
    OBSERVATEUR: 'Observateur',
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* ── Sidebar ── */}
      <aside className="w-64 bg-green-900 flex flex-col flex-shrink-0">
        {/* Logo */}
        <div className="px-6 py-5 border-b border-green-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-yellow-400 rounded-lg flex items-center justify-center">
              <span className="text-green-900 font-black text-sm">FDS</span>
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-tight">FDS Platform</p>
              <p className="text-green-300 text-xs">{user?.countryId ? 'Section nationale' : 'Global'}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group',
                isActive
                  ? 'bg-green-700 text-white'
                  : 'text-green-200 hover:bg-green-800 hover:text-white'
              )}
            >
              <Icon size={18} className="flex-shrink-0" />
              <span className="flex-1">{label}</span>
              <ChevronRight size={14} className="opacity-0 group-hover:opacity-50 transition-opacity" />
            </NavLink>
          ))}

          {/* Séparateur admin */}
          {user && adminRoles.includes(user.role) && (
            <>
              <div className="pt-3 pb-1">
                <p className="text-green-500 text-xs font-semibold uppercase tracking-wider px-3">
                  Administration
                </p>
              </div>
              <NavLink
                to="/settings"
                className={({ isActive }) => clsx(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                  isActive ? 'bg-green-700 text-white' : 'text-green-200 hover:bg-green-800 hover:text-white'
                )}
              >
                <Settings size={18} />
                <span>Paramètres</span>
              </NavLink>
            </>
          )}
        </nav>

        {/* Profil utilisateur */}
        <div className="px-3 py-4 border-t border-green-800">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg">
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-green-900 font-bold text-xs">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-green-400 text-xs truncate">
                {roleLabel[user?.role || ''] || user?.role}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="text-green-400 hover:text-red-400 transition-colors"
              title="Se déconnecter"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* ── Contenu principal ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div />
          <div className="flex items-center gap-3">
            <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xs">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
