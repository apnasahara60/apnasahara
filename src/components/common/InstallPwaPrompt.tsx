import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone } from 'lucide-react';

export const InstallPwaPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already running as standalone PWA
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone) {
      setIsInstalled(true);
      return;
    }

    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Check if user dismissed recently
      const dismissed = sessionStorage.getItem('apnasahara_pwa_dismissed');
      if (!dismissed) {
        setShowPrompt(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handler);

    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
    });

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      alert('To install on iOS: Tap the Share button in Safari, then select "Add to Home Screen".');
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    sessionStorage.setItem('apnasahara_pwa_dismissed', 'true');
  };

  if (isInstalled || !showPrompt) return null;

  return (
    <div className="fixed bottom-20 left-4 sm:left-6 z-40 max-w-sm w-full bg-[#FFFFF0] text-[#17211C] rounded-art shadow-2xl p-4 border-2 border-[#CFB53B] font-serif animate-slide-up">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-art bg-[#008080]/10 text-[#008080] border border-[#CFB53B]/50 flex items-center justify-center shrink-0">
            <Smartphone className="w-5 h-5 text-[#008080]" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-[#17211C]">Install ApnaSahara</h4>
            <p className="text-xs text-[#17211C]/75 mt-0.5">
              1-tap SOS sanctuary dispatch & offline access on your home screen.
            </p>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="text-[#17211C]/60 hover:text-[#17211C] p-1"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-3.5 flex items-center gap-2">
        <button
          onClick={handleInstall}
          className="flex-1 py-2 px-3 rounded-art bg-[#008080] hover:bg-[#006666] font-bold text-xs text-[#FFFFF0] flex items-center justify-center gap-1.5 shadow-md border border-[#CFB53B]/50 transition-colors"
        >
          <Download className="w-3.5 h-3.5 text-[#CFB53B]" />
          Install Sanctuary App
        </button>
        <button
          onClick={handleDismiss}
          className="py-2 px-3 rounded-art bg-[#FFFDD0] hover:bg-[#FFFDD0]/80 font-semibold text-xs text-[#17211C] border border-[#CFB53B]/40 transition-colors"
        >
          Maybe Later
        </button>
      </div>
    </div>
  );
};
