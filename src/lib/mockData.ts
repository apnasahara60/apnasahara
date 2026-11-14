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

export const INITIAL_USERS: UserProfile[] = [
  {
    id: 'user-family-1',
    email: 'family@apnasahara.com',
    name: 'Rahul Sharma',
    role: 'family',
    phone: '+91 98765 43210',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    created_at: '2026-01-15T09:00:00Z'
  },
  {
    id: 'user-elder-1',
    email: 'parent@apnasahara.com',
    name: 'Ramesh Sharma',
    role: 'elder',
    phone: '+91 98111 22334',
    avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80',
    created_at: '2026-01-15T09:30:00Z'
  },
  {
    id: 'user-caregiver-1',
    email: 'caregiver@apnasahara.com',
    name: 'Priya Verma',
    role: 'caregiver',
    phone: '+91 97222 33445',
    avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
    created_at: '2026-01-10T11:00:00Z'
  },
  {
    id: 'user-admin-1',
    email: 'admin@apnasahara.com',
    name: 'Dr. Ananya Roy',
    role: 'admin',
    phone: '+91 99999 88888',
    avatar_url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=256&q=80',
    created_at: '2025-11-01T08:00:00Z'
  }
];

export const INITIAL_ELDERS: ElderProfile[] = [
  {
    id: 'elder-1',
    user_id: 'user-elder-1',
    family_user_id: 'user-family-1',
    name: 'Ramesh Sharma',
    age: 74,
    gender: 'Male',
    blood_group: 'B+',
    phone: '+91 98111 22334',
    emergency_phone: '+91 98765 43210',
    address: 'B-402, Green Valley Apartments, Sector 62, Noida, NCR',
    city: 'Noida',
    safe_zone_lat: 28.6280,
    safe_zone_lng: 77.3649,
    current_lat: 28.6283,
    current_lng: 77.3652,
    battery_level: 84,
    location_sharing_enabled: true,
    medical_conditions: ['Hypertension', 'Type 2 Diabetes', 'Mild Osteoarthritis'],
    allergies: ['Penicillin', 'Sulfa drugs'],
    preferred_language: 'Hindi & English',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'elder-2',
    family_user_id: 'user-family-1',
    name: 'Savitri Sharma',
    age: 70,
    gender: 'Female',
    blood_group: 'O+',
    phone: '+91 98111 55667',
    emergency_phone: '+91 98765 43210',
    address: 'B-402, Green Valley Apartments, Sector 62, Noida, NCR',
    city: 'Noida',
    safe_zone_lat: 28.6280,
    safe_zone_lng: 77.3649,
    current_lat: 28.6280,
    current_lng: 77.3649,
    battery_level: 92,
    location_sharing_enabled: true,
    medical_conditions: ['Thyroid (Hypo)', 'Osteoporosis'],
    allergies: ['Dust', 'Pollen'],
    preferred_language: 'Hindi',
    avatar_url: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=300&q=80'
  }
];

export const INITIAL_CAREGIVERS: CaregiverProfile[] = [
  {
    id: 'caregiver-1',
    user_id: 'user-caregiver-1',
    name: 'Priya Verma',
    phone: '+91 97222 33445',
    email: 'caregiver@apnasahara.com',
    avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    rating: 4.9,
    experience_years: 6,
    certifications: ['General Duty Assistant (GDA)', 'BLS/CPR Certified (AHA)', 'Geriatric Care Specialist'],
    verification_status: 'verified',
    police_verification: true,
    aadhaar_verified: true,
    active_visits_count: 3,
    current_lat: 28.6220,
    current_lng: 77.3590,
    is_available: true
  },
  {
    id: 'caregiver-2',
    name: 'Rajesh Kumar',
    phone: '+91 98100 44556',
    email: 'rajesh.k@apnasahara.com',
    avatar_url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80',
    rating: 4.8,
    experience_years: 8,
    certifications: ['Paramedic Diploma', 'Elder Mobility Trainer', 'First Aid Certified'],
    verification_status: 'verified',
    police_verification: true,
    aadhaar_verified: true,
    active_visits_count: 2,
    current_lat: 28.6310,
    current_lng: 77.3710,
    is_available: true
  },
  {
    id: 'caregiver-3',
    name: 'Sunita Mehra',
    phone: '+91 98333 11223',
    email: 'sunita.m@apnasahara.com',
    avatar_url: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=300&q=80',
    rating: 4.7,
    experience_years: 4,
    certifications: ['ANM Nursing', 'Dementia Care Support'],
    verification_status: 'pending',
    police_verification: true,
    aadhaar_verified: true,
    active_visits_count: 0,
    is_available: false
  }
];

export const INITIAL_HEALTH_METRICS: HealthMetric[] = [
  {
    id: 'metric-1',
    elder_id: 'elder-1',
    recorded_at: '2026-11-14T07:30:00Z',
    systolic_bp: 124,
    diastolic_bp: 82,
    heart_rate: 72,
    spo2: 98,
    blood_glucose: 118,
    blood_glucose_type: 'Fasting',
    temperature: 98.4,
    weight: 68.5,
    sleep_hours: 7.5,
    mood: 'Good',
    notes: 'Morning walk 25 mins done. BP stable and comfortable.'
  },
  {
    id: 'metric-2',
    elder_id: 'elder-1',
    recorded_at: '2026-11-13T19:30:00Z',
    systolic_bp: 128,
    diastolic_bp: 84,
    heart_rate: 76,
    spo2: 97,
    blood_glucose: 142,
    blood_glucose_type: 'Post-Meal',
    temperature: 98.6,
    weight: 68.6,
    sleep_hours: 6.8,
    mood: 'Good',
    notes: 'Evening readings post light dinner.'
  },
  {
    id: 'metric-3',
    elder_id: 'elder-1',
    recorded_at: '2026-11-12T08:00:00Z',
    systolic_bp: 130,
    diastolic_bp: 85,
    heart_rate: 74,
    spo2: 98,
    blood_glucose: 114,
    blood_glucose_type: 'Fasting',
    temperature: 98.5,
    weight: 68.8,
    sleep_hours: 7.0,
    mood: 'Very Good',
    notes: 'Energy levels cheerful.'
  },
  {
    id: 'metric-4',
    elder_id: 'elder-1',
    recorded_at: '2026-11-11T08:00:00Z',
    systolic_bp: 135,
    diastolic_bp: 88,
    heart_rate: 78,
    spo2: 97,
    blood_glucose: 122,
    blood_glucose_type: 'Fasting',
    temperature: 98.6,
    weight: 68.9,
    sleep_hours: 6.5,
    mood: 'Fair',
    notes: 'Mild knee discomfort reported.'
  },
  {
    id: 'metric-5',
    elder_id: 'elder-2',
    recorded_at: '2026-11-14T07:15:00Z',
    systolic_bp: 118,
    diastolic_bp: 76,
    heart_rate: 68,
    spo2: 99,
    blood_glucose: 98,
    blood_glucose_type: 'Fasting',
    temperature: 98.3,
    weight: 59.2,
    sleep_hours: 8.0,
    mood: 'Very Good',
    notes: 'Thyroid pill taken on empty stomach.'
  }
];

export const INITIAL_MEDICATIONS: Medication[] = [
  {
    id: 'med-1',
    elder_id: 'elder-1',
    name: 'Telmisartan (Telma 40)',
    dosage: '40 mg',
    frequency: 'Once Daily',
    time_of_day: ['Morning'],
    scheduled_time: '08:00 AM',
    instructions: 'Take with warm water after breakfast for Blood Pressure.',
    is_taken_today: true,
    taken_at: '08:15 AM',
    pills_remaining: 24,
    refill_alert_threshold: 7
  },
  {
    id: 'med-2',
    elder_id: 'elder-1',
    name: 'Metformin Hydrochloride (Glycomet-SR)',
    dosage: '500 mg',
    frequency: 'Twice Daily',
    time_of_day: ['Morning', 'Night'],
    scheduled_time: '08:30 AM & 08:30 PM',
    instructions: 'Take immediately after meals for Sugar balance.',
    is_taken_today: true,
    taken_at: '08:35 AM',
    pills_remaining: 18,
    refill_alert_threshold: 10
  },
  {
    id: 'med-3',
    elder_id: 'elder-1',
    name: 'Calcium & Vitamin D3 (Shelcal 500)',
    dosage: '500 mg / 250 IU',
    frequency: 'Once Daily',
    time_of_day: ['Afternoon'],
    scheduled_time: '02:00 PM',
    instructions: 'Take post-lunch with milk or water for bone health.',
    is_taken_today: false,
    pills_remaining: 5,
    refill_alert_threshold: 7
  },
  {
    id: 'med-4',
    elder_id: 'elder-1',
    name: 'Atorvastatin (Atorva 10)',
    dosage: '10 mg',
    frequency: 'Once Daily',
    time_of_day: ['Night'],
    scheduled_time: '09:30 PM',
    instructions: 'Take before sleep for lipid cholesterol management.',
    is_taken_today: false,
    pills_remaining: 30,
    refill_alert_threshold: 7
  }
];

export const INITIAL_SOS_ALERTS: SosAlert[] = [
  {
    id: 'sos-1',
    elder_id: 'elder-1',
    elder_name: 'Ramesh Sharma',
    elder_phone: '+91 98111 22334',
    address: 'B-402, Green Valley Apartments, Sector 62, Noida',
    lat: 28.6280,
    lng: 77.3649,
    triggered_at: '2026-11-13T14:22:00Z',
    status: 'resolved',
    severity: 'Urgent',
    responder_name: 'Priya Verma (Caregiver)',
    dispatched_at: '2026-11-13T14:24:00Z',
    resolved_at: '2026-11-13T15:10:00Z',
    notes: 'Accidental trigger during phone placement. Caregiver verified wellness in person.'
  }
];

export const INITIAL_VISITS: Visit[] = [
  {
    id: 'visit-1',
    elder_id: 'elder-1',
    elder_name: 'Ramesh Sharma',
    elder_address: 'B-402, Green Valley Apartments, Sector 62, Noida',
    caregiver_id: 'caregiver-1',
    caregiver_name: 'Priya Verma',
    caregiver_phone: '+91 97222 33445',
    caregiver_avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    date: '2026-11-14',
    time_slot: '10:30 AM - 12:30 PM',
    status: 'en_route',
    tasks: [
      { id: 't-1', title: 'Record Morning Vitals (BP, Pulse, SpO2, Blood Sugar)', completed: false },
      { id: 't-2', title: 'Check Medication adherence and medicine box replenishment', completed: false },
      { id: 't-3', title: 'Assist with mild joint mobility & stretching exercises', completed: false },
      { id: 't-4', title: '30-minute companionship, news reading and mental engagement', completed: false },
      { id: 't-5', title: 'Confirm pantry essentials & drinking water availability', completed: false }
    ],
    notes: 'Caregiver Priya is en-route on two-wheeler. Estimated arrival in 12 mins.',
    checked_in_at: undefined
  },
  {
    id: 'visit-2',
    elder_id: 'elder-1',
    elder_name: 'Ramesh Sharma',
    elder_address: 'B-402, Green Valley Apartments, Sector 62, Noida',
    caregiver_id: 'caregiver-1',
    caregiver_name: 'Priya Verma',
    caregiver_phone: '+91 97222 33445',
    caregiver_avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    date: '2026-11-12',
    time_slot: '10:30 AM - 12:30 PM',
    status: 'completed',
    tasks: [
      { id: 't-21', title: 'Record Vitals', completed: true, completed_at: '10:45 AM' },
      { id: 't-22', title: 'Check Medication', completed: true, completed_at: '11:00 AM' },
      { id: 't-23', title: 'Mobility Walk in Society Garden', completed: true, completed_at: '11:45 AM' },
      { id: 't-24', title: 'Companionship & Tea', completed: true, completed_at: '12:20 PM' }
    ],
    notes: 'Uncle was in high spirits! BP was 130/85, took his afternoon meds on time. Garden walk completed.',
    vitals_recorded: {
      bp: '130/85 mmHg',
      pulse: 74,
      spo2: 98,
      glucose: 114
    },
    checked_in_at: '2026-11-12T10:32:00Z',
    checked_out_at: '2026-11-12T12:34:00Z',
    family_feedback_rating: 5
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-1',
    elder_id: 'elder-1',
    elder_name: 'Ramesh Sharma',
    doctor_name: 'Dr. V. K. Tandon',
    specialty: 'Senior Cardiologist',
    hospital_clinic: 'Max Super Speciality Hospital, Vaishali',
    appointment_date: '2026-11-18',
    appointment_time: '11:30 AM',
    status: 'upcoming',
    notes: 'Routine 6-month cardiovascular checkup and ECG review.',
    accompanied_by_caregiver: true
  },
  {
    id: 'apt-2',
    elder_id: 'elder-1',
    elder_name: 'Ramesh Sharma',
    doctor_name: 'Dr. Meenakshi Sundaram',
    specialty: 'Endocrinologist',
    hospital_clinic: 'Apollo Clinic, Sector 62',
    appointment_date: '2026-11-25',
    appointment_time: '04:00 PM',
    status: 'upcoming',
    notes: 'HbA1c test report review and dietary adjustment.',
    accompanied_by_caregiver: true
  }
];

export const INITIAL_SUBSCRIPTIONS: Subscription[] = [
  {
    id: 'sub-1',
    family_id: 'user-family-1',
    plan_name: 'Comprehensive Sahara',
    status: 'active',
    monthly_amount: 8999,
    currency: 'INR',
    renewal_date: '2026-12-15',
    elder_covered_name: 'Ramesh Sharma & Savitri Sharma',
    visits_included_per_month: 12,
    visits_used_this_month: 5,
    emergency_sos_enabled: true,
    dedicated_care_manager: true
  }
];

export const INITIAL_ASSISTANCE_REQUESTS: AssistanceRequest[] = [
  {
    id: 'req-1',
    elder_id: 'elder-1',
    elder_name: 'Ramesh Sharma',
    type: 'Medicine',
    details: 'Need refill for Shelcal 500 calcium tablets (only 5 tablets remaining).',
    urgency: 'Medium',
    status: 'pending',
    requested_at: '2026-11-14T06:45:00Z'
  },
  {
    id: 'req-2',
    elder_id: 'elder-1',
    elder_name: 'Ramesh Sharma',
    type: 'Companion',
    details: 'Would like caregiver Priya to help set up video call with grandkids on Saturday.',
    urgency: 'Low',
    status: 'fulfilled',
    requested_at: '2026-11-11T16:00:00Z'
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    user_id: 'user-family-1',
    title: 'Caregiver En Route',
    message: 'Priya Verma is on the way for Shri Ramesh Sharma’s scheduled visit (ETA 12 mins).',
    type: 'visit',
    created_at: '2026-11-14T10:15:00Z',
    read: false,
    link: '/family/caregiver'
  },
  {
    id: 'notif-2',
    user_id: 'user-family-1',
    title: 'Morning Vitals Recorded',
    message: 'Blood Pressure: 124/82 mmHg, Pulse: 72 bpm, SpO2: 98%. All parameters healthy.',
    type: 'health',
    created_at: '2026-11-14T07:35:00Z',
    read: true,
    link: '/family/health'
  },
  {
    id: 'notif-3',
    user_id: 'user-family-1',
    title: 'Medication Refill Needed',
    message: 'Calcium Shelcal 500 has only 5 pills left. Assistance request logged.',
    type: 'medication',
    created_at: '2026-11-14T06:50:00Z',
    read: false,
    link: '/family/medications'
  }
];
