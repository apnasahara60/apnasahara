import React from 'react';
import { Outlet } from 'react-router-dom';
import { dbStore } from '../../lib/supabase';

export const CaregiverLayout: React.FC = () => {
  const caregiver = dbStore.getCaregivers()[0];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col w-full">
      {/* Caregiver Status Banner */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={caregiver?.avatar_url || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80'}
              alt="Caregiver"
              className="w-8 h-8 rounded-xl object-cover border-2 border-blue-500"
            />
            <div className="flex items-center gap-2">
              <p className="font-bold text-slate-900 text-xs sm:text-sm">{caregiver?.name || 'Priya Verma'}</p>
              <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                Verified GDA Sahayak
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>On Duty (Noida Sec 62)</span>
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
