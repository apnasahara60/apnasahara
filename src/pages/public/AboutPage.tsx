import React from 'react';
import { Heart, ShieldCheck, Award, Users, CheckCircle2, Globe2 } from 'lucide-react';
import { OrnateCorner, WhiplashDivider } from '../../components/art-nouveau/ArtNouveauDecorations';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-16 py-12 font-serif text-[#17211C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase font-bold tracking-widest text-[#008080] bg-[#008080]/10 border border-[#008080]/30 px-3.5 py-1 rounded-full font-sans">
            Our Mission & Purpose
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#17211C] tracking-tight">
            Bridging the Miles Between Families & Aging Parents
          </h1>
          <WhiplashDivider color="#CFB53B" className="max-w-xs mx-auto" />
          <p className="text-base sm:text-lg text-[#17211C]/80 leading-relaxed font-sans">
            Founded with the belief that physical distance should never stand between an aging parent and the compassionate, dignified care they deserve.
          </p>
        </div>

        {/* Story Section */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#17211C]">
              Why We Built ApnaSahara
            </h2>
            <p className="text-sm sm:text-base text-[#17211C]/80 leading-relaxed font-sans">
              India is home to over 140 million senior citizens. As career opportunities take millions of young adults to other Indian metros or overseas (the US, UK, Canada, Australia, and the Middle East), elderly parents are often left managing chronic conditions, hospital visits, and routine loneliness on their own.
            </p>
            <p className="text-sm sm:text-base text-[#17211C]/80 leading-relaxed font-sans">
              We realized that elderly care cannot rely on disjointed WhatsApp messages or ad-hoc domestic help. It demands <strong>systematic clinical vigilance</strong>, <strong>police-verified trained attendants</strong>, and a <strong>fail-safe emergency response network</strong> that keeps children fully informed every single day.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="art-card p-4">
                <p className="text-2xl font-bold text-[#808000] font-mono">100%</p>
                <p className="text-xs text-[#17211C]/75 mt-1 font-semibold font-sans">Police & Medical Background Vetted</p>
              </div>
              <div className="art-card p-4">
                <p className="text-2xl font-bold text-[#008080] font-mono">24/7</p>
                <p className="text-xs text-[#17211C]/75 mt-1 font-semibold font-sans">Emergency Telemetry Desk</p>
              </div>
            </div>
          </div>

          <div className="relative art-card p-2">
            <OrnateCorner position="top-left" color="#CFB53B" size={40} />
            <OrnateCorner position="top-right" color="#CFB53B" size={40} />
            <img
              src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80"
              alt="Elder care with warmth"
              className="rounded-art shadow-xl object-cover w-full h-[400px] border border-[#CFB53B]/50"
            />
          </div>
        </div>

        {/* Core Values */}
        <div className="mt-20">
          <h3 className="text-2xl sm:text-3xl font-bold text-[#17211C] text-center mb-10">Our Guiding Pillars</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative art-card p-6 space-y-3">
              <OrnateCorner position="top-left" color="#CFB53B" size={28} />
              <div className="w-10 h-10 rounded-art bg-[#008080]/10 border border-[#008080]/30 text-[#008080] flex items-center justify-center font-bold">
                <Heart className="w-5 h-5 text-[#008080]" />
              </div>
              <h4 className="font-bold text-[#17211C] text-lg">Compassion First</h4>
              <p className="text-xs sm:text-sm text-[#17211C]/75 leading-relaxed font-sans">
                We treat every senior not as a client, but as our own elder family member. Empathy, patience, and respectful conversation guide every visit.
              </p>
            </div>

            <div className="relative art-card p-6 space-y-3">
              <OrnateCorner position="top-left" color="#CFB53B" size={28} />
              <div className="w-10 h-10 rounded-art bg-[#808000]/10 border border-[#808000]/30 text-[#808000] flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5 text-[#808000]" />
              </div>
              <h4 className="font-bold text-[#17211C] text-lg">Zero Compromise on Trust</h4>
              <p className="text-xs sm:text-sm text-[#17211C]/75 leading-relaxed font-sans">
                Biometric verification, background clearance, and GPS geo-stamping on all visits guarantee total transparency and peace of mind.
              </p>
            </div>

            <div className="relative art-card p-6 space-y-3">
              <OrnateCorner position="top-left" color="#CFB53B" size={28} />
              <div className="w-10 h-10 rounded-art bg-[#005F9E]/10 border border-[#005F9E]/30 text-[#005F9E] flex items-center justify-center font-bold">
                <Globe2 className="w-5 h-5 text-[#005F9E]" />
              </div>
              <h4 className="font-bold text-[#17211C] text-lg">Global Reach, Local Touch</h4>
              <p className="text-xs sm:text-sm text-[#17211C]/75 leading-relaxed font-sans">
                Built specifically for distance families with real-time push alerts, currency conversions, and round-the-clock coordinator access.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
