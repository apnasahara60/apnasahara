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
  ChevronDown,
  Compass
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
        return { label: 'Family Portal', bg: 'bg-[#FFFDD0] text-[#008080] border-[#CFB53B]/50', activePill: 'bg-[#008080] text-[#FFFFF0] shadow-sm' };
      case 'caregiver':
        return { label: 'Caregiver Portal', bg: 'bg-[#FFFDD0] text-[#005F9E] border-[#CFB53B]/50', activePill: 'bg-[#005F9E] text-[#FFFFF0] shadow-sm' };
      case 'admin':
        return { label: 'Admin Portal', bg: 'bg-[#FFFDD0] text-[#800020] border-[#CFB53B]/50', activePill: 'bg-[#800020] text-[#FFFFF0] shadow-sm' };
      case 'elder':
        return { label: 'Elder Portal', bg: 'bg-[#FFFDD0] text-[#808000] border-[#CFB53B]/50', activePill: 'bg-[#808000] text-[#FFFFF0] shadow-sm' };
      default:
        return { label: 'Public Website', bg: 'bg-[#FFFDD0] text-[#17211C] border-[#CFB53B]/50', activePill: 'bg-[#008080] text-[#FFFFF0] shadow-sm' };
    }
  };

  const portalInfo = getPortalInfo();

  return (
    <header className="sticky top-0 z-[100] bg-[#FFFFF0]/95 backdrop-blur-md border-b border-[#CFB53B]/35 shadow-[0_2px_12px_rgba(23,33,28,0.04)] font-serif">
      {/* Primary Top Header Bar */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand & Logo */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/logo.png"
                alt="ApnaSahara"
                className="h-10 sm:h-12 w-auto object-contain group-hover:scale-105 transition-transform"
              />
              
            </Link>

            {/* Portal Switcher Dropdown */}
            <div className="relative ml-2">
              <button
                onClick={() => setShowPortalDropdown(!showPortalDropdown)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[12px] text-xs font-bold border transition-colors ${portalInfo.bg}`}
              >
                <span>{portalInfo.label}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {showPortalDropdown && (
                <div
                  className="absolute left-0 mt-2 w-56 bg-[#FFFFF0] rounded-[12px] shadow-xl border border-[#CFB53B]/50 p-2 z-[200] animate-in fade-in slide-in-from-top-2"
                  onClick={() => setShowPortalDropdown(false)}
                >
                  <p className="text-[10px] font-bold text-[#17211C]/50 uppercase tracking-wider px-3 py-1">
                    Select Navigation Menu
                  </p>
                  <Link
                    to="/family"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-[8px] text-xs font-bold text-[#008080] hover:bg-[#008080]/10 transition-colors"
                  >
                    <Users className="w-4 h-4 text-[#008080]" />
                    <span>Family Portal</span>
                  </Link>
                  <Link
                    to="/parent"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-[8px] text-xs font-bold text-[#808000] hover:bg-[#808000]/10 transition-colors"
                  >
                    <Heart className="w-4 h-4 text-[#808000]" />
                    <span>Elder Portal</span>
                  </Link>
                  <Link
                    to="/caregiver"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-[8px] text-xs font-bold text-[#005F9E] hover:bg-[#005F9E]/10 transition-colors"
                  >
                    <Compass className="w-4 h-4 text-[#005F9E]" />
                    <span>Caregiver Portal</span>
                  </Link>
                  <Link
                    to="/admin"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-[8px] text-xs font-bold text-[#800020] hover:bg-[#800020]/10 transition-colors"
                  >
                    <Shield className="w-4 h-4 text-[#800020]" />
                    <span>Admin Portal</span>
                  </Link>
                  <div className="border-t border-[#CFB53B]/30 my-1" />
                  <Link
                    to="/"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-[8px] text-xs font-bold text-[#17211C] hover:bg-[#CFB53B]/15 transition-colors"
                  >
                    <Activity className="w-4 h-4 text-[#CFB53B]" />
                    <span>Public Website</span>
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
                              <span className="text-sm mt-0.5 text-[#008080]">
                                {notif.type === 'sos' ? (
                                  <AlertTriangle className="w-4 h-4 text-[#800020]" />
                                ) : notif.type === 'health' ? (
                                  <Activity className="w-4 h-4 text-[#008080]" />
                                ) : notif.type === 'visit' ? (
                                  <Car className="w-4 h-4 text-[#CFB53B]" />
                                ) : (
                                  <Bell className="w-4 h-4 text-[#008080]" />
                                )}
                              </span>
                              <div className="flex-1">
                                <p className={`text-xs ${notif.read ? 'font-medium text-[#17211C]/80' : 'font-bold text-[#17211C]'}`}>
                                  {notif.title}
                                </p>
                                <p className="text-[11px] text-[#17211C]/65 mt-0.5 line-clamp-2">
                                  {notif.message}
                                </p>
                                <span className="text-[10px] text-[#17211C]/50 mt-1 block font-mono">
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
              <div className="flex items-center gap-2 pl-2 border-l border-[#CFB53B]/30">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 group hover:opacity-90 transition-opacity"
                  title="Edit Profile"
                >
                  <img
                    src={user.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover border border-[#CFB53B]/50 group-hover:border-[#008080] transition-colors"
                  />
                  <span className="hidden md:inline text-xs font-bold text-[#17211C] group-hover:text-[#008080] max-w-[100px] truncate transition-colors">
                    {user.name.split(' ')[0]}
                  </span>
                </Link>
                <Link
                  to="/profile"
                  className="p-1.5 rounded-[8px] text-[#17211C]/60 hover:text-[#008080] hover:bg-[#008080]/10 transition-colors"
                  title="Profile Settings"
                >
                  <User className="w-4 h-4" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-1.5 rounded-[8px] text-[#17211C]/60 hover:text-[#800020] hover:bg-[#800020]/10 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3 py-1.5 text-xs sm:text-sm font-semibold text-[#17211C] hover:text-[#008080] transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-xs sm:text-sm font-semibold text-[#FFFFF0] bg-[#008080] hover:brightness-90 active:translate-y-[1px] rounded-[12px] shadow-sm transition-all"
                >
                  Join Sahara
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-[12px] text-[#17211C] hover:bg-[#CFB53B]/20"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Navbar Menus Row */}
      <nav className="bg-[#FFFDD0]/75 border-t border-[#CFB53B]/30 px-4 sm:px-6 lg:px-8 py-2 overflow-x-auto select-none scrollbar-none">
        <div className="max-w-[1280px] mx-auto flex items-center gap-1.5 min-w-max">
          {currentLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3.5 py-1.5 rounded-[12px] text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? portalInfo.activePill
                    : 'text-[#17211C]/80 hover:text-[#008080] hover:bg-[#CFB53B]/15'
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
        <div className="lg:hidden bg-[#FFFFF0] border-b border-[#CFB53B]/40 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 shadow-xl">
          <p className="text-[10px] font-bold text-[#17211C]/50 uppercase tracking-wider px-2">
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
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-[12px] text-xs font-bold transition-colors ${
                    isActive ? portalInfo.activePill : 'text-[#17211C] hover:bg-[#CFB53B]/15'
                  }`
                }
              >
                {link.icon && <span className="shrink-0">{link.icon}</span>}
                <span>{link.label}</span>
              </NavLink>
            ))}
          </div>

          {/* Quick Portals Links on Mobile (No emojis) */}
          <div className="pt-3 border-t border-[#CFB53B]/30">
            {user && (
              <div className="mb-3 px-2">
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-2.5 rounded-[12px] bg-[#FFFDD0] border border-[#CFB53B]/50 hover:bg-[#CFB53B]/20 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src={user.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                      alt={user.name}
                      className="w-7 h-7 rounded-full object-cover border border-[#CFB53B]"
                    />
                    <div>
                      <p className="text-xs font-bold text-[#17211C] leading-none">{user.name}</p>
                      <p className="text-[10px] text-[#008080] font-semibold mt-0.5">Edit Profile & Settings</p>
                    </div>
                  </div>
                  <User className="w-4 h-4 text-[#008080]" />
                </Link>
              </div>
            )}
            <p className="text-xs font-bold text-[#17211C]/60 uppercase tracking-wider px-2 mb-2">Switch Portal</p>
            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              <Link to="/family" onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded-[12px] bg-[#FFFDD0] text-[#008080] border border-[#CFB53B]/40 flex items-center justify-center gap-2">
                <Users className="w-3.5 h-3.5 text-[#008080]" />
                <span>Family</span>
              </Link>
              <Link to="/parent" onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded-[12px] bg-[#FFFDD0] text-[#808000] border border-[#CFB53B]/40 flex items-center justify-center gap-2">
                <Heart className="w-3.5 h-3.5 text-[#808000]" />
                <span>Elder</span>
              </Link>
              <Link to="/caregiver" onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded-[12px] bg-[#FFFDD0] text-[#005F9E] border border-[#CFB53B]/40 flex items-center justify-center gap-2">
                <Compass className="w-3.5 h-3.5 text-[#005F9E]" />
                <span>Caregiver</span>
              </Link>
              <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded-[12px] bg-[#FFFDD0] text-[#800020] border border-[#CFB53B]/40 flex items-center justify-center gap-2">
                <Shield className="w-3.5 h-3.5 text-[#800020]" />
                <span>Admin</span>
              </Link>
            </div>
            <div className="mt-2 text-center">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-xs font-bold text-[#008080] hover:underline flex items-center justify-center gap-1.5 pt-1">
                <Activity className="w-3.5 h-3.5 text-[#CFB53B]" />
                <span>Public Website</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
