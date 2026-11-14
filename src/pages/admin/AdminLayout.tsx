import React from 'react';
import { Outlet } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminLayout: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col w-full">
      {/* Admin Status Banner */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center font-bold">
              <Shield className="w-4 h-4" />
            </div>
            <p className="font-bold text-slate-900 text-xs sm:text-sm">{user?.name || 'Dr. Ananya Roy'}</p>
            <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
              Operations Director
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>All 6 City Hubs Operational</span>
          </div>
        </div>
      </div>

      {/* Main Outlet - Full Width (No sidebar) */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
        <Outlet />
      </main>
    </div>
  );
};
