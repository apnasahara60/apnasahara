import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ShieldCheck, Heart, Sparkles, HelpCircle } from 'lucide-react';

export const PricingPage: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const plans = [
    {
      name: 'Basic Care',
      price: billingCycle === 'monthly' ? 4999 : 3999,
      period: '/ month',
      description: 'Ideal for independent seniors needing weekly check-ins, vital tracking, and emergency security.',
      popular: false,
      features: [
        '4 In-person Caregiver visits per month (2 hrs each)',
        'Weekly BP, Blood Sugar & Pulse vitals tracking',
        '24/7 Rapid SOS Emergency Coordination',
        'Family Portal & Senior Portal access',
        'Medication reminder schedules',
        'WhatsApp summary reports to family'
      ],
      buttonText: 'Choose Basic Care',
      isPrimary: false
    },
    {
      name: 'Comprehensive Sahara',
      price: billingCycle === 'monthly' ? 8999 : 7499,
      period: '/ month',
      description: 'Our flagship plan for aging parents needing regular companion support and doctor escorts.',
      popular: true,
      features: [
        '12 In-person Caregiver visits per month (3 visits / week)',
        'Continuous vital signs monitoring & trend anomaly alerts',
        'Door-to-door Doctor Appointment Escort (up to 2/month)',
        'Live GPS Location Radar with Geofence Safe-Zones',
        'Dedicated Geriatric Care Manager',
        'Medicine refill delivery coordination',
        'Detailed visit documentation with caregiver photos'
      ],
      buttonText: 'Get Comprehensive Care',
      isPrimary: true
    },
    {
      name: 'Premium 24/7 Guardian',
      price: billingCycle === 'monthly' ? 16999 : 14499,
      period: '/ month',
      description: 'Intensive daily companionship, post-hospitalization recovery, and prioritized VIP dispatch.',
      popular: false,
      features: [
        'Daily In-person visits (25 visits per month)',
        'Unlimited Doctor & Diagnostic Lab Accompaniments',
        'Priority Ambulance & Paramedic Dispatch Guarantee',
        'Physiotherapy & mobility exercise assistance',
        'Dedicated 24/7 On-call Physician Tele-consultations',
        'Bi-weekly grocery & household assistance',
        'Full health concierge & insurance claim support'
      ],
      buttonText: 'Choose Guardian Care',
      isPrimary: false
    }
  ];

  return (
    <div className="py-12 space-y-16 font-serif text-[#17211C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase font-bold tracking-widest text-[#008080] bg-[#008080]/10 border border-[#008080]/30 px-3.5 py-1 rounded-full font-sans">
            Transparent Sanctuary Pricing
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#17211C] tracking-tight">
            Invest in Your Parents' Health & Safety
          </h1>
          <div className="w-full max-w-xs mx-auto my-4 border-t border-[#CFB53B]/25" />
          <p className="text-base sm:text-lg text-[#17211C]/80 leading-relaxed font-sans">
            Simple, honest monthly plans with zero hidden fees, verified caregivers, and flexible cancellation anytime.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="inline-flex items-center gap-2 p-1.5 rounded-art bg-[#FFFDD0] border border-[#CFB53B]/60 mt-6 font-sans">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-art text-xs font-bold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-[#008080] text-[#FFFFF0] shadow-sm'
                  : 'text-[#17211C]/75 hover:text-[#17211C]'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 rounded-art text-xs font-bold transition-all flex items-center gap-1.5 ${
                billingCycle === 'annual'
                  ? 'bg-[#008080] text-[#FFFFF0] shadow-sm'
                  : 'text-[#17211C]/75 hover:text-[#17211C]'
              }`}
            >
              Annual Billing
              <span className="text-[10px] bg-[#CFB53B] text-[#17211C] px-1.5 py-0.5 rounded font-black font-mono">
                SAVE 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((p, idx) => (
            <div
              key={idx}
              className={`relative art-card p-8 flex flex-col justify-between transition-all ${
                p.popular
                  ? 'border-2 border-[#CFB53B] shadow-2xl ring-2 ring-[#CFB53B]/30'
                  : 'border border-[#CFB53B]/40 shadow-sm'
              }`}
            >
              
              

              <div className="space-y-6">
                <div>
                  {p.popular && (
                    <span className="inline-block text-[10px] uppercase font-bold tracking-widest text-[#008080] bg-[#FFFDD0] border border-[#CFB53B] px-3 py-1 rounded-full mb-3 font-sans">
                      Most Chosen by Distance Families
                    </span>
                  )}
                  <h3 className="text-2xl font-bold text-[#17211C]">{p.name}</h3>
                  <p className="text-xs text-[#17211C]/70 mt-1.5 leading-relaxed font-sans">{p.description}</p>
                </div>

                <div className="flex items-baseline gap-1 border-b border-[#CFB53B]/30 pb-4">
                  <span className="text-4xl font-bold text-[#008080] font-mono">
                    ₹{p.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-[#17211C]/60 font-sans">{p.period}</span>
                </div>

                <div className="space-y-3 font-sans">
                  <p className="text-xs font-bold text-[#17211C] uppercase tracking-wider font-serif">Includes:</p>
                  <ul className="space-y-2.5 text-xs text-[#17211C]/80">
                    {p.features.map((f, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#808000] shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 font-sans">
                <Link
                  to="/register"
                  className={`w-full py-3.5 rounded-art text-xs font-serif font-bold flex items-center justify-center transition-all ${
                    p.isPrimary
                      ? 'art-btn-primary shadow-md'
                      : 'art-btn-secondary'
                  }`}
                >
                  {p.buttonText}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
