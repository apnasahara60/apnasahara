import React from 'react';
import { Outlet } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminLayout: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-[100dvh] bg-[#FFFFF0] text-[#17211C] flex flex-col w-full font-serif">
      {/* Admin Status Banner */}
      <div className="bg-[#FFFDD0] border-b border-[#CFB53B]/40 px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-[8px] bg-[#800020] text-[#FFFFF0] flex items-center justify-center font-bold">
              <Shield className="w-4 h-4 text-[#CFB53B]" />
            </div>
            <p className="font-bold text-[#17211C] text-xs sm:text-sm">{user?.name || 'Dr. Ananya Roy'}</p>
            <span className="text-[10px] font-bold text-[#800020] bg-[#FFFFF0] px-2 py-0.5 rounded-full border border-[#800020]/30">
              Operations Director
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#808000] bg-[#FFFFF0] px-3 py-1 rounded-full border border-[#808000]/30">
            <span className="w-2 h-2 rounded-full bg-[#808000] animate-ping" />
            <span>All 6 City Hubs Operational</span>
          </div>
        </div>
      </div>

      {/* Main Outlet - Full Width (No sidebar) */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1280px] w-full mx-auto">
        <Outlet />
      </main>
    </div>
  );
};
