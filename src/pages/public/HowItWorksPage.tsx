import React from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, UserCheck, Stethoscope, ShieldCheck, ArrowRight, Smartphone, Bell, HeartHandshake } from 'lucide-react';
import { OrnateCorner, WhiplashDivider } from '../../components/art-nouveau/ArtNouveauDecorations';

export const HowItWorksPage: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Sign Up & Profile Creation',
      desc: 'Set up your family account in 2 minutes. Enter your parent’s address, emergency contacts, medical history (BP, diabetes, allergies), and preferred language.',
      icon: <UserPlus className="w-6 h-6 text-[#008080]" />
    },
    {
      num: '02',
      title: 'Dedicated Caregiver Matching',
      desc: 'Our operations team assigns a police-verified, certified General Duty Assistant (Sahayak) residing in your parent’s immediate locality for rapid response times.',
      icon: <UserCheck className="w-6 h-6 text-[#808000]" />
    },
    {
      num: '03',
      title: 'Install Elder-Friendly Portal & SOS Beacon',
      desc: 'We configure the simplified Elder Portal on your parent’s phone with extra-large buttons, one-tap SOS emergency trigger, and picture-based reminders.',
      icon: <Smartphone className="w-6 h-6 text-[#CFB53B]" />
    },
    {
      num: '04',
      title: 'Live Tracking, Reports & 24/7 Peace of Mind',
      desc: 'Receive push notifications after each visit with vitals recorded, tasks completed, photos, caregiver notes, and live GPS location radar anytime you check in.',
      icon: <ShieldCheck className="w-6 h-6 text-[#005F9E]" />
    }
  ];

  return (
    <div className="py-12 space-y-16 font-serif text-[#17211C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase font-bold tracking-widest text-[#008080] bg-[#008080]/10 border border-[#008080]/30 px-3.5 py-1 rounded-full font-sans">
            Simple 4-Step Process
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#17211C] tracking-tight">
            How ApnaSahara Works For Your Family
          </h1>
          <WhiplashDivider color="#CFB53B" className="max-w-xs mx-auto" />
          <p className="text-base sm:text-lg text-[#17211C]/80 leading-relaxed font-sans">
            A seamless bridge connecting families abroad or in other cities with dedicated, on-ground caregivers in India.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="relative art-card p-8 hover:border-[#CFB53B] transition-all group"
            >
              <OrnateCorner position="top-left" color="#CFB53B" size={24} />
              <div className="text-4xl font-bold text-[#CFB53B]/50 group-hover:text-[#CFB53B] transition-colors mb-4 font-mono">
                {s.num}
              </div>
              <div className="w-12 h-12 rounded-art bg-[#FFFDD0] border border-[#CFB53B]/60 flex items-center justify-center mb-4">
                {s.icon}
              </div>
              <h3 className="text-lg font-bold text-[#17211C] mb-2">{s.title}</h3>
              <p className="text-xs sm:text-sm text-[#17211C]/75 leading-relaxed font-sans">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Interactive workflow showcase */}
        <div className="relative mt-16 p-8 sm:p-12 rounded-art bg-gradient-to-r from-[#17211C] via-[#232F28] to-[#17211C] text-[#FFFFF0] border-2 border-[#CFB53B] space-y-8 shadow-2xl">
          <OrnateCorner position="top-left" color="#CFB53B" size={40} />
          <OrnateCorner position="top-right" color="#CFB53B" size={40} />

          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-bold">During An Emergency (SOS Protocol)</h3>
            <p className="text-xs sm:text-sm text-[#FFFDD0] font-sans">
              When seconds count, here is the exact protocol executed by ApnaSahara:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
            <div className="p-6 rounded-art bg-[#FFFFF0]/10 border border-[#CFB53B]/40 space-y-3">
              <span className="text-xs font-bold text-[#CFB53B] uppercase font-mono tracking-wider">Step 1 • T + 0 mins</span>
              <h4 className="font-bold text-base text-[#FFFFF0] font-serif">SOS Triggered</h4>
              <p className="text-xs text-[#FFFDD0] leading-relaxed">
                Parent presses large SOS button (or accelerometer fall detection fires). Siren blares on family phones and our 24/7 central control desk.
              </p>
            </div>

            <div className="p-6 rounded-art bg-[#FFFFF0]/10 border border-[#CFB53B]/40 space-y-3">
              <span className="text-xs font-bold text-[#CFB53B] uppercase font-mono tracking-wider">Step 2 • T + 2 mins</span>
              <h4 className="font-bold text-base text-[#FFFFF0] font-serif">Sahayak & Ambulance Dispatched</h4>
              <p className="text-xs text-[#FFFDD0] leading-relaxed">
                Nearest local verified caregiver is dispatched immediately on two-wheeler; national ambulance 108/112 contacted with exact GPS coordinates.
              </p>
            </div>

            <div className="p-6 rounded-art bg-[#FFFFF0]/10 border border-[#CFB53B]/40 space-y-3">
              <span className="text-xs font-bold text-[#CFB53B] uppercase font-mono tracking-wider">Step 3 • In-Person Support</span>
              <h4 className="font-bold text-base text-[#FFFFF0] font-serif">Hospital Escort & Updates</h4>
              <p className="text-xs text-[#FFFDD0] leading-relaxed">
                Caregiver arrives, stabilizes the situation, coordinates ER admission at preferred hospital, and keeps family continuously updated on video call.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
