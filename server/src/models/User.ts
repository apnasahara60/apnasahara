import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: 'family' | 'elder' | 'caregiver' | 'admin';
  phone: string;
  city?: string;
  isOnboarded?: boolean;
  avatarUrl?: string;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['family', 'elder', 'caregiver', 'admin'], default: 'family' },
  phone: { type: String, default: '' },
  city: { type: String, default: '' },
  isOnboarded: { type: Boolean, default: false },
  avatarUrl: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export const User = mongoose.model<IUser>('User', UserSchema);
