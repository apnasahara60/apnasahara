import React from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  Shield,
  PhoneCall,
  MapPin,
  Activity,
  Calendar,
  CheckCircle,
  Star,
  ArrowRight,
  Sparkles,
  Users,
  Clock,
  Award
} from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-20 pb-20 overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 bg-gradient-to-b from-brand-50/70 via-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-100/80 border border-brand-200 text-brand-800 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                India’s Most Trusted Eldercare & Family Peace Platform
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
                Loving Care for Parents, <br className="hidden sm:inline" />
                <span className="text-brand-600 underline decoration-brand-300 decoration-wavy decoration-2">
                  True Peace of Mind
                </span> for You.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Whether you live across the city or across the globe, ApnaSahara ensures your aging parents in India receive verified in-person caregivers, continuous vital tracking, daily medication adherence, and guaranteed 24/7 emergency SOS coordination.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/family"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-base shadow-lg shadow-brand-600/30 flex items-center justify-center gap-2 transition-all hover:scale-105"
                >
                  Explore Family Portal
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <Link
                  to="/parent"
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-base shadow-md flex items-center justify-center gap-2 transition-all hover:scale-105"
                >
                  <span>👴</span> Open Senior Portal
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 text-center lg:text-left">
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-slate-900">10,000+</p>
                  <p className="text-xs text-slate-500 font-medium">Care Visits Completed</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-brand-600">&lt; 8 Mins</p>
                  <p className="text-xs text-slate-500 font-medium">Avg. SOS Dispatch Response</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-slate-900">4.9 / 5.0</p>
                  <p className="text-xs text-slate-500 font-medium">Family Rating Score</p>
                </div>
              </div>
            </div>

            {/* Right Interactive Preview Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200/80 p-6 space-y-5">
                {/* Header preview */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
                      alt="Parent"
                      className="w-12 h-12 rounded-2xl object-cover border-2 border-emerald-500"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">Shri Ramesh Sharma</h4>
                      <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Safe at Home • Sector 62
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-200">
                    Active Care
                  </span>
                </div>

                {/* Vitals Snapshot */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">Blood Pressure</span>
                      <Activity className="w-4 h-4 text-emerald-600" />
                    </div>
                    <p className="text-xl font-black text-slate-900 mt-1">124 / 82</p>
                    <span className="text-[10px] text-emerald-600 font-bold">Normal • 07:30 AM</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">Fasting Sugar</span>
                      <Heart className="w-4 h-4 text-blue-600" />
                    </div>
                    <p className="text-xl font-black text-slate-900 mt-1">118 mg/dL</p>
                    <span className="text-[10px] text-blue-600 font-bold">Stable • Morning</span>
                  </div>
                </div>

                {/* Live Caregiver Visit status card */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/80">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-emerald-900">Today's Scheduled Visit</span>
                    <span className="text-[11px] font-bold text-emerald-700 bg-white/80 px-2 py-0.5 rounded-full border border-emerald-200">
                      En Route (12m away)
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80"
                      alt="Caregiver"
                      className="w-10 h-10 rounded-xl object-cover border"
                    />
                    <div className="text-xs">
                      <p className="font-bold text-slate-900">Priya Verma</p>
                      <p className="text-slate-500">Verified GDA Nurse • ⭐ 4.9</p>
                    </div>
                  </div>
                </div>

                {/* SOS Button simulation */}
                <div className="pt-2">
                  <Link
                    to="/parent/sos"
                    className="w-full py-3.5 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 transition-all hover:scale-[1.02]"
                  >
                    <span className="w-3 h-3 rounded-full bg-white animate-ping" />
                    Simulate Emergency SOS Button
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Pillars / Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <h2 className="text-xs uppercase font-extrabold tracking-widest text-brand-600">
            Comprehensive Support
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Everything Your Parents Need, In One Place
          </h3>
          <p className="text-base text-slate-600">
            Designed specifically for Indian families and NRI children who want uncompromising medical vigilance and warm companionship for their parents.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-brand-300 hover:shadow-xl transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center font-bold">
              <PhoneCall className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-slate-900">24/7 Rapid SOS Coordination</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              One-touch SOS button on the elder’s phone immediately alerts family, sends nearest verified Sahayak, and dispatches national ambulance (108/112) with zero delay.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-brand-300 hover:shadow-xl transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
              <Shield className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-slate-900">Police-Verified Caregivers</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Every caregiver undergoes strict 4-step vetting: Aadhaar e-KYC, criminal police verification, GDA/nursing certification check, and compassionate elder sensitivity training.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-brand-300 hover:shadow-xl transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
              <Activity className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-slate-900">Continuous Vital Monitoring</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Track Blood Pressure, Blood Sugar, SpO2, and weight with automated historical trend charts and AI-assisted anomaly detection that alerts you before symptoms worsen.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-brand-300 hover:shadow-xl transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
              <MapPin className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-slate-900">Live GPS & Geofence Radar</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Real-time location radar with custom home safe-zones. Receive instant alerts if a wandering-prone elder steps outside the designated society boundary.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-brand-300 hover:shadow-xl transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
              <Calendar className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-slate-900">Doctor Visit Accompaniment</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Never let your parent navigate crowded clinics alone. A verified Sahayak accompanies them door-to-door, takes notes, and uploads prescriptions right to your app.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-brand-300 hover:shadow-xl transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-600 flex items-center justify-center font-bold">
              <Heart className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-slate-900">Mental Wellness & Companionship</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Combat loneliness through regular warm visits, chai & conversations, news reading, park walks, and setup of video calls with children and grandchildren.
            </p>
          </div>
        </div>
      </section>

      {/* 4 Dedicated Portals Showcase Banner */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-3xl font-extrabold">4 Dedicated Web Portals</h3>
            <p className="text-slate-400 text-sm mt-2">
              Every user role has an interface tailored to their exact workflow, cognitive comfort, and responsibilities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              to="/family"
              className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 hover:border-emerald-500 hover:bg-slate-800 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition-transform">
                👨‍👩‍👧
              </div>
              <h4 className="font-bold text-lg text-white">Family Web Portal</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Complete oversight: vitals, live GPS radar, caregiver ETA, visit reports, and subscription management.
              </p>
              <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-bold mt-4">
                Launch Portal <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>

            <Link
              to="/parent"
              className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 hover:border-amber-500 hover:bg-slate-800 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition-transform">
                👴
              </div>
              <h4 className="font-bold text-lg text-white">Elderly Parent Portal</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Super simplified interface: Giant SOS button, big medication buttons, today's visitor photo, and speed dials.
              </p>
              <span className="inline-flex items-center gap-1 text-xs text-amber-400 font-bold mt-4">
                Launch Portal <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>

            <Link
              to="/caregiver"
              className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 hover:border-blue-500 hover:bg-slate-800 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition-transform">
                🩺
              </div>
              <h4 className="font-bold text-lg text-white">Caregiver Portal</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Task manager, GPS check-in/out, turn-by-turn navigation, vital recording form, and shift availability.
              </p>
              <span className="inline-flex items-center gap-1 text-xs text-blue-400 font-bold mt-4">
                Launch Portal <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>

            <Link
              to="/admin"
              className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 hover:border-purple-500 hover:bg-slate-800 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition-transform">
                🛡️
              </div>
              <h4 className="font-bold text-lg text-white">Admin Operations</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Caregiver background verification queue, live SOS dispatch room, MRR analytics, and system audit logs.
              </p>
              <span className="inline-flex items-center gap-1 text-xs text-purple-400 font-bold mt-4">
                Launch Portal <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h3 className="text-3xl font-extrabold text-slate-900">Heartfelt Stories From Families</h3>
          <p className="text-slate-600 text-sm mt-2">
            Real experiences from sons and daughters managing eldercare across cities and continents.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
            </div>
            <p className="text-sm text-slate-600 italic leading-relaxed">
              "Being in San Jose while my 74-year-old father is in Noida was agonizing. ApnaSahara changed everything. I see his morning BP every single day, and Caregiver Priya is like family now."
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-sm">
                AK
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm">Ankit Kapoor</p>
                <p className="text-xs text-slate-500">Software Architect, California (Parents in NCR)</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
            </div>
            <p className="text-sm text-slate-600 italic leading-relaxed">
              "When mummy had sudden chest tightness at 2 AM, the SOS button connected directly to their emergency coordinator. The ambulance arrived in 9 minutes and they stayed by her side at Fortis."
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-sm">
                RM
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm">Ritu Malhotra</p>
                <p className="text-xs text-slate-500">Bangalore (Mother in Delhi)</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
            </div>
            <p className="text-sm text-slate-600 italic leading-relaxed">
              "The senior portal is wonderfully easy. My grandfather who hates complicated smartphone apps actually uses the giant medicine reminders and taps 'Called Sahayak' with zero confusion."
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-800 font-bold flex items-center justify-center text-sm">
                VG
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm">Varun Garg</p>
                <p className="text-xs text-slate-500">Gurugram</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-tr from-brand-700 via-brand-600 to-emerald-500 text-white text-center space-y-6 shadow-2xl">
          <h3 className="text-3xl sm:text-4xl font-black">
            Give Your Parents the Support They Deserve
          </h3>
          <p className="text-base sm:text-lg text-emerald-100 max-w-2xl mx-auto">
            Get started in 3 minutes. Test the platform, try the demo profiles, and experience what genuine eldercare peace of mind feels like.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/family"
              className="px-8 py-4 rounded-2xl bg-white text-brand-700 hover:bg-slate-50 font-black text-base shadow-lg transition-transform hover:scale-105"
            >
              Start Free Exploration
            </Link>
            <Link
              to="/pricing"
              className="px-7 py-4 rounded-2xl bg-brand-800/60 hover:bg-brand-800 text-white font-bold text-base border border-white/20 transition-colors"
            >
              View Subscription Plans
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
