import React, { useState, useEffect } from 'react';
import { WifiOff, PhoneCall } from 'lucide-react';

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
    <div className="bg-[#800020] text-[#FFFFF0] px-4 py-2.5 shadow-md sticky top-16 sm:top-20 z-30 border-b-2 border-[#CFB53B] font-serif">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
        <div className="flex items-center gap-2.5 text-center sm:text-left">
          <WifiOff className="w-5 h-5 shrink-0 text-[#CFB53B] animate-pulse" />
          <span>
            <strong className="text-[#FFFFF0] uppercase tracking-wide text-xs">Offline Mode Active:</strong> Cached records remain accessible. 
            <span className="text-[#FFFDD0] ml-1">
              Background emergency telemetry, live GPS radar and instant SOS dispatch require an active connection.
            </span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="tel:112"
            className="px-3 py-1 rounded-art bg-[#FFFFF0] text-[#800020] hover:bg-[#FFFDD0] font-bold text-xs flex items-center gap-1.5 transition-colors border border-[#CFB53B]"
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#800020]" />
            Direct Dial 112
          </a>
        </div>
      </div>
    </div>
  );
};
