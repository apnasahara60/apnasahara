import React, { useState } from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Activity,
  MapPin,
  Car,
  AlertTriangle,
  Pill,
  Calendar,
  ClipboardList,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Shield,
  PhoneCall,
  Menu,
  Heart
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { dbStore } from '../../lib/supabase';

export const FamilyLayout: React.FC = () => {
  const { user } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const elders = dbStore.getElders();
  const [selectedElderId, setSelectedElderId] = useState(elders[0]?.id || 'elder-1');

  const navLinks = [
    { to: '/family', end: true, icon: <LayoutDashboard className="w-5 h-5" />, label: 'Family Dashboard' },
    { to: '/family/health', icon: <Activity className="w-5 h-5" />, label: 'Health Monitoring' },
    { to: '/family/location', icon: <MapPin className="w-5 h-5" />, label: 'Live Location Radar' },
    { to: '/family/caregiver', icon: <Car className="w-5 h-5" />, label: 'Caregiver Tracking' },
    { to: '/family/sos', icon: <AlertTriangle className="w-5 h-5 text-red-500" />, label: 'Emergency SOS' },
    { to: '/family/medications', icon: <Pill className="w-5 h-5" />, label: 'Medications' },
    { to: '/family/appointments', icon: <Calendar className="w-5 h-5" />, label: 'Appointments' },
    { to: '/family/visits', icon: <ClipboardList className="w-5 h-5" />, label: 'Visit Reports' },
    { to: '/family/subscription', icon: <CreditCard className="w-5 h-5" />, label: 'Subscription Plan' },
  ];

  const selectedElder = elders.find(e => e.id === selectedElderId) || elders[0];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col border-r border-slate-200 bg-white transition-all duration-300 select-none ${
          sidebarCollapsed ? 'w-20' : 'w-72'
        }`}
      >
        {/* Sidebar Header: Elder Selector */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          {!sidebarCollapsed ? (
            <div className="flex-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Monitored Parent
              </label>
              <select
                value={selectedElderId}
                onChange={(e) => setSelectedElderId(e.target.value)}
                className="w-full text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl p-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-brand-500 cursor-pointer"
              >
                {elders.map((elder) => (
                  <option key={elder.id} value={elder.id}>
                    {elder.name} ({elder.age}y, {elder.city})
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold mx-auto">
              👴
            </div>
          )}

          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 ml-2"
            title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-800 shadow-sm font-bold border border-emerald-200'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              <div className="shrink-0">{link.icon}</div>
              {!sidebarCollapsed && <span className="truncate">{link.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* SOS Rapid dispatch shortcut at sidebar bottom */}
        {!sidebarCollapsed && (
          <div className="p-4 border-t border-slate-100">
            <Link
              to="/family/sos"
              className="w-full py-3 px-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <AlertTriangle className="w-4 h-4 text-red-600 animate-pulse" />
              Emergency SOS Room
            </Link>
          </div>
        )}
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Top Sub-bar */}
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-xl text-slate-600 hover:bg-slate-50 flex items-center gap-2 text-xs font-bold"
          >
            <Menu className="w-5 h-5 text-emerald-700" />
            Family Navigation
          </button>

          <span className="text-xs font-bold text-slate-700">
            👴 {selectedElder?.name}
          </span>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 p-4 space-y-1 animate-in slide-in-from-top-2 shadow-lg">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold ${
                    isActive ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-slate-600'
                  }`
                }
              >
                {link.icon}
                <span>{link.label}</span>
              </NavLink>
            ))}
          </div>
        )}

        {/* Child Page Outlet */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet context={{ selectedElder }} />
        </main>
      </div>
    </div>
  );
};
