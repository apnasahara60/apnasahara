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
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900">Visit Reports & Attendant Documentation</h1>
        <p className="text-xs text-slate-500">
          Detailed post-visit clinical logs, vital readings & checklists recorded for <strong>{elder?.name}</strong>
        </p>
      </div>

      {/* Visits List */}
      <div className="space-y-6">
        {visits.map((v) => (
          <div
            key={v.id}
            className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5"
          >
            {/* Visit Top Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <img
                  src={v.caregiver_avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80'}
                  alt={v.caregiver_name}
                  className="w-12 h-12 rounded-2xl object-cover border border-slate-200"
                />
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">{v.caregiver_name}</h3>
                  <p className="text-xs text-slate-500">
                    Visit on <strong>{new Date(v.date).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</strong> • {v.time_slot}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase ${
                  v.status === 'completed'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {v.status.replace('_', ' ')}
                </span>

                {/* Rating component */}
                <div className="flex items-center gap-1 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                  <span className="text-[11px] font-bold text-slate-500 mr-1">Family Rating:</span>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRateVisit(v, star)}
                      className="text-amber-400 hover:scale-125 transition-transform"
                    >
                      <Star
                        className={`w-4 h-4 ${
                          (v.family_feedback_rating || 0) >= star ? 'fill-amber-400' : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Vitals Recorded During this visit */}
            {v.vitals_recorded && Object.keys(v.vitals_recorded).length > 0 && (
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-emerald-600" />
                  Clinical Vitals Recorded During Visit
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="bg-white p-2.5 rounded-xl border border-emerald-200">
                    <span className="text-slate-500 block text-[10px]">Blood Pressure</span>
                    <strong className="text-slate-900 text-sm">{v.vitals_recorded.bp || '130/85'}</strong>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-emerald-200">
                    <span className="text-slate-500 block text-[10px]">Resting Pulse</span>
                    <strong className="text-slate-900 text-sm">{v.vitals_recorded.pulse || 74} bpm</strong>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-emerald-200">
                    <span className="text-slate-500 block text-[10px]">Oxygen (SpO2)</span>
                    <strong className="text-slate-900 text-sm">{v.vitals_recorded.spo2 || 98}%</strong>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-emerald-200">
                    <span className="text-slate-500 block text-[10px]">Blood Sugar</span>
                    <strong className="text-slate-900 text-sm">{v.vitals_recorded.glucose || 114} mg/dL</strong>
                  </div>
                </div>
              </div>
            )}

            {/* Checklist tasks completed */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Attendant Checklist Execution
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {v.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                        task.completed ? 'bg-emerald-500 text-white' : 'border border-slate-300'
                      }`}>
                        {task.completed && <CheckCircle2 className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className={`font-medium ${task.completed ? 'text-slate-800' : 'text-slate-500'}`}>
                        {task.title}
                      </span>
                    </div>
                    {task.completed_at && (
                      <span className="text-[10px] text-emerald-600 font-bold shrink-0">{task.completed_at}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Caregiver Observational Notes */}
            {v.notes && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                <span className="font-bold text-slate-900">Attendant's Detailed Observations:</span>
                <p className="leading-relaxed">{v.notes}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
