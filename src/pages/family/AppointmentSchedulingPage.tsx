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
  FileText
} from 'lucide-react';
import { dbStore } from '../../lib/supabase';
import { ElderProfile, Appointment } from '../../types';
import { useNotification } from '../../context/NotificationContext';

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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Doctor Appointments & Escorts</h1>
          <p className="text-xs text-slate-500">
            Clinical consultations, lab diagnostics & hospital accompaniment for <strong>{elder?.name}</strong>
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-md shadow-brand-600/30 flex items-center justify-center gap-2 transition-all hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          Schedule Doctor Visit
        </button>
      </div>

      {/* Appointment Cards */}
      <div className="space-y-4">
        {appointments.map((apt) => (
          <div
            key={apt.id}
            className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold shrink-0">
                  <CalendarIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">{apt.doctor_name}</h3>
                  <p className="text-xs text-brand-600 font-bold">{apt.specialty}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 uppercase">
                  {apt.status}
                </span>
                {apt.accompanied_by_caregiver && (
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200 flex items-center gap-1">
                    <Car className="w-3.5 h-3.5" /> Caregiver Escort Included
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-100 text-slate-600">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>
                  <strong>Date & Time:</strong> {new Date(apt.appointment_date).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })} at {apt.appointment_time}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>
                  <strong>Hospital:</strong> {apt.hospital_clinic}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>
                  <strong>Escort Sahayak:</strong> Priya Verma (Confirmed)
                </span>
              </div>
            </div>

            {apt.notes && (
              <p className="text-xs text-slate-600">
                <strong>Visit Notes:</strong> {apt.notes}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Schedule Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-xl font-black text-slate-900">Schedule Medical Appointment</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <form onSubmit={handleAddAppointment} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Doctor's Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Rajesh Mittal"
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Medical Specialty *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Cardiologist"
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Hospital / Clinic *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Fortis Hospital"
                    value={hospitalClinic}
                    onChange={(e) => setHospitalClinic(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Appointment Date *</label>
                  <input
                    type="date"
                    required
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Appointment Time *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 11:30 AM"
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <input
                  type="checkbox"
                  id="escort"
                  checked={accompanied}
                  onChange={(e) => setAccompanied(e.target.checked)}
                  className="w-4 h-4 text-brand-600 rounded"
                />
                <label htmlFor="escort" className="text-xs font-bold text-slate-800 cursor-pointer">
                  Assign Sahayak to accompany parent door-to-door in cab
                </label>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Special Consultation Notes</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Need to show latest HbA1c lab report and renew Telma 40 prescription."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow-md shadow-brand-600/30"
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
