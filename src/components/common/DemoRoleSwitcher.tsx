import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Users, Heart, Stethoscope, ShieldCheck, Globe, ChevronDown, ChevronUp, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

export const DemoRoleSwitcher: React.FC = () => {
  const { role, switchDemoRole } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const navigate = useNavigate();

  const handleSwitch = (newRole: UserRole, targetPath: string) => {
    switchDemoRole(newRole);
    navigate(targetPath);
    setIsOpen(false);
  };

  // Minimized floating coin trigger for mobile or desktop
  if (isMinimized) {
    return (
      <aside aria-label="Demo Role Switcher Minimized" className="fixed bottom-4 left-3 sm:left-4 z-50 font-serif">
        <button
          onClick={() => {
            setIsMinimized(false);
            setIsOpen(true);
          }}
          title="Open Role Switcher"
          aria-label="Expand Demo Role Switcher"
          className="w-10 h-10 rounded-full bg-[#17211C] text-[#CFB53B] border-2 border-[#CFB53B] shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
        >
          <Sparkles className="w-4 h-4 animate-pulse" />
        </button>
      </aside>
    );
  }

  return (
    <aside aria-label="Demo Role Switcher" className="fixed bottom-4 left-3 sm:left-4 z-50 font-serif max-w-[calc(100vw-1.5rem)]">
      {isOpen && (
        <div className="mb-2 w-72 max-w-[calc(100vw-2rem)] bg-[#FFFFF0] text-[#17211C] rounded-art shadow-2xl border-2 border-[#CFB53B] p-3 sm:p-3.5 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between pb-2 border-b border-[#CFB53B]/30">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#008080] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#CFB53B]" />
              Role Navigation
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] bg-[#FFFDD0] border border-[#CFB53B]/40 px-2 py-0.5 rounded text-[#17211C] font-mono">Demo Mode</span>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsMinimized(true);
                }}
                title="Minimize role pill"
                aria-label="Minimize"
                className="p-1 rounded text-[#17211C]/60 hover:text-[#17211C] hover:bg-[#FFFDD0] transition-colors"
              >
                <EyeOff className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="space-y-1.5 mt-2.5 text-xs max-h-[60vh] overflow-y-auto no-scrollbar">
            {/* Family Role */}
            <button
              onClick={() => handleSwitch('family', '/family')}
              className={`w-full p-2.5 rounded-art flex items-center justify-between transition-colors ${
                role === 'family' ? 'bg-[#008080]/15 text-[#008080] border border-[#008080] font-bold' : 'hover:bg-[#FFFDD0] text-[#17211C] border border-transparent'
              }`}
            >
              <div className="flex items-center gap-2.5 text-left">
                <div className="w-7 h-7 rounded-full bg-[#008080]/10 border border-[#008080]/30 flex items-center justify-center text-[#008080] shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-[#17211C]">Family Member</p>
                  <p className="text-[10px] text-[#17211C]/65">Rahul Sharma (Son in BLR)</p>
                </div>
              </div>
              {role === 'family' && <span className="w-2.5 h-2.5 rounded-full bg-[#008080]" />}
            </button>

            {/* Elder Role */}
            <button
              onClick={() => handleSwitch('elder', '/parent')}
              className={`w-full p-2.5 rounded-art flex items-center justify-between transition-colors ${
                role === 'elder' ? 'bg-[#808000]/15 text-[#808000] border border-[#808000] font-bold' : 'hover:bg-[#FFFDD0] text-[#17211C] border border-transparent'
              }`}
            >
              <div className="flex items-center gap-2.5 text-left">
                <div className="w-7 h-7 rounded-full bg-[#808000]/10 border border-[#808000]/30 flex items-center justify-center text-[#808000] shrink-0">
                  <Heart className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-[#17211C]">Elderly Parent</p>
                  <p className="text-[10px] text-[#17211C]/65">Ramesh Sharma (74y, Delhi)</p>
                </div>
              </div>
              {role === 'elder' && <span className="w-2.5 h-2.5 rounded-full bg-[#808000]" />}
            </button>

            {/* Caregiver Role */}
            <button
              onClick={() => handleSwitch('caregiver', '/caregiver')}
              className={`w-full p-2.5 rounded-art flex items-center justify-between transition-colors ${
                role === 'caregiver' ? 'bg-[#005F9E]/15 text-[#005F9E] border border-[#005F9E] font-bold' : 'hover:bg-[#FFFDD0] text-[#17211C] border border-transparent'
              }`}
            >
              <div className="flex items-center gap-2.5 text-left">
                <div className="w-7 h-7 rounded-full bg-[#005F9E]/10 border border-[#005F9E]/30 flex items-center justify-center text-[#005F9E] shrink-0">
                  <Stethoscope className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-[#17211C]">Verified Sahayak</p>
                  <p className="text-[10px] text-[#17211C]/65">Priya Verma (GDA Nurse)</p>
                </div>
              </div>
              {role === 'caregiver' && <span className="w-2.5 h-2.5 rounded-full bg-[#005F9E]" />}
            </button>

            {/* Admin Role */}
            <button
              onClick={() => handleSwitch('admin', '/admin')}
              className={`w-full p-2.5 rounded-art flex items-center justify-between transition-colors ${
                role === 'admin' ? 'bg-[#800020]/15 text-[#800020] border border-[#800020] font-bold' : 'hover:bg-[#FFFDD0] text-[#17211C] border border-transparent'
              }`}
            >
              <div className="flex items-center gap-2.5 text-left">
                <div className="w-7 h-7 rounded-full bg-[#800020]/10 border border-[#800020]/30 flex items-center justify-center text-[#800020] shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-[#17211C]">Director of Care</p>
                  <p className="text-[10px] text-[#17211C]/65">Dr. Ananya Roy (Ops)</p>
                </div>
              </div>
              {role === 'admin' && <span className="w-2.5 h-2.5 rounded-full bg-[#800020]" />}
            </button>

            {/* Public Website */}
            <button
              onClick={() => {
                navigate('/');
                setIsOpen(false);
              }}
              className="w-full p-2.5 rounded-art flex items-center gap-2.5 hover:bg-[#FFFDD0] text-[#17211C] border border-transparent transition-colors text-left"
            >
              <div className="w-7 h-7 rounded-full bg-[#17211C]/5 border border-[#CFB53B]/40 flex items-center justify-center text-[#17211C] shrink-0">
                <Globe className="w-4 h-4 text-[#008080]" />
              </div>
              <div>
                <p className="font-bold text-[#17211C]">Public Portal</p>
                <p className="text-[10px] text-[#17211C]/65">Sanctuary Showcase & Story</p>
              </div>
            </button>

            {/* Onboarding Flow */}
            <button
              onClick={() => {
                navigate('/onboarding');
                setIsOpen(false);
              }}
              className="w-full p-2.5 rounded-art flex items-center gap-2.5 bg-[#008080]/10 hover:bg-[#008080]/20 text-[#008080] border border-[#008080]/30 transition-colors text-left mt-1"
            >
              <Sparkles className="w-4 h-4 text-[#CFB53B]" />
              <div>
                <p className="font-bold text-[#008080]">Family Onboarding</p>
                <p className="text-[10px] text-[#17211C]/70">Profile Setup & Vitals Configuration</p>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Trigger Pill with Minimize button */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#17211C] hover:bg-[#232F28] text-[#FFFFF0] text-xs font-bold border-2 border-[#CFB53B] shadow-xl transition-all active:scale-95"
        >
          <span className="w-2 h-2 rounded-full bg-[#808000] animate-ping" />
          <span className="text-[11px] sm:text-xs">Active: <strong className="text-[#CFB53B] capitalize">{role || 'Public'}</strong></span>
          {isOpen ? <ChevronDown className="w-3.5 h-3.5 text-[#CFB53B]" /> : <ChevronUp className="w-3.5 h-3.5 text-[#CFB53B]" />}
        </button>

        <button
          onClick={() => setIsMinimized(true)}
          title="Minimize floating pill"
          aria-label="Minimize floating switcher"
          className="w-7 h-7 rounded-full bg-[#17211C] hover:bg-[#232F28] text-[#CFB53B] border border-[#CFB53B]/60 shadow-lg flex items-center justify-center transition-transform hover:scale-105"
        >
          <EyeOff className="w-3 h-3" />
        </button>
      </div>
    </aside>
  );
};
