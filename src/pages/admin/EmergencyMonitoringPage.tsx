import React, { useState, useEffect } from 'react';
import {
  AlertTriangle,
  PhoneCall,
  ShieldCheck,
  CheckCircle2,
  Clock,
  MapPin,
  Ambulance,
  Building2,
  Volume2
} from 'lucide-react';
import { dbStore } from '../../lib/mongoStore';
import { SosAlert } from '../../types';
import { useNotification } from '../../context/NotificationContext';

export const EmergencyMonitoringPage: React.FC = () => {
  const { showToast, triggerEmergencySiren } = useNotification();
  const [alerts, setAlerts] = useState<SosAlert[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'resolved'>('active');

  const loadAlerts = () => {
    setAlerts(dbStore.getSosAlerts());
  };

  useEffect(() => {
    loadAlerts();
    const handleUpdate = () => loadAlerts();
    window.addEventListener('apnasahara_datachange', handleUpdate);
    return () => window.removeEventListener('apnasahara_datachange', handleUpdate);
  }, []);

  const handleUpdateStatus = (id: string, status: SosAlert['status']) => {
    dbStore.updateSosStatus(
      id,
      status,
      status === 'resolved' ? 'Resolved by Central Operations Commander.' : 'Ambulance 108 & nearest Sahayak dispatched.',
      'Control Desk Dispatcher'
    );
    showToast('Incident Updated', `SOS alert updated to ${status.toUpperCase()}`, status === 'resolved' ? 'info' : 'sos');
  };

  const filtered = alerts.filter(a => {
    if (filter === 'active') return a.status === 'triggered' || a.status === 'dispatched';
    if (filter === 'resolved') return a.status === 'resolved';
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <span className="text-red-600">🚨</span> Central Emergency SOS Dispatch Desk
          </h1>
          <p className="text-xs text-slate-500">
            Real-time incident response, ambulance coordination & resolution tracking
          </p>
        </div>

        <div className="flex items-center gap-2">
          {['active', 'resolved', 'all'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase transition-colors ${
                filter === f
                  ? 'bg-red-600 text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {f} ({alerts.filter(a => f === 'all' ? true : f === 'active' ? (a.status === 'triggered' || a.status === 'dispatched') : a.status === 'resolved').length})
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((alert) => (
          <div
            key={alert.id}
            className={`p-6 sm:p-7 rounded-3xl border-2 transition-all space-y-4 ${
              alert.status !== 'resolved'
                ? 'bg-red-50/80 border-red-400 shadow-xl ring-2 ring-red-400/40 animate-pulse'
                : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold shrink-0 ${
                  alert.status !== 'resolved' ? 'bg-red-600 text-white shadow-lg' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-black text-slate-900">{alert.elder_name}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full font-bold uppercase text-[10px] ${
                      alert.status !== 'resolved' ? 'bg-red-600 text-white' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {alert.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" /> {alert.address}
                  </p>
                </div>
              </div>

              {/* Status Action Buttons */}
              <div className="flex items-center gap-2">
                {alert.status === 'triggered' && (
                  <button
                    onClick={() => handleUpdateStatus(alert.id, 'dispatched')}
                    className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md"
                  >
                    Dispatch Sahayak & 108 Ambulance
                  </button>
                )}

                {alert.status !== 'resolved' && (
                  <button
                    onClick={() => handleUpdateStatus(alert.id, 'resolved')}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md"
                  >
                    Mark Safely Resolved ✓
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white border border-slate-200">
                <span className="text-slate-400 block text-[10px]">Elder Phone</span>
                <a href={`tel:${alert.elder_phone}`} className="font-bold text-brand-600 hover:underline">
                  {alert.elder_phone}
                </a>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200">
                <span className="text-slate-400 block text-[10px]">Triggered At</span>
                <strong className="text-slate-800">{new Date(alert.triggered_at).toLocaleString()}</strong>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200">
                <span className="text-slate-400 block text-[10px]">Assigned Responder</span>
                <strong className="text-slate-800">{alert.responder_name || 'Central Response Sahayak'}</strong>
              </div>
            </div>

            {alert.notes && (
              <p className="text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-200">
                <strong>Dispatch Log:</strong> {alert.notes}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
