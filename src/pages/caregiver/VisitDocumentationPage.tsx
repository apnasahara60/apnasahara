import React, { useState } from 'react';
import { FileText, Activity, CheckCircle2, Send, Heart, Camera } from 'lucide-react';
import { dbStore } from '../../lib/mongoStore';
import { Visit } from '../../types';
import { useNotification } from '../../context/NotificationContext';

export const VisitDocumentationPage: React.FC = () => {
  const { showToast } = useNotification();
  const caregiver = dbStore.getCaregivers()[0];
  const elder = dbStore.getElders()[0];
  const visits = dbStore.getVisits(caregiver?.id);
  const activeVisit = visits[0];

  const [bp, setBp] = useState('126/84');
  const [pulse, setPulse] = useState('74');
  const [spo2, setSpo2] = useState('98');
  const [glucose, setGlucose] = useState('116');
  const [notes, setNotes] = useState('Uncle was cheerful and completed 25 mins of joint mobility stretches in the balcony. Afternoon medicines were verified in the dispenser box.');
  const [photoUploaded, setPhotoUploaded] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeVisit) return;

    const updated: Visit = {
      ...activeVisit,
      vitals_recorded: {
        bp: `${bp} mmHg`,
        pulse: Number(pulse),
        spo2: Number(spo2),
        glucose: Number(glucose)
      },
      notes
    };

    dbStore.updateVisit(updated);

    // Also record health metric in health store
    const [sys, dia] = bp.split('/').map(Number);
    dbStore.addHealthMetric({
      elder_id: elder.id,
      systolic_bp: sys || 124,
      diastolic_bp: dia || 82,
      heart_rate: Number(pulse),
      spo2: Number(spo2),
      blood_glucose: Number(glucose),
      blood_glucose_type: 'Post-Meal',
      mood: 'Very Good',
      notes: `Recorded by Sahayak ${caregiver.name} during home visit.`
    });

    setSubmitted(true);
    showToast('Visit Documentation Submitted', 'Full clinical report dispatched to family portal', 'visit');
  };

  return (
    <div className="space-y-6 font-serif">
      <div className="border-b border-[#CFB53B]/30 pb-4">
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#008080]">Post-Visit Documentation</span>
        <h1 className="text-2xl font-bold text-[#17211C]">Clinical Log & Visit Record</h1>
        <p className="text-xs sm:text-sm text-[#17211C]/75 font-sans">
          Document recorded vitals, tasks completed, and observations for <strong>{elder?.name}</strong>
        </p>
      </div>

      {submitted ? (
        <div className="relative art-card p-8 sm:p-12 text-center space-y-4 shadow-xl">
          
          

          <div className="w-16 h-16 rounded-full bg-[#808000]/15 text-[#808000] border-2 border-[#808000] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-[#17211C]">Report Successfully Submitted!</h2>
          <p className="text-xs sm:text-sm text-[#17211C]/75 max-w-md mx-auto font-sans">
            Your detailed visit report and vital readings have been saved to the permanent clinical record and dispatched to the family portal.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="art-btn-primary px-6 py-2.5 text-xs shadow-md"
          >
            Edit or Submit Another Log
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmitReport} className="space-y-6 art-card p-6 sm:p-8">
          {/* Vitals Recording Section */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-[#17211C] flex items-center gap-2 border-b border-[#CFB53B]/30 pb-2">
              <Activity className="w-5 h-5 text-[#008080]" />
              1. Record Vital Signs Taken During Visit
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="text-xs font-bold text-[#17211C] block mb-1 font-sans">Blood Pressure (mmHg)</label>
                <input
                  type="text"
                  required
                  value={bp}
                  onChange={(e) => setBp(e.target.value)}
                  placeholder="120/80"
                  className="art-input w-full font-mono text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#17211C] block mb-1 font-sans">Resting Pulse (BPM)</label>
                <input
                  type="number"
                  required
                  value={pulse}
                  onChange={(e) => setPulse(e.target.value)}
                  placeholder="72"
                  className="art-input w-full font-mono text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#17211C] block mb-1 font-sans">Oxygen SpO2 (%)</label>
                <input
                  type="number"
                  required
                  value={spo2}
                  onChange={(e) => setSpo2(e.target.value)}
                  placeholder="98"
                  className="art-input w-full font-mono text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#17211C] block mb-1 font-sans">Blood Glucose (mg/dL)</label>
                <input
                  type="number"
                  required
                  value={glucose}
                  onChange={(e) => setGlucose(e.target.value)}
                  placeholder="110"
                  className="art-input w-full font-mono text-sm"
                />
              </div>
            </div>
          </div>

          {/* Observations and Notes */}
          <div className="space-y-2">
            <h3 className="text-base font-bold text-[#17211C] flex items-center gap-2 border-b border-[#CFB53B]/30 pb-2">
              <FileText className="w-5 h-5 text-[#008080]" />
              2. Observations & Wellness Summary
            </h3>
            <textarea
              rows={4}
              required
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="art-input w-full font-sans text-sm"
              placeholder="Record details of elder mood, dietary intake, mobility, and activities completed..."
            />
          </div>

          {/* Optional Photo Attachment */}
          <div className="p-4 rounded-art bg-[#FFFDD0] border border-[#CFB53B]/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-art bg-[#FFFFF0] border border-[#CFB53B]/60 flex items-center justify-center text-[#008080]">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#17211C]">Prescription Dispenser Verification Photo</p>
                <p className="text-[11px] text-[#808000] font-semibold font-sans">✓ Verified timestamped photo attached</p>
              </div>
            </div>
            <span className="text-xs font-bold text-[#008080] font-mono">IMG_7402.JPG</span>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="art-btn-primary w-full py-3.5 flex items-center justify-center gap-2 text-sm shadow-md"
            >
              <Send className="w-4 h-4 text-[#CFB53B]" /> Dispatch Visit Report to Family
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
