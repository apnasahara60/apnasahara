import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { User } from '../models/User.js';
import { Elder } from '../models/Elder.js';
import { Caregiver } from '../models/Caregiver.js';
import { HealthMetric } from '../models/HealthMetric.js';
import { Medication } from '../models/Medication.js';
import { SosAlert } from '../models/SosAlert.js';
import { Visit } from '../models/Visit.js';
import { Appointment } from '../models/Appointment.js';
import { Subscription } from '../models/Subscription.js';
import { Notification } from '../models/Notification.js';

dotenv.config();

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/apnasahara';

export const seedDatabase = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('🌱 Connected to MongoDB for seeding...');

    // Clear existing collections
    await Promise.all([
      User.deleteMany({}),
      Elder.deleteMany({}),
      Caregiver.deleteMany({}),
      HealthMetric.deleteMany({}),
      Medication.deleteMany({}),
      SosAlert.deleteMany({}),
      Visit.deleteMany({}),
      Appointment.deleteMany({}),
      Subscription.deleteMany({}),
      Notification.deleteMany({})
    ]);

    const passwordHash = await bcrypt.hash('password123', 10);

    // 1. Users
    const users = await User.insertMany([
      {
        name: 'Rahul Sharma',
        email: 'family@apnasahara.com',
        passwordHash,
        role: 'family',
        phone: '+91 98765 43210',
        city: 'Bengaluru',
        isOnboarded: true,
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'
      },
      {
        name: 'Ramesh Sharma',
        email: 'parent@apnasahara.com',
        passwordHash,
        role: 'elder',
        phone: '+91 98111 22334',
        city: 'Indore',
        isOnboarded: true,
        avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80'
      },
      {
        name: 'Priya Verma',
        email: 'caregiver@apnasahara.com',
        passwordHash,
        role: 'caregiver',
        phone: '+91 97222 33445',
        city: 'Indore',
        isOnboarded: true,
        avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80'
      },
      {
        name: 'Dr. Ananya Roy',
        email: 'admin@apnasahara.com',
        passwordHash,
        role: 'admin',
        phone: '+91 99999 88888',
        city: 'Indore',
        isOnboarded: true,
        avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=256&q=80'
      }
    ]);
    console.log(`✅ Seeded ${users.length} Users`);

    const familyUser = users[0];

    // 2. Elders
    const elders = await Elder.insertMany([
      {
        familyUserId: String(familyUser._id),
        name: 'Rajesh Sharma',
        relationship: 'Dad',
        age: 74,
        gender: 'Male',
        bloodGroup: 'B+',
        phone: '+91 98111 22334',
        emergencyPhone: '+91 98765 43210',
        address: 'B-402, Green Valley Apartments, Sector 62, Old Palasia',
        city: 'Indore',
        safeZoneLat: 22.7196,
        safeZoneLng: 75.8577,
        currentLat: 22.7210,
        currentLng: 75.8590,
        batteryLevel: 88,
        locationSharingEnabled: true,
        medicalConditions: ['Hypertension', 'Type 2 Diabetes', 'Osteoarthritis / Knee Pain'],
        allergies: ['Penicillin', 'Dust'],
        preferredLanguage: 'Hindi & English'
      }
    ]);
    console.log(`✅ Seeded ${elders.length} Elders`);

    const primaryElder = elders[0];

    // 3. Caregivers
    const caregivers = await Caregiver.insertMany([
      {
        name: 'Priya Verma',
        phone: '+91 97222 33445',
        email: 'caregiver@apnasahara.com',
        rating: 4.95,
        experienceYears: 5,
        certifications: ['General Duty Assistant (GDA)', 'First Aid & CPR Certified', 'Geriatric Care Specialist'],
        verificationStatus: 'verified',
        policeVerification: true,
        aadhaarVerified: true,
        activeVisitsCount: 1,
        currentLat: 22.7205,
        currentLng: 75.8582,
        isAvailable: true
      }
    ]);
    console.log(`✅ Seeded ${caregivers.length} Caregivers`);

    // 4. Health Metrics
    await HealthMetric.insertMany([
      {
        elderId: String(primaryElder._id),
        recordedAt: new Date(),
        systolicBp: 122,
        diastolicBp: 80,
        heartRate: 72,
        spo2: 98,
        bloodGlucose: 108,
        bloodGlucoseType: 'Fasting',
        temperature: 98.4,
        weight: 68,
        sleepHours: 7.5,
        mood: 'Good',
        notes: 'Blood pressure stable. Morning medication taken on time.'
      }
    ]);
    console.log('✅ Seeded Health Metrics');

    // 5. Medications
    await Medication.insertMany([
      {
        elderId: String(primaryElder._id),
        name: 'Telmisartan (Telma 40)',
        dosage: '40mg',
        frequency: 'Once daily',
        timeOfDay: ['Morning'],
        scheduledTime: '08:00 AM',
        instructions: 'Take after breakfast with water',
        isTakenToday: true,
        takenAt: '08:15 AM',
        pillsRemaining: 24,
        refillAlertThreshold: 5
      },
      {
        elderId: String(primaryElder._id),
        name: 'Metformin SR',
        dosage: '500mg',
        frequency: 'Twice daily',
        timeOfDay: ['Morning', 'Night'],
        scheduledTime: '08:30 PM',
        instructions: 'Take after dinner',
        isTakenToday: false,
        pillsRemaining: 18,
        refillAlertThreshold: 5
      }
    ]);
    console.log('✅ Seeded Medications');

    // 6. SOS Alerts
    await SosAlert.insertMany([
      {
        elderId: String(primaryElder._id),
        elderName: primaryElder.name,
        elderPhone: primaryElder.phone,
        address: primaryElder.address,
        lat: 22.7196,
        lng: 75.8577,
        triggeredAt: new Date(Date.now() - 86400000 * 2),
        status: 'resolved',
        severity: 'Critical',
        responderName: 'Priya Verma',
        resolvedAt: new Date(Date.now() - 86400000 * 2 + 1800000),
        notes: 'Accidental trigger during morning walk. Verified safe and uninjured.'
      }
    ]);
    console.log('✅ Seeded SOS Alerts');

    // 7. Visits
    await Visit.insertMany([
      {
        caregiverId: String(caregivers[0]._id),
        elderId: String(primaryElder._id),
        caregiverName: 'Priya Verma',
        elderName: primaryElder.name,
        date: new Date().toISOString().split('T')[0],
        startTime: '10:00 AM',
        endTime: '12:00 PM',
        status: 'in-progress',
        purpose: 'Wellness check, vital measurement & park accompaniment',
        tasks: [
          { id: 't1', title: 'Check BP and Pulse vitals', completed: true, completedAt: '10:15 AM' },
          { id: 't2', title: 'Accompany 20-min gentle walk in society garden', completed: true, completedAt: '10:45 AM' },
          { id: 't3', title: 'Verify afternoon hydration & medicine box', completed: false }
        ]
      }
    ]);
    console.log('✅ Seeded Visits');

    console.log('🎉 MongoDB Database Seeding Complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();
