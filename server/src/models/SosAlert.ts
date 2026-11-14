import mongoose, { Schema, Document } from 'mongoose';

export interface ISosAlert extends Document {
  elderId: string;
  elderName: string;
  elderPhone: string;
  address: string;
  lat: number;
  lng: number;
  triggeredAt: Date;
  status: 'triggered' | 'acknowledged' | 'dispatched' | 'resolved';
  severity: 'Critical' | 'Urgent' | 'General Help';
  responderName?: string;
  dispatchedAt?: Date;
  resolvedAt?: Date;
  notes?: string;
}

const SosAlertSchema = new Schema<ISosAlert>({
  elderId: { type: String, required: true },
  elderName: { type: String, required: true },
  elderPhone: { type: String, default: '' },
  address: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  triggeredAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['triggered', 'acknowledged', 'dispatched', 'resolved'], default: 'triggered' },
  severity: { type: String, enum: ['Critical', 'Urgent', 'General Help'], default: 'Critical' },
  responderName: { type: String },
  dispatchedAt: { type: Date },
  resolvedAt: { type: Date },
  notes: { type: String }
});

export const SosAlert = mongoose.model<ISosAlert>('SosAlert', SosAlertSchema);
