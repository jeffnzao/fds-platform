// src/components/layouts/AuthLayout.tsx
import { Outlet } from 'react-router-dom';

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-yellow-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-4">
            <span className="text-2xl font-black text-green-800">FDS</span>
          </div>
          <h1 className="text-white text-xl font-bold">Front Démocratique et Social</h1>
          <p className="text-green-200 text-sm mt-1">Plateforme de gestion interne</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <Outlet />
        </div>

        <p className="text-center text-green-200 text-xs mt-6">
          © {new Date().getFullYear()} FDS — Tous droits réservés
        </p>
      </div>
    </div>
  );
}
