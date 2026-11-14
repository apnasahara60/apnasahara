import React from 'react';
import { BarChart3, TrendingUp, Activity, CheckCircle2, AlertTriangle, Users, Award } from 'lucide-react';

export const AnalyticsReportsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Analytics & Clinical Insights</h1>
        <p className="text-xs text-slate-500">
          Platform-wide elder health trends, emergency outcomes and quality metrics
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Hospital Emergency Diversion</span>
            <Activity className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-3xl font-black text-slate-900">76%</p>
          <p className="text-xs text-slate-500 leading-relaxed">
            Eldercare incidents resolved safely at home through rapid Sahayak intervention before requiring ER admission.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>BP & Glucose Anomaly Detection</span>
            <TrendingUp className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-black text-slate-900">312</p>
          <p className="text-xs text-slate-500 leading-relaxed">
            Hypertension and glycemic spikes flagged early to family doctors this month, preventing acute events.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Medication Adherence Score</span>
            <Award className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-3xl font-black text-slate-900">94.8%</p>
          <p className="text-xs text-slate-500 leading-relaxed">
            Consistently tracked pill adherence across all active senior households.
          </p>
        </div>
      </div>

      {/* Regional City Performance Breakdown */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-bold text-base text-slate-900">Regional Cluster Performance</h3>
        <div className="space-y-3">
          {[
            { city: 'Delhi NCR Hub', completedVisits: 3840, responseTime: '7.2 mins', rating: '4.91 / 5.0' },
            { city: 'Bengaluru Hub', completedVisits: 2910, responseTime: '8.1 mins', rating: '4.88 / 5.0' },
            { city: 'Mumbai Hub', completedVisits: 2420, responseTime: '7.9 mins', rating: '4.90 / 5.0' },
            { city: 'Pune Hub', completedVisits: 1120, responseTime: '6.8 mins', rating: '4.94 / 5.0' }
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <span className="font-bold text-slate-900 text-sm">{item.city}</span>
              <div className="flex items-center gap-6 text-slate-600">
                <span>Visits: <strong>{item.completedVisits}</strong></span>
                <span>Avg SOS Dispatch: <strong className="text-brand-600">{item.responseTime}</strong></span>
                <span>Family Rating: <strong className="text-amber-600">⭐ {item.rating}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
