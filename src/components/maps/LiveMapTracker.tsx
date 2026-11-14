import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Shield, Compass, Phone, AlertTriangle, Battery, RefreshCw } from 'lucide-react';

interface LiveMapTrackerProps {
  elderName?: string;
  elderAddress?: string;
  caregiverName?: string;
  caregiverPhone?: string;
  caregiverStatus?: 'en_route' | 'in_progress' | 'completed' | 'scheduled' | 'cancelled';
  batteryLevel?: number;
  showCaregiverRoute?: boolean;
  onCallCaregiver?: () => void;
}

export const LiveMapTracker: React.FC<LiveMapTrackerProps> = ({
  elderName = 'Shri Ramesh Sharma',
  elderAddress = 'B-402, Green Valley Apartments, Sector 62, Noida',
  caregiverName = 'Priya Verma (Certified GDA)',
  caregiverPhone = '+91 97222 33445',
  caregiverStatus = 'en_route',
  batteryLevel = 84,
  showCaregiverRoute = true,
  onCallCaregiver
}) => {
  const [etaMinutes, setEtaMinutes] = useState(12);
  const [distanceKm, setDistanceKm] = useState(2.4);
  const [caregiverOffset, setCaregiverOffset] = useState({ x: 220, y: 310 });
  const [elderPos] = useState({ x: 420, y: 190 });
  const [isSimulating, setIsSimulating] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString());

  // Animate simulated caregiver vehicle moving along route towards elder
  useEffect(() => {
    if (!isSimulating || caregiverStatus !== 'en_route') return;

    const interval = setInterval(() => {
      setCaregiverOffset((prev) => {
        const dx = elderPos.x - prev.x;
        const dy = elderPos.y - prev.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 15) {
          setEtaMinutes(1);
          setDistanceKm(0.1);
          return prev;
        }

        const step = 2.5;
        const newX = prev.x + (dx / dist) * step;
        const newY = prev.y + (dy / dist) * step;

        const remainingRatio = dist / 250;
        setDistanceKm(Math.max(0.1, Number((remainingRatio * 2.4).toFixed(1))));
        setEtaMinutes(Math.max(1, Math.round(remainingRatio * 12)));
        setLastUpdated(new Date().toLocaleTimeString());

        return { x: newX, y: newY };
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [isSimulating, caregiverStatus, elderPos]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      {/* Top Map Header */}
      <div className="p-4 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
            <Compass className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-base">Real-time Location Radar</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Live GPS
              </span>
            </div>
            <p className="text-xs text-slate-400 truncate max-w-xs md:max-w-md">{elderAddress}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
            <Battery className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-300">Elder Device:</span>
            <span className="font-bold text-white">{batteryLevel}%</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Updated: {lastUpdated}</span>
          </div>
        </div>
      </div>

      {/* SVG Interactive Map Area */}
      <div className="relative w-full h-[360px] md:h-[420px] bg-slate-100 overflow-hidden select-none">
        <svg className="w-full h-full" viewBox="0 0 640 400" preserveAspectRatio="xMidYMid meet">
          <defs>
            {/* Background grid */}
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="1" />
            </pattern>
            {/* Safe zone radial gradient */}
            <radialGradient id="safeZoneGrad">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
              <stop offset="85%" stopColor="#10b981" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </radialGradient>
            {/* Route dashed line gradient */}
            <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>

          {/* Grid background */}
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Simulated Street Network */}
          <path d="M -10 200 L 650 200" stroke="#cbd5e1" strokeWidth="16" />
          <path d="M 220 -10 L 220 410" stroke="#cbd5e1" strokeWidth="14" />
          <path d="M 420 -10 L 420 410" stroke="#cbd5e1" strokeWidth="14" />
          <path d="M 100 80 L 560 340" stroke="#e2e8f0" strokeWidth="10" />
          <path d="M 60 320 L 580 80" stroke="#e2e8f0" strokeWidth="10" />

          {/* Street Names */}
          <text x="30" y="194" fill="#94a3b8" fontSize="10" fontWeight="600">CAPTAIN VIKRAM MARG</text>
          <text x="430" y="70" fill="#94a3b8" fontSize="10" fontWeight="600">SECTOR 62 CENTRAL AVE</text>
          <text x="140" y="380" fill="#94a3b8" fontSize="10" fontWeight="600">GREEN VALLEY RESIDENCY ROAD</text>

          {/* Safe Zone Geofence Circle around Elder */}
          <circle
            cx={elderPos.x}
            cy={elderPos.y}
            r="85"
            fill="url(#safeZoneGrad)"
            stroke="#10b981"
            strokeWidth="2"
            strokeDasharray="4 4"
          />

          {/* Route Line if Caregiver is En Route */}
          {showCaregiverRoute && caregiverStatus === 'en_route' && (
            <>
              <line
                x1={caregiverOffset.x}
                y1={caregiverOffset.y}
                x2={elderPos.x}
                y2={elderPos.y}
                stroke="url(#routeGrad)"
                strokeWidth="4"
                strokeDasharray="6 6"
              />
            </>
          )}

          {/* Elder Pin Marker */}
          <g transform={`translate(${elderPos.x}, ${elderPos.y})`}>
            {/* Radar wave pulse */}
            <circle cx="0" cy="0" r="28" fill="#10b981" opacity="0.2">
              <animate attributeName="r" values="18;36;18" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;0;0.3" dur="2.4s" repeatCount="indefinite" />
            </circle>
            {/* Center icon pin */}
            <circle cx="0" cy="0" r="18" fill="#047857" stroke="#ffffff" strokeWidth="3" />
            <circle cx="0" cy="0" r="8" fill="#ffffff" />
            {/* Callout box */}
            <rect x="-80" y="-55" width="160" height="30" rx="8" fill="#0f172a" opacity="0.92" />
            <text x="0" y="-36" fill="#ffffff" fontSize="11" fontWeight="700" textAnchor="middle">
              🏡 {elderName}
            </text>
          </g>

          {/* Caregiver Pin / Vehicle Marker */}
          {showCaregiverRoute && (
            <g transform={`translate(${caregiverOffset.x}, ${caregiverOffset.y})`}>
              <circle cx="0" cy="0" r="20" fill="#2563eb" stroke="#ffffff" strokeWidth="3" />
              <text x="0" y="5" fill="#ffffff" fontSize="14" textAnchor="middle">🛵</text>
              {/* Caregiver ETA label */}
              <rect x="-60" y="-46" width="120" height="24" rx="6" fill="#1e293b" />
              <text x="0" y="-30" fill="#38bdf8" fontSize="10" fontWeight="700" textAnchor="middle">
                Caregiver ({etaMinutes}m away)
              </text>
            </g>
          )}
        </svg>

        {/* Floating Controls Overlay */}
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
          <div className="pointer-events-auto bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl border border-slate-200 shadow-md flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">Geofence Safe Zone: Active</p>
              <p className="text-[11px] text-slate-500">Inside home perimeter (350m radius)</p>
            </div>
          </div>

          {showCaregiverRoute && caregiverStatus === 'en_route' && (
            <div className="pointer-events-auto bg-slate-900/95 backdrop-blur-md text-white px-4 py-2.5 rounded-xl border border-slate-800 shadow-lg flex items-center gap-4">
              <div>
                <p className="text-[11px] text-slate-400">Estimated Arrival</p>
                <p className="text-base font-extrabold text-brand-400">{etaMinutes} mins ({distanceKm} km)</p>
              </div>
              {onCallCaregiver && (
                <button
                  onClick={onCallCaregiver}
                  className="px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-medium text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Call Caregiver
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Summary Bar */}
      <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span>Parent GPS: <strong>Accurate to 5 meters</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
          <span>Caregiver Status: <strong>{caregiverStatus.replace('_', ' ').toUpperCase()}</strong> ({caregiverName})</span>
        </div>
      </div>
    </div>
  );
};
