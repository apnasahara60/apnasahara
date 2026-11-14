import React from 'react';
import { Calendar, PhoneCall, CheckCircle2, Volume2, ShieldCheck } from 'lucide-react';
import { dbStore } from '../../lib/supabase';
import { useAccessibility } from '../../context/AccessibilityContext';

export const ElderVisitsPage: React.FC = () => {
  const { speak } = useAccessibility();
  const elder = dbStore.getElders()[0];
  const visits = dbStore.getVisits(undefined, elder?.id);
  const todayVisit = visits[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Today's Sahayak Visit • आज की मुलाकात</h1>
          <p className="text-xs sm:text-sm text-slate-600">Your dedicated companion and medical attendant</p>
        </div>
        <button
          onClick={() => speak(`Caregiver Priya Verma is scheduled to visit you at ${todayVisit?.time_slot}. She will check your blood pressure and join you for a morning stroll.`)}
          className="px-4 py-2 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md"
        >
          <Volume2 className="w-4 h-4" /> Listen
        </button>
      </div>

      {todayVisit ? (
        <div className="p-8 rounded-3xl bg-white border-2 border-amber-200 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-5">
              <img
                src={todayVisit.caregiver_avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'}
                alt={todayVisit.caregiver_name}
                className="w-20 h-20 rounded-3xl object-cover border-4 border-emerald-500 shadow-md"
              />
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                  Verified Caregiver • प्रमाणित सहायक
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">{todayVisit.caregiver_name}</h2>
                <p className="text-sm font-bold text-slate-500">General Duty Attendant & Nurse</p>
              </div>
            </div>

            <a
              href={`tel:${todayVisit.caregiver_phone}`}
              className="px-8 py-4 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-black text-base shadow-lg shadow-brand-600/30 flex items-center justify-center gap-2 self-stretch sm:self-auto"
            >
              <PhoneCall className="w-5 h-5" />
              Call Priya Now
            </a>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
            <h4 className="font-black text-slate-900 text-sm">Scheduled Visit Time</h4>
            <p className="text-base font-bold text-amber-900">
              🕒 Today, {todayVisit.time_slot} ({todayVisit.status.replace('_', ' ').toUpperCase()})
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-black text-slate-900 text-sm">What Priya Will Help You With Today:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {todayVisit.tasks.map((task) => (
                <div key={task.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    task.completed ? 'bg-emerald-500 text-white' : 'border-2 border-slate-300'
                  }`}>
                    {task.completed && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-slate-800">{task.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center text-slate-500 bg-white rounded-3xl border border-amber-200">
          No scheduled visits for today.
        </div>
      )}
    </div>
  );
};
