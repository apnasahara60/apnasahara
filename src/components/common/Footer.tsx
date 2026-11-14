import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Phone, Shield, ExternalLink, AlertCircle, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Emergency Helpline Strip */}
        <div className="mb-12 p-6 rounded-2xl bg-gradient-to-r from-red-950/80 via-slate-900 to-red-950/80 border border-red-800/40 shadow-xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center lg:text-left">
              <div className="w-12 h-12 rounded-2xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-500 shrink-0">
                <AlertCircle className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h4 className="text-white font-bold text-base sm:text-lg">
                  24/7 National Emergency Helplines (India)
                </h4>
                <p className="text-xs sm:text-sm text-slate-400">
                  Immediate emergency medical assistance is always available nationwide.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="tel:112"
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-red-600/30 transition-colors"
              >
                <Phone className="w-4 h-4" /> 112 (National Emergency)
              </a>
              <a
                href="tel:108"
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 flex items-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4" /> 108 (Ambulance Service)
              </a>
              <a
                href="tel:14567"
                className="px-4 py-2 rounded-xl bg-amber-600/30 hover:bg-amber-600/40 text-amber-300 font-bold text-sm border border-amber-500/30 flex items-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4" /> 14567 (Elderline)
              </a>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center text-white font-bold">
                <Heart className="w-5 h-5 fill-white" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Apna<span className="text-brand-400">Sahara</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Empowering families worldwide to care for their elderly parents in India with dignity, verified in-person caregivers, continuous vital monitoring, and rapid emergency coordination.
            </p>
            <div className="flex items-center gap-2 text-xs text-brand-400 font-semibold pt-1">
              <Shield className="w-4 h-4" /> 100% Background-Checked Caregivers & Paramedic Network
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Explore</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/about" className="hover:text-white transition-colors">About Mission</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Eldercare Services</Link></li>
              <li><Link to="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Subscription Plans</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Support & Contact</Link></li>
            </ul>
          </div>

          {/* Dedicated Portals */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Dedicated Portals</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/family" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">Family Web Portal</Link></li>
              <li><Link to="/parent" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">Elderly Parent Portal</Link></li>
              <li><Link to="/caregiver" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">Caregiver Portal</Link></li>
              <li><Link to="/admin" className="hover:text-purple-400 transition-colors flex items-center gap-1.5">Admin Operations</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Headquarters</h4>
            <div className="space-y-2 text-sm text-slate-400">
              <p>ApnaSahara Care Network Pvt. Ltd.</p>
              <p>Cyber City, Gurugram & Sector 62, Noida, NCR, India</p>
              <p className="pt-2 text-white font-semibold">care@apnasahara.com</p>
              <p className="text-white font-semibold">+91 (120) 489-0000</p>
            </div>
          </div>
        </div>

        {/* Bottom Safety Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ApnaSahara Eldercare Platform. All rights reserved.</p>
          <p className="text-center md:text-right max-w-xl">
            <strong>Important Safety Notice:</strong> ApnaSahara provides assistive companion care and emergency coordination. Background SOS delivery and GPS live tracking require active cellular or internet connectivity. Not a substitute for hospital emergency departments.
          </p>
        </div>
      </div>
    </footer>
  );
};
