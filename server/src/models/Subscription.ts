import mongoose, { Schema, Document } from 'mongoose';

export interface ISubscription extends Document {
  familyId: string;
  planName: 'Basic Sahara' | 'Comprehensive Sahara' | 'Premium 24/7 Guardian';
  status: 'active' | 'expiring_soon' | 'cancelled';
  monthlyAmount: number;
  currency: string;
  renewalDate: string;
  elderCoveredName: string;
  visitsIncludedPerMonth: number;
  visitsUsedThisMonth: number;
  emergencySosEnabled: boolean;
  dedicatedCareManager: boolean;
  createdAt: Date;
}

const SubscriptionSchema = new Schema<ISubscription>({
  familyId: { type: String, required: true },
  planName: { type: String, enum: ['Basic Sahara', 'Comprehensive Sahara', 'Premium 24/7 Guardian'], required: true },
  status: { type: String, enum: ['active', 'expiring_soon', 'cancelled'], default: 'active' },
  monthlyAmount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  renewalDate: { type: String, required: true },
  elderCoveredName: { type: String, required: true },
  visitsIncludedPerMonth: { type: Number, default: 8 },
  visitsUsedThisMonth: { type: Number, default: 0 },
  emergencySosEnabled: { type: Boolean, default: true },
  dedicatedCareManager: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export const Subscription = mongoose.model<ISubscription>('Subscription', SubscriptionSchema);
