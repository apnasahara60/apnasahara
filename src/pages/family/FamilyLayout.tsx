import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { AlertTriangle, UserPlus, Heart, Activity } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { dbStore } from '../../lib/mongoStore';

export const FamilyLayout: React.FC = () => {
  const { user } = useAuth();
  const [elders, setElders] = useState(dbStore.getElders());
  const userElder = elders.find((e) => e.family_user_id === user?.id);
  const [selectedElderId, setSelectedElderId] = useState(userElder?.id || elders[0]?.id || 'elder-1');

  useEffect(() => {
    const updateElders = () => {
      const list = dbStore.getElders();
      setElders(list);
      const uElder = list.find((e) => e.family_user_id === user?.id);
      if (uElder) {
        setSelectedElderId(uElder.id);
      }
    };
    updateElders();
    window.addEventListener('apnasahara_datachange', updateElders);
    return () => window.removeEventListener('apnasahara_datachange', updateElders);
  }, [user]);

  const selectedElder = elders.find((e) => e.id === selectedElderId) || userElder || elders[0];

  return (
    <div className="min-h-[100dvh] bg-[#FFFFF0] text-[#17211C] flex flex-col w-full font-serif">
      {/* Top Elder Context Banner */}
      <div className="bg-[#FFFDD0] border-b border-[#CFB53B]/40 px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="max-w-[1280px] mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-[8px] bg-[#008080]/15 text-[#008080] border border-[#CFB53B]/40 flex items-center justify-center font-bold">
              <Heart className="w-4 h-4 text-[#800020]" />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-[#17211C]/70 uppercase tracking-wider hidden sm:inline">
                Monitored Parent:
              </label>
              <select
                value={selectedElderId}
                onChange={(e) => setSelectedElderId(e.target.value)}
                className="text-xs sm:text-sm font-bold bg-[#FFFFF0] hover:bg-[#FFFFF0]/80 border border-[#CFB53B]/50 rounded-[12px] px-3 py-1.5 text-[#17211C] focus:outline-none focus:ring-2 focus:ring-[#008080] cursor-pointer transition-colors"
              >
                {elders.map((elder) => (
                  <option key={elder.id} value={elder.id}>
                    {elder.name} ({elder.age}y, {elder.city})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#808000] bg-[#FFFFF0] px-3 py-1 rounded-full border border-[#808000]/30">
              <span className="w-2 h-2 rounded-full bg-[#808000] animate-pulse" />
              Live Telemetry Connected
            </span>
            <Link
              to="/family/sos"
              className="py-1.5 px-3.5 rounded-[12px] bg-[#800020] hover:brightness-110 text-[#FFFFF0] border border-[#CFB53B]/40 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-[#CFB53B] animate-pulse" />
              <span>Emergency SOS</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content Area - Full Width */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1280px] w-full mx-auto">
        <Outlet context={{ selectedElder }} />
      </main>
    </div>
  );
};
