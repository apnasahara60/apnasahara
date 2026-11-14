import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { AlertTriangle, UserPlus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { dbStore } from '../../lib/supabase';

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
    <div className="min-h-screen bg-slate-50 flex flex-col w-full">
      {/* Top Elder Context Banner */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-xl">👴</span>
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:inline">
                Monitored Parent:
              </label>
              <select
                value={selectedElderId}
                onChange={(e) => setSelectedElderId(e.target.value)}
                className="text-xs sm:text-sm font-bold bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded-xl px-3 py-1.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer transition-colors"
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
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Telemetry Connected
            </span>
            <Link
              to="/family/sos"
              className="py-1 px-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-red-600 animate-pulse" />
              Emergency SOS
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content Area - Full Width (No sidebar) */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
        <Outlet context={{ selectedElder }} />
      </main>
    </div>
  );
};
