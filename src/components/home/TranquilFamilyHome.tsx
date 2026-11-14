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
  ArrowRight,
  ClipboardList,
  Edit3,
  Sun,
  Activity
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
    const handleUpdate = () => setElders(dbStore.getElders());
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
    <div className="min-h-[100dvh] bg-[#FFFFF0] text-[#17211C] font-serif flex flex-col antialiased selection:bg-[#008080] selection:text-[#FFFFF0]">
      {/* Outer App Frame */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-[1600px] w-full mx-auto">
        
        {/* ================= LEFT SIDEBAR (YOUR SPACE) ================= */}
        <aside className="w-full lg:w-64 bg-[#FFFFF0] lg:bg-transparent p-5 lg:p-6 lg:pr-2 flex flex-col justify-between shrink-0 border-b lg:border-b-0 lg:border-r border-[#CFB53B]/30">
          <div className="space-y-8">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="ApnaSahara"
                className="h-12 w-auto object-contain bg-[#FFFFF0] p-1 rounded-[10px] border border-[#CFB53B]/50"
              />
            </div>

            {/* Navigation Menu */}
            <div className="space-y-2 text-left">
              <p className="text-[11px] font-bold uppercase tracking-widest text-[#008080] px-3">
                FAMILY SANCTUARY
              </p>
              <nav className="space-y-1 text-sm font-semibold">
                <button
                  onClick={() => setActiveTab('home')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-[12px] transition-all text-left ${
                    activeTab === 'home'
                      ? 'bg-[#008080] text-[#FFFFF0] font-bold shadow-xs'
                      : 'text-[#17211C]/80 hover:bg-[#FFFDD0] hover:text-[#008080]'
                  }`}
                >
                  <Heart className="w-4 h-4 text-[#CFB53B]" />
                  <span>Home</span>
                </button>

                <button
                  onClick={() => { setActiveTab('visits'); navigate('/family/visits'); }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-[12px] transition-all text-left ${
                    activeTab === 'visits'
                      ? 'bg-[#008080] text-[#FFFFF0] font-bold'
                      : 'text-[#17211C]/80 hover:bg-[#FFFDD0] hover:text-[#008080]'
                  }`}
                >
                  <Clock className="w-4 h-4 text-[#CFB53B]" />
                  <span>Visits & check-ins</span>
                </button>

                <button
                  onClick={() => { setActiveTab('support'); setShowSupportModal(true); }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-[12px] transition-all text-left ${
                    activeTab === 'support'
                      ? 'bg-[#008080] text-[#FFFFF0] font-bold'
                      : 'text-[#17211C]/80 hover:bg-[#FFFDD0] hover:text-[#008080]'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-[#CFB53B]" />
                  <span>Find support</span>
                </button>

                <button
                  onClick={() => { setActiveTab('circle'); navigate('/family'); }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-[12px] transition-all text-left ${
                    activeTab === 'circle'
                      ? 'bg-[#008080] text-[#FFFFF0] font-bold'
                      : 'text-[#17211C]/80 hover:bg-[#FFFDD0] hover:text-[#008080]'
                  }`}
                >
                  <Users className="w-4 h-4 text-[#CFB53B]" />
                  <span>Family circle</span>
                </button>

                <button
                  onClick={() => { setActiveTab('messages'); navigate('/contact'); }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-[12px] transition-all text-left ${
                    activeTab === 'messages'
                      ? 'bg-[#008080] text-[#FFFFF0] font-bold'
                      : 'text-[#17211C]/80 hover:bg-[#FFFDD0] hover:text-[#008080]'
                  }`}
                >
                  <MessageSquare className="w-4 h-4 text-[#CFB53B]" />
                  <span>Messages</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Bottom Sidebar Callout */}
          <div className="pt-6">
            <button
              onClick={() => navigate('/contact')}
              className="w-full py-2.5 px-3.5 rounded-[12px] bg-[#FFFDD0] text-[#008080] hover:bg-[#FFFDD0]/80 text-xs font-bold transition-colors flex items-center justify-between border border-[#CFB53B]/40"
            >
              <span>Here when you need us</span>
              <ShieldCheck className="w-4 h-4 text-[#008080]" />
            </button>
          </div>
        </aside>

        {/* ================= MAIN CONTENT AREA ================= */}
        <main className="flex-1 p-5 sm:p-8 lg:p-10 space-y-7">
          
          {/* Top Breadcrumb & Connection Ribbon */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
            <div className="text-xs font-semibold text-[#17211C]/70 flex items-center gap-2">
              <span>Family space</span>
              <span className="text-[#CFB53B]">/</span>
              <span className="text-[#17211C] font-bold">Home</span>
            </div>

            <div className="flex items-center gap-3">
              {/* City Link Indicator */}
              <button
                onClick={() => {
                  const newPair = cityPair.includes('Indore') ? 'San Jose ↔ New Delhi' : 'Bengaluru ↔ Indore';
                  setCityPair(newPair);
                  showToast('City Connection Synced', `Family bridge: ${newPair}`, 'info');
                }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFDD0] text-[#008080] text-xs font-bold shadow-xs border border-[#CFB53B]/40 hover:bg-[#FFFDD0]/80 transition-colors"
                title="Click to toggle family location bridge"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#008080] animate-pulse" />
                <span className="font-mono">{cityPair}</span>
              </button>

              {/* Notification Bell */}
              <button
                onClick={() => navigate('/family/sos')}
                className="w-9 h-9 rounded-full bg-[#FFFFF0] border border-[#CFB53B]/40 flex items-center justify-center text-[#17211C] hover:text-[#008080] hover:bg-[#FFFDD0] shadow-xs relative"
                aria-label="Alerts"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#800020] ring-2 ring-[#FFFFF0]" />
              </button>
            </div>
          </div>

          {/* Greeting Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 text-left">
            <div className="space-y-1">
              <p className="text-[11px] font-bold uppercase tracking-widest text-[#008080] font-mono">
                TODAY'S CARE CADENCE
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#17211C] tracking-tight flex items-center gap-2">
                Good morning, {user?.name?.split(' ')[0] || 'Ananya'}
                <Sun className="w-6 h-6 text-[#CFB53B]" />
              </h2>
              <p className="text-sm text-[#17211C]/75">
                Here's how your family is doing today.
              </p>
            </div>

            <div className="text-xs text-[#CFB53B] italic font-semibold">
              Your family, a little closer.
            </div>
          </div>

          {/* Main 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start text-left">
            
            {/* LEFT 8 COLUMNS: Family Card, Action Buttons, Recent Updates */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* ============ 1. "YOUR FAMILY" CARD ============ */}
              <div className="bg-[#FFFFF0] rounded-[12px] p-6 sm:p-7 border border-[#CFB53B]/40 shadow-[0_2px_12px_rgba(23,33,28,0.05)] space-y-6 relative overflow-hidden">
                

                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base text-[#17211C]">Your family</h3>
                  <button
                    onClick={() => setShowManageFamilyModal(true)}
                    className="text-xs font-semibold text-[#008080] hover:underline flex items-center gap-1"
                  >
                    <span>Manage family</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Elder Profile Row */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-[#FFFDD0] border border-[#CFB53B] shadow-xs flex items-center justify-center text-xl shrink-0 overflow-hidden text-[#008080]">
                      <Heart className="w-6 h-6 text-[#800020]" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-[#17211C]">
                        {elder.name}
                      </h4>
                      <p className="text-xs text-[#17211C]/70 font-medium">
                        {relationshipTitle} · {elder.city}
                      </p>
                    </div>
                  </div>

                  {/* Status Pill */}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#808000]/15 text-[#808000] border border-[#808000]/30 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#808000] animate-pulse" />
                    Doing well
                  </span>
                </div>

                {/* 3-Column Metric Banner */}
                <div className="grid grid-cols-3 divide-x divide-[#CFB53B]/30 bg-[#FFFDD0] rounded-[10px] py-4 px-2 border border-[#CFB53B]/30 text-center">
                  <div className="space-y-0.5">
                    <p className="text-base sm:text-lg font-bold text-[#17211C]">Today</p>
                    <p className="text-[11px] text-[#17211C]/60 font-medium">Last check-in</p>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-base sm:text-lg font-bold text-[#008080] font-mono">10:42 am</p>
                    <p className="text-[11px] text-[#17211C]/60 font-medium">Checked in</p>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-base sm:text-lg font-bold text-[#808000]">All good</p>
                    <p className="text-[11px] text-[#17211C]/60 font-medium">{relationshipTitle}'s update</p>
                  </div>
                </div>

                {/* Bottom Callout in Family Card */}
                <div className="flex items-center justify-between pt-1 text-xs text-[#17211C]/80">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#808000]/20 text-[#808000] flex items-center justify-center text-[10px] font-bold">
                      ✓
                    </span>
                    <span className="font-semibold">Weekly wellbeing check-in completed</span>
                  </div>
                  <span className="text-[#17211C]/50 text-[11px] font-mono">Today</span>
                </div>
              </div>

              {/* ============ 2. THREE QUICK ACTION CARDS ============ */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Action 1: Request a visit */}
                <button
                  onClick={() => setShowVisitModal(true)}
                  className="bg-[#FFFFF0] rounded-[12px] p-5 border border-[#CFB53B]/40 shadow-xs hover:shadow-md hover:border-[#CFB53B] transition-all text-left space-y-3 group"
                >
                  <div className="w-11 h-11 rounded-[10px] bg-[#008080]/15 text-[#008080] flex items-center justify-center text-lg group-hover:scale-105 transition-transform border border-[#008080]/30">
                    <Users className="w-5 h-5 text-[#008080]" />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-[#17211C]">Request a visit</h5>
                    <p className="text-xs text-[#17211C]/70 font-medium mt-0.5">Friendly company</p>
                  </div>
                </button>

                {/* Action 2: Get help with a task */}
                <button
                  onClick={() => setShowTaskModal(true)}
                  className="bg-[#FFFFF0] rounded-[12px] p-5 border border-[#CFB53B]/40 shadow-xs hover:shadow-md hover:border-[#CFB53B] transition-all text-left space-y-3 group"
                >
                  <div className="w-11 h-11 rounded-[10px] bg-[#005F9E]/15 text-[#005F9E] flex items-center justify-center text-lg group-hover:scale-105 transition-transform border border-[#005F9E]/30">
                    <ShoppingBag className="w-5 h-5 text-[#005F9E]" />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-[#17211C]">Get help with a task</h5>
                    <p className="text-xs text-[#17211C]/70 font-medium mt-0.5">Errands & essentials</p>
                  </div>
                </button>

                {/* Action 3: Call Dad */}
                <button
                  onClick={() => setShowCallModal(true)}
                  className="bg-[#FFFFF0] rounded-[12px] p-5 border border-[#CFB53B]/40 shadow-xs hover:shadow-md hover:border-[#CFB53B] transition-all text-left space-y-3 group"
                >
                  <div className="w-11 h-11 rounded-[10px] bg-[#800020]/15 text-[#800020] flex items-center justify-center text-lg group-hover:scale-105 transition-transform border border-[#800020]/30">
                    <Phone className="w-5 h-5 text-[#800020]" />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-[#17211C]">Call {relationshipTitle}</h5>
                    <p className="text-xs text-[#17211C]/70 font-medium mt-0.5">Say hello today</p>
                  </div>
                </button>
              </div>

              {/* ============ 3. RECENT UPDATES CARD ============ */}
              <div className="bg-[#FFFFF0] rounded-[12px] p-6 sm:p-7 border border-[#CFB53B]/40 shadow-[0_2px_12px_rgba(23,33,28,0.05)] space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base text-[#17211C]">Recent updates</h3>
                  <button
                    onClick={() => navigate('/family/visits')}
                    className="text-xs font-semibold text-[#008080] hover:underline flex items-center gap-1"
                  >
                    <span>See all</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Update Item 1 */}
                  <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#CFB53B]/20">
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-[8px] bg-[#FFFDD0] border border-[#CFB53B]/40 flex items-center justify-center shrink-0 mt-0.5 text-[#008080]">
                        <ClipboardList className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-sm text-[#17211C]">
                          Weekly check-in with {relationshipTitle}
                        </h4>
                        <p className="text-xs text-[#17211C]/75 leading-relaxed">
                          {elder.gender === 'Female' ? 'She' : 'He'}'s feeling good and plans to visit the market this afternoon.
                        </p>
                        <p className="text-[11px] text-[#17211C]/60 font-mono">
                          Today · 10:42 am | Meera, Care Coordinator
                        </p>
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#808000]/15 text-[#808000] border border-[#808000]/30 shrink-0 font-mono">
                      Completed
                    </span>
                  </div>

                  {/* Update Item 2 */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-[8px] bg-[#FFFDD0] border border-[#CFB53B]/40 flex items-center justify-center shrink-0 mt-0.5 text-[#800020]">
                        <Pill className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-sm text-[#17211C]">
                          Medicine pickup reminder
                        </h4>
                        <p className="text-xs text-[#17211C]/75 leading-relaxed">
                          {relationshipTitle}'s monthly prescription is due this week.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate('/family/medications')}
                      className="text-xs font-bold text-[#008080] hover:underline shrink-0 pt-1"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT 4 COLUMNS: Feature Banner & Local Care Contact */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* ============ 4. CARE HIGHLIGHT BANNER ============ */}
              <div className="bg-gradient-to-br from-[#FFFDD0] to-[#E0B0FF]/25 rounded-[12px] p-6 sm:p-7 border border-[#CFB53B]/60 text-[#17211C] relative overflow-hidden space-y-5">
                

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#008080] font-mono">
                    A LITTLE HELP, RIGHT HERE
                  </p>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#17211C] mt-2 leading-tight">
                    Small things make a profound difference.
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-[#17211C]/80 leading-relaxed">
                  Arrange a friendly companion visit, a safe cab escort to a clinical appointment, or help with errands at home.
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => setShowSupportModal(true)}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-[12px] bg-[#008080] hover:brightness-90 text-[#FFFFF0] text-xs font-semibold shadow-md shadow-[#008080]/20 transition-all active:translate-y-[1px]"
                  >
                    <span>Explore local support</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* ============ 5. LOCAL CARE CONTACT CARD ============ */}
              <div className="bg-[#FFFFF0] rounded-[12px] p-6 sm:p-7 border border-[#CFB53B]/40 shadow-[0_2px_12px_rgba(23,33,28,0.05)] space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-[#17211C]">Your local care contact</h4>
                  <button
                    onClick={() => setShowCoordinatorDetails(!showCoordinatorDetails)}
                    className="text-xs font-semibold text-[#008080] hover:underline"
                  >
                    {showCoordinatorDetails ? 'Close' : 'Details'}
                  </button>
                </div>

                <div className="flex items-center gap-3.5">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
                    alt="Meera Joshi"
                    className="w-12 h-12 rounded-[12px] object-cover border border-[#CFB53B] shadow-xs"
                  />
                  <div>
                    <h5 className="font-bold text-sm text-[#17211C]">Meera Joshi</h5>
                    <p className="text-xs text-[#17211C]/70">Family Care Coordinator · Indore</p>
                  </div>
                  <span className="ml-auto text-[11px] font-bold text-[#808000] bg-[#FFFDD0] px-2 py-0.5 rounded-full flex items-center gap-1 border border-[#CFB53B]/40 font-mono">
                    ✓ Verified
                  </span>
                </div>

                <div className="bg-[#FFFDD0] p-3.5 rounded-[10px] border border-[#CFB53B]/30 text-xs text-[#17211C]/80 leading-relaxed">
                  Meera coordinates check-ins and local requests with your dad's consent. You'll receive an update after each completed visit.
                </div>

                {showCoordinatorDetails && (
                  <div className="space-y-2 pt-2 border-t border-[#CFB53B]/20 text-xs text-[#17211C]/80">
                    <div className="flex justify-between">
                      <span>Phone:</span>
                      <a href="tel:+919820011223" className="font-bold text-[#008080] hover:underline font-mono">+91 98200 11223</a>
                    </div>
                    <div className="flex justify-between">
                      <span>Assigned Territory:</span>
                      <span className="font-bold">Indore City Hub</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Background Verification:</span>
                      <span className="font-bold text-[#808000]">Aadhaar & Police Cleared</span>
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
        <div className="fixed inset-0 z-[300] bg-[#17211C]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFFF0] rounded-[12px] max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#CFB53B] space-y-6 relative">
            

            <div className="flex items-center justify-between pb-3 border-b border-[#CFB53B]/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[10px] bg-[#008080]/15 text-[#008080] flex items-center justify-center border border-[#008080]/30">
                  <Users className="w-5 h-5 text-[#008080]" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#17211C]">Request a Visit</h3>
                  <p className="text-xs text-[#17211C]/70">For {elder.name} in {parentCityShort}</p>
                </div>
              </div>
              <button onClick={() => setShowVisitModal(false)} className="text-[#17211C]/60 hover:text-[#800020] p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRequestVisitSubmit} className="space-y-4 text-xs font-semibold text-left">
              <div>
                <label className="block text-[#17211C] mb-1.5 font-bold">Purpose of Visit</label>
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
                      className={`w-full p-3 rounded-[10px] border text-left transition-all flex items-center justify-between ${
                        visitType === type
                          ? 'bg-[#008080] border-[#008080] text-[#FFFFF0] font-bold shadow-xs'
                          : 'border-[#CFB53B]/40 text-[#17211C] bg-[#FFFFF0] hover:bg-[#FFFDD0]'
                      }`}
                    >
                      <span>{type}</span>
                      {visitType === type && <Check className="w-4 h-4 text-[#FFFFF0]" />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[#17211C] mb-1.5 font-bold">Preferred Time Window</label>
                <select
                  value={visitDate}
                  onChange={(e) => setVisitDate(e.target.value)}
                  className="w-full p-3 rounded-[12px] border border-[#CFB53B]/50 bg-[#FFFFF0] text-xs font-bold text-[#17211C] focus:outline-none focus:ring-2 focus:ring-[#008080]"
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
                  className="w-full py-3.5 rounded-[12px] bg-[#008080] hover:brightness-90 text-[#FFFFF0] font-bold text-xs shadow-md shadow-[#008080]/20 transition-all active:translate-y-[1px]"
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
        <div className="fixed inset-0 z-[300] bg-[#17211C]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFFF0] rounded-[12px] max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#CFB53B] space-y-6 relative">
            

            <div className="flex items-center justify-between pb-3 border-b border-[#CFB53B]/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[10px] bg-[#005F9E]/15 text-[#005F9E] flex items-center justify-center border border-[#005F9E]/30">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#17211C]">Get Help with a Task</h3>
                  <p className="text-xs text-[#17211C]/70">Errands & essentials in Indore</p>
                </div>
              </div>
              <button onClick={() => setShowTaskModal(false)} className="text-[#17211C]/60 hover:text-[#800020] p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRequestTaskSubmit} className="space-y-4 text-xs font-semibold text-left">
              <div>
                <label className="block text-[#17211C] mb-1.5 font-bold">Select Task Category</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Medicine Pickup', 'Grocery / Fruits', 'Cab / Clinic Ride', 'Home Fix / Tech Help'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTaskDetail(t)}
                      className={`p-3 rounded-[10px] border text-center transition-all ${
                        taskDetail === t
                          ? 'bg-[#008080] border-[#008080] text-[#FFFFF0] font-bold shadow-xs'
                          : 'border-[#CFB53B]/40 text-[#17211C] bg-[#FFFFF0] hover:bg-[#FFFDD0]'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[#17211C] mb-1.5 font-bold">Details or Specific Items</label>
                <textarea
                  rows={3}
                  value={taskDetail}
                  onChange={(e) => setTaskDetail(e.target.value)}
                  placeholder="e.g. Please pick up monthly Glycomet 500 from Apollo Pharmacy on MG Road..."
                  className="w-full p-3 rounded-[12px] border border-[#CFB53B]/50 bg-[#FFFFF0] text-xs font-medium text-[#17211C] focus:outline-none focus:ring-2 focus:ring-[#008080]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-[12px] bg-[#008080] hover:brightness-90 text-[#FFFFF0] font-bold text-xs shadow-md shadow-[#008080]/20 transition-all active:translate-y-[1px]"
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
        <div className="fixed inset-0 z-[300] bg-[#17211C]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFFF0] rounded-[12px] max-w-sm w-full p-6 sm:p-7 shadow-2xl border border-[#CFB53B] text-center space-y-5">
            <div className="w-16 h-16 rounded-[12px] bg-[#800020]/15 text-[#800020] flex items-center justify-center mx-auto border border-[#800020]/30">
              <Phone className="w-7 h-7 text-[#800020]" />
            </div>

            <div>
              <h3 className="font-bold text-xl text-[#17211C]">Call {relationshipTitle} ({elder.name})</h3>
              <p className="text-xs text-[#17211C]/70 mt-1 font-mono">Direct voice call to {elder.phone}</p>
            </div>

            <div className="p-3 bg-[#FFFDD0] rounded-[10px] border border-[#CFB53B]/30 text-xs text-[#17211C]/80 font-mono">
              Local Time in {parentCityShort}: <strong>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</strong>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setShowCallModal(false)}
                className="flex-1 py-3 rounded-[12px] border border-[#CFB53B] text-xs font-semibold text-[#17211C] hover:bg-[#FFFDD0]"
              >
                Cancel
              </button>
              <button
                onClick={handleSimulateCall}
                className="flex-1 py-3 rounded-[12px] bg-[#008080] hover:brightness-90 text-[#FFFFF0] text-xs font-bold shadow-md shadow-[#008080]/20 transition-all active:translate-y-[1px]"
              >
                Dial Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: EXPLORE LOCAL SUPPORT ================= */}
      {showSupportModal && (
        <div className="fixed inset-0 z-[300] bg-[#17211C]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFFF0] rounded-[12px] max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#CFB53B] space-y-6 max-h-[90vh] overflow-y-auto relative">
            

            <div className="flex items-center justify-between pb-3 border-b border-[#CFB53B]/30">
              <div>
                <span className="text-[11px] font-bold text-[#008080] uppercase tracking-wider">
                  Community Services
                </span>
                <h3 className="font-bold text-xl text-[#17211C]">Local Eldercare Support in {parentCityShort}</h3>
                <p className="text-xs text-[#17211C]/70">Everything available for your family on-ground</p>
              </div>
              <button onClick={() => setShowSupportModal(false)} className="text-[#17211C]/60 hover:text-[#800020]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-left">
              {[
                { title: 'Friendly Home Visits', desc: 'Tea, conversation, cognitive games, and gentle walking accompaniment.', time: '1 - 2 hours' },
                { title: 'Doctor & Hospital Escort', desc: 'Door-to-door cab escort, OPD queue assistance, and prescription upload.', time: '2 - 4 hours' },
                { title: 'Essential Errands & Groceries', desc: 'Fresh fruits, vegetables, and bank or post office errands.', time: 'As needed' },
                { title: 'Daily Medical Vitals Check', desc: 'Blood pressure, blood sugar, oxygen, and heart rate monitoring.', time: 'Morning / Evening' },
                { title: '24/7 Rapid SOS Emergency Link', desc: 'Immediate ambulance and coordinator dispatch to home address.', time: '< 8 mins dispatch' },
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-[10px] bg-[#FFFDD0] border border-[#CFB53B]/40 flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-bold text-sm text-[#17211C]">{item.title}</h4>
                    <p className="text-xs text-[#17211C]/75 mt-0.5">{item.desc}</p>
                  </div>
                  <span className="text-[10px] font-bold text-[#808000] bg-[#FFFFF0] border border-[#808000]/30 px-2.5 py-1 rounded-full shrink-0 font-mono">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => { setShowSupportModal(false); setShowVisitModal(true); }}
                className="w-full py-3.5 rounded-[12px] bg-[#008080] hover:brightness-90 text-[#FFFFF0] font-bold text-xs shadow-md shadow-[#008080]/20 transition-all active:translate-y-[1px]"
              >
                Schedule Local Support for {relationshipTitle}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: MANAGE FAMILY ================= */}
      {showManageFamilyModal && (
        <div className="fixed inset-0 z-[300] bg-[#17211C]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFFF0] rounded-[12px] max-w-md w-full p-6 sm:p-7 shadow-2xl border border-[#CFB53B] space-y-5 text-left relative">
            

            <div className="flex items-center justify-between pb-3 border-b border-[#CFB53B]/30">
              <div>
                <span className="text-[11px] font-bold text-[#008080] uppercase tracking-wider">
                  Care Network
                </span>
                <h3 className="font-bold text-lg text-[#17211C]">Manage Family Circle</h3>
                <p className="text-xs text-[#17211C]/70">Connected members and care settings</p>
              </div>
              <button onClick={() => setShowManageFamilyModal(false)} className="text-[#17211C]/60 hover:text-[#800020]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-[10px] bg-[#FFFDD0] border border-[#CFB53B]/40 flex items-center justify-between">
                <div>
                  <p className="font-bold text-[#17211C]">{elder.name} ({relationshipTitle})</p>
                  <p className="text-[#17211C]/60 text-[11px]">Primary Elder · {elder.city}</p>
                </div>
                <span className="text-[10px] font-bold bg-[#808000]/15 text-[#808000] border border-[#808000]/30 px-2 py-0.5 rounded-full font-mono">
                  Active Care
                </span>
              </div>

              <div className="p-3.5 rounded-[10px] bg-[#FFFDD0] border border-[#CFB53B]/40 flex items-center justify-between">
                <div>
                  <p className="font-bold text-[#17211C]">{user?.name || 'You'}</p>
                  <p className="text-[#17211C]/60 text-[11px]">Family Admin · {userCity}</p>
                </div>
                <span className="text-[10px] font-bold bg-[#008080]/15 text-[#008080] border border-[#008080]/30 px-2 py-0.5 rounded-full font-mono">
                  Family Admin
                </span>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <button
                onClick={() => {
                  setShowManageFamilyModal(false);
                  navigate('/onboarding');
                }}
                className="w-full py-2.5 rounded-[12px] bg-[#FFFDD0] border border-[#CFB53B] text-[#008080] text-xs font-semibold hover:bg-[#CFB53B]/20 transition-colors flex items-center justify-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Senior Profile Details</span>
              </button>
              <button
                onClick={() => {
                  setShowManageFamilyModal(false);
                  navigate('/family');
                }}
                className="w-full py-3 rounded-[12px] bg-[#008080] hover:brightness-90 text-[#FFFFF0] text-xs font-bold transition-all active:translate-y-[1px]"
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
