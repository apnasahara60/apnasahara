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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Assigned Visits Roster</h1>
        <p className="text-xs text-slate-500">
          Your scheduled elder appointments, locations & medical guidance
        </p>
      </div>

      <div className="space-y-4">
        {visits.map((v) => (
          <div
            key={v.id}
            className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 hover:border-blue-300 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                  {v.status.replace('_', ' ').toUpperCase()}
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-1">{v.elder_name}</h3>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" /> {v.elder_address}
                </p>
              </div>

              <div className="text-left sm:text-right">
                <p className="font-extrabold text-slate-900 text-sm">{v.time_slot}</p>
                <p className="text-xs text-slate-400">{new Date(v.date).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="text-xs text-slate-600">
                <strong>Key Focus:</strong> Vitals check, pill replenishment, light walk & social engagement.
              </div>

              <div className="flex items-center gap-2">
                <Link
                  to="/caregiver/navigation"
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-blue-600" /> GPS Route
                </Link>
                <Link
                  to="/caregiver/tasks"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  Open Tasks <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
