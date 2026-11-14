import React from 'react';
import { Heart, ShieldCheck, Award, Users, CheckCircle2, Globe2 } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-16 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase font-extrabold tracking-widest text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
            Our Mission & Purpose
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Bridging the Miles Between Families & Aging Parents
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Founded with the belief that physical distance should never stand between an aging parent and the compassionate, dignified care they deserve.
          </p>
        </div>

        {/* Story Section */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Why We Built ApnaSahara
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              India is home to over 140 million senior citizens. As career opportunities take millions of young adults to other Indian metros or overseas (the US, UK, Canada, Australia, and the Middle East), elderly parents are often left managing chronic conditions, hospital visits, and routine loneliness on their own.
            </p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              We realized that elderly care cannot rely on disjointed WhatsApp messages or ad-hoc domestic help. It demands <strong>systematic clinical vigilance</strong>, <strong>police-verified trained attendants</strong>, and a <strong>fail-safe emergency response network</strong> that keeps children fully informed every single day.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                <p className="text-2xl font-black text-emerald-700">100%</p>
                <p className="text-xs text-slate-600 mt-1 font-semibold">Police & Medical Background Vetted</p>
              </div>
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200">
                <p className="text-2xl font-black text-blue-700">24/7</p>
                <p className="text-xs text-slate-600 mt-1 font-semibold">Emergency Dispatch Desk</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80"
              alt="Elder care with warmth"
              className="rounded-3xl shadow-2xl object-cover w-full h-[400px] border border-slate-200"
            />
          </div>
        </div>

        {/* Core Values */}
        <div className="mt-20">
          <h3 className="text-2xl font-black text-slate-900 text-center mb-10">Our Guiding Pillars</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center font-bold">
                <Heart className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-lg">Compassion First</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We treat every senior not as a client, but as our own elder family member. Empathy, patience, and respectful conversation guide every visit.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-lg">Zero Compromise on Trust</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Biometric verification, background clearance, and GPS geo-stamping on all visits guarantee total transparency and peace of mind.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                <Globe2 className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-lg">Global Reach, Local Touch</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Built specifically for distance families with real-time push alerts, currency conversions, and round-the-clock coordinator access.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
