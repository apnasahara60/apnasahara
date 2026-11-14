import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  PhoneCall,
  CheckCircle2,
  X,
  Volume2,
  ShieldCheck,
  ArrowLeft
} from 'lucide-react';
import { dbStore } from '../../lib/supabase';
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
    <div className="max-w-3xl mx-auto py-6 space-y-8 text-center">
      <div className="flex items-center justify-between">
        <Link
          to="/parent"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-amber-300 font-bold text-xs text-slate-800 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        <button
          onClick={() => speak('Emergency SOS Page. Press the large red button to immediately alert your family and send an ambulance.')}
          className="p-2 text-amber-800 hover:bg-amber-100 rounded-xl"
        >
          <Volume2 className="w-5 h-5" />
        </button>
      </div>

      {isTriggered ? (
        /* Emergency Confirmed State */
        <div className="p-8 sm:p-12 rounded-3xl bg-red-600 text-white shadow-2xl shadow-red-600/50 space-y-6 animate-pulse">
          <div className="w-24 h-24 rounded-full bg-white text-red-600 flex items-center justify-center mx-auto text-4xl font-black shadow-xl">
            🚨
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-black">EMERGENCY SOS IS ACTIVE!</h2>
            <p className="text-base sm:text-lg text-red-100 max-w-lg mx-auto font-medium">
              We have dispatched Caregiver <strong>Priya Verma</strong> to your home address. Your son <strong>Rahul Sharma</strong> has been alerted with an urgent phone call.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-red-700/80 border border-red-400 max-w-md mx-auto text-left text-xs sm:text-sm space-y-2">
            <p className="font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              GPS Coordinates Sent: {elder?.address}
            </p>
            <p className="font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              Nearest Hospital Standby: Max Super Speciality
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href="tel:112"
              className="px-8 py-4 rounded-2xl bg-white text-red-700 hover:bg-red-50 font-black text-base shadow-xl flex items-center gap-2"
            >
              <PhoneCall className="w-5 h-5" /> Dial National Police/Ambulance (112)
            </a>

            <button
              onClick={handleResetSos}
              className="px-6 py-4 rounded-2xl bg-red-800 hover:bg-red-900 text-white font-bold text-sm border border-red-400"
            >
              I Am Safe Now (Dismiss Alert)
            </button>
          </div>
        </div>
      ) : countdown !== null ? (
        /* Countdown in progress (5 seconds to cancel) */
        <div className="p-8 sm:p-12 rounded-3xl bg-amber-500 text-slate-950 shadow-2xl space-y-6 animate-pulse">
          <h2 className="text-2xl sm:text-3xl font-black">DISPATCHING SOS EMERGENCY IN...</h2>
          <div className="w-28 h-28 rounded-full bg-slate-950 text-white text-6xl font-black flex items-center justify-center mx-auto shadow-2xl">
            {countdown}
          </div>
          <p className="text-sm font-bold max-w-md mx-auto">
            Accidental press? Tap cancel below within {countdown} seconds to stop the dispatch.
          </p>

          <div>
            <button
              onClick={handleCancelCountdown}
              className="px-10 py-5 rounded-3xl bg-white text-red-600 hover:bg-slate-100 font-black text-xl shadow-2xl flex items-center justify-center gap-2 mx-auto"
            >
              <X className="w-6 h-6 stroke-[3]" />
              CANCEL SOS (रद्द करें)
            </button>
          </div>
        </div>
      ) : (
        /* Default SOS Button */
        <div className="p-8 sm:p-14 rounded-3xl bg-white border-4 border-red-500 shadow-2xl space-y-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">Emergency SOS Beacon</h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto mt-2">
              Press the big red button below in any medical emergency, sudden chest pain, fall, or distress.
            </p>
          </div>

          <div className="py-4">
            <button
              onClick={handleStartCountdown}
              className="w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-gradient-to-tr from-red-600 to-rose-500 text-white font-black text-2xl sm:text-3xl shadow-2xl border-8 border-red-100 flex flex-col items-center justify-center mx-auto hover:scale-105 active:scale-95 transition-all animate-sos-glow"
            >
              <AlertTriangle className="w-14 h-14 mb-2 animate-bounce" />
              <span>SOS</span>
              <span className="text-xs tracking-widest uppercase font-bold mt-1">EMERGENCY</span>
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm font-semibold max-w-md mx-auto">
            🛡️ 5-second countdown grace period gives you time to cancel if pressed accidentally.
          </div>
        </div>
      )}
    </div>
  );
};
