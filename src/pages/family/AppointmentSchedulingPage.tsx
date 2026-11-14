import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  Calendar as CalendarIcon,
  Plus,
  Clock,
  MapPin,
  User,
  ShieldCheck,
  CheckCircle2,
  Car,
  FileText,
  X
} from 'lucide-react';
import { dbStore } from '../../lib/supabase';
import { ElderProfile, Appointment } from '../../types';
import { useNotification } from '../../context/NotificationContext';
import { OrnateCorner } from '../../components/art-nouveau/ArtNouveauDecorations';

export const AppointmentSchedulingPage: React.FC = () => {
  const context = useOutletContext<{ selectedElder?: ElderProfile }>();
  const elder = context?.selectedElder || dbStore.getElders()[0];
  const { showToast } = useNotification();

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [doctorName, setDoctorName] = useState('');
  const [specialty, setSpecialty] = useState('Senior Cardiologist');
  const [hospitalClinic, setHospitalClinic] = useState('Max Super Speciality Hospital, Vaishali');
  const [appointmentDate, setAppointmentDate] = useState('2026-11-20');
  const [appointmentTime, setAppointmentTime] = useState('11:00 AM');
  const [accompanied, setAccompanied] = useState(true);
  const [notes, setNotes] = useState('');

  const loadAppointments = () => {
    if (elder) {
      setAppointments(dbStore.getAppointments(elder.id));
    }
  };

  useEffect(() => {
    loadAppointments();
    const handleUpdate = () => loadAppointments();
    window.addEventListener('apnasahara_datachange', handleUpdate);
    return () => window.removeEventListener('apnasahara_datachange', handleUpdate);
  }, [elder]);

  const handleAddAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!elder) return;

    dbStore.addAppointment({
      elder_id: elder.id,
      elder_name: elder.name,
      doctor_name: doctorName,
      specialty,
      hospital_clinic: hospitalClinic,
      appointment_date: appointmentDate,
      appointment_time: appointmentTime,
      status: 'upcoming',
      accompanied_by_caregiver: accompanied,
      notes: notes || 'Routine clinic consultation and vitals review.'
    });

    showToast('Appointment Booked', `Doctor consultation scheduled for ${appointmentDate} at ${appointmentTime}`, 'visit');
    setShowAddModal(false);
    setDoctorName('');
    setNotes('');
  };

  return (
    <div className="space-y-6 font-serif text-[#17211C]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#CFB53B]/30 pb-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#008080]">
            Clinical Escorts
          </span>
          <h1 className="text-3xl font-bold text-[#17211C] tracking-tight">Doctor Appointments & Escorts</h1>
          <p className="text-xs text-[#17211C]/70 mt-0.5">
            Clinical consultations, lab diagnostics & hospital accompaniment for <strong>{elder?.name}</strong>
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 rounded-[12px] bg-[#008080] hover:brightness-90 text-[#FFFFF0] font-semibold text-xs shadow-md shadow-[#008080]/20 flex items-center justify-center gap-2 transition-all active:translate-y-[1px]"
        >
          <Plus className="w-4 h-4 text-[#CFB53B]" />
          <span>Schedule Doctor Visit</span>
        </button>
      </div>

      {/* Appointment Cards */}
      <div className="space-y-4">
        {appointments.map((apt) => (
          <div
            key={apt.id}
            className="p-6 rounded-[12px] bg-[#FFFFF0] border border-[#CFB53B]/40 shadow-[0_2px_12px_rgba(23,33,28,0.05)] space-y-4 hover:shadow-[0_4px_16px_rgba(23,33,28,0.08)] transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-[10px] bg-[#008080]/15 text-[#008080] border border-[#CFB53B]/40 flex items-center justify-center font-bold shrink-0">
                  <CalendarIcon className="w-6 h-6 text-[#008080]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#17211C] text-base">{apt.doctor_name}</h3>
                  <p className="text-xs text-[#008080] font-semibold">{apt.specialty}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#808000]/15 text-[#808000] border border-[#808000]/30 font-mono uppercase">
                  {apt.status}
                </span>
                {apt.accompanied_by_caregiver && (
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#005F9E]/15 text-[#005F9E] border border-[#005F9E]/30 flex items-center gap-1">
                    <Car className="w-3.5 h-3.5" /> Caregiver Escort Included
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-[#FFFDD0] p-4 rounded-[12px] border border-[#CFB53B]/30 text-[#17211C]">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#CFB53B]" />
                <span>
                  <strong>Date & Time:</strong> {new Date(apt.appointment_date).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })} at {apt.appointment_time}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#CFB53B]" />
                <span>
                  <strong>Hospital:</strong> {apt.hospital_clinic}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#808000]" />
                <span>
                  <strong>Escort Sahayak:</strong> Priya Verma (Confirmed)
                </span>
              </div>
            </div>

            {apt.notes && (
              <p className="text-xs text-[#17211C]/80">
                <strong>Visit Notes:</strong> {apt.notes}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Schedule Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[300] bg-[#17211C]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFFF0] rounded-[12px] border border-[#CFB53B] max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
            <OrnateCorner position="top-left" className="absolute top-2 left-2 text-[#CFB53B]" />

            <div className="flex items-center justify-between pb-3 border-b border-[#CFB53B]/30">
              <div>
                <span className="text-[11px] font-bold text-[#008080] uppercase tracking-wider">
                  Consultation Booking
                </span>
                <h3 className="text-xl font-bold text-[#17211C]">Schedule Medical Appointment</h3>
              </div>
              <button onClick={() => setShowAddModal(false)} className="text-[#17211C]/60 hover:text-[#800020]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddAppointment} className="space-y-4 text-left">
              <div>
                <label className="text-xs font-bold text-[#17211C] block mb-1">Doctor's Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Rajesh Mittal"
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-[12px] border border-[#CFB53B]/50 bg-[#FFFFF0] text-sm text-[#17211C] focus:ring-2 focus:ring-[#008080] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#17211C] block mb-1">Medical Specialty *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Cardiologist"
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-[12px] border border-[#CFB53B]/50 bg-[#FFFFF0] text-sm text-[#17211C] focus:ring-2 focus:ring-[#008080] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#17211C] block mb-1">Hospital / Clinic *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Fortis Hospital"
                    value={hospitalClinic}
                    onChange={(e) => setHospitalClinic(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-[12px] border border-[#CFB53B]/50 bg-[#FFFFF0] text-sm text-[#17211C] focus:ring-2 focus:ring-[#008080] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#17211C] block mb-1">Appointment Date *</label>
                  <input
                    type="date"
                    required
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-[12px] border border-[#CFB53B]/50 bg-[#FFFFF0] text-sm text-[#17211C] focus:ring-2 focus:ring-[#008080] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#17211C] block mb-1">Appointment Time *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 11:30 AM"
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-[12px] border border-[#CFB53B]/50 bg-[#FFFFF0] text-sm text-[#17211C] focus:ring-2 focus:ring-[#008080] focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-[12px] bg-[#FFFDD0] border border-[#CFB53B]/40">
                <input
                  type="checkbox"
                  id="escort"
                  checked={accompanied}
                  onChange={(e) => setAccompanied(e.target.checked)}
                  className="w-4 h-4 accent-[#008080] rounded cursor-pointer"
                />
                <label htmlFor="escort" className="text-xs font-bold text-[#17211C] cursor-pointer">
                  Assign Sahayak to accompany parent door-to-door in cab
                </label>
              </div>

              <div>
                <label className="text-xs font-bold text-[#17211C] block mb-1">Special Consultation Notes</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Need to show latest HbA1c lab report and renew Telma 40 prescription."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-[12px] border border-[#CFB53B]/50 bg-[#FFFFF0] text-sm text-[#17211C] focus:ring-2 focus:ring-[#008080] focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#CFB53B]/30">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-[12px] border border-[#CFB53B] text-xs font-semibold text-[#17211C] hover:bg-[#CFB53B]/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-[12px] bg-[#008080] hover:brightness-90 text-[#FFFFF0] text-xs font-bold shadow-md shadow-[#008080]/20 active:translate-y-[1px] transition-all"
                >
                  Confirm Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
