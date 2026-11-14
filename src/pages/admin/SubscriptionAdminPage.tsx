import React, { useState, useEffect } from 'react';
import { CreditCard, TrendingUp, CheckCircle2, Clock, AlertCircle, Download } from 'lucide-react';
import { dbStore } from '../../lib/mongoStore';
import { Subscription } from '../../types';

export const SubscriptionAdminPage: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  useEffect(() => {
    setSubscriptions(dbStore.getSubscriptions());
  }, []);

  return (
    <div className="space-y-6 font-serif">
      <div className="border-b border-[#CFB53B]/30 pb-4">
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#008080]">Financial Overview</span>
        <h1 className="text-2xl font-bold text-[#17211C]">Subscription & Revenue Management</h1>
        <p className="text-xs sm:text-sm text-[#17211C]/75 font-sans">
          Monthly recurring revenue (MRR), subscriber retention & billing status
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="art-card p-6 space-y-1">
          <span className="text-xs font-bold text-[#008080] uppercase tracking-wider">Total Active Subscriptions</span>
          <p className="text-3xl font-bold text-[#17211C] font-mono">1,248</p>
          <span className="text-[11px] text-[#808000] font-semibold font-sans">98.2% Retention Rate</span>
        </div>

        <div className="art-card p-6 space-y-1">
          <span className="text-xs font-bold text-[#008080] uppercase tracking-wider">Monthly Recurring Revenue</span>
          <p className="text-3xl font-bold text-[#008080] font-mono">₹1,12,31,000</p>
          <span className="text-[11px] text-[#CFB53B] font-semibold font-sans">Avg. ₹8,999 / family</span>
        </div>

        <div className="art-card p-6 space-y-1">
          <span className="text-xs font-bold text-[#008080] uppercase tracking-wider">Payment Health</span>
          <p className="text-3xl font-bold text-[#808000] font-mono">99.4%</p>
          <span className="text-[11px] text-[#17211C]/60 font-sans">Stripe & Razorpay Integrated</span>
        </div>
      </div>

      {/* Subscriptions Table */}
      <div className="art-card p-6 space-y-4">
        <h3 className="font-bold text-base text-[#17211C]">Active Membership Roster</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-[#CFB53B]/30 text-[#008080] uppercase font-bold text-[11px]">
                <th className="pb-3 pl-2">Plan Name</th>
                <th className="pb-3">Elder Covered</th>
                <th className="pb-3">Monthly Amount</th>
                <th className="pb-3">Renewal Date</th>
                <th className="pb-3">Visits Quota</th>
                <th className="pb-3 pr-2 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#CFB53B]/20 text-[#17211C]">
              {subscriptions.map((sub) => (
                <tr key={sub.id} className="hover:bg-[#FFFDD0]/50 transition-colors">
                  <td className="py-4 pl-2 font-bold text-[#17211C] font-serif">{sub.plan_name}</td>
                  <td className="py-4 font-semibold text-[#17211C]/80">{sub.elder_covered_name}</td>
                  <td className="py-4 font-bold text-[#008080] font-mono">₹{sub.monthly_amount.toLocaleString('en-IN')}</td>
                  <td className="py-4 text-[#17211C]/60 font-mono">{sub.renewal_date}</td>
                  <td className="py-4">
                    <span className="font-semibold text-[#808000]">{sub.visits_used_this_month} / {sub.visits_included_per_month} used</span>
                  </td>
                  <td className="py-4 pr-2 text-right">
                    <span className="px-2.5 py-1 rounded-art font-bold uppercase text-[10px] bg-[#808000]/15 text-[#808000] border border-[#808000]/30 font-mono">
                      {sub.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
