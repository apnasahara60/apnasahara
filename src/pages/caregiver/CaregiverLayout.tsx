import React from 'react';
import { Outlet } from 'react-router-dom';
import { dbStore } from '../../lib/mongoStore';

export const CaregiverLayout: React.FC = () => {
  const caregiver = dbStore.getCaregivers()[0];

  return (
    <div className="min-h-[100dvh] bg-[#FFFFF0] text-[#17211C] flex flex-col w-full font-serif">
      {/* Caregiver Status Banner */}
      <div className="bg-[#FFFDD0] border-b border-[#CFB53B]/40 px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={caregiver?.avatar_url || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80'}
              alt="Caregiver"
              className="w-8 h-8 rounded-[8px] object-cover border border-[#CFB53B]"
            />
            <div className="flex items-center gap-2">
              <p className="font-bold text-[#17211C] text-xs sm:text-sm">{caregiver?.name || 'Priya Verma'}</p>
              <span className="text-[10px] font-bold text-[#005F9E] bg-[#FFFFF0] px-2 py-0.5 rounded-full border border-[#005F9E]/30">
                Verified GDA Sahayak
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#808000] bg-[#FFFFF0] px-3 py-1 rounded-full border border-[#808000]/30">
            <span className="w-2 h-2 rounded-full bg-[#808000] animate-pulse" />
            <span>On Duty (Noida Sec 62)</span>
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
