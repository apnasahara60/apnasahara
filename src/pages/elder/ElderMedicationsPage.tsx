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
    <div className="space-y-6 font-serif">
      <div className="flex items-center justify-between border-b border-[#CFB53B]/30 pb-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#008080]">Prescription Schedule</span>
          <h1 className="text-2xl font-bold text-[#17211C]">Your Medications • आपकी दवाइयाँ</h1>
          <p className="text-xs sm:text-sm text-[#17211C]/75 font-sans">Daily pills and doctor's instructions</p>
        </div>
        <button
          onClick={() => speak('Here are your scheduled medications for today. Tap the button once you take each pill.')}
          className="art-btn-primary px-4 py-2 flex items-center gap-1.5 text-xs shadow-md"
        >
          <Volume2 className="w-4 h-4 text-[#CFB53B]" /> Listen
        </button>
      </div>

      <div className="space-y-4">
        {meds.map((med) => (
          <div
            key={med.id}
            className={`p-6 sm:p-7 rounded-art border-2 transition-all space-y-4 ${
              med.is_taken_today
                ? 'bg-[#FFFFF0] border-[#808000]/40 opacity-90'
                : 'art-card-cream border-[#CFB53B] shadow-md ring-2 ring-[#CFB53B]/20'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-art border flex items-center justify-center shrink-0 ${
                  med.is_taken_today
                    ? 'bg-[#808000]/10 border-[#808000]/30 text-[#808000]'
                    : 'bg-[#008080]/10 border-[#CFB53B]/50 text-[#008080]'
                }`}>
                  <Pill className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#17211C]">{med.name}</h3>
                  <p className="text-sm font-semibold text-[#17211C]/75 mt-0.5">
                    {med.dosage} • Scheduled: <span className="font-mono text-[#008080]">{med.scheduled_time}</span>
                  </p>
                  <p className="text-xs sm:text-sm text-[#808000] font-bold mt-1">
                    {med.instructions}
                  </p>
                </div>
              </div>

              {med.is_taken_today ? (
                <span className="px-6 py-3.5 rounded-art bg-[#808000]/15 text-[#808000] border border-[#808000]/40 font-bold text-sm flex items-center gap-2 self-start sm:self-auto font-sans">
                  <CheckCircle2 className="w-5 h-5 text-[#808000]" /> Taken Today ✓
                </span>
              ) : (
                <button
                  onClick={() => handleTake(med.id, med.name)}
                  className="art-btn-primary px-7 py-4 text-base shadow-lg flex items-center justify-center gap-2 self-stretch sm:self-auto active:scale-95 transition-transform"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#CFB53B]" /> I Took This Medicine
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
