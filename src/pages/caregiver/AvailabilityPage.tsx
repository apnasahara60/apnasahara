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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Shift Availability Management</h1>
          <p className="text-xs text-slate-500">
            Set your weekly working hours and duty preferences for Sector 62 Noida Cluster
          </p>
        </div>

        <button
          onClick={() => showToast('Leave Request Submitted', 'Operations desk has received your leave notification', 'info')}
          className="px-5 py-2.5 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs shadow-sm"
        >
          Request Planned Leave
        </button>
      </div>

      {/* Summary Banner */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Weekly Commitment</span>
          <p className="text-2xl font-black text-slate-900 mt-1">{totalShiftsCount * 4} Hours / Week ({totalShiftsCount} shifts)</p>
          <span className="text-xs font-semibold text-emerald-600">✓ Consistent GDA Sahayak Tier</span>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
          <Clock className="w-6 h-6" />
        </div>
      </div>

      {/* Days Table */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-bold text-base text-slate-900">Weekly Shift Schedule</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 uppercase font-bold">
                <th className="pb-3 pl-2">Day</th>
                <th className="pb-3 text-center">Morning (08 AM - 12 PM)</th>
                <th className="pb-3 text-center">Afternoon (12 PM - 04 PM)</th>
                <th className="pb-3 text-center">Evening (04 PM - 08 PM)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {shifts.map((s, idx) => (
                <tr key={s.day} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 pl-2 font-bold text-slate-900 text-sm">{s.day}</td>
                  <td className="py-4 text-center">
                    <button
                      onClick={() => toggleSlot(idx, 'morning')}
                      className={`px-4 py-1.5 rounded-xl font-bold text-xs transition-colors ${
                        s.morning ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {s.morning ? 'Available ✓' : 'Off'}
                    </button>
                  </td>
                  <td className="py-4 text-center">
                    <button
                      onClick={() => toggleSlot(idx, 'afternoon')}
                      className={`px-4 py-1.5 rounded-xl font-bold text-xs transition-colors ${
                        s.afternoon ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {s.afternoon ? 'Available ✓' : 'Off'}
                    </button>
                  </td>
                  <td className="py-4 text-center">
                    <button
                      onClick={() => toggleSlot(idx, 'evening')}
                      className={`px-4 py-1.5 rounded-xl font-bold text-xs transition-colors ${
                        s.evening ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-400'
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
