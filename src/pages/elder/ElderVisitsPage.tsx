import React from 'react';
import { Calendar, PhoneCall, CheckCircle2, Volume2, Clock, ShieldCheck } from 'lucide-react';
import { dbStore } from '../../lib/mongoStore';
import { useAccessibility } from '../../context/AccessibilityContext';
import { OrnateCorner } from '../../components/art-nouveau/ArtNouveauDecorations';

export const ElderVisitsPage: React.FC = () => {
  const { speak } = useAccessibility();
  const elder = dbStore.getElders()[0];
  const visits = dbStore.getVisits(undefined, elder?.id);
  const todayVisit = visits[0];

  return (
    <div className="space-y-6 font-serif">
      <div className="flex items-center justify-between border-b border-[#CFB53B]/30 pb-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#008080]">Sahayak Caregiver Schedule</span>
          <h1 className="text-2xl font-bold text-[#17211C]">Today's Sahayak Visit • आज की मुलाकात</h1>
          <p className="text-xs sm:text-sm text-[#17211C]/75 font-sans">Your dedicated companion and medical attendant</p>
        </div>
        <button
          onClick={() => speak(`Caregiver Priya Verma is scheduled to visit you at ${todayVisit?.time_slot}. She will check your blood pressure and join you for a morning stroll.`)}
          className="art-btn-primary px-4 py-2 flex items-center gap-1.5 text-xs shadow-md"
        >
          <Volume2 className="w-4 h-4 text-[#CFB53B]" /> Listen
        </button>
      </div>

      {todayVisit ? (
        <div className="relative art-card p-8 space-y-6">
          <OrnateCorner position="top-left" color="#CFB53B" size={36} />
          <OrnateCorner position="top-right" color="#CFB53B" size={36} />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-[#CFB53B]/30">
            <div className="flex items-center gap-5">
              <img
                src={todayVisit.caregiver_avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'}
                alt={todayVisit.caregiver_name}
                className="w-20 h-20 rounded-art object-cover border-2 border-[#CFB53B] shadow-md"
              />
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#808000] bg-[#808000]/10 border border-[#808000]/30 px-3 py-0.5 rounded-full inline-flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#808000]" />
                  Verified Caregiver • प्रमाणित सहायक
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#17211C] mt-1.5">{todayVisit.caregiver_name}</h2>
                <p className="text-sm font-semibold text-[#17211C]/70 font-sans">General Duty Attendant & Nurse</p>
              </div>
            </div>

            <a
              href={`tel:${todayVisit.caregiver_phone}`}
              className="art-btn-primary px-8 py-4 text-base shadow-lg flex items-center justify-center gap-2 self-stretch sm:self-auto"
            >
              <PhoneCall className="w-5 h-5 text-[#CFB53B]" />
              Call Priya Now
            </a>
          </div>

          <div className="p-4 rounded-art bg-[#FFFDD0] border border-[#CFB53B]/60 space-y-1">
            <h4 className="font-bold text-[#17211C] text-xs uppercase tracking-wider">Scheduled Visit Time</h4>
            <p className="text-base font-bold text-[#008080] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#CFB53B]" />
              Today, <span className="font-mono">{todayVisit.time_slot}</span> ({todayVisit.status.replace('_', ' ').toUpperCase()})
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-[#17211C] text-sm">What Priya Will Assist With Today:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {todayVisit.tasks.map((task) => (
                <div key={task.id} className="p-3.5 rounded-art bg-[#FFFFF0] border border-[#CFB53B]/30 flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    task.completed ? 'bg-[#808000] text-[#FFFFF0]' : 'border-2 border-[#CFB53B]'
                  }`}>
                    {task.completed && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-[#17211C] font-sans">{task.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center text-[#17211C]/60 bg-[#FFFFF0] rounded-art border border-[#CFB53B]/40">
          No scheduled visits for today.
        </div>
      )}
    </div>
  );
};
