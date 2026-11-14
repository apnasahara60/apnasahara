import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
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
  Compass,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useNotification } from '../../context/NotificationContext';

interface NavItem {
  to: string;
  label: string;
  shortLabel?: string;
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
  const portalDropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Close menus and drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setShowPortalDropdown(false);
    setShowNotifications(false);
    setShowAccessMenu(false);
  }, [location.pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Click outside listener for dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (portalDropdownRef.current && !portalDropdownRef.current.contains(event.target as Node)) {
        setShowPortalDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
    { to: '/', end: true, icon: <Home className="w-4 h-4" />, label: 'Home', shortLabel: 'Home' },
    { to: '/about', icon: <Heart className="w-4 h-4" />, label: 'About Us', shortLabel: 'About' },
    { to: '/services', icon: <Activity className="w-4 h-4" />, label: 'Services', shortLabel: 'Services' },
    { to: '/how-it-works', icon: <ShieldCheck className="w-4 h-4" />, label: 'How It Works', shortLabel: 'Process' },
    { to: '/pricing', icon: <CreditCard className="w-4 h-4" />, label: 'Pricing', shortLabel: 'Plans' },
    { to: '/contact', icon: <PhoneCall className="w-4 h-4" />, label: 'Contact', shortLabel: 'Contact' }
  ];

  const familyLinks: NavItem[] = [
    { to: '/family', end: true, icon: <LayoutDashboard className="w-4 h-4" />, label: 'Dashboard', shortLabel: 'Dashboard' },
    { to: '/family/health', icon: <Activity className="w-4 h-4" />, label: 'Health Monitoring', shortLabel: 'Health' },
    { to: '/family/location', icon: <MapPin className="w-4 h-4" />, label: 'Live Location', shortLabel: 'Live GPS' },
    { to: '/family/caregiver', icon: <Car className="w-4 h-4" />, label: 'Caregivers', shortLabel: 'Sahayak' },
    { to: '/family/sos', icon: <AlertTriangle className="w-4 h-4 text-[#800020]" />, label: 'SOS Alert', shortLabel: 'SOS Beacon' },
    { to: '/family/medications', icon: <Pill className="w-4 h-4" />, label: 'Medications', shortLabel: 'Meds' },
    { to: '/family/appointments', icon: <Calendar className="w-4 h-4" />, label: 'Appointments', shortLabel: 'Visits' },
    { to: '/family/visits', icon: <ClipboardList className="w-4 h-4" />, label: 'Visit Reports', shortLabel: 'Reports' },
    { to: '/family/subscription', icon: <CreditCard className="w-4 h-4" />, label: 'Subscription', shortLabel: 'Plan' }
  ];

  const caregiverLinks: NavItem[] = [
    { to: '/caregiver', end: true, icon: <LayoutDashboard className="w-4 h-4" />, label: 'Dashboard', shortLabel: 'Dashboard' },
    { to: '/caregiver/visits', icon: <CalendarCheck className="w-4 h-4" />, label: 'Assigned Visits', shortLabel: 'Visits' },
    { to: '/caregiver/tasks', icon: <CheckSquare className="w-4 h-4" />, label: 'Task Checklist', shortLabel: 'Tasks' },
    { to: '/caregiver/navigation', icon: <Navigation className="w-4 h-4" />, label: 'GPS Route', shortLabel: 'GPS Route' },
    { to: '/caregiver/documentation', icon: <FileText className="w-4 h-4" />, label: 'Clinical Log', shortLabel: 'Clinical Log' },
    { to: '/caregiver/availability', icon: <Clock className="w-4 h-4" />, label: 'Availability', shortLabel: 'Roster' }
  ];

  const adminLinks: NavItem[] = [
    { to: '/admin', end: true, icon: <LayoutDashboard className="w-4 h-4" />, label: 'Overview', shortLabel: 'Overview' },
    { to: '/admin/users', icon: <Users className="w-4 h-4" />, label: 'User Directory', shortLabel: 'Users' },
    { to: '/admin/verification', icon: <ShieldCheck className="w-4 h-4" />, label: 'Accreditation', shortLabel: 'Verify' },
    { to: '/admin/emergencies', icon: <AlertTriangle className="w-4 h-4 text-[#800020]" />, label: 'SOS Alerts', shortLabel: 'Emergencies' },
    { to: '/admin/subscriptions', icon: <CreditCard className="w-4 h-4" />, label: 'Revenue Admin', shortLabel: 'Revenue' },
    { to: '/admin/analytics', icon: <BarChart3 className="w-4 h-4" />, label: 'Analytics', shortLabel: 'Analytics' },
    { to: '/admin/config', icon: <Settings className="w-4 h-4" />, label: 'Configuration', shortLabel: 'Config' }
  ];

  const elderLinks: NavItem[] = [
    { to: '/parent', end: true, icon: <Home className="w-4 h-4" />, label: 'Home', shortLabel: 'Home' },
    { to: '/parent/sos', icon: <AlertTriangle className="w-4 h-4 text-[#800020]" />, label: 'Emergency SOS', shortLabel: 'SOS' },
    { to: '/parent/meds', icon: <Pill className="w-4 h-4 text-[#CFB53B]" />, label: 'Medicines', shortLabel: 'Medicines' },
    { to: '/parent/vitals', icon: <Activity className="w-4 h-4 text-[#808000]" />, label: 'Health', shortLabel: 'Health' },
    { to: '/parent/visits', icon: <Calendar className="w-4 h-4 text-[#005F9E]" />, label: 'Visits', shortLabel: 'Visits' },
    { to: '/parent/contacts', icon: <PhoneCall className="w-4 h-4 text-[#008080]" />, label: 'Call Family', shortLabel: 'Family' },
    { to: '/parent/help', icon: <HelpCircle className="w-4 h-4 text-[#008080]" />, label: 'Ask Help', shortLabel: 'Assistance' }
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
        return {
          label: 'Family Portal',
          shortLabel: 'Family',
          bg: 'bg-[#FFFDD0] text-[#008080] border-[#CFB53B]/60',
          activePill: 'bg-[#008080] text-[#FFFFF0] border border-[#CFB53B] shadow-sm font-bold'
        };
      case 'caregiver':
        return {
          label: 'Caregiver Portal',
          shortLabel: 'Caregiver',
          bg: 'bg-[#FFFDD0] text-[#005F9E] border-[#CFB53B]/60',
          activePill: 'bg-[#005F9E] text-[#FFFFF0] border border-[#CFB53B] shadow-sm font-bold'
        };
      case 'admin':
        return {
          label: 'Admin Portal',
          shortLabel: 'Admin',
          bg: 'bg-[#FFFDD0] text-[#800020] border-[#CFB53B]/60',
          activePill: 'bg-[#800020] text-[#FFFFF0] border border-[#CFB53B] shadow-sm font-bold'
        };
      case 'elder':
        return {
          label: 'Elder Portal',
          shortLabel: 'Elder',
          bg: 'bg-[#FFFDD0] text-[#808000] border-[#CFB53B]/60',
          activePill: 'bg-[#808000] text-[#FFFFF0] border border-[#CFB53B] shadow-sm font-bold'
        };
      default:
        return {
          label: 'Public Website',
          shortLabel: 'Public',
          bg: 'bg-[#FFFDD0] text-[#17211C] border-[#CFB53B]/60',
          activePill: 'bg-[#008080] text-[#FFFFF0] border border-[#CFB53B] shadow-sm font-bold'
        };
    }
  };

  const portalInfo = getPortalInfo();

  return (
    <>
      <header className="sticky top-0 z-[100] bg-[#FFFFF0]/95 backdrop-blur-md border-b border-[#CFB53B]/35 shadow-[0_2px_12px_rgba(23,33,28,0.04)] font-serif w-full">
        {/* =========================================================================
            1. COMPACT RESPONSIVE MOBILE HEADER (< 1024px)
            Layout:
            - Left: ApnaSahara logo.
            - Center: Current portal selector in a compact dropdown.
            - Right: Notification icon with unread badge + hamburger menu.
            ========================================================================= */}
      <div className="flex lg:hidden items-center justify-between h-14 px-3 sm:px-4 max-w-full">
        {/* Left: ApnaSahara Logo */}
        <Link to="/" className="flex items-center shrink-0 group">
          <img
            src="/logo.png"
            alt="ApnaSahara"
            className="h-8 sm:h-9 w-auto object-contain group-hover:scale-102 transition-transform"
          />
        </Link>

        {/* Center: Current Portal Selector Dropdown */}
        <div className="relative mx-1" ref={portalDropdownRef}>
          <button
            onClick={() => setShowPortalDropdown(!showPortalDropdown)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[10px] text-xs font-bold border transition-colors shadow-xs ${portalInfo.bg}`}
            aria-label="Switch portal"
            aria-expanded={showPortalDropdown}
          >
            <span className="truncate max-w-[125px] sm:max-w-[160px]">{portalInfo.label}</span>
            <ChevronDown className={`w-3.5 h-3.5 shrink-0 transition-transform ${showPortalDropdown ? 'rotate-180' : ''}`} />
          </button>

          {showPortalDropdown && (
            <div
              className="absolute left-1/2 -translate-x-1/2 mt-2 w-60 bg-[#FFFFF0] rounded-[12px] shadow-2xl border-2 border-[#CFB53B] p-2 z-[250] animate-in fade-in slide-in-from-top-2"
              onClick={() => setShowPortalDropdown(false)}
            >
              <p className="text-[10px] font-bold text-[#17211C]/60 uppercase tracking-wider px-3 py-1 font-sans">
                Select Active Portal
              </p>
              <Link
                to="/family"
                className={`flex items-center justify-between px-3 py-2 rounded-[8px] text-xs font-bold transition-colors ${
                  activeSection === 'family' ? 'bg-[#008080]/15 text-[#008080] border border-[#008080]/30' : 'text-[#17211C] hover:bg-[#FFFDD0]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#008080]" />
                  <span>Family Portal</span>
                </div>
                {activeSection === 'family' && <span className="w-2 h-2 rounded-full bg-[#008080]" />}
              </Link>

              <Link
                to="/parent"
                className={`flex items-center justify-between px-3 py-2 rounded-[8px] text-xs font-bold transition-colors ${
                  activeSection === 'elder' ? 'bg-[#808000]/15 text-[#808000] border border-[#808000]/30' : 'text-[#17211C] hover:bg-[#FFFDD0]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-[#808000]" />
                  <span>Elder Portal</span>
                </div>
                {activeSection === 'elder' && <span className="w-2 h-2 rounded-full bg-[#808000]" />}
              </Link>

              <Link
                to="/caregiver"
                className={`flex items-center justify-between px-3 py-2 rounded-[8px] text-xs font-bold transition-colors ${
                  activeSection === 'caregiver' ? 'bg-[#005F9E]/15 text-[#005F9E] border border-[#005F9E]/30' : 'text-[#17211C] hover:bg-[#FFFDD0]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#005F9E]" />
                  <span>Caregiver Portal</span>
                </div>
                {activeSection === 'caregiver' && <span className="w-2 h-2 rounded-full bg-[#005F9E]" />}
              </Link>

              <Link
                to="/admin"
                className={`flex items-center justify-between px-3 py-2 rounded-[8px] text-xs font-bold transition-colors ${
                  activeSection === 'admin' ? 'bg-[#800020]/15 text-[#800020] border border-[#800020]/30' : 'text-[#17211C] hover:bg-[#FFFDD0]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#800020]" />
                  <span>Admin Portal</span>
                </div>
                {activeSection === 'admin' && <span className="w-2 h-2 rounded-full bg-[#800020]" />}
              </Link>

              <div className="border-t border-[#CFB53B]/30 my-1.5" />

              <Link
                to="/"
                className={`flex items-center justify-between px-3 py-2 rounded-[8px] text-xs font-bold transition-colors ${
                  activeSection === 'public' ? 'bg-[#CFB53B]/20 text-[#17211C] border border-[#CFB53B]/40' : 'text-[#17211C] hover:bg-[#FFFDD0]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#008080]" />
                  <span>Public Website</span>
                </div>
                {activeSection === 'public' && <span className="w-2 h-2 rounded-full bg-[#008080]" />}
              </Link>
            </div>
          )}
        </div>

        {/* Right: Notifications with Badge + Hamburger Menu Button */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {user && (
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-[10px] text-[#17211C] hover:bg-[#CFB53B]/15 transition-colors"
              aria-label="View notifications"
            >
              <Bell className="w-5 h-5 text-[#008080]" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#800020] text-[#FFFFF0] text-[9px] font-bold rounded-full flex items-center justify-center ring-1 ring-[#FFFFF0] font-mono">
                  {unreadCount}
                </span>
              )}
            </button>
          )}

          {/* Hamburger Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 rounded-[10px] text-[#17211C] bg-[#FFFDD0] border border-[#CFB53B]/60 hover:bg-[#CFB53B]/20 active:scale-95 transition-all shadow-xs"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5 text-[#008080]" />
          </button>
        </div>
      </div>

      {/* =========================================================================
          2. DESKTOP HEADER BAR (>= 1024px)
          Preserves the existing desktop navigation layout and elegance
          ========================================================================= */}
      <div className="hidden lg:block max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand & Logo + Desktop Portal Switcher */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/logo.png"
                alt="ApnaSahara"
                className="h-12 w-auto object-contain group-hover:scale-105 transition-transform"
              />
            </Link>

            {/* Desktop Portal Switcher Dropdown */}
            <div className="relative ml-2">
              <button
                onClick={() => setShowPortalDropdown(!showPortalDropdown)}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[12px] text-xs font-bold border transition-colors ${portalInfo.bg}`}
              >
                <span>{portalInfo.label}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {showPortalDropdown && (
                <div
                  className="absolute left-0 mt-2 w-56 bg-[#FFFFF0] rounded-[12px] shadow-xl border border-[#CFB53B]/50 p-2 z-[200] animate-in fade-in slide-in-from-top-2"
                  onClick={() => setShowPortalDropdown(false)}
                >
                  <p className="text-[10px] font-bold text-[#17211C]/50 uppercase tracking-wider px-3 py-1 font-sans">
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

          {/* Desktop Right Action Area */}
          <div className="flex items-center gap-3">
            {/* Accessibility Settings Toggle Button */}
            <div className="relative">
              <button
                onClick={() => setShowAccessMenu(!showAccessMenu)}
                className="p-2 rounded-xl text-[#17211C]/80 hover:text-[#008080] hover:bg-[#FFFDD0] transition-colors"
                title="Accessibility: Text Size & Contrast"
                aria-label="Accessibility options"
              >
                <Eye className="w-5 h-5" />
              </button>

              {showAccessMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-[#FFFFF0] rounded-2xl shadow-xl border border-[#CFB53B]/50 p-4 z-50 animate-in fade-in slide-in-from-top-2">
                  <h4 className="text-xs font-bold text-[#17211C] uppercase tracking-wider mb-3 font-sans">
                    Senior Accessibility
                  </h4>

                  {/* Text Size */}
                  <div className="mb-3 font-sans">
                    <label className="text-xs text-[#17211C]/70 mb-1.5 block">Text Size</label>
                    <div className="grid grid-cols-3 gap-1 bg-[#FFFDD0] p-1 rounded-xl border border-[#CFB53B]/30">
                      <button
                        onClick={() => setTextSize('normal')}
                        className={`text-xs py-1 rounded-lg font-medium transition-colors ${textSize === 'normal' ? 'bg-[#FFFFF0] shadow-sm font-bold text-[#008080]' : 'text-[#17211C]/70'}`}
                      >
                        A
                      </button>
                      <button
                        onClick={() => setTextSize('large')}
                        className={`text-sm py-1 rounded-lg font-medium transition-colors ${textSize === 'large' ? 'bg-[#FFFFF0] shadow-sm font-bold text-[#008080]' : 'text-[#17211C]/70'}`}
                      >
                        A+
                      </button>
                      <button
                        onClick={() => setTextSize('xlarge')}
                        className={`text-base py-1 rounded-lg font-medium transition-colors ${textSize === 'xlarge' ? 'bg-[#FFFFF0] shadow-sm font-bold text-[#008080]' : 'text-[#17211C]/70'}`}
                      >
                        A++
                      </button>
                    </div>
                  </div>

                  {/* High Contrast */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#CFB53B]/30 font-sans">
                    <span className="text-xs text-[#17211C] font-medium">High Contrast Mode</span>
                    <button
                      onClick={toggleHighContrast}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${highContrast ? 'bg-[#008080]' : 'bg-slate-300'}`}
                    >
                      <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${highContrast ? 'translate-x-4' : 'translate-x-1'}`} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Desktop Notifications Menu */}
            {user && (
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 rounded-xl text-[#17211C]/80 hover:text-[#008080] hover:bg-[#FFFDD0] transition-colors"
                  aria-label="Notifications"
                >
                  <Bell className="w-5 h-5 text-[#008080]" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#800020] text-[#FFFFF0] text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white font-mono">
                      {unreadCount}
                    </span>
                  )}
                </button>
              </div>
            )}

            {/* Desktop User Profile / Logout or Sign In */}
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
                  <span className="text-xs font-bold text-[#17211C] group-hover:text-[#008080] max-w-[110px] truncate transition-colors">
                    {user.name.split(' ')[0]}
                  </span>
                </Link>
                <Link
                  to="/profile"
                  className="p-1.5 rounded-[8px] text-[#17211C]/60 hover:text-[#008080] hover:bg-[#008080]/10 transition-colors"
                  title="Profile Settings"
                >
                  <Settings className="w-4 h-4" />
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
                  className="px-3 py-1.5 text-xs font-bold text-[#17211C] hover:text-[#008080] transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="art-btn-primary px-4 py-2 text-xs shadow-sm"
                >
                  Join Sahara
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. HORIZONTALLY SCROLLABLE NAVIGATION TAB BAR (Unified Across Mobile & Desktop)
          - Directly below the header.
          - Display icons with short labels.
          - Shows approx 3-4 items at a time on mobile.
          - Smooth horizontal touch scroll with hidden scrollbar.
          - Clearly highlights the active section with golden accent / deep teal.
          - Prevents items from shrinking or overlapping (flex-shrink-0 whitespace-nowrap).
          ========================================================================= */}
      <nav
        aria-label="Portal Navigation Tabs"
        className="bg-[#FFFDD0]/90 border-t border-[#CFB53B]/30 px-3 sm:px-6 lg:px-8 py-2 overflow-x-auto no-scrollbar scrollbar-none select-none -webkit-overflow-scrolling-touch"
      >
        <div className="max-w-[1280px] mx-auto flex items-center gap-1.5 sm:gap-2 min-w-max">
          {currentLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-[12px] text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? portalInfo.activePill
                    : 'bg-[#FFFFF0]/80 text-[#17211C]/80 border border-[#CFB53B]/25 hover:text-[#008080] hover:bg-[#FFFDD0] hover:border-[#CFB53B]/50'
                }`
              }
            >
              {link.icon && <span className="shrink-0">{link.icon}</span>}
              <span>{link.shortLabel || link.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* =========================================================================
          4. NOTIFICATIONS DROPDOWN MODAL (Shared Mobile & Desktop)
          ========================================================================= */}
      {showNotifications && (
        <div className="absolute right-3 sm:right-6 top-16 w-[92vw] sm:w-96 max-w-sm bg-[#FFFFF0] rounded-art shadow-2xl border-2 border-[#CFB53B] p-4 z-[220] animate-in fade-in slide-in-from-top-2 font-serif">
          <div className="flex items-center justify-between pb-3 border-b border-[#CFB53B]/30">
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-[#17211C] text-sm">Real-time Notifications</h4>
              <span className="text-xs bg-[#FFFDD0] border border-[#CFB53B]/40 px-2 py-0.5 rounded-full text-[#008080] font-bold font-mono">
                {notifications.length}
              </span>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs text-[#008080] hover:underline font-bold font-sans"
              >
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-72 overflow-y-auto divide-y divide-[#CFB53B]/20 mt-2 font-sans">
            {notifications.length === 0 ? (
              <p className="text-xs text-[#17211C]/60 py-6 text-center">No active notifications</p>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => {
                    markAsRead(notif.id);
                    if (notif.link) navigate(notif.link);
                    setShowNotifications(false);
                  }}
                  className={`p-2.5 rounded-art cursor-pointer transition-colors text-left ${
                    notif.read ? 'hover:bg-[#FFFDD0]/50' : 'bg-[#FFFDD0] hover:bg-[#FFFDD0]/80'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <span className="mt-0.5 shrink-0">
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
                      <p className="text-[11px] text-[#17211C]/70 mt-0.5 line-clamp-2">
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
    </header>

    {/* =========================================================================
        5. POLISHED MOBILE SLIDE-OUT NAVIGATION DRAWER (HAMBURGER MENU)
        Rendered outside <header> via React Portal to prevent clipping from
        parent stacking contexts (e.g. backdrop-filter, transform, overflow).
        Spans full viewport height (100dvh) with body scroll locked while open.
        ========================================================================= */}
    {mobileMenuOpen && typeof document !== 'undefined' && createPortal(
      <div
        id="apnasahara-mobile-drawer-portal"
        className="lg:hidden fixed inset-0 h-[100dvh] w-screen z-[99999]"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100dvh',
          zIndex: 99999
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation drawer"
      >
        {/* Backdrop Overlay */}
        <div
          className="fixed inset-0 h-[100dvh] w-screen bg-[#17211C]/60 backdrop-blur-xs transition-opacity"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100dvh'
          }}
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />

        {/* Slide-out Drawer Panel */}
        <div
          className="fixed inset-y-0 right-0 z-[100000] w-[86vw] max-w-sm h-full h-[100dvh] max-h-[100dvh] bg-[#FFFFF0] border-l-2 border-[#CFB53B] shadow-2xl flex flex-col justify-between overflow-hidden font-serif"
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            height: '100dvh',
            maxHeight: '100dvh',
            zIndex: 100000
          }}
        >
          {/* Drawer Header Strip: Logo + Close Button */}
          <div className="shrink-0 p-4 sm:p-5 pb-3 bg-[#FFFFF0] border-b border-[#CFB53B]/35 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="ApnaSahara" className="h-8 w-auto object-contain" />
              <span className="text-xs font-bold text-[#008080] font-sans uppercase tracking-wider">Sanctuary</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-1.5 rounded-[10px] text-[#17211C]/70 hover:text-[#17211C] hover:bg-[#CFB53B]/20 transition-colors"
              aria-label="Close navigation drawer"
            >
              <X className="w-5 h-5 text-[#17211C]" />
            </button>
          </div>

          {/* Scrollable Drawer Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 overscroll-contain">
            {/* User Profile Card or Authentication Actions */}
            {user ? (
              <div className="p-3.5 rounded-art bg-[#FFFDD0] border border-[#CFB53B]/60 shadow-xs space-y-3 font-sans">
                <div className="flex items-center gap-3">
                  <img
                    src={user.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'}
                    alt={user.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-[#CFB53B]"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#17211C] truncate font-serif">{user.name}</p>
                    <p className="text-[11px] text-[#17211C]/65 truncate font-mono">{user.email}</p>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#008080] bg-[#008080]/10 border border-[#008080]/30 px-2 py-0.5 rounded-full mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#808000]" />
                      {portalInfo.label}
                    </span>
                  </div>
                </div>

                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-1.5 px-3 rounded-art bg-[#FFFFF0] border border-[#CFB53B]/50 hover:bg-[#FFFDD0] text-[#008080] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Settings className="w-3.5 h-3.5 text-[#CFB53B]" />
                  <span>Manage Profile & Settings</span>
                </Link>
              </div>
            ) : (
              <div className="p-3.5 rounded-art bg-[#FFFDD0] border border-[#CFB53B]/60 space-y-2.5 font-sans">
                <p className="text-xs font-bold text-[#17211C] font-serif">Welcome to ApnaSahara</p>
                <p className="text-[11px] text-[#17211C]/70">Access personalized eldercare and family monitoring portals.</p>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="art-btn-secondary py-2 text-xs font-bold text-center justify-center"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="art-btn-primary py-2 text-xs font-bold text-center justify-center shadow-xs"
                  >
                    Join Sahara
                  </Link>
                </div>
              </div>
            )}

            {/* Portal Switcher Grid */}
            <div className="space-y-2">
              <p className="text-[10px] font-bold text-[#008080] uppercase tracking-wider px-1 font-sans">
                Switch Active Portal
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs font-bold font-sans">
                <Link
                  to="/family"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`p-2 rounded-art border flex items-center gap-2 transition-colors ${
                    activeSection === 'family'
                      ? 'bg-[#008080] text-[#FFFFF0] border-[#CFB53B] shadow-xs'
                      : 'bg-[#FFFDD0] text-[#008080] border-[#CFB53B]/40 hover:bg-[#FFFFF0]'
                  }`}
                >
                  <Users className="w-4 h-4 shrink-0" />
                  <span>Family</span>
                </Link>

                <Link
                  to="/parent"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`p-2 rounded-art border flex items-center gap-2 transition-colors ${
                    activeSection === 'elder'
                      ? 'bg-[#808000] text-[#FFFFF0] border-[#CFB53B] shadow-xs'
                      : 'bg-[#FFFDD0] text-[#808000] border-[#CFB53B]/40 hover:bg-[#FFFFF0]'
                  }`}
                >
                  <Heart className="w-4 h-4 shrink-0" />
                  <span>Elder</span>
                </Link>

                <Link
                  to="/caregiver"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`p-2 rounded-art border flex items-center gap-2 transition-colors ${
                    activeSection === 'caregiver'
                      ? 'bg-[#005F9E] text-[#FFFFF0] border-[#CFB53B] shadow-xs'
                      : 'bg-[#FFFDD0] text-[#005F9E] border-[#CFB53B]/40 hover:bg-[#FFFFF0]'
                  }`}
                >
                  <Compass className="w-4 h-4 shrink-0" />
                  <span>Caregiver</span>
                </Link>

                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`p-2 rounded-art border flex items-center gap-2 transition-colors ${
                    activeSection === 'admin'
                      ? 'bg-[#800020] text-[#FFFFF0] border-[#CFB53B] shadow-xs'
                      : 'bg-[#FFFDD0] text-[#800020] border-[#CFB53B]/40 hover:bg-[#FFFFF0]'
                  }`}
                >
                  <Shield className="w-4 h-4 shrink-0" />
                  <span>Admin</span>
                </Link>
              </div>
            </div>

            {/* All Primary Navigation Links */}
            <div className="space-y-1 pt-1">
              <p className="text-[10px] font-bold text-[#17211C]/60 uppercase tracking-wider px-1 font-sans">
                {portalInfo.label} Navigation
              </p>
              <div className="space-y-1">
                {currentLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.end}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3.5 py-2.5 rounded-art text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-[#008080] text-[#FFFFF0] border border-[#CFB53B] shadow-xs'
                          : 'text-[#17211C] hover:bg-[#FFFDD0] hover:text-[#008080]'
                      }`
                    }
                  >
                    {link.icon && <span className="shrink-0">{link.icon}</span>}
                    <span>{link.label}</span>
                  </NavLink>
                ))}
              </div>
            </div>

            {/* Senior Accessibility Section */}
            <div className="pt-2 border-t border-[#CFB53B]/30 space-y-2.5 font-sans">
              <p className="text-[10px] font-bold text-[#008080] uppercase tracking-wider px-1">
                Senior Readability & Accessibility
              </p>
              <div className="flex items-center justify-between gap-2 p-2.5 rounded-art bg-[#FFFDD0] border border-[#CFB53B]/40 text-xs">
                <span className="font-bold text-[#17211C]">Text Scale</span>
                <div className="flex items-center gap-1 bg-[#FFFFF0] p-1 rounded-art border border-[#CFB53B]/30">
                  <button
                    onClick={() => setTextSize('normal')}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold transition-colors ${textSize === 'normal' ? 'bg-[#008080] text-[#FFFFF0]' : 'text-[#17211C]/70'}`}
                  >
                    A
                  </button>
                  <button
                    onClick={() => setTextSize('large')}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold transition-colors ${textSize === 'large' ? 'bg-[#008080] text-[#FFFFF0]' : 'text-[#17211C]/70'}`}
                  >
                    A+
                  </button>
                  <button
                    onClick={() => setTextSize('xlarge')}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold transition-colors ${textSize === 'xlarge' ? 'bg-[#008080] text-[#FFFFF0]' : 'text-[#17211C]/70'}`}
                  >
                    A++
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-art bg-[#FFFDD0] border border-[#CFB53B]/40 text-xs">
                <span className="font-bold text-[#17211C]">High Contrast Mode</span>
                <button
                  onClick={toggleHighContrast}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${highContrast ? 'bg-[#008080]' : 'bg-slate-300'}`}
                >
                  <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${highContrast ? 'translate-x-4' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>

            {/* 24/7 Helpline & Support */}
            <div className="pt-2 border-t border-[#CFB53B]/30 space-y-2 font-sans">
              <p className="text-[10px] font-bold text-[#800020] uppercase tracking-wider px-1">
                24/7 Emergency Sanctuary
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <a
                  href="tel:112"
                  className="p-2 rounded-art bg-[#800020] text-[#FFFFF0] border border-[#CFB53B] font-bold flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-[#CFB53B]" />
                  <span>Dial 112 (Police)</span>
                </a>
                <a
                  href="tel:18002081122"
                  className="p-2 rounded-art bg-[#FFFDD0] text-[#17211C] border border-[#CFB53B] font-bold flex items-center justify-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-[#008080]" />
                  <span>1800-208-1122</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Footer Actions */}
          <div className="shrink-0 p-4 bg-[#FFFDD0] border-t-2 border-[#CFB53B]/40 space-y-2 font-sans">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2 px-3 rounded-art bg-[#FFFFF0] border border-[#CFB53B]/50 hover:bg-[#FFFDD0] text-[#17211C] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors font-serif"
            >
              <Home className="w-3.5 h-3.5 text-[#008080]" />
              <span>Visit Public Website</span>
            </Link>

            {user && (
              <button
                onClick={handleLogout}
                className="w-full py-2 px-3 rounded-art bg-[#800020]/10 border border-[#800020]/30 hover:bg-[#800020]/20 text-[#800020] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors font-serif"
              >
                <LogOut className="w-3.5 h-3.5 text-[#800020]" />
                <span>Sign Out of Account</span>
              </button>
            )}
          </div>
        </div>
      </div>,
      document.body
    )}
  </>
);
};
