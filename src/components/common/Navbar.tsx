import React, { useState } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  Heart,
  Shield,
  Bell,
  Menu,
  X,
  User,
  LogOut,
  PhoneCall,
  Eye,
  Type,
  AlertTriangle,
  LayoutDashboard,
  Activity,
  MapPin,
  Car,
  Pill,
  Calendar,
  ClipboardList,
  CreditCard,
  CalendarCheck,
  CheckSquare,
  Navigation,
  FileText,
  Clock,
  Users,
  ShieldCheck,
  BarChart3,
  Settings,
  HelpCircle,
  Home,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useNotification } from '../../context/NotificationContext';

interface NavItem {
  to: string;
  label: string;
  end?: boolean;
  icon?: React.ReactNode;
}

export const Navbar: React.FC = () => {
  const { user, role, logout } = useAuth();
  const { textSize, setTextSize, highContrast, toggleHighContrast } = useAccessibility();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotification();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAccessMenu, setShowAccessMenu] = useState(false);
  const [showPortalDropdown, setShowPortalDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  // Determine current active section
  const currentPath = location.pathname;
  let activeSection: 'public' | 'family' | 'elder' | 'caregiver' | 'admin' = 'public';

  if (currentPath.startsWith('/family')) {
    activeSection = 'family';
  } else if (currentPath.startsWith('/parent')) {
    activeSection = 'elder';
  } else if (currentPath.startsWith('/caregiver')) {
    activeSection = 'caregiver';
  } else if (currentPath.startsWith('/admin')) {
    activeSection = 'admin';
  } else if (user) {
    if (role === 'elder') activeSection = 'elder';
    else if (role === 'caregiver') activeSection = 'caregiver';
    else if (role === 'admin') activeSection = 'admin';
    else activeSection = 'family';
  }

  // Navigation Links for all sections
  const publicLinks: NavItem[] = [
    { to: '/', end: true, label: 'Home' },
    { to: '/about', label: 'About Us' },
    { to: '/services', label: 'Services' },
    { to: '/how-it-works', label: 'How It Works' },
    { to: '/pricing', label: 'Pricing' },
    { to: '/contact', label: 'Contact' }
  ];

  const familyLinks: NavItem[] = [
    { to: '/family', end: true, icon: <LayoutDashboard className="w-4 h-4" />, label: 'Dashboard' },
    { to: '/family/health', icon: <Activity className="w-4 h-4" />, label: 'Health' },
    { to: '/family/location', icon: <MapPin className="w-4 h-4" />, label: 'Live Location' },
    { to: '/family/caregiver', icon: <Car className="w-4 h-4" />, label: 'Caregiver' },
    { to: '/family/sos', icon: <AlertTriangle className="w-4 h-4 text-red-500" />, label: 'SOS Alert' },
    { to: '/family/medications', icon: <Pill className="w-4 h-4" />, label: 'Medications' },
    { to: '/family/appointments', icon: <Calendar className="w-4 h-4" />, label: 'Appointments' },
    { to: '/family/visits', icon: <ClipboardList className="w-4 h-4" />, label: 'Visit Reports' },
    { to: '/family/subscription', icon: <CreditCard className="w-4 h-4" />, label: 'Subscription' }
  ];

  const caregiverLinks: NavItem[] = [
    { to: '/caregiver', end: true, icon: <LayoutDashboard className="w-4 h-4" />, label: 'Dashboard' },
    { to: '/caregiver/visits', icon: <CalendarCheck className="w-4 h-4" />, label: 'Assigned Visits' },
    { to: '/caregiver/tasks', icon: <CheckSquare className="w-4 h-4" />, label: 'Tasks' },
    { to: '/caregiver/navigation', icon: <Navigation className="w-4 h-4" />, label: 'GPS Navigation' },
    { to: '/caregiver/documentation', icon: <FileText className="w-4 h-4" />, label: 'Documentation' },
    { to: '/caregiver/availability', icon: <Clock className="w-4 h-4" />, label: 'Availability' }
  ];

  const adminLinks: NavItem[] = [
    { to: '/admin', end: true, icon: <LayoutDashboard className="w-4 h-4" />, label: 'Overview' },
    { to: '/admin/users', icon: <Users className="w-4 h-4" />, label: 'Users' },
    { to: '/admin/verification', icon: <ShieldCheck className="w-4 h-4" />, label: 'Verification' },
    { to: '/admin/emergencies', icon: <AlertTriangle className="w-4 h-4 text-red-500" />, label: 'SOS Alerts' },
    { to: '/admin/subscriptions', icon: <CreditCard className="w-4 h-4" />, label: 'Revenue' },
    { to: '/admin/analytics', icon: <BarChart3 className="w-4 h-4" />, label: 'Analytics' },
    { to: '/admin/config', icon: <Settings className="w-4 h-4" />, label: 'Config' }
  ];

  const elderLinks: NavItem[] = [
    { to: '/parent', end: true, icon: <Home className="w-4 h-4" />, label: 'Home' },
    { to: '/parent/sos', icon: <AlertTriangle className="w-4 h-4 text-red-500" />, label: 'Emergency SOS' },
    { to: '/parent/meds', icon: <Pill className="w-4 h-4 text-amber-500" />, label: 'Medicines' },
    { to: '/parent/vitals', icon: <Activity className="w-4 h-4 text-emerald-500" />, label: 'Health' },
    { to: '/parent/visits', icon: <Calendar className="w-4 h-4 text-blue-500" />, label: 'Visits' },
    { to: '/parent/contacts', icon: <PhoneCall className="w-4 h-4 text-indigo-500" />, label: 'Call Family' },
    { to: '/parent/help', icon: <HelpCircle className="w-4 h-4 text-teal-500" />, label: 'Ask Help' }
  ];

  const getActiveLinks = (): NavItem[] => {
    switch (activeSection) {
      case 'family':
        return familyLinks;
      case 'caregiver':
        return caregiverLinks;
      case 'admin':
        return adminLinks;
      case 'elder':
        return elderLinks;
      default:
        return publicLinks;
    }
  };

  const currentLinks = getActiveLinks();

  const getPortalInfo = () => {
    switch (activeSection) {
      case 'family':
        return { label: 'Family Portal', bg: 'bg-emerald-50 text-emerald-800 border-emerald-300', activePill: 'bg-emerald-600 text-white shadow-sm' };
      case 'caregiver':
        return { label: 'Caregiver Portal', bg: 'bg-blue-50 text-blue-800 border-blue-300', activePill: 'bg-blue-600 text-white shadow-sm' };
      case 'admin':
        return { label: 'Admin Portal', bg: 'bg-purple-50 text-purple-800 border-purple-300', activePill: 'bg-purple-600 text-white shadow-sm' };
      case 'elder':
        return { label: 'Elder Portal', bg: 'bg-amber-50 text-amber-900 border-amber-300', activePill: 'bg-amber-500 text-slate-950 shadow-sm' };
      default:
        return { label: 'Public Portal', bg: 'bg-slate-100 text-slate-800 border-slate-300', activePill: 'bg-brand-600 text-white shadow-sm' };
    }
  };

  const portalInfo = getPortalInfo();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      {/* Primary Top Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand & Logo */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/logo.png"
                alt="ApnaSahara"
                className="h-10 sm:h-12 w-auto object-contain group-hover:scale-105 transition-transform"
              />
              <div className="hidden sm:block">
                <span className="text-[10px] uppercase font-bold tracking-widest bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">
                  Care, Close to Home
                </span>
              </div>
            </Link>

            {/* Portal Switcher Dropdown */}
            <div className="relative ml-2">
              <button
                onClick={() => setShowPortalDropdown(!showPortalDropdown)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${portalInfo.bg}`}
              >
                <span>{portalInfo.label}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {showPortalDropdown && (
                <div
                  className="absolute left-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in slide-in-from-top-2"
                  onClick={() => setShowPortalDropdown(false)}
                >
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1">
                    Select Navigation Menu
                  </p>
                  <Link
                    to="/family"
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-emerald-800 hover:bg-emerald-50 transition-colors"
                  >
                    👨‍👩‍👧 Family Portal
                  </Link>
                  <Link
                    to="/parent"
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-amber-900 hover:bg-amber-50 transition-colors"
                  >
                    👴 Elder Portal
                  </Link>
                  <Link
                    to="/caregiver"
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-blue-800 hover:bg-blue-50 transition-colors"
                  >
                    🩺 Caregiver Portal
                  </Link>
                  <Link
                    to="/admin"
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-purple-800 hover:bg-purple-50 transition-colors"
                  >
                    🛡️ Admin Portal
                  </Link>
                  <div className="border-t border-slate-100 my-1" />
                  <Link
                    to="/"
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    🌐 Public Website
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Action Area */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Accessibility Settings Toggle Button */}
            <div className="relative">
              <button
                onClick={() => setShowAccessMenu(!showAccessMenu)}
                className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                title="Accessibility: Text Size & Contrast"
                aria-label="Accessibility options"
              >
                <Eye className="w-5 h-5" />
              </button>

              {showAccessMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50 animate-in fade-in slide-in-from-top-2">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
                    Senior Accessibility
                  </h4>

                  {/* Text Size */}
                  <div className="mb-3">
                    <label className="text-xs text-slate-500 mb-1.5 block">Text Size</label>
                    <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl">
                      <button
                        onClick={() => setTextSize('normal')}
                        className={`text-xs py-1 rounded-lg font-medium ${textSize === 'normal' ? 'bg-white shadow-sm font-bold text-brand-700' : 'text-slate-600'}`}
                      >
                        A
                      </button>
                      <button
                        onClick={() => setTextSize('large')}
                        className={`text-sm py-1 rounded-lg font-medium ${textSize === 'large' ? 'bg-white shadow-sm font-bold text-brand-700' : 'text-slate-600'}`}
                      >
                        A+
                      </button>
                      <button
                        onClick={() => setTextSize('xlarge')}
                        className={`text-base py-1 rounded-lg font-medium ${textSize === 'xlarge' ? 'bg-white shadow-sm font-bold text-brand-700' : 'text-slate-600'}`}
                      >
                        A++
                      </button>
                    </div>
                  </div>

                  {/* High Contrast */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <span className="text-xs text-slate-700 font-medium">High Contrast Mode</span>
                    <button
                      onClick={toggleHighContrast}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${highContrast ? 'bg-brand-600' : 'bg-slate-300'}`}
                    >
                      <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${highContrast ? 'translate-x-4' : 'translate-x-1'}`} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Notifications Menu */}
            {user && (
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                  aria-label="Notifications"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-800 text-sm">Notifications</h4>
                        <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-full text-slate-600 font-semibold">
                          {notifications.length}
                        </span>
                      </div>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllAsRead}
                          className="text-xs text-brand-600 hover:text-brand-700 font-semibold"
                        >
                          Mark all read
                        </button>
                      )}
                    </div>

                    <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 mt-2">
                      {notifications.length === 0 ? (
                        <p className="text-xs text-slate-400 py-6 text-center">No notifications</p>
                      ) : (
                        notifications.map((notif) => (
                          <div
                            key={notif.id}
                            onClick={() => {
                              markAsRead(notif.id);
                              if (notif.link) navigate(notif.link);
                              setShowNotifications(false);
                            }}
                            className={`p-2.5 rounded-xl cursor-pointer transition-colors text-left ${
                              notif.read ? 'hover:bg-slate-50' : 'bg-brand-50/50 hover:bg-brand-50'
                            }`}
                          >
                            <div className="flex items-start gap-2">
                              <span className="text-sm mt-0.5">
                                {notif.type === 'sos' ? '🚨' : notif.type === 'health' ? '🩺' : notif.type === 'visit' ? '🚗' : '🔔'}
                              </span>
                              <div className="flex-1">
                                <p className={`text-xs ${notif.read ? 'font-medium text-slate-700' : 'font-bold text-slate-900'}`}>
                                  {notif.title}
                                </p>
                                <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                                  {notif.message}
                                </p>
                                <span className="text-[10px] text-slate-400 mt-1 block">
                                  {new Date(notif.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* User Profile / Logout or Sign In */}
            {user ? (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <img
                  src={user.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover border border-slate-200"
                />
                <span className="hidden md:inline text-xs font-bold text-slate-700 max-w-[100px] truncate">
                  {user.name.split(' ')[0]}
                </span>
                <button
                  onClick={handleLogout}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3 py-1.5 text-xs sm:text-sm font-semibold text-slate-700 hover:text-brand-600"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-3.5 py-1.5 text-xs sm:text-sm font-bold text-white bg-brand-600 hover:bg-brand-500 rounded-xl shadow-sm transition-all"
                >
                  Join Sahara
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Navbar Menus Row (No Sidebar - All Menus in Top Nav) */}
      <nav className="bg-slate-50/90 border-t border-slate-200/80 px-4 sm:px-6 lg:px-8 py-2 overflow-x-auto select-none scrollbar-none">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 min-w-max">
          {currentLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? portalInfo.activePill
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`
              }
            >
              {link.icon && <span className="shrink-0">{link.icon}</span>}
              <span>{link.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Mobile Drawer (Accessible from top hamburger button) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 shadow-xl">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">
            {portalInfo.label} Menu
          </p>

          <div className="space-y-1">
            {currentLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                    isActive ? portalInfo.activePill : 'text-slate-700 hover:bg-slate-100'
                  }`
                }
              >
                {link.icon && <span className="shrink-0">{link.icon}</span>}
                <span>{link.label}</span>
              </NavLink>
            ))}
          </div>

          {/* Quick Portals Links on Mobile */}
          <div className="pt-3 border-t border-slate-200">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 mb-2">Switch Portal</p>
            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              <Link to="/family" onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-center">
                👨‍👩‍👧 Family Portal
              </Link>
              <Link to="/parent" onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 text-center">
                👴 Elder Portal
              </Link>
              <Link to="/caregiver" onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded-xl bg-blue-50 text-blue-800 border border-blue-200 text-center">
                🩺 Caregiver Portal
              </Link>
              <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded-xl bg-purple-50 text-purple-800 border border-purple-200 text-center">
                🛡️ Admin Portal
              </Link>
            </div>
            <div className="mt-2 text-center">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-xs font-bold text-slate-600 hover:underline">
                🌐 Back to Public Website
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
