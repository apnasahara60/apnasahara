import React from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import {
  Heart,
  AlertTriangle,
  Pill,
  Calendar,
  PhoneCall,
  Activity,
  HelpCircle,
  Volume2,
  Home
} from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { dbStore } from '../../lib/supabase';

export const ElderLayout: React.FC = () => {
  const { speak } = useAccessibility();
  const elders = dbStore.getElders();
  const elder = elders[0];

  const elderNav = [
    { to: '/parent', end: true, icon: <Home className="w-6 h-6" />, label: 'Home' },
    { to: '/parent/sos', icon: <AlertTriangle className="w-6 h-6 text-red-500" />, label: 'Emergency SOS' },
    { to: '/parent/meds', icon: <Pill className="w-6 h-6 text-amber-500" />, label: 'Medicines' },
    { to: '/parent/vitals', icon: <Activity className="w-6 h-6 text-emerald-500" />, label: 'Health' },
    { to: '/parent/visits', icon: <Calendar className="w-6 h-6 text-blue-500" />, label: 'Visits' },
    { to: '/parent/contacts', icon: <PhoneCall className="w-6 h-6 text-indigo-500" />, label: 'Call Family' },
    { to: '/parent/help', icon: <HelpCircle className="w-6 h-6 text-teal-500" />, label: 'Ask Help' },
  ];

  return (
    <div className="min-h-screen bg-amber-50/40 text-slate-900 flex flex-col">
      {/* Top Elder Friendly Header */}
      <header className="bg-white border-b-2 border-amber-200 px-4 py-3 sm:py-4 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link to="/parent" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center text-slate-950 font-black shadow-md">
              <span className="text-2xl">👴</span>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Namaste, {elder?.name?.split(' ')[0] || 'Uncle ji'}!
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-semibold">ApnaSahara Senior Portal</p>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={() => speak(`Namaste ${elder?.name}. You are on the ApnaSahara elder portal. Press the red SOS button anytime you need emergency assistance.`)}
              className="p-3 rounded-2xl bg-amber-100 text-amber-900 font-bold text-xs flex items-center gap-1.5 hover:bg-amber-200 transition-colors"
              title="Voice assistant"
            >
              <Volume2 className="w-5 h-5 text-amber-800" />
              <span className="hidden sm:inline">Read Aloud</span>
            </button>

            <Link
              to="/parent/sos"
              className="px-4 py-2.5 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-black text-sm flex items-center gap-2 shadow-lg shadow-red-600/30 animate-pulse"
            >
              <AlertTriangle className="w-5 h-5" />
              SOS Button
            </Link>
          </div>
        </div>
      </header>

      {/* Main Sub-Navigation Bar for Seniors (Big Touch Tabs) */}
      <nav className="bg-white border-b border-amber-200 px-2 py-2 overflow-x-auto">
        <div className="max-w-5xl mx-auto flex items-center justify-around sm:justify-start gap-1 sm:gap-3 min-w-max">
          {elderNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-md ring-2 ring-amber-400'
                    : 'text-slate-600 hover:bg-amber-100/60'
                }`
              }
            >
              <div className="shrink-0">{item.icon}</div>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Main Outlet */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
};
