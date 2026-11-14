import React, { useState, useEffect } from 'react';
import { ShieldCheck, CheckCircle2, XCircle, Clock, AlertTriangle, FileCheck, Star } from 'lucide-react';
import { dbStore } from '../../lib/mongoStore';
import { CaregiverProfile } from '../../types';
import { useNotification } from '../../context/NotificationContext';

export const CaregiverVerificationPage: React.FC = () => {
  const { showToast } = useNotification();
  const [caregivers, setCaregivers] = useState<CaregiverProfile[]>([]);

  const loadData = () => {
    setCaregivers(dbStore.getCaregivers());
  };

  useEffect(() => {
    loadData();
    const handleUpdate = () => loadData();
    window.addEventListener('apnasahara_datachange', handleUpdate);
    return () => window.removeEventListener('apnasahara_datachange', handleUpdate);
  }, []);

  const handleUpdateStatus = (cg: CaregiverProfile, newStatus: CaregiverProfile['verification_status']) => {
    const updated: CaregiverProfile = {
      ...cg,
      verification_status: newStatus,
      police_verification: newStatus === 'verified',
      aadhaar_verified: newStatus === 'verified'
    };
    dbStore.updateCaregiver(updated);
    showToast(
      newStatus === 'verified' ? 'Caregiver Verified' : 'Caregiver Flagged',
      `${cg.name} verification status is now ${newStatus.toUpperCase()}`,
      newStatus === 'verified' ? 'info' : 'sos'
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Caregiver Verification & Accreditation</h1>
        <p className="text-xs text-slate-500">
          Review police clearances, Aadhaar e-KYC records, and geriatric nursing certifications
        </p>
      </div>

      <div className="space-y-4">
        {caregivers.map((cg) => (
          <div
            key={cg.id}
            className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <img
                  src={cg.avatar_url || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'}
                  alt={cg.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-purple-500 shadow-sm"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-black text-slate-900">{cg.name}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full font-bold uppercase text-[10px] ${
                      cg.verification_status === 'verified'
                        ? 'bg-emerald-100 text-emerald-800'
                        : cg.verification_status === 'pending'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {cg.verification_status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {cg.email} • {cg.phone} • {cg.experience_years} Years Geriatric Experience
                  </p>
                  <p className="text-xs font-semibold text-brand-700 mt-1">
                    Certifications: {cg.certifications.join(', ')}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {cg.verification_status !== 'verified' ? (
                  <button
                    onClick={() => handleUpdateStatus(cg, 'verified')}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/30 flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Approve & Certify
                  </button>
                ) : (
                  <button
                    onClick={() => handleUpdateStatus(cg, 'pending')}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                  >
                    Reopen Review
                  </button>
                )}
                {cg.verification_status !== 'rejected' && (
                  <button
                    onClick={() => handleUpdateStatus(cg, 'rejected')}
                    className="px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs border border-red-200"
                  >
                    Reject
                  </button>
                )}
              </div>
            </div>

            {/* Verification Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-slate-400 font-semibold block text-[10px]">Aadhaar Biometric e-KYC</span>
                <p className="font-bold text-slate-900 flex items-center gap-1.5">
                  <CheckCircle2 className={`w-4 h-4 ${cg.aadhaar_verified ? 'text-emerald-600' : 'text-slate-400'}`} />
                  {cg.aadhaar_verified ? 'UIDAI Verified' : 'Pending Verification'}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-slate-400 font-semibold block text-[10px]">Police Criminal Clearance</span>
                <p className="font-bold text-slate-900 flex items-center gap-1.5">
                  <CheckCircle2 className={`w-4 h-4 ${cg.police_verification ? 'text-emerald-600' : 'text-slate-400'}`} />
                  {cg.police_verification ? 'Clear Background Record' : 'Documentation In Review'}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-slate-400 font-semibold block text-[10px]">Medical Accreditation</span>
                <p className="font-bold text-slate-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  GDA Council Certified
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
