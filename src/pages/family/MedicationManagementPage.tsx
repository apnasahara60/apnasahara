import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  Pill,
  Plus,
  CheckCircle2,
  Clock,
  AlertCircle,
  Calendar,
  Sparkles,
  ShoppingBag,
  RotateCw
} from 'lucide-react';
import { dbStore } from '../../lib/supabase';
import { ElderProfile, Medication } from '../../types';
import { useNotification } from '../../context/NotificationContext';

export const MedicationManagementPage: React.FC = () => {
  const context = useOutletContext<{ selectedElder?: ElderProfile }>();
  const elder = context?.selectedElder || dbStore.getElders()[0];
  const { showToast } = useNotification();

  const [medications, setMedications] = useState<Medication[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('Once Daily');
  const [timeOfDay, setTimeOfDay] = useState<('Morning' | 'Afternoon' | 'Evening' | 'Night')[]>(['Morning']);
  const [scheduledTime, setScheduledTime] = useState('08:00 AM');
  const [instructions, setInstructions] = useState('');
  const [pillsRemaining, setPillsRemaining] = useState('30');
  const [refillThreshold, setRefillThreshold] = useState('7');

  const loadMeds = () => {
    if (elder) {
      setMedications(dbStore.getMedications(elder.id));
    }
  };

  useEffect(() => {
    loadMeds();
    const handleUpdate = () => loadMeds();
    window.addEventListener('apnasahara_datachange', handleUpdate);
    return () => window.removeEventListener('apnasahara_datachange', handleUpdate);
  }, [elder]);

  const handleToggleTaken = (id: string, current: boolean) => {
    dbStore.toggleMedicationTaken(id, !current);
    showToast(
      !current ? 'Dose Marked Taken' : 'Dose Marked Pending',
      !current ? 'Adherence recorded' : 'Medication adherence updated',
      'medication'
    );
  };

  const handleAddMedication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!elder) return;

    dbStore.addMedication({
      elder_id: elder.id,
      name,
      dosage,
      frequency,
      time_of_day: timeOfDay,
      scheduled_time: scheduledTime,
      instructions: instructions || 'Take with water after meals.',
      pills_remaining: Number(pillsRemaining),
      refill_alert_threshold: Number(refillThreshold)
    });

    showToast('Prescription Added', `${name} scheduled for ${scheduledTime}`, 'medication');
    setShowAddModal(false);
    setName('');
    setDosage('');
    setInstructions('');
  };

  const handleOrderRefill = (med: Medication) => {
    dbStore.createAssistanceRequest({
      elder_id: elder.id,
      elder_name: elder.name,
      type: 'Medicine',
      details: `Refill requested for ${med.name} (${med.dosage}). Only ${med.pills_remaining} pills left.`,
      urgency: 'Medium'
    });
    showToast('Refill Delivery Requested', `Care team will dispatch ${med.name} to ${elder.address}`, 'medication');
  };

  const takenCount = medications.filter(m => m.is_taken_today).length;
  const totalCount = medications.length;
  const adherencePercent = totalCount > 0 ? Math.round((takenCount / totalCount) * 100) : 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Medication Management</h1>
          <p className="text-xs text-slate-500">
            Active prescriptions, dosage schedules & adherence for <strong>{elder?.name}</strong>
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-md shadow-brand-600/30 flex items-center justify-center gap-2 transition-all hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          Add Prescription Medicine
        </button>
      </div>

      {/* Adherence Banner */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center font-black text-xl border border-brand-200">
            {adherencePercent}%
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Today's Medication Adherence</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {takenCount} of {totalCount} scheduled doses confirmed taken today
            </p>
          </div>
        </div>

        <div className="w-full md:w-64 space-y-1.5">
          <div className="flex justify-between text-xs font-semibold text-slate-600">
            <span>Daily Target</span>
            <span>{takenCount} / {totalCount} Taken</span>
          </div>
          <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${adherencePercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Medication Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {medications.map((med) => {
          const isLowPills = med.pills_remaining <= med.refill_alert_threshold;

          return (
            <div
              key={med.id}
              className={`p-6 rounded-3xl bg-white border transition-all space-y-4 ${
                med.is_taken_today
                  ? 'border-slate-200 shadow-sm'
                  : 'border-amber-300 shadow-md ring-1 ring-amber-300/50'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-lg shrink-0 ${
                    med.is_taken_today ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                  }`}>
                    💊
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base">{med.name}</h3>
                    <p className="text-xs font-semibold text-slate-500">
                      {med.dosage} • {med.frequency}
                    </p>
                    <span className="text-[11px] text-brand-700 font-bold flex items-center gap-1 mt-0.5">
                      <Clock className="w-3.5 h-3.5" /> Scheduled at {med.scheduled_time}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleToggleTaken(med.id, med.is_taken_today)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                    med.is_taken_today
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {med.is_taken_today ? `Taken ✓ (${med.taken_at || 'Done'})` : 'Mark Taken'}
                </button>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 text-xs text-slate-600 border border-slate-100">
                <strong>Doctor's Instructions:</strong> {med.instructions}
              </div>

              {/* Pill Count & Refill Status */}
              <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-500">Pills Remaining:</span>
                  <span className={`font-black ${isLowPills ? 'text-red-600' : 'text-slate-800'}`}>
                    {med.pills_remaining} pills
                  </span>
                  {isLowPills && (
                    <span className="text-[10px] bg-red-100 text-red-700 font-bold px-1.5 py-0.5 rounded">
                      Low Stock!
                    </span>
                  )}
                </div>

                {isLowPills && (
                  <button
                    onClick={() => handleOrderRefill(med)}
                    className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 underline"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" /> Order Doorstep Refill
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Medication Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-xl font-black text-slate-900">Add New Prescription Medicine</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <form onSubmit={handleAddMedication} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Medicine Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Telmisartan (Telma 40)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Dosage *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 40 mg or 1 tablet"
                    value={dosage}
                    onChange={(e) => setDosage(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Frequency *</label>
                  <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none bg-white"
                  >
                    <option>Once Daily</option>
                    <option>Twice Daily</option>
                    <option>Thrice Daily</option>
                    <option>As Needed (SOS)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Scheduled Time *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 08:00 AM"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Pills in Bottle *</label>
                  <input
                    type="number"
                    required
                    value={pillsRemaining}
                    onChange={(e) => setPillsRemaining(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Dietary Instructions</label>
                <input
                  type="text"
                  placeholder="e.g. Take with warm water after breakfast for BP control."
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow-md shadow-brand-600/30"
                >
                  Save Prescription
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
