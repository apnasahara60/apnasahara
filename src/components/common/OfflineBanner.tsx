import React, { useState, useEffect } from 'react';
import { WifiOff, AlertTriangle, PhoneCall } from 'lucide-react';

export const OfflineBanner: React.FC = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="bg-amber-600 text-white px-4 py-3 shadow-md sticky top-16 sm:top-20 z-30">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
        <div className="flex items-center gap-2.5 text-center sm:text-left">
          <WifiOff className="w-5 h-5 shrink-0 text-amber-200 animate-pulse" />
          <span>
            <strong>Offline Mode:</strong> Cached static assets remain accessible. 
            <span className="font-semibold text-amber-100 ml-1">
              Note: Background emergency monitoring, live GPS radar and instant SOS dispatch require an active network connection.
            </span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="tel:112"
            className="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            Dial 112 Directly
          </a>
        </div>
      </div>
    </div>
  );
};
