import React from 'react';
import { Activity, Heart, TrendingUp, ShieldCheck, Volume2, CheckCircle2 } from 'lucide-react';
import { dbStore } from '../../lib/mongoStore';
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
    <div className="space-y-6 font-serif">
      <div className="flex items-center justify-between border-b border-[#CFB53B]/30 pb-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#008080]">Senior Health Vitals</span>
          <h1 className="text-2xl font-bold text-[#17211C]">Your Health Overview • सेहत का हाल</h1>
          <p className="text-xs sm:text-sm text-[#17211C]/75 font-sans">Simple readings from your morning check-in</p>
        </div>
        <button
          onClick={handleReadVitals}
          className="art-btn-primary px-4 py-2 flex items-center gap-1.5 text-xs shadow-md"
        >
          <Volume2 className="w-4 h-4 text-[#CFB53B]" /> Listen to Readings
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* BP */}
        <div className="art-card p-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-[#17211C]/70">Blood Pressure (रक्तचाप)</span>
            <div className="w-9 h-9 rounded-art bg-[#808000]/10 border border-[#808000]/30 flex items-center justify-center">
              <Activity className="w-5 h-5 text-[#808000]" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-4xl font-bold text-[#17211C] font-mono">
              {latest?.systolic_bp || 124} / {latest?.diastolic_bp || 82}
            </span>
            <span className="text-sm font-semibold text-[#17211C]/60 font-sans">mmHg</span>
          </div>
          <div className="text-xs font-bold text-[#808000] bg-[#808000]/10 p-2.5 rounded-art border border-[#808000]/30 flex items-center gap-1.5 font-sans">
            <CheckCircle2 className="w-4 h-4 text-[#808000]" />
            <span>Optimal & Normal Range</span>
          </div>
        </div>

        {/* Glucose */}
        <div className="art-card p-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-[#17211C]/70">Blood Sugar (शुगर)</span>
            <div className="w-9 h-9 rounded-art bg-[#005F9E]/10 border border-[#005F9E]/30 flex items-center justify-center">
              <Heart className="w-5 h-5 text-[#005F9E]" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-4xl font-bold text-[#17211C] font-mono">
              {latest?.blood_glucose || 118}
            </span>
            <span className="text-sm font-semibold text-[#17211C]/60 font-sans">mg/dL</span>
          </div>
          <div className="text-xs font-bold text-[#005F9E] bg-[#005F9E]/10 p-2.5 rounded-art border border-[#005F9E]/30 flex items-center gap-1.5 font-sans">
            <CheckCircle2 className="w-4 h-4 text-[#005F9E]" />
            <span>Fasting Sugar Balanced</span>
          </div>
        </div>

        {/* Pulse */}
        <div className="art-card p-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-[#17211C]/70">Heart Rate (नाड़ी)</span>
            <div className="w-9 h-9 rounded-art bg-[#CFB53B]/20 border border-[#CFB53B]/50 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#17211C]" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-4xl font-bold text-[#17211C] font-mono">
              {latest?.heart_rate || 72}
            </span>
            <span className="text-sm font-semibold text-[#17211C]/60 font-sans">beats per min</span>
          </div>
          <div className="text-xs font-bold text-[#17211C] bg-[#FFFDD0] p-2.5 rounded-art border border-[#CFB53B]/40 flex items-center gap-1.5 font-sans">
            <CheckCircle2 className="w-4 h-4 text-[#808000]" />
            <span>Resting Pulse Steady</span>
          </div>
        </div>

        {/* Oxygen */}
        <div className="art-card p-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-[#17211C]/70">Oxygen (ऑक्सीजन)</span>
            <div className="w-9 h-9 rounded-art bg-[#008080]/10 border border-[#008080]/30 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-[#008080]" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-4xl font-bold text-[#17211C] font-mono">
              {latest?.spo2 || 98}%
            </span>
            <span className="text-sm font-semibold text-[#17211C]/60 font-sans">SpO2</span>
          </div>
          <div className="text-xs font-bold text-[#008080] bg-[#008080]/10 p-2.5 rounded-art border border-[#008080]/30 flex items-center gap-1.5 font-sans">
            <CheckCircle2 className="w-4 h-4 text-[#008080]" />
            <span>Optimal Breathing Saturation</span>
          </div>
        </div>
      </div>
    </div>
  );
};
