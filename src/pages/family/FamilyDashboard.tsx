import React, { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import {
  Activity,
  Heart,
  MapPin,
  Car,
  AlertTriangle,
  Pill,
  Calendar,
  PhoneCall,
  CheckCircle2,
  ArrowRight,
  Plus,
  Battery,
  ShieldCheck,
  TrendingUp,
  Clock,
  Sparkles,
  Users
} from 'lucide-react';
import { dbStore } from '../../lib/supabase';
import { ElderProfile, HealthMetric, Medication, Visit, Appointment, SosAlert } from '../../types';
import { SimpleVitalChart } from '../../components/charts/SimpleVitalChart';
import { LiveMapTracker } from '../../components/maps/LiveMapTracker';
import { TranquilFamilyHome } from '../../components/home/TranquilFamilyHome';
import { OrnateCorner } from '../../components/art-nouveau/ArtNouveauDecorations';

export const FamilyDashboard: React.FC = () => {
  const context = useOutletContext<{ selectedElder?: ElderProfile }>();
  const elder = context?.selectedElder || dbStore.getElders()[0];

  const [activeLayout, setActiveLayout] = useState<'tranquil' | 'clinical'>('clinical');

  const [metrics, setMetrics] = useState<HealthMetric[]>([]);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [visits, setVisits] = useState<Visit[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [sosAlerts, setSosAlerts] = useState<SosAlert[]>([]);

  useEffect(() => {
    if (!elder) return;
    setMetrics(dbStore.getHealthMetrics(elder.id));
    setMedications(dbStore.getMedications(elder.id));
    setVisits(dbStore.getVisits(undefined, elder.id));
    setAppointments(dbStore.getAppointments(elder.id));
    setSosAlerts(dbStore.getSosAlerts().filter(a => a.elder_id === elder.id && (a.status === 'triggered' || a.status === 'dispatched')));

    const handleUpdate = () => {
      setMetrics(dbStore.getHealthMetrics(elder.id));
      setMedications(dbStore.getMedications(elder.id));
      setVisits(dbStore.getVisits(undefined, elder.id));
      setAppointments(dbStore.getAppointments(elder.id));
      setSosAlerts(dbStore.getSosAlerts().filter(a => a.elder_id === elder.id && (a.status === 'triggered' || a.status === 'dispatched')));
    };

    window.addEventListener('apnasahara_datachange', handleUpdate);
    return () => window.removeEventListener('apnasahara_datachange', handleUpdate);
  }, [elder]);

  const latestMetric = metrics[0];
  const todayVisit = visits.find(v => v.date === new Date().toISOString().split('T')[0]) || visits[0];

  const medsTakenToday = medications.filter(m => m.is_taken_today).length;
  const medsTotal = medications.length;
  const medsPercent = medsTotal > 0 ? Math.round((medsTakenToday / medsTotal) * 100) : 100;

  return (
    <div className="space-y-6 font-serif text-[#17211C]">
      {/* View Mode Toggle Pill Bar */}
      <div className="flex items-center justify-between bg-[#FFFFF0] px-4 py-2.5 rounded-[12px] border border-[#CFB53B]/40 shadow-[0_2px_12px_rgba(23,33,28,0.04)]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#17211C]/70">Dashboard View:</span>
          <div className="inline-flex rounded-[12px] bg-[#FFFDD0] p-1 text-xs font-bold border border-[#CFB53B]/30">
            <button
              onClick={() => setActiveLayout('clinical')}
              className={`px-3.5 py-1 rounded-[8px] transition-all flex items-center gap-1.5 ${
                activeLayout === 'clinical'
                  ? 'bg-[#008080] text-[#FFFFF0] shadow-xs font-bold'
                  : 'text-[#17211C]/70 hover:text-[#008080]'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Clinical & Radar Overview</span>
            </button>
            <button
              onClick={() => setActiveLayout('tranquil')}
              className={`px-3.5 py-1 rounded-[8px] transition-all flex items-center gap-1.5 ${
                activeLayout === 'tranquil'
                  ? 'bg-[#008080] text-[#FFFFF0] shadow-xs font-bold'
                  : 'text-[#17211C]/70 hover:text-[#008080]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tranquil Family Sanctuary</span>
            </button>
          </div>
        </div>

        <span className="text-[11px] text-[#008080] font-medium font-mono hidden sm:inline">
          CONNECTED: {elder?.name?.toUpperCase()} // {elder?.city?.toUpperCase()}
        </span>
      </div>

      {activeLayout === 'tranquil' ? (
        <TranquilFamilyHome />
      ) : (
        <div className="space-y-6">
          {/* Active SOS Warning Alert if triggered */}
          {sosAlerts.length > 0 && (
            <div className="p-4 sm:p-5 rounded-[12px] bg-[#800020] text-[#FFFFF0] border border-[#CFB53B] shadow-xl shadow-[#800020]/30 flex flex-col sm:flex-row items-center justify-between gap-4 animate-pulse">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-[12px] bg-[#FFFFF0]/20 flex items-center justify-center text-[#FFFFF0] shrink-0">
                  <AlertTriangle className="w-7 h-7 text-[#CFB53B]" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#FFFFF0]">EMERGENCY SOS ACTIVE</h3>
                  <p className="text-xs text-[#FFFFF0]/80 mt-0.5">
                    {elder.name} triggered an SOS beacon! Central dispatch desk is coordinating response.
                  </p>
                </div>
              </div>
              <Link
                to="/family/sos"
                className="px-6 py-2.5 rounded-[12px] bg-[#FFFFF0] text-[#800020] font-bold text-xs shadow-md shrink-0 hover:bg-[#FFFDD0] transition-colors"
              >
                Open Emergency Response Room →
              </Link>
            </div>
          )}

          {/* Top Welcome & Elder Status Banner */}
          <div className="p-6 rounded-[12px] bg-[#FFFFF0] border border-[#CFB53B]/40 shadow-[0_2px_12px_rgba(23,33,28,0.06)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
            <OrnateCorner position="top-right" className="absolute top-2 right-2 text-[#CFB53B]" />

            <div className="flex items-center gap-4">
              <img
                src={elder?.avatar_url || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'}
                alt={elder?.name}
                className="w-16 h-16 rounded-[12px] object-cover border-2 border-[#008080] shadow-sm"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-[#17211C]">{elder?.name}</h1>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#808000]/15 text-[#808000] border border-[#808000]/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#808000] animate-pulse" />
                    Status: Safe at Home
                  </span>
                </div>
                <p className="text-xs text-[#17211C]/70 mt-0.5">
                  Age {elder?.age} • Blood Group {elder?.blood_group} • {elder?.address}
                </p>
                <div className="flex items-center gap-3 mt-2 text-xs text-[#17211C]/75">
                  <span className="flex items-center gap-1 font-mono">
                    <Battery className="w-4 h-4 text-[#808000]" />
                    Phone Battery: <strong>{elder?.battery_level || 84}%</strong>
                  </span>
                  <span>•</span>
                  <span className="text-[#008080] font-semibold">
                    Geofence: Inside Safe Boundary (350m)
                  </span>
                </div>
              </div>
            </div>

            {/* Quick action buttons */}
            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href={`tel:${elder?.phone}`}
                className="px-4 py-2.5 rounded-[12px] bg-[#17211C] hover:bg-[#17211C]/80 text-[#FFFFF0] font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#CFB53B]" />
                Call Parent
              </a>
              <Link
                to="/family/appointments"
                className="px-4 py-2.5 rounded-[12px] bg-[#008080] hover:brightness-90 text-[#FFFFF0] font-semibold text-xs flex items-center gap-1.5 transition-all shadow-sm"
              >
                <Plus className="w-3.5 h-3.5 text-[#CFB53B]" />
                Schedule Visit
              </Link>
            </div>
          </div>

          {/* 4 Health Vital Cards Glance */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-[12px] bg-[#FFFFF0] border border-[#CFB53B]/40 shadow-[0_2px_12px_rgba(23,33,28,0.05)] space-y-2">
              <div className="flex items-center justify-between text-xs text-[#17211C]/70">
                <span className="font-semibold">Blood Pressure</span>
                <Activity className="w-4 h-4 text-[#008080]" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-bold text-[#17211C]">
                  {latestMetric?.systolic_bp || 124} / {latestMetric?.diastolic_bp || 82}
                </span>
                <span className="text-[11px] text-[#17211C]/50 font-mono">mmHg</span>
              </div>
              <p className="text-[11px] text-[#808000] font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Normal Target Range
              </p>
            </div>

            <div className="p-5 rounded-[12px] bg-[#FFFFF0] border border-[#CFB53B]/40 shadow-[0_2px_12px_rgba(23,33,28,0.05)] space-y-2">
              <div className="flex items-center justify-between text-xs text-[#17211C]/70">
                <span className="font-semibold">Blood Glucose</span>
                <Heart className="w-4 h-4 text-[#005F9E]" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-bold text-[#17211C]">
                  {latestMetric?.blood_glucose || 118}
                </span>
                <span className="text-[11px] text-[#17211C]/50 font-mono">mg/dL</span>
              </div>
              <p className="text-[11px] text-[#005F9E] font-semibold">
                {latestMetric?.blood_glucose_type || 'Fasting'} • Stable
              </p>
            </div>

            <div className="p-5 rounded-[12px] bg-[#FFFFF0] border border-[#CFB53B]/40 shadow-[0_2px_12px_rgba(23,33,28,0.05)] space-y-2">
              <div className="flex items-center justify-between text-xs text-[#17211C]/70">
                <span className="font-semibold">Heart Rate</span>
                <TrendingUp className="w-4 h-4 text-[#CFB53B]" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-bold text-[#17211C]">
                  {latestMetric?.heart_rate || 72}
                </span>
                <span className="text-[11px] text-[#17211C]/50 font-mono">bpm</span>
              </div>
              <p className="text-[11px] text-[#808000] font-semibold">Rhythmic & Resting</p>
            </div>

            <div className="p-5 rounded-[12px] bg-[#FFFFF0] border border-[#CFB53B]/40 shadow-[0_2px_12px_rgba(23,33,28,0.05)] space-y-2">
              <div className="flex items-center justify-between text-xs text-[#17211C]/70">
                <span className="font-semibold">Oxygen (SpO2)</span>
                <ShieldCheck className="w-4 h-4 text-[#800020]" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-bold text-[#17211C]">
                  {latestMetric?.spo2 || 98}%
                </span>
              </div>
              <p className="text-[11px] text-[#800020] font-semibold">Optimal Respiration</p>
            </div>
          </div>

          {/* Radar Map & Today's Visit */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 space-y-4">
              <LiveMapTracker
                elderName={elder.name}
                elderAddress={elder.address}
                caregiverName={todayVisit?.caregiver_name}
                caregiverPhone={todayVisit?.caregiver_phone}
                caregiverStatus={todayVisit?.status}
                batteryLevel={elder.battery_level}
              />
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-[12px] bg-[#FFFFF0] border border-[#CFB53B]/40 shadow-[0_2px_12px_rgba(23,33,28,0.05)] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#008080]">
                    Today's Visit
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#808000]/15 text-[#808000] border border-[#808000]/30 font-mono">
                    {todayVisit?.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    src={todayVisit?.caregiver_avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80'}
                    alt={todayVisit?.caregiver_name}
                    className="w-12 h-12 rounded-[12px] object-cover border border-[#CFB53B]"
                  />
                  <div>
                    <h4 className="font-bold text-[#17211C] text-sm">{todayVisit?.caregiver_name}</h4>
                    <p className="text-xs text-[#17211C]/70">Verified GDA Sahayak • Rating 4.9</p>
                  </div>
                </div>
              </div>

              {/* Medication Progress */}
              <div className="p-6 rounded-[12px] bg-[#FFFFF0] border border-[#CFB53B]/40 shadow-[0_2px_12px_rgba(23,33,28,0.05)] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#17211C]">Medication Adherence</span>
                  <span className="font-bold text-[#008080] font-mono">{medsPercent}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#FFFDD0] border border-[#CFB53B]/30 overflow-hidden">
                  <div className="h-full bg-[#008080] rounded-full" style={{ width: `${medsPercent}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Trend Charts */}
          <div className="p-6 rounded-[12px] bg-[#FFFFF0] border border-[#CFB53B]/40 shadow-[0_2px_12px_rgba(23,33,28,0.05)] space-y-4">
            <h3 className="text-base font-bold text-[#17211C]">Vital Signs Trends</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SimpleVitalChart metrics={metrics} vitalType="bp" title="Blood Pressure History (mmHg)" />
              <SimpleVitalChart metrics={metrics} vitalType="glucose" title="Blood Glucose History (mg/dL)" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
