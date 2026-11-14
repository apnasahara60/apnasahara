import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  MapPin,
  Shield,
  Battery,
  Radio,
  Sliders,
  CheckCircle2,
  RefreshCw,
  AlertTriangle,
  Compass,
  Navigation
} from 'lucide-react';
import { dbStore } from '../../lib/supabase';
import { ElderProfile } from '../../types';
import { LiveMapTracker } from '../../components/maps/LiveMapTracker';
import { useNotification } from '../../context/NotificationContext';

export const LiveLocationPage: React.FC = () => {
  const context = useOutletContext<{ selectedElder?: ElderProfile }>();
  const elder = context?.selectedElder || dbStore.getElders()[0];
  const { showToast } = useNotification();

  const [locationSharing, setLocationSharing] = useState(elder?.location_sharing_enabled ?? true);
  const [geofenceRadius, setGeofenceRadius] = useState(350); // meters
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleToggleSharing = () => {
    const updated = !locationSharing;
    setLocationSharing(updated);
    if (elder) {
      dbStore.updateElder({ ...elder, location_sharing_enabled: updated });
    }
    showToast(
      updated ? 'Location Radar Enabled' : 'Location Radar Paused',
      updated ? `Live GPS streaming active for ${elder?.name}` : 'Parent location sharing disabled',
      'info'
    );
  };

  const handleRefreshGps = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast('GPS Signal Synced', `Accuracy +/- 4 meters at ${new Date().toLocaleTimeString()}`, 'info');
    }, 700);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Live Location & Safety Radar</h1>
          <p className="text-xs text-slate-500">
            Real-time geofence monitoring & safe-zone protection for <strong>{elder?.name}</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRefreshGps}
            disabled={isRefreshing}
            className="px-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold shadow-sm flex items-center gap-2"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            Sync GPS Now
          </button>

          <button
            onClick={handleToggleSharing}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold shadow-sm transition-colors flex items-center gap-2 ${
              locationSharing
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30'
                : 'bg-slate-300 text-slate-700'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            {locationSharing ? 'Sharing: Active' : 'Sharing: Paused'}
          </button>
        </div>
      </div>

      {/* Main Map Container */}
      <div className="space-y-4">
        {locationSharing ? (
          <LiveMapTracker
            elderName={elder.name}
            elderAddress={elder.address}
            batteryLevel={elder.battery_level}
            showCaregiverRoute={true}
          />
        ) : (
          <div className="h-96 rounded-3xl bg-slate-100 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center p-6 text-center space-y-3">
            <Radio className="w-12 h-12 text-slate-400" />
            <h3 className="text-lg font-bold text-slate-700">Location Radar Is Disabled</h3>
            <p className="text-xs text-slate-500 max-w-sm">
              Live location sharing has been temporarily switched off. Enable it above to resume GPS tracking and perimeter alerts.
            </p>
            <button
              onClick={handleToggleSharing}
              className="px-6 py-2.5 rounded-xl bg-brand-600 text-white font-bold text-xs"
            >
              Resume Location Sharing
            </button>
          </div>
        )}
      </div>

      {/* Safe Zone Configuration Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Geofence Safe Zone</h4>
              <p className="text-[11px] text-slate-500">Green Valley Apartments (Sector 62)</p>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            If {elder?.name} walks beyond this circular boundary, family members and the local central coordinator will immediately receive an automated breach alert.
          </p>
          <div className="space-y-1.5 pt-2">
            <div className="flex justify-between text-xs font-semibold text-slate-700">
              <span>Boundary Radius</span>
              <span className="text-brand-600">{geofenceRadius} meters</span>
            </div>
            <input
              type="range"
              min="150"
              max="1000"
              step="50"
              value={geofenceRadius}
              onChange={(e) => setGeofenceRadius(Number(e.target.value))}
              className="w-full accent-brand-600 cursor-pointer"
            />
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">GPS Accuracy & Hardware</h4>
              <p className="text-[11px] text-slate-500">Elder Smartphone Sensor</p>
            </div>
          </div>
          <div className="space-y-2 text-xs text-slate-600">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span>Sensor Status:</span>
              <span className="font-bold text-emerald-600">High Accuracy GPS</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span>Signal Precision:</span>
              <span className="font-bold text-slate-900">&lt; 5 meters</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Battery Reserve:</span>
              <span className="font-bold text-slate-900">{elder?.battery_level || 84}% Remaining</span>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Navigation className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Designated Safe Havens</h4>
              <p className="text-[11px] text-slate-500">2 registered secure locations</p>
            </div>
          </div>
          <ul className="space-y-2 text-xs text-slate-600">
            <li className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
              <span className="font-semibold">🏡 Home (Sector 62, Noida)</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">Primary</span>
            </li>
            <li className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
              <span className="font-semibold">🏥 Max Hospital OPD (Vaishali)</span>
              <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold">Medical</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
