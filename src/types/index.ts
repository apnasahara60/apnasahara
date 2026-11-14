export type UserRole = 'family' | 'elder' | 'caregiver' | 'admin';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone: string;
  avatar_url?: string;
  city?: string;
  is_onboarded?: boolean;
  created_at?: string;
}

export interface ElderProfile {
  id: string;
  user_id?: string;
  family_user_id: string;
  name: string;
  relationship?: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  blood_group: string;
  phone: string;
  emergency_phone: string;
  address: string;
  city: string;
  safe_zone_lat: number;
  safe_zone_lng: number;
  current_lat?: number;
  current_lng?: number;
  battery_level?: number;
  location_sharing_enabled: boolean;
  medical_conditions: string[];
  allergies: string[];
  preferred_language: string;
  avatar_url?: string;
}

export interface CaregiverProfile {
  id: string;
  user_id?: string;
  name: string;
  phone: string;
  email: string;
  avatar_url?: string;
  rating: number;
  experience_years: number;
  certifications: string[];
  verification_status: 'verified' | 'pending' | 'rejected';
  police_verification: boolean;
  aadhaar_verified: boolean;
  active_visits_count: number;
  current_lat?: number;
  current_lng?: number;
  is_available: boolean;
}

export interface HealthMetric {
  id: string;
  elder_id: string;
  recorded_at: string;
  systolic_bp?: number;
  diastolic_bp?: number;
  heart_rate?: number;
  spo2?: number; // Oxygen level
  blood_glucose?: number; // mg/dL
  blood_glucose_type?: 'Fasting' | 'Post-Meal' | 'Random';
  temperature?: number; // Fahrenheit
  weight?: number; // kg
  sleep_hours?: number;
  mood?: 'Very Good' | 'Good' | 'Fair' | 'Unwell' | 'Critical';
  notes?: string;
}

export interface Medication {
  id: string;
  elder_id: string;
  name: string;
  dosage: string;
  frequency: string; // e.g., 'Twice daily'
  time_of_day: ('Morning' | 'Afternoon' | 'Evening' | 'Night')[];
  scheduled_time: string; // e.g. "08:00 AM"
  instructions: string; // e.g. "After food with warm water"
  is_taken_today: boolean;
  taken_at?: string;
  pills_remaining: number;
  refill_alert_threshold: number;
}

export type SosStatus = 'triggered' | 'acknowledged' | 'dispatched' | 'resolved';

export interface SosAlert {
  id: string;
  elder_id: string;
  elder_name: string;
  elder_phone: string;
  address: string;
  lat: number;
  lng: number;
  triggered_at: string;
  status: SosStatus;
  severity: 'Critical' | 'Urgent' | 'General Help';
  responder_name?: string;
  dispatched_at?: string;
  resolved_at?: string;
  notes?: string;
}

export interface VisitTask {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  completed_at?: string;
}

export interface Visit {
  id: string;
  elder_id: string;
  elder_name: string;
  elder_address: string;
  caregiver_id: string;
  caregiver_name: string;
  caregiver_phone: string;
  caregiver_avatar?: string;
  date: string;
  time_slot: string; // e.g. "10:00 AM - 12:00 PM"
  status: 'scheduled' | 'en_route' | 'in_progress' | 'completed' | 'cancelled';
  tasks: VisitTask[];
  notes?: string;
  vitals_recorded?: {
    bp?: string;
    pulse?: number;
    spo2?: number;
    glucose?: number;
  };
  checked_in_at?: string;
  checked_out_at?: string;
  family_feedback_rating?: number;
}

export interface Appointment {
  id: string;
  elder_id: string;
  elder_name: string;
  doctor_name: string;
  specialty: string;
  hospital_clinic: string;
  appointment_date: string;
  appointment_time: string;
  status: 'upcoming' | 'completed' | 'rescheduled' | 'cancelled';
  notes?: string;
  accompanied_by_caregiver: boolean;
}

export interface Subscription {
  id: string;
  family_id: string;
  plan_name: 'Basic Sahara' | 'Comprehensive Sahara' | 'Premium 24/7 Guardian';
  status: 'active' | 'expiring_soon' | 'cancelled';
  monthly_amount: number;
  currency: string;
  renewal_date: string;
  elder_covered_name: string;
  visits_included_per_month: number;
  visits_used_this_month: number;
  emergency_sos_enabled: boolean;
  dedicated_care_manager: boolean;
}

export interface AssistanceRequest {
  id: string;
  elder_id: string;
  elder_name: string;
  type: 'Groceries' | 'Medicine' | 'Unwell' | 'Ride' | 'Companion' | 'Other';
  details: string;
  urgency: 'Low' | 'Medium' | 'High';
  status: 'pending' | 'in_progress' | 'fulfilled';
  requested_at: string;
}

export interface AppNotification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'sos' | 'health' | 'visit' | 'medication' | 'system';
  created_at: string;
  read: boolean;
  link?: string;
}
