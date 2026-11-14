import React, { useState, useEffect } from 'react';
import {
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  Download,
  Check,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { dbStore } from '../../lib/supabase';
import { Subscription } from '../../types';
import { useNotification } from '../../context/NotificationContext';
import { OrnateCorner } from '../../components/art-nouveau/ArtNouveauDecorations';

export const SubscriptionPage: React.FC = () => {
  const { showToast } = useNotification();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  useEffect(() => {
    const list = dbStore.getSubscriptions();
    if (list.length > 0) {
      setSubscription(list[0]);
    }
  }, []);

  const handleUpgrade = (planName: Subscription['plan_name'], amount: number, visits: number) => {
    if (!subscription) return;
    const updated: Subscription = {
      ...subscription,
      plan_name: planName,
      monthly_amount: amount,
      visits_included_per_month: visits
    };
    dbStore.updateSubscription(updated);
    setSubscription(updated);
    setShowUpgradeModal(false);

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    showToast('Plan Upgraded Successfully', `Switched to ${planName} (₹${amount.toLocaleString('en-IN')}/mo)`, 'info');
  };

  const visitsUsed = subscription?.visits_used_this_month || 5;
  const visitsTotal = subscription?.visits_included_per_month || 12;
  const visitsLeft = Math.max(0, visitsTotal - visitsUsed);

  return (
    <div className="space-y-6 font-serif text-[#17211C]">
      {/* Header */}
      <div className="border-b border-[#CFB53B]/30 pb-4">
        <span className="text-xs uppercase font-bold tracking-widest text-[#008080]">
          Sanctuary Membership
        </span>
        <h1 className="text-3xl font-bold text-[#17211C] tracking-tight">Subscription & Care Plan</h1>
        <p className="text-xs text-[#17211C]/70 mt-0.5">
          Manage your eldercare membership, billing cycle and included caregiver visits
        </p>
      </div>

      {/* Active Plan Overview Card */}
      <div className="p-6 sm:p-8 rounded-[12px] bg-[#FFFFF0] border border-[#CFB53B]/40 shadow-[0_2px_12px_rgba(23,33,28,0.05)] space-y-6 relative overflow-hidden">
        <OrnateCorner position="top-right" className="absolute top-2 right-2 text-[#CFB53B]" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#CFB53B]/25">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#008080] bg-[#FFFDD0] px-3 py-1 rounded-full border border-[#CFB53B]/40">
              Active Subscription
            </span>
            <h2 className="text-3xl font-bold text-[#17211C] mt-2">
              {subscription?.plan_name || 'Belle Époque Sanctuary'}
            </h2>
            <p className="text-xs text-[#17211C]/70 mt-1">
              Covering: <strong>{subscription?.elder_covered_name || 'Shri Ramesh Sharma & Savitri Sharma'}</strong>
            </p>
          </div>

          <div className="text-left sm:text-right">
            <div className="flex items-baseline sm:justify-end gap-1">
              <span className="text-sm font-bold text-[#17211C]/50">₹</span>
              <span className="text-3xl sm:text-4xl font-bold text-[#17211C] font-mono">
                {subscription?.monthly_amount.toLocaleString('en-IN') || '8,999'}
              </span>
              <span className="text-xs text-[#17211C]/60 font-medium">/ month</span>
            </div>
            <p className="text-xs text-[#17211C]/70 mt-1">
              Next Renewal: <strong>{subscription?.renewal_date || 'Dec 15, 2026'}</strong>
            </p>
          </div>
        </div>

        {/* Included Visits Quota */}
        <div className="p-5 rounded-[12px] bg-[#FFFDD0] border border-[#CFB53B]/40 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-[#17211C]">
            <span>Monthly Attendant Visits Quota</span>
            <span className="text-[#008080] font-mono">{visitsUsed} of {visitsTotal} Visits Used ({visitsLeft} remaining)</span>
          </div>

          <div className="w-full h-3 rounded-full bg-[#FFFFF0] border border-[#CFB53B]/30 overflow-hidden">
            <div
              className="h-full bg-[#008080] rounded-full transition-all duration-500"
              style={{ width: `${Math.round((visitsUsed / visitsTotal) * 100)}%` }}
            />
          </div>

          <p className="text-[11px] text-[#17211C]/70">
            Visits reset on your monthly renewal date. Extra companion visits can be booked anytime at ₹499/visit.
          </p>
        </div>

        {/* Included Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#17211C]/85">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#008080] shrink-0" />
            <span>24/7 Rapid SOS Emergency Response & Dispatch</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#008080] shrink-0" />
            <span>Continuous Vitals Tracking & Anomaly Alerts</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#008080] shrink-0" />
            <span>Doctor Appointment & Diagnostic Escorts</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#008080] shrink-0" />
            <span>Dedicated Geriatric Care Manager On-Call</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={() => setShowUpgradeModal(true)}
            className="px-6 py-3 rounded-[12px] bg-[#008080] hover:brightness-90 text-[#FFFFF0] font-semibold text-xs shadow-md shadow-[#008080]/20 transition-all active:translate-y-[1px]"
          >
            Upgrade or Change Care Plan
          </button>
        </div>
      </div>

      {/* Billing Invoices */}
      <div className="p-6 rounded-[12px] bg-[#FFFFF0] border border-[#CFB53B]/40 shadow-[0_2px_12px_rgba(23,33,28,0.05)] space-y-4">
        <h3 className="font-bold text-base text-[#17211C]">Billing History & Invoices</h3>
        <div className="space-y-2">
          {[
            { id: 'INV-2026-11', date: 'Nov 15, 2026', amount: '₹8,999', status: 'Paid', method: 'Visa •••• 4242' },
            { id: 'INV-2026-10', date: 'Oct 15, 2026', amount: '₹8,999', status: 'Paid', method: 'Visa •••• 4242' },
            { id: 'INV-2026-09', date: 'Sep 15, 2026', amount: '₹8,999', status: 'Paid', method: 'Visa •••• 4242' },
          ].map((inv) => (
            <div
              key={inv.id}
              className="p-3.5 rounded-[8px] bg-[#FFFDD0]/50 border border-[#CFB53B]/30 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-3">
                <CreditCard className="w-4 h-4 text-[#CFB53B]" />
                <div>
                  <p className="font-bold text-[#17211C] font-mono">{inv.id}</p>
                  <p className="text-[10px] text-[#17211C]/60">{inv.date} • {inv.method}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-[#17211C] font-mono">{inv.amount}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#808000]/15 text-[#808000] border border-[#808000]/30 font-bold text-[10px]">
                  {inv.status}
                </span>
                <button
                  onClick={() => showToast('Receipt Downloaded', `Invoice ${inv.id} downloaded as PDF`, 'info')}
                  className="p-1 rounded text-[#17211C]/60 hover:text-[#008080]"
                  title="Download receipt"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upgrade Plan Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-[300] bg-[#17211C]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFFF0] rounded-[12px] border border-[#CFB53B] max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto relative">
            <OrnateCorner position="top-left" className="absolute top-2 left-2 text-[#CFB53B]" />

            <div className="flex items-center justify-between pb-3 border-b border-[#CFB53B]/30">
              <div>
                <span className="text-[11px] font-bold text-[#008080] uppercase tracking-wider">
                  Care Membership
                </span>
                <h3 className="text-xl font-bold text-[#17211C]">Change Care Plan</h3>
                <p className="text-xs text-[#17211C]/70">Select the plan that matches your parents' current needs</p>
              </div>
              <button onClick={() => setShowUpgradeModal(false)} className="text-[#17211C]/60 hover:text-[#800020]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-[12px] border border-[#CFB53B]/40 bg-[#FFFFF0] space-y-3 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-[#17211C] text-sm">Atelier Basic</h4>
                  <p className="text-2xl font-bold text-[#17211C] font-mono mt-1">₹4,999</p>
                  <p className="text-[11px] text-[#17211C]/60">4 visits / month</p>
                </div>
                <button
                  onClick={() => handleUpgrade('Basic Sahara', 4999, 4)}
                  className="w-full py-2 rounded-[8px] border border-[#CFB53B] hover:bg-[#FFFDD0] text-xs font-semibold text-[#17211C]"
                >
                  Select Basic
                </button>
              </div>

              <div className="p-5 rounded-[12px] border-2 border-[#008080] bg-[#FFFDD0] space-y-3 flex flex-col justify-between shadow-md">
                <div>
                  <span className="text-[10px] font-bold bg-[#008080] text-[#FFFFF0] px-2 py-0.5 rounded-full">Current</span>
                  <h4 className="font-bold text-[#17211C] text-sm mt-1">Belle Époque Comprehensive</h4>
                  <p className="text-2xl font-bold text-[#17211C] font-mono mt-1">₹8,999</p>
                  <p className="text-[11px] text-[#17211C]/60">12 visits / month</p>
                </div>
                <button
                  onClick={() => handleUpgrade('Comprehensive Sahara', 8999, 12)}
                  className="w-full py-2 rounded-[8px] bg-[#008080] text-[#FFFFF0] text-xs font-bold"
                >
                  Keep Current
                </button>
              </div>

              <div className="p-5 rounded-[12px] border border-[#CFB53B]/40 bg-[#FFFFF0] space-y-3 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-[#17211C] text-sm">Sanctuary 24/7</h4>
                  <p className="text-2xl font-bold text-[#800020] font-mono mt-1">₹16,999</p>
                  <p className="text-[11px] text-[#17211C]/60">25 visits / month</p>
                </div>
                <button
                  onClick={() => handleUpgrade('Premium 24/7 Guardian', 16999, 25)}
                  className="w-full py-2 rounded-[8px] bg-[#800020] hover:brightness-110 text-[#FFFFF0] text-xs font-bold"
                >
                  Upgrade to Sanctuary
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
