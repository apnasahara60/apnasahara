import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  PhoneCall,
  CheckCircle2,
  X,
  Volume2,
  ShieldCheck,
  ArrowLeft,
  Siren
} from 'lucide-react';
import { dbStore } from '../../lib/mongoStore';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useNotification } from '../../context/NotificationContext';

export const ElderSosPage: React.FC = () => {
  const { speak } = useAccessibility();
  const { triggerEmergencySiren, stopEmergencySiren, showToast } = useNotification();
  const elder = dbStore.getElders()[0];

  const [countdown, setCountdown] = useState<number | null>(null);
  const [isTriggered, setIsTriggered] = useState(false);

  useEffect(() => {
    let timer: any;
    if (countdown !== null && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      // Countdown expired -> trigger SOS
      executeSosTrigger();
      setCountdown(null);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleStartCountdown = () => {
    speak('Emergency button pressed. Triggering in five seconds. Press cancel if this was an accident.');
    setCountdown(5);
  };

  const handleCancelCountdown = () => {
    setCountdown(null);
    speak('Emergency alert cancelled.');
    showToast('SOS Cancelled', 'Alert was cancelled before dispatch', 'info');
  };

  const executeSosTrigger = () => {
    if (!elder) return;
    dbStore.triggerSos(
      elder.id,
      elder.name,
      elder.phone,
      elder.address,
      elder.safe_zone_lat,
      elder.safe_zone_lng
    );
    triggerEmergencySiren();
    setIsTriggered(true);
    speak('Emergency alert activated! Your son Rahul and nearest caregiver Priya have been notified.');
  };

  const handleResetSos = () => {
    stopEmergencySiren();
    setIsTriggered(false);
  };

  return (
    <div className="max-w-3xl mx-auto py-6 space-y-8 text-center font-serif">
      <div className="flex items-center justify-between">
        <Link
          to="/parent"
          className="art-btn-secondary px-4 py-2 inline-flex items-center gap-2 text-xs"
        >
          <ArrowLeft className="w-4 h-4 text-[#008080]" /> Back to Dashboard
        </Link>

        <button
          onClick={() => speak('Emergency SOS Page. Press the large crimson button to immediately alert your family and send an ambulance.')}
          className="p-2 text-[#008080] hover:bg-[#008080]/10 rounded-art border border-[#CFB53B]/40"
          title="Read Aloud"
        >
          <Volume2 className="w-5 h-5 text-[#008080]" />
        </button>
      </div>

      {isTriggered ? (
        /* Emergency Confirmed State */
        <div className="relative p-8 sm:p-12 rounded-art bg-gradient-to-b from-[#800020] to-[#5C0017] text-[#FFFFF0] shadow-2xl border-2 border-[#CFB53B] space-y-6">
          
          

          <div className="w-24 h-24 rounded-full bg-[#FFFFF0] text-[#800020] border-4 border-[#CFB53B] flex items-center justify-center mx-auto shadow-xl">
            <Siren className="w-12 h-12 text-[#800020] animate-bounce" />
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#CFB53B] font-bold">Active Distress Protocol</span>
            <h2 className="text-3xl sm:text-4xl font-bold">EMERGENCY SOS IS ACTIVE!</h2>
            <p className="text-base sm:text-lg text-[#FFFDD0] max-w-lg mx-auto font-sans">
              We have dispatched Caregiver <strong>Priya Verma</strong> to your residence. Your son <strong>Rahul Sharma</strong> has been alerted with an automated priority call.
            </p>
          </div>

          <div className="p-5 rounded-art bg-[#800020]/80 border border-[#CFB53B]/50 max-w-md mx-auto text-left text-xs sm:text-sm space-y-2 font-sans">
            <p className="font-bold text-[#FFFFF0] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#808000]" />
              GPS Coordinates Sent: {elder?.address}
            </p>
            <p className="font-bold text-[#FFFFF0] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#808000]" />
              Nearest Hospital Standby: Max Super Speciality
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href="tel:112"
              className="px-8 py-4 rounded-art bg-[#FFFFF0] text-[#800020] hover:bg-[#FFFDD0] font-bold text-base shadow-xl border-2 border-[#CFB53B] flex items-center gap-2"
            >
              <PhoneCall className="w-5 h-5 text-[#800020]" /> Dial 112 (Police / Ambulance)
            </a>

            <button
              onClick={handleResetSos}
              className="px-6 py-4 rounded-art bg-[#17211C] hover:bg-[#232F28] text-[#FFFFF0] font-bold text-sm border border-[#CFB53B]/60"
            >
              I Am Safe Now (Dismiss Alert)
            </button>
          </div>
        </div>
      ) : countdown !== null ? (
        /* Countdown in progress (5 seconds to cancel) */
        <div className="relative p-8 sm:p-12 rounded-art bg-gradient-to-b from-[#CFB53B] to-[#B89B2B] text-[#17211C] shadow-2xl border-2 border-[#800020] space-y-6 animate-pulse">
          
          

          <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-wide">DISPATCHING SOS SANCTUARY IN...</h2>
          <div className="w-28 h-28 rounded-full bg-[#17211C] text-[#FFFFF0] text-6xl font-bold flex items-center justify-center mx-auto shadow-2xl border-4 border-[#FFFFF0] font-mono">
            {countdown}
          </div>
          <p className="text-sm font-semibold max-w-md mx-auto font-sans">
            Accidental press? Tap cancel below within {countdown} seconds to stop emergency dispatch.
          </p>

          <div>
            <button
              onClick={handleCancelCountdown}
              className="px-10 py-5 rounded-art bg-[#FFFFF0] text-[#800020] hover:bg-[#FFFDD0] font-bold text-xl shadow-2xl border-2 border-[#800020] flex items-center justify-center gap-2 mx-auto active:scale-95 transition-all"
            >
              <X className="w-6 h-6 stroke-[3]" />
              CANCEL SOS (रद्द करें)
            </button>
          </div>
        </div>
      ) : (
        /* Default SOS Button */
        <div className="relative art-card p-8 sm:p-14 space-y-8">
          
          

          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#008080]">Instant Telemetry Beacon</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#17211C] mt-1">Emergency SOS Beacon</h2>
            <p className="text-sm sm:text-base text-[#17211C]/75 max-w-md mx-auto mt-2 font-sans">
              Press the large beacon below in any medical emergency, sudden chest pain, fall, or distress.
            </p>
          </div>

          <div className="w-full max-w-xs mx-auto my-4 border-t border-[#CFB53B]/25" />

          <div className="py-4">
            <button
              onClick={handleStartCountdown}
              className="w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-gradient-to-tr from-[#800020] via-[#A0002A] to-[#800020] text-[#FFFFF0] font-bold text-2xl sm:text-3xl shadow-2xl border-8 border-[#CFB53B] flex flex-col items-center justify-center mx-auto hover:scale-105 active:scale-95 transition-all"
            >
              <AlertTriangle className="w-14 h-14 mb-2 text-[#CFB53B] animate-bounce" />
              <span>SOS</span>
              <span className="text-xs tracking-widest uppercase font-bold mt-1 text-[#FFFDD0]">EMERGENCY</span>
            </button>
          </div>

          <div className="p-4 rounded-art bg-[#FFFDD0] border border-[#CFB53B] text-[#17211C] text-xs sm:text-sm font-semibold max-w-md mx-auto flex items-center justify-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#808000] shrink-0" />
            <span>5-second countdown grace period gives you time to cancel if pressed accidentally.</span>
          </div>
        </div>
      )}
    </div>
  );
};
