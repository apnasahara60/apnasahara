import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarCheck,
  MapPin,
  Clock,
  User,
  PhoneCall,
  CheckCircle2,
  Navigation,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { dbStore } from '../../lib/mongoStore';
import { Visit } from '../../types';

export const AssignedVisitsPage: React.FC = () => {
  const caregiver = dbStore.getCaregivers()[0];
  const [visits, setVisits] = useState<Visit[]>([]);

  useEffect(() => {
    setVisits(dbStore.getVisits(caregiver?.id));
    const handleUpdate = () => setVisits(dbStore.getVisits(caregiver?.id));
    window.addEventListener('apnasahara_datachange', handleUpdate);
    return () => window.removeEventListener('apnasahara_datachange', handleUpdate);
  }, []);

  return (
    <div className="space-y-6 font-serif">
      <div className="border-b border-[#CFB53B]/30 pb-4">
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#008080]">Duty Schedule</span>
        <h1 className="text-2xl font-bold text-[#17211C]">Assigned Visits Roster</h1>
        <p className="text-xs sm:text-sm text-[#17211C]/75 font-sans">
          Your scheduled elder appointments, locations & medical guidance
        </p>
      </div>

      <div className="space-y-4">
        {visits.map((v) => (
          <div
            key={v.id}
            className="art-card p-6 space-y-4 transition-all hover:border-[#CFB53B]"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#CFB53B]/30">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#008080] bg-[#008080]/10 border border-[#008080]/30 px-2.5 py-0.5 rounded-full font-sans">
                  {v.status.replace('_', ' ').toUpperCase()}
                </span>
                <h3 className="text-xl font-bold text-[#17211C] mt-1.5">{v.elder_name}</h3>
                <p className="text-xs text-[#17211C]/70 flex items-center gap-1.5 mt-0.5 font-sans">
                  <MapPin className="w-3.5 h-3.5 text-[#008080]" /> {v.elder_address}
                </p>
              </div>

              <div className="text-left sm:text-right">
                <p className="font-bold text-[#17211C] text-sm font-mono">{v.time_slot}</p>
                <p className="text-xs text-[#17211C]/60 font-sans">{new Date(v.date).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="text-xs text-[#17211C]/75 font-sans">
                <strong className="text-[#008080]">Key Focus:</strong> Vitals check, pill replenishment, light walk & social engagement.
              </div>

              <div className="flex items-center gap-2">
                <Link
                  to="/caregiver/navigation"
                  className="art-btn-secondary px-4 py-2 text-xs flex items-center gap-1.5"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#008080]" /> GPS Route
                </Link>
                <Link
                  to="/caregiver/tasks"
                  className="art-btn-primary px-4 py-2 text-xs flex items-center gap-1.5 shadow-sm"
                >
                  Open Tasks <ArrowRight className="w-3.5 h-3.5 text-[#CFB53B]" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
