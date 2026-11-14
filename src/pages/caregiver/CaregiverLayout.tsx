import React, { useState } from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarCheck,
  CheckSquare,
  Navigation,
  FileText,
  Clock,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Menu,
  Stethoscope
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { dbStore } from '../../lib/supabase';

export const CaregiverLayout: React.FC = () => {
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const caregiver = dbStore.getCaregivers()[0];

  const links = [
    { to: '/caregiver', end: true, icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard' },
    { to: '/caregiver/visits', icon: <CalendarCheck className="w-5 h-5" />, label: 'Assigned Visits' },
    { to: '/caregiver/tasks', icon: <CheckSquare className="w-5 h-5" />, label: 'Task Management' },
    { to: '/caregiver/navigation', icon: <Navigation className="w-5 h-5" />, label: 'GPS Navigation' },
    { to: '/caregiver/documentation', icon: <FileText className="w-5 h-5" />, label: 'Visit Documentation' },
    { to: '/caregiver/availability', icon: <Clock className="w-5 h-5" />, label: 'Availability & Shifts' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col border-r border-slate-200 bg-white transition-all duration-300 ${
          collapsed ? 'w-20' : 'w-72'
        }`}
      >
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          {!collapsed ? (
            <div className="flex items-center gap-3">
              <img
                src={caregiver?.avatar_url || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80'}
                alt="Caregiver"
                className="w-10 h-10 rounded-xl object-cover border-2 border-blue-500"
              />
              <div>
                <p className="font-bold text-slate-900 text-sm truncate">{caregiver?.name || 'Priya Verma'}</p>
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                  Verified GDA Sahayak
                </span>
              </div>
            </div>
          ) : (
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold mx-auto">
              🩺
            </div>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 ml-2"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-blue-50 text-blue-800 shadow-sm font-bold border border-blue-200'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              <div className="shrink-0">{link.icon}</div>
              {!collapsed && <span className="truncate">{link.label}</span>}
            </NavLink>
          ))}
        </nav>

        {!collapsed && (
          <div className="p-4 border-t border-slate-100">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
              <span className="text-slate-500 font-semibold block">Today's Shift Status:</span>
              <p className="font-bold text-emerald-600 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                On Duty (Noida Sec 62)
              </p>
            </div>
          </div>
        )}
      </aside>

      {/* Main Outlet */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-xl text-slate-600 hover:bg-slate-50 flex items-center gap-2 text-xs font-bold"
          >
            <Menu className="w-5 h-5 text-blue-700" />
            Caregiver Menu
          </button>
          <span className="text-xs font-bold text-slate-700">🩺 {caregiver?.name}</span>
        </div>

        {mobileOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 p-4 space-y-1 animate-in slide-in-from-top-2 shadow-lg">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold ${
                    isActive ? 'bg-blue-50 text-blue-800 font-bold' : 'text-slate-600'
                  }`
                }
              >
                {link.icon}
                <span>{link.label}</span>
              </NavLink>
            ))}
          </div>
        )}

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
