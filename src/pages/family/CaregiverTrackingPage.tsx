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
    <div className="space-y-6 font-serif text-[#17211C]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#CFB53B]/30 pb-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#008080]">
            Attendant Coordination
          </span>
          <h1 className="text-3xl font-bold text-[#17211C] tracking-tight">Caregiver Live Tracking</h1>
          <p className="text-xs text-[#17211C]/70 mt-0.5">
            Real-time route & companion arrival updates for <strong>{elder?.name}</strong>
          </p>
        </div>

        {activeVisit && (
          <button
            onClick={handleCallCaregiver}
            className="px-5 py-2.5 rounded-[12px] bg-[#008080] hover:brightness-90 text-[#FFFFF0] font-semibold text-xs shadow-md shadow-[#008080]/20 flex items-center justify-center gap-2 transition-all active:translate-y-[1px]"
          >
            <Phone className="w-4 h-4 text-[#CFB53B]" />
            <span>Call Caregiver ({activeVisit.caregiver_name.split(' ')[0]})</span>
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
          <div className="p-6 rounded-[12px] bg-[#FFFFF0] border border-[#CFB53B]/40 shadow-[0_2px_12px_rgba(23,33,28,0.05)] space-y-4 relative overflow-hidden">
            

            <div className="flex items-center gap-4">
              <img
                src={activeVisit?.caregiver_avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'}
                alt={activeVisit?.caregiver_name}
                className="w-16 h-16 rounded-[12px] object-cover border-2 border-[#008080] shadow-sm"
              />
              <div>
                <h3 className="font-bold text-[#17211C] text-base">{activeVisit?.caregiver_name}</h3>
                <p className="text-xs text-[#008080] font-semibold">Certified General Duty Attendant</p>
                <div className="flex items-center gap-1.5 mt-1 text-xs">
                  <span className="flex items-center text-[#CFB53B] font-bold">
                    <Star className="w-3.5 h-3.5 fill-[#CFB53B] text-[#CFB53B]" /> 4.9
                  </span>
                  <span className="text-[#17211C]/40">•</span>
                  <span className="text-[#17211C]/70 font-medium">{caregiver?.experience_years || 6} yrs exp.</span>
                </div>
              </div>
            </div>

            {/* Verification Badges */}
            <div className="p-3.5 rounded-[12px] bg-[#FFFDD0] border border-[#CFB53B]/50 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#808000]">
                <ShieldCheck className="w-4 h-4 text-[#808000]" />
                <span>Verified & Background Cleared</span>
              </div>
              <p className="text-[11px] text-[#17211C]/80 leading-relaxed">
                • Aadhaar e-KYC Verified<br />
                • Delhi Police Criminal Record Clearance<br />
                • AHA Basic Life Support / CPR Certified
              </p>
            </div>

            <div className="space-y-2 text-xs text-[#17211C]">
              <div className="flex justify-between py-1.5 border-b border-[#CFB53B]/20">
                <span className="text-[#17211C]/70">Visit Time Window:</span>
                <span className="font-bold text-[#17211C]">{activeVisit?.time_slot}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#CFB53B]/20">
                <span className="text-[#17211C]/70">Caregiver Phone:</span>
                <a href={`tel:${activeVisit?.caregiver_phone}`} className="font-bold text-[#008080] hover:underline font-mono">
                  {activeVisit?.caregiver_phone}
                </a>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-[#17211C]/70">Live Status:</span>
                <span className="font-bold text-[#008080] font-mono uppercase bg-[#FFFDD0] px-2 py-0.5 rounded border border-[#CFB53B]/30">
                  {activeVisit?.status.replace('_', ' ')}
                </span>
              </div>
            </div>
          </div>

          {/* Today's Tasks Checklist */}
          <div className="p-6 rounded-[12px] bg-[#FFFFF0] border border-[#CFB53B]/40 shadow-[0_2px_12px_rgba(23,33,28,0.05)] space-y-3">
            <h4 className="font-bold text-[#17211C] text-sm">Scheduled Visit Tasks</h4>
            <div className="space-y-2">
              {activeVisit?.tasks.map((task) => (
                <div
                  key={task.id}
                  className="p-3 rounded-[8px] bg-[#FFFDD0]/50 border border-[#CFB53B]/30 flex items-start gap-2.5 text-xs"
                >
                  <div className={`w-4 h-4 rounded-full mt-0.5 flex items-center justify-center shrink-0 ${
                    task.completed ? 'bg-[#008080] text-[#FFFFF0]' : 'border border-[#CFB53B]'
                  }`}>
                    {task.completed && <CheckCircle2 className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <div>
                    <p className={`font-medium ${task.completed ? 'line-through text-[#17211C]/40' : 'text-[#17211C]'}`}>
                      {task.title}
                    </p>
                    {task.completed_at && (
                      <span className="text-[10px] text-[#808000] font-bold font-mono">Done at {task.completed_at}</span>
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
