import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  Pill,
  Calendar,
  PhoneCall,
  Activity,
  CheckCircle2,
  Smile,
  Volume2,
  Heart,
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import { dbStore } from '../../lib/supabase';
import { ElderProfile, Medication, Visit, HealthMetric } from '../../types';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useNotification } from '../../context/NotificationContext';

export const ElderDashboard: React.FC = () => {
  const { speak } = useAccessibility();
  const { showToast } = useNotification();
  const elders = dbStore.getElders();
  const elder = elders[0];

  const [medications, setMedications] = useState<Medication[]>([]);
  const [todayVisit, setTodayVisit] = useState<Visit | null>(null);
  const [selectedMood, setSelectedMood] = useState<string>('Good');

  const loadData = () => {
    if (!elder) return;
    const meds = dbStore.getMedications(elder.id);
    setMedications(meds);

    const visits = dbStore.getVisits(undefined, elder.id);
    setTodayVisit(visits[0] || null);
  };

  useEffect(() => {
    loadData();
    const handleUpdate = () => loadData();
    window.addEventListener('apnasahara_datachange', handleUpdate);
    return () => window.removeEventListener('apnasahara_datachange', handleUpdate);
  }, [elder]);

  const nextMed = medications.find(m => !m.is_taken_today) || medications[0];

  const handleTakeMed = (id: string) => {
    dbStore.toggleMedicationTaken(id, true);
    speak('Shabash! Medicine marked as taken. Good job taking care of your health.');
    showToast('Medicine Taken', 'Dose marked as completed', 'medication');
  };

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    if (!elder) return;
    dbStore.addHealthMetric({
      elder_id: elder.id,
      mood: mood as any,
      notes: `Elder checked in feeling ${mood} on senior dashboard.`
    });
    speak(`You reported feeling ${mood}. Rahul and your care team have been notified.`);
    showToast('Feeling Recorded', `Logged mood: ${mood}`, 'health');
  };

  return (
    <div className="space-y-6">
      {/* GIANT SOS BUTTON FOR ELDERS */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-red-600 via-red-600 to-rose-600 text-white shadow-2xl shadow-red-600/40 text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          <AlertTriangle className="w-4 h-4 text-white" />
          Emergency Help Button • आपातकालीन बटन
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">Need Urgent Help or Feeling Unwell?</h2>
          <p className="text-xs sm:text-sm text-red-100 max-w-lg mx-auto mt-1">
            Press this big button. We will immediately call your son Rahul, dispatch your Sahayak, and send an ambulance.
          </p>
        </div>

        <div className="pt-2">
          <Link
            to="/parent/sos"
            className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-3xl bg-white text-red-700 hover:bg-red-50 font-black text-xl sm:text-2xl shadow-2xl transform active:scale-95 transition-all animate-sos-glow"
          >
            <span className="w-4 h-4 rounded-full bg-red-600 animate-ping" />
            PRESS SOS EMERGENCY
          </Link>
        </div>
      </div>

      {/* How are you feeling today? (Large Touch Emojis) */}
      <div className="p-6 rounded-3xl bg-white border-2 border-amber-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-black text-slate-900">
            How are you feeling this morning? • आज तबीयत कैसी है?
          </h3>
          <button
            onClick={() => speak('How are you feeling this morning? Tap one of the three smiling faces.')}
            className="p-1.5 text-amber-800 hover:bg-amber-100 rounded-lg"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3 pt-1">
          {[
            { emoji: '😊', label: 'Feeling Good', sub: 'अच्छा लग रहा है', value: 'Good' },
            { emoji: '😐', label: 'Just Okay', sub: 'ठीक-ठाक', value: 'Fair' },
            { emoji: '🤒', label: 'Unwell / Pain', sub: 'तबीयत ठीक नहीं', value: 'Unwell' },
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => handleMoodSelect(item.value)}
              className={`p-4 rounded-2xl border-2 text-center transition-all ${
                selectedMood === item.value
                  ? 'bg-amber-100 border-amber-500 scale-105 shadow-md'
                  : 'bg-slate-50 border-slate-200 hover:bg-amber-50'
              }`}
            >
              <div className="text-3xl sm:text-4xl">{item.emoji}</div>
              <p className="font-black text-slate-900 text-xs sm:text-sm mt-1">{item.label}</p>
              <p className="text-[10px] sm:text-xs text-slate-500">{item.sub}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Next Medicine to Take Card */}
      {nextMed && (
        <div className="p-6 rounded-3xl bg-white border-2 border-amber-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
              Next Medicine Reminder • दवाई का समय
            </span>
            <button
              onClick={() => speak(`Your next medicine is ${nextMed.name}, dosage ${nextMed.dosage}, scheduled at ${nextMed.scheduled_time}. ${nextMed.instructions}`)}
              className="p-1.5 text-amber-800 hover:bg-amber-100 rounded-lg"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-2xl font-bold shrink-0">
                💊
              </div>
              <div>
                <h4 className="text-xl font-black text-slate-900">{nextMed.name}</h4>
                <p className="text-xs sm:text-sm font-bold text-slate-600 mt-0.5">
                  {nextMed.dosage} • Take at {nextMed.scheduled_time}
                </p>
                <p className="text-xs text-emerald-700 font-semibold mt-1">
                  Instructions: {nextMed.instructions}
                </p>
              </div>
            </div>

            {nextMed.is_taken_today ? (
              <span className="px-6 py-3 rounded-2xl bg-emerald-100 text-emerald-800 font-black text-sm flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Already Taken ✓
              </span>
            ) : (
              <button
                onClick={() => handleTakeMed(nextMed.id)}
                className="px-6 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-black text-sm sm:text-base shadow-lg shadow-brand-600/30 flex items-center justify-center gap-2 transition-transform hover:scale-105"
              >
                <CheckCircle2 className="w-5 h-5" />
                I Have Taken This Medicine
              </button>
            )}
          </div>
        </div>
      )}

      {/* Today's Caregiver Visitor Card */}
      {todayVisit && (
        <div className="p-6 rounded-3xl bg-white border-2 border-amber-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
              Who is Visiting You Today? • आज आने वाले सहायक
            </span>
            <button
              onClick={() => speak(`Caregiver Priya Verma is visiting you today at ${todayVisit.time_slot}. Tap the call button to speak with her.`)}
              className="p-1.5 text-blue-800 hover:bg-blue-100 rounded-lg"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={todayVisit.caregiver_avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'}
                alt={todayVisit.caregiver_name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-500 shadow-md"
              />
              <div>
                <h4 className="text-xl font-black text-slate-900">{todayVisit.caregiver_name}</h4>
                <p className="text-xs sm:text-sm text-slate-600 font-bold">
                  Certified Nurse Sahayak (Caregiver)
                </p>
                <p className="text-xs text-blue-600 font-extrabold mt-0.5">
                  Scheduled Time: {todayVisit.time_slot} ({todayVisit.status.replace('_', ' ')})
                </p>
              </div>
            </div>

            <a
              href={`tel:${todayVisit.caregiver_phone}`}
              className="px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-sm flex items-center justify-center gap-2 shadow-md"
            >
              <PhoneCall className="w-5 h-5 text-emerald-400" />
              Call {todayVisit.caregiver_name.split(' ')[0]} Now
            </a>
          </div>
        </div>
      )}

      {/* One-Tap Speed Dial Shortcuts */}
      <div className="p-6 rounded-3xl bg-white border-2 border-amber-200 shadow-sm space-y-4">
        <h3 className="text-base sm:text-lg font-black text-slate-900">
          One-Tap Speed Dial • परिवार को तुरंत फोन करें
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <a
            href="tel:+919876543210"
            className="p-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border-2 border-emerald-300 flex items-center gap-3 transition-colors"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-black text-xl">
              📞
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase">Son (बेटा)</p>
              <p className="font-black text-slate-900 text-base">Rahul Sharma</p>
              <p className="text-xs text-emerald-700 font-bold">Tap to Call</p>
            </div>
          </a>

          <a
            href="tel:+919722233445"
            className="p-4 rounded-2xl bg-blue-50 hover:bg-blue-100 border-2 border-blue-300 flex items-center gap-3 transition-colors"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-500 text-white flex items-center justify-center font-black text-xl">
              🩺
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase">Caregiver (सहायक)</p>
              <p className="font-black text-slate-900 text-base">Priya Verma</p>
              <p className="text-xs text-blue-700 font-bold">Tap to Call</p>
            </div>
          </a>

          <a
            href="tel:112"
            className="p-4 rounded-2xl bg-red-50 hover:bg-red-100 border-2 border-red-300 flex items-center gap-3 transition-colors"
          >
            <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center font-black text-xl">
              🚨
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase">National Police/Ambulance</p>
              <p className="font-black text-slate-900 text-base">Dial 112</p>
              <p className="text-xs text-red-700 font-bold">Toll Free 24/7</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};
