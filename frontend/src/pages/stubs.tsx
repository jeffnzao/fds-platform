// src/pages/stubs.tsx — Pages à développer (stubs)
import { Users, Layers, FolderKanban, FileText, MessageSquare, Megaphone, Calendar, Settings } from 'lucide-react';

const StubPage = ({ icon: Icon, title, desc }: { icon: any; title: string; desc: string }) => (
  <div className="flex flex-col items-center justify-center h-64 text-center">
    <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mb-4">
      <Icon size={28} className="text-green-600" />
    </div>
    <h2 className="text-xl font-bold text-gray-900">{title}</h2>
    <p className="text-gray-400 text-sm mt-2 max-w-xs">{desc}</p>
    <span className="mt-4 text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
      En cours de développement
    </span>
  </div>
);

export const MembersPage       = () => <StubPage icon={Users}        title="Membres"          desc="Liste, gestion et validation des membres par pays et pôle." />;
export const PolesPage         = () => <StubPage icon={Layers}       title="Pôles"            desc="Pôles thématiques, équipes et responsables." />;
export const ProjectsPage      = () => <StubPage icon={FolderKanban} title="Projets"          desc="Suivi des projets, tâches et indicateurs d'avancement." />;
export const DocumentsPage     = () => <StubPage icon={FileText}     title="Documents"        desc="Bibliothèque de fichiers partagés par pôle ou pays." />;
export const MessagesPage      = () => <StubPage icon={MessageSquare} title="Messages"        desc="Messagerie interne par pôle en temps réel." />;
export const AnnouncementsPage = () => <StubPage icon={Megaphone}    title="Annonces"         desc="Diffusion d'annonces ciblées par pays, pôle ou tous." />;
export const AgendaPage        = () => <StubPage icon={Calendar}     title="Agenda"           desc="Calendrier des réunions, événements et actions." />;
export const SettingsPage      = () => <StubPage icon={Settings}     title="Paramètres"       desc="Configuration de la plateforme et gestion des accès." />;
export const RegisterPage      = () => (
  <div className="space-y-4">
    <div>
      <h2 className="text-2xl font-bold text-gray-900">Inscription</h2>
      <p className="text-sm text-gray-500 mt-1">Rejoindre le FDS</p>
    </div>
    <p className="text-sm text-gray-600 bg-blue-50 border border-blue-100 rounded-lg p-3">
      Les inscriptions sont validées manuellement par un responsable. Vous recevrez un email de confirmation.
    </p>
    <p className="text-center text-sm text-gray-500">
      Formulaire d'inscription — <a href="/login" className="text-green-700 font-medium">Se connecter</a>
    </p>
  </div>
);
