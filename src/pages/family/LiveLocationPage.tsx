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
  Navigation,
  Home,
  Activity
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
    <div className="space-y-6 font-serif text-[#17211C]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#CFB53B]/30 pb-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#008080]">
            Perimeter Security
          </span>
          <h1 className="text-3xl font-bold text-[#17211C] tracking-tight">Live Location & Safety Radar</h1>
          <p className="text-xs text-[#17211C]/70 mt-0.5">
            Real-time geofence monitoring & safe-zone protection for <strong>{elder?.name}</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRefreshGps}
            disabled={isRefreshing}
            className="px-4 py-2.5 rounded-[12px] bg-[#FFFFF0] border border-[#CFB53B]/50 text-[#17211C] hover:bg-[#FFFDD0] text-xs font-semibold shadow-xs flex items-center gap-2 transition-all active:translate-y-[1px]"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#008080] ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Sync GPS Now</span>
          </button>

          <button
            onClick={handleToggleSharing}
            className={`px-4 py-2.5 rounded-[12px] text-xs font-semibold shadow-xs transition-all flex items-center gap-2 active:translate-y-[1px] ${
              locationSharing
                ? 'bg-[#008080] hover:brightness-90 text-[#FFFFF0] shadow-[#008080]/20'
                : 'bg-[#17211C]/20 text-[#17211C]'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>{locationSharing ? 'Sharing: Active' : 'Sharing: Paused'}</span>
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
          <div className="h-96 rounded-[12px] bg-[#FFFDD0]/40 border-2 border-dashed border-[#CFB53B]/50 flex flex-col items-center justify-center p-6 text-center space-y-3">
            <Radio className="w-12 h-12 text-[#CFB53B]" />
            <h3 className="text-lg font-bold text-[#17211C]">Location Radar Is Disabled</h3>
            <p className="text-xs text-[#17211C]/70 max-w-sm">
              Live location sharing has been temporarily switched off. Enable it above to resume GPS tracking and perimeter alerts.
            </p>
            <button
              onClick={handleToggleSharing}
              className="px-6 py-2.5 rounded-[12px] bg-[#008080] text-[#FFFFF0] font-semibold text-xs hover:brightness-90 transition-all"
            >
              Resume Location Sharing
            </button>
          </div>
        )}
      </div>

      {/* Safe Zone Configuration Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-[12px] bg-[#FFFFF0] border border-[#CFB53B]/40 shadow-[0_2px_12px_rgba(23,33,28,0.05)] space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[8px] bg-[#808000]/15 text-[#808000] flex items-center justify-center font-bold">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-[#17211C] text-sm">Geofence Safe Zone</h4>
              <p className="text-[11px] text-[#17211C]/60">Green Valley Apartments (Sector 62)</p>
            </div>
          </div>
          <p className="text-xs text-[#17211C]/75 leading-relaxed">
            If {elder?.name} walks beyond this circular boundary, family members and the local central coordinator will immediately receive an automated breach alert.
          </p>
          <div className="space-y-1.5 pt-2">
            <div className="flex justify-between text-xs font-semibold text-[#17211C]">
              <span>Boundary Radius</span>
              <span className="text-[#008080] font-mono font-bold">{geofenceRadius} meters</span>
            </div>
            <input
              type="range"
              min="150"
              max="1000"
              step="50"
              value={geofenceRadius}
              onChange={(e) => setGeofenceRadius(Number(e.target.value))}
              className="w-full accent-[#008080] cursor-pointer"
            />
          </div>
        </div>

        <div className="p-6 rounded-[12px] bg-[#FFFFF0] border border-[#CFB53B]/40 shadow-[0_2px_12px_rgba(23,33,28,0.05)] space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[8px] bg-[#005F9E]/15 text-[#005F9E] flex items-center justify-center font-bold">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-[#17211C] text-sm">GPS Accuracy & Hardware</h4>
              <p className="text-[11px] text-[#17211C]/60">Elder Smartphone Sensor</p>
            </div>
          </div>
          <div className="space-y-2 text-xs text-[#17211C]/75">
            <div className="flex justify-between py-1 border-b border-[#CFB53B]/20">
              <span>Sensor Status:</span>
              <span className="font-bold text-[#808000]">High Accuracy GPS</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#CFB53B]/20">
              <span>Signal Precision:</span>
              <span className="font-bold text-[#17211C] font-mono">&lt; 5 meters</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Battery Reserve:</span>
              <span className="font-bold text-[#17211C] font-mono">{elder?.battery_level || 84}% Remaining</span>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-[12px] bg-[#FFFFF0] border border-[#CFB53B]/40 shadow-[0_2px_12px_rgba(23,33,28,0.05)] space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[8px] bg-[#800020]/15 text-[#800020] flex items-center justify-center font-bold">
              <Navigation className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-[#17211C] text-sm">Designated Safe Havens</h4>
              <p className="text-[11px] text-[#17211C]/60">2 registered secure locations</p>
            </div>
          </div>
          <ul className="space-y-2 text-xs text-[#17211C]">
            <li className="flex items-center justify-between p-2.5 rounded-[8px] bg-[#FFFDD0] border border-[#CFB53B]/30">
              <span className="font-semibold flex items-center gap-1.5">
                <Home className="w-3.5 h-3.5 text-[#008080]" />
                Home (Sector 62, Noida)
              </span>
              <span className="text-[10px] bg-[#008080]/15 text-[#008080] border border-[#008080]/30 px-2 py-0.5 rounded font-bold">Primary</span>
            </li>
            <li className="flex items-center justify-between p-2.5 rounded-[8px] bg-[#FFFDD0] border border-[#CFB53B]/30">
              <span className="font-semibold flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-[#800020]" />
                Max Hospital OPD (Vaishali)
              </span>
              <span className="text-[10px] bg-[#005F9E]/15 text-[#005F9E] border border-[#005F9E]/30 px-2 py-0.5 rounded font-bold">Medical</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
