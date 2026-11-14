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
    <div className="space-y-6 font-serif">
      <div className="border-b border-[#CFB53B]/30 pb-4">
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#008080]">Background & Credentialing</span>
        <h1 className="text-2xl font-bold text-[#17211C]">Caregiver Verification & Accreditation</h1>
        <p className="text-xs sm:text-sm text-[#17211C]/75 font-sans">
          Review police clearances, Aadhaar e-KYC records, and geriatric nursing certifications
        </p>
      </div>

      <div className="space-y-4">
        {caregivers.map((cg) => (
          <div
            key={cg.id}
            className="art-card p-6 space-y-5"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#CFB53B]/30">
              <div className="flex items-center gap-4">
                <img
                  src={cg.avatar_url || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'}
                  alt={cg.name}
                  className="w-16 h-16 rounded-art object-cover border-2 border-[#CFB53B] shadow-sm"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-[#17211C]">{cg.name}</h3>
                    <span className={`px-2.5 py-0.5 rounded-art font-bold uppercase text-[10px] font-mono border ${
                      cg.verification_status === 'verified'
                        ? 'bg-[#808000]/15 text-[#808000] border-[#808000]/40'
                        : cg.verification_status === 'pending'
                        ? 'bg-[#CFB53B]/20 text-[#17211C] border-[#CFB53B]'
                        : 'bg-[#800020]/15 text-[#800020] border-[#800020]/40'
                    }`}>
                      {cg.verification_status}
                    </span>
                  </div>
                  <p className="text-xs text-[#17211C]/65 mt-0.5 font-sans">
                    {cg.email} • {cg.phone} • {cg.experience_years} Years Geriatric Experience
                  </p>
                  <p className="text-xs font-semibold text-[#008080] mt-1 font-sans">
                    Certifications: {cg.certifications.join(', ')}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {cg.verification_status !== 'verified' ? (
                  <button
                    onClick={() => handleUpdateStatus(cg, 'verified')}
                    className="art-btn-primary px-5 py-2.5 text-xs shadow-md flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#CFB53B]" /> Approve & Certify
                  </button>
                ) : (
                  <button
                    onClick={() => handleUpdateStatus(cg, 'pending')}
                    className="art-btn-secondary px-4 py-2 text-xs"
                  >
                    Reopen Review
                  </button>
                )}
                {cg.verification_status !== 'rejected' && (
                  <button
                    onClick={() => handleUpdateStatus(cg, 'rejected')}
                    className="art-btn-danger px-4 py-2 text-xs flex items-center gap-1"
                  >
                    <XCircle className="w-3.5 h-3.5" /> Flag
                  </button>
                )}
              </div>
            </div>

            {/* Verification Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-art bg-[#FFFDD0] border border-[#CFB53B]/40 flex items-center gap-3">
                <FileCheck className="w-5 h-5 text-[#808000]" />
                <div className="text-xs font-sans">
                  <p className="font-bold text-[#17211C]">Aadhaar Biometric e-KYC</p>
                  <p className="text-[#808000] font-semibold">{cg.aadhaar_verified ? 'Verified & Authenticated' : 'Pending Verification'}</p>
                </div>
              </div>

              <div className="p-3.5 rounded-art bg-[#FFFDD0] border border-[#CFB53B]/40 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[#808000]" />
                <div className="text-xs font-sans">
                  <p className="font-bold text-[#17211C]">Police Criminal Record Check</p>
                  <p className="text-[#808000] font-semibold">{cg.police_verification ? 'Clear Background (Delhi Police)' : 'Under Investigation'}</p>
                </div>
              </div>

              <div className="p-3.5 rounded-art bg-[#FFFDD0] border border-[#CFB53B]/40 flex items-center gap-3">
                <Star className="w-5 h-5 fill-[#CFB53B] text-[#CFB53B]" />
                <div className="text-xs font-sans">
                  <p className="font-bold text-[#17211C]">Client Family Rating</p>
                  <p className="text-[#008080] font-semibold font-mono">{cg.rating || 4.9} / 5.0 (52 reviews)</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
