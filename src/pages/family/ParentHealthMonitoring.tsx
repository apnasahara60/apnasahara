import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  Activity,
  Heart,
  Plus,
  TrendingUp,
  ShieldCheck,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  X
} from 'lucide-react';
import { dbStore } from '../../lib/supabase';
import { ElderProfile, HealthMetric } from '../../types';
import { SimpleVitalChart } from '../../components/charts/SimpleVitalChart';
import { useNotification } from '../../context/NotificationContext';
import { OrnateCorner } from '../../components/art-nouveau/ArtNouveauDecorations';

export const ParentHealthMonitoring: React.FC = () => {
  const context = useOutletContext<{ selectedElder?: ElderProfile }>();
  const elder = context?.selectedElder || dbStore.getElders()[0];
  const { showToast } = useNotification();

  const [metrics, setMetrics] = useState<HealthMetric[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Metric Form State
  const [systolic, setSystolic] = useState('124');
  const [diastolic, setDiastolic] = useState('82');
  const [heartRate, setHeartRate] = useState('72');
  const [spo2, setSpo2] = useState('98');
  const [glucose, setGlucose] = useState('118');
  const [glucoseType, setGlucoseType] = useState<'Fasting' | 'Post-Meal' | 'Random'>('Fasting');
  const [temperature, setTemperature] = useState('98.4');
  const [weight, setWeight] = useState('68.5');
  const [sleepHours, setSleepHours] = useState('7.5');
  const [mood, setMood] = useState<'Very Good' | 'Good' | 'Fair' | 'Unwell' | 'Critical'>('Good');
  const [notes, setNotes] = useState('');

  const loadMetrics = () => {
    if (elder) {
      setMetrics(dbStore.getHealthMetrics(elder.id));
    }
  };

  useEffect(() => {
    loadMetrics();
    const handleUpdate = () => loadMetrics();
    window.addEventListener('apnasahara_datachange', handleUpdate);
    return () => window.removeEventListener('apnasahara_datachange', handleUpdate);
  }, [elder]);

  const handleAddMetric = (e: React.FormEvent) => {
    e.preventDefault();
    if (!elder) return;

    dbStore.addHealthMetric({
      elder_id: elder.id,
      systolic_bp: Number(systolic),
      diastolic_bp: Number(diastolic),
      heart_rate: Number(heartRate),
      spo2: Number(spo2),
      blood_glucose: Number(glucose),
      blood_glucose_type: glucoseType,
      temperature: Number(temperature),
      weight: Number(weight),
      sleep_hours: Number(sleepHours),
      mood,
      notes: notes || 'Manual vital check logged by family.'
    });

    showToast('Vital Record Added', `Logged BP ${systolic}/${diastolic} & Sugar ${glucose} mg/dL`, 'health');
    setShowAddModal(false);
    setNotes('');
  };

  const latest = metrics[0];

  return (
    <div className="space-y-6 font-serif text-[#17211C]">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#CFB53B]/30 pb-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#008080]">
            Clinical Telemetry
          </span>
          <h1 className="text-3xl font-bold text-[#17211C] tracking-tight">Parent Health Monitoring</h1>
          <p className="text-xs text-[#17211C]/70 mt-0.5">
            Clinical vitals, daily readings, and trend analysis for <strong>{elder?.name}</strong>
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 rounded-[12px] bg-[#008080] hover:brightness-90 text-[#FFFFF0] font-semibold text-xs shadow-md shadow-[#008080]/20 flex items-center justify-center gap-2 transition-all active:translate-y-[1px]"
        >
          <Plus className="w-4 h-4 text-[#CFB53B]" />
          <span>Log New Vital Reading</span>
        </button>
      </div>

      {/* Snapshot Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-[12px] bg-[#FFFFF0] border border-[#CFB53B]/40 shadow-[0_2px_12px_rgba(23,33,28,0.05)] space-y-1 relative">
          <div className="flex items-center justify-between text-xs text-[#17211C]/70 font-semibold">
            <span>Blood Pressure</span>
            <Activity className="w-4 h-4 text-[#008080]" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-[#17211C]">
            {latest?.systolic_bp || 124} / {latest?.diastolic_bp || 82}
            <span className="text-xs text-[#17211C]/50 font-normal ml-1 font-mono">mmHg</span>
          </p>
          <span className="text-[11px] text-[#808000] font-semibold block">Target: 90-120/60-80</span>
        </div>

        <div className="p-5 rounded-[12px] bg-[#FFFFF0] border border-[#CFB53B]/40 shadow-[0_2px_12px_rgba(23,33,28,0.05)] space-y-1 relative">
          <div className="flex items-center justify-between text-xs text-[#17211C]/70 font-semibold">
            <span>Blood Glucose</span>
            <Heart className="w-4 h-4 text-[#005F9E]" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-[#17211C]">
            {latest?.blood_glucose || 118}
            <span className="text-xs text-[#17211C]/50 font-normal ml-1 font-mono">mg/dL</span>
          </p>
          <span className="text-[11px] text-[#005F9E] font-semibold block">
            {latest?.blood_glucose_type || 'Fasting'} Reading
          </span>
        </div>

        <div className="p-5 rounded-[12px] bg-[#FFFFF0] border border-[#CFB53B]/40 shadow-[0_2px_12px_rgba(23,33,28,0.05)] space-y-1 relative">
          <div className="flex items-center justify-between text-xs text-[#17211C]/70 font-semibold">
            <span>Pulse / SpO2</span>
            <TrendingUp className="w-4 h-4 text-[#CFB53B]" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-[#17211C]">
            {latest?.heart_rate || 72} <span className="text-xs text-[#17211C]/50 font-normal font-mono">bpm</span> / {latest?.spo2 || 98}%
          </p>
          <span className="text-[11px] text-[#808000] font-semibold block">Optimal oxygen saturation</span>
        </div>

        <div className="p-5 rounded-[12px] bg-[#FFFFF0] border border-[#CFB53B]/40 shadow-[0_2px_12px_rgba(23,33,28,0.05)] space-y-1 relative">
          <div className="flex items-center justify-between text-xs text-[#17211C]/70 font-semibold">
            <span>Weight / Sleep</span>
            <ShieldCheck className="w-4 h-4 text-[#800020]" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-[#17211C]">
            {latest?.weight || 68.5} <span className="text-xs text-[#17211C]/50 font-normal font-mono">kg</span> / {latest?.sleep_hours || 7.5}h
          </p>
          <span className="text-[11px] text-[#800020] font-semibold block">
            Mood: {latest?.mood || 'Good'}
          </span>
        </div>
      </div>

      {/* Interactive Trend Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-[12px] bg-[#FFFFF0] border border-[#CFB53B]/40 shadow-[0_2px_12px_rgba(23,33,28,0.05)]">
          <SimpleVitalChart metrics={metrics} vitalType="bp" title="Systolic & Diastolic Trend (mmHg)" />
        </div>
        <div className="p-6 rounded-[12px] bg-[#FFFFF0] border border-[#CFB53B]/40 shadow-[0_2px_12px_rgba(23,33,28,0.05)]">
          <SimpleVitalChart metrics={metrics} vitalType="glucose" title="Blood Glucose Trend (mg/dL)" />
        </div>
        <div className="p-6 rounded-[12px] bg-[#FFFFF0] border border-[#CFB53B]/40 shadow-[0_2px_12px_rgba(23,33,28,0.05)]">
          <SimpleVitalChart metrics={metrics} vitalType="heart_rate" title="Heart Rate Trend (bpm)" />
        </div>
        <div className="p-6 rounded-[12px] bg-[#FFFFF0] border border-[#CFB53B]/40 shadow-[0_2px_12px_rgba(23,33,28,0.05)]">
          <SimpleVitalChart metrics={metrics} vitalType="spo2" title="Blood Oxygen SpO2 Trend (%)" />
        </div>
      </div>

      {/* Historical Logs Table */}
      <div className="p-6 rounded-[12px] bg-[#FFFFF0] border border-[#CFB53B]/40 shadow-[0_2px_12px_rgba(23,33,28,0.05)] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#CFB53B]/25">
          <div>
            <h3 className="font-bold text-base text-[#17211C]">Comprehensive Vital Records Log</h3>
            <p className="text-xs text-[#17211C]/70">Every recording taken during attendant visits or self-logged</p>
          </div>
          <span className="text-xs font-semibold text-[#008080] font-mono bg-[#FFFDD0] px-2.5 py-1 rounded-[8px] border border-[#CFB53B]/30">
            {metrics.length} Total Readings
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#CFB53B]/30 bg-[#FFFDD0]/60 text-[#008080] uppercase tracking-wider font-bold">
                <th className="py-2.5 pl-3">Timestamp</th>
                <th className="py-2.5">BP (mmHg)</th>
                <th className="py-2.5">Glucose</th>
                <th className="py-2.5">Pulse</th>
                <th className="py-2.5">SpO2</th>
                <th className="py-2.5">Weight</th>
                <th className="py-2.5">Mood</th>
                <th className="py-2.5 pr-3">Attendant Observations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#CFB53B]/20 text-[#17211C]">
              {metrics.map((m) => (
                <tr key={m.id} className="hover:bg-[#FFFDD0]/40 transition-colors">
                  <td className="py-3 pl-3 font-medium text-[#17211C]">
                    {new Date(m.recorded_at).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}{' '}
                    <span className="text-[#17211C]/50 font-normal font-mono text-[11px]">
                      {new Date(m.recorded_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </td>
                  <td className="py-3 font-bold text-[#17211C] font-mono">
                    {m.systolic_bp || '-'}/{m.diastolic_bp || '-'}
                  </td>
                  <td className="py-3">
                    <span className="font-bold font-mono">{m.blood_glucose || '-'}</span>{' '}
                    <span className="text-[10px] text-[#17211C]/60">({m.blood_glucose_type || 'Fasting'})</span>
                  </td>
                  <td className="py-3 font-medium font-mono">{m.heart_rate || '-'} bpm</td>
                  <td className="py-3 font-medium text-[#005F9E] font-mono">{m.spo2 || '-'}%</td>
                  <td className="py-3 font-medium font-mono">{m.weight ? `${m.weight} kg` : '-'}</td>
                  <td className="py-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#808000]/15 text-[#808000] border border-[#808000]/30 font-bold text-[10px]">
                      {m.mood || 'Good'}
                    </span>
                  </td>
                  <td className="py-3 pr-3 text-[#17211C]/70 max-w-xs truncate">
                    {m.notes || 'Normal routine check.'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Log New Vital Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[300] bg-[#17211C]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFFF0] rounded-[12px] border border-[#CFB53B] max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto relative">
            <OrnateCorner position="top-left" className="absolute top-2 left-2 text-[#CFB53B]" />
            <OrnateCorner position="bottom-right" className="absolute bottom-2 right-2 text-[#CFB53B]" />

            <div className="flex items-center justify-between pb-3 border-b border-[#CFB53B]/30">
              <div>
                <span className="text-[11px] font-bold text-[#008080] uppercase tracking-wider">
                  Health Entry
                </span>
                <h3 className="text-xl font-bold text-[#17211C]">Log Vital Reading</h3>
                <p className="text-xs text-[#17211C]/70">Record new medical vitals for {elder?.name}</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-[8px] text-[#17211C]/60 hover:text-[#800020] hover:bg-[#800020]/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddMetric} className="space-y-4 text-left">
              {/* BP */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#17211C] block mb-1">Systolic BP (mmHg)</label>
                  <input
                    type="number"
                    required
                    value={systolic}
                    onChange={(e) => setSystolic(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-[12px] border border-[#CFB53B]/50 bg-[#FFFFF0] text-sm text-[#17211C] focus:ring-2 focus:ring-[#008080] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#17211C] block mb-1">Diastolic BP (mmHg)</label>
                  <input
                    type="number"
                    required
                    value={diastolic}
                    onChange={(e) => setDiastolic(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-[12px] border border-[#CFB53B]/50 bg-[#FFFFF0] text-sm text-[#17211C] focus:ring-2 focus:ring-[#008080] focus:outline-none"
                  />
                </div>
              </div>

              {/* Glucose & Type */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#17211C] block mb-1">Blood Glucose (mg/dL)</label>
                  <input
                    type="number"
                    required
                    value={glucose}
                    onChange={(e) => setGlucose(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-[12px] border border-[#CFB53B]/50 bg-[#FFFFF0] text-sm text-[#17211C] focus:ring-2 focus:ring-[#008080] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#17211C] block mb-1">Timing Type</label>
                  <select
                    value={glucoseType}
                    onChange={(e) => setGlucoseType(e.target.value as any)}
                    className="w-full px-3.5 py-2 rounded-[12px] border border-[#CFB53B]/50 bg-[#FFFFF0] text-sm text-[#17211C] focus:ring-2 focus:ring-[#008080] focus:outline-none"
                  >
                    <option value="Fasting">Fasting</option>
                    <option value="Post-Meal">Post-Meal</option>
                    <option value="Random">Random</option>
                  </select>
                </div>
              </div>

              {/* Heart Rate & SpO2 */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#17211C] block mb-1">Heart Rate (Pulse bpm)</label>
                  <input
                    type="number"
                    required
                    value={heartRate}
                    onChange={(e) => setHeartRate(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-[12px] border border-[#CFB53B]/50 bg-[#FFFFF0] text-sm text-[#17211C] focus:ring-2 focus:ring-[#008080] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#17211C] block mb-1">Oxygen SpO2 (%)</label>
                  <input
                    type="number"
                    required
                    value={spo2}
                    onChange={(e) => setSpo2(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-[12px] border border-[#CFB53B]/50 bg-[#FFFFF0] text-sm text-[#17211C] focus:ring-2 focus:ring-[#008080] focus:outline-none"
                  />
                </div>
              </div>

              {/* Temperature & Weight */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#17211C] block mb-1">Body Temp (°F)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={temperature}
                    onChange={(e) => setTemperature(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-[12px] border border-[#CFB53B]/50 bg-[#FFFFF0] text-sm text-[#17211C] focus:ring-2 focus:ring-[#008080] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#17211C] block mb-1">Weight (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-[12px] border border-[#CFB53B]/50 bg-[#FFFFF0] text-sm text-[#17211C] focus:ring-2 focus:ring-[#008080] focus:outline-none"
                  />
                </div>
              </div>

              {/* Mood */}
              <div>
                <label className="text-xs font-bold text-[#17211C] block mb-1">Parent's Mood</label>
                <div className="grid grid-cols-5 gap-2">
                  {['Very Good', 'Good', 'Fair', 'Unwell', 'Critical'].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMood(m as any)}
                      className={`py-1.5 rounded-[12px] text-xs font-semibold border transition-all ${
                        mood === m
                          ? 'bg-[#008080] border-[#CFB53B] text-[#FFFFF0] font-bold shadow-xs'
                          : 'border-[#CFB53B]/40 bg-[#FFFDD0] text-[#17211C]'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="text-xs font-bold text-[#17211C] block mb-1">Observations / Notes</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Completed 20 min morning walk, ate vegetable oats, reports zero dizziness."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-[12px] border border-[#CFB53B]/50 bg-[#FFFFF0] text-sm text-[#17211C] focus:ring-2 focus:ring-[#008080] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#CFB53B]/30">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-[12px] border border-[#CFB53B] text-[#17211C] text-xs font-semibold hover:bg-[#CFB53B]/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-[12px] bg-[#008080] hover:brightness-90 text-[#FFFFF0] text-xs font-bold shadow-md shadow-[#008080]/20 active:translate-y-[1px] transition-all"
                >
                  Save Reading
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
