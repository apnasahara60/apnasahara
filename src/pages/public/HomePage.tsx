import React, { useState } from 'react';
import { ArtNouveauLandingPage } from '../../components/home/ArtNouveauLandingPage';
import { TranquilFamilyHome } from '../../components/home/TranquilFamilyHome';
import { Sparkles, ArrowRight, Compass } from 'lucide-react';

export const HomePage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'florido' | 'tranquil-app'>('florido');

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#FFFFF0] text-[#17211C]">
      {/* Top Banner Ribbon: Art Nouveau Florido Mode Switcher */}
      <div className="bg-[#17211C] text-[#FFFFF0] px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-2 border-b border-[#CFB53B]/40">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#008080] animate-pulse" />
          <span className="font-semibold text-[#FFFFF0]/90">
            Art Nouveau Florido Architecture · Belle Époque AI Platform
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setViewMode(viewMode === 'florido' ? 'tranquil-app' : 'florido')}
            className="px-3 py-1 rounded-[12px] bg-[#CFB53B]/20 hover:bg-[#CFB53B]/35 text-[#CFB53B] font-semibold text-[11px] transition-colors flex items-center gap-1.5 border border-[#CFB53B]/50"
          >
            {viewMode === 'florido' ? (
              <>
                <span>Switch to Family Space App</span>
                <ArrowRight className="w-3 h-3" />
              </>
            ) : (
              <>
                <span>View Art Nouveau Florido Landing Page</span>
                <Sparkles className="w-3 h-3" />
              </>
            )}
          </button>
        </div>
      </div>

      {viewMode === 'florido' ? (
        <ArtNouveauLandingPage />
      ) : (
        <div className="bg-[#FFFFF0] py-4">
          <TranquilFamilyHome />
        </div>
      )}
    </div>
  );
};
