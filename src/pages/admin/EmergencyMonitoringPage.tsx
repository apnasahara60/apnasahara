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
  Volume2,
  Siren
} from 'lucide-react';
import { dbStore } from '../../lib/mongoStore';
import { SosAlert } from '../../types';
import { useNotification } from '../../context/NotificationContext';
import { OrnateCorner } from '../../components/art-nouveau/ArtNouveauDecorations';

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
    <div className="space-y-6 font-serif">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#CFB53B]/30 pb-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#800020] flex items-center gap-1.5">
            <Siren className="w-4 h-4 text-[#800020]" />
            Real-time Telemetry Dispatch
          </span>
          <h1 className="text-2xl font-bold text-[#17211C]">Central Emergency SOS Dispatch Desk</h1>
          <p className="text-xs sm:text-sm text-[#17211C]/75 font-sans">
            Real-time incident response, ambulance coordination & resolution tracking
          </p>
        </div>

        <div className="flex items-center gap-2 font-sans">
          {['active', 'resolved', 'all'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-3.5 py-1.5 rounded-art text-xs font-bold uppercase transition-colors border ${
                filter === f
                  ? 'bg-[#800020] text-[#FFFFF0] border-[#800020]'
                  : 'bg-[#FFFDD0] border-[#CFB53B]/40 text-[#17211C] hover:bg-[#FFFFF0]'
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
            className={`relative p-6 sm:p-7 rounded-art border-2 transition-all space-y-4 ${
              alert.status !== 'resolved'
                ? 'bg-[#800020]/10 border-[#800020] shadow-xl'
                : 'art-card'
            }`}
          >
            {alert.status !== 'resolved' && (
              <>
                <OrnateCorner position="top-left" color="#800020" size={32} />
                <OrnateCorner position="top-right" color="#800020" size={32} />
              </>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#CFB53B]/30">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-art flex items-center justify-center font-bold shrink-0 ${
                  alert.status !== 'resolved'
                    ? 'bg-[#800020] text-[#FFFFF0] shadow-lg border border-[#CFB53B]'
                    : 'bg-[#808000]/15 text-[#808000] border border-[#808000]/30'
                }`}>
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-[#17211C]">{alert.elder_name}</h3>
                    <span className={`px-2.5 py-0.5 rounded-art font-bold uppercase text-[10px] font-mono ${
                      alert.status !== 'resolved' ? 'bg-[#800020] text-[#FFFFF0]' : 'bg-[#808000]/15 text-[#808000]'
                    }`}>
                      {alert.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#17211C]/70 flex items-center gap-1.5 mt-0.5 font-sans">
                    <MapPin className="w-3.5 h-3.5 text-[#008080]" /> {alert.elder_address}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 font-sans">
                {alert.status !== 'resolved' ? (
                  <>
                    <button
                      onClick={() => handleUpdateStatus(alert.id, 'dispatched')}
                      className="art-btn-primary px-4 py-2 text-xs flex items-center gap-1.5"
                    >
                      <Ambulance className="w-4 h-4 text-[#CFB53B]" /> Dispatch Ambulance
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(alert.id, 'resolved')}
                      className="px-4 py-2 rounded-art bg-[#808000] hover:bg-[#686800] text-[#FFFFF0] font-bold text-xs shadow-md border border-[#CFB53B]/50 flex items-center gap-1.5 transition-all"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#FFFDD0]" /> Mark Resolved
                    </button>
                  </>
                ) : (
                  <span className="text-xs font-bold text-[#808000] flex items-center gap-1 bg-[#808000]/10 px-3 py-1.5 rounded-art border border-[#808000]/30">
                    <CheckCircle2 className="w-4 h-4" /> Incident Successfully Resolved
                  </span>
                )}
              </div>
            </div>

            {/* Incident Details Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-sans text-xs">
              <div className="p-3 rounded-art bg-[#FFFDD0] border border-[#CFB53B]/40">
                <span className="font-bold text-[#17211C]/60 uppercase tracking-wider text-[10px] block">Triggered Timestamp</span>
                <p className="font-bold text-[#17211C] font-mono mt-0.5">
                  {new Date(alert.triggered_at).toLocaleString([], { dateStyle: 'short', timeStyle: 'medium' })}
                </p>
              </div>

              <div className="p-3 rounded-art bg-[#FFFDD0] border border-[#CFB53B]/40">
                <span className="font-bold text-[#17211C]/60 uppercase tracking-wider text-[10px] block">Emergency Phone</span>
                <p className="font-bold text-[#008080] font-mono mt-0.5">
                  <a href={`tel:${alert.elder_phone}`}>{alert.elder_phone}</a>
                </p>
              </div>

              <div className="p-3 rounded-art bg-[#FFFDD0] border border-[#CFB53B]/40">
                <span className="font-bold text-[#17211C]/60 uppercase tracking-wider text-[10px] block">Resolution Action Note</span>
                <p className="font-medium text-[#17211C] mt-0.5">
                  {alert.notes || (alert as any).resolution_notes || 'Pending immediate dispatch protocol'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
