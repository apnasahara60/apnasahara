import mongoose, { Schema, Document } from 'mongoose';

export interface IElder extends Document {
  familyUserId: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  bloodGroup: string;
  phone: string;
  emergencyPhone: string;
  address: string;
  city: string;
  safeZoneLat: number;
  safeZoneLng: number;
  currentLat?: number;
  currentLng?: number;
  batteryLevel: number;
  locationSharingEnabled: boolean;
  medicalConditions: string[];
  allergies: string[];
  preferredLanguage: string;
  avatarUrl?: string;
  createdAt: Date;
}

const ElderSchema = new Schema<IElder>({
  familyUserId: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], default: 'Male' },
  bloodGroup: { type: String, default: 'B+' },
  phone: { type: String, default: '' },
  emergencyPhone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  safeZoneLat: { type: Number, required: true },
  safeZoneLng: { type: Number, required: true },
  currentLat: { type: Number },
  currentLng: { type: Number },
  batteryLevel: { type: Number, default: 100 },
  locationSharingEnabled: { type: Boolean, default: true },
  medicalConditions: [{ type: String }],
  allergies: [{ type: String }],
  preferredLanguage: { type: String, default: 'Hindi & English' },
  avatarUrl: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export const Elder = mongoose.model<IElder>('Elder', ElderSchema);
