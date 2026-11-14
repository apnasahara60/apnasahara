import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Shield, Phone, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#17211C] text-[#FFFFF0] border-t-2 border-[#CFB53B]/50 font-serif">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        {/* Top Emergency Highlight Banner */}
        <div className="mb-10 p-4 sm:p-6 rounded-[12px] bg-[#800020]/20 border border-[#800020]/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-full bg-[#800020] text-[#FFFFF0] flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-[#FFFFF0]">
                24/7 Dedicated Eldercare Emergency Desk
              </h4>
              <p className="text-xs text-[#FFFFF0]/80">
                Immediate ambulance coordination & verified companion response across India.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href="tel:112"
              className="flex-1 sm:flex-initial px-4 py-2 rounded-[8px] bg-[#800020] text-[#FFFFF0] text-xs font-bold hover:brightness-110 text-center transition-all shadow-sm"
            >
              Dial 112 (National SOS)
            </a>
            <a
              href="tel:108"
              className="flex-1 sm:flex-initial px-4 py-2 rounded-[8px] bg-[#FFFDD0] text-[#800020] text-xs font-bold hover:brightness-95 text-center transition-all shadow-sm"
            >
              Dial 108 (Ambulance)
            </a>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#CFB53B]/25">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4 text-left">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="ApnaSahara"
                className="h-12 w-auto object-contain bg-[#FFFFF0] rounded-[12px] p-1.5 border border-[#CFB53B]"
              />
            </div>
            <p className="text-sm text-[#FFFFF0]/75 leading-relaxed max-w-sm">
              ApnaSahara: Providing compassionate eldercare, verified companion caregivers, and
              24/7 emergency support across Indian cities.
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

        {/* Section divider */}
        <div className="w-full my-6 border-t border-[#CFB53B]/25" />

        {/* Bottom Safety Disclaimer */}
        <div className="pt-2 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#FFFFF0]/60">
          <p>© {new Date().getFullYear()} ApnaSahara. All rights reserved.</p>
          <p className="text-center md:text-right max-w-xl">
            <strong>Important Safety Notice:</strong> ApnaSahara provides assistive companion care and emergency coordination. Background SOS delivery and GPS live tracking require active cellular or internet connectivity. Not a substitute for hospital emergency departments.
          </p>
        </div>
      </div>
    </footer>
  );
};
