import React, { useState, useEffect } from 'react';
import { Pill, CheckCircle2, Clock, Volume2 } from 'lucide-react';
import { dbStore } from '../../lib/mongoStore';
import { Medication } from '../../types';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useNotification } from '../../context/NotificationContext';

export const ElderMedicationsPage: React.FC = () => {
  const { speak } = useAccessibility();
  const { showToast } = useNotification();
  const elder = dbStore.getElders()[0];
  const [meds, setMeds] = useState<Medication[]>([]);

  const loadMeds = () => {
    if (elder) setMeds(dbStore.getMedications(elder.id));
  };

  useEffect(() => {
    loadMeds();
    const handleUpdate = () => loadMeds();
    window.addEventListener('apnasahara_datachange', handleUpdate);
    return () => window.removeEventListener('apnasahara_datachange', handleUpdate);
  }, [elder]);

  const handleTake = (id: string, name: string) => {
    dbStore.toggleMedicationTaken(id, true);
    speak(`Great job! You have marked ${name} as taken.`);
    showToast('Medicine Taken', `Recorded ${name}`, 'medication');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Your Medications • आपकी दवाइयाँ</h1>
          <p className="text-xs sm:text-sm text-slate-600">Daily pills and doctor's instructions</p>
        </div>
        <button
          onClick={() => speak('Here are your scheduled medications for today. Tap the green button once you take each pill.')}
          className="px-4 py-2 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md"
        >
          <Volume2 className="w-4 h-4" /> Listen
        </button>
      </div>

      <div className="space-y-4">
        {meds.map((med) => (
          <div
            key={med.id}
            className={`p-6 sm:p-7 rounded-3xl border-2 transition-all space-y-4 ${
              med.is_taken_today
                ? 'bg-emerald-50/60 border-emerald-300'
                : 'bg-white border-amber-300 shadow-md ring-2 ring-amber-300/40'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${
                  med.is_taken_today ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  💊
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">{med.name}</h3>
                  <p className="text-sm font-bold text-slate-600 mt-0.5">
                    {med.dosage} • Time: {med.scheduled_time}
                  </p>
                  <p className="text-xs sm:text-sm text-brand-700 font-semibold mt-1">
                    {med.instructions}
                  </p>
                </div>
              </div>

              {med.is_taken_today ? (
                <span className="px-6 py-3.5 rounded-2xl bg-emerald-100 text-emerald-800 font-black text-sm flex items-center gap-2 self-start sm:self-auto">
                  <CheckCircle2 className="w-5 h-5" /> Taken Today ✓
                </span>
              ) : (
                <button
                  onClick={() => handleTake(med.id, med.name)}
                  className="px-7 py-4 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-black text-base shadow-lg shadow-brand-600/30 flex items-center justify-center gap-2 self-stretch sm:self-auto active:scale-95 transition-transform"
                >
                  <CheckCircle2 className="w-5 h-5" /> I Took This Medicine
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
