import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  Car,
  Phone,
  ShieldCheck,
  Star,
  Clock,
  MapPin,
  CheckCircle2,
  Calendar,
  AlertCircle,
  MessageCircle,
  Award
} from 'lucide-react';
import { dbStore } from '../../lib/supabase';
import { ElderProfile, Visit, CaregiverProfile } from '../../types';
import { LiveMapTracker } from '../../components/maps/LiveMapTracker';
import { useNotification } from '../../context/NotificationContext';

export const CaregiverTrackingPage: React.FC = () => {
  const context = useOutletContext<{ selectedElder?: ElderProfile }>();
  const elder = context?.selectedElder || dbStore.getElders()[0];
  const { showToast } = useNotification();

  const [visits, setVisits] = useState<Visit[]>([]);
  const [caregiver, setCaregiver] = useState<CaregiverProfile | null>(null);

  useEffect(() => {
    if (!elder) return;
    const vList = dbStore.getVisits(undefined, elder.id);
    setVisits(vList);

    const activeVisit = vList[0];
    if (activeVisit) {
      const c = dbStore.getCaregivers().find(cg => cg.id === activeVisit.caregiver_id) || dbStore.getCaregivers()[0];
      setCaregiver(c);
    }

    const handleUpdate = () => {
      const updatedVisits = dbStore.getVisits(undefined, elder.id);
      setVisits(updatedVisits);
    };

    window.addEventListener('apnasahara_datachange', handleUpdate);
    return () => window.removeEventListener('apnasahara_datachange', handleUpdate);
  }, [elder]);

  const activeVisit = visits[0];

  const handleCallCaregiver = () => {
    showToast('Calling Caregiver', `Dialing ${activeVisit?.caregiver_name} (${activeVisit?.caregiver_phone})`, 'info');
    window.open(`tel:${activeVisit?.caregiver_phone}`, '_self');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Caregiver Live Tracking</h1>
          <p className="text-xs text-slate-500">
            Real-time route & companion arrival updates for <strong>{elder?.name}</strong>
          </p>
        </div>

        {activeVisit && (
          <button
            onClick={handleCallCaregiver}
            className="px-5 py-2.5 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-md shadow-brand-600/30 flex items-center justify-center gap-2 transition-transform hover:scale-105"
          >
            <Phone className="w-4 h-4" />
            Call Caregiver ({activeVisit.caregiver_name.split(' ')[0]})
          </button>
        )}
      </div>

      {/* Main Grid: Interactive Map Route & Caregiver Profile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Map */}
        <div className="lg:col-span-8 space-y-4">
          <LiveMapTracker
            elderName={elder.name}
            elderAddress={elder.address}
            caregiverName={activeVisit?.caregiver_name}
            caregiverPhone={activeVisit?.caregiver_phone}
            caregiverStatus={activeVisit?.status}
            batteryLevel={elder.battery_level}
            showCaregiverRoute={true}
            onCallCaregiver={handleCallCaregiver}
          />
        </div>

        {/* Right Caregiver Card & Visit Checklist */}
        <div className="lg:col-span-4 space-y-6">
          {/* Caregiver Profile Card */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-4">
              <img
                src={activeVisit?.caregiver_avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'}
                alt={activeVisit?.caregiver_name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-brand-500 shadow-md"
              />
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">{activeVisit?.caregiver_name}</h3>
                <p className="text-xs text-slate-500 font-medium">Certified General Duty Attendant</p>
                <div className="flex items-center gap-1.5 mt-1 text-xs">
                  <span className="flex items-center text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> 4.9
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-600 font-medium">{caregiver?.experience_years || 6} yrs exp.</span>
                </div>
              </div>
            </div>

            {/* Verification Badges */}
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Verified & Background Cleared
              </div>
              <p className="text-[11px] text-emerald-700 leading-relaxed">
                ✓ Aadhaar e-KYC Verified<br />
                ✓ Delhi Police Criminal Record Clearance<br />
                ✓ American Heart Association BLS/CPR Certified
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Visit Time Window:</span>
                <span className="font-bold text-slate-900">{activeVisit?.time_slot}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Caregiver Phone:</span>
                <a href={`tel:${activeVisit?.caregiver_phone}`} className="font-bold text-brand-600 hover:underline">
                  {activeVisit?.caregiver_phone}
                </a>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">Live Status:</span>
                <span className="font-extrabold text-brand-600 uppercase">
                  {activeVisit?.status.replace('_', ' ')}
                </span>
              </div>
            </div>
          </div>

          {/* Today's Tasks Checklist */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <h4 className="font-bold text-slate-900 text-sm">Scheduled Visit Tasks</h4>
            <div className="space-y-2">
              {activeVisit?.tasks.map((task) => (
                <div
                  key={task.id}
                  className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5 text-xs"
                >
                  <div className={`w-4 h-4 rounded-full mt-0.5 flex items-center justify-center shrink-0 ${
                    task.completed ? 'bg-emerald-500 text-white' : 'border border-slate-300'
                  }`}>
                    {task.completed && <CheckCircle2 className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <div>
                    <p className={`font-medium ${task.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                      {task.title}
                    </p>
                    {task.completed_at && (
                      <span className="text-[10px] text-emerald-600 font-bold">Done at {task.completed_at}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
