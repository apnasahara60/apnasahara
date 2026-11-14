import React from 'react';
import { ArtNouveauLandingPage } from '../../components/home/ArtNouveauLandingPage';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#FFFFF0] text-[#17211C]">
      <ArtNouveauLandingPage />
    </div>
  );
};
