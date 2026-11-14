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
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { dbStore } from '../../lib/mongoStore';
import { Visit } from '../../types';
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
    <div className="space-y-6 font-serif">
      {/* Top Welcome Banner */}
      <div className="relative art-card p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 overflow-hidden">
        
        

        <div className="flex items-center gap-4">
          <img
            src={caregiver?.avatar_url || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'}
            alt="Caregiver"
            className="w-16 h-16 rounded-art object-cover border-2 border-[#CFB53B] shadow-sm"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-[#17211C]">Welcome, {caregiver?.name}!</h1>
              <span className="text-xs font-bold px-3 py-0.5 rounded-full bg-[#808000]/15 text-[#808000] border border-[#808000]/30 flex items-center gap-1.5 font-sans">
                <span className="w-1.5 h-1.5 rounded-full bg-[#808000] animate-pulse" />
                Active on Duty
              </span>
            </div>
            <p className="text-xs text-[#17211C]/70 mt-1 font-sans flex items-center gap-2">
              <span>General Duty Attendant • Sector 62 Noida</span>
              <span className="inline-flex items-center gap-1 text-[#CFB53B] font-bold">
                <Star className="w-3.5 h-3.5 fill-[#CFB53B]" /> {caregiver?.rating || 4.9} Score
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/caregiver/navigation"
            className="art-btn-primary px-5 py-2.5 flex items-center gap-1.5 text-xs shadow-md"
          >
            <Navigation className="w-3.5 h-3.5 text-[#CFB53B]" />
            Turn-by-Turn GPS
          </Link>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="art-card p-5 space-y-1">
          <span className="text-xs font-bold text-[#008080] uppercase tracking-wider">Today's Visits</span>
          <p className="text-3xl font-bold text-[#17211C] font-mono">{visits.length}</p>
          <span className="text-[11px] text-[#008080] font-semibold font-sans">1 En Route, 1 Completed</span>
        </div>

        <div className="art-card p-5 space-y-1">
          <span className="text-xs font-bold text-[#008080] uppercase tracking-wider">Attendance Hours</span>
          <p className="text-3xl font-bold text-[#17211C] font-mono">4.5 <span className="text-xs text-[#17211C]/50 font-normal font-sans">hrs</span></p>
          <span className="text-[11px] text-[#808000] font-semibold font-sans">Shift: 09:00 AM - 05:00 PM</span>
        </div>

        <div className="art-card p-5 space-y-1">
          <span className="text-xs font-bold text-[#008080] uppercase tracking-wider">Feedback Rating</span>
          <div className="flex items-center gap-1">
            <span className="text-3xl font-bold text-[#17211C] font-mono">{caregiver?.rating || 4.9}</span>
            <Star className="w-5 h-5 fill-[#CFB53B] text-[#CFB53B]" />
          </div>
          <span className="text-[11px] text-[#CFB53B] font-semibold font-sans">Top 5% Sahayak Score</span>
        </div>

        <div className="art-card p-5 space-y-1">
          <span className="text-xs font-bold text-[#008080] uppercase tracking-wider">Verification Status</span>
          <p className="text-lg font-bold text-[#808000] flex items-center gap-1.5 mt-1 font-sans">
            <ShieldCheck className="w-5 h-5 text-[#808000]" /> 100% Cleared
          </p>
          <span className="text-[11px] text-[#17211C]/60 font-sans">Police & Medical Certified</span>
        </div>
      </div>

      {/* Primary Active Assignment Card */}
      {activeVisit && (
        <div className="relative art-card p-6 sm:p-8 space-y-6">
          
          

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#CFB53B]/30">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#008080] bg-[#008080]/10 border border-[#008080]/30 px-3 py-1 rounded-full font-sans">
                Current Active Assignment
              </span>
              <h2 className="text-2xl font-bold text-[#17211C] mt-2">
                Visit with {activeVisit.elder_name}
              </h2>
              <p className="text-xs text-[#17211C]/70 flex items-center gap-1.5 mt-1 font-sans">
                <MapPin className="w-3.5 h-3.5 text-[#008080]" /> {activeVisit.elder_address}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1 rounded-art text-xs font-bold uppercase bg-[#FFFDD0] border border-[#CFB53B] text-[#17211C] font-mono">
                {activeVisit.status.replace('_', ' ')}
              </span>
            </div>
          </div>

          {/* Action Triggers: Check-in, Start, Complete */}
          <div className="flex flex-wrap items-center gap-3">
            {activeVisit.status === 'scheduled' && (
              <button
                onClick={() => handleQuickStatusChange('en_route')}
                className="art-btn-primary px-6 py-3 flex items-center gap-2 text-xs shadow-md"
              >
                <Navigation className="w-4 h-4 text-[#CFB53B]" /> Start Travel (Mark En Route)
              </button>
            )}

            {activeVisit.status === 'en_route' && (
              <button
                onClick={() => handleQuickStatusChange('in_progress')}
                className="px-6 py-3 rounded-art bg-[#808000] hover:bg-[#686800] text-[#FFFFF0] font-bold text-xs shadow-md border border-[#CFB53B]/50 flex items-center gap-2 transition-all"
              >
                <CheckCircle2 className="w-4 h-4 text-[#FFFDD0]" /> GPS Check-in at Residence
              </button>
            )}

            {activeVisit.status === 'in_progress' && (
              <button
                onClick={() => handleQuickStatusChange('completed')}
                className="art-btn-primary px-6 py-3 flex items-center gap-2 text-xs shadow-md"
              >
                <CheckCircle2 className="w-4 h-4 text-[#CFB53B]" /> Complete Visit & Check-out
              </button>
            )}

            <Link
              to="/caregiver/tasks"
              className="art-btn-secondary px-5 py-3 flex items-center gap-2 text-xs"
            >
              <CheckSquare className="w-4 h-4 text-[#008080]" /> Open Task Checklist ({activeVisit.tasks.length} tasks)
            </Link>

            <Link
              to="/caregiver/documentation"
              className="art-btn-secondary px-5 py-3 flex items-center gap-2 text-xs"
            >
              Record Vitals Log →
            </Link>
          </div>

          {/* Tasks snippet */}
          <div className="space-y-2 pt-2 border-t border-[#CFB53B]/20">
            <h4 className="text-xs font-bold text-[#008080] uppercase tracking-wider">Visit Checklist Preview</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {activeVisit.tasks.slice(0, 4).map((t) => (
                <div key={t.id} className="p-3 rounded-art bg-[#FFFDD0] border border-[#CFB53B]/40 flex items-center gap-2.5 text-xs text-[#17211C] font-sans">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    t.completed ? 'bg-[#808000] text-[#FFFFF0]' : 'border-2 border-[#CFB53B]'
                  }`}>
                    {t.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                  <span className={t.completed ? 'line-through text-[#17211C]/50' : 'font-semibold'}>{t.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
