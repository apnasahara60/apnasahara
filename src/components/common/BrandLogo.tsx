import React from 'react';

interface BrandLogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  showText = true,
  size = 'md'
}) => {
  const heights = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12',
    xl: 'h-16'
  };

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <img
        src="/logo.png"
        alt="ApnaSahara Logo"
        className={`${heights[size]} w-auto object-contain select-none`}
      />
    </div>
  );
};
