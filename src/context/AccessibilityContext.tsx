import React, { createContext, useContext, useState, useEffect } from 'react';

type TextSize = 'normal' | 'large' | 'xlarge';

interface AccessibilityContextType {
  textSize: TextSize;
  setTextSize: (size: TextSize) => void;
  highContrast: boolean;
  setHighContrast: (enabled: boolean) => void;
  toggleHighContrast: () => void;
  speak: (text: string) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [textSize, setTextSizeState] = useState<TextSize>('normal');
  const [highContrast, setHighContrastState] = useState<boolean>(false);

  useEffect(() => {
    const savedSize = localStorage.getItem('apnasahara_text_size') as TextSize;
    const savedContrast = localStorage.getItem('apnasahara_high_contrast') === 'true';

    if (savedSize) {
      setTextSizeState(savedSize);
      applyTextSize(savedSize);
    }
    if (savedContrast) {
      setHighContrastState(savedContrast);
      applyHighContrast(savedContrast);
    }
  }, []);

  const applyTextSize = (size: TextSize) => {
    document.body.classList.remove('text-large', 'text-xlarge');
    if (size === 'large') document.body.classList.add('text-large');
    if (size === 'xlarge') document.body.classList.add('text-xlarge');
  };

  const applyHighContrast = (enabled: boolean) => {
    if (enabled) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  };

  const setTextSize = (size: TextSize) => {
    setTextSizeState(size);
    localStorage.setItem('apnasahara_text_size', size);
    applyTextSize(size);
  };

  const setHighContrast = (enabled: boolean) => {
    setHighContrastState(enabled);
    localStorage.setItem('apnasahara_high_contrast', String(enabled));
    applyHighContrast(enabled);
  };

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9; // Slightly slower for elderly clarity
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <AccessibilityContext.Provider
      value={{
        textSize,
        setTextSize,
        highContrast,
        setHighContrast,
        toggleHighContrast,
        speak
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) throw new Error('useAccessibility must be used within AccessibilityProvider');
  return context;
};
