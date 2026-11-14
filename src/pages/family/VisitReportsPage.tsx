import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  ClipboardList,
  Star,
  CheckCircle2,
  Calendar,
  Clock,
  User,
  Heart,
  Activity,
  FileCheck2,
  Smile
} from 'lucide-react';
import { dbStore } from '../../lib/supabase';
import { ElderProfile, Visit } from '../../types';
import { useNotification } from '../../context/NotificationContext';

export const VisitReportsPage: React.FC = () => {
  const context = useOutletContext<{ selectedElder?: ElderProfile }>();
  const elder = context?.selectedElder || dbStore.getElders()[0];
  const { showToast } = useNotification();

  const [visits, setVisits] = useState<Visit[]>([]);

  const loadVisits = () => {
    if (elder) {
      setVisits(dbStore.getVisits(undefined, elder.id));
    }
  };

  useEffect(() => {
    loadVisits();
    const handleUpdate = () => loadVisits();
    window.addEventListener('apnasahara_datachange', handleUpdate);
    return () => window.removeEventListener('apnasahara_datachange', handleUpdate);
  }, [elder]);

  const handleRateVisit = (visit: Visit, rating: number) => {
    const updated = { ...visit, family_feedback_rating: rating };
    dbStore.updateVisit(updated);
    showToast('Feedback Submitted', `Thank you for rating this visit ${rating} stars!`, 'info');
  };

  return (
    <div className="space-y-6 font-serif text-[#17211C]">
      {/* Header */}
      <div className="border-b border-[#CFB53B]/30 pb-4">
        <span className="text-xs uppercase font-bold tracking-widest text-[#008080]">
          Verified Documentation
        </span>
        <h1 className="text-3xl font-bold text-[#17211C] tracking-tight">Visit Reports & Attendant Documentation</h1>
        <p className="text-xs text-[#17211C]/70 mt-0.5">
          Detailed post-visit clinical logs, vital readings & checklists recorded for <strong>{elder?.name}</strong>
        </p>
      </div>

      {/* Visits List */}
      <div className="space-y-6">
        {visits.map((v) => (
          <div
            key={v.id}
            className="p-6 rounded-[12px] bg-[#FFFFF0] border border-[#CFB53B]/40 shadow-[0_2px_12px_rgba(23,33,28,0.05)] space-y-5 relative overflow-hidden"
          >
            

            {/* Visit Top Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#CFB53B]/25">
              <div className="flex items-center gap-3">
                <img
                  src={v.caregiver_avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80'}
                  alt={v.caregiver_name}
                  className="w-12 h-12 rounded-[12px] object-cover border border-[#CFB53B]"
                />
                <div>
                  <h3 className="font-bold text-[#17211C] text-base">{v.caregiver_name}</h3>
                  <p className="text-xs text-[#17211C]/70">
                    Visit on <strong>{new Date(v.date).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</strong> • {v.time_slot}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full uppercase font-mono ${
                  v.status === 'completed'
                    ? 'bg-[#808000]/15 text-[#808000] border border-[#808000]/30'
                    : 'bg-[#005F9E]/15 text-[#005F9E] border border-[#005F9E]/30'
                }`}>
                  {v.status.replace('_', ' ')}
                </span>

                {/* Rating component */}
                <div className="flex items-center gap-1 bg-[#FFFDD0] px-3 py-1.5 rounded-[12px] border border-[#CFB53B]/40">
                  <span className="text-[11px] font-semibold text-[#17211C]/70 mr-1">Rating:</span>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRateVisit(v, star)}
                      className="text-[#CFB53B] hover:scale-125 transition-transform"
                    >
                      <Star
                        className={`w-4 h-4 ${
                          (v.family_feedback_rating || 0) >= star ? 'fill-[#CFB53B]' : 'text-[#CFB53B]/30'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Vitals Recorded During this visit */}
            {v.vitals_recorded && Object.keys(v.vitals_recorded).length > 0 && (
              <div className="p-4 rounded-[12px] bg-[#FFFDD0] border border-[#CFB53B]/50 space-y-2">
                <span className="text-xs font-bold text-[#17211C] flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-[#008080]" />
                  Clinical Vitals Recorded During Visit
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="bg-[#FFFFF0] p-3 rounded-[8px] border border-[#CFB53B]/40">
                    <span className="text-[#17211C]/60 block text-[10px]">Blood Pressure</span>
                    <strong className="text-[#17211C] text-sm font-mono">{v.vitals_recorded.bp || '130/85'}</strong>
                  </div>
                  <div className="bg-[#FFFFF0] p-3 rounded-[8px] border border-[#CFB53B]/40">
                    <span className="text-[#17211C]/60 block text-[10px]">Resting Pulse</span>
                    <strong className="text-[#17211C] text-sm font-mono">{v.vitals_recorded.pulse || 74} bpm</strong>
                  </div>
                  <div className="bg-[#FFFFF0] p-3 rounded-[8px] border border-[#CFB53B]/40">
                    <span className="text-[#17211C]/60 block text-[10px]">Oxygen (SpO2)</span>
                    <strong className="text-[#17211C] text-sm font-mono">{v.vitals_recorded.spo2 || 98}%</strong>
                  </div>
                  <div className="bg-[#FFFFF0] p-3 rounded-[8px] border border-[#CFB53B]/40">
                    <span className="text-[#17211C]/60 block text-[10px]">Blood Sugar</span>
                    <strong className="text-[#17211C] text-sm font-mono">{v.vitals_recorded.glucose || 114} mg/dL</strong>
                  </div>
                </div>
              </div>
            )}

            {/* Checklist tasks completed */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#17211C] uppercase tracking-wider">
                Attendant Checklist Execution
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {v.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-3 rounded-[8px] bg-[#FFFDD0]/50 border border-[#CFB53B]/30 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                        task.completed ? 'bg-[#008080] text-[#FFFFF0]' : 'border border-[#CFB53B]'
                      }`}>
                        {task.completed && <CheckCircle2 className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className={`font-medium ${task.completed ? 'text-[#17211C]' : 'text-[#17211C]/60'}`}>
                        {task.title}
                      </span>
                    </div>
                    {task.completed_at && (
                      <span className="text-[10px] text-[#808000] font-bold font-mono shrink-0">{task.completed_at}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Caregiver Observational Notes */}
            {v.notes && (
              <div className="p-4 rounded-[12px] bg-[#FFFDD0] border border-[#CFB53B]/40 text-xs text-[#17211C] space-y-1">
                <span className="font-bold text-[#17211C]">Attendant's Detailed Observations:</span>
                <p className="leading-relaxed opacity-90">{v.notes}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
