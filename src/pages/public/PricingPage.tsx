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
      buttonBg: 'bg-slate-900 hover:bg-slate-800 text-white'
    },
    {
      name: 'Comprehensive Sahara',
      price: billingCycle === 'monthly' ? 8999 : 7499,
      period: '/ month',
      description: 'Our most popular plan for aging parents needing regular companion support and doctor escorts.',
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
      buttonBg: 'bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-600/30'
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
      buttonBg: 'bg-slate-900 hover:bg-slate-800 text-white'
    }
  ];

  return (
    <div className="py-12 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase font-extrabold tracking-widest text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
            Transparent Pricing
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Invest in Your Parents' Health & Safety
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Simple, honest monthly plans with zero hidden fees, verified caregivers, and flexible cancellation anytime.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="inline-flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100 border border-slate-200 mt-6">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                billingCycle === 'monthly' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-600'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                billingCycle === 'annual' ? 'bg-brand-600 text-white shadow-sm' : 'text-slate-600'
              }`}
            >
              Annual Billing
              <span className="text-[10px] bg-brand-100 text-brand-800 px-1.5 py-0.5 rounded font-black">
                SAVE 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((p, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-8 bg-white border transition-all flex flex-col justify-between relative ${
                p.popular
                  ? 'border-brand-500 shadow-2xl ring-2 ring-brand-500/20'
                  : 'border-slate-200 shadow-md hover:shadow-xl'
              }`}
            >
              {p.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-brand-600 text-white text-xs font-black uppercase tracking-wider shadow-md">
                  Most Popular for Parents
                </div>
              )}

              <div>
                <h3 className="text-2xl font-black text-slate-900">{p.name}</h3>
                <p className="text-xs text-slate-500 mt-1 min-h-[36px]">{p.description}</p>

                <div className="mt-6 pb-6 border-b border-slate-100">
                  <div className="flex items-baseline gap-1">
                    <span className="text-base text-slate-500 font-bold">₹</span>
                    <span className="text-4xl sm:text-5xl font-black text-slate-900">
                      {p.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">{p.period}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">All taxes and caregiver insurances included</p>
                </div>

                <ul className="mt-6 space-y-3.5 text-xs sm:text-sm text-slate-600">
                  {p.features.map((f, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <Link
                  to="/family/subscription"
                  className={`w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center transition-all ${p.buttonBg}`}
                >
                  {p.buttonText}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* FAQs */}
        <div className="mt-20 max-w-3xl mx-auto space-y-6">
          <h3 className="text-2xl font-black text-slate-900 text-center mb-8">Frequently Asked Questions</h3>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">Can I request additional caregiver visits on top of my monthly plan?</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Yes, absolutely. Additional companion or doctor accompaniment visits can be booked inside the Family Portal at a subsidized rate of ₹499 per 2-hour visit.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">How are caregivers verified?</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every caregiver undergoes physical address verification, Aadhaar identity authentication, criminal court records check via local police authorities, and training certification by our clinical advisory board.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">Can international credit cards / foreign payments be used?</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Yes! We accept international cards (Visa, Mastercard, Amex), PayPal, and direct wire transfer, making it effortless for NRIs living in the US, UK, Canada, UAE, etc. to subscribe for parents in India.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
