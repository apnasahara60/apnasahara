import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
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
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useNotification } from '../../context/NotificationContext';

export const Navbar: React.FC = () => {
  const { user, role, logout } = useAuth();
  const { textSize, setTextSize, highContrast, toggleHighContrast } = useAccessibility();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotification();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAccessMenu, setShowAccessMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const getPortalLink = () => {
    switch (role) {
      case 'elder':
        return '/parent';
      case 'caregiver':
        return '/caregiver';
      case 'admin':
        return '/admin';
      default:
        return '/family';
    }
  };

  const getRoleBadge = () => {
    switch (role) {
      case 'elder':
        return { label: 'Elderly Parent Portal', bg: 'bg-amber-100 text-amber-800 border-amber-300' };
      case 'caregiver':
        return { label: 'Caregiver Portal', bg: 'bg-blue-100 text-blue-800 border-blue-300' };
      case 'admin':
        return { label: 'Admin Portal', bg: 'bg-purple-100 text-purple-800 border-purple-300' };
      default:
        return { label: 'Family Portal', bg: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
    }
  };

  const badge = getRoleBadge();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand */}
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

          {/* Desktop Public Navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-600">
            <Link
              to="/"
              className={`hover:text-brand-600 transition-colors ${location.pathname === '/' ? 'text-brand-600' : ''}`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`hover:text-brand-600 transition-colors ${location.pathname === '/about' ? 'text-brand-600' : ''}`}
            >
              About Us
            </Link>
            <Link
              to="/services"
              className={`hover:text-brand-600 transition-colors ${location.pathname === '/services' ? 'text-brand-600' : ''}`}
            >
              Services
            </Link>
            <Link
              to="/how-it-works"
              className={`hover:text-brand-600 transition-colors ${location.pathname === '/how-it-works' ? 'text-brand-600' : ''}`}
            >
              How It Works
            </Link>
            <Link
              to="/pricing"
              className={`hover:text-brand-600 transition-colors ${location.pathname === '/pricing' ? 'text-brand-600' : ''}`}
            >
              Pricing
            </Link>
            <Link
              to="/contact"
              className={`hover:text-brand-600 transition-colors ${location.pathname === '/contact' ? 'text-brand-600' : ''}`}
            >
              Contact
            </Link>
          </nav>

          {/* Action Area: Accessibility, Notifications, Role Portal Shortcut */}
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

            {/* User Logged in Portal shortcut or Login button */}
            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  to={getPortalLink()}
                  className={`hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-colors ${badge.bg}`}
                >
                  <Shield className="w-3.5 h-3.5" />
                  {badge.label}
                </Link>

                <div className="flex items-center gap-1.5 pl-2 border-l border-slate-200">
                  <img
                    src={user.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover border border-slate-200"
                  />
                  <button
                    onClick={handleLogout}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-brand-600"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-xs sm:text-sm font-bold text-white bg-brand-600 hover:bg-brand-500 rounded-xl shadow-md shadow-brand-500/20 transition-all hover:shadow-lg"
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

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top-2">
          {user && (
            <div className="p-3 mb-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500">Logged in as:</p>
                <p className="font-bold text-slate-800 text-sm">{user.name}</p>
                <span className={`inline-block mt-1 text-[11px] font-semibold px-2 py-0.5 rounded border ${badge.bg}`}>
                  {badge.label}
                </span>
              </div>
              <Link
                to={getPortalLink()}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-1.5 rounded-lg bg-brand-600 text-white font-bold text-xs"
              >
                Go to Portal
              </Link>
            </div>
          )}

          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg font-medium text-slate-700 hover:bg-slate-50"
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg font-medium text-slate-700 hover:bg-slate-50"
          >
            About Us
          </Link>
          <Link
            to="/services"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg font-medium text-slate-700 hover:bg-slate-50"
          >
            Services
          </Link>
          <Link
            to="/how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg font-medium text-slate-700 hover:bg-slate-50"
          >
            How It Works
          </Link>
          <Link
            to="/pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg font-medium text-slate-700 hover:bg-slate-50"
          >
            Pricing
          </Link>
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg font-medium text-slate-700 hover:bg-slate-50"
          >
            Contact
          </Link>

          {/* Quick Portals Links on Mobile */}
          <div className="pt-3 border-t border-slate-200">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">Switch Dedicated Portals</p>
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
          </div>
        </div>
      )}
    </header>
  );
};
