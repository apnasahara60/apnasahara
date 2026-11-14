import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, Users, Heart, Stethoscope, ShieldCheck, Globe, ChevronDown, ChevronUp } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

export const DemoRoleSwitcher: React.FC = () => {
  const { user, role, switchDemoRole } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSwitch = (newRole: UserRole, targetPath: string) => {
    switchDemoRole(newRole);
    navigate(targetPath);
    setIsOpen(false);
  };

  return (
    <aside aria-label="Demo Role Switcher" className="fixed bottom-4 left-4 z-50">
      {isOpen && (
        <div className="mb-2 w-72 bg-slate-900/95 backdrop-blur-md text-white rounded-2xl shadow-2xl border border-slate-700 p-3 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Instant Role Switcher
            </span>
            <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400">Demo</span>
          </div>

          <div className="space-y-1.5 mt-2 text-xs">
            {/* Family Role */}
            <button
              onClick={() => handleSwitch('family', '/family')}
              className={`w-full p-2 rounded-xl flex items-center justify-between transition-colors ${
                role === 'family' ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40' : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2.5 text-left">
                <span className="text-base">👨‍👩‍👧</span>
                <div>
                  <p className="font-bold">Family Member</p>
                  <p className="text-[10px] text-slate-400">Rahul Sharma (Son in BLR)</p>
                </div>
              </div>
              {role === 'family' && <span className="w-2 h-2 rounded-full bg-emerald-400" />}
            </button>

            {/* Elder Role */}
            <button
              onClick={() => handleSwitch('elder', '/parent')}
              className={`w-full p-2 rounded-xl flex items-center justify-between transition-colors ${
                role === 'elder' ? 'bg-amber-600/30 text-amber-300 border border-amber-500/40' : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2.5 text-left">
                <span className="text-base">👴</span>
                <div>
                  <p className="font-bold">Elderly Parent</p>
                  <p className="text-[10px] text-slate-400">Ramesh Sharma (74y, Delhi)</p>
                </div>
              </div>
              {role === 'elder' && <span className="w-2 h-2 rounded-full bg-amber-400" />}
            </button>

            {/* Caregiver Role */}
            <button
              onClick={() => handleSwitch('caregiver', '/caregiver')}
              className={`w-full p-2 rounded-xl flex items-center justify-between transition-colors ${
                role === 'caregiver' ? 'bg-blue-600/30 text-blue-300 border border-blue-500/40' : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2.5 text-left">
                <span className="text-base">🩺</span>
                <div>
                  <p className="font-bold">Verified Caregiver</p>
                  <p className="text-[10px] text-slate-400">Priya Verma (GDA Nurse)</p>
                </div>
              </div>
              {role === 'caregiver' && <span className="w-2 h-2 rounded-full bg-blue-400" />}
            </button>

            {/* Admin Role */}
            <button
              onClick={() => handleSwitch('admin', '/admin')}
              className={`w-full p-2 rounded-xl flex items-center justify-between transition-colors ${
                role === 'admin' ? 'bg-purple-600/30 text-purple-300 border border-purple-500/40' : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2.5 text-left">
                <span className="text-base">🛡️</span>
                <div>
                  <p className="font-bold">Admin Director</p>
                  <p className="text-[10px] text-slate-400">Dr. Ananya Roy (Ops)</p>
                </div>
              </div>
              {role === 'admin' && <span className="w-2 h-2 rounded-full bg-purple-400" />}
            </button>

            {/* Public Website */}
            <button
              onClick={() => {
                navigate('/');
                setIsOpen(false);
              }}
              className="w-full p-2 rounded-xl flex items-center gap-2.5 hover:bg-slate-800 text-slate-300 transition-colors text-left"
            >
              <Globe className="w-4 h-4 text-slate-400" />
              <div>
                <p className="font-bold">Public Website</p>
                <p className="text-[10px] text-slate-400">Home, About, Pricing</p>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Trigger Pill */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-900/90 hover:bg-slate-900 text-white text-xs font-bold border border-slate-700 shadow-xl backdrop-blur-md transition-all hover:scale-105"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span>Current: <strong className="text-brand-400 capitalize">{role || 'Public'}</strong></span>
        {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
      </button>
    </aside>
  );
};
