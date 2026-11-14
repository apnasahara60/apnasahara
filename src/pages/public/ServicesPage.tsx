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

export const ServicesPage: React.FC = () => {
  const services = [
    {
      icon: <PhoneCall className="w-6 h-6 text-red-600" />,
      bg: 'bg-red-50 border-red-200',
      title: '24/7 Rapid SOS & Emergency Coordination',
      desc: 'One-touch emergency beacon triggers immediate response: caregiver dispatch, family notification, and coordinate national ambulance (108/112) with hospital desk admission support.'
    },
    {
      icon: <Activity className="w-6 h-6 text-emerald-600" />,
      bg: 'bg-emerald-50 border-emerald-200',
      title: 'Daily Vital Signs & Health Tracking',
      desc: 'Caregiver records BP, Fasting & Post-Meal Sugar, SpO2, Pulse, and Weight during every visit with automatic trend charts and anomaly threshold alerts for family members.'
    },
    {
      icon: <Pill className="w-6 h-6 text-amber-600" />,
      bg: 'bg-amber-50 border-amber-200',
      title: 'Medication Management & Refill Delivery',
      desc: 'Pill box organization according to doctor prescriptions, elder-friendly reminder notifications, adherence logs, and doorstep medicine refills before bottles run dry.'
    },
    {
      icon: <Car className="w-6 h-6 text-blue-600" />,
      bg: 'bg-blue-50 border-blue-200',
      title: 'Doctor Appointment & Hospital Escort',
      desc: 'Door-to-door cab escort by a verified Sahayak, queue management at clinics, doctor consultation notes recorded, and digital prescription upload to your portal.'
    },
    {
      icon: <MapPin className="w-6 h-6 text-indigo-600" />,
      bg: 'bg-indigo-50 border-indigo-200',
      title: 'Safe Zone Geofencing & Location Radar',
      desc: 'Real-time parent location tracking with custom circular geofence safe zones. Automatic warnings if an elder with mild cognitive decline wanders outside the colony.'
    },
    {
      icon: <Smile className="w-6 h-6 text-teal-600" />,
      bg: 'bg-teal-50 border-teal-200',
      title: 'Companionship, Walks & Mental Engagement',
      desc: 'Warm conversations over tea, morning/evening garden walks, light physical stretches, reading newspapers, solving puzzles, and setting up WhatsApp video calls with grandchildren.'
    }
  ];

  return (
    <div className="py-12 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase font-extrabold tracking-widest text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
            Holistic Eldercare Offerings
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Specialized Care Built For Every Stage of Aging
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            From active, independent seniors who just need companion support and emergency security, to elders requiring daily medical vigilance and mobility assistance.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white border border-slate-200 hover:shadow-xl transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className={`w-12 h-12 rounded-2xl ${s.bg} border flex items-center justify-center font-bold`}>
                  {s.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900">{s.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <Link
                  to="/pricing"
                  className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
                >
                  Included in Care Plans <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-xl font-bold">Have custom requirements or post-surgery recovery?</h4>
            <p className="text-xs text-slate-400 mt-1">Our geriatric care managers will craft a personalized routine tailored to your parents.</p>
          </div>
          <Link
            to="/contact"
            className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 font-bold text-sm text-white shrink-0"
          >
            Speak with a Care Manager
          </Link>
        </div>
      </div>
    </div>
  );
};
