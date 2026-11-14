import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  AlertTriangle,
  CreditCard,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
  Shield
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminLayout: React.FC = () => {
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { to: '/admin', end: true, icon: <LayoutDashboard className="w-5 h-5" />, label: 'Operations Overview' },
    { to: '/admin/users', icon: <Users className="w-5 h-5" />, label: 'User Management' },
    { to: '/admin/verification', icon: <ShieldCheck className="w-5 h-5" />, label: 'Caregiver Verification' },
    { to: '/admin/emergencies', icon: <AlertTriangle className="w-5 h-5 text-red-500" />, label: 'SOS Emergency Monitoring' },
    { to: '/admin/subscriptions', icon: <CreditCard className="w-5 h-5" />, label: 'Subscription Revenue' },
    { to: '/admin/analytics', icon: <BarChart3 className="w-5 h-5" />, label: 'Analytics & Reports' },
    { to: '/admin/config', icon: <Settings className="w-5 h-5" />, label: 'Platform Configuration' },
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
              <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold shadow-md shadow-purple-600/20">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm">{user?.name || 'Dr. Ananya Roy'}</p>
                <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                  Operations Director
                </span>
              </div>
            </div>
          ) : (
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold mx-auto">
              🛡️
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
                    ? 'bg-purple-50 text-purple-900 shadow-sm font-bold border border-purple-200'
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
            <div className="p-3 rounded-2xl bg-purple-50/50 border border-purple-200 text-xs text-purple-900 space-y-1">
              <span className="font-bold block">Live System Health</span>
              <p className="text-[11px] text-purple-700 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                All 6 City Hubs Operational
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
            <Menu className="w-5 h-5 text-purple-700" />
            Admin Navigation
          </button>
          <span className="text-xs font-bold text-slate-700">🛡️ Admin Ops</span>
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
                    isActive ? 'bg-purple-50 text-purple-800 font-bold' : 'text-slate-600'
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
