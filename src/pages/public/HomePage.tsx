import React, { useState } from 'react';
import { TranquilFamilyHome } from '../../components/home/TranquilFamilyHome';
import { Sparkles, Globe, Shield, PhoneCall, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HomePage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'app' | 'overview'>('app');

  return (
    <div>
      {/* View Switcher Ribbon at Top of Front Page */}
      <div className="bg-[#183929] text-white px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-2 border-b border-[#244E39]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse" />
          <span className="font-semibold text-white/90">
            ApnaSahara Web Application & Family Space
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setViewMode(viewMode === 'app' ? 'overview' : 'app')}
            className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-[11px] transition-colors flex items-center gap-1.5"
          >
            {viewMode === 'app' ? 'View Public Overview & Plans' : 'View Tranquil Family Front Page'}
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {viewMode === 'app' ? (
        /* The exact tranquil UI requested by the user */
        <TranquilFamilyHome />
      ) : (
        /* Overview Mode */
        <div className="space-y-16 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#24543C] bg-[#E8EFEA] px-3.5 py-1 rounded-full">
              Full Eldercare Platform
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Loving Care for Parents, True Peace of Mind for You.
            </h1>
            <p className="text-base text-slate-600 leading-relaxed">
              ApnaSahara connects families with verified in-person companion caregivers, continuous vital tracking, daily medication adherence, and guaranteed 24/7 emergency SOS coordination across Indian cities.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setViewMode('app')}
                className="px-8 py-3.5 rounded-full bg-[#1E4733] hover:bg-[#163626] text-white font-bold text-sm shadow-md"
              >
                Open Family Front Page Experience
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/family" className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all text-left">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold mb-3">
                👨‍👩‍👧
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">Family Portal</h3>
              <p className="text-xs text-slate-500 mt-1">Live health monitoring, caregiver tracking, and visit reports.</p>
            </Link>

            <Link to="/parent" className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all text-left">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold mb-3">
                👴
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">Senior Parent Portal</h3>
              <p className="text-xs text-slate-500 mt-1">Simplified interface with giant SOS button and picture reminders.</p>
            </Link>

            <Link to="/caregiver" className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all text-left">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-800 flex items-center justify-center font-bold mb-3">
                🩺
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">Caregiver Portal</h3>
              <p className="text-xs text-slate-500 mt-1">Check-in, GPS route navigation, and clinical visit logging.</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
