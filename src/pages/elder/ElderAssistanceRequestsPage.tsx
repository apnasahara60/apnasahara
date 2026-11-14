import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, Volume2, ShoppingCart, Pill, Stethoscope, Car, MessageCircle } from 'lucide-react';
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
      icon: '💊',
      color: 'bg-amber-100 border-amber-300 text-amber-900',
      detail: 'Requesting refill for regular daily prescription medications.'
    },
    {
      id: 'Groceries',
      title: 'Need Groceries / Essentials',
      sub: 'राशन या फल चाहिए',
      icon: '🛒',
      color: 'bg-emerald-100 border-emerald-300 text-emerald-900',
      detail: 'Assistance needed with milk, vegetables or pantry supplies.'
    },
    {
      id: 'Unwell',
      title: 'Feeling Unwell / Doctor Call',
      sub: 'डॉक्टर से बात करनी है',
      icon: '🤒',
      color: 'bg-red-100 border-red-300 text-red-900',
      detail: 'Feeling uncomfortable; requesting tele-consult or doctor review.'
    },
    {
      id: 'Ride',
      title: 'Need Ride / Cab Escort',
      sub: 'गाड़ी या कैब चाहिए',
      icon: '🚗',
      color: 'bg-blue-100 border-blue-300 text-blue-900',
      detail: 'Need escort and cab for local visit or clinic checkup.'
    },
    {
      id: 'Companion',
      title: 'Just Want To Chat',
      sub: 'बातचीत करनी है',
      icon: '💬',
      color: 'bg-purple-100 border-purple-300 text-purple-900',
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Ask for Assistance • सहायता अनुरोध</h1>
          <p className="text-xs sm:text-sm text-slate-600">Tap any button to let your Sahayak and family know</p>
        </div>
        <button
          onClick={() => speak('Assistance request page. Tap any box to request groceries, medicines, or a ride.')}
          className="px-4 py-2 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md"
        >
          <Volume2 className="w-4 h-4" /> Listen
        </button>
      </div>

      {activeSuccess && (
        <div className="p-5 rounded-2xl bg-emerald-600 text-white font-bold text-sm flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 className="w-6 h-6 shrink-0" />
          <span>Request Sent: <strong>{activeSuccess}</strong>. We are on it!</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {requestTiles.map((tile) => (
          <button
            key={tile.id}
            onClick={() => handleRequest(tile.id, tile.title, tile.detail)}
            className={`p-6 sm:p-7 rounded-3xl border-2 ${tile.color} shadow-md text-left transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-between gap-4`}
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl">{tile.icon}</span>
              <div>
                <h3 className="text-lg sm:text-xl font-black">{tile.title}</h3>
                <p className="text-xs sm:text-sm font-bold opacity-80 mt-0.5">{tile.sub}</p>
              </div>
            </div>
            <span className="text-xs font-black bg-white/80 px-3 py-1.5 rounded-xl shadow-sm shrink-0">
              Tap to Request
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
