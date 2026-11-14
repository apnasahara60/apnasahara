import mongoose, { Schema, Document } from 'mongoose';

export interface IVisit extends Document {
  elderId: string;
  elderName: string;
  elderAddress: string;
  caregiverId: string;
  caregiverName: string;
  caregiverPhone: string;
  caregiverAvatar?: string;
  date: string;
  timeSlot: string;
  status: 'scheduled' | 'en_route' | 'in_progress' | 'completed' | 'cancelled';
  tasks: Array<{ id: string; title: string; completed: boolean; completedAt?: string }>;
  notes?: string;
  vitalsRecorded?: { bp?: string; pulse?: number; spo2?: number; glucose?: number };
  checkedInAt?: Date;
  checkedOutAt?: Date;
  familyFeedbackRating?: number;
  createdAt: Date;
}

const VisitSchema = new Schema<IVisit>({
  elderId: { type: String, required: true },
  elderName: { type: String, required: true },
  elderAddress: { type: String, required: true },
  caregiverId: { type: String, required: true },
  caregiverName: { type: String, required: true },
  caregiverPhone: { type: String, required: true },
  caregiverAvatar: { type: String },
  date: { type: String, required: true },
  timeSlot: { type: String, required: true },
  status: { type: String, enum: ['scheduled', 'en_route', 'in_progress', 'completed', 'cancelled'], default: 'scheduled' },
  tasks: [{
    id: { type: String },
    title: { type: String },
    completed: { type: Boolean, default: false },
    completedAt: { type: String }
  }],
  notes: { type: String },
  vitalsRecorded: {
    bp: { type: String },
    pulse: { type: Number },
    spo2: { type: Number },
    glucose: { type: Number }
  },
  checkedInAt: { type: Date },
  checkedOutAt: { type: Date },
  familyFeedbackRating: { type: Number },
  createdAt: { type: Date, default: Date.now }
});

export const Visit = mongoose.model<IVisit>('Visit', VisitSchema);
