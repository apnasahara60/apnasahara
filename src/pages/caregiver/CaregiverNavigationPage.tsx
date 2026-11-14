import React, { useState } from 'react';
import { Navigation, MapPin, ExternalLink, Compass, PhoneCall, AlertTriangle, ShieldCheck } from 'lucide-react';
import { dbStore } from '../../lib/mongoStore';
import { LiveMapTracker } from '../../components/maps/LiveMapTracker';

export const CaregiverNavigationPage: React.FC = () => {
  const caregiver = dbStore.getCaregivers()[0];
  const elder = dbStore.getElders()[0];
  const visit = dbStore.getVisits(caregiver?.id)[0];

  const handleOpenGoogleMaps = () => {
    const query = encodeURIComponent(`${elder?.address || 'Sector 62 Noida'}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">GPS Navigation to Assignment</h1>
          <p className="text-xs text-slate-500">
            Route directions to <strong>{elder?.name}'s</strong> residence
          </p>
        </div>

        <button
          onClick={handleOpenGoogleMaps}
          className="px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-600/30 flex items-center gap-2"
        >
          <ExternalLink className="w-4 h-4" /> Open in Google Maps
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
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-bold text-base text-slate-900">Route Instructions (2.4 km • ~12 mins)</h3>
        <div className="space-y-3">
          {[
            { step: '1', dir: 'Head north on Captain Vikram Marg towards Sector 62 Central Ave', dist: '600 m' },
            { step: '2', dir: 'Turn right at the roundabout onto Green Valley Residency Road', dist: '1.2 km' },
            { step: '3', dir: 'Pass Fortis Hospital gate and proceed 400 meters', dist: '400 m' },
            { step: '4', dir: 'Turn left into Green Valley Apartments, Gate 2 (Tower B-402)', dist: '200 m' }
          ].map((item) => (
            <div key={item.step} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-xl bg-blue-100 text-blue-700 font-black flex items-center justify-center shrink-0">
                  {item.step}
                </span>
                <span className="font-semibold text-slate-800">{item.dir}</span>
              </div>
              <span className="text-slate-400 font-bold shrink-0">{item.dist}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
