import mongoose, { Schema, Document } from 'mongoose';

export interface IHealthMetric extends Document {
  elderId: string;
  recordedAt: Date;
  systolicBp?: number;
  diastolicBp?: number;
  heartRate?: number;
  spo2?: number;
  bloodGlucose?: number;
  bloodGlucoseType?: 'Fasting' | 'Post-Meal' | 'Random';
  temperature?: number;
  weight?: number;
  sleepHours?: number;
  mood?: 'Very Good' | 'Good' | 'Fair' | 'Unwell' | 'Critical';
  notes?: string;
}

const HealthMetricSchema = new Schema<IHealthMetric>({
  elderId: { type: String, required: true },
  recordedAt: { type: Date, default: Date.now },
  systolicBp: { type: Number },
  diastolicBp: { type: Number },
  heartRate: { type: Number },
  spo2: { type: Number },
  bloodGlucose: { type: Number },
  bloodGlucoseType: { type: String, enum: ['Fasting', 'Post-Meal', 'Random'] },
  temperature: { type: Number },
  weight: { type: Number },
  sleepHours: { type: Number },
  mood: { type: String, enum: ['Very Good', 'Good', 'Fair', 'Unwell', 'Critical'], default: 'Good' },
  notes: { type: String }
});

export const HealthMetric = mongoose.model<IHealthMetric>('HealthMetric', HealthMetricSchema);
