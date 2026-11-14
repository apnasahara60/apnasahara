import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Bell,
  Check,
  ChevronRight,
  Phone,
  Calendar,
  ShoppingBag,
  Heart,
  MessageSquare,
  Users,
  Search,
  Sparkles,
  MapPin,
  Clock,
  ShieldCheck,
  Plus,
  X,
  PhoneCall,
  Pill,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { dbStore } from '../../lib/supabase';

interface TranquilFamilyHomeProps {
  onNavigateTab?: (tab: string) => void;
}

export const TranquilFamilyHome: React.FC<TranquilFamilyHomeProps> = () => {
  const { user } = useAuth();
  const { showToast } = useNotification();
  const navigate = useNavigate();

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<'home' | 'visits' | 'support' | 'circle' | 'messages'>('home');

  // Modals state
  const [showVisitModal, setShowVisitModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showManageFamilyModal, setShowManageFamilyModal] = useState(false);
  const [showCoordinatorDetails, setShowCoordinatorDetails] = useState(false);

  // Form states
  const [visitType, setVisitType] = useState('Friendly Companionship');
  const [visitDate, setVisitDate] = useState('Tomorrow, 10:00 AM');
  const [taskDetail, setTaskDetail] = useState('');

  const [elders, setElders] = useState(dbStore.getElders());

  useEffect(() => {
    const handleUpdate = () => {
      setElders(dbStore.getElders());
    };
    window.addEventListener('apnasahara_datachange', handleUpdate);
    return () => window.removeEventListener('apnasahara_datachange', handleUpdate);
  }, []);

  const userElder = elders.find(e => e.family_user_id === user?.id);
  const elder = userElder || elders[0] || {
    name: 'Rajesh Sharma',
    relationship: 'Dad',
    city: 'Indore, Madhya Pradesh',
    phone: '+91 98111 22334',
    gender: 'Male' as const
  };

  const relationshipTitle = elder.relationship || (elder.gender === 'Female' ? 'Mom' : 'Dad');
  const userCity = user?.city || 'Bengaluru';
  const parentCityShort = elder.city?.split(',')[0]?.trim() || 'Indore';
  const dynamicCityPair = `${userCity} ↔ ${parentCityShort}`;
  const [cityPair, setCityPair] = useState(dynamicCityPair);

  useEffect(() => {
    setCityPair(dynamicCityPair);
  }, [dynamicCityPair]);

  const handleRequestVisitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowVisitModal(false);
    showToast('Visit Request Submitted', `Coordinator Meera Joshi will arrange a visit for ${elder.name}`, 'visit');
  };

  const handleRequestTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowTaskModal(false);
    showToast('Task Assistance Logged', `Local ${parentCityShort} care team has received: "${taskDetail || 'Errands & essentials'}"`, 'info');
    setTaskDetail('');
  };

  const handleSimulateCall = () => {
    setShowCallModal(false);
    showToast('Call Connected', `Calling ${relationshipTitle} (${elder.name})... Check-in logged.`, 'health');
    window.open(`tel:${elder.phone || '+919811122334'}`, '_self');
  };

  return (
    <div className="min-h-screen bg-[#F5F6F2] text-[#1A2E22] font-sans flex flex-col antialiased selection:bg-[#23533D] selection:text-white">
      {/* Outer App Frame */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-[1600px] w-full mx-auto">
        
        {/* ================= LEFT SIDEBAR (YOUR SPACE) ================= */}
        <aside className="w-full lg:w-64 bg-[#F5F6F2] lg:bg-transparent p-5 lg:p-6 lg:pr-2 flex flex-col justify-between shrink-0 border-b lg:border-b-0 lg:border-r border-[#E2E6DE]">
          <div className="space-y-8">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="ApnaSahara"
                className="h-12 w-auto object-contain"
              />
            </div>

            {/* Navigation Menu */}
            <div className="space-y-2">
              <p className="text-[11px] font-extrabold uppercase tracking-widest text-[#7C9183] px-3">
                YOUR SPACE
              </p>
              <nav className="space-y-1 text-sm font-semibold">
                <button
                  onClick={() => setActiveTab('home')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl transition-all text-left ${
                    activeTab === 'home'
                      ? 'bg-[#E3EBE4] text-[#1E4733] font-bold shadow-xs'
                      : 'text-[#485D50] hover:bg-[#EBF1EB]'
                  }`}
                >
                  <svg className="w-4 h-4 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6h-4v6H4a1 1 0 0 1-1-1V9.5z" />
                  </svg>
                  <span>Home</span>
                </button>

                <button
                  onClick={() => { setActiveTab('visits'); navigate('/family/visits'); }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl transition-all text-left ${
                    activeTab === 'visits'
                      ? 'bg-[#E3EBE4] text-[#1E4733] font-bold'
                      : 'text-[#485D50] hover:bg-[#EBF1EB]'
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  <span>Visits & check-ins</span>
                </button>

                <button
                  onClick={() => { setActiveTab('support'); setShowSupportModal(true); }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl transition-all text-left ${
                    activeTab === 'support'
                      ? 'bg-[#E3EBE4] text-[#1E4733] font-bold'
                      : 'text-[#485D50] hover:bg-[#EBF1EB]'
                  }`}
                >
                  <span className="text-base leading-none">✳️</span>
                  <span>Find support</span>
                </button>

                <button
                  onClick={() => { setActiveTab('circle'); navigate('/family'); }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl transition-all text-left ${
                    activeTab === 'circle'
                      ? 'bg-[#E3EBE4] text-[#1E4733] font-bold'
                      : 'text-[#485D50] hover:bg-[#EBF1EB]'
                  }`}
                >
                  <Heart className="w-4 h-4" />
                  <span>Family circle</span>
                </button>

                <button
                  onClick={() => { setActiveTab('messages'); navigate('/contact'); }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl transition-all text-left ${
                    activeTab === 'messages'
                      ? 'bg-[#E3EBE4] text-[#1E4733] font-bold'
                      : 'text-[#485D50] hover:bg-[#EBF1EB]'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Messages</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Bottom Sidebar Callout */}
          <div className="pt-6">
            <button
              onClick={() => navigate('/contact')}
              className="w-full py-2.5 px-3.5 rounded-2xl bg-[#E8EFE9] text-[#2C523D] hover:bg-[#DEE7E0] text-xs font-bold transition-colors flex items-center justify-between"
            >
              <span>Here when you need us</span>
              <span className="text-sm">🌱</span>
            </button>
          </div>
        </aside>

        {/* ================= MAIN CONTENT AREA ================= */}
        <main className="flex-1 p-5 sm:p-8 lg:p-10 space-y-7">
          
          {/* Top Breadcrumb & Connection Ribbon */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
            <div className="text-xs font-semibold text-[#667C6E] flex items-center gap-2">
              <span>Family space</span>
              <span className="text-[#A2B3A7]">/</span>
              <span className="text-[#1A2E22] font-bold">Home</span>
            </div>

            <div className="flex items-center gap-3">
              {/* City Link Indicator */}
              <button
                onClick={() => {
                  const newPair = cityPair.includes('Indore') ? 'San Jose ↔ New Delhi' : 'Bengaluru ↔ Indore';
                  setCityPair(newPair);
                  showToast('City Connection Synced', `Family bridge: ${newPair}`, 'info');
                }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-[#2C4A38] text-xs font-bold shadow-xs border border-[#E2E6DF] hover:bg-[#FAFBF9] transition-colors"
                title="Click to toggle family location bridge"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#3D855E] animate-pulse" />
                <span>{cityPair}</span>
              </button>

              {/* Notification Bell */}
              <button
                onClick={() => navigate('/family/sos')}
                className="w-9 h-9 rounded-full bg-white border border-[#E2E6DF] flex items-center justify-center text-[#4A6354] hover:text-[#1A2E22] hover:bg-[#FAFBF9] shadow-xs relative"
                aria-label="Alerts"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#E5484D] ring-2 ring-white" />
              </button>

              {/* Watermark Logo */}
              <img
                src="/logo.png"
                alt="ApnaSahara"
                className="hidden sm:inline h-7 w-auto object-contain opacity-95"
              />
            </div>
          </div>

          {/* Greeting Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
            <div className="space-y-1">
              <p className="text-[11px] font-extrabold uppercase tracking-widest text-[#6B8273]">
                THURSDAY, 30 OCTOBER
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#172E21] tracking-tight">
                Good morning, {user?.name?.split(' ')[0] || 'Ananya'} ☀️
              </h2>
              <p className="text-sm text-[#5B7163]">
                Here's how your family is doing today.
              </p>
            </div>

            <div className="text-xs text-[#7A8E81] italic">
              Your family, a little closer.
            </div>
          </div>

          {/* Main 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* LEFT 8 COLUMNS: Family Card, Action Buttons, Recent Updates */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* ============ 1. "YOUR FAMILY" CARD ============ */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E5E9E2] shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-base text-[#1A2E22]">Your family</h3>
                  <button
                    onClick={() => setShowManageFamilyModal(true)}
                    className="text-xs font-bold text-[#3B664E] hover:underline flex items-center gap-1"
                  >
                    Manage family →
                  </button>
                </div>

                {/* Elder Profile Row */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {/* Illustrated Senior Avatar */}
                    <div className="w-14 h-14 rounded-full bg-[#F4EDE2] border-2 border-white shadow-xs flex items-center justify-center text-2xl shrink-0 overflow-hidden">
                      {elder.gender === 'Female' ? '👵🏼' : '👴🏼'}
                    </div>
                    <div>
                      <h4 className="text-lg font-extrabold text-[#1A2E22]">
                        {elder.name}
                      </h4>
                      <p className="text-xs text-[#63796C] font-medium">
                        {relationshipTitle} · {elder.city}
                      </p>
                    </div>
                  </div>

                  {/* Status Pill */}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#EDF5EE] text-[#2B6141] border border-[#D5E6D8]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2B6141]" />
                    Doing well
                  </span>
                </div>

                {/* 3-Column Metric Banner */}
                <div className="grid grid-cols-3 divide-x divide-[#E8ECE5] bg-[#F7F9F6] rounded-2xl py-4 px-2 border border-[#E8ECE5] text-center">
                  <div className="space-y-0.5">
                    <p className="text-base sm:text-lg font-extrabold text-[#1A2E22]">Today</p>
                    <p className="text-[11px] text-[#697E71] font-medium">Last check-in</p>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-base sm:text-lg font-extrabold text-[#1A2E22]">10:42 am</p>
                    <p className="text-[11px] text-[#697E71] font-medium">Checked in</p>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-base sm:text-lg font-extrabold text-[#1A2E22]">All good</p>
                    <p className="text-[11px] text-[#697E71] font-medium">{relationshipTitle}'s update</p>
                  </div>
                </div>

                {/* Bottom Callout in Family Card */}
                <div className="flex items-center justify-between pt-1 text-xs text-[#486353]">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#DDECE0] text-[#26573B] flex items-center justify-center text-[10px] font-black">
                      ✓
                    </span>
                    <span className="font-semibold">Weekly wellbeing call completed</span>
                  </div>
                  <span className="text-[#7A8E81] text-[11px]">Today</span>
                </div>
              </div>

              {/* ============ 2. THREE QUICK ACTION CARDS ============ */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Action 1: Request a visit */}
                <button
                  onClick={() => setShowVisitModal(true)}
                  className="bg-white rounded-3xl p-5 border border-[#E5E9E2] shadow-xs hover:shadow-md hover:border-[#CCD8CE] transition-all text-left space-y-3 group"
                >
                  <div className="w-11 h-11 rounded-full bg-[#FCEBE8] text-[#C94B3C] flex items-center justify-center text-lg group-hover:scale-105 transition-transform">
                    {/* Person/Friendly companionship icon */}
                    <Users className="w-5 h-5 text-[#BA4436]" />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-sm text-[#1A2E22]">Request a visit</h5>
                    <p className="text-xs text-[#6B8173] font-medium mt-0.5">Friendly company</p>
                  </div>
                </button>

                {/* Action 2: Get help with a task */}
                <button
                  onClick={() => setShowTaskModal(true)}
                  className="bg-white rounded-3xl p-5 border border-[#E5E9E2] shadow-xs hover:shadow-md hover:border-[#CCD8CE] transition-all text-left space-y-3 group"
                >
                  <div className="w-11 h-11 rounded-full bg-[#E8F2FA] text-[#2D6E9E] flex items-center justify-center text-lg group-hover:scale-105 transition-transform">
                    <ShoppingBag className="w-5 h-5 text-[#256694]" />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-sm text-[#1A2E22]">Get help with a task</h5>
                    <p className="text-xs text-[#6B8173] font-medium mt-0.5">Errands & essentials</p>
                  </div>
                </button>

                {/* Action 3: Call Dad */}
                <button
                  onClick={() => setShowCallModal(true)}
                  className="bg-white rounded-3xl p-5 border border-[#E5E9E2] shadow-xs hover:shadow-md hover:border-[#CCD8CE] transition-all text-left space-y-3 group"
                >
                  <div className="w-11 h-11 rounded-full bg-[#FDF0EE] text-[#D45142] flex items-center justify-center text-lg group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5 text-[#BA4234]" />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-sm text-[#1A2E22]">Call Dad</h5>
                    <p className="text-xs text-[#6B8173] font-medium mt-0.5">Say hello today</p>
                  </div>
                </button>
              </div>

              {/* ============ 3. RECENT UPDATES CARD ============ */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E5E9E2] shadow-sm space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-base text-[#1A2E22]">Recent updates</h3>
                  <button
                    onClick={() => navigate('/family/visits')}
                    className="text-xs font-bold text-[#3B664E] hover:underline"
                  >
                    See all →
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Update Item 1 */}
                  <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#EDF1EB]">
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-full bg-[#FBECEB] flex items-center justify-center text-base shrink-0 mt-0.5">
                        <span className="text-sm">📋</span>
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-extrabold text-sm text-[#1A2E22]">
                          Weekly check-in with Dad
                        </h4>
                        <p className="text-xs text-[#52685B] leading-relaxed">
                          He's feeling good and plans to visit the market this afternoon.
                        </p>
                        <p className="text-[11px] text-[#788C80]">
                          Today · 10:42 am &nbsp;|&nbsp; Meera, Care Coordinator
                        </p>
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#EDF5EE] text-[#2F6546] border border-[#D5E5D9] shrink-0">
                      Completed
                    </span>
                  </div>

                  {/* Update Item 2 */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-full bg-[#FFF2E6] flex items-center justify-center text-base shrink-0 mt-0.5">
                        <span className="text-sm">💊</span>
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-extrabold text-sm text-[#1A2E22]">
                          Medicine pickup reminder
                        </h4>
                        <p className="text-xs text-[#52685B] leading-relaxed">
                          Dad's monthly prescription is due this week.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate('/family/medications')}
                      className="text-xs font-extrabold text-[#3B664E] hover:underline shrink-0 pt-1"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT 4 COLUMNS: Feature Banner & Local Care Contact */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* ============ 4. SAGE HIGHLIGHT BANNER ============ */}
              <div className="bg-[#DFEBE2] rounded-3xl p-6 sm:p-7 border border-[#CEDECF] text-[#1A3828] relative overflow-hidden space-y-5">
                {/* Background decorative starburst/asterisk motif */}
                <div className="absolute -bottom-6 -right-6 w-36 h-36 opacity-30 pointer-events-none">
                  <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-[#255C3F] stroke-4">
                    <line x1="50" y1="0" x2="50" y2="100" />
                    <line x1="0" y1="50" x2="100" y2="50" />
                    <line x1="15" y1="15" x2="85" y2="85" />
                    <line x1="15" y1="85" x2="85" y2="15" />
                  </svg>
                </div>

                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#3B694F]">
                    A LITTLE HELP, RIGHT HERE
                  </p>
                  <h3 className="text-xl sm:text-2xl font-black text-[#153424] mt-2 leading-tight">
                    Small things can make a big difference.
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-[#385946] leading-relaxed">
                  Arrange a friendly visit, a ride to an appointment, or help with a task at home.
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => setShowSupportModal(true)}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#1E4733] hover:bg-[#163626] text-white text-xs font-extrabold shadow-sm shadow-[#1E4733]/30 transition-transform active:scale-95"
                  >
                    <span>Explore local support</span>
                    <span>→</span>
                  </button>
                </div>

                {/* Decorative small potted plant icon */}
                <div className="pt-2 text-2xl">
                  🪴
                </div>
              </div>

              {/* ============ 5. LOCAL CARE CONTACT CARD ============ */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E5E9E2] shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-sm text-[#1A2E22]">Your local care contact</h4>
                  <button
                    onClick={() => setShowCoordinatorDetails(!showCoordinatorDetails)}
                    className="text-xs font-bold text-[#3B664E] hover:underline"
                  >
                    {showCoordinatorDetails ? 'Close' : 'Details'}
                  </button>
                </div>

                <div className="flex items-center gap-3.5">
                  {/* Coordinator Photo/Avatar */}
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
                    alt="Meera Joshi"
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-xs"
                  />
                  <div>
                    <h5 className="font-extrabold text-sm text-[#1A2E22]">Meera Joshi</h5>
                    <p className="text-xs text-[#63796C]">Family Care Coordinator · Indore</p>
                  </div>
                  <span className="ml-auto text-[11px] font-bold text-[#2A6342] bg-[#EEF6F0] px-2 py-0.5 rounded-full flex items-center gap-1 border border-[#D5E5D9]">
                    ✓ Verified
                  </span>
                </div>

                <div className="bg-[#F7F9F6] p-3.5 rounded-2xl border border-[#E7ECE5] text-xs text-[#4C6455] leading-relaxed">
                  Meera coordinates check-ins and local requests with your dad's consent. You'll receive an update after each completed visit.
                </div>

                {showCoordinatorDetails && (
                  <div className="space-y-2 pt-2 border-t border-[#EDF1EB] text-xs text-[#486052]">
                    <div className="flex justify-between">
                      <span>Phone:</span>
                      <a href="tel:+919820011223" className="font-bold text-[#23533D] hover:underline">+91 98200 11223</a>
                    </div>
                    <div className="flex justify-between">
                      <span>Assigned Territory:</span>
                      <span className="font-bold">Indore City Hub</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Background Verification:</span>
                      <span className="font-bold text-[#2B6341]">Aadhaar & Police Cleared ✓</span>
                    </div>
                  </div>
                )}
              </div>

            </div>

          </div>
        </main>
      </div>

      {/* ================= MODAL: REQUEST A VISIT ================= */}
      {showVisitModal && (
        <div className="fixed inset-0 z-50 bg-[#14231A]/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#DCE4DE] space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#EDF1EB]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#FCEBE8] text-[#C94B3C] flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-lg text-[#1A2E22]">Request a Visit</h3>
                  <p className="text-xs text-[#63796C]">For Rajesh Sharma in Indore</p>
                </div>
              </div>
              <button onClick={() => setShowVisitModal(false)} className="text-[#7A8E81] hover:text-[#1A2E22] p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRequestVisitSubmit} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-[#43594C] mb-1.5 font-bold">Purpose of Visit</label>
                <div className="space-y-2">
                  {[
                    'Friendly Companionship (Chai & conversation)',
                    'Morning Garden Walk & Mobility Support',
                    'Medication Check & Vital Signs Reading',
                    'Doctor Appointment Accompaniment'
                  ].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setVisitType(type)}
                      className={`w-full p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                        visitType === type
                          ? 'bg-[#EDF5EE] border-[#36684B] text-[#1E4733] font-bold'
                          : 'border-[#E2E6DE] text-[#4C6455] hover:bg-[#F7F9F6]'
                      }`}
                    >
                      <span>{type}</span>
                      {visitType === type && <Check className="w-4 h-4 text-[#2E6344]" />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[#43594C] mb-1.5 font-bold">Preferred Time Window</label>
                <select
                  value={visitDate}
                  onChange={(e) => setVisitDate(e.target.value)}
                  className="w-full p-3 rounded-2xl border border-[#E2E6DE] bg-white text-xs font-bold text-[#1A2E22] focus:outline-none focus:ring-2 focus:ring-[#36684B]"
                >
                  <option>Tomorrow, 10:00 AM - 12:00 PM</option>
                  <option>Tomorrow, 04:00 PM - 06:00 PM</option>
                  <option>Saturday Morning, 09:30 AM</option>
                  <option>Sunday Afternoon, 02:00 PM</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-[#1E4733] hover:bg-[#163626] text-white font-extrabold text-xs shadow-md transition-transform active:scale-95"
                >
                  Confirm Visit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: GET HELP WITH A TASK ================= */}
      {showTaskModal && (
        <div className="fixed inset-0 z-50 bg-[#14231A]/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#DCE4DE] space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#EDF1EB]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#E8F2FA] text-[#2D6E9E] flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-lg text-[#1A2E22]">Get Help with a Task</h3>
                  <p className="text-xs text-[#63796C]">Errands & essentials in Indore</p>
                </div>
              </div>
              <button onClick={() => setShowTaskModal(false)} className="text-[#7A8E81] hover:text-[#1A2E22] p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRequestTaskSubmit} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-[#43594C] mb-1.5 font-bold">Select Task Category</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Medicine Pickup', 'Grocery / Fruits', 'Cab / Clinic Ride', 'Home Fix / Tech Help'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTaskDetail(t)}
                      className={`p-3 rounded-2xl border text-center transition-all ${
                        taskDetail === t
                          ? 'bg-[#EDF5EE] border-[#36684B] text-[#1E4733] font-bold'
                          : 'border-[#E2E6DE] text-[#4C6455] hover:bg-[#F7F9F6]'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[#43594C] mb-1.5 font-bold">Details or Specific Items</label>
                <textarea
                  rows={3}
                  value={taskDetail}
                  onChange={(e) => setTaskDetail(e.target.value)}
                  placeholder="e.g. Please pick up monthly Glycomet 500 from Apollo Pharmacy on MG Road..."
                  className="w-full p-3 rounded-2xl border border-[#E2E6DE] text-xs font-medium text-[#1A2E22] focus:outline-none focus:ring-2 focus:ring-[#36684B]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-[#1E4733] hover:bg-[#163626] text-white font-extrabold text-xs shadow-md transition-transform active:scale-95"
                >
                  Send Task to Care Coordinator
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: CALL DAD ================= */}
      {showCallModal && (
        <div className="fixed inset-0 z-50 bg-[#14231A]/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 sm:p-7 shadow-2xl border border-[#DCE4DE] text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-[#FCEBE8] text-[#C94B3C] flex items-center justify-center mx-auto text-2xl">
              <Phone className="w-7 h-7 text-[#BA4234]" />
            </div>

            <div>
              <h3 className="font-black text-xl text-[#1A2E22]">Call Dad (Rajesh Sharma)</h3>
              <p className="text-xs text-[#63796C] mt-1">Direct voice call to {elder.phone}</p>
            </div>

            <div className="p-3 bg-[#F7F9F6] rounded-2xl border border-[#E7ECE5] text-xs text-[#4C6455]">
              Local Time in Indore: <strong>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</strong>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setShowCallModal(false)}
                className="flex-1 py-3 rounded-full border border-[#D5DDD7] text-xs font-bold text-[#4B6354] hover:bg-[#F2F6F3]"
              >
                Cancel
              </button>
              <button
                onClick={handleSimulateCall}
                className="flex-1 py-3 rounded-full bg-[#1E4733] hover:bg-[#163626] text-white text-xs font-bold shadow-md"
              >
                Dial Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: EXPLORE LOCAL SUPPORT ================= */}
      {showSupportModal && (
        <div className="fixed inset-0 z-50 bg-[#14231A]/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#DCE4DE] space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#EDF1EB]">
              <div>
                <h3 className="font-black text-xl text-[#1A2E22]">Local Eldercare Support in Indore</h3>
                <p className="text-xs text-[#63796C]">Everything available for your family on-ground</p>
              </div>
              <button onClick={() => setShowSupportModal(false)} className="text-[#7A8E81] hover:text-[#1A2E22]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {[
                { title: 'Friendly Home Visits', desc: 'Tea, conversation, cognitive games, and gentle walking accompaniment.', time: '1 - 2 hours' },
                { title: 'Doctor & Hospital Escort', desc: 'Door-to-door cab escort, OPD queue assistance, and prescription upload.', time: '2 - 4 hours' },
                { title: 'Essential Errands & Groceries', desc: 'Fresh fruits, vegetables, and bank or post office errands.', time: 'As needed' },
                { title: 'Daily Medical Vitals Check', desc: 'Blood pressure, blood sugar, oxygen, and heart rate monitoring.', time: 'Morning / Evening' },
                { title: '24/7 Rapid SOS Emergency Link', desc: 'Immediate ambulance and coordinator dispatch to home address.', time: '< 8 mins dispatch' },
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#F7F9F6] border border-[#E7ECE5] flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-extrabold text-sm text-[#1A2E22]">{item.title}</h4>
                    <p className="text-xs text-[#52685B] mt-0.5">{item.desc}</p>
                  </div>
                  <span className="text-[10px] font-bold text-[#2A6342] bg-[#EEF6F0] px-2.5 py-1 rounded-full shrink-0">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => { setShowSupportModal(false); setShowVisitModal(true); }}
                className="w-full py-3.5 rounded-full bg-[#1E4733] hover:bg-[#163626] text-white font-extrabold text-xs shadow-md"
              >
                Schedule Local Support for Dad
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: MANAGE FAMILY ================= */}
      {showManageFamilyModal && (
        <div className="fixed inset-0 z-50 bg-[#14231A]/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-[#DCE4DE] space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#EDF1EB]">
              <div>
                <h3 className="font-black text-lg text-[#1A2E22]">Manage Family Circle</h3>
                <p className="text-xs text-[#63796C]">Connected members and care settings</p>
              </div>
              <button onClick={() => setShowManageFamilyModal(false)} className="text-[#7A8E81] hover:text-[#1A2E22]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-[#F7F9F6] border border-[#E7ECE5] flex items-center justify-between">
                <div>
                  <p className="font-extrabold text-slate-900">Rajesh Sharma (Dad)</p>
                  <p className="text-[#63796C] text-[11px]">Primary Elder · Indore, MP</p>
                </div>
                <span className="text-[10px] font-bold bg-[#EDF5EE] text-[#2B6141] px-2 py-0.5 rounded-full">
                  Active Care
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F7F9F6] border border-[#E7ECE5] flex items-center justify-between">
                <div>
                  <p className="font-extrabold text-slate-900">Ananya Sharma (You)</p>
                  <p className="text-[#63796C] text-[11px]">Daughter · Bengaluru</p>
                </div>
                <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
                  Family Admin
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setShowManageFamilyModal(false);
                  navigate('/family');
                }}
                className="w-full py-3 rounded-full bg-[#1E4733] text-white text-xs font-bold"
              >
                Go to Full Family Portal Settings
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
