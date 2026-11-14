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
  RotateCw,
  X
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
    <div className="space-y-6 font-serif text-[#17211C]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#CFB53B]/30 pb-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#008080]">
            Prescription Schedule
          </span>
          <h1 className="text-3xl font-bold text-[#17211C] tracking-tight">Medication Management</h1>
          <p className="text-xs text-[#17211C]/70 mt-0.5">
            Active prescriptions, dosage schedules & adherence for <strong>{elder?.name}</strong>
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 rounded-[12px] bg-[#008080] hover:brightness-90 text-[#FFFFF0] font-semibold text-xs shadow-md shadow-[#008080]/20 flex items-center justify-center gap-2 transition-all active:translate-y-[1px]"
        >
          <Plus className="w-4 h-4 text-[#CFB53B]" />
          <span>Add Prescription Medicine</span>
        </button>
      </div>

      {/* Adherence Banner */}
      <div className="p-6 rounded-[12px] bg-[#FFFFF0] border border-[#CFB53B]/40 shadow-[0_2px_12px_rgba(23,33,28,0.05)] flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        

        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-[12px] bg-[#008080]/15 text-[#008080] flex items-center justify-center font-bold text-xl border border-[#CFB53B]/50 font-mono">
            {adherencePercent}%
          </div>
          <div>
            <h3 className="text-base font-bold text-[#17211C]">Today's Medication Adherence</h3>
            <p className="text-xs text-[#17211C]/70 mt-0.5">
              {takenCount} of {totalCount} scheduled doses confirmed taken today
            </p>
          </div>
        </div>

        <div className="w-full md:w-64 space-y-1.5">
          <div className="flex justify-between text-xs font-semibold text-[#17211C]">
            <span>Daily Target</span>
            <span className="font-mono text-[#008080] font-bold">{takenCount} / {totalCount} Taken</span>
          </div>
          <div className="w-full h-3 rounded-full bg-[#FFFDD0] border border-[#CFB53B]/30 overflow-hidden">
            <div
              className="h-full bg-[#008080] rounded-full transition-all duration-500"
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
              className={`p-6 rounded-[12px] bg-[#FFFFF0] border transition-all space-y-4 ${
                med.is_taken_today
                  ? 'border-[#CFB53B]/40 shadow-[0_2px_12px_rgba(23,33,28,0.05)]'
                  : 'border-[#CFB53B] shadow-[0_4px_16px_rgba(207,181,59,0.15)] ring-1 ring-[#CFB53B]/50'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className={`w-11 h-11 rounded-[10px] flex items-center justify-center shrink-0 border ${
                    med.is_taken_today
                      ? 'bg-[#808000]/15 text-[#808000] border-[#808000]/30'
                      : 'bg-[#008080]/15 text-[#008080] border-[#008080]/30'
                  }`}>
                    <Pill className="w-5 h-5 text-[#008080]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#17211C] text-base">{med.name}</h3>
                    <p className="text-xs font-medium text-[#17211C]/70">
                      {med.dosage} • {med.frequency}
                    </p>
                    <span className="text-[11px] text-[#008080] font-semibold flex items-center gap-1 mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-[#CFB53B]" /> Scheduled at {med.scheduled_time}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleToggleTaken(med.id, med.is_taken_today)}
                  className={`px-3.5 py-1.5 rounded-[12px] text-xs font-semibold transition-all flex items-center gap-1.5 active:translate-y-[1px] ${
                    med.is_taken_today
                      ? 'bg-[#808000]/15 text-[#808000] border border-[#808000]/30'
                      : 'bg-[#008080] text-[#FFFFF0] hover:brightness-90 shadow-sm'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{med.is_taken_today ? `Taken (${med.taken_at || 'Done'})` : 'Mark Taken'}</span>
                </button>
              </div>

              <div className="p-3 rounded-[8px] bg-[#FFFDD0] text-xs text-[#17211C]/80 border border-[#CFB53B]/30">
                <strong>Doctor's Instructions:</strong> {med.instructions}
              </div>

              {/* Pill Count & Refill Status */}
              <div className="flex items-center justify-between text-xs pt-1 border-t border-[#CFB53B]/20">
                <div className="flex items-center gap-1.5">
                  <span className="text-[#17211C]/70">Pills Remaining:</span>
                  <span className={`font-bold font-mono ${isLowPills ? 'text-[#800020]' : 'text-[#17211C]'}`}>
                    {med.pills_remaining} pills
                  </span>
                  {isLowPills && (
                    <span className="text-[10px] bg-[#800020]/15 text-[#800020] border border-[#800020]/30 font-bold px-2 py-0.5 rounded-full">
                      Low Stock!
                    </span>
                  )}
                </div>

                {isLowPills && (
                  <button
                    onClick={() => handleOrderRefill(med)}
                    className="text-xs font-semibold text-[#800020] hover:underline flex items-center gap-1"
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
        <div className="fixed inset-0 z-[300] bg-[#17211C]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFFF0] rounded-[12px] border border-[#CFB53B] max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
            

            <div className="flex items-center justify-between pb-3 border-b border-[#CFB53B]/30">
              <div>
                <span className="text-[11px] font-bold text-[#008080] uppercase tracking-wider">
                  Prescription Entry
                </span>
                <h3 className="text-xl font-bold text-[#17211C]">Add New Prescription Medicine</h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-[#17211C]/60 hover:text-[#800020]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddMedication} className="space-y-4 text-left">
              <div>
                <label className="text-xs font-bold text-[#17211C] block mb-1">Medicine Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Telmisartan (Telma 40)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-[12px] border border-[#CFB53B]/50 bg-[#FFFFF0] text-sm text-[#17211C] focus:ring-2 focus:ring-[#008080] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#17211C] block mb-1">Dosage *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 40 mg or 1 tablet"
                    value={dosage}
                    onChange={(e) => setDosage(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-[12px] border border-[#CFB53B]/50 bg-[#FFFFF0] text-sm text-[#17211C] focus:ring-2 focus:ring-[#008080] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#17211C] block mb-1">Frequency *</label>
                  <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-[12px] border border-[#CFB53B]/50 bg-[#FFFFF0] text-sm text-[#17211C] focus:ring-2 focus:ring-[#008080] focus:outline-none"
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
                  <label className="text-xs font-bold text-[#17211C] block mb-1">Scheduled Time *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 08:00 AM"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-[12px] border border-[#CFB53B]/50 bg-[#FFFFF0] text-sm text-[#17211C] focus:ring-2 focus:ring-[#008080] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#17211C] block mb-1">Pills in Bottle *</label>
                  <input
                    type="number"
                    required
                    value={pillsRemaining}
                    onChange={(e) => setPillsRemaining(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-[12px] border border-[#CFB53B]/50 bg-[#FFFFF0] text-sm text-[#17211C] focus:ring-2 focus:ring-[#008080] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#17211C] block mb-1">Dietary Instructions</label>
                <input
                  type="text"
                  placeholder="e.g. Take with warm water after breakfast for BP control."
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-[12px] border border-[#CFB53B]/50 bg-[#FFFFF0] text-sm text-[#17211C] focus:ring-2 focus:ring-[#008080] focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#CFB53B]/30">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-[12px] border border-[#CFB53B] text-xs font-semibold text-[#17211C] hover:bg-[#CFB53B]/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-[12px] bg-[#008080] hover:brightness-90 text-[#FFFFF0] text-xs font-bold shadow-md shadow-[#008080]/20 active:translate-y-[1px] transition-all"
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
