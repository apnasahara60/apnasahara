import mongoose, { Schema, Document } from 'mongoose';

export interface INotification extends Document {
  userId: string;
  title: string;
  message: string;
  type: 'sos' | 'health' | 'visit' | 'medication' | 'system';
  read: boolean;
  link?: string;
  createdAt: Date;
}

const NotificationSchema = new Schema<INotification>({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['sos', 'health', 'visit', 'medication', 'system'], default: 'system' },
  read: { type: Boolean, default: false },
  link: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export const Notification = mongoose.model<INotification>('Notification', NotificationSchema);
