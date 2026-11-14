import mongoose, { Schema, Document } from 'mongoose';

export interface IAssistanceRequest extends Document {
  elderId: string;
  elderName: string;
  type: 'Groceries' | 'Medicine' | 'Unwell' | 'Ride' | 'Companion' | 'Other';
  details: string;
  urgency: 'Low' | 'Medium' | 'High';
  status: 'pending' | 'in_progress' | 'fulfilled';
  requestedAt: Date;
}

const AssistanceRequestSchema = new Schema<IAssistanceRequest>({
  elderId: { type: String, required: true },
  elderName: { type: String, required: true },
  type: { type: String, enum: ['Groceries', 'Medicine', 'Unwell', 'Ride', 'Companion', 'Other'], required: true },
  details: { type: String, required: true },
  urgency: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  status: { type: String, enum: ['pending', 'in_progress', 'fulfilled'], default: 'pending' },
  requestedAt: { type: Date, default: Date.now }
});

export const AssistanceRequest = mongoose.model<IAssistanceRequest>('AssistanceRequest', AssistanceRequestSchema);
