import React, { useState } from 'react';
import { Settings, Save, Shield, Bell, CheckCircle2 } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

export const PlatformConfigPage: React.FC = () => {
  const { showToast } = useNotification();
  const [geofenceRadius, setGeofenceRadius] = useState('350');
  const [autoEscalateMins, setAutoEscalateMins] = useState('4');
  const [smsGateway, setSmsGateway] = useState('Enabled');
  const [whatsappGateway, setWhatsappGateway] = useState('Enabled');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Platform Settings Saved', 'Operational parameters updated across all regional hubs', 'info');
  };

  return (
    <div className="space-y-6 font-serif">
      <div className="border-b border-[#CFB53B]/30 pb-4">
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#008080]">Infrastructure Parameters</span>
        <h1 className="text-2xl font-bold text-[#17211C]">Platform & Dispatch Configuration</h1>
        <p className="text-xs sm:text-sm text-[#17211C]/75 font-sans">
          Global geofence sensitivity, emergency dispatch timeouts & external API gateways
        </p>
      </div>

      <form onSubmit={handleSave} className="art-card p-6 sm:p-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="text-xs font-bold text-[#17211C] block mb-1 font-sans">
              Default Geofence Radius (meters)
            </label>
            <input
              type="number"
              value={geofenceRadius}
              onChange={(e) => setGeofenceRadius(e.target.value)}
              className="art-input w-full font-mono text-sm"
            />
            <p className="text-[11px] text-[#17211C]/60 mt-1 font-sans">Circular perimeter boundary centered at elder's home residence</p>
          </div>

          <div>
            <label className="text-xs font-bold text-[#17211C] block mb-1 font-sans">
              Ambulance Auto-Escalation Timeout (mins)
            </label>
            <input
              type="number"
              value={autoEscalateMins}
              onChange={(e) => setAutoEscalateMins(e.target.value)}
              className="art-input w-full font-mono text-sm"
            />
            <p className="text-[11px] text-[#17211C]/60 mt-1 font-sans">If nearest Sahayak unacknowledged, automatically alert national 108 / 112</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-[#CFB53B]/20">
          <div>
            <label className="text-xs font-bold text-[#17211C] block mb-1 font-sans">SMS Gateway (DLT India Compliant)</label>
            <select
              value={smsGateway}
              onChange={(e) => setSmsGateway(e.target.value)}
              className="art-input w-full text-sm bg-[#FFFFF0] font-sans"
            >
              <option>Enabled (Route Mobile / Twilio)</option>
              <option>Disabled</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-[#17211C] block mb-1 font-sans">WhatsApp Business Cloud API</label>
            <select
              value={whatsappGateway}
              onChange={(e) => setWhatsappGateway(e.target.value)}
              className="art-input w-full text-sm bg-[#FFFFF0] font-sans"
            >
              <option>Enabled (Meta Graph API)</option>
              <option>Disabled</option>
            </select>
          </div>
        </div>

        <div className="pt-2 border-t border-[#CFB53B]/20 flex justify-end">
          <button
            type="submit"
            className="art-btn-primary px-6 py-3 text-xs shadow-md flex items-center gap-2"
          >
            <Save className="w-4 h-4 text-[#CFB53B]" /> Save Global Configuration
          </button>
        </div>
      </form>
    </div>
  );
};
