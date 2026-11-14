import React, { useState } from 'react';
import { Settings, Save, Shield, Bell, CheckCircle2 } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

export const PlatformConfigPage: React.FC = () => {
  const { showToast } = useNotification();
  const [geofenceRadius, setGeofenceRadius] = useState('350');
  const [autoEscalateMins, setAutoEscalateMins] = useState('4');
  const [smsGateway, setSmsGateway] = useState('Enabled');
  const [whatsappGateway, setWhatsappGateway] = useState('Enabled');
  const [telehealthProvider, setTelehealthProvider] = useState('Practo / Apollo 24/7');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Platform Settings Saved', 'Operational parameters updated across all regional hubs', 'info');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Platform & Dispatch Configuration</h1>
        <p className="text-xs text-slate-500">
          Global geofence sensitivity, emergency dispatch timeouts & external API gateways
        </p>
      </div>

      <form onSubmit={handleSave} className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Default Geofence Radius (meters)
            </label>
            <input
              type="number"
              value={geofenceRadius}
              onChange={(e) => setGeofenceRadius(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
            <p className="text-[11px] text-slate-400 mt-1">Circular perimeter around parent's home residence</p>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Ambulance Auto-Escalation Timeout (mins)
            </label>
            <input
              type="number"
              value={autoEscalateMins}
              onChange={(e) => setAutoEscalateMins(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
            <p className="text-[11px] text-slate-400 mt-1">If Sahayak unacknowledged, automatically alert 108 / 112</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-slate-100">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">SMS Gateway (DLT India)</label>
            <select
              value={smsGateway}
              onChange={(e) => setSmsGateway(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none bg-white"
            >
              <option>Enabled (Route Mobile / Twilio)</option>
              <option>Disabled</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">WhatsApp Business Cloud API</label>
            <select
              value={whatsappGateway}
              onChange={(e) => setWhatsappGateway(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none bg-white"
            >
              <option>Enabled (Meta Graph API)</option>
              <option>Disabled</option>
            </select>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md shadow-purple-600/30 flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save Global Configuration
          </button>
        </div>
      </form>
    </div>
  );
};
