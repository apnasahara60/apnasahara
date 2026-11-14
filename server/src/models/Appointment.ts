import mongoose, { Schema, Document } from 'mongoose';

export interface IAppointment extends Document {
  elderId: string;
  elderName: string;
  doctorName: string;
  specialty: string;
  hospitalClinic: string;
  appointmentDate: string;
  appointmentTime: string;
  status: 'upcoming' | 'completed' | 'rescheduled' | 'cancelled';
  notes?: string;
  accompaniedByCaregiver: boolean;
  createdAt: Date;
}

const AppointmentSchema = new Schema<IAppointment>({
  elderId: { type: String, required: true },
  elderName: { type: String, required: true },
  doctorName: { type: String, required: true },
  specialty: { type: String, required: true },
  hospitalClinic: { type: String, required: true },
  appointmentDate: { type: String, required: true },
  appointmentTime: { type: String, required: true },
  status: { type: String, enum: ['upcoming', 'completed', 'rescheduled', 'cancelled'], default: 'upcoming' },
  notes: { type: String },
  accompaniedByCaregiver: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

export const Appointment = mongoose.model<IAppointment>('Appointment', AppointmentSchema);
