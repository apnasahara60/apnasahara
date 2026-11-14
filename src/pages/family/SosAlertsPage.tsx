import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  AlertTriangle,
  PhoneCall,
  ShieldAlert,
  CheckCircle2,
  Clock,
  Volume2,
  VolumeX,
  UserCheck,
  Building2,
  FileCheck,
  Ambulance
} from 'lucide-react';
import { dbStore } from '../../lib/supabase';
import { ElderProfile, SosAlert } from '../../types';
import { useNotification } from '../../context/NotificationContext';

export const SosAlertsPage: React.FC = () => {
  const context = useOutletContext<{ selectedElder?: ElderProfile }>();
  const elder = context?.selectedElder || dbStore.getElders()[0];
  const { isMuted, toggleMute, triggerEmergencySiren, stopEmergencySiren, showToast } = useNotification();

  const [alerts, setAlerts] = useState<SosAlert[]>([]);
  const [resolverNotes, setResolverNotes] = useState('');
  const [selectedAlertToResolve, setSelectedAlertToResolve] = useState<SosAlert | null>(null);

  const loadAlerts = () => {
    const list = dbStore.getSosAlerts();
    setAlerts(elder ? list.filter(a => a.elder_id === elder.id) : list);
  };

  useEffect(() => {
    loadAlerts();
    const handleUpdate = () => loadAlerts();
    window.addEventListener('apnasahara_datachange', handleUpdate);
    return () => window.removeEventListener('apnasahara_datachange', handleUpdate);
  }, [elder]);

  const activeAlert = alerts.find(a => a.status === 'triggered' || a.status === 'dispatched');

  const handleResolve = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAlertToResolve) return;

    dbStore.updateSosStatus(
      selectedAlertToResolve.id,
      'resolved',
      resolverNotes || 'Resolved safely by family coordination.',
      'Family & Attendant'
    );

    stopEmergencySiren();
    showToast('SOS Alert Resolved', 'Emergency alert has been closed and status archived.', 'info');
    setSelectedAlertToResolve(null);
    setResolverNotes('');
  };

  const handleSimulateSos = () => {
    if (!elder) return;
    dbStore.triggerSos(
      elder.id,
      elder.name,
      elder.phone,
      elder.address,
      elder.safe_zone_lat,
      elder.safe_zone_lng
    );
    triggerEmergencySiren();
    showToast('🚨 SOS ALERT INITIATED', 'Simulated emergency alert dispatched to central network!', 'sos');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <span className="text-red-600">🚨</span> Emergency SOS Control Room
          </h1>
          <p className="text-xs text-slate-500">
            Rapid response dispatch and emergency notification history for <strong>{elder?.name}</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleMute}
            className="px-4 py-2 rounded-2xl bg-white border border-slate-200 text-slate-700 text-xs font-bold shadow-sm flex items-center gap-2 hover:bg-slate-50"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
            {isMuted ? 'Siren Muted' : 'Siren Audio: Active'}
          </button>

          <button
            onClick={handleSimulateSos}
            className="px-5 py-2 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-black text-xs shadow-lg shadow-red-600/30 flex items-center gap-2 transition-transform hover:scale-105"
          >
            <AlertTriangle className="w-4 h-4 animate-bounce" />
            Trigger Test SOS
          </button>
        </div>
      </div>

      {/* Active Emergency Alert Banner if Live */}
      {activeAlert && (
        <div className="p-6 sm:p-8 rounded-3xl bg-red-600 text-white shadow-2xl shadow-red-600/40 border border-red-500 space-y-6 animate-pulse">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-8 h-8 text-white" />
              </div>
              <div>
                <span className="text-[11px] font-black uppercase tracking-widest bg-red-800/80 px-2.5 py-0.5 rounded-full border border-red-400">
                  Critical Alert #{activeAlert.id.slice(-6)}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black mt-1">EMERGENCY SOS IN PROGRESS</h2>
                <p className="text-xs text-red-100">
                  Triggered at {new Date(activeAlert.triggered_at).toLocaleTimeString()} from {activeAlert.address}
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedAlertToResolve(activeAlert)}
              className="px-6 py-3 rounded-2xl bg-white text-red-700 hover:bg-red-50 font-black text-xs shadow-lg shrink-0"
            >
              Mark Alert as Resolved ✓
            </button>
          </div>

          {/* Real-time Response Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-red-500/80">
            <div className="p-4 rounded-2xl bg-red-700/60 border border-red-500">
              <span className="text-xs font-bold text-red-200">Stage 1: Alert Broadcasted</span>
              <p className="text-sm font-bold text-white mt-1">Family & Central Desk Notified</p>
              <p className="text-[11px] text-red-200 mt-0.5">Siren dispatched to all registered numbers</p>
            </div>
            <div className="p-4 rounded-2xl bg-red-700/60 border border-red-500">
              <span className="text-xs font-bold text-red-200">Stage 2: Responder En Route</span>
              <p className="text-sm font-bold text-white mt-1">Priya Verma (GDA Nurse)</p>
              <p className="text-[11px] text-red-200 mt-0.5">Arriving on two-wheeler within 8 mins</p>
            </div>
            <div className="p-4 rounded-2xl bg-red-700/60 border border-red-500">
              <span className="text-xs font-bold text-red-200">Stage 3: National Ambulance</span>
              <p className="text-sm font-bold text-white mt-1">108 Emergency Standby</p>
              <p className="text-[11px] text-red-200 mt-0.5">Max Hospital ER Desk alerted</p>
            </div>
          </div>
        </div>
      )}

      {/* Emergency Contacts Card */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900">Configured Emergency Contact Chain</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400">Primary Contact (Son)</span>
            <p className="font-bold text-slate-900 text-sm">Rahul Sharma (Bangalore)</p>
            <a href="tel:+919876543210" className="text-xs font-bold text-brand-600 hover:underline block">
              +91 98765 43210
            </a>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400">Nearest Sahayak Attendant</span>
            <p className="font-bold text-slate-900 text-sm">Priya Verma (Sector 62)</p>
            <a href="tel:+919722233445" className="text-xs font-bold text-brand-600 hover:underline block">
              +91 97222 33445
            </a>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400">ApnaSahara 24/7 Desk</span>
            <p className="font-bold text-slate-900 text-sm">Central Dispatch Team</p>
            <a href="tel:18002081122" className="text-xs font-bold text-red-600 hover:underline block">
              1800-208-1122 (Toll-Free)
            </a>
          </div>
        </div>
      </div>

      {/* Incident History Log */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-base text-slate-900">SOS Incident History</h3>
            <p className="text-xs text-slate-500">Audit logs and dispatch outcomes</p>
          </div>
          <span className="text-xs text-slate-400 font-semibold">{alerts.length} Total Incidents</span>
        </div>

        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  alert.status === 'resolved'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-red-100 text-red-700 animate-pulse'
                }`}>
                  {alert.status === 'resolved' ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-900 text-sm">{alert.severity} SOS Trigger</h4>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      alert.status === 'resolved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {alert.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Triggered: {new Date(alert.triggered_at).toLocaleString()} • Location: {alert.address}
                  </p>
                  {alert.notes && (
                    <p className="text-xs text-slate-700 font-medium mt-1 bg-white p-2 rounded-lg border border-slate-200">
                      Outcome Note: {alert.notes}
                    </p>
                  )}
                </div>
              </div>

              {alert.status !== 'resolved' && (
                <button
                  onClick={() => setSelectedAlertToResolve(alert)}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shrink-0"
                >
                  Resolve Alert
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Resolve Alert Modal */}
      {selectedAlertToResolve && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-black text-slate-900">Resolve Emergency SOS Alert</h3>
            <p className="text-xs text-slate-500">
              Please enter verification notes before marking this alert as safely resolved.
            </p>

            <form onSubmit={handleResolve} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Resolution Outcome Notes *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. Caregiver verified parent was safe at home; accidental press during phone charging."
                  value={resolverNotes}
                  onChange={(e) => setResolverNotes(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedAlertToResolve(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md"
                >
                  Confirm & Resolve SOS
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
