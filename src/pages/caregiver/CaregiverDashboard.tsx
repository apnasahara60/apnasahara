import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarCheck,
  CheckSquare,
  Navigation,
  Clock,
  Star,
  ShieldCheck,
  PhoneCall,
  MapPin,
  ArrowRight,
  Activity,
  CheckCircle2
} from 'lucide-react';
import { dbStore } from '../../lib/mongoStore';
import { Visit, CaregiverProfile } from '../../types';
import { useNotification } from '../../context/NotificationContext';

export const CaregiverDashboard: React.FC = () => {
  const { showToast } = useNotification();
  const caregiver = dbStore.getCaregivers()[0];
  const [visits, setVisits] = useState<Visit[]>([]);

  const loadData = () => {
    const list = dbStore.getVisits(caregiver?.id);
    setVisits(list);
  };

  useEffect(() => {
    loadData();
    const handleUpdate = () => loadData();
    window.addEventListener('apnasahara_datachange', handleUpdate);
    return () => window.removeEventListener('apnasahara_datachange', handleUpdate);
  }, []);

  const activeVisit = visits[0];

  const handleQuickStatusChange = (newStatus: Visit['status']) => {
    if (!activeVisit) return;
    const updated: Visit = { ...activeVisit, status: newStatus };
    if (newStatus === 'in_progress') updated.checked_in_at = new Date().toISOString();
    if (newStatus === 'completed') updated.checked_out_at = new Date().toISOString();

    dbStore.updateVisit(updated);
    showToast('Visit Status Updated', `Status changed to ${newStatus.replace('_', ' ').toUpperCase()}`, 'visit');
  };

  return (
    <div className="space-y-6">
      {/* Top Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={caregiver?.avatar_url || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'}
            alt="Caregiver"
            className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-500 shadow-sm"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-slate-900">Welcome, {caregiver?.name}!</h1>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active on Duty
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              General Duty Attendant • Sector 62 Noida Cluster • Rating ⭐ {caregiver?.rating || 4.9}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/caregiver/navigation"
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-600/30 flex items-center gap-1.5"
          >
            <Navigation className="w-3.5 h-3.5" />
            Turn-by-Turn GPS
          </Link>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-slate-500">Today's Visits</span>
          <p className="text-3xl font-black text-slate-900">{visits.length}</p>
          <span className="text-[11px] text-blue-600 font-bold">1 En Route, 1 Completed</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-slate-500">Attendance Hours</span>
          <p className="text-3xl font-black text-slate-900">4.5 <span className="text-xs text-slate-400 font-normal">hrs</span></p>
          <span className="text-[11px] text-emerald-600 font-bold">Shift: 09:00 AM - 05:00 PM</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-slate-500">Feedback Rating</span>
          <div className="flex items-center gap-1">
            <span className="text-3xl font-black text-slate-900">{caregiver?.rating || 4.9}</span>
            <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
          </div>
          <span className="text-[11px] text-amber-600 font-bold">Top 5% Sahayak Score</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-slate-500">Verification</span>
          <p className="text-xl font-black text-emerald-700 flex items-center gap-1 mt-1">
            <ShieldCheck className="w-5 h-5" /> 100% Cleared
          </p>
          <span className="text-[11px] text-slate-500 font-medium">Police & Medical Certified</span>
        </div>
      </div>

      {/* Primary Active Assignment Card */}
      {activeVisit && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-blue-400 shadow-lg space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Current Active Assignment
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-2">
                Visit with {activeVisit.elder_name}
              </h2>
              <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" /> {activeVisit.elder_address}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-blue-100 text-blue-800">
                {activeVisit.status.replace('_', ' ')}
              </span>
            </div>
          </div>

          {/* Action Triggers: Check-in, Start, Complete */}
          <div className="flex flex-wrap items-center gap-3">
            {activeVisit.status === 'scheduled' && (
              <button
                onClick={() => handleQuickStatusChange('en_route')}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-600/30 flex items-center gap-2"
              >
                <Navigation className="w-4 h-4" /> Start Travel (Mark En Route)
              </button>
            )}

            {activeVisit.status === 'en_route' && (
              <button
                onClick={() => handleQuickStatusChange('in_progress')}
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/30 flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" /> GPS Check-in at Elder Residence
              </button>
            )}

            {activeVisit.status === 'in_progress' && (
              <button
                onClick={() => handleQuickStatusChange('completed')}
                className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md shadow-purple-600/30 flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" /> Complete Visit & Check-out
              </button>
            )}

            <Link
              to="/caregiver/tasks"
              className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-2"
            >
              <CheckSquare className="w-4 h-4" /> Open Task Checklist ({activeVisit.tasks.length} tasks)
            </Link>

            <Link
              to="/caregiver/documentation"
              className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-2"
            >
              Record Vitals Log →
            </Link>
          </div>

          {/* Tasks snippet */}
          <div className="space-y-2 pt-2">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Visit Checklist Preview</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {activeVisit.tasks.slice(0, 4).map((t) => (
                <div key={t.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2.5 text-xs text-slate-700">
                  <div className={`w-3.5 h-3.5 rounded-full ${t.completed ? 'bg-emerald-500' : 'border border-slate-300'}`} />
                  <span className={t.completed ? 'line-through text-slate-400' : 'font-medium'}>{t.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
