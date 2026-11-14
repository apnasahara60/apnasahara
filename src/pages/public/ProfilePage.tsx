import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  Heart,
  Save,
  Camera,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  Sparkles,
  Lock,
  Bell,
  Activity,
  Pill,
  Clock,
  ShieldCheck,
  Users,
  Stethoscope
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { dbStore } from '../../lib/mongoStore';
import { UserRole } from '../../types';
import { OrnateCorner, WhiplashDivider } from '../../components/art-nouveau/ArtNouveauDecorations';

const PRESET_AVATARS = [
  { label: 'Family Member 1', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80' },
  { label: 'Family Member 2', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80' },
  { label: 'Senior (Dada ji)', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80' },
  { label: 'Senior (Dadi ji)', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80' },
  { label: 'Caregiver (Priya)', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80' },
  { label: 'Doctor / Admin', url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=256&q=80' },
];

const CITIES = [
  'Noida, UP',
  'Delhi NCR',
  'Bengaluru, Karnataka',
  'Mumbai, Maharashtra',
  'Pune, Maharashtra',
  'Indore, MP',
  'Chennai, Tamil Nadu',
  'Hyderabad, Telangana',
  'Kolkata, West Bengal',
  'Jaipur, Rajasthan'
];

export const ProfilePage: React.FC = () => {
  const { user, role, updateProfile, resetPassword } = useAuth();
  const { showToast } = useNotification();
  const navigate = useNavigate();

  // Form State
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [city, setCity] = useState(user?.city || 'Noida, UP');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar_url || PRESET_AVATARS[0].url);
  const [customAvatarInput, setCustomAvatarInput] = useState('');
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  // Extended details
  const [address, setAddress] = useState('Flat 402, Lotus Boulevard, Sector 100');
  const [relationship, setRelationship] = useState('Son');
  const [emergencyPhone, setEmergencyPhone] = useState('+91 98765 43210');
  const [preferredLanguage, setPreferredLanguage] = useState('Hindi & English');

  // Preferences toggles
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [smsVitals, setSmsVitals] = useState(true);
  const [emergencySirens, setEmergencySirens] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);

  // Caregiver-specific state
  const [experienceYears, setExperienceYears] = useState(5);
  const [isAvailable, setIsAvailable] = useState(true);

  // UI status
  const [isSaving, setIsSaving] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      setCity(user.city || 'Noida, UP');
      setAvatarUrl(user.avatar_url || PRESET_AVATARS[0].url);
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 font-serif">
        <div className="art-card max-w-md w-full p-8 text-center space-y-4">
          <div className="w-14 h-14 rounded-art bg-[#008080]/10 border border-[#CFB53B] text-[#008080] flex items-center justify-center mx-auto">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-[#17211C]">Sign In Required</h2>
          <p className="text-xs text-[#17211C]/70 font-sans">
            Please log in to view and manage your ApnaSahara profile.
          </p>
          <Link
            to="/login"
            className="art-btn-primary w-full py-3 inline-flex items-center justify-center text-sm shadow-md"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const getPortalHome = () => {
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

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      updateProfile({
        name: name.trim(),
        phone: phone.trim(),
        city: city.trim(),
        avatar_url: customAvatarInput.trim() || avatarUrl
      });

      if (role === 'caregiver') {
        const caregivers = dbStore.getCaregivers();
        if (caregivers.length > 0) {
          const updatedCg = {
            ...caregivers[0],
            name: name.trim(),
            phone: phone.trim(),
            avatar_url: customAvatarInput.trim() || avatarUrl,
            experience_years: experienceYears,
            is_available: isAvailable
          };
          dbStore.saveCaregiver(updatedCg);
        }
      } else if (role === 'elder') {
        const elders = dbStore.getElders();
        if (elders.length > 0) {
          const updatedElder = {
            ...elders[0],
            name: name.trim(),
            phone: phone.trim(),
            city: city.trim(),
            address: address.trim(),
            emergency_phone: emergencyPhone.trim(),
            preferred_language: preferredLanguage
          };
          dbStore.saveElder(updatedElder);
        }
      }

      setTimeout(() => {
        setIsSaving(false);
        showToast('Profile Updated', 'Your profile details and preferences have been saved successfully.', 'system');
      }, 400);
    } catch (err: any) {
      setIsSaving(false);
      showToast('Update Failed', err?.message || 'Could not update profile', 'sos');
    }
  };

  const handlePasswordReset = async () => {
    if (!email) return;
    setIsResettingPassword(true);
    const res = await resetPassword(email);
    setIsResettingPassword(false);
    showToast('Security Alert', res.message, 'info');
  };

  const getRoleBadge = (r: UserRole) => {
    switch (r) {
      case 'elder':
        return { label: 'Senior Citizen', bg: 'bg-[#808000]/15 text-[#808000] border-[#808000]/40', Icon: Heart };
      case 'caregiver':
        return { label: 'Verified GDA Sahayak', bg: 'bg-[#005F9E]/15 text-[#005F9E] border-[#005F9E]/40', Icon: Stethoscope };
      case 'admin':
        return { label: 'Operations Director', bg: 'bg-[#800020]/15 text-[#800020] border-[#800020]/40', Icon: ShieldCheck };
      default:
        return { label: 'Family Member', bg: 'bg-[#008080]/15 text-[#008080] border-[#008080]/40', Icon: Users };
    }
  };

  const roleBadge = getRoleBadge(role || 'family');

  return (
    <div className="min-h-screen bg-[#FFFFF0] py-8 px-4 sm:px-6 lg:px-8 font-serif">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            to={getPortalHome()}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#008080] hover:underline"
          >
            <ArrowLeft className="w-4 h-4 text-[#CFB53B]" />
            Back to Dashboard
          </Link>
          <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-art border ${roleBadge.bg} font-sans`}>
            <roleBadge.Icon className="w-3.5 h-3.5" />
            <span>{roleBadge.label}</span>
          </span>
        </div>

        {/* Profile Card Header */}
        <div className="relative art-card p-6 sm:p-8 space-y-4">
          <OrnateCorner position="top-left" color="#CFB53B" size={32} />
          <OrnateCorner position="top-right" color="#CFB53B" size={32} />

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Avatar & Photo Picker */}
            <div className="relative group shrink-0">
              <img
                src={customAvatarInput.trim() || avatarUrl}
                alt={name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-art object-cover border-2 border-[#CFB53B] shadow-md ring-2 ring-[#008080]/20"
              />
              <button
                type="button"
                onClick={() => setShowAvatarPicker(!showAvatarPicker)}
                className="absolute -bottom-2 -right-2 p-2 rounded-art bg-[#008080] text-[#FFFFF0] border border-[#CFB53B] shadow-md hover:bg-[#006666] transition-transform active:scale-95"
                title="Change Photo"
              >
                <Camera className="w-4 h-4 text-[#CFB53B]" />
              </button>
            </div>

            {/* Quick Summary Info */}
            <div className="flex-1 text-center sm:text-left space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-[#17211C] tracking-tight">
                    {name || 'Your Profile'}
                  </h1>
                  <p className="text-xs sm:text-sm font-semibold text-[#17211C]/60 flex items-center justify-center sm:justify-start gap-1.5 mt-0.5 font-mono">
                    <Mail className="w-3.5 h-3.5 text-[#008080]" />
                    {email}
                  </p>
                </div>
                <div className="flex items-center justify-center sm:justify-end gap-2 font-sans">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#808000] bg-[#808000]/10 px-2.5 py-1 rounded-art border border-[#808000]/30">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#808000]" />
                    Account Verified
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-[#17211C]/75 pt-1 font-sans">
                <span className="flex items-center gap-1 bg-[#FFFDD0] px-2.5 py-1 rounded-art border border-[#CFB53B]/40">
                  <MapPin className="w-3.5 h-3.5 text-[#008080]" />
                  {city}
                </span>
                <span className="flex items-center gap-1 bg-[#FFFDD0] px-2.5 py-1 rounded-art border border-[#CFB53B]/40 font-mono">
                  <Phone className="w-3.5 h-3.5 text-[#008080]" />
                  {phone || 'No phone set'}
                </span>
              </div>
            </div>
          </div>

          {/* Avatar Preset Selector Tray */}
          {showAvatarPicker && (
            <div className="mt-6 pt-6 border-t border-[#CFB53B]/30 animate-in fade-in slide-in-from-top-2 font-sans">
              <label className="text-xs font-bold text-[#17211C] uppercase tracking-wider block mb-3">
                Select a Profile Picture
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-4">
                {PRESET_AVATARS.map((av) => (
                  <button
                    key={av.label}
                    type="button"
                    onClick={() => {
                      setAvatarUrl(av.url);
                      setCustomAvatarInput('');
                      setShowAvatarPicker(false);
                    }}
                    className={`p-1.5 rounded-art border-2 transition-all flex flex-col items-center gap-1 ${
                      avatarUrl === av.url && !customAvatarInput
                        ? 'border-[#008080] bg-[#FFFDD0] shadow-sm scale-105'
                        : 'border-[#CFB53B]/40 hover:border-[#CFB53B] bg-[#FFFFF0]'
                    }`}
                  >
                    <img src={av.url} alt={av.label} className="w-12 h-12 rounded-art object-cover" />
                    <span className="text-[10px] font-semibold text-[#17211C]/80 truncate w-full text-center">
                      {av.label}
                    </span>
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="url"
                  placeholder="Or paste an image URL here..."
                  value={customAvatarInput}
                  onChange={(e) => setCustomAvatarInput(e.target.value)}
                  className="art-input flex-1 text-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowAvatarPicker(false)}
                  className="art-btn-secondary px-3.5 py-2 text-xs font-bold"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile Edit Form */}
        <form onSubmit={handleSave} className="space-y-6">
          {/* Section 1: Basic Information */}
          <div className="art-card p-6 sm:p-8 space-y-5 font-sans">
            <div className="flex items-center gap-2.5 pb-3 border-b border-[#CFB53B]/30">
              <User className="w-5 h-5 text-[#008080]" />
              <div>
                <h3 className="font-bold text-[#17211C] text-base font-serif">Personal Information</h3>
                <p className="text-xs text-[#17211C]/65">Your identity details visible to your care team and elders.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#17211C] mb-1.5">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="art-input w-full text-sm font-serif font-bold"
                  placeholder="e.g. Vikram Sharma"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#17211C] mb-1.5">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    disabled
                    value={email}
                    className="art-input w-full text-sm font-mono opacity-70 cursor-not-allowed bg-[#FFFDD0]"
                  />
                  <span className="absolute right-3 top-2.5 text-[10px] font-bold text-[#008080] bg-[#008080]/10 px-2 py-0.5 rounded-art border border-[#008080]/30 font-mono">
                    Primary
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#17211C] mb-1.5">Phone Number (Emergency Alerts)</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="art-input w-full text-sm font-mono"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#17211C] mb-1.5">City / Region Hub</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="art-input w-full text-sm bg-[#FFFFF0]"
                >
                  {CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-[#17211C] mb-1.5">Full Residential Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="art-input w-full text-sm font-serif"
                  placeholder="Apartment, Street, Landmark"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Role-Specific Details */}
          {role === 'family' && (
            <div className="art-card p-6 sm:p-8 space-y-5 font-sans">
              <div className="flex items-center gap-2.5 pb-3 border-b border-[#CFB53B]/30">
                <Heart className="w-5 h-5 text-[#008080]" />
                <div>
                  <h3 className="font-bold text-[#17211C] text-base font-serif">Family Caregiver Setup</h3>
                  <p className="text-xs text-[#17211C]/65">Configure your relationship and speed-dial emergency routing.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#17211C] mb-1.5">Relationship to Monitored Parents</label>
                  <select
                    value={relationship}
                    onChange={(e) => setRelationship(e.target.value)}
                    className="art-input w-full text-sm bg-[#FFFFF0]"
                  >
                    <option value="Son">Son</option>
                    <option value="Daughter">Daughter</option>
                    <option value="Grandchild">Grandchild</option>
                    <option value="Guardian">Guardian</option>
                    <option value="Relative">Relative</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#17211C] mb-1.5">Secondary Emergency Phone</label>
                  <input
                    type="tel"
                    value={emergencyPhone}
                    onChange={(e) => setEmergencyPhone(e.target.value)}
                    className="art-input w-full text-sm font-mono"
                    placeholder="+91 98111 22334"
                  />
                </div>
              </div>
            </div>
          )}

          {role === 'caregiver' && (
            <div className="art-card p-6 sm:p-8 space-y-5 font-sans">
              <div className="flex items-center gap-2.5 pb-3 border-b border-[#CFB53B]/30">
                <Activity className="w-5 h-5 text-[#005F9E]" />
                <div>
                  <h3 className="font-bold text-[#17211C] text-base font-serif">Caregiver Professional Details</h3>
                  <p className="text-xs text-[#17211C]/65">Manage your duty status and clinical experience records.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#17211C] mb-1.5">Total Years of Caregiving Experience</label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(Number(e.target.value))}
                    className="art-input w-full text-sm font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#17211C] mb-1.5">Current Duty Status</label>
                  <button
                    type="button"
                    onClick={() => setIsAvailable(!isAvailable)}
                    className={`w-full py-2.5 px-4 rounded-art font-bold text-sm flex items-center justify-center gap-2 border transition-all ${
                      isAvailable
                        ? 'bg-[#808000]/15 text-[#808000] border-[#808000]/40'
                        : 'bg-[#FFFDD0] text-[#17211C]/60 border-[#CFB53B]/40'
                    }`}
                  >
                    <span className={`w-2.5 h-2.5 rounded-full ${isAvailable ? 'bg-[#808000] animate-pulse' : 'bg-slate-400'}`} />
                    {isAvailable ? 'Active & On Duty (Accepting Visits)' : 'Off Duty / On Leave'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {role === 'elder' && (
            <div className="art-card p-6 sm:p-8 space-y-5 font-sans">
              <div className="flex items-center gap-2.5 pb-3 border-b border-[#CFB53B]/30">
                <Pill className="w-5 h-5 text-[#008080]" />
                <div>
                  <h3 className="font-bold text-[#17211C] text-base font-serif">Senior Health & Emergency Settings</h3>
                  <p className="text-xs text-[#17211C]/65">Configured for your quick 1-touch SOS emergency calling.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#17211C] mb-1.5">Speed-Dial Family Emergency Number</label>
                  <input
                    type="tel"
                    value={emergencyPhone}
                    onChange={(e) => setEmergencyPhone(e.target.value)}
                    className="art-input w-full text-sm font-mono"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#17211C] mb-1.5">Preferred Spoken Language</label>
                  <input
                    type="text"
                    value={preferredLanguage}
                    onChange={(e) => setPreferredLanguage(e.target.value)}
                    className="art-input w-full text-sm font-serif"
                    placeholder="e.g. Hindi, English, Gujarati"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Section 3: Notification & Alert Preferences */}
          <div className="art-card p-6 sm:p-8 space-y-5 font-sans">
            <div className="flex items-center gap-2.5 pb-3 border-b border-[#CFB53B]/30">
              <Bell className="w-5 h-5 text-[#008080]" />
              <div>
                <h3 className="font-bold text-[#17211C] text-base font-serif">Alert & Telemetry Notifications</h3>
                <p className="text-xs text-[#17211C]/65">Choose how ApnaSahara delivers real-time updates.</p>
              </div>
            </div>

            <div className="divide-y divide-[#CFB53B]/20">
              <div className="py-3 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[#17211C]">WhatsApp Emergency Dispatch Alerts</p>
                  <p className="text-[11px] text-[#17211C]/65">Instant SOS triggers with GPS pin sent to family group.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setWhatsappAlerts(!whatsappAlerts)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors border ${
                    whatsappAlerts ? 'bg-[#008080] border-[#008080]' : 'bg-[#FFFDD0] border-[#CFB53B]/50'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-[#FFFFF0] transition-transform ${
                      whatsappAlerts ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="py-3 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[#17211C]">SMS Vital Warning Notifications</p>
                  <p className="text-[11px] text-[#17211C]/65">Get notified if blood pressure or SpO2 exceeds thresholds.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSmsVitals(!smsVitals)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors border ${
                    smsVitals ? 'bg-[#008080] border-[#008080]' : 'bg-[#FFFDD0] border-[#CFB53B]/50'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-[#FFFFF0] transition-transform ${
                      smsVitals ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="py-3 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[#17211C]">Emergency Audio Siren</p>
                  <p className="text-[11px] text-[#17211C]/65">Play an audible siren on this browser when SOS is triggered.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setEmergencySirens(!emergencySirens)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors border ${
                    emergencySirens ? 'bg-[#008080] border-[#008080]' : 'bg-[#FFFDD0] border-[#CFB53B]/50'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-[#FFFFF0] transition-transform ${
                      emergencySirens ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="py-3 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[#17211C]">Weekly Wellness & Visit Digest Email</p>
                  <p className="text-[11px] text-[#17211C]/65">Receive comprehensive weekly summary PDF every Sunday.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setWeeklyDigest(!weeklyDigest)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors border ${
                    weeklyDigest ? 'bg-[#008080] border-[#008080]' : 'bg-[#FFFDD0] border-[#CFB53B]/50'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-[#FFFFF0] transition-transform ${
                      weeklyDigest ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Section 4: Security & Password */}
          <div className="art-card p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-sans">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-art bg-[#FFFDD0] border border-[#CFB53B]/60 text-[#008080] flex items-center justify-center font-bold">
                <Lock className="w-5 h-5 text-[#008080]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#17211C] font-serif">Account Password & Security</h4>
                <p className="text-xs text-[#17211C]/65">Receive a secure link on <span className="font-mono">{email}</span> to update password.</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handlePasswordReset}
              disabled={isResettingPassword}
              className="art-btn-secondary px-4 py-2 text-xs font-bold shrink-0"
            >
              {isResettingPassword ? 'Sending link...' : 'Reset Password'}
            </button>
          </div>

          {/* Save Action Bar */}
          <div className="flex items-center justify-end gap-3 pt-2 font-sans">
            <Link
              to={getPortalHome()}
              className="art-btn-secondary px-5 py-2.5 text-xs sm:text-sm font-bold"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={isSaving}
              className="art-btn-primary px-6 py-2.5 text-xs sm:text-sm font-serif font-bold shadow-md flex items-center gap-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4 text-[#CFB53B]" />
              {isSaving ? 'Saving Changes...' : 'Save Profile Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
