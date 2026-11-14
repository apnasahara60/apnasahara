import React, { useState } from 'react';
import { Clock, Calendar, CheckCircle2, ShieldCheck, Plus, AlertCircle } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

export const AvailabilityPage: React.FC = () => {
  const { showToast } = useNotification();

  const [shifts, setShifts] = useState([
    { day: 'Monday', morning: true, afternoon: true, evening: false },
    { day: 'Tuesday', morning: true, afternoon: true, evening: false },
    { day: 'Wednesday', morning: true, afternoon: true, evening: true },
    { day: 'Thursday', morning: true, afternoon: true, evening: false },
    { day: 'Friday', morning: true, afternoon: true, evening: false },
    { day: 'Saturday', morning: true, afternoon: false, evening: false },
    { day: 'Sunday', morning: false, afternoon: false, evening: false },
  ]);

  const toggleSlot = (index: number, slot: 'morning' | 'afternoon' | 'evening') => {
    const updated = [...shifts];
    updated[index][slot] = !updated[index][slot];
    setShifts(updated);
    showToast('Availability Updated', `Updated shift preference for ${updated[index].day}`, 'info');
  };

  const totalShiftsCount = shifts.reduce((acc, curr) => {
    return acc + (curr.morning ? 1 : 0) + (curr.afternoon ? 1 : 0) + (curr.evening ? 1 : 0);
  }, 0);

  return (
    <div className="space-y-6 font-serif">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#CFB53B]/30 pb-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#008080]">Roster Management</span>
          <h1 className="text-2xl font-bold text-[#17211C]">Shift Availability Management</h1>
          <p className="text-xs sm:text-sm text-[#17211C]/75 font-sans">
            Set your weekly working hours and duty preferences for Sector 62 Noida Cluster
          </p>
        </div>

        <button
          onClick={() => showToast('Leave Request Submitted', 'Operations desk has received your leave notification', 'info')}
          className="art-btn-secondary px-5 py-2.5 text-xs shadow-sm"
        >
          Request Planned Leave
        </button>
      </div>

      {/* Summary Banner */}
      <div className="art-card p-6 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-[#008080] uppercase tracking-wider">Weekly Commitment</span>
          <p className="text-2xl font-bold text-[#17211C] mt-1 font-mono">
            {totalShiftsCount * 4} Hours / Week ({totalShiftsCount} shifts)
          </p>
          <span className="text-xs font-semibold text-[#808000] font-sans">✓ Verified General Duty Sahayak Tier</span>
        </div>
        <div className="w-12 h-12 rounded-art bg-[#FFFDD0] border border-[#CFB53B]/60 text-[#008080] flex items-center justify-center font-bold">
          <Clock className="w-6 h-6" />
        </div>
      </div>

      {/* Days Table */}
      <div className="art-card p-6 space-y-4">
        <h3 className="font-bold text-base text-[#17211C]">Weekly Shift Schedule</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-[#CFB53B]/30 text-[#008080] uppercase font-bold text-[11px]">
                <th className="pb-3 pl-2">Day</th>
                <th className="pb-3 text-center">Morning (08 AM - 12 PM)</th>
                <th className="pb-3 text-center">Afternoon (12 PM - 04 PM)</th>
                <th className="pb-3 text-center">Evening (04 PM - 08 PM)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#CFB53B]/20">
              {shifts.map((s, idx) => (
                <tr key={s.day} className="hover:bg-[#FFFDD0]/50 transition-colors">
                  <td className="py-4 pl-2 font-bold text-[#17211C] text-sm font-serif">{s.day}</td>
                  <td className="py-4 text-center">
                    <button
                      onClick={() => toggleSlot(idx, 'morning')}
                      className={`px-4 py-1.5 rounded-art font-bold text-xs transition-colors border ${
                        s.morning
                          ? 'bg-[#808000]/15 text-[#808000] border-[#808000]/40'
                          : 'bg-[#FFFDD0] text-[#17211C]/50 border-[#CFB53B]/30'
                      }`}
                    >
                      {s.morning ? 'Available ✓' : 'Off'}
                    </button>
                  </td>
                  <td className="py-4 text-center">
                    <button
                      onClick={() => toggleSlot(idx, 'afternoon')}
                      className={`px-4 py-1.5 rounded-art font-bold text-xs transition-colors border ${
                        s.afternoon
                          ? 'bg-[#808000]/15 text-[#808000] border-[#808000]/40'
                          : 'bg-[#FFFDD0] text-[#17211C]/50 border-[#CFB53B]/30'
                      }`}
                    >
                      {s.afternoon ? 'Available ✓' : 'Off'}
                    </button>
                  </td>
                  <td className="py-4 text-center">
                    <button
                      onClick={() => toggleSlot(idx, 'evening')}
                      className={`px-4 py-1.5 rounded-art font-bold text-xs transition-colors border ${
                        s.evening
                          ? 'bg-[#808000]/15 text-[#808000] border-[#808000]/40'
                          : 'bg-[#FFFDD0] text-[#17211C]/50 border-[#CFB53B]/30'
                      }`}
                    >
                      {s.evening ? 'Available ✓' : 'Off'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
