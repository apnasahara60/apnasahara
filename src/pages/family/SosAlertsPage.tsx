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
  Ambulance,
  X
} from 'lucide-react';
import { dbStore } from '../../lib/supabase';
import { ElderProfile, SosAlert } from '../../types';
import { useNotification } from '../../context/NotificationContext';
import { OrnateCorner } from '../../components/art-nouveau/ArtNouveauDecorations';

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
    showToast('SOS ALERT INITIATED', 'Simulated emergency alert dispatched to central network!', 'sos');
  };

  return (
    <div className="space-y-6 font-serif text-[#17211C]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#CFB53B]/30 pb-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#800020]">
            Emergency Dispatch Desk
          </span>
          <h1 className="text-3xl font-bold text-[#17211C] tracking-tight flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-[#800020]" />
            Emergency SOS Control Room
          </h1>
          <p className="text-xs text-[#17211C]/70 mt-0.5">
            Rapid response dispatch and emergency notification history for <strong>{elder?.name}</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleMute}
            className="px-4 py-2.5 rounded-[12px] bg-[#FFFFF0] border border-[#CFB53B]/50 text-[#17211C] text-xs font-semibold shadow-xs flex items-center gap-2 hover:bg-[#FFFDD0] transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-[#17211C]/50" /> : <Volume2 className="w-4 h-4 text-[#008080]" />}
            <span>{isMuted ? 'Siren Muted' : 'Siren Audio: Active'}</span>
          </button>

          <button
            onClick={handleSimulateSos}
            className="px-5 py-2.5 rounded-[12px] bg-[#800020] hover:brightness-110 text-[#FFFFF0] font-bold text-xs shadow-lg shadow-[#800020]/25 flex items-center gap-2 transition-all active:translate-y-[1px]"
          >
            <AlertTriangle className="w-4 h-4 text-[#CFB53B] animate-pulse" />
            <span>Trigger Test SOS</span>
          </button>
        </div>
      </div>

      {/* Active Emergency Alert Banner if Live */}
      {activeAlert && (
        <div className="p-6 sm:p-8 rounded-[12px] bg-[#800020] text-[#FFFFF0] shadow-2xl shadow-[#800020]/40 border-2 border-[#CFB53B] space-y-6 relative overflow-hidden animate-pulse">
          <OrnateCorner position="top-right" className="absolute top-2 right-2 text-[#CFB53B]" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-[12px] bg-[#FFFFF0]/20 flex items-center justify-center shrink-0 border border-[#CFB53B]">
                <ShieldAlert className="w-8 h-8 text-[#CFB53B]" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest bg-[#17211C] px-3 py-0.5 rounded-full border border-[#CFB53B] text-[#CFB53B] font-mono">
                  Critical Alert #{activeAlert.id.slice(-6)}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold mt-1 text-[#FFFFF0]">
                  EMERGENCY SOS IN PROGRESS
                </h2>
                <p className="text-xs text-[#FFFFF0]/80">
                  Triggered at {new Date(activeAlert.triggered_at).toLocaleTimeString()} from {activeAlert.address}
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedAlertToResolve(activeAlert)}
              className="px-6 py-3 rounded-[12px] bg-[#FFFFF0] text-[#800020] hover:bg-[#FFFDD0] font-bold text-xs shadow-lg shrink-0 transition-colors"
            >
              Mark Alert as Resolved
            </button>
          </div>

          {/* Real-time Response Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-[#CFB53B]/40">
            <div className="p-4 rounded-[12px] bg-[#17211C]/60 border border-[#CFB53B]/40">
              <span className="text-xs font-bold text-[#CFB53B]">Stage 1: Alert Broadcasted</span>
              <p className="text-sm font-bold text-[#FFFFF0] mt-1">Family & Central Desk Notified</p>
              <p className="text-[11px] text-[#FFFFF0]/70 mt-0.5">Siren dispatched to all registered numbers</p>
            </div>
            <div className="p-4 rounded-[12px] bg-[#17211C]/60 border border-[#CFB53B]/40">
              <span className="text-xs font-bold text-[#CFB53B]">Stage 2: Responder En Route</span>
              <p className="text-sm font-bold text-[#FFFFF0] mt-1">Priya Verma (GDA Nurse)</p>
              <p className="text-[11px] text-[#FFFFF0]/70 mt-0.5">Arriving on two-wheeler within 8 mins</p>
            </div>
            <div className="p-4 rounded-[12px] bg-[#17211C]/60 border border-[#CFB53B]/40">
              <span className="text-xs font-bold text-[#CFB53B]">Stage 3: National Ambulance</span>
              <p className="text-sm font-bold text-[#FFFFF0] mt-1">108 Emergency Standby</p>
              <p className="text-[11px] text-[#FFFFF0]/70 mt-0.5">Max Hospital ER Desk alerted</p>
            </div>
          </div>
        </div>
      )}

      {/* Emergency Contacts Card */}
      <div className="p-6 rounded-[12px] bg-[#FFFFF0] border border-[#CFB53B]/40 shadow-[0_2px_12px_rgba(23,33,28,0.05)] space-y-4">
        <h3 className="text-base font-bold text-[#17211C]">Configured Emergency Contact Chain</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-[12px] bg-[#FFFDD0] border border-[#CFB53B]/40 space-y-1">
            <span className="text-[10px] uppercase font-bold text-[#008080]">Primary Contact (Son)</span>
            <p className="font-bold text-[#17211C] text-sm">Rahul Sharma (Bangalore)</p>
            <a href="tel:+919876543210" className="text-xs font-bold text-[#008080] hover:underline block font-mono">
              +91 98765 43210
            </a>
          </div>

          <div className="p-4 rounded-[12px] bg-[#FFFDD0] border border-[#CFB53B]/40 space-y-1">
            <span className="text-[10px] uppercase font-bold text-[#008080]">Nearest Sahayak Attendant</span>
            <p className="font-bold text-[#17211C] text-sm">Priya Verma (Sector 62)</p>
            <a href="tel:+919722233445" className="text-xs font-bold text-[#008080] hover:underline block font-mono">
              +91 97222 33445
            </a>
          </div>

          <div className="p-4 rounded-[12px] bg-[#FFFDD0] border border-[#CFB53B]/40 space-y-1">
            <span className="text-[10px] uppercase font-bold text-[#800020]">ApnaSahara 24/7 Desk</span>
            <p className="font-bold text-[#17211C] text-sm">Central Dispatch Team</p>
            <a href="tel:18002081122" className="text-xs font-bold text-[#800020] hover:underline block font-mono">
              1800-208-1122 (Toll-Free)
            </a>
          </div>
        </div>
      </div>

      {/* Incident History Log */}
      <div className="p-6 rounded-[12px] bg-[#FFFFF0] border border-[#CFB53B]/40 shadow-[0_2px_12px_rgba(23,33,28,0.05)] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#CFB53B]/25">
          <div>
            <h3 className="font-bold text-base text-[#17211C]">SOS Incident History</h3>
            <p className="text-xs text-[#17211C]/70">Audit logs and dispatch outcomes</p>
          </div>
          <span className="text-xs text-[#008080] font-mono font-semibold bg-[#FFFDD0] px-2.5 py-1 rounded-[8px] border border-[#CFB53B]/30">
            {alerts.length} Total Incidents
          </span>
        </div>

        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="p-4 rounded-[12px] bg-[#FFFDD0]/40 border border-[#CFB53B]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-[8px] flex items-center justify-center shrink-0 border ${
                  alert.status === 'resolved'
                    ? 'bg-[#808000]/15 text-[#808000] border-[#808000]/30'
                    : 'bg-[#800020]/15 text-[#800020] border-[#800020]/30 animate-pulse'
                }`}>
                  {alert.status === 'resolved' ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-[#17211C] text-sm">{alert.severity} SOS Trigger</h4>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase font-mono ${
                      alert.status === 'resolved'
                        ? 'bg-[#808000]/15 text-[#808000] border border-[#808000]/30'
                        : 'bg-[#800020]/15 text-[#800020] border border-[#800020]/30'
                    }`}>
                      {alert.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#17211C]/60 mt-0.5">
                    Triggered: {new Date(alert.triggered_at).toLocaleString()} • Location: {alert.address}
                  </p>
                  {alert.notes && (
                    <p className="text-xs text-[#17211C]/80 font-medium mt-1 bg-[#FFFFF0] p-2 rounded-[8px] border border-[#CFB53B]/30">
                      Outcome Note: {alert.notes}
                    </p>
                  )}
                </div>
              </div>

              {alert.status !== 'resolved' && (
                <button
                  onClick={() => setSelectedAlertToResolve(alert)}
                  className="px-4 py-2 rounded-[12px] bg-[#008080] hover:brightness-90 text-[#FFFFF0] text-xs font-bold shrink-0 transition-all"
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
        <div className="fixed inset-0 z-[300] bg-[#17211C]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFFF0] rounded-[12px] border border-[#CFB53B] max-w-md w-full p-6 shadow-2xl space-y-4 relative">
            <OrnateCorner position="top-left" className="absolute top-2 left-2 text-[#CFB53B]" />

            <div className="flex items-center justify-between pb-2 border-b border-[#CFB53B]/30">
              <h3 className="text-lg font-bold text-[#17211C]">Resolve Emergency SOS Alert</h3>
              <button
                onClick={() => setSelectedAlertToResolve(null)}
                className="text-[#17211C]/60 hover:text-[#800020]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#17211C]/70">
              Please enter verification notes before marking this alert as safely resolved.
            </p>

            <form onSubmit={handleResolve} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#17211C] block mb-1">Resolution Outcome Notes *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. Caregiver verified parent was safe at home; accidental press during phone charging."
                  value={resolverNotes}
                  onChange={(e) => setResolverNotes(e.target.value)}
                  className="w-full p-3 rounded-[12px] border border-[#CFB53B]/50 bg-[#FFFFF0] text-xs text-[#17211C] focus:ring-2 focus:ring-[#008080] focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedAlertToResolve(null)}
                  className="px-4 py-2 rounded-[12px] border border-[#CFB53B] text-xs font-semibold text-[#17211C] hover:bg-[#CFB53B]/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-[12px] bg-[#808000] hover:brightness-110 text-[#FFFFF0] text-xs font-bold shadow-md"
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
