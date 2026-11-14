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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Subscription & Revenue Management</h1>
        <p className="text-xs text-slate-500">
          Monthly recurring revenue (MRR), subscriber retention & billing status
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-slate-500">Total Active Subscriptions</span>
          <p className="text-3xl font-black text-slate-900">1,248</p>
          <span className="text-[11px] text-emerald-600 font-bold">98.2% Retention Rate</span>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-slate-500">Monthly Recurring Revenue</span>
          <p className="text-3xl font-black text-purple-700">₹1,12,31,000</p>
          <span className="text-[11px] text-purple-600 font-bold">Avg. ₹8,999 / family</span>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-slate-500">Payment Health</span>
          <p className="text-3xl font-black text-emerald-600">99.4%</p>
          <span className="text-[11px] text-slate-500 font-medium">Stripe / Razorpay Integrated</span>
        </div>
      </div>

      {/* Subscriptions Table */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-bold text-base text-slate-900">Active Membership Roster</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 uppercase font-bold">
                <th className="pb-3 pl-2">Plan Name</th>
                <th className="pb-3">Elder Covered</th>
                <th className="pb-3">Monthly Amount</th>
                <th className="pb-3">Renewal Date</th>
                <th className="pb-3">Visits Quota</th>
                <th className="pb-3 pr-2 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {subscriptions.map((sub) => (
                <tr key={sub.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 pl-2 font-bold text-slate-900">{sub.plan_name}</td>
                  <td className="py-4 font-semibold text-slate-800">{sub.elder_covered_name}</td>
                  <td className="py-4 font-bold text-slate-900">₹{sub.monthly_amount.toLocaleString('en-IN')}</td>
                  <td className="py-4 text-slate-500">{sub.renewal_date}</td>
                  <td className="py-4">
                    <span className="font-bold text-brand-700">{sub.visits_used_this_month} / {sub.visits_included_per_month} used</span>
                  </td>
                  <td className="py-4 pr-2 text-right">
                    <span className="px-2.5 py-1 rounded-full font-bold uppercase text-[10px] bg-emerald-100 text-emerald-800">
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
