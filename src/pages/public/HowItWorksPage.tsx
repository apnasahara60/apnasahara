import React from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, UserCheck, Stethoscope, ShieldCheck, ArrowRight, Smartphone, Bell, HeartHandshake } from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Sign Up & Profile Creation',
      desc: 'Set up your family account in 2 minutes. Enter your parent’s address, emergency contacts, medical history (BP, diabetes, allergies), and preferred language.',
      icon: <UserPlus className="w-6 h-6 text-emerald-600" />
    },
    {
      num: '02',
      title: 'Dedicated Caregiver Matching',
      desc: 'Our operations team assigns a police-verified, certified General Duty Assistant (Sahayak) residing in your parent’s immediate locality for rapid response times.',
      icon: <UserCheck className="w-6 h-6 text-blue-600" />
    },
    {
      num: '03',
      title: 'Install Elder-Friendly Portal & SOS Beacon',
      desc: 'We configure the simplified Elder Portal on your parent’s phone with extra-large buttons, one-tap SOS emergency trigger, and picture-based reminders.',
      icon: <Smartphone className="w-6 h-6 text-amber-600" />
    },
    {
      num: '04',
      title: 'Live Tracking, Reports & 24/7 Peace of Mind',
      desc: 'Receive push notifications after each visit with vitals recorded, tasks completed, photos, caregiver notes, and live GPS location radar anytime you check in.',
      icon: <ShieldCheck className="w-6 h-6 text-purple-600" />
    }
  ];

  return (
    <div className="py-12 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase font-extrabold tracking-widest text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
            Simple 4-Step Process
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            How ApnaSahara Works For Your Family
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            A seamless bridge connecting families abroad or in other cities with dedicated, on-ground caregivers in India.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all relative group"
            >
              <div className="text-4xl font-black text-slate-200 group-hover:text-brand-200 transition-colors mb-4">
                {s.num}
              </div>
              <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-4">
                {s.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{s.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Interactive workflow showcase */}
        <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-slate-900 text-white space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold">During An Emergency (SOS Workflow)</h3>
            <p className="text-xs sm:text-sm text-slate-400">
              When seconds count, here is the exact protocol executed by ApnaSahara:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-800/90 border border-slate-700 space-y-3">
              <span className="text-xs font-bold text-red-400">Step 1 • T + 0 mins</span>
              <h4 className="font-bold text-base text-white">SOS Triggered</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Parent presses large SOS button (or accelerometer fall detection fires). Siren blares on family phones and our 24/7 central control desk.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/90 border border-slate-700 space-y-3">
              <span className="text-xs font-bold text-amber-400">Step 2 • T + 2 mins</span>
              <h4 className="font-bold text-base text-white">Sahayak & Ambulance Dispatched</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Nearest local verified caregiver is dispatched immediately on two-wheeler; national ambulance 108/112 contacted with exact GPS coordinates.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/90 border border-slate-700 space-y-3">
              <span className="text-xs font-bold text-emerald-400">Step 3 • In-Person Support</span>
              <h4 className="font-bold text-base text-white">Hospital Escort & Updates</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Caregiver arrives, stabilizes the situation, coordinates ER admission at preferred hospital, and keeps family continuously updated on video call.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-8">
          <Link
            to="/family"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-base shadow-lg shadow-brand-600/30 transition-all hover:scale-105"
          >
            Experience Family Portal Demo
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
