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
    },
    {
      role: 'Daughter • बेटी',
      name: 'Pooja Sharma',
      location: 'London (UK)',
      phone: '+447911123456',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    },
    {
      role: 'Caregiver Sahayak • सहायक',
      name: 'Priya Verma',
      location: 'Sector 62 Noida',
      phone: '+919722233445',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    },
    {
      role: 'Family Doctor • डॉक्टर',
      name: 'Dr. V. K. Tandon',
      location: 'Max Hospital',
      phone: '+919811199887',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80',
    }
  ];

  return (
    <div className="space-y-6 font-serif">
      <div className="flex items-center justify-between border-b border-[#CFB53B]/30 pb-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#008080]">Direct Speed Dial</span>
          <h1 className="text-2xl font-bold text-[#17211C]">Family Contacts • परिजनों के नंबर</h1>
          <p className="text-xs sm:text-sm text-[#17211C]/75 font-sans">One-tap calling to children, caregivers and doctors</p>
        </div>
        <button
          onClick={() => speak('Family contacts page. Tap any card to make an instant phone call.')}
          className="art-btn-primary px-4 py-2 flex items-center gap-1.5 text-xs shadow-md"
        >
          <Volume2 className="w-4 h-4 text-[#CFB53B]" /> Listen
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {contacts.map((c, idx) => (
          <a
            key={idx}
            href={`tel:${c.phone}`}
            className="art-card p-6 flex items-center justify-between gap-4 transition-all hover:scale-[1.01] hover:border-[#CFB53B] active:scale-95 group"
          >
            <div className="flex items-center gap-4">
              <img
                src={c.avatar}
                alt={c.name}
                className="w-16 h-16 rounded-art object-cover border-2 border-[#CFB53B]/60 shadow-sm"
              />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#008080] bg-[#008080]/10 border border-[#008080]/30 px-2.5 py-0.5 rounded-full font-sans">
                  {c.role}
                </span>
                <h3 className="text-lg font-bold text-[#17211C] mt-1">{c.name}</h3>
                <p className="text-xs text-[#17211C]/60 font-sans">{c.location}</p>
              </div>
            </div>

            <div className="w-12 h-12 rounded-art bg-[#008080] text-[#FFFFF0] border border-[#CFB53B]/50 flex items-center justify-center shrink-0 shadow-md group-hover:bg-[#006666] transition-colors">
              <PhoneCall className="w-6 h-6 text-[#CFB53B]" />
            </div>
          </a>
        ))}
      </div>

      {/* Police & Ambulance Emergency Strip */}
      <div className="p-6 rounded-art bg-gradient-to-r from-[#800020] to-[#5C0017] text-[#FFFFF0] border-2 border-[#CFB53B] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-art bg-[#FFFFF0]/15 border border-[#CFB53B]/40 flex items-center justify-center text-[#CFB53B] shrink-0">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <div>
            <h4 className="text-lg font-bold">24/7 National Emergency Helplines</h4>
            <p className="text-xs text-[#FFFDD0] font-sans">Direct priority connection to police & ambulance dispatch</p>
          </div>
        </div>
        <div className="flex gap-2">
          <a
            href="tel:112"
            className="px-6 py-3 rounded-art bg-[#FFFFF0] text-[#800020] hover:bg-[#FFFDD0] font-bold text-sm shadow-md border border-[#CFB53B]"
          >
            Call 112 (Police)
          </a>
          <a
            href="tel:108"
            className="px-6 py-3 rounded-art bg-[#17211C] text-[#FFFFF0] hover:bg-[#232F28] font-bold text-sm border border-[#CFB53B]/50"
          >
            Call 108 (Ambulance)
          </a>
        </div>
      </div>
    </div>
  );
};
