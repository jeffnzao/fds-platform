// src/App.tsx — Routing principal FDS
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { useAuthStore } from '@/store/auth.store';
import { AuthLayout } from '@/components/layouts/AuthLayout';
import { AppLayout } from '@/components/layouts/AppLayout';

// Pages
import { LoginPage } from '@/pages/auth/LoginPage';

import { DashboardPage } from '@/pages/DashboardPage';
import { MembersPage, PolesPage, ProjectsPage, DocumentsPage, MessagesPage, AnnouncementsPage, AgendaPage, SettingsPage, RegisterPage } from '@/pages/stubs';









const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 min
      retry: 1,
    },
  },
});

// Guard d'authentification
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuthStore();
  return token ? <>{children}</> : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuthStore();
  return token ? <Navigate to="/dashboard" replace /> : <>{children}</>;
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Routes publiques */}
          <Route path="/" element={<PublicRoute><AuthLayout /></PublicRoute>}>
            <Route index element={<Navigate to="/login" replace />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>

          {/* Routes protégées */}
          <Route path="/" element={<PrivateRoute><AppLayout /></PrivateRoute>}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="members" element={<MembersPage />} />
            <Route path="poles" element={<PolesPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="documents" element={<DocumentsPage />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="announcements" element={<AnnouncementsPage />} />
            <Route path="agenda" element={<AgendaPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
