import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, Volume2, ShoppingCart, Pill, Stethoscope, Car, MessageSquare } from 'lucide-react';
import { dbStore } from '../../lib/mongoStore';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useNotification } from '../../context/NotificationContext';

export const ElderAssistanceRequestsPage: React.FC = () => {
  const { speak } = useAccessibility();
  const { showToast } = useNotification();
  const elder = dbStore.getElders()[0];

  const [activeSuccess, setActiveSuccess] = useState<string | null>(null);

  const requestTiles = [
    {
      id: 'Medicine',
      title: 'Need Medicine Refill',
      sub: 'दवाई मंगवानी है',
      Icon: Pill,
      iconColor: 'text-[#008080]',
      detail: 'Requesting refill for regular daily prescription medications.'
    },
    {
      id: 'Groceries',
      title: 'Need Groceries / Essentials',
      sub: 'राशन या फल चाहिए',
      Icon: ShoppingCart,
      iconColor: 'text-[#808000]',
      detail: 'Assistance needed with milk, vegetables or pantry supplies.'
    },
    {
      id: 'Unwell',
      title: 'Feeling Unwell / Doctor Call',
      sub: 'डॉक्टर से बात करनी है',
      Icon: Stethoscope,
      iconColor: 'text-[#800020]',
      detail: 'Feeling uncomfortable; requesting tele-consult or doctor review.'
    },
    {
      id: 'Ride',
      title: 'Need Ride / Cab Escort',
      sub: 'गाड़ी या कैब चाहिए',
      Icon: Car,
      iconColor: 'text-[#005F9E]',
      detail: 'Need escort and cab for local visit or clinic checkup.'
    },
    {
      id: 'Companion',
      title: 'Just Want To Chat',
      sub: 'बातचीत करनी है',
      Icon: MessageSquare,
      iconColor: 'text-[#CFB53B]',
      detail: 'Would love a companion check-in call or visit.'
    }
  ];

  const handleRequest = (type: any, title: string, detail: string) => {
    if (!elder) return;
    dbStore.createAssistanceRequest({
      elder_id: elder.id,
      elder_name: elder.name,
      type,
      details: detail,
      urgency: type === 'Unwell' ? 'High' : 'Medium'
    });

    setActiveSuccess(title);
    speak(`Your request for ${title} has been logged. Rahul and your care team will help right away.`);
    showToast('Assistance Requested', `Logged request: ${title}`, 'info');

    setTimeout(() => setActiveSuccess(null), 4000);
  };

  return (
    <div className="space-y-6 font-serif">
      <div className="flex items-center justify-between border-b border-[#CFB53B]/30 pb-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#008080]">Concierge Requests</span>
          <h1 className="text-2xl font-bold text-[#17211C]">Ask for Assistance • सहायता अनुरोध</h1>
          <p className="text-xs sm:text-sm text-[#17211C]/75 font-sans">Tap any card to let your Sahayak and family know</p>
        </div>
        <button
          onClick={() => speak('Assistance request page. Tap any box to request groceries, medicines, or a ride.')}
          className="art-btn-primary px-4 py-2 flex items-center gap-1.5 text-xs shadow-md"
        >
          <Volume2 className="w-4 h-4 text-[#CFB53B]" /> Listen
        </button>
      </div>

      {activeSuccess && (
        <div className="p-4 rounded-art bg-[#808000]/15 border-2 border-[#808000] text-[#17211C] font-bold text-sm flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 className="w-6 h-6 text-[#808000] shrink-0" />
          <span>Request Sent: <strong>{activeSuccess}</strong>. Care team has been notified!</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {requestTiles.map((tile) => (
          <button
            key={tile.id}
            onClick={() => handleRequest(tile.id, tile.title, tile.detail)}
            className="art-card p-6 text-left transition-all hover:scale-[1.01] hover:border-[#CFB53B] active:scale-95 flex items-center justify-between gap-4 group"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-art bg-[#FFFDD0] border border-[#CFB53B]/60 flex items-center justify-center shrink-0 shadow-sm">
                <tile.Icon className={`w-7 h-7 ${tile.iconColor}`} />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#17211C] group-hover:text-[#008080] transition-colors">{tile.title}</h3>
                <p className="text-xs sm:text-sm font-semibold text-[#17211C]/60 mt-0.5 font-sans">{tile.sub}</p>
              </div>
            </div>
            <span className="text-xs font-bold bg-[#008080]/10 text-[#008080] border border-[#008080]/30 px-3 py-1.5 rounded-art shadow-sm shrink-0 font-sans group-hover:bg-[#008080] group-hover:text-[#FFFFF0] transition-all">
              Request
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
