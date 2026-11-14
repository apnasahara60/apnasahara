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
  Clock
} from 'lucide-react';
import { dbStore } from '../../lib/supabase';
import { ElderProfile, HealthMetric, Medication, Visit, Appointment, SosAlert } from '../../types';
import { SimpleVitalChart } from '../../components/charts/SimpleVitalChart';
import { LiveMapTracker } from '../../components/maps/LiveMapTracker';

export const FamilyDashboard: React.FC = () => {
  const context = useOutletContext<{ selectedElder?: ElderProfile }>();
  const elder = context?.selectedElder || dbStore.getElders()[0];

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
    <div className="space-y-6">
      {/* Active SOS Warning Alert if triggered */}
      {sosAlerts.length > 0 && (
        <div className="p-4 sm:p-5 rounded-3xl bg-red-600 text-white shadow-xl shadow-red-600/30 flex flex-col sm:flex-row items-center justify-between gap-4 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white shrink-0">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg">EMERGENCY SOS ACTIVE</h3>
              <p className="text-xs text-red-100 mt-0.5">
                {elder.name} triggered an SOS beacon! Central dispatch desk is coordinating response.
              </p>
            </div>
          </div>
          <Link
            to="/family/sos"
            className="px-6 py-2.5 rounded-xl bg-white text-red-700 font-extrabold text-xs shadow-md shrink-0 hover:bg-slate-100"
          >
            Open Emergency Response Room →
          </Link>
        </div>
      )}

      {/* Top Welcome & Elder Status Banner */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={elder?.avatar_url || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'}
            alt={elder?.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500 shadow-sm"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-slate-900">{elder?.name}</h1>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Status: Safe at Home
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Age {elder?.age} • Blood Group {elder?.blood_group} • {elder?.address}
            </p>
            <div className="flex items-center gap-3 mt-2 text-xs text-slate-600">
              <span className="flex items-center gap-1">
                <Battery className="w-4 h-4 text-emerald-600" />
                Phone Battery: <strong>{elder?.battery_level || 84}%</strong>
              </span>
              <span>•</span>
              <span className="text-emerald-700 font-semibold">
                Geofence: Inside Safe Boundary (Noida Sec 62)
              </span>
            </div>
          </div>
        </div>

        {/* Quick action buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <a
            href={`tel:${elder?.phone}`}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            Call Parent
          </a>
          <Link
            to="/family/appointments"
            className="px-4 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-xs flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Schedule Visit
          </Link>
        </div>
      </div>

      {/* 4 Health Vital Cards Glance */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Blood Pressure */}
        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold">Blood Pressure</span>
            <Activity className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">
              {latestMetric?.systolic_bp || 124} / {latestMetric?.diastolic_bp || 82}
            </span>
            <span className="text-[11px] text-slate-400">mmHg</span>
          </div>
          <p className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Normal Target Range
          </p>
        </div>

        {/* Fasting Glucose */}
        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold">Blood Glucose</span>
            <Heart className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">
              {latestMetric?.blood_glucose || 118}
            </span>
            <span className="text-[11px] text-slate-400">mg/dL</span>
          </div>
          <p className="text-[11px] text-blue-600 font-bold">
            {latestMetric?.blood_glucose_type || 'Fasting'} • Stable
          </p>
        </div>

        {/* Pulse / Heart Rate */}
        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold">Heart Rate</span>
            <TrendingUp className="w-4 h-4 text-amber-600" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">
              {latestMetric?.heart_rate || 72}
            </span>
            <span className="text-[11px] text-slate-400">bpm</span>
          </div>
          <p className="text-[11px] text-amber-600 font-bold">Rhythmic & Resting</p>
        </div>

        {/* SpO2 Oxygen */}
        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold">Oxygen (SpO2)</span>
            <ShieldCheck className="w-4 h-4 text-purple-600" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">
              {latestMetric?.spo2 || 98}%
            </span>
          </div>
          <p className="text-[11px] text-purple-600 font-bold">Optimal Respiration</p>
        </div>
      </div>

      {/* Main Grid: Live Radar Map & Caregiver Visit Status */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Map Snippet */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Live Location & Safety Radar</h3>
              <p className="text-xs text-slate-500">Continuous geofence monitoring around parent's residence</p>
            </div>
            <Link
              to="/family/location"
              className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
            >
              Full Screen Map <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <LiveMapTracker
            elderName={elder.name}
            elderAddress={elder.address}
            caregiverName={todayVisit?.caregiver_name}
            caregiverPhone={todayVisit?.caregiver_phone}
            caregiverStatus={todayVisit?.status}
            batteryLevel={elder.battery_level}
          />
        </div>

        {/* Right Column: Today's Visit & Medication Adherence */}
        <div className="lg:col-span-5 space-y-6">
          {/* Today's Scheduled Visit Card */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Today's Companion Visit
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                {todayVisit?.status.replace('_', ' ').toUpperCase()}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <img
                src={todayVisit?.caregiver_avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80'}
                alt={todayVisit?.caregiver_name}
                className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-sm"
              />
              <div>
                <h4 className="font-bold text-slate-900 text-base">{todayVisit?.caregiver_name}</h4>
                <p className="text-xs text-slate-500">General Duty Attendant (Sahayak) • ⭐ 4.9</p>
                <p className="text-xs text-emerald-600 font-semibold mt-0.5">
                  Scheduled: {todayVisit?.time_slot}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
              {todayVisit?.notes || 'Caregiver en route to assist with vitals, joint mobility walk, and medication check.'}
            </p>

            <div className="flex items-center justify-between pt-2">
              <a
                href={`tel:${todayVisit?.caregiver_phone}`}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5 text-slate-600" />
                Call Caregiver
              </a>
              <Link
                to="/family/caregiver"
                className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
              >
                Track Live Route <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Medication Adherence Today */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-900 text-base">Medication Schedule</h4>
                <p className="text-xs text-slate-500">{medsTakenToday} of {medsTotal} doses taken today</p>
              </div>
              <span className="text-lg font-black text-emerald-600">{medsPercent}%</span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${medsPercent}%` }}
              />
            </div>

            {/* Quick list of meds */}
            <div className="space-y-2">
              {medications.slice(0, 3).map((m) => (
                <div
                  key={m.id}
                  className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm">💊</span>
                    <div>
                      <p className="font-bold text-slate-800">{m.name}</p>
                      <p className="text-[10px] text-slate-400">{m.dosage} • {m.scheduled_time}</p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      m.is_taken_today
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {m.is_taken_today ? 'Taken ✓' : 'Scheduled'}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 text-right">
              <Link
                to="/family/medications"
                className="text-xs font-bold text-brand-600 hover:text-brand-700 inline-flex items-center gap-1"
              >
                Manage Prescriptions & Refills <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Historical Vital Trend Charts */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">Blood Pressure & Glucose Trends</h3>
            <p className="text-xs text-slate-500">Monitored over the last 7 recorded caregiver visits</p>
          </div>
          <Link
            to="/family/health"
            className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
          >
            Detailed Medical Log <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <SimpleVitalChart metrics={metrics} vitalType="bp" title="Blood Pressure History (mmHg)" />
          <SimpleVitalChart metrics={metrics} vitalType="glucose" title="Blood Glucose History (mg/dL)" />
        </div>
      </div>
    </div>
  );
};
