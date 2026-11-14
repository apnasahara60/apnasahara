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
  AppNotification
} from '../types';

export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * ApnaSahara MongoDB Backend API Client
 * Connects the React/Vercel frontend to the Express/Render backend with MongoDB persistent storage.
 */
export const mongoApi = {
  // ---------------- AUTH ----------------
  login: async (email: string, password?: string): Promise<{ success: boolean; user?: UserProfile; token?: string; error?: string }> => {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: password || 'password123' })
      });
      return await res.json();
    } catch (err: any) {
      console.warn('MongoDB API unreachable, utilizing resilient fallback:', err.message);
      return { success: false, error: err.message };
    }
  },

  register: async (name: string, email: string, password: string, role: string, phone: string): Promise<{ success: boolean; user?: UserProfile; token?: string; error?: string }> => {
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role, phone })
      });
      return await res.json();
    } catch (err: any) {
      console.warn('MongoDB API register error:', err.message);
      return { success: false, error: err.message };
    }
  },

  // ---------------- ELDERS ----------------
  getElders: async (): Promise<ElderProfile[]> => {
    try {
      const res = await fetch(`${API_BASE}/elders`);
      if (!res.ok) throw new Error('Failed to fetch elders');
      const data = await res.json();
      return data.map((d: any) => ({
        id: d._id || d.id,
        family_user_id: d.familyUserId || d.family_user_id,
        name: d.name,
        relationship: d.relationship || 'Dad',
        age: d.age,
        gender: d.gender,
        blood_group: d.bloodGroup || d.blood_group,
        phone: d.phone,
        emergency_phone: d.emergencyPhone || d.emergency_phone,
        address: d.address,
        city: d.city,
        safe_zone_lat: d.safeZoneLat || d.safe_zone_lat || 22.7196,
        safe_zone_lng: d.safeZoneLng || d.safe_zone_lng || 75.8577,
        current_lat: d.currentLat || d.current_lat,
        current_lng: d.currentLng || d.current_lng,
        battery_level: d.batteryLevel || d.battery_level || 88,
        location_sharing_enabled: d.locationSharingEnabled ?? true,
        medical_conditions: d.medicalConditions || d.medical_conditions || [],
        allergies: d.allergies || [],
        preferred_language: d.preferredLanguage || 'Hindi & English'
      }));
    } catch (err) {
      return [];
    }
  },

  saveElder: async (elder: Partial<ElderProfile>): Promise<any> => {
    try {
      const payload = {
        familyUserId: elder.family_user_id,
        name: elder.name,
        relationship: elder.relationship || 'Dad',
        age: elder.age,
        gender: elder.gender,
        bloodGroup: elder.blood_group,
        phone: elder.phone,
        emergencyPhone: elder.emergency_phone,
        address: elder.address,
        city: elder.city,
        safeZoneLat: elder.safe_zone_lat || 22.7196,
        safeZoneLng: elder.safe_zone_lng || 75.8577,
        medicalConditions: elder.medical_conditions,
        allergies: elder.allergies,
        preferredLanguage: elder.preferred_language || 'Hindi & English'
      };
      const res = await fetch(`${API_BASE}/elders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return await res.json();
    } catch (err) {
      console.warn('Failed saving elder to MongoDB API:', err);
      return null;
    }
  },

  // ---------------- HEALTH METRICS ----------------
  getHealthMetrics: async (elderId?: string): Promise<HealthMetric[]> => {
    try {
      const url = elderId ? `${API_BASE}/health-metrics?elderId=${elderId}` : `${API_BASE}/health-metrics`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Metrics fetch failed');
      return await res.json();
    } catch {
      return [];
    }
  },

  addHealthMetric: async (metric: any): Promise<any> => {
    try {
      const res = await fetch(`${API_BASE}/health-metrics`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(metric)
      });
      return await res.json();
    } catch {
      return null;
    }
  },

  // ---------------- MEDICATIONS ----------------
  getMedications: async (elderId?: string): Promise<Medication[]> => {
    try {
      const url = elderId ? `${API_BASE}/medications?elderId=${elderId}` : `${API_BASE}/medications`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Medications fetch failed');
      return await res.json();
    } catch {
      return [];
    }
  },

  // ---------------- SOS ALERTS ----------------
  triggerSos: async (alert: any): Promise<any> => {
    try {
      const res = await fetch(`${API_BASE}/sos-alerts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(alert)
      });
      return await res.json();
    } catch {
      return null;
    }
  },

  // ---------------- VISITS ----------------
  getVisits: async (): Promise<Visit[]> => {
    try {
      const res = await fetch(`${API_BASE}/visits`);
      if (!res.ok) throw new Error('Visits fetch failed');
      return await res.json();
    } catch {
      return [];
    }
  }
};
