import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { AppNotification, SosAlert } from '../types';
import { dbStore, supabase, isLiveSupabaseConfigured } from '../lib/supabase';
import { useAuth } from './AuthContext';

interface ToastItem {
  id: string;
  title: string;
  message: string;
  type: 'sos' | 'health' | 'visit' | 'medication' | 'system' | 'info';
}

interface NotificationContextType {
  notifications: AppNotification[];
  unreadCount: number;
  toasts: ToastItem[];
  activeSosAlerts: SosAlert[];
  isMuted: boolean;
  toggleMute: () => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  triggerEmergencySiren: () => void;
  stopEmergencySiren: () => void;
  dismissToast: (id: string) => void;
  showToast: (title: string, message: string, type?: ToastItem['type']) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [activeSosAlerts, setActiveSosAlerts] = useState<SosAlert[]>([]);
  const [isMuted, setIsMuted] = useState(false);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);
  const [oscillator, setOscillator] = useState<OscillatorNode | null>(null);

  const refreshData = useCallback(() => {
    const list = dbStore.getNotifications(user ? user.id : undefined);
    setNotifications(list);

    const alerts = dbStore.getSosAlerts().filter(a => a.status === 'triggered' || a.status === 'dispatched');
    setActiveSosAlerts(alerts);
  }, [user]);

  useEffect(() => {
    refreshData();

    // Listen to local event changes
    const handleDataChange = (e: any) => {
      refreshData();
      if (e.detail?.key?.includes('sos') || e.detail?.key?.includes('notif')) {
        // Show urgent toast if new SOS
        const alerts = dbStore.getSosAlerts().filter(a => a.status === 'triggered');
        if (alerts.length > 0) {
          triggerEmergencySiren();
          showToast('🚨 SOS ALERT TRIGGERED', `${alerts[0].elder_name} activated emergency response!`, 'sos');
        }
      }
    };

    window.addEventListener('apnasahara_datachange', handleDataChange);

    // If Supabase live is configured, listen to realtime channels
    if (isLiveSupabaseConfigured && supabase) {
      const channel = supabase
        .channel('public:sos_alerts')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'sos_alerts' }, (payload) => {
          showToast('🚨 EMERGENCY ALERT', `New SOS from ${payload.new.elder_name}`, 'sos');
          triggerEmergencySiren();
          refreshData();
        })
        .subscribe();

      return () => {
        window.removeEventListener('apnasahara_datachange', handleDataChange);
        if (supabase) {
          supabase.removeChannel(channel);
        }
      };
    }

    return () => {
      window.removeEventListener('apnasahara_datachange', handleDataChange);
    };
  }, [refreshData]);

  // Audio Siren using Web Audio API
  const triggerEmergencySiren = () => {
    if (isMuted) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      // Siren frequency modulation
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.4);
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.8);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 1.2);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 2.0);

      setAudioCtx(ctx);
      setOscillator(osc);
    } catch (e) {
      console.log('AudioContext not allowed without user interaction:', e);
    }
  };

  const stopEmergencySiren = () => {
    if (oscillator) {
      try {
        oscillator.stop();
        oscillator.disconnect();
      } catch (e) {}
      setOscillator(null);
    }
    if (audioCtx) {
      try {
        audioCtx.close();
      } catch (e) {}
      setAudioCtx(null);
    }
  };

  const showToast = (title: string, message: string, type: ToastItem['type'] = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newToast: ToastItem = { id, title, message, type };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      dismissToast(id);
    }, 6000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const markAsRead = (id: string) => {
    dbStore.markNotificationRead(id);
    refreshData();
  };

  const markAllAsRead = () => {
    dbStore.markAllNotificationsRead(user ? user.id : undefined);
    refreshData();
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (!isMuted) stopEmergencySiren();
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        toasts,
        activeSosAlerts,
        isMuted,
        toggleMute,
        markAsRead,
        markAllAsRead,
        triggerEmergencySiren,
        stopEmergencySiren,
        dismissToast,
        showToast
      }}
    >
      {children}

      {/* Floating Toast Container */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-xl shadow-2xl border transition-all duration-300 animate-slide-up flex items-start gap-3 ${
              toast.type === 'sos'
                ? 'bg-red-600 text-white border-red-700 shadow-red-500/30 ring-2 ring-red-400'
                : toast.type === 'health'
                ? 'bg-blue-600 text-white border-blue-700'
                : toast.type === 'visit'
                ? 'bg-emerald-700 text-white border-emerald-800'
                : toast.type === 'medication'
                ? 'bg-amber-600 text-white border-amber-700'
                : 'bg-slate-900 text-white border-slate-800'
            }`}
          >
            <div className="text-xl">
              {toast.type === 'sos' ? '🚨' : toast.type === 'health' ? '🩺' : toast.type === 'visit' ? '🚗' : toast.type === 'medication' ? '💊' : '🔔'}
            </div>
            <div className="flex-1 text-sm">
              <h4 className="font-bold">{toast.title}</h4>
              <p className="mt-0.5 opacity-90 text-xs leading-relaxed">{toast.message}</p>
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-white/80 hover:text-white p-1"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotification must be used within NotificationProvider');
  return context;
};
