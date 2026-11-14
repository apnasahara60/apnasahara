import React, { useState } from 'react';
import { FileText, Activity, Camera, CheckCircle2, Send, Heart } from 'lucide-react';
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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Post-Visit Documentation & Clinical Log</h1>
        <p className="text-xs text-slate-500">
          Document recorded vitals, tasks completed, and observations for <strong>{elder?.name}</strong>
        </p>
      </div>

      {submitted ? (
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 text-center space-y-4 shadow-xl">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">Report Successfully Submitted!</h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
            Your detailed visit report and vital readings have been saved and delivered directly to the family portal.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
          >
            Edit or Submit Another Log
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmitReport} className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
          {/* Vitals Recording Section */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-600" />
              1. Record Vital Signs Taken During Visit
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Blood Pressure (mmHg)</label>
                <input
                  type="text"
                  required
                  value={bp}
                  onChange={(e) => setBp(e.target.value)}
                  placeholder="120/80"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Resting Pulse (bpm)</label>
                <input
                  type="number"
                  required
                  value={pulse}
                  onChange={(e) => setPulse(e.target.value)}
                  placeholder="72"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Oxygen SpO2 (%)</label>
                <input
                  type="number"
                  required
                  value={spo2}
                  onChange={(e) => setSpo2(e.target.value)}
                  placeholder="98"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Blood Sugar (mg/dL)</label>
                <input
                  type="number"
                  required
                  value={glucose}
                  onChange={(e) => setGlucose(e.target.value)}
                  placeholder="110"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Observations */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <h3 className="text-base font-bold text-slate-900">2. Attendant Field Observations</h3>
            <textarea
              rows={4}
              required
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Record elder mood, hydration, appetite, and any physical complaints..."
              className="w-full p-3.5 rounded-2xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Photo Verification Upload */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Camera className="w-5 h-5 text-blue-600" />
              3. Photo Verification (Medicine box / Exercise / Meal)
            </h3>
            <div className="p-4 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  📷
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-xs">Dispenser_Box_Nov14.jpg</p>
                  <p className="text-[10px] text-slate-400">Captured at 11:15 AM • 1.4 MB</p>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-600">Attached ✓</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all"
          >
            <Send className="w-4 h-4" />
            Submit Final Visit Report & Notify Family
          </button>
        </form>
      )}
    </div>
  );
};
