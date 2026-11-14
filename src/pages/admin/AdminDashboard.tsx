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
  RefreshCw,
  Siren
} from 'lucide-react';
import { dbStore } from '../../lib/mongoStore';
import { SosAlert, CaregiverProfile, UserProfile } from '../../types';
import { OrnateCorner, WhiplashDivider } from '../../components/art-nouveau/ArtNouveauDecorations';

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
    <div className="space-y-6 font-serif">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#CFB53B]/30 pb-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#008080]">Central Administration</span>
          <h1 className="text-2xl font-bold text-[#17211C]">National Operations Command</h1>
          <p className="text-xs sm:text-sm text-[#17211C]/75 font-sans">
            Real-time emergency monitoring, caregiver dispatch & platform metrics
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-art bg-[#808000]/15 text-[#808000] border border-[#808000]/40 text-xs font-bold flex items-center gap-2 font-sans">
            <span className="w-2 h-2 rounded-full bg-[#808000] animate-ping" />
            Control Desk Live
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="art-card p-5 space-y-1">
          <span className="text-xs font-bold text-[#008080] uppercase tracking-wider">Active Families</span>
          <p className="text-3xl font-bold text-[#17211C] font-mono">1,248</p>
          <span className="text-[11px] text-[#808000] font-semibold font-sans">↑ +14% this month</span>
        </div>

        <div className="art-card p-5 space-y-1">
          <span className="text-xs font-bold text-[#008080] uppercase tracking-wider">Verified Sahayaks</span>
          <p className="text-3xl font-bold text-[#17211C] font-mono">{caregivers.length * 110 + 42}</p>
          <span className="text-[11px] text-[#CFB53B] font-semibold font-sans">{pendingCaregivers.length} Pending Review</span>
        </div>

        <div className="art-card p-5 space-y-1">
          <span className="text-xs font-bold text-[#008080] uppercase tracking-wider">Monthly Run Rate</span>
          <p className="text-3xl font-bold text-[#17211C] font-mono">₹1.12 Cr</p>
          <span className="text-[11px] text-[#008080] font-semibold font-sans">98.2% Renewal Retention</span>
        </div>

        <div className="art-card p-5 space-y-1">
          <span className="text-xs font-bold text-[#008080] uppercase tracking-wider">Avg. SOS Dispatch</span>
          <p className="text-3xl font-bold text-[#800020] font-mono">7.4 <span className="text-xs text-[#17211C]/50 font-normal font-sans">mins</span></p>
          <span className="text-[11px] text-[#17211C]/60 font-sans">National SLA: &lt; 10 mins</span>
        </div>
      </div>

      {/* Emergency Radar Alert Panel */}
      <div className="relative art-card p-6 space-y-4">
        <OrnateCorner position="top-left" color="#CFB53B" size={32} />
        <OrnateCorner position="top-right" color="#CFB53B" size={32} />

        <div className="flex items-center justify-between pb-3 border-b border-[#CFB53B]/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-art bg-[#800020]/10 border border-[#800020]/30 text-[#800020] flex items-center justify-center">
              <Siren className="w-5 h-5 text-[#800020]" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#17211C]">Live SOS Dispatch Queue</h3>
              <p className="text-xs text-[#17211C]/65 font-sans">{activeSosCount} Active Incident Alerts</p>
            </div>
          </div>
          <Link
            to="/admin/emergencies"
            className="art-btn-primary px-4 py-2 text-xs flex items-center gap-1.5 shadow-sm"
          >
            Open Dispatch Desk <ArrowRight className="w-3.5 h-3.5 text-[#CFB53B]" />
          </Link>
        </div>

        <div className="space-y-3">
          {sosAlerts.slice(0, 3).map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-art border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-sans ${
                alert.status !== 'resolved'
                  ? 'bg-[#800020]/10 border-[#800020]/40'
                  : 'bg-[#FFFDD0] border-[#CFB53B]/30'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-3 h-3 rounded-full ${alert.status !== 'resolved' ? 'bg-[#800020] animate-ping' : 'bg-[#808000]'}`} />
                <div>
                  <h4 className="font-bold text-sm text-[#17211C] font-serif">{alert.elder_name}</h4>
                  <p className="text-slate-600 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#008080]" /> {alert.elder_address}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className={`px-2.5 py-1 rounded-art font-bold uppercase text-[10px] font-mono ${
                  alert.status !== 'resolved'
                    ? 'bg-[#800020] text-[#FFFFF0]'
                    : 'bg-[#808000]/15 text-[#808000] border border-[#808000]/40'
                }`}>
                  {alert.status}
                </span>
                <span className="text-[#17211C]/60 font-mono">
                  {new Date(alert.triggered_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
