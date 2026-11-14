import React from 'react';
import { BarChart3, TrendingUp, Activity, CheckCircle2, AlertTriangle, Users, Award, Star } from 'lucide-react';

export const AnalyticsReportsPage: React.FC = () => {
  return (
    <div className="space-y-6 font-serif">
      <div className="border-b border-[#CFB53B]/30 pb-4">
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#008080]">Operational Intelligence</span>
        <h1 className="text-2xl font-bold text-[#17211C]">Analytics & Clinical Insights</h1>
        <p className="text-xs sm:text-sm text-[#17211C]/75 font-sans">
          Platform-wide elder health trends, emergency outcomes and quality metrics
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="art-card p-6 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-[#008080]">
            <span className="uppercase tracking-wider">Hospital ER Diversion</span>
            <Activity className="w-5 h-5 text-[#808000]" />
          </div>
          <p className="text-3xl font-bold text-[#17211C] font-mono">76%</p>
          <p className="text-xs text-[#17211C]/70 font-sans leading-relaxed">
            Eldercare incidents resolved safely at home through rapid Sahayak intervention before requiring ER admission.
          </p>
        </div>

        <div className="art-card p-6 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-[#008080]">
            <span className="uppercase tracking-wider">Anomaly Pre-Emptions</span>
            <TrendingUp className="w-5 h-5 text-[#005F9E]" />
          </div>
          <p className="text-3xl font-bold text-[#17211C] font-mono">312</p>
          <p className="text-xs text-[#17211C]/70 font-sans leading-relaxed">
            Hypertension and glycemic spikes flagged early to family doctors this month, preventing acute events.
          </p>
        </div>

        <div className="art-card p-6 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-[#008080]">
            <span className="uppercase tracking-wider">Medication Adherence</span>
            <Award className="w-5 h-5 text-[#CFB53B]" />
          </div>
          <p className="text-3xl font-bold text-[#17211C] font-mono">94.8%</p>
          <p className="text-xs text-[#17211C]/70 font-sans leading-relaxed">
            Consistently tracked pill adherence across all active senior households via digital logging.
          </p>
        </div>
      </div>

      {/* Regional City Performance Breakdown */}
      <div className="art-card p-6 space-y-4">
        <h3 className="font-bold text-base text-[#17211C]">Regional Cluster Performance</h3>
        <div className="space-y-3">
          {[
            { city: 'Delhi NCR Hub', completedVisits: 3840, responseTime: '7.2 mins', rating: '4.91 / 5.0' },
            { city: 'Bengaluru Hub', completedVisits: 2910, responseTime: '8.1 mins', rating: '4.88 / 5.0' },
            { city: 'Mumbai Hub', completedVisits: 2420, responseTime: '7.9 mins', rating: '4.90 / 5.0' },
            { city: 'Pune Hub', completedVisits: 1120, responseTime: '6.8 mins', rating: '4.94 / 5.0' }
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-art bg-[#FFFDD0] border border-[#CFB53B]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-sans">
              <span className="font-bold text-[#17211C] text-sm font-serif">{item.city}</span>
              <div className="flex flex-wrap items-center gap-6 text-[#17211C]/75">
                <span>Visits: <strong className="font-mono text-[#008080]">{item.completedVisits}</strong></span>
                <span>Avg SOS Dispatch: <strong className="font-mono text-[#800020]">{item.responseTime}</strong></span>
                <span className="flex items-center gap-1">Family Rating: <Star className="w-3.5 h-3.5 fill-[#CFB53B] text-[#CFB53B]" /><strong className="font-mono text-[#17211C]">{item.rating}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
