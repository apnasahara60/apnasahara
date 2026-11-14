import mongoose, { Schema, Document } from 'mongoose';

export interface ICaregiver extends Document {
  name: string;
  phone: string;
  email: string;
  avatarUrl?: string;
  rating: number;
  experienceYears: number;
  certifications: string[];
  verificationStatus: 'verified' | 'pending' | 'rejected';
  policeVerification: boolean;
  aadhaarVerified: boolean;
  activeVisitsCount: number;
  currentLat?: number;
  currentLng?: number;
  isAvailable: boolean;
  createdAt: Date;
}

const CaregiverSchema = new Schema<ICaregiver>({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  avatarUrl: { type: String },
  rating: { type: Number, default: 5.0 },
  experienceYears: { type: Number, default: 0 },
  certifications: [{ type: String }],
  verificationStatus: { type: String, enum: ['verified', 'pending', 'rejected'], default: 'pending' },
  policeVerification: { type: Boolean, default: false },
  aadhaarVerified: { type: Boolean, default: false },
  activeVisitsCount: { type: Number, default: 0 },
  currentLat: { type: Number },
  currentLng: { type: Number },
  isAvailable: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

export const Caregiver = mongoose.model<ICaregiver>('Caregiver', CaregiverSchema);
