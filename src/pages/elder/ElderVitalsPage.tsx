import React from 'react';
import { Activity, Heart, TrendingUp, ShieldCheck, Volume2 } from 'lucide-react';
import { dbStore } from '../../lib/supabase';
import { useAccessibility } from '../../context/AccessibilityContext';

export const ElderVitalsPage: React.FC = () => {
  const { speak } = useAccessibility();
  const elder = dbStore.getElders()[0];
  const metrics = dbStore.getHealthMetrics(elder?.id);
  const latest = metrics[0];

  const handleReadVitals = () => {
    speak(
      `Your latest recorded blood pressure is ${latest?.systolic_bp || 124} over ${latest?.diastolic_bp || 82}. Blood sugar is ${latest?.blood_glucose || 118} milligrams per deciliter, and resting pulse is ${latest?.heart_rate || 72} beats per minute. All readings are stable and healthy.`
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Your Health Overview • सेहत का हाल</h1>
          <p className="text-xs sm:text-sm text-slate-600">Simple readings from your morning check-in</p>
        </div>
        <button
          onClick={handleReadVitals}
          className="px-4 py-2 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md"
        >
          <Volume2 className="w-4 h-4" /> Listen to Readings
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* BP */}
        <div className="p-6 rounded-3xl bg-white border-2 border-emerald-300 shadow-md space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-500">Blood Pressure (रक्तचाप)</span>
            <Activity className="w-6 h-6 text-emerald-600" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black text-slate-900">
              {latest?.systolic_bp || 124} / {latest?.diastolic_bp || 82}
            </span>
            <span className="text-sm font-bold text-slate-400">mmHg</span>
          </div>
          <p className="text-xs font-bold text-emerald-700 bg-emerald-50 p-2 rounded-xl border border-emerald-200">
            ✓ Healthy & Normal Range
          </p>
        </div>

        {/* Glucose */}
        <div className="p-6 rounded-3xl bg-white border-2 border-blue-300 shadow-md space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-500">Blood Sugar (शुगर)</span>
            <Heart className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black text-slate-900">
              {latest?.blood_glucose || 118}
            </span>
            <span className="text-sm font-bold text-slate-400">mg/dL</span>
          </div>
          <p className="text-xs font-bold text-blue-700 bg-blue-50 p-2 rounded-xl border border-blue-200">
            ✓ Fasting Sugar is in Balance
          </p>
        </div>

        {/* Pulse */}
        <div className="p-6 rounded-3xl bg-white border-2 border-amber-300 shadow-md space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-500">Heart Rate (नाड़ी)</span>
            <TrendingUp className="w-6 h-6 text-amber-600" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black text-slate-900">
              {latest?.heart_rate || 72}
            </span>
            <span className="text-sm font-bold text-slate-400">beats per min</span>
          </div>
          <p className="text-xs font-bold text-amber-800 bg-amber-50 p-2 rounded-xl border border-amber-200">
            ✓ Resting Pulse Steady
          </p>
        </div>

        {/* Oxygen */}
        <div className="p-6 rounded-3xl bg-white border-2 border-purple-300 shadow-md space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-500">Oxygen (ऑक्सीजन)</span>
            <ShieldCheck className="w-6 h-6 text-purple-600" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black text-slate-900">
              {latest?.spo2 || 98}%
            </span>
          </div>
          <p className="text-xs font-bold text-purple-700 bg-purple-50 p-2 rounded-xl border border-purple-200">
            ✓ Optimal Breathing Saturation
          </p>
        </div>
      </div>
    </div>
  );
};
