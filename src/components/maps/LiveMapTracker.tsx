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
    <div className="bg-[#FFFFF0] rounded-[12px] border border-[#CFB53B]/50 overflow-hidden shadow-[0_2px_12px_rgba(23,33,28,0.06)] font-serif">
      {/* Top Map Header */}
      <div className="p-4 bg-[#17211C] text-[#FFFFF0] flex flex-wrap items-center justify-between gap-3 border-b border-[#CFB53B]/40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[12px] bg-[#008080]/20 border border-[#CFB53B]/50 flex items-center justify-center text-[#CFB53B]">
            <Compass className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#FFFFF0] text-base">Real-time Location Radar</span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#808000]/20 text-[#CFB53B] border border-[#CFB53B]/40">
                <span className="w-1.5 h-1.5 rounded-full bg-[#008080] animate-ping" />
                Live GPS
              </span>
            </div>
            <p className="text-xs text-[#FFFFF0]/70 truncate max-w-xs md:max-w-md">{elderAddress}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 bg-[#101714] px-3 py-1.5 rounded-[8px] border border-[#CFB53B]/40">
            <Battery className="w-4 h-4 text-[#808000]" />
            <span className="text-[#FFFFF0]/70">Elder Device:</span>
            <span className="font-bold text-[#FFFFF0] font-mono">{batteryLevel}%</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#FFFFF0]/60 font-mono text-[11px]">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Updated: {lastUpdated}</span>
          </div>
        </div>
      </div>

      {/* SVG Interactive Map Area */}
      <div className="relative w-full h-[360px] md:h-[420px] bg-[#FFFDD0]/30 overflow-hidden select-none">
        <svg className="w-full h-full" viewBox="0 0 640 400" preserveAspectRatio="xMidYMid meet">
          <defs>
            {/* Background grid */}
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#CFB53B" strokeOpacity="0.15" strokeWidth="1" />
            </pattern>
            {/* Safe zone radial gradient */}
            <radialGradient id="safeZoneGrad">
              <stop offset="0%" stopColor="#808000" stopOpacity="0.25" />
              <stop offset="85%" stopColor="#808000" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#808000" stopOpacity="0" />
            </radialGradient>
            {/* Route dashed line gradient */}
            <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#005F9E" />
              <stop offset="100%" stopColor="#008080" />
            </linearGradient>
          </defs>

          {/* Grid background */}
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Simulated Street Network */}
          <path d="M -10 200 L 650 200" stroke="#CFB53B" strokeOpacity="0.25" strokeWidth="14" />
          <path d="M 220 -10 L 220 410" stroke="#CFB53B" strokeOpacity="0.22" strokeWidth="12" />
          <path d="M 420 -10 L 420 410" stroke="#CFB53B" strokeOpacity="0.22" strokeWidth="12" />
          <path d="M 100 80 L 560 340" stroke="#CFB53B" strokeOpacity="0.18" strokeWidth="10" />
          <path d="M 60 320 L 580 80" stroke="#CFB53B" strokeOpacity="0.18" strokeWidth="10" />

          {/* Street Names */}
          <text x="30" y="194" fill="#17211C" opacity="0.5" fontSize="10" fontWeight="600" fontFamily="Quattrocento">CAPTAIN VIKRAM MARG</text>
          <text x="430" y="70" fill="#17211C" opacity="0.5" fontSize="10" fontWeight="600" fontFamily="Quattrocento">SECTOR 62 CENTRAL AVE</text>
          <text x="140" y="380" fill="#17211C" opacity="0.5" fontSize="10" fontWeight="600" fontFamily="Quattrocento">GREEN VALLEY RESIDENCY ROAD</text>

          {/* Safe Zone Geofence Circle around Elder */}
          <circle
            cx={elderPos.x}
            cy={elderPos.y}
            r="85"
            fill="url(#safeZoneGrad)"
            stroke="#808000"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          {/* Route Line if Caregiver is En Route */}
          {showCaregiverRoute && caregiverStatus === 'en_route' && (
            <line
              x1={caregiverOffset.x}
              y1={caregiverOffset.y}
              x2={elderPos.x}
              y2={elderPos.y}
              stroke="url(#routeGrad)"
              strokeWidth="3.5"
              strokeDasharray="6 6"
            />
          )}

          {/* Elder Pin Marker */}
          <g transform={`translate(${elderPos.x}, ${elderPos.y})`}>
            <circle cx="0" cy="0" r="28" fill="#808000" opacity="0.2">
              <animate attributeName="r" values="18;36;18" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;0;0.3" dur="2.4s" repeatCount="indefinite" />
            </circle>
            <circle cx="0" cy="0" r="18" fill="#008080" stroke="#CFB53B" strokeWidth="2.5" />
            <circle cx="0" cy="0" r="7" fill="#FFFFF0" />
            <rect x="-80" y="-55" width="160" height="30" rx="8" fill="#17211C" stroke="#CFB53B" strokeWidth="1" opacity="0.95" />
            <text x="0" y="-36" fill="#FFFFF0" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="Quattrocento">
              {elderName}
            </text>
          </g>

          {/* Caregiver Pin / Vehicle Marker (No emojis) */}
          {showCaregiverRoute && (
            <g transform={`translate(${caregiverOffset.x}, ${caregiverOffset.y})`}>
              <circle cx="0" cy="0" r="18" fill="#005F9E" stroke="#CFB53B" strokeWidth="2.5" />
              <circle cx="0" cy="0" r="6" fill="#FFFFF0" />
              <rect x="-65" y="-46" width="130" height="24" rx="6" fill="#17211C" stroke="#005F9E" strokeWidth="1" />
              <text x="0" y="-30" fill="#CFB53B" fontSize="10" fontWeight="700" textAnchor="middle" fontFamily="Quattrocento">
                Caregiver ({etaMinutes}m away)
              </text>
            </g>
          )}
        </svg>

        {/* Floating Controls Overlay */}
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
          <div className="pointer-events-auto bg-[#FFFFF0]/95 backdrop-blur-md px-4 py-2.5 rounded-[12px] border border-[#CFB53B]/50 shadow-md flex items-center gap-3">
            <div className="w-8 h-8 rounded-[8px] bg-[#808000]/15 text-[#808000] flex items-center justify-center font-bold">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#17211C]">Geofence Safe Zone: Active</p>
              <p className="text-[11px] text-[#17211C]/70">Inside home perimeter (350m radius)</p>
            </div>
          </div>

          {showCaregiverRoute && caregiverStatus === 'en_route' && (
            <div className="pointer-events-auto bg-[#17211C]/95 backdrop-blur-md text-[#FFFFF0] px-4 py-2.5 rounded-[12px] border border-[#CFB53B]/50 shadow-lg flex items-center gap-4">
              <div>
                <p className="text-[11px] text-[#CFB53B]">Estimated Arrival</p>
                <p className="text-base font-bold text-[#FFFFF0]">{etaMinutes} mins ({distanceKm} km)</p>
              </div>
              {onCallCaregiver && (
                <button
                  onClick={onCallCaregiver}
                  className="px-3.5 py-1.5 rounded-[12px] bg-[#008080] hover:brightness-90 text-[#FFFFF0] font-medium text-xs flex items-center gap-1.5 transition-all"
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
      <div className="p-4 bg-[#FFFDD0] border-t border-[#CFB53B]/30 flex flex-wrap items-center justify-between text-xs text-[#17211C] gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#808000]" />
          <span>Parent GPS: <strong>Accurate to 5 meters</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#005F9E]" />
          <span>Caregiver Status: <strong>{caregiverStatus.replace('_', ' ').toUpperCase()}</strong> ({caregiverName})</span>
        </div>
      </div>
    </div>
  );
};
