import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  Shield,
  Activity,
  PhoneCall,
  Calendar,
  Clock,
  MapPin,
  Check,
  ChevronRight,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Users,
  Compass,
  FileText,
  Lock,
  Layers,
  Sliders,
  Send,
  Eye,
  CheckCircle2,
  Bell
} from 'lucide-react';
import {
  WhiplashDivider,
  OrnateCorner,
  StainedGlassMedallion,
  BotanicalBranch
} from '../art-nouveau/ArtNouveauDecorations';

export const ArtNouveauLandingPage: React.FC = () => {
  const navigate = useNavigate();

  // Interactive SaaS Workbench state
  const [activeTab, setActiveTab] = useState<'schedule' | 'vitals' | 'tokens'>('schedule');
  const [selectedCompanionTier, setSelectedCompanionTier] = useState('daily');
  const [vitalSimulation, setVitalSimulation] = useState<'nominal' | 'elevated'>('nominal');
  const [scheduledDay, setScheduledDay] = useState('Tomorrow, 09:30 AM');
  const [companionName, setCompanionName] = useState('Sister Ananya Roy');

  // Input form validation state (demonstrating exact input spec)
  const [consultationName, setConsultationName] = useState('');
  const [consultationPhone, setConsultationPhone] = useState('');
  const [consultationCity, setConsultationCity] = useState('Bengaluru');
  const [formError, setFormError] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleConsultationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultationName.trim()) {
      setFormError('Please provide the family coordinator or parent name.');
      return;
    }
    if (!consultationPhone.trim() || consultationPhone.length < 10) {
      setFormError('Please enter a valid 10-digit Indian contact number.');
      return;
    }
    setFormError('');
    setFormSubmitted(true);
  };

  return (
    <div className="w-full bg-[#FFFFF0] text-[#17211C] selection:bg-[#008080] selection:text-[#FFFFF0]">
      {/* =========================================================================
          HERO SECTION: Asymmetric Composition (7 cols / 5 cols)
          Max-width: 1280px with 1.5rem padding
          ========================================================================= */}
      <section className="relative pt-8 pb-16 sm:pt-14 sm:pb-24 overflow-hidden border-b border-[#CFB53B]/25">
        {/* Subtle Stained Glass Glow in Background */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#008080]/10 via-[#CFB53B]/10 to-[#E0B0FF]/15 blur-3xl pointer-events-none -z-0" />
        <div className="absolute bottom-0 left-0 w-[420px] h-[420px] rounded-full bg-gradient-to-tr from-[#800020]/5 via-[#CFB53B]/10 to-[#FFFFF0] blur-2xl pointer-events-none -z-0" />

        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          {/* Top Atelier Badge */}
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#FFFDD0] border border-[#CFB53B]/60 shadow-[0_2px_8px_rgba(207,181,59,0.15)] text-xs font-medium text-[#17211C]">
              <span className="w-2 h-2 rounded-full bg-[#008080] animate-pulse" />
              <span className="font-semibold tracking-wide">Art Nouveau Florido</span>
              <span className="text-[#CFB53B]">·</span>
              <span className="text-xs text-[#17211C]/80">Eldercare Sanctuary & Intelligent SaaS</span>
            </div>

            <div className="font-mono text-[11px] text-[#008080] bg-[#FFFFF0] px-3 py-1 rounded-md border border-[#008080]/30 hidden md:block">
              CADENCE: 120 BPM // BELLE-EPOQUE V2.4 // STIFFNESS: 120
            </div>
          </div>

          {/* Asymmetric Hero Grid: 7 cols (left) vs 5 cols (right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column (7 cols): Editorial Typography & Direct Action */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="flex items-center gap-2 text-[#008080]">
                <BotanicalBranch className="w-24 h-10" />
                <span className="text-xs uppercase tracking-widest font-bold text-[#800020]">
                  Where Structure Breathes & Lines Grow
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#17211C] leading-[1.12]">
                Loving Care for Parents,{' '}
                <span className="italic font-normal text-[#008080] decoration-[#CFB53B] underline underline-offset-8">
                  Pure Tranquility
                </span>{' '}
                for Families.
              </h1>

              <p className="text-base sm:text-lg text-[#17211C]/85 leading-relaxed max-w-[72ch]">
                ApnaSahara Florido unites the harmonic beauty of Art Nouveau design with
                rigorous eldercare infrastructure. We provide background-verified companion
                caregivers, real-time vitals monitoring, daily medication adherence, and guaranteed
                24/7 emergency dispatch across India.
              </p>

              {/* Action Buttons as per Component Spec */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/register"
                  className="bg-[#008080] text-[#FFFFF0] px-6 py-3 rounded-[12px] font-semibold text-sm sm:text-base hover:brightness-90 active:translate-y-[1px] transition-all shadow-[0_2px_12px_rgba(0,128,128,0.2)] flex items-center gap-2"
                >
                  <span>Begin Family Sanctuary</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/services"
                  className="border-[1.5px] border-[#CFB53B] text-[#008080] bg-transparent hover:bg-[#008080]/5 px-6 py-3 rounded-[12px] font-semibold text-sm sm:text-base active:translate-y-[1px] transition-all flex items-center gap-2"
                >
                  <Eye className="w-4 h-4 text-[#CFB53B]" />
                  <span>Inspect Care Model</span>
                </Link>
              </div>

              {/* Trust Indicators with Lucide Icons (No emojis) */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-[#CFB53B]/30">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#FFFDD0] border border-[#CFB53B]/50 flex items-center justify-center text-[#008080]">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#17211C]">100% Verified</p>
                    <p className="text-[11px] text-[#17211C]/70">Police & ID Checked</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#FFFDD0] border border-[#CFB53B]/50 flex items-center justify-center text-[#800020]">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#17211C]">24/7 SOS Desk</p>
                    <p className="text-[11px] text-[#17211C]/70">112 / 108 Integrated</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
                  <div className="w-8 h-8 rounded-full bg-[#FFFDD0] border border-[#CFB53B]/50 flex items-center justify-center text-[#808000]">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#17211C]">Daily Vitals</p>
                    <p className="text-[11px] text-[#17211C]/70">Doctor Reviewed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (5 cols): Asymmetric Stained Glass Live Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-[12px] bg-[#FFFFF0] border border-[#CFB53B]/40 shadow-[0_4px_24px_rgba(23,33,28,0.08)] p-6 overflow-hidden">
                {/* Ornate corner brackets */}
                <OrnateCorner position="top-left" className="absolute top-2 left-2 text-[#CFB53B]" />
                <OrnateCorner position="top-right" className="absolute top-2 right-2 text-[#CFB53B]" />
                <OrnateCorner position="bottom-left" className="absolute bottom-2 left-2 text-[#CFB53B]" />
                <OrnateCorner position="bottom-right" className="absolute bottom-2 right-2 text-[#CFB53B]" />

                {/* Arched Stained Glass Header Vignette */}
                <div className="relative text-center pb-5 border-b border-[#CFB53B]/30">
                  <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-tr from-[#008080]/20 via-[#CFB53B]/30 to-[#E0B0FF]/25 border border-[#CFB53B] flex items-center justify-center mb-3 shadow-inner">
                    <Heart className="w-7 h-7 text-[#800020]" />
                  </div>
                  <span className="text-[11px] uppercase tracking-wider font-bold text-[#808000] bg-[#FFFDD0] px-3 py-0.5 rounded-full border border-[#CFB53B]/40">
                    Active Caregiver Session
                  </span>
                  <h3 className="text-xl font-bold text-[#17211C] mt-2">
                    Rajesh Sharma (Age 74)
                  </h3>
                  <p className="text-xs text-[#17211C]/70 flex items-center justify-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#008080]" />
                    <span>Indore, Madhya Pradesh ↔ Connected to Bengaluru</span>
                  </p>
                </div>

                {/* Live Telemetry Gauges */}
                <div className="py-4 space-y-3">
                  <div className="p-3.5 rounded-[12px] bg-[#FFFDD0]/70 border border-[#CFB53B]/30 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#008080]/15 flex items-center justify-center text-[#008080]">
                        <Activity className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-[#17211C]/70">Heart Rate & Vitals</p>
                        <p className="text-sm font-bold text-[#17211C]">72 BPM · Nominal Rhythm</p>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-[#008080] font-semibold bg-[#FFFFF0] px-2 py-1 rounded border border-[#008080]/20">
                      SpO2 98%
                    </span>
                  </div>

                  <div className="p-3.5 rounded-[12px] bg-[#FFFDD0]/70 border border-[#CFB53B]/30 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#800020]/15 flex items-center justify-center text-[#800020]">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-[#17211C]/70">Companion On Duty</p>
                        <p className="text-sm font-bold text-[#17211C]">Sister Sunita Verma (Nurse)</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-[#808000] bg-[#FFFFF0] px-2.5 py-1 rounded border border-[#808000]/30">
                      Checked In
                    </span>
                  </div>

                  <div className="p-3.5 rounded-[12px] bg-[#FFFDD0]/70 border border-[#CFB53B]/30 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#005F9E]/15 flex items-center justify-center text-[#005F9E]">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-[#17211C]/70">Evening Medication</p>
                        <p className="text-sm font-bold text-[#17211C]">Metformin & Multivitamin</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-[#008080] flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 text-[#008080]" />
                      <span>Taken 7:30 PM</span>
                    </span>
                  </div>
                </div>

                {/* Direct Action Link */}
                <div className="pt-2 text-center">
                  <Link
                    to="/family"
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-[12px] bg-[#008080] hover:bg-[#006666] text-[#FFFFF0] text-xs font-semibold transition-colors"
                  >
                    <span>View Family Health Telemetry</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Whiplash Botanical Section Divider */}
      <WhiplashDivider />

      {/* =========================================================================
          SECTION 2: BELLE ÉPOQUE PHILOSOPHY & ART NOUVEAU MANIFESTO
          Vertical rhythm: clamp(4rem, 8vw, 8rem)
          ========================================================================= */}
      <section className="py-12 sm:py-20 max-w-[1280px] mx-auto px-6">
        <div className="p-8 sm:p-12 rounded-[12px] bg-gradient-to-r from-[#FFFDD0] via-[#FFFFF0] to-[#FFFDD0] border border-[#CFB53B]/50 shadow-[0_2px_12px_rgba(23,33,28,0.06)] relative overflow-hidden">
          <OrnateCorner position="top-left" className="absolute top-2 left-2 text-[#CFB53B]" />
          <OrnateCorner position="bottom-right" className="absolute bottom-2 right-2 text-[#CFB53B]" />

          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-xs uppercase font-bold tracking-widest text-[#008080]">
              The Belle Époque Philosophy
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#17211C] leading-snug">
              "Art Nouveau didn't ask permission. Structure can breathe. Lines can grow."
            </h2>
            <p className="text-base text-[#17211C]/80 leading-relaxed font-normal">
              In digital interfaces, organic curves have often been neglected for mechanical boxes.
              At ApnaSahara Florido, we treat Art Nouveau not as a superficial skin, but as a
              structural philosophy: botanical motifs provide visual rhythm, whiplash curves guide
              the gaze, and compassionate human care replaces impersonal software.
            </p>
            <div className="pt-2 flex items-center justify-center gap-6 text-xs text-[#CFB53B] font-semibold">
              <span>Mucha-Inspired Cadence</span>
              <span>·</span>
              <span>Klimt Ornamental Geometry</span>
              <span>·</span>
              <span>24/7 Human Dispatch</span>
            </div>
          </div>
        </div>
      </section>

      {/* Whiplash Botanical Section Divider */}
      <WhiplashDivider />

      {/* =========================================================================
          SECTION 3: ASYMMETRIC FEATURE GRID (No 3 equal columns!)
          Grid Layout A: 8 cols (Master Card) + 4 cols (Companion Vignette)
          ========================================================================= */}
      <section className="py-12 sm:py-20 max-w-[1280px] mx-auto px-6 space-y-12">
        <div className="text-left max-w-2xl space-y-2">
          <span className="text-xs uppercase tracking-widest font-bold text-[#800020]">
            Organic Care Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#17211C]">
            Care Crafted Around Life’s Natural Flow
          </h2>
          <p className="text-sm sm:text-base text-[#17211C]/80">
            Engineered as an asymmetric grid where each card reflects real-world clinical and
            familial priorities.
          </p>
        </div>

        {/* Row 1: 8-col vs 4-col */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Card 1 (8 cols): The Botanical Care Cadence */}
          <div className="lg:col-span-8 rounded-[12px] bg-[#FFFFF0] border border-[#CFB53B]/40 p-8 shadow-[0_2px_12px_rgba(23,33,28,0.06)] hover:scale-[1.01] transition-transform relative flex flex-col justify-between">
            <OrnateCorner position="top-right" className="absolute top-2 right-2 text-[#CFB53B]" />

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-[12px] bg-[#008080]/15 text-[#008080] flex items-center justify-center font-bold">
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-[#808000] uppercase tracking-wider">
                    Core Companion Module
                  </span>
                  <h3 className="text-2xl font-bold text-[#17211C]">
                    The Daily Companion Cadence
                  </h3>
                </div>
              </div>

              <p className="text-sm sm:text-base text-[#17211C]/80 leading-relaxed">
                Parents are not clinical tickets. Our companions provide respectful, dignified
                in-person presence: morning tea and conversation, accompanied neighborhood walks,
                grocery and medication pickup, doctor appointment navigation, and quiet peace of
                mind.
              </p>

              {/* Interactive task checklist demonstration */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-[12px] bg-[#FFFDD0]/60 border border-[#CFB53B]/30 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#008080] shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-[#17211C]">Doorstep Verification</p>
                    <p className="text-[11px] text-[#17211C]/70">Geo-fenced GPS arrival timestamp</p>
                  </div>
                </div>

                <div className="p-3 rounded-[12px] bg-[#FFFDD0]/60 border border-[#CFB53B]/30 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#008080] shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-[#17211C]">Medication Supervision</p>
                    <p className="text-[11px] text-[#17211C]/70">Pill organizer checks & dosage logs</p>
                  </div>
                </div>

                <div className="p-3 rounded-[12px] bg-[#FFFDD0]/60 border border-[#CFB53B]/30 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#008080] shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-[#17211C]">Vital Signs Recorded</p>
                    <p className="text-[11px] text-[#17211C]/70">BP, Sugar, Pulse, SpO2 logged</p>
                  </div>
                </div>

                <div className="p-3 rounded-[12px] bg-[#FFFDD0]/60 border border-[#CFB53B]/30 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#008080] shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-[#17211C]">Family Summary Report</p>
                    <p className="text-[11px] text-[#17211C]/70">Photographs and companion notes</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-[#CFB53B]/20 flex items-center justify-between flex-wrap gap-4">
              <span className="font-mono text-xs text-[#008080]">
                STATUS: 4,820 COMPLETED VISITS THIS MONTH
              </span>
              <Link
                to="/services"
                className="text-xs font-bold text-[#008080] hover:underline flex items-center gap-1"
              >
                <span>Read companion protocols</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 2 (4 cols): Stained-Glass Telemetry */}
          <div className="lg:col-span-4 rounded-[12px] bg-gradient-to-br from-[#FFFDD0] via-[#FFFFF0] to-[#E0B0FF]/20 border border-[#CFB53B]/40 p-8 shadow-[0_2px_12px_rgba(23,33,28,0.06)] relative flex flex-col justify-between">
            <OrnateCorner position="top-left" className="absolute top-2 left-2 text-[#CFB53B]" />

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-[12px] bg-[#005F9E]/15 text-[#005F9E] flex items-center justify-center font-bold">
                <Activity className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[11px] font-bold text-[#005F9E] uppercase tracking-wider">
                  Continuous Telemetry
                </span>
                <h3 className="text-xl font-bold text-[#17211C] mt-1">
                  Stained-Glass Vitals
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-[#17211C]/80 leading-relaxed">
                Passive, respectful health indicators that alert family doctors before minor
                discomfort turns into emergencies. Non-intrusive monitoring calibrated for Indian
                households.
              </p>

              <div className="p-3 rounded-[12px] bg-[#FFFFF0] border border-[#CFB53B]/30 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-[#17211C]/70">Blood Pressure</span>
                  <span className="font-mono font-bold text-[#008080]">124 / 82 mmHg</span>
                </div>
                <div className="w-full bg-[#CFB53B]/20 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#008080] h-full w-[85%]" />
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#17211C]/70">Blood Glucose (Fasting)</span>
                  <span className="font-mono font-bold text-[#808000]">102 mg/dL</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                to="/family/health"
                className="w-full inline-flex items-center justify-center py-2.5 rounded-[12px] border-[1.5px] border-[#CFB53B] text-[#008080] font-semibold text-xs hover:bg-[#008080]/5 transition-colors"
              >
                Inspect Health Metrics
              </Link>
            </div>
          </div>
        </div>

        {/* Row 2 (Zig-zag Inverted): 5 cols vs 7 cols */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-4">
          {/* Card 3 (5 cols): Whiplash Emergency Dispatch */}
          <div className="lg:col-span-5 rounded-[12px] bg-[#FFFFF0] border border-[#800020]/40 p-8 shadow-[0_2px_12px_rgba(128,0,32,0.08)] relative flex flex-col justify-between">
            <OrnateCorner position="bottom-left" className="absolute bottom-2 left-2 text-[#800020]" />

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-[12px] bg-[#800020]/15 text-[#800020] flex items-center justify-center font-bold">
                <AlertTriangle className="w-6 h-6 animate-pulse" />
              </div>

              <div>
                <span className="text-[11px] font-bold text-[#800020] uppercase tracking-wider">
                  Guaranteed Emergency Response
                </span>
                <h3 className="text-xl font-bold text-[#17211C] mt-1">
                  Whiplash SOS Dispatch
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-[#17211C]/80 leading-relaxed">
                When an elderly parent triggers their wearable SOS or clicks the giant red button in
                their app, our 24/7 medical response desk initiates immediate two-way audio,
                dispatches the nearest ambulance, and rushes an on-ground care manager to their door.
              </p>

              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#FFFDD0] border border-[#CFB53B]/30 text-xs">
                  <span className="font-semibold text-[#17211C]">National Police & Medical</span>
                  <span className="font-mono font-bold text-[#800020]">112</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#FFFDD0] border border-[#CFB53B]/30 text-xs">
                  <span className="font-semibold text-[#17211C]">Direct Ambulance Transit</span>
                  <span className="font-mono font-bold text-[#800020]">108</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#FFFDD0] border border-[#CFB53B]/30 text-xs">
                  <span className="font-semibold text-[#17211C]">National Elderline Support</span>
                  <span className="font-mono font-bold text-[#808000]">14567</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                to="/parent/sos"
                className="w-full inline-flex items-center justify-center py-2.5 rounded-[12px] bg-[#800020] text-[#FFFFF0] font-semibold text-xs hover:brightness-90 transition-all shadow-[0_2px_10px_rgba(128,0,32,0.25)]"
              >
                Inspect Emergency Protocol
              </Link>
            </div>
          </div>

          {/* Card 4 (7 cols): Family Sanctuary & Multi-Sibling Coordination */}
          <div className="lg:col-span-7 rounded-[12px] bg-[#FFFFF0] border border-[#CFB53B]/40 p-8 shadow-[0_2px_12px_rgba(23,33,28,0.06)] relative flex flex-col justify-between">
            <OrnateCorner position="bottom-right" className="absolute bottom-2 right-2 text-[#CFB53B]" />

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-[12px] bg-[#E0B0FF]/25 text-[#008080] flex items-center justify-center font-bold">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-[#008080] uppercase tracking-wider">
                    Distributed Family Hub
                  </span>
                  <h3 className="text-2xl font-bold text-[#17211C]">
                    Shared Family Sanctuary
                  </h3>
                </div>
              </div>

              <p className="text-sm sm:text-base text-[#17211C]/80 leading-relaxed">
                Whether you live in Singapore, the United States, or an apartment across town, you
                and your siblings can view the same visit confirmations, medicine logs, upcoming
                physician consultations, and personalized care manager reports without guesswork.
              </p>

              <div className="p-4 rounded-[12px] bg-[#FFFDD0]/70 border border-[#CFB53B]/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#008080]" />
                    <span className="text-xs font-bold text-[#17211C]">
                      Caregiver Visit Completed (Indore)
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-[#17211C]/60">10:45 AM</span>
                </div>
                <p className="text-xs text-[#17211C]/75 italic pl-4 border-l-2 border-[#008080]">
                  "Uncle Rajesh went for his 20-minute morning garden stroll, blood pressure checked
                  normal at 122/80. Fresh oranges purchased from the market."
                </p>
                <div className="flex items-center gap-2 text-[11px] text-[#008080] font-semibold pl-4">
                  <Check className="w-3.5 h-3.5" />
                  <span>Verified by Care Coordinator Dr. Madhavi Sharma</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-[#CFB53B]/20 flex items-center justify-between flex-wrap gap-4">
              <span className="text-xs text-[#17211C]/70">
                Multi-user roles for siblings, doctors & authorized relatives
              </span>
              <Link
                to="/family"
                className="text-xs font-bold text-[#008080] hover:underline flex items-center gap-1"
              >
                <span>Enter Family Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Whiplash Botanical Section Divider */}
      <WhiplashDivider />

      {/* =========================================================================
          SECTION 4: INTERACTIVE SAAS WORKBENCH / TEMPLATE SHOWCASE
          Interactive tabs, responsive layout, live state updates
          ========================================================================= */}
      <section className="py-12 sm:py-20 max-w-[1280px] mx-auto px-6">
        <div className="rounded-[12px] bg-[#FFFFF0] border border-[#CFB53B]/60 shadow-[0_4px_20px_rgba(23,33,28,0.08)] p-6 sm:p-10 relative overflow-hidden">
          <OrnateCorner position="top-left" className="absolute top-2 left-2 text-[#CFB53B]" />
          <OrnateCorner position="top-right" className="absolute top-2 right-2 text-[#CFB53B]" />

          <div className="text-center max-w-2xl mx-auto space-y-3 mb-8">
            <span className="text-xs uppercase font-bold tracking-widest text-[#008080]">
              Interactive SaaS Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#17211C]">
              Experience the Florido Engine
            </h2>
            <p className="text-sm text-[#17211C]/80">
              Test how organic design principles structure complex eldercare logistics and live data
              streams.
            </p>

            {/* Tab Controls */}
            <div className="inline-flex p-1 rounded-[12px] bg-[#FFFDD0] border border-[#CFB53B]/40 gap-1 mt-4">
              <button
                onClick={() => setActiveTab('schedule')}
                className={`px-4 py-2 rounded-[8px] text-xs font-semibold transition-all ${
                  activeTab === 'schedule'
                    ? 'bg-[#008080] text-[#FFFFF0] shadow-sm'
                    : 'text-[#17211C]/80 hover:text-[#008080]'
                }`}
              >
                Companion Cadence
              </button>
              <button
                onClick={() => setActiveTab('vitals')}
                className={`px-4 py-2 rounded-[8px] text-xs font-semibold transition-all ${
                  activeTab === 'vitals'
                    ? 'bg-[#008080] text-[#FFFFF0] shadow-sm'
                    : 'text-[#17211C]/80 hover:text-[#008080]'
                }`}
              >
                Telemetry Simulator
              </button>
              <button
                onClick={() => setActiveTab('tokens')}
                className={`px-4 py-2 rounded-[8px] text-xs font-semibold transition-all ${
                  activeTab === 'tokens'
                    ? 'bg-[#008080] text-[#FFFFF0] shadow-sm'
                    : 'text-[#17211C]/80 hover:text-[#008080]'
                }`}
              >
                Design System Tokens
              </button>
            </div>
          </div>

          {/* Tab 1: Companion Scheduling */}
          {activeTab === 'schedule' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-2">
              <div className="space-y-4 text-left">
                <h4 className="text-xl font-bold text-[#17211C]">
                  Configure Parent Companion Rhythm
                </h4>
                <p className="text-xs sm:text-sm text-[#17211C]/80 leading-relaxed">
                  Select visit frequency and companion tier. The Florido scheduling algorithm balances
                  caregiver proximity with personalized medical backgrounds.
                </p>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-[#17211C] uppercase tracking-wider">
                    Select Cadence
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'daily', label: 'Daily Visits', sub: 'Every morning' },
                      { id: 'alternate', label: '3x Weekly', sub: 'Mon, Wed, Fri' },
                      { id: 'weekend', label: 'Weekend Respite', sub: 'Sat & Sun' }
                    ].map((tier) => (
                      <button
                        key={tier.id}
                        type="button"
                        onClick={() => setSelectedCompanionTier(tier.id)}
                        className={`p-3 rounded-[12px] border text-left transition-all ${
                          selectedCompanionTier === tier.id
                            ? 'border-[#008080] bg-[#008080]/10 text-[#008080] font-bold'
                            : 'border-[#CFB53B]/30 bg-[#FFFFF0] text-[#17211C]'
                        }`}
                      >
                        <p className="text-xs font-bold">{tier.label}</p>
                        <p className="text-[10px] text-[#17211C]/60 mt-0.5">{tier.sub}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-[#17211C] uppercase tracking-wider">
                    Next Scheduled Doorstep Arrival
                  </label>
                  <input
                    type="text"
                    value={scheduledDay}
                    onChange={(e) => setScheduledDay(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-[12px] bg-[#FFFFF0] border border-[#CFB53B]/50 text-xs text-[#17211C] focus:outline-none focus:ring-2 focus:ring-[#008080] focus:ring-offset-2"
                  />
                </div>
              </div>

              {/* Simulation Result Card */}
              <div className="p-6 rounded-[12px] bg-[#FFFDD0] border border-[#CFB53B]/50 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#008080] uppercase tracking-wider">
                    Cadence Preview
                  </span>
                  <span className="font-mono text-xs bg-[#FFFFF0] px-2 py-0.5 rounded border border-[#CFB53B]/40">
                    TIER: {selectedCompanionTier.toUpperCase()}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-[#CFB53B]/20">
                    <span className="text-[#17211C]/70">Designated Companion:</span>
                    <span className="font-bold text-[#17211C]">{companionName}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#CFB53B]/20">
                    <span className="text-[#17211C]/70">Scheduled Window:</span>
                    <span className="font-bold text-[#008080]">{scheduledDay}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#CFB53B]/20">
                    <span className="text-[#17211C]/70">Verification Protocol:</span>
                    <span className="font-bold text-[#17211C]">Biometric + GPS Geo-Fence</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-[#17211C]/70">Family Notification:</span>
                    <span className="font-bold text-[#808000]">WhatsApp & Dashboard Push</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => alert(`Cadence saved for ${companionName} (${scheduledDay})`)}
                  className="w-full py-2.5 rounded-[12px] bg-[#008080] text-[#FFFFF0] text-xs font-semibold hover:brightness-90 active:translate-y-[1px] transition-all shadow-[0_2px_8px_rgba(0,128,128,0.25)]"
                >
                  Confirm Companion Route
                </button>
              </div>
            </div>
          )}

          {/* Tab 2: Telemetry Simulator */}
          {activeTab === 'vitals' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-2">
              <div className="space-y-4 text-left">
                <h4 className="text-xl font-bold text-[#17211C]">
                  Simulate Live Telemetry Conditions
                </h4>
                <p className="text-xs sm:text-sm text-[#17211C]/80 leading-relaxed">
                  Toggle between nominal rhythms and elevated readings to inspect how the
                  Art Nouveau Florido alert system initiates escalation.
                </p>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setVitalSimulation('nominal')}
                    className={`px-4 py-2.5 rounded-[12px] text-xs font-bold border transition-all ${
                      vitalSimulation === 'nominal'
                        ? 'bg-[#808000] text-[#FFFFF0] border-[#808000]'
                        : 'bg-[#FFFFF0] text-[#17211C] border-[#CFB53B]/40'
                    }`}
                  >
                    Nominal Condition (Normal)
                  </button>

                  <button
                    onClick={() => setVitalSimulation('elevated')}
                    className={`px-4 py-2.5 rounded-[12px] text-xs font-bold border transition-all ${
                      vitalSimulation === 'elevated'
                        ? 'bg-[#800020] text-[#FFFFF0] border-[#800020]'
                        : 'bg-[#FFFFF0] text-[#17211C] border-[#CFB53B]/40'
                    }`}
                  >
                    Elevated Systolic Alert
                  </button>
                </div>
              </div>

              {/* Display Box */}
              <div
                className={`p-6 rounded-[12px] border transition-all ${
                  vitalSimulation === 'nominal'
                    ? 'bg-[#FFFFF0] border-[#808000]/40'
                    : 'bg-[#FFFFF0] border-[#800020]/60 ring-2 ring-[#800020]/20'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                      vitalSimulation === 'nominal'
                        ? 'bg-[#808000]/15 text-[#808000]'
                        : 'bg-[#800020]/15 text-[#800020]'
                    }`}
                  >
                    {vitalSimulation === 'nominal' ? 'Patient Stable' : 'Triage Escalation Active'}
                  </span>
                  <span className="font-mono text-xs text-[#17211C]/60">SAMPLE ID: SAH-9812</span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[#17211C]/70">Blood Pressure:</span>
                    <span
                      className={`font-mono font-bold ${
                        vitalSimulation === 'nominal' ? 'text-[#008080]' : 'text-[#800020]'
                      }`}
                    >
                      {vitalSimulation === 'nominal' ? '120 / 78 mmHg' : '158 / 98 mmHg (High)'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[#17211C]/70">Resting Heart Rate:</span>
                    <span className="font-mono font-bold text-[#17211C]">
                      {vitalSimulation === 'nominal' ? '72 BPM' : '96 BPM'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[#17211C]/70">Doctor Response:</span>
                    <span className="font-semibold text-xs text-[#17211C]">
                      {vitalSimulation === 'nominal'
                        ? 'Routine logging only'
                        : 'Dr. Madhavi alerted; teleconsult link generated'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Design System Tokens */}
          {activeTab === 'tokens' && (
            <div className="space-y-6 pt-2 text-left">
              <h4 className="text-xl font-bold text-[#17211C]">
                Art Nouveau Florido Design Tokens
              </h4>

              {/* Color swatch grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-[12px] bg-[#008080] text-[#FFFFF0] space-y-1">
                  <p className="text-xs font-bold">Deep Teal</p>
                  <p className="font-mono text-[11px] opacity-90">#008080</p>
                  <p className="text-[10px] opacity-80">Primary & Links</p>
                </div>

                <div className="p-3 rounded-[12px] bg-[#CFB53B] text-[#17211C] space-y-1">
                  <p className="text-xs font-bold">Old Gold</p>
                  <p className="font-mono text-[11px] opacity-90">#CFB53B</p>
                  <p className="text-[10px] opacity-80">Secondary & Accents</p>
                </div>

                <div className="p-3 rounded-[12px] bg-[#E0B0FF] text-[#17211C] space-y-1">
                  <p className="text-xs font-bold">Mauve</p>
                  <p className="font-mono text-[11px] opacity-90">#E0B0FF</p>
                  <p className="text-[10px] opacity-80">Tertiary Support</p>
                </div>

                <div className="p-3 rounded-[12px] bg-[#FFFFF0] border border-[#CFB53B] text-[#17211C] space-y-1">
                  <p className="text-xs font-bold">Ivory</p>
                  <p className="font-mono text-[11px] opacity-90">#FFFFF0</p>
                  <p className="text-[10px] opacity-80">Neutral Surface</p>
                </div>

                <div className="p-3 rounded-[12px] bg-[#808000] text-[#FFFFF0] space-y-1">
                  <p className="text-xs font-bold">Olive Green</p>
                  <p className="font-mono text-[11px] opacity-90">#808000</p>
                  <p className="text-[10px] opacity-80">Surface & Success</p>
                </div>

                <div className="p-3 rounded-[12px] bg-[#800020] text-[#FFFFF0] space-y-1">
                  <p className="text-xs font-bold">Burgundy</p>
                  <p className="font-mono text-[11px] opacity-90">#800020</p>
                  <p className="text-[10px] opacity-80">Emergency Accent</p>
                </div>

                <div className="p-3 rounded-[12px] bg-[#005F9E] text-[#FFFFF0] space-y-1">
                  <p className="text-xs font-bold">Peacock Blue</p>
                  <p className="font-mono text-[11px] opacity-90">#005F9E</p>
                  <p className="text-[10px] opacity-80">Secondary Accent</p>
                </div>

                <div className="p-3 rounded-[12px] bg-[#FFFDD0] border border-[#CFB53B] text-[#17211C] space-y-1">
                  <p className="text-xs font-bold">Cream</p>
                  <p className="font-mono text-[11px] opacity-90">#FFFDD0</p>
                  <p className="text-[10px] opacity-80">Warm Canvas</p>
                </div>
              </div>

              {/* Typography Spec */}
              <div className="p-4 rounded-[12px] bg-[#FFFDD0] border border-[#CFB53B]/40 space-y-2 text-xs">
                <p className="font-bold text-[#17211C]">
                  Typography: Quattrocento (Display 700 / Body 400) & JetBrains Mono
                </p>
                <p className="text-[#17211C]/80">
                  Scale: Hero clamp(2.5rem, 5vw, 4rem) · H1 2.25rem · H2 1.5rem · Body 1rem (line-height 1.6) · Base corner radius: 12px
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Whiplash Botanical Section Divider */}
      <WhiplashDivider />

      {/* =========================================================================
          SECTION 5: ASYMMETRIC PRICING & SANCTUARY MEMBERSHIPS (No 3 equal columns!)
          Layout: 5 cols (Essential) vs 7 cols (Belle Époque Sanctuary)
          ========================================================================= */}
      <section className="py-12 sm:py-20 max-w-[1280px] mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-[#800020]">
            Transparent Subscriptions
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#17211C]">
            Memberships Rooted in Integrity
          </h2>
          <p className="text-sm sm:text-base text-[#17211C]/80">
            No hidden clauses. Every plan includes guaranteed 24/7 emergency dispatch and verified
            companion logs.
          </p>
        </div>

        {/* Asymmetric 5:7 Plan Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Plan 1 (5 cols): Atelier Companion */}
          <div className="lg:col-span-5 rounded-[12px] bg-[#FFFFF0] border border-[#CFB53B]/40 p-8 shadow-[0_2px_12px_rgba(23,33,28,0.06)] flex flex-col justify-between relative">
            <OrnateCorner position="top-left" className="absolute top-2 left-2 text-[#CFB53B]" />

            <div className="space-y-6">
              <div>
                <span className="text-[11px] font-bold text-[#008080] uppercase tracking-wider">
                  Foundational Care
                </span>
                <h3 className="text-2xl font-bold text-[#17211C] mt-1">Atelier Essential</h3>
                <p className="text-xs text-[#17211C]/75 mt-1">
                  Ideal for independent parents who require regular companionship and emergency
                  protection.
                </p>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-[#17211C]">₹4,999</span>
                <span className="text-xs text-[#17211C]/60">/ month</span>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-[#17211C]/85">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#008080] shrink-0" />
                  <span>3 In-Person Companion Visits / week (2 hrs each)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#008080] shrink-0" />
                  <span>24/7 Emergency SOS Monitoring (India National Desk)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#008080] shrink-0" />
                  <span>Weekly Vital Check (BP, Pulse, Blood Glucose)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#008080] shrink-0" />
                  <span>Family Portal Access (up to 3 family members)</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <Link
                to="/pricing"
                className="w-full inline-flex items-center justify-center py-3 rounded-[12px] border-[1.5px] border-[#CFB53B] text-[#008080] font-semibold text-sm hover:bg-[#008080]/5 transition-all"
              >
                Choose Atelier Essential
              </Link>
            </div>
          </div>

          {/* Plan 2 (7 cols): Belle Époque Sanctuary (Highlighted) */}
          <div className="lg:col-span-7 rounded-[12px] bg-gradient-to-br from-[#FFFDD0] via-[#FFFFF0] to-[#E0B0FF]/25 border-2 border-[#CFB53B] p-8 sm:p-10 shadow-[0_8px_24px_rgba(207,181,59,0.2)] flex flex-col justify-between relative overflow-hidden">
            <OrnateCorner position="top-right" className="absolute top-2 right-2 text-[#CFB53B]" />
            <OrnateCorner position="bottom-right" className="absolute bottom-2 right-2 text-[#CFB53B]" />

            <div className="space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <span className="text-[11px] font-bold text-[#800020] uppercase tracking-wider bg-[#FFFDD0] px-3 py-0.5 rounded-full border border-[#CFB53B]">
                    Most Recommended
                  </span>
                  <h3 className="text-3xl font-bold text-[#17211C] mt-1.5">
                    Belle Époque Sanctuary
                  </h3>
                </div>
                <div className="font-mono text-xs text-[#008080] bg-[#FFFFF0] px-3 py-1 rounded-md border border-[#008080]/30">
                  ALL-INCLUSIVE CONCIERGE
                </div>
              </div>

              <p className="text-sm text-[#17211C]/80 leading-relaxed">
                Full-spectrum peace of mind for families living at a distance. Includes daily
                verified visits, dedicated physician review, ambulance priority dispatch, and
                medication refills delivered to the doorstep.
              </p>

              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-[#17211C]">₹9,999</span>
                <span className="text-xs text-[#17211C]/60">/ month · Billed annually or quarterly</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-[#17211C]/85">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#008080] shrink-0" />
                  <span>Daily In-Person Visits (7 days / week)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#008080] shrink-0" />
                  <span>Dedicated Care Manager & Doctor Review</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#008080] shrink-0" />
                  <span>Priority Ambulance & Hospital Escort</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#008080] shrink-0" />
                  <span>Medicine Refills & Grocery Logistics</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#008080] shrink-0" />
                  <span>Unlimited Sibling & Relative Accounts</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#008080] shrink-0" />
                  <span>Daily Vital Telemetry & Doctor Notes</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <Link
                to="/pricing"
                className="w-full inline-flex items-center justify-center py-3.5 rounded-[12px] bg-[#008080] hover:bg-[#006666] text-[#FFFFF0] font-semibold text-base transition-all shadow-[0_4px_16px_rgba(0,128,128,0.25)] active:translate-y-[1px]"
              >
                <span>Enroll in Belle Époque Sanctuary</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Whiplash Botanical Section Divider */}
      <WhiplashDivider />

      {/* =========================================================================
          SECTION 6: CONSULTATION & INPUT DEMO (Strict Component Specification)
          Label above input, 1px border stroke, focus ring 2px accent offset 2px,
          error below in red, no floating labels.
          ========================================================================= */}
      <section className="py-12 sm:py-20 max-w-[1280px] mx-auto px-6">
        <div className="max-w-2xl mx-auto rounded-[12px] bg-[#FFFFF0] border border-[#CFB53B]/50 p-8 sm:p-12 shadow-[0_2px_12px_rgba(23,33,28,0.06)] relative">
          <OrnateCorner position="top-left" className="absolute top-2 left-2 text-[#CFB53B]" />
          <OrnateCorner position="bottom-right" className="absolute bottom-2 right-2 text-[#CFB53B]" />

          <div className="text-center space-y-2 mb-8">
            <span className="text-xs uppercase font-bold tracking-widest text-[#008080]">
              Personalized Family Consultation
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#17211C]">
              Request a Complimentary Care Assessment
            </h2>
            <p className="text-xs sm:text-sm text-[#17211C]/80">
              Our clinical director will reach out within 4 business hours to evaluate your parents'
              routine and match a verified companion in their neighborhood.
            </p>
          </div>

          {formSubmitted ? (
            <div className="p-6 rounded-[12px] bg-[#FFFDD0] border border-[#008080] text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#008080]/15 text-[#008080] mx-auto flex items-center justify-center">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-[#17211C]">
                Thank you, {consultationName}!
              </h4>
              <p className="text-xs text-[#17211C]/80 leading-relaxed">
                Your consultation request for {consultationCity} has been logged in our coordinator
                registry. Our team will contact you at {consultationPhone} shortly.
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="text-xs font-semibold text-[#008080] underline pt-2"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleConsultationSubmit} className="space-y-5 text-left">
              {/* Input 1: Name */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#17211C] uppercase tracking-wider">
                  Full Name (Family Coordinator or Parent)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Vikramaditya Sharma"
                  value={consultationName}
                  onChange={(e) => setConsultationName(e.target.value)}
                  className="w-full px-4 py-3 rounded-[12px] bg-[#FFFFF0] border border-[#CFB53B]/50 text-sm text-[#17211C] focus:outline-none focus:ring-2 focus:ring-[#008080] focus:ring-offset-2 transition-all placeholder-[#17211C]/40"
                />
              </div>

              {/* Input 2: Contact Phone */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#17211C] uppercase tracking-wider">
                  Phone Number (with WhatsApp capability)
                </label>
                <input
                  type="tel"
                  placeholder="e.g. +91 98234 56789"
                  value={consultationPhone}
                  onChange={(e) => setConsultationPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-[12px] bg-[#FFFFF0] border border-[#CFB53B]/50 text-sm text-[#17211C] focus:outline-none focus:ring-2 focus:ring-[#008080] focus:ring-offset-2 transition-all placeholder-[#17211C]/40"
                />
              </div>

              {/* Input 3: City Select */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#17211C] uppercase tracking-wider">
                  City in India
                </label>
                <select
                  value={consultationCity}
                  onChange={(e) => setConsultationCity(e.target.value)}
                  className="w-full px-4 py-3 rounded-[12px] bg-[#FFFFF0] border border-[#CFB53B]/50 text-sm text-[#17211C] focus:outline-none focus:ring-2 focus:ring-[#008080] focus:ring-offset-2 transition-all"
                >
                  <option value="Bengaluru">Bengaluru, Karnataka</option>
                  <option value="Indore">Indore, Madhya Pradesh</option>
                  <option value="Delhi-NCR">Delhi NCR (Gurugram / Noida / Delhi)</option>
                  <option value="Mumbai">Mumbai & Navi Mumbai</option>
                  <option value="Pune">Pune, Maharashtra</option>
                  <option value="Hyderabad">Hyderabad, Telangana</option>
                  <option value="Other">Other Metro or Tier-2 City</option>
                </select>
              </div>

              {/* Error text below in semantic red (#800020) */}
              {formError && (
                <p className="text-xs font-semibold text-[#800020]">{formError}</p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-[12px] bg-[#008080] hover:bg-[#006666] text-[#FFFFF0] font-semibold text-sm sm:text-base active:translate-y-[1px] transition-all shadow-[0_2px_12px_rgba(0,128,128,0.2)]"
              >
                Schedule Free Assessment
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Whiplash Botanical Section Divider */}
      <WhiplashDivider />

      {/* =========================================================================
          SECTION 7: DEDICATED PORTAL ACCESS CARDS (No Emojis!)
          Quick links for Family, Elder, and Caregiver portals
          ========================================================================= */}
      <section className="py-12 sm:py-20 max-w-[1280px] mx-auto px-6">
        <div className="text-left max-w-xl space-y-2 mb-8">
          <span className="text-xs uppercase font-bold tracking-widest text-[#008080]">
            Portal Gateways
          </span>
          <h2 className="text-3xl font-bold text-[#17211C]">Dedicated Portals</h2>
          <p className="text-sm text-[#17211C]/80">
            Tailored interfaces designed specifically for family members, senior parents, and
            certified companions.
          </p>
        </div>

        {/* Asymmetric 4-col / 4-col / 4-col or varied cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/family"
            className="p-6 rounded-[12px] bg-[#FFFFF0] border border-[#CFB53B]/40 shadow-[0_2px_12px_rgba(23,33,28,0.06)] hover:scale-[1.03] transition-all group text-left"
          >
            <div className="w-10 h-10 rounded-[12px] bg-[#008080]/15 text-[#008080] flex items-center justify-center font-bold mb-4">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#17211C] text-lg group-hover:text-[#008080] transition-colors">
              Family Sanctuary Portal
            </h3>
            <p className="text-xs text-[#17211C]/75 mt-1 leading-relaxed">
              Live location tracking, caregiver visit documentation, health trends, and appointment
              calendar.
            </p>
            <div className="mt-4 pt-3 border-t border-[#CFB53B]/20 flex items-center text-xs font-semibold text-[#008080]">
              <span>Enter Family Hub</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            to="/parent"
            className="p-6 rounded-[12px] bg-[#FFFFF0] border border-[#CFB53B]/40 shadow-[0_2px_12px_rgba(23,33,28,0.06)] hover:scale-[1.03] transition-all group text-left"
          >
            <div className="w-10 h-10 rounded-[12px] bg-[#808000]/15 text-[#808000] flex items-center justify-center font-bold mb-4">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#17211C] text-lg group-hover:text-[#808000] transition-colors">
              Senior Parent Interface
            </h3>
            <p className="text-xs text-[#17211C]/75 mt-1 leading-relaxed">
              High-contrast, large text controls with one-tap emergency SOS, picture medication
              reminders, and voice assistance.
            </p>
            <div className="mt-4 pt-3 border-t border-[#CFB53B]/20 flex items-center text-xs font-semibold text-[#808000]">
              <span>Open Parent View</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            to="/caregiver"
            className="p-6 rounded-[12px] bg-[#FFFFF0] border border-[#CFB53B]/40 shadow-[0_2px_12px_rgba(23,33,28,0.06)] hover:scale-[1.03] transition-all group text-left"
          >
            <div className="w-10 h-10 rounded-[12px] bg-[#005F9E]/15 text-[#005F9E] flex items-center justify-center font-bold mb-4">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#17211C] text-lg group-hover:text-[#005F9E] transition-colors">
              Caregiver & Nurse Portal
            </h3>
            <p className="text-xs text-[#17211C]/75 mt-1 leading-relaxed">
              Assigned daily itineraries, GPS navigation, clinical checklist logging, and doctor
              teleconsultation dispatch.
            </p>
            <div className="mt-4 pt-3 border-t border-[#CFB53B]/20 flex items-center text-xs font-semibold text-[#005F9E]">
              <span>Access Caregiver View</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
};
