import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Phone, Shield, ExternalLink, AlertCircle, Sparkles, Users, Compass } from 'lucide-react';
import { WhiplashDivider } from '../art-nouveau/ArtNouveauDecorations';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#17211C] text-[#FFFFF0]/80 pt-16 pb-12 border-t border-[#CFB53B]/40 font-serif">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Emergency Helpline Strip */}
        <div className="mb-12 p-6 rounded-[12px] bg-gradient-to-r from-[#800020]/40 via-[#17211C] to-[#800020]/40 border border-[#CFB53B]/40 shadow-xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center lg:text-left">
              <div className="w-12 h-12 rounded-[12px] bg-[#800020]/30 border border-[#CFB53B]/50 flex items-center justify-center text-[#CFB53B] shrink-0">
                <AlertCircle className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h4 className="text-[#FFFFF0] font-bold text-base sm:text-lg">
                  24/7 National Emergency Helplines (India)
                </h4>
                <p className="text-xs sm:text-sm text-[#FFFFF0]/70">
                  Immediate emergency medical assistance is always available nationwide.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="tel:112"
                className="px-4 py-2 rounded-[12px] bg-[#800020] hover:brightness-110 text-[#FFFFF0] font-bold text-sm flex items-center gap-2 shadow-lg shadow-[#800020]/30 transition-all"
              >
                <Phone className="w-4 h-4 text-[#CFB53B]" /> 112 (National Emergency)
              </a>
              <a
                href="tel:108"
                className="px-4 py-2 rounded-[12px] bg-[#101714] hover:bg-[#101714]/80 text-[#FFFFF0] font-bold text-sm border border-[#CFB53B]/40 flex items-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-[#008080]" /> 108 (Ambulance Service)
              </a>
              <a
                href="tel:14567"
                className="px-4 py-2 rounded-[12px] bg-[#808000]/40 hover:bg-[#808000]/60 text-[#FFFFF0] font-bold text-sm border border-[#CFB53B]/40 flex items-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-[#CFB53B]" /> 14567 (Elderline)
              </a>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#CFB53B]/25">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4 text-left">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="ApnaSahara Florido"
                className="h-12 w-auto object-contain bg-[#FFFFF0] rounded-[12px] p-1.5 border border-[#CFB53B]"
              />
            </div>
            <p className="text-sm text-[#FFFFF0]/75 leading-relaxed max-w-sm">
              Art Nouveau Florido: Harmonizing organic late-19th-century aesthetics with
              dependable eldercare engineering across Indian cities.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#CFB53B] font-semibold pt-1">
              <Shield className="w-4 h-4 text-[#008080]" /> 100% Background-Checked Caregivers & Paramedic Network
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-left">
            <h4 className="text-[#CFB53B] font-bold text-sm uppercase tracking-wider mb-4">Explore</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/about" className="hover:text-[#CFB53B] transition-colors">About Mission</Link></li>
              <li><Link to="/services" className="hover:text-[#CFB53B] transition-colors">Eldercare Services</Link></li>
              <li><Link to="/how-it-works" className="hover:text-[#CFB53B] transition-colors">How It Works</Link></li>
              <li><Link to="/pricing" className="hover:text-[#CFB53B] transition-colors">Subscription Plans</Link></li>
              <li><Link to="/contact" className="hover:text-[#CFB53B] transition-colors">Support & Contact</Link></li>
            </ul>
          </div>

          {/* Dedicated Portals */}
          <div className="text-left">
            <h4 className="text-[#CFB53B] font-bold text-sm uppercase tracking-wider mb-4">Dedicated Portals</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/family" className="hover:text-[#008080] transition-colors flex items-center gap-1.5">Family Web Portal</Link></li>
              <li><Link to="/parent" className="hover:text-[#808000] transition-colors flex items-center gap-1.5">Elderly Parent Portal</Link></li>
              <li><Link to="/caregiver" className="hover:text-[#005F9E] transition-colors flex items-center gap-1.5">Caregiver Portal</Link></li>
              <li><Link to="/admin" className="hover:text-[#800020] transition-colors flex items-center gap-1.5">Admin Operations</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="text-left">
            <h4 className="text-[#CFB53B] font-bold text-sm uppercase tracking-wider mb-4">Headquarters</h4>
            <div className="space-y-2 text-sm text-[#FFFFF0]/70">
              <p>ApnaSahara Care Network Pvt. Ltd.</p>
              <p>Cyber City, Gurugram & Sector 62, Noida, NCR, India</p>
              <p className="pt-2 text-[#FFFFF0] font-semibold">care@apnasahara.com</p>
              <p className="text-[#FFFFF0] font-semibold">+91 (120) 489-0000</p>
            </div>
          </div>
        </div>

        {/* Whiplash decorative crest */}
        <WhiplashDivider className="opacity-40 my-6" />

        {/* Bottom Safety Disclaimer */}
        <div className="pt-2 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#FFFFF0]/60">
          <p>© {new Date().getFullYear()} ApnaSahara Florido. All rights reserved.</p>
          <p className="text-center md:text-right max-w-xl">
            <strong>Important Safety Notice:</strong> ApnaSahara provides assistive companion care and emergency coordination. Background SOS delivery and GPS live tracking require active cellular or internet connectivity. Not a substitute for hospital emergency departments.
          </p>
        </div>
      </div>
    </footer>
  );
};
