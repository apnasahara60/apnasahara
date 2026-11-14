import { createClient } from '@supabase/supabase-js';
import {
  UserProfile,
  ElderProfile,
  CaregiverProfile,
  HealthMetric,
  Medication,
  SosAlert,
  Visit,
  Appointment,
  Subscription,
  AssistanceRequest,
  AppNotification
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_ELDERS,
  INITIAL_CAREGIVERS,
  INITIAL_HEALTH_METRICS,
  INITIAL_MEDICATIONS,
  INITIAL_SOS_ALERTS,
  INITIAL_VISITS,
  INITIAL_APPOINTMENTS,
  INITIAL_SUBSCRIPTIONS,
  INITIAL_ASSISTANCE_REQUESTS,
  INITIAL_NOTIFICATIONS
} from './mockData';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isLiveSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  !supabaseUrl.includes('placeholder') &&
  !supabaseAnonKey.includes('placeholder')
);

export const supabase = isLiveSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// ==========================================
// LOCAL STORAGE PERSISTENCE DATA LAYER (FALLBACK)
// ==========================================

const STORAGE_KEYS = {
  USERS: 'apnasahara_users',
  ELDERS: 'apnasahara_elders',
  CAREGIVERS: 'apnasahara_caregivers',
  HEALTH_METRICS: 'apnasahara_health_metrics',
  MEDICATIONS: 'apnasahara_medications',
  SOS_ALERTS: 'apnasahara_sos_alerts',
  VISITS: 'apnasahara_visits',
  APPOINTMENTS: 'apnasahara_appointments',
  SUBSCRIPTIONS: 'apnasahara_subscriptions',
  REQUESTS: 'apnasahara_requests',
  NOTIFICATIONS: 'apnasahara_notifications',
  SESSION: 'apnasahara_session_user'
};

function getStorage<T>(key: string, defaultData: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      localStorage.setItem(key, JSON.stringify(defaultData));
      return defaultData;
    }
    return JSON.parse(item);
  } catch (err) {
    console.error(`Error reading ${key} from storage:`, err);
    return defaultData;
  }
}

function setStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    // Dispatch window custom event for reactive real-time updates
    window.dispatchEvent(new CustomEvent('apnasahara_datachange', { detail: { key } }));
  } catch (err) {
    console.error(`Error saving ${key} to storage:`, err);
  }
}

export const dbStore = {
  // Users
  getUsers: (): UserProfile[] => getStorage(STORAGE_KEYS.USERS, INITIAL_USERS),
  saveUser: (user: UserProfile) => {
    const users = dbStore.getUsers();
    const index = users.findIndex(u => u.id === user.id || u.email.toLowerCase() === user.email.toLowerCase());
    if (index >= 0) {
      users[index] = { ...users[index], ...user };
    } else {
      users.push(user);
    }
    setStorage(STORAGE_KEYS.USERS, users);
    return user;
  },

  // Elders
  getElders: (): ElderProfile[] => getStorage(STORAGE_KEYS.ELDERS, INITIAL_ELDERS),
  getElderById: (id: string): ElderProfile | undefined => {
    return dbStore.getElders().find(e => e.id === id || e.user_id === id);
  },
  updateElder: (elder: ElderProfile) => {
    const elders = dbStore.getElders();
    const idx = elders.findIndex(e => e.id === elder.id || (elder.family_user_id && e.family_user_id === elder.family_user_id));
    if (idx >= 0) {
      elders[idx] = { ...elders[idx], ...elder };
    } else {
      elders.push(elder);
    }
    setStorage(STORAGE_KEYS.ELDERS, elders);
  },
  saveElder: (elder: ElderProfile): ElderProfile => {
    const elders = dbStore.getElders();
    const idx = elders.findIndex(e => e.id === elder.id || (elder.family_user_id && e.family_user_id === elder.family_user_id));
    if (idx >= 0) {
      elders[idx] = { ...elders[idx], ...elder };
    } else {
      elders.push(elder);
    }
    setStorage(STORAGE_KEYS.ELDERS, elders);
    return elder;
  },

  // Caregivers
  getCaregivers: (): CaregiverProfile[] => getStorage(STORAGE_KEYS.CAREGIVERS, INITIAL_CAREGIVERS),
  getCaregiverById: (id: string): CaregiverProfile | undefined => {
    return dbStore.getCaregivers().find(c => c.id === id || c.user_id === id);
  },
  updateCaregiver: (caregiver: CaregiverProfile) => {
    const list = dbStore.getCaregivers();
    const idx = list.findIndex(c => c.id === caregiver.id || (caregiver.user_id && c.user_id === caregiver.user_id));
    if (idx >= 0) {
      list[idx] = { ...list[idx], ...caregiver };
    } else {
      list.push(caregiver);
    }
    setStorage(STORAGE_KEYS.CAREGIVERS, list);
  },
  saveCaregiver: (caregiver: CaregiverProfile): CaregiverProfile => {
    const list = dbStore.getCaregivers();
    const idx = list.findIndex(c => c.id === caregiver.id || (caregiver.user_id && c.user_id === caregiver.user_id));
    if (idx >= 0) {
      list[idx] = { ...list[idx], ...caregiver };
    } else {
      list.push(caregiver);
    }
    setStorage(STORAGE_KEYS.CAREGIVERS, list);
    return caregiver;
  },

  // Health Metrics
  getHealthMetrics: (elderId?: string): HealthMetric[] => {
    const all = getStorage(STORAGE_KEYS.HEALTH_METRICS, INITIAL_HEALTH_METRICS);
    return elderId ? all.filter(m => m.elder_id === elderId) : all;
  },
  addHealthMetric: (metric: Omit<HealthMetric, 'id' | 'recorded_at'>): HealthMetric => {
    const all = dbStore.getHealthMetrics();
    const newMetric: HealthMetric = {
      ...metric,
      id: `metric-${Date.now()}`,
      recorded_at: new Date().toISOString()
    };
    all.unshift(newMetric);
    setStorage(STORAGE_KEYS.HEALTH_METRICS, all);

    // Also create notification for family
    dbStore.addNotification({
      user_id: 'user-family-1',
      title: 'New Vitals Recorded',
      message: `Systolic: ${newMetric.systolic_bp || '-'} / Diastolic: ${newMetric.diastolic_bp || '-'}, Pulse: ${newMetric.heart_rate || '-'}`,
      type: 'health',
      link: '/family/health'
    });

    return newMetric;
  },

  // Medications
  getMedications: (elderId?: string): Medication[] => {
    const all = getStorage(STORAGE_KEYS.MEDICATIONS, INITIAL_MEDICATIONS);
    return elderId ? all.filter(m => m.elder_id === elderId) : all;
  },
  toggleMedicationTaken: (id: string, taken: boolean) => {
    const list = dbStore.getMedications();
    const med = list.find(m => m.id === id);
    if (med) {
      med.is_taken_today = taken;
      med.taken_at = taken ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : undefined;
      if (taken && med.pills_remaining > 0) {
        med.pills_remaining -= 1;
      }
      setStorage(STORAGE_KEYS.MEDICATIONS, list);
    }
  },
  addMedication: (data: Omit<Medication, 'id' | 'is_taken_today'>) => {
    const list = dbStore.getMedications();
    const newMed: Medication = {
      ...data,
      id: `med-${Date.now()}`,
      is_taken_today: false
    };
    list.push(newMed);
    setStorage(STORAGE_KEYS.MEDICATIONS, list);
    return newMed;
  },

  // SOS Alerts
  getSosAlerts: (): SosAlert[] => getStorage(STORAGE_KEYS.SOS_ALERTS, INITIAL_SOS_ALERTS),
  triggerSos: (elderId: string, elderName: string, elderPhone: string, address: string, lat: number, lng: number) => {
    const alerts = dbStore.getSosAlerts();
    const newAlert: SosAlert = {
      id: `sos-${Date.now()}`,
      elder_id: elderId,
      elder_name: elderName,
      elder_phone: elderPhone,
      address,
      lat,
      lng,
      triggered_at: new Date().toISOString(),
      status: 'triggered',
      severity: 'Critical'
    };
    alerts.unshift(newAlert);
    setStorage(STORAGE_KEYS.SOS_ALERTS, alerts);

    // Broadcast urgent notifications
    dbStore.addNotification({
      user_id: 'user-family-1',
      title: '🚨 EMERGENCY SOS ALERT ACTIVATED!',
      message: `${elderName} pressed the emergency SOS button! Immediate attention required.`,
      type: 'sos',
      link: '/family/sos'
    });

    return newAlert;
  },
  updateSosStatus: (id: string, status: SosAlert['status'], responderNotes?: string, responderName?: string) => {
    const alerts = dbStore.getSosAlerts();
    const item = alerts.find(a => a.id === id);
    if (item) {
      item.status = status;
      if (responderNotes) item.notes = responderNotes;
      if (responderName) item.responder_name = responderName;
      if (status === 'dispatched') item.dispatched_at = new Date().toISOString();
      if (status === 'resolved') item.resolved_at = new Date().toISOString();
      setStorage(STORAGE_KEYS.SOS_ALERTS, alerts);

      dbStore.addNotification({
        user_id: 'user-family-1',
        title: `SOS Alert Status: ${status.toUpperCase()}`,
        message: `Alert for ${item.elder_name} is now marked as ${status}. ${responderNotes || ''}`,
        type: 'sos',
        link: '/family/sos'
      });
    }
  },

  // Visits
  getVisits: (caregiverId?: string, elderId?: string): Visit[] => {
    let list = getStorage(STORAGE_KEYS.VISITS, INITIAL_VISITS);
    if (caregiverId) list = list.filter(v => v.caregiver_id === caregiverId);
    if (elderId) list = list.filter(v => v.elder_id === elderId);
    return list;
  },
  updateVisit: (visit: Visit) => {
    const list = getStorage(STORAGE_KEYS.VISITS, INITIAL_VISITS);
    const idx = list.findIndex(v => v.id === visit.id);
    if (idx >= 0) {
      list[idx] = visit;
      setStorage(STORAGE_KEYS.VISITS, list);
    }
  },
  toggleVisitTask: (visitId: string, taskId: string) => {
    const list = getStorage(STORAGE_KEYS.VISITS, INITIAL_VISITS);
    const visit = list.find(v => v.id === visitId);
    if (visit) {
      const task = visit.tasks.find(t => t.id === taskId);
      if (task) {
        task.completed = !task.completed;
        task.completed_at = task.completed ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : undefined;
        setStorage(STORAGE_KEYS.VISITS, list);
      }
    }
  },

  // Appointments
  getAppointments: (elderId?: string): Appointment[] => {
    const list = getStorage(STORAGE_KEYS.APPOINTMENTS, INITIAL_APPOINTMENTS);
    return elderId ? list.filter(a => a.elder_id === elderId) : list;
  },
  addAppointment: (data: Omit<Appointment, 'id'>) => {
    const list = getStorage(STORAGE_KEYS.APPOINTMENTS, INITIAL_APPOINTMENTS);
    const newApt: Appointment = {
      ...data,
      id: `apt-${Date.now()}`
    };
    list.push(newApt);
    setStorage(STORAGE_KEYS.APPOINTMENTS, list);
    return newApt;
  },

  // Subscriptions
  getSubscriptions: (familyId?: string): Subscription[] => {
    const list = getStorage(STORAGE_KEYS.SUBSCRIPTIONS, INITIAL_SUBSCRIPTIONS);
    return familyId ? list.filter(s => s.family_id === familyId) : list;
  },
  updateSubscription: (sub: Subscription) => {
    const list = getStorage(STORAGE_KEYS.SUBSCRIPTIONS, INITIAL_SUBSCRIPTIONS);
    const idx = list.findIndex(s => s.id === sub.id);
    if (idx >= 0) {
      list[idx] = sub;
      setStorage(STORAGE_KEYS.SUBSCRIPTIONS, list);
    }
  },

  // Assistance Requests
  getAssistanceRequests: (elderId?: string): AssistanceRequest[] => {
    const list = getStorage(STORAGE_KEYS.REQUESTS, INITIAL_ASSISTANCE_REQUESTS);
    return elderId ? list.filter(r => r.elder_id === elderId) : list;
  },
  createAssistanceRequest: (data: Omit<AssistanceRequest, 'id' | 'requested_at' | 'status'>) => {
    const list = getStorage(STORAGE_KEYS.REQUESTS, INITIAL_ASSISTANCE_REQUESTS);
    const newReq: AssistanceRequest = {
      ...data,
      id: `req-${Date.now()}`,
      requested_at: new Date().toISOString(),
      status: 'pending'
    };
    list.unshift(newReq);
    setStorage(STORAGE_KEYS.REQUESTS, list);

    dbStore.addNotification({
      user_id: 'user-family-1',
      title: `New Elder Request: ${newReq.type}`,
      message: `${newReq.elder_name} requested assistance: ${newReq.details}`,
      type: 'system',
      link: '/family'
    });

    return newReq;
  },

  // Notifications
  getNotifications: (userId?: string): AppNotification[] => {
    const list = getStorage(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
    return userId ? list.filter(n => n.user_id === userId) : list;
  },
  addNotification: (data: Omit<AppNotification, 'id' | 'created_at' | 'read'>) => {
    const list = getStorage(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
    const newNotif: AppNotification = {
      ...data,
      id: `notif-${Date.now()}`,
      created_at: new Date().toISOString(),
      read: false
    };
    list.unshift(newNotif);
    setStorage(STORAGE_KEYS.NOTIFICATIONS, list);
    return newNotif;
  },
  markNotificationRead: (id: string) => {
    const list = getStorage(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
    const item = list.find(n => n.id === id);
    if (item) {
      item.read = true;
      setStorage(STORAGE_KEYS.NOTIFICATIONS, list);
    }
  },
  markAllNotificationsRead: (userId?: string) => {
    const list = getStorage(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
    list.forEach(n => {
      if (!userId || n.user_id === userId) {
        n.read = true;
      }
    });
    setStorage(STORAGE_KEYS.NOTIFICATIONS, list);
  }
};
