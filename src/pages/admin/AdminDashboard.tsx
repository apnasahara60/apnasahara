import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  ShieldCheck,
  AlertTriangle,
  CreditCard,
  TrendingUp,
  Activity,
  ArrowRight,
  Clock,
  CheckCircle2,
  PhoneCall,
  MapPin,
  RefreshCw
} from 'lucide-react';
import { dbStore } from '../../lib/mongoStore';
import { SosAlert, CaregiverProfile, UserProfile } from '../../types';

export const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [caregivers, setCaregivers] = useState<CaregiverProfile[]>([]);
  const [sosAlerts, setSosAlerts] = useState<SosAlert[]>([]);

  const loadData = () => {
    setUsers(dbStore.getUsers());
    setCaregivers(dbStore.getCaregivers());
    setSosAlerts(dbStore.getSosAlerts());
  };

  useEffect(() => {
    loadData();
    const handleUpdate = () => loadData();
    window.addEventListener('apnasahara_datachange', handleUpdate);
    return () => window.removeEventListener('apnasahara_datachange', handleUpdate);
  }, []);

  const activeSosCount = sosAlerts.filter(a => a.status === 'triggered' || a.status === 'dispatched').length;
  const pendingCaregivers = caregivers.filter(c => c.verification_status === 'pending');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">National Operations Command</h1>
          <p className="text-xs text-slate-500">
            Real-time emergency monitoring, caregiver dispatch & platform metrics
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            Control Desk Live
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-slate-500">Active Families</span>
          <p className="text-3xl font-black text-slate-900">1,248</p>
          <span className="text-[11px] text-emerald-600 font-bold">↑ +14% this month</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-slate-500">Verified Sahayaks</span>
          <p className="text-3xl font-black text-slate-900">{caregivers.length * 110 + 42}</p>
          <span className="text-[11px] text-blue-600 font-bold">{pendingCaregivers.length} Pending Approvals</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-slate-500">Monthly Run Rate</span>
          <p className="text-3xl font-black text-slate-900">₹1.12 Cr</p>
          <span className="text-[11px] text-purple-600 font-bold">98.2% Renewal Retention</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-slate-500">Avg. SOS Dispatch</span>
          <p className="text-3xl font-black text-brand-600">7.4 <span className="text-xs text-slate-400 font-normal">mins</span></p>
          <span className="text-[11px] text-slate-500 font-medium">SLA: &lt; 10 mins</span>
        </div>
      </div>

      {/* Emergency Radar Alert Panel */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900">Live SOS Dispatch Queue</h3>
              <p className="text-xs text-slate-500">{activeSosCount} Active Incident Alerts</p>
            </div>
          </div>
          <Link
            to="/admin/emergencies"
            className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1"
          >
            Emergency Command Room <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="space-y-3">
          {sosAlerts.slice(0, 3).map((a) => (
            <div
              key={a.id}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${a.status === 'resolved' ? 'bg-emerald-500' : 'bg-red-500 animate-ping'}`} />
                  <strong className="text-slate-900 text-sm">{a.elder_name}</strong>
                  <span className="text-slate-500">({a.address})</span>
                </div>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  Triggered: {new Date(a.triggered_at).toLocaleString()} • Severity: {a.severity}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded-full font-bold uppercase text-[10px] ${
                  a.status === 'resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                }`}>
                  {a.status}
                </span>
                <Link
                  to="/admin/emergencies"
                  className="px-3 py-1 rounded-lg bg-slate-900 text-white font-bold"
                >
                  Manage
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Columns: Caregiver Approvals & Regional Hubs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Caregiver Verification Queue */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900">Caregiver Verification Desk</h3>
            <Link to="/admin/verification" className="text-xs font-bold text-purple-700 hover:underline">
              View All Queue →
            </Link>
          </div>

          <div className="space-y-3">
            {caregivers.map((c) => (
              <div key={c.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <img src={c.avatar_url} alt={c.name} className="w-10 h-10 rounded-xl object-cover border" />
                  <div>
                    <p className="font-bold text-slate-900">{c.name}</p>
                    <p className="text-[10px] text-slate-500">{c.certifications[0]} • {c.experience_years} yrs exp</p>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded-full font-bold uppercase text-[10px] ${
                  c.verification_status === 'verified' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {c.verification_status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* City Operations */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-slate-900">Operational Regional Clusters</h3>
          <div className="space-y-2 text-xs">
            {[
              { city: 'Delhi NCR (Noida, Gurugram, Delhi)', activeElders: 480, sahayaks: 82, status: 'High Traffic' },
              { city: 'Bengaluru (Indiranagar, Whitefield, HSR)', activeElders: 360, sahayaks: 64, status: 'Normal' },
              { city: 'Mumbai & Navi Mumbai', activeElders: 290, sahayaks: 51, status: 'Normal' },
              { city: 'Pune & Hyderabad', activeElders: 118, sahayaks: 24, status: 'Expanding' }
            ].map((hub, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-800">{hub.city}</p>
                  <p className="text-[10px] text-slate-500">{hub.activeElders} Elders • {hub.sahayaks} Sahayaks</p>
                </div>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                  {hub.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
