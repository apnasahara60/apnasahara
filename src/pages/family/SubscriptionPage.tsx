import React, { useState, useEffect } from 'react';
import {
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  Download,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { dbStore } from '../../lib/supabase';
import { Subscription } from '../../types';
import { useNotification } from '../../context/NotificationContext';

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
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900">Subscription & Care Plan</h1>
        <p className="text-xs text-slate-500">
          Manage your eldercare membership, billing cycle and included caregiver visits
        </p>
      </div>

      {/* Active Plan Overview Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Active Subscription
            </span>
            <h2 className="text-3xl font-black text-slate-900 mt-2">
              {subscription?.plan_name || 'Comprehensive Sahara'}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Covering: <strong>{subscription?.elder_covered_name || 'Shri Ramesh Sharma & Savitri Sharma'}</strong>
            </p>
          </div>

          <div className="text-left sm:text-right">
            <div className="flex items-baseline sm:justify-end gap-1">
              <span className="text-sm font-bold text-slate-400">₹</span>
              <span className="text-3xl sm:text-4xl font-black text-slate-900">
                {subscription?.monthly_amount.toLocaleString('en-IN') || '8,999'}
              </span>
              <span className="text-xs text-slate-400 font-medium">/ month</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Next Renewal: <strong>{subscription?.renewal_date || 'Dec 15, 2026'}</strong>
            </p>
          </div>
        </div>

        {/* Included Visits Quota */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>Monthly Attendant Visits Quota</span>
            <span className="text-brand-600">{visitsUsed} of {visitsTotal} Visits Used ({visitsLeft} remaining)</span>
          </div>

          <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.round((visitsUsed / visitsTotal) * 100)}%` }}
            />
          </div>

          <p className="text-[11px] text-slate-500">
            Visits reset on your monthly renewal date. Extra companion visits can be booked anytime at ₹499/visit.
          </p>
        </div>

        {/* Included Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>24/7 Rapid SOS Emergency Response & Dispatch</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Continuous Vitals Tracking & Anomaly Alerts</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Doctor Appointment & Diagnostic Escorts</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Dedicated Geriatric Care Manager On-Call</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={() => setShowUpgradeModal(true)}
            className="px-6 py-3 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-md shadow-brand-600/30 transition-transform hover:scale-105"
          >
            Upgrade or Change Care Plan
          </button>
        </div>
      </div>

      {/* Billing Invoices */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-bold text-base text-slate-900">Billing History & Invoices</h3>
        <div className="space-y-2">
          {[
            { id: 'INV-2026-11', date: 'Nov 15, 2026', amount: '₹8,999', status: 'Paid', method: 'Visa •••• 4242' },
            { id: 'INV-2026-10', date: 'Oct 15, 2026', amount: '₹8,999', status: 'Paid', method: 'Visa •••• 4242' },
            { id: 'INV-2026-09', date: 'Sep 15, 2026', amount: '₹8,999', status: 'Paid', method: 'Visa •••• 4242' },
          ].map((inv) => (
            <div
              key={inv.id}
              className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-3">
                <CreditCard className="w-4 h-4 text-slate-400" />
                <div>
                  <p className="font-bold text-slate-800">{inv.id}</p>
                  <p className="text-[10px] text-slate-400">{inv.date} • {inv.method}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-slate-900">{inv.amount}</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                  {inv.status}
                </span>
                <button
                  onClick={() => showToast('Receipt Downloaded', `Invoice ${inv.id} downloaded as PDF`, 'info')}
                  className="p-1 rounded text-slate-400 hover:text-slate-800"
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
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-black text-slate-900">Change Care Plan</h3>
                <p className="text-xs text-slate-500">Select the plan that matches your parents' current needs</p>
              </div>
              <button onClick={() => setShowUpgradeModal(false)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl border border-slate-200 space-y-3 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Basic Care</h4>
                  <p className="text-2xl font-black text-slate-900 mt-1">₹4,999</p>
                  <p className="text-[11px] text-slate-500">4 visits / month</p>
                </div>
                <button
                  onClick={() => handleUpgrade('Basic Sahara', 4999, 4)}
                  className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800"
                >
                  Select Basic
                </button>
              </div>

              <div className="p-5 rounded-2xl border-2 border-brand-500 bg-brand-50/20 space-y-3 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold bg-brand-600 text-white px-2 py-0.5 rounded-full">Current</span>
                  <h4 className="font-bold text-slate-900 text-sm mt-1">Comprehensive</h4>
                  <p className="text-2xl font-black text-slate-900 mt-1">₹8,999</p>
                  <p className="text-[11px] text-slate-500">12 visits / month</p>
                </div>
                <button
                  onClick={() => handleUpgrade('Comprehensive Sahara', 8999, 12)}
                  className="w-full py-2 rounded-xl bg-brand-600 text-white text-xs font-bold"
                >
                  Keep Current
                </button>
              </div>

              <div className="p-5 rounded-2xl border border-purple-200 bg-purple-50/20 space-y-3 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">24/7 Guardian</h4>
                  <p className="text-2xl font-black text-purple-700 mt-1">₹16,999</p>
                  <p className="text-[11px] text-slate-500">25 visits / month</p>
                </div>
                <button
                  onClick={() => handleUpgrade('Premium 24/7 Guardian', 16999, 25)}
                  className="w-full py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold"
                >
                  Upgrade to Guardian
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
