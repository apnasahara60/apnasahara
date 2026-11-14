import React from 'react';
import { Link } from 'react-router-dom';
import {
  PhoneCall,
  Shield,
  Activity,
  Heart,
  Pill,
  CalendarCheck,
  MapPin,
  Car,
  Utensils,
  Smile,
  ArrowRight
} from 'lucide-react';
import { OrnateCorner, WhiplashDivider } from '../../components/art-nouveau/ArtNouveauDecorations';

export const ServicesPage: React.FC = () => {
  const services = [
    {
      icon: <PhoneCall className="w-6 h-6 text-[#800020]" />,
      bg: 'bg-[#800020]/10 border-[#800020]/30',
      title: '24/7 Rapid SOS & Emergency Coordination',
      desc: 'One-touch emergency beacon triggers immediate response: caregiver dispatch, family notification, and coordinate national ambulance (108/112) with hospital desk admission support.'
    },
    {
      icon: <Activity className="w-6 h-6 text-[#808000]" />,
      bg: 'bg-[#808000]/10 border-[#808000]/30',
      title: 'Daily Vital Signs & Health Tracking',
      desc: 'Caregiver records BP, Fasting & Post-Meal Sugar, SpO2, Pulse, and Weight during every visit with automatic trend charts and anomaly threshold alerts for family members.'
    },
    {
      icon: <Pill className="w-6 h-6 text-[#CFB53B]" />,
      bg: 'bg-[#CFB53B]/15 border-[#CFB53B]/50',
      title: 'Medication Management & Refill Delivery',
      desc: 'Pill box organization according to doctor prescriptions, elder-friendly reminder notifications, adherence logs, and doorstep medicine refills before bottles run dry.'
    },
    {
      icon: <Car className="w-6 h-6 text-[#005F9E]" />,
      bg: 'bg-[#005F9E]/10 border-[#005F9E]/30',
      title: 'Doctor Appointment & Hospital Escort',
      desc: 'Door-to-door cab escort by a verified Sahayak, queue management at clinics, doctor consultation notes recorded, and digital prescription upload to your portal.'
    },
    {
      icon: <MapPin className="w-6 h-6 text-[#008080]" />,
      bg: 'bg-[#008080]/10 border-[#008080]/30',
      title: 'Safe Zone Geofencing & Location Radar',
      desc: 'Real-time parent location tracking with custom circular geofence safe zones. Automatic warnings if an elder with mild cognitive decline wanders outside the colony.'
    },
    {
      icon: <Smile className="w-6 h-6 text-[#008080]" />,
      bg: 'bg-[#FFFDD0] border-[#CFB53B]/60',
      title: 'Companionship, Walks & Mental Engagement',
      desc: 'Warm conversations over tea, morning/evening garden walks, light physical stretches, reading newspapers, solving puzzles, and setting up WhatsApp video calls with grandchildren.'
    }
  ];

  return (
    <div className="py-12 space-y-16 font-serif text-[#17211C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase font-bold tracking-widest text-[#008080] bg-[#008080]/10 border border-[#008080]/30 px-3.5 py-1 rounded-full font-sans">
            Holistic Eldercare Offerings
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#17211C] tracking-tight">
            Specialized Care Built For Every Stage of Aging
          </h1>
          <WhiplashDivider color="#CFB53B" className="max-w-xs mx-auto" />
          <p className="text-base sm:text-lg text-[#17211C]/80 leading-relaxed font-sans">
            From active, independent seniors who just need companion support and emergency security, to elders requiring daily medical vigilance and mobility assistance.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, idx) => (
            <div
              key={idx}
              className="relative art-card p-8 space-y-4 flex flex-col justify-between hover:border-[#CFB53B] transition-all"
            >
              <OrnateCorner position="top-left" color="#CFB53B" size={24} />
              <div className="space-y-4">
                <div className={`w-12 h-12 rounded-art ${s.bg} border flex items-center justify-center font-bold`}>
                  {s.icon}
                </div>
                <h3 className="text-xl font-bold text-[#17211C]">{s.title}</h3>
                <p className="text-sm text-[#17211C]/75 leading-relaxed font-sans">{s.desc}</p>
              </div>
              <div className="pt-4 border-t border-[#CFB53B]/30 font-sans">
                <Link
                  to="/pricing"
                  className="text-xs font-bold text-[#008080] hover:text-[#006666] flex items-center gap-1"
                >
                  Included in Care Plans <ArrowRight className="w-3.5 h-3.5 text-[#CFB53B]" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Recovery Banner */}
        <div className="relative mt-16 p-8 rounded-art bg-gradient-to-r from-[#17211C] via-[#232F28] to-[#17211C] text-[#FFFFF0] border-2 border-[#CFB53B] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <OrnateCorner position="top-left" color="#CFB53B" size={32} />
          <OrnateCorner position="top-right" color="#CFB53B" size={32} />

          <div>
            <h4 className="text-xl font-bold">Have custom requirements or post-surgery recovery?</h4>
            <p className="text-xs sm:text-sm text-[#FFFDD0] mt-1 font-sans">
              Our Clinical Director can curate a custom rehabilitation and 24-hour nursing package for your parents.
            </p>
          </div>
          <Link
            to="/contact"
            className="art-btn-primary px-6 py-3 text-xs shadow-md whitespace-nowrap shrink-0"
          >
            Speak to Care Director
          </Link>
        </div>
      </div>
    </div>
  );
};
