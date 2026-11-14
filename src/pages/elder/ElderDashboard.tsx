import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  Pill,
  CheckCircle2,
  Volume2,
  Heart,
  PhoneCall,
  Smile,
  Meh,
  Frown,
  Stethoscope,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { dbStore } from '../../lib/mongoStore';
import { Medication, Visit } from '../../types';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useNotification } from '../../context/NotificationContext';
import { WhiplashDivider, OrnateCorner } from '../../components/art-nouveau/ArtNouveauDecorations';

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
    <div className="space-y-6 font-serif">
      {/* GIANT SOS BUTTON FOR ELDERS */}
      <div className="relative p-6 sm:p-8 rounded-art bg-gradient-to-r from-[#800020] via-[#5C0017] to-[#800020] text-[#FFFFF0] shadow-2xl border-2 border-[#CFB53B] text-center space-y-4 overflow-hidden">
        <OrnateCorner position="top-left" color="#CFB53B" size={40} />
        <OrnateCorner position="top-right" color="#CFB53B" size={40} />

        <div className="inline-flex items-center gap-2 bg-[#FFFFF0]/15 border border-[#CFB53B]/50 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-[#FFFDD0]">
          <AlertTriangle className="w-4 h-4 text-[#CFB53B]" />
          Emergency Sanctuary Beacon • आपातकालीन बटन
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#FFFFF0]">Need Urgent Help or Feeling Unwell?</h2>
          <p className="text-xs sm:text-sm text-[#FFFDD0]/90 max-w-lg mx-auto mt-1 font-sans">
            Press this button. We will immediately call your son Rahul, dispatch your Sahayak Priya, and mobilize ambulance assistance.
          </p>
        </div>

        <div className="pt-2">
          <Link
            to="/parent/sos"
            className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-art bg-[#FFFFF0] text-[#800020] hover:bg-[#FFFDD0] font-bold text-xl sm:text-2xl shadow-2xl border-2 border-[#CFB53B] transform active:scale-95 transition-all"
          >
            <span className="w-4 h-4 rounded-full bg-[#800020] animate-ping" />
            PRESS SOS EMERGENCY
          </Link>
        </div>
      </div>

      {/* How are you feeling today? (Large High-Contrast Sentiment) */}
      <div className="art-card p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[#CFB53B]/30 pb-3">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#008080]">Morning Check-In</span>
            <h3 className="text-base sm:text-lg font-bold text-[#17211C]">
              How are you feeling this morning? • आज तबीयत कैसी है?
            </h3>
          </div>
          <button
            onClick={() => speak('How are you feeling this morning? Tap one of the three options.')}
            className="p-2 text-[#008080] hover:bg-[#008080]/10 rounded-art border border-[#CFB53B]/40"
            title="Read Aloud"
          >
            <Volume2 className="w-5 h-5 text-[#008080]" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3 pt-1">
          {[
            { Icon: Smile, label: 'Feeling Good', sub: 'अच्छा लग रहा है', value: 'Good', color: 'text-[#808000]' },
            { Icon: Meh, label: 'Just Okay', sub: 'ठीक-ठाक', value: 'Fair', color: 'text-[#CFB53B]' },
            { Icon: Frown, label: 'Unwell / Pain', sub: 'तबीयत ठीक नहीं', value: 'Unwell', color: 'text-[#800020]' },
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => handleMoodSelect(item.value)}
              className={`p-4 rounded-art border-2 text-center transition-all ${
                selectedMood === item.value
                  ? 'bg-[#FFFDD0] border-[#008080] shadow-md scale-102 ring-2 ring-[#008080]/20'
                  : 'bg-[#FFFFF0] border-[#CFB53B]/30 hover:border-[#CFB53B] hover:bg-[#FFFDD0]/50'
              }`}
            >
              <item.Icon className={`w-8 h-8 sm:w-10 sm:h-10 mx-auto ${item.color}`} />
              <p className="font-bold text-[#17211C] text-xs sm:text-sm mt-2">{item.label}</p>
              <p className="text-[10px] sm:text-xs text-[#17211C]/60 font-sans">{item.sub}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Next Medicine to Take Card */}
      {nextMed && (
        <div className="art-card p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#CFB53B]/30 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#008080] bg-[#008080]/10 border border-[#008080]/30 px-3 py-1 rounded-full">
              Next Medicine Reminder • दवाई का समय
            </span>
            <button
              onClick={() => speak(`Your next medicine is ${nextMed.name}, dosage ${nextMed.dosage}, scheduled at ${nextMed.scheduled_time}. ${nextMed.instructions}`)}
              className="p-1.5 text-[#008080] hover:bg-[#008080]/10 rounded-art border border-[#CFB53B]/40"
              title="Read Aloud"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-art bg-[#008080]/10 text-[#008080] border border-[#CFB53B]/50 flex items-center justify-center shrink-0">
                <Pill className="w-7 h-7 text-[#008080]" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-[#17211C]">{nextMed.name}</h4>
                <p className="text-xs sm:text-sm font-semibold text-[#17211C]/75 mt-0.5">
                  {nextMed.dosage} • Take at <span className="font-mono text-[#008080]">{nextMed.scheduled_time}</span>
                </p>
                <p className="text-xs text-[#808000] font-bold mt-1">
                  Instructions: {nextMed.instructions}
                </p>
              </div>
            </div>

            {nextMed.is_taken_today ? (
              <span className="px-6 py-3 rounded-art bg-[#808000]/15 text-[#808000] border border-[#808000]/40 font-bold text-sm flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#808000]" />
                Already Taken ✓
              </span>
            ) : (
              <button
                onClick={() => handleTakeMed(nextMed.id)}
                className="art-btn-primary px-6 py-3.5 flex items-center justify-center gap-2 text-sm sm:text-base shadow-lg"
              >
                <CheckCircle2 className="w-5 h-5 text-[#CFB53B]" />
                I Have Taken This Medicine
              </button>
            )}
          </div>
        </div>
      )}

      {/* Today's Caregiver Visitor Card */}
      {todayVisit && (
        <div className="art-card p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#CFB53B]/30 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#005F9E] bg-[#005F9E]/10 border border-[#005F9E]/30 px-3 py-1 rounded-full">
              Who is Visiting You Today? • आज आने वाले सहायक
            </span>
            <button
              onClick={() => speak(`Caregiver Priya Verma is visiting you today at ${todayVisit.time_slot}. Tap the call button to speak with her.`)}
              className="p-1.5 text-[#005F9E] hover:bg-[#005F9E]/10 rounded-art border border-[#CFB53B]/40"
              title="Read Aloud"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={todayVisit.caregiver_avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'}
                alt={todayVisit.caregiver_name}
                className="w-16 h-16 rounded-art object-cover border-2 border-[#CFB53B] shadow-md"
              />
              <div>
                <h4 className="text-xl font-bold text-[#17211C]">{todayVisit.caregiver_name}</h4>
                <p className="text-xs sm:text-sm text-[#17211C]/75 font-semibold">
                  Certified Nurse Sahayak (Caregiver)
                </p>
                <p className="text-xs text-[#008080] font-bold mt-0.5">
                  Scheduled Time: <span className="font-mono">{todayVisit.time_slot}</span> ({todayVisit.status.replace('_', ' ')})
                </p>
              </div>
            </div>

            <a
              href={`tel:${todayVisit.caregiver_phone}`}
              className="px-6 py-3.5 rounded-art bg-[#17211C] hover:bg-[#232F28] text-[#FFFFF0] font-bold text-sm flex items-center justify-center gap-2 border border-[#CFB53B] shadow-md transition-all"
            >
              <PhoneCall className="w-5 h-5 text-[#CFB53B]" />
              Call {todayVisit.caregiver_name.split(' ')[0]} Now
            </a>
          </div>
        </div>
      )}

      {/* One-Tap Speed Dial Shortcuts */}
      <div className="art-card p-6 space-y-4">
        <h3 className="text-base sm:text-lg font-bold text-[#17211C]">
          One-Tap Speed Dial • परिवार को तुरंत फोन करें
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <a
            href="tel:+919876543210"
            className="p-4 rounded-art bg-[#FFFDD0] hover:bg-[#FFFFF0] border-2 border-[#CFB53B]/50 hover:border-[#CFB53B] flex items-center gap-3 transition-all"
          >
            <div className="w-12 h-12 rounded-art bg-[#008080] text-[#FFFFF0] flex items-center justify-center font-bold shadow-sm">
              <PhoneCall className="w-6 h-6 text-[#CFB53B]" />
            </div>
            <div>
              <p className="text-[10px] text-[#17211C]/60 font-bold uppercase tracking-wider">Son (बेटा)</p>
              <p className="font-bold text-[#17211C] text-base">Rahul Sharma</p>
              <p className="text-xs text-[#008080] font-bold">Tap to Call</p>
            </div>
          </a>

          <a
            href="tel:+919722233445"
            className="p-4 rounded-art bg-[#FFFDD0] hover:bg-[#FFFFF0] border-2 border-[#CFB53B]/50 hover:border-[#CFB53B] flex items-center gap-3 transition-all"
          >
            <div className="w-12 h-12 rounded-art bg-[#005F9E] text-[#FFFFF0] flex items-center justify-center font-bold shadow-sm">
              <Stethoscope className="w-6 h-6 text-[#FFFDD0]" />
            </div>
            <div>
              <p className="text-[10px] text-[#17211C]/60 font-bold uppercase tracking-wider">Caregiver (सहायक)</p>
              <p className="font-bold text-[#17211C] text-base">Priya Verma</p>
              <p className="text-xs text-[#005F9E] font-bold">Tap to Call</p>
            </div>
          </a>

          <a
            href="tel:112"
            className="p-4 rounded-art bg-[#800020]/10 hover:bg-[#800020]/20 border-2 border-[#800020]/40 flex items-center gap-3 transition-all"
          >
            <div className="w-12 h-12 rounded-art bg-[#800020] text-[#FFFFF0] flex items-center justify-center font-bold shadow-sm">
              <ShieldAlert className="w-6 h-6 text-[#CFB53B]" />
            </div>
            <div>
              <p className="text-[10px] text-[#800020] font-bold uppercase tracking-wider">Police & Medical</p>
              <p className="font-bold text-[#17211C] text-base">Dial 112</p>
              <p className="text-xs text-[#800020] font-bold">Toll Free 24/7</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};
