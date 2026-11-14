import mongoose, { Schema, Document } from 'mongoose';

export interface IMedication extends Document {
  elderId: string;
  name: string;
  dosage: string;
  frequency: string;
  timeOfDay: string[];
  scheduledTime: string;
  instructions?: string;
  isTakenToday: boolean;
  takenAt?: string;
  pillsRemaining: number;
  refillAlertThreshold: number;
  createdAt: Date;
}

const MedicationSchema = new Schema<IMedication>({
  elderId: { type: String, required: true },
  name: { type: String, required: true },
  dosage: { type: String, required: true },
  frequency: { type: String, required: true },
  timeOfDay: [{ type: String }],
  scheduledTime: { type: String, required: true },
  instructions: { type: String },
  isTakenToday: { type: Boolean, default: false },
  takenAt: { type: String },
  pillsRemaining: { type: Number, default: 30 },
  refillAlertThreshold: { type: Number, default: 7 },
  createdAt: { type: Date, default: Date.now }
});

export const Medication = mongoose.model<IMedication>('Medication', MedicationSchema);
