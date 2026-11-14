import React from 'react';
import { PhoneCall, Volume2, ShieldAlert } from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';

export const ElderFamilyContactsPage: React.FC = () => {
  const { speak } = useAccessibility();

  const contacts = [
    {
      role: 'Son • बेटा',
      name: 'Rahul Sharma',
      location: 'Bangalore',
      phone: '+919876543210',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      color: 'bg-emerald-500'
    },
    {
      role: 'Daughter • बेटी',
      name: 'Pooja Sharma',
      location: 'London (UK)',
      phone: '+447911123456',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      color: 'bg-indigo-500'
    },
    {
      role: 'Caregiver Sahayak • सहायक',
      name: 'Priya Verma',
      location: 'Sector 62 Noida',
      phone: '+919722233445',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      color: 'bg-blue-500'
    },
    {
      role: 'Family Doctor • डॉक्टर',
      name: 'Dr. V. K. Tandon',
      location: 'Max Hospital',
      phone: '+919811199887',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80',
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Family Speed Dial • परिजनों के नंबर</h1>
          <p className="text-xs sm:text-sm text-slate-600">One-tap calling to children and doctors</p>
        </div>
        <button
          onClick={() => speak('Family contacts page. Tap any card to make an instant phone call.')}
          className="px-4 py-2 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md"
        >
          <Volume2 className="w-4 h-4" /> Listen
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {contacts.map((c, idx) => (
          <a
            key={idx}
            href={`tel:${c.phone}`}
            className="p-6 rounded-3xl bg-white border-2 border-amber-200 hover:border-amber-400 shadow-md flex items-center justify-between gap-4 transition-all hover:scale-[1.02] active:scale-95"
          >
            <div className="flex items-center gap-4">
              <img
                src={c.avatar}
                alt={c.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-200"
              />
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full">
                  {c.role}
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1">{c.name}</h3>
                <p className="text-xs text-slate-500">{c.location}</p>
              </div>
            </div>

            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-emerald-600/30">
              <PhoneCall className="w-6 h-6" />
            </div>
          </a>
        ))}
      </div>

      {/* Police & Ambulance Bar */}
      <div className="p-6 rounded-3xl bg-red-600 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white shrink-0">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <div>
            <h4 className="text-lg font-black">24/7 National Emergency Helplines</h4>
            <p className="text-xs text-red-100">Direct connection to local emergency responders</p>
          </div>
        </div>
        <div className="flex gap-2">
          <a
            href="tel:112"
            className="px-6 py-3 rounded-2xl bg-white text-red-700 font-black text-sm shadow-md"
          >
            Call 112
          </a>
          <a
            href="tel:108"
            className="px-6 py-3 rounded-2xl bg-red-900 text-white font-black text-sm border border-red-400"
          >
            Call 108
          </a>
        </div>
      </div>
    </div>
  );
};
