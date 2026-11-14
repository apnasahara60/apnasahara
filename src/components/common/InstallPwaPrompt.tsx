import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone, Check } from 'lucide-react';

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
    <div className="fixed bottom-20 left-4 sm:left-6 z-40 max-w-sm w-full bg-slate-900 text-white rounded-2xl shadow-2xl p-4 border border-slate-800 animate-slide-up">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-400 border border-brand-500/30 flex items-center justify-center shrink-0">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-white">Install ApnaSahara App</h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Instant 1-tap SOS button & offline dashboard on your home screen.
            </p>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="text-slate-400 hover:text-white p-1"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-3.5 flex items-center gap-2">
        <button
          onClick={handleInstall}
          className="flex-1 py-2 px-3 rounded-xl bg-brand-600 hover:bg-brand-500 font-bold text-xs text-white flex items-center justify-center gap-1.5 shadow-md shadow-brand-600/30 transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          Install Web App
        </button>
        <button
          onClick={handleDismiss}
          className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 font-semibold text-xs text-slate-300 transition-colors"
        >
          Maybe Later
        </button>
      </div>
    </div>
  );
};
