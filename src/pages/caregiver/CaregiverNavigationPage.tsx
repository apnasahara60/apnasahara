import React from 'react';
import { Navigation, MapPin, ExternalLink } from 'lucide-react';
import { dbStore } from '../../lib/mongoStore';
import { LiveMapTracker } from '../../components/maps/LiveMapTracker';

export const CaregiverNavigationPage: React.FC = () => {
  const caregiver = dbStore.getCaregivers()[0];
  const elder = dbStore.getElders()[0];

  const handleOpenGoogleMaps = () => {
    const query = encodeURIComponent(`${elder?.address || 'Sector 62 Noida'}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <div className="space-y-6 font-serif">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#CFB53B]/30 pb-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#008080]">Transit Telemetry</span>
          <h1 className="text-2xl font-bold text-[#17211C]">GPS Navigation to Assignment</h1>
          <p className="text-xs sm:text-sm text-[#17211C]/75 font-sans">
            Route directions to <strong>{elder?.name}'s</strong> residence
          </p>
        </div>

        <button
          onClick={handleOpenGoogleMaps}
          className="art-btn-primary px-5 py-2.5 flex items-center gap-2 text-xs shadow-md"
        >
          <ExternalLink className="w-4 h-4 text-[#CFB53B]" /> Open in External Maps
        </button>
      </div>

      {/* Live Map Tracker */}
      <LiveMapTracker
        elderName={elder?.name}
        elderAddress={elder?.address}
        caregiverName={caregiver?.name}
        caregiverStatus="en_route"
        batteryLevel={elder?.battery_level}
        showCaregiverRoute={true}
      />

      {/* Turn-by-Turn Navigation Steps */}
      <div className="art-card p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[#CFB53B]/30 pb-3">
          <h3 className="font-bold text-base text-[#17211C]">Route Instructions</h3>
          <span className="text-xs font-mono font-bold text-[#008080]">2.4 km • ~12 mins</span>
        </div>
        <div className="space-y-3">
          {[
            { step: '1', dir: 'Head north on Captain Vikram Marg towards Sector 62 Central Ave', dist: '600 m' },
            { step: '2', dir: 'Turn right at the roundabout onto Green Valley Residency Road', dist: '1.2 km' },
            { step: '3', dir: 'Pass Fortis Hospital gate and proceed 400 meters', dist: '400 m' },
            { step: '4', dir: 'Turn left into Green Valley Apartments, Gate 2 (Tower B-402)', dist: '200 m' }
          ].map((item) => (
            <div key={item.step} className="p-3.5 rounded-art bg-[#FFFDD0] border border-[#CFB53B]/40 flex items-center justify-between text-xs font-sans">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-art bg-[#008080] text-[#FFFFF0] border border-[#CFB53B]/50 font-bold flex items-center justify-center shrink-0 font-mono">
                  {item.step}
                </span>
                <span className="font-semibold text-[#17211C]">{item.dir}</span>
              </div>
              <span className="text-[#008080] font-bold shrink-0 font-mono">{item.dist}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
