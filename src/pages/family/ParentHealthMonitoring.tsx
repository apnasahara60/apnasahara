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
  FileText
} from 'lucide-react';
import { dbStore } from '../../lib/supabase';
import { ElderProfile, HealthMetric } from '../../types';
import { SimpleVitalChart } from '../../components/charts/SimpleVitalChart';
import { useNotification } from '../../context/NotificationContext';

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
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Parent Health Monitoring</h1>
          <p className="text-xs text-slate-500">
            Clinical vitals, daily readings and trend analysis for <strong>{elder?.name}</strong>
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-md shadow-brand-600/30 flex items-center justify-center gap-2 transition-all hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          Log New Vital Reading
        </button>
      </div>

      {/* Snapshot Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Blood Pressure</span>
            <Activity className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900">
            {latest?.systolic_bp || 124} / {latest?.diastolic_bp || 82}
            <span className="text-xs text-slate-400 font-normal ml-1">mmHg</span>
          </p>
          <span className="text-[11px] text-emerald-600 font-bold block">Target: 90-120/60-80</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Blood Glucose</span>
            <Heart className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900">
            {latest?.blood_glucose || 118}
            <span className="text-xs text-slate-400 font-normal ml-1">mg/dL</span>
          </p>
          <span className="text-[11px] text-blue-600 font-bold block">
            {latest?.blood_glucose_type || 'Fasting'} Reading
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Pulse / SpO2</span>
            <TrendingUp className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900">
            {latest?.heart_rate || 72} <span className="text-xs text-slate-400 font-normal">bpm</span> / {latest?.spo2 || 98}%
          </p>
          <span className="text-[11px] text-amber-600 font-bold block">Optimal oxygen saturation</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Weight / Sleep</span>
            <ShieldCheck className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900">
            {latest?.weight || 68.5} <span className="text-xs text-slate-400 font-normal">kg</span> / {latest?.sleep_hours || 7.5}h
          </p>
          <span className="text-[11px] text-purple-600 font-bold block">
            Mood: {latest?.mood || 'Good'}
          </span>
        </div>
      </div>

      {/* Interactive Trend Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm">
          <SimpleVitalChart metrics={metrics} vitalType="bp" title="Systolic & Diastolic Trend (mmHg)" />
        </div>
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm">
          <SimpleVitalChart metrics={metrics} vitalType="glucose" title="Blood Glucose Trend (mg/dL)" />
        </div>
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm">
          <SimpleVitalChart metrics={metrics} vitalType="heart_rate" title="Heart Rate Trend (bpm)" />
        </div>
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm">
          <SimpleVitalChart metrics={metrics} vitalType="spo2" title="Blood Oxygen SpO2 Trend (%)" />
        </div>
      </div>

      {/* Historical Logs Table */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-base text-slate-900">Comprehensive Vital Records Log</h3>
            <p className="text-xs text-slate-500">Every recording taken during attendant visits or self-logged</p>
          </div>
          <span className="text-xs font-semibold text-slate-400">{metrics.length} Total Readings</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider font-bold">
                <th className="pb-3 pl-2">Timestamp</th>
                <th className="pb-3">BP (mmHg)</th>
                <th className="pb-3">Glucose</th>
                <th className="pb-3">Pulse</th>
                <th className="pb-3">SpO2</th>
                <th className="pb-3">Weight</th>
                <th className="pb-3">Mood</th>
                <th className="pb-3 pr-2">Attendant Observations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {metrics.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 pl-2 font-medium text-slate-900">
                    {new Date(m.recorded_at).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}{' '}
                    <span className="text-slate-400 font-normal">
                      {new Date(m.recorded_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </td>
                  <td className="py-3.5 font-bold text-slate-900">
                    {m.systolic_bp || '-'}/{m.diastolic_bp || '-'}
                  </td>
                  <td className="py-3.5">
                    <span className="font-bold">{m.blood_glucose || '-'}</span>{' '}
                    <span className="text-[10px] text-slate-400">({m.blood_glucose_type || 'Fasting'})</span>
                  </td>
                  <td className="py-3.5 font-medium">{m.heart_rate || '-'} bpm</td>
                  <td className="py-3.5 font-medium text-purple-700">{m.spo2 || '-'}%</td>
                  <td className="py-3.5 font-medium">{m.weight ? `${m.weight} kg` : '-'}</td>
                  <td className="py-3.5">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-bold text-[10px]">
                      {m.mood || 'Good'}
                    </span>
                  </td>
                  <td className="py-3.5 pr-2 text-slate-500 max-w-xs truncate">
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
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-black text-slate-900">Log Vital Reading</h3>
                <p className="text-xs text-slate-500">Record new medical vitals for {elder?.name}</p>
              </div>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-700 text-lg">
                ✕
              </button>
            </div>

            <form onSubmit={handleAddMetric} className="space-y-4">
              {/* BP */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Systolic BP (mmHg)</label>
                  <input
                    type="number"
                    required
                    value={systolic}
                    onChange={(e) => setSystolic(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Diastolic BP (mmHg)</label>
                  <input
                    type="number"
                    required
                    value={diastolic}
                    onChange={(e) => setDiastolic(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Glucose & Type */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Blood Glucose (mg/dL)</label>
                  <input
                    type="number"
                    required
                    value={glucose}
                    onChange={(e) => setGlucose(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Timing Type</label>
                  <select
                    value={glucoseType}
                    onChange={(e) => setGlucoseType(e.target.value as any)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none bg-white"
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
                  <label className="text-xs font-bold text-slate-700 block mb-1">Heart Rate (Pulse bpm)</label>
                  <input
                    type="number"
                    required
                    value={heartRate}
                    onChange={(e) => setHeartRate(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Oxygen SpO2 (%)</label>
                  <input
                    type="number"
                    required
                    value={spo2}
                    onChange={(e) => setSpo2(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Temperature & Weight */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Body Temp (°F)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={temperature}
                    onChange={(e) => setTemperature(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Weight (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Mood */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Parent's Mood</label>
                <div className="grid grid-cols-5 gap-2">
                  {['Very Good', 'Good', 'Fair', 'Unwell', 'Critical'].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMood(m as any)}
                      className={`py-1.5 rounded-xl text-xs font-semibold border ${
                        mood === m ? 'bg-brand-50 border-brand-500 text-brand-800 font-bold' : 'border-slate-200 text-slate-600'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Observations / Notes</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Completed 20 min morning walk, ate vegetable oats, reports zero dizziness."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow-md shadow-brand-600/30"
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
