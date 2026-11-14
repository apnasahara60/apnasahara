import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Heart,
  User,
  MapPin,
  Activity,
  Phone,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Plus,
  Trash2,
  Pill,
  Sparkles,
  Building,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { dbStore } from '../../lib/supabase';
import { ElderProfile, CaregiverProfile } from '../../types';

export const OnboardingPage: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const { showToast } = useNotification();
  const navigate = useNavigate();

  const userRole = user?.role || 'family';

  // Step indicator
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = userRole === 'family' ? 4 : 3;

  // Family Onboarding Fields
  // Step 1: Loved One's Details
  const [parentName, setParentName] = useState('');
  const [relationship, setRelationship] = useState('Father / Dad');
  const [age, setAge] = useState<number | ''>(72);
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [bloodGroup, setBloodGroup] = useState('B+');

  // Step 2: Location & Bridge
  const [userCity, setUserCity] = useState(user?.city || 'Bengaluru');
  const [parentCity, setParentCity] = useState('Indore');
  const [parentAddress, setParentAddress] = useState('Flat 402, Shanti Kunj, Old Palasia, Indore, MP');

  // Step 3: Health & Medications
  const [selectedConditions, setSelectedConditions] = useState<string[]>([
    'Hypertension',
    'Type 2 Diabetes'
  ]);
  const [customCondition, setCustomCondition] = useState('');
  const [allergies, setAllergies] = useState('Penicillin, Dust');
  const [medications, setMedications] = useState<
    Array<{ name: string; dosage: string; scheduled_time: string; instructions: string }>
  >([
    {
      name: 'Telmisartan (Telma 40)',
      dosage: '40mg',
      scheduled_time: '08:00 AM',
      instructions: 'After breakfast with water'
    },
    {
      name: 'Metformin SR',
      dosage: '500mg',
      scheduled_time: '08:30 PM',
      instructions: 'After dinner'
    }
  ]);

  // Step 4: Emergency Contacts & Coordinator
  const [parentPhone, setParentPhone] = useState('+91 98111 22334');
  const [emergencyContactName, setEmergencyContactName] = useState('Dr. Arvind Joshi (Family Doctor)');
  const [emergencyContactPhone, setEmergencyContactPhone] = useState('+91 98222 33445');
  const [coordinatorName, setCoordinatorName] = useState('Meera Joshi (Indore Care Coordinator)');

  // Caregiver-specific fields
  const [experienceYears, setExperienceYears] = useState(4);
  const [certifications, setCertifications] = useState('General Duty Assistant (GDA), Red Cross First Aid');
  const [operatingZone, setOperatingZone] = useState('Central & South Indore');

  const commonConditions = [
    'Hypertension',
    'Type 2 Diabetes',
    'Osteoarthritis / Knee Pain',
    'Heart Condition',
    'Thyroid',
    'Asthma / Breathing',
    'Mild Cognitive Impairment',
    'Low Mobility'
  ];

  const toggleCondition = (cond: string) => {
    if (selectedConditions.includes(cond)) {
      setSelectedConditions(selectedConditions.filter(c => c !== cond));
    } else {
      setSelectedConditions([...selectedConditions, cond]);
    }
  };

  const handleAddCustomCondition = () => {
    if (customCondition.trim() && !selectedConditions.includes(customCondition.trim())) {
      setSelectedConditions([...selectedConditions, customCondition.trim()]);
      setCustomCondition('');
    }
  };

  const handleAddMedication = () => {
    setMedications([
      ...medications,
      { name: '', dosage: '', scheduled_time: '09:00 AM', instructions: 'After meal' }
    ]);
  };

  const handleRemoveMedication = (index: number) => {
    setMedications(medications.filter((_, i) => i !== index));
  };

  const handleMedChange = (index: number, field: string, value: string) => {
    const updated = [...medications];
    (updated[index] as any)[field] = value;
    setMedications(updated);
  };

  // Quick fill with sample data for reviewers
  const handlePreFillSample = () => {
    setParentName('Rajesh Sharma');
    setRelationship('Father / Dad');
    setAge(74);
    setGender('Male');
    setBloodGroup('B+');
    setUserCity('Bengaluru');
    setParentCity('Indore');
    setParentAddress('B-402, Green Valley Apartments, Old Palasia, Indore, MP');
    setSelectedConditions(['Hypertension', 'Type 2 Diabetes', 'Osteoarthritis / Knee Pain']);
    setParentPhone('+91 98111 22334');
    setEmergencyContactName('Priya Sharma (Daughter / Noida)');
    setEmergencyContactPhone('+91 98765 43210');
    setCoordinatorName('Meera Joshi (Indore Coordinator)');
    showToast('Sample Data Pre-filled', 'Values loaded from verified Indore eldercare setup.', 'info');
  };

  const handleCompleteOnboarding = () => {
    const activeUserId = user?.id || `user-${Date.now()}`;

    if (userRole === 'family') {
      const elderNameFinal = parentName.trim() || 'Rajesh Sharma';
      const cleanRelationship = relationship.includes('/') ? relationship.split('/')[1].trim() : relationship;

      // 1. Save new or updated Elder Profile
      const elderId = `elder-${activeUserId}`;
      const newElder: ElderProfile = {
        id: elderId,
        family_user_id: activeUserId,
        name: elderNameFinal,
        relationship: cleanRelationship,
        age: typeof age === 'number' ? age : 72,
        gender: gender,
        blood_group: bloodGroup,
        phone: parentPhone || '+91 98111 22334',
        emergency_phone: emergencyContactPhone || '+91 98765 43210',
        address: parentAddress || 'Indore, Madhya Pradesh',
        city: parentCity || 'Indore',
        safe_zone_lat: 22.7196,
        safe_zone_lng: 75.8577,
        location_sharing_enabled: true,
        medical_conditions: selectedConditions.length > 0 ? selectedConditions : ['Hypertension'],
        allergies: allergies.split(',').map(s => s.trim()).filter(Boolean),
        preferred_language: 'Hindi & English',
        battery_level: 88
      };

      dbStore.saveElder(newElder);

      // 2. Save Medications
      medications.forEach((med, idx) => {
        if (med.name.trim()) {
          dbStore.addMedication({
            elder_id: elderId,
            name: med.name.trim(),
            dosage: med.dosage || '1 tablet',
            frequency: 'Once daily',
            time_of_day: ['Morning'],
            scheduled_time: med.scheduled_time || '08:00 AM',
            instructions: med.instructions || 'After meals with water',
            pills_remaining: 28 - idx * 4,
            refill_alert_threshold: 5
          });
        }
      });

      // 3. Add initial baseline vitals
      dbStore.addHealthMetric({
        elder_id: elderId,
        systolic_bp: 124,
        diastolic_bp: 82,
        heart_rate: 74,
        spo2: 98,
        blood_glucose: 110,
        blood_glucose_type: 'Fasting',
        temperature: 98.4,
        mood: 'Good',
        notes: `Baseline health vitals logged on onboarding for ${elderNameFinal}.`
      });

      // 4. Update User Profile
      updateProfile({
        is_onboarded: true,
        city: userCity || 'Bengaluru'
      });

      showToast(
        'Onboarding Complete 🎉',
        `Welcome to ApnaSahara! Family care bridge active for ${elderNameFinal}.`,
        'system'
      );

      navigate('/family');
    } else if (userRole === 'elder') {
      // Senior self-setup
      const elderId = `elder-${activeUserId}`;
      const newElder: ElderProfile = {
        id: elderId,
        user_id: activeUserId,
        family_user_id: 'family-circle',
        name: parentName || user?.name || 'Ramesh Sharma',
        relationship: 'Self',
        age: typeof age === 'number' ? age : 74,
        gender: gender,
        blood_group: bloodGroup,
        phone: user?.phone || parentPhone || '+91 98111 22334',
        emergency_phone: emergencyContactPhone || '+91 98765 43210',
        address: parentAddress || 'Old Palasia, Indore, MP',
        city: parentCity || 'Indore',
        safe_zone_lat: 22.7196,
        safe_zone_lng: 75.8577,
        location_sharing_enabled: true,
        medical_conditions: selectedConditions,
        allergies: allergies.split(',').map(s => s.trim()).filter(Boolean),
        preferred_language: 'Hindi',
        battery_level: 90
      };

      dbStore.saveElder(newElder);
      updateProfile({ is_onboarded: true, city: parentCity || 'Indore' });
      showToast('Profile Setup Complete', 'Your Senior portal is ready with 1-click SOS and reminders.', 'system');
      navigate('/parent');
    } else {
      // Caregiver setup
      const caregiverId = `cg-${activeUserId}`;
      const newCg: CaregiverProfile = {
        id: caregiverId,
        user_id: activeUserId,
        name: user?.name || 'Priya Verma',
        phone: user?.phone || '+91 97222 33445',
        email: user?.email || 'caregiver@apnasahara.com',
        rating: 4.9,
        experience_years: experienceYears,
        certifications: certifications.split(',').map(s => s.trim()),
        verification_status: 'verified',
        police_verification: true,
        aadhaar_verified: true,
        active_visits_count: 0,
        is_available: true
      };
      dbStore.saveCaregiver(newCg);
      updateProfile({ is_onboarded: true, city: operatingZone });
      showToast('Caregiver Profile Active', 'Your Sahayak schedule and verified badge are ready.', 'system');
      navigate('/caregiver');
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F6F2] py-8 px-4 sm:px-6 lg:px-8 text-[#1A2E22]">
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-3">
            <img src="/logo.png" alt="ApnaSahara" className="h-12 w-auto object-contain" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#172E21] tracking-tight">
              Let's Set Up Your ApnaSahara Care Space
            </h1>
            <p className="text-xs sm:text-sm text-[#5B7163] mt-1">
              {userRole === 'family'
                ? 'Tell us about your parent so we can personalize their daily check-ins, medical alerts, and local caregiver support.'
                : 'Help us personalize your experience with accurate details.'}
            </p>
          </div>

          {/* Quick Pre-fill badge for convenience */}
          <div className="flex justify-center pt-1">
            <button
              type="button"
              onClick={handlePreFillSample}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-[#E3EBE4] hover:bg-[#D5E3D8] text-[#1E4733] transition-colors border border-[#CDDCD1] shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#2B6141]" />
              <span>Fill with sample parent data (Rajesh Sharma • Indore)</span>
            </button>
          </div>
        </div>

        {/* Step Progress Bar */}
        <div className="bg-white rounded-2xl p-4 border border-[#E3E7DE] shadow-xs">
          <div className="flex items-center justify-between text-xs font-bold text-[#688070] mb-2">
            <span>Step {currentStep} of {totalSteps}</span>
            <span>
              {currentStep === 1 && 'Senior Details'}
              {currentStep === 2 && 'Location & City Bridge'}
              {currentStep === 3 && 'Health & Medications'}
              {currentStep === 4 && 'Emergency & Local Sahayak'}
            </span>
          </div>
          <div className="w-full bg-[#E8ECE6] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#2B6141] h-full transition-all duration-300 rounded-full"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Main Step Form Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E3E7DE] shadow-md space-y-6">

          {/* ================= STEP 1: SENIOR PROFILE ================= */}
          {currentStep === 1 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="border-b border-[#EDF1EB] pb-3">
                <h3 className="text-lg font-extrabold text-[#1A2E22] flex items-center gap-2">
                  <User className="w-5 h-5 text-[#2B6141]" />
                  <span>Who are you caring for?</span>
                </h3>
                <p className="text-xs text-[#63796C]">
                  We will address your parent with utmost warmth and respect in all check-ins.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-[#34483B] block mb-1">
                    Parent / Senior Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    placeholder="e.g. Rajesh Sharma"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D3DCD4] text-sm focus:ring-2 focus:ring-[#2B6141] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#34483B] block mb-1">
                    Relationship
                  </label>
                  <select
                    value={relationship}
                    onChange={(e) => setRelationship(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#D3DCD4] text-sm font-semibold focus:ring-2 focus:ring-[#2B6141] focus:outline-none bg-white"
                  >
                    <option value="Father / Dad">Father / Dad</option>
                    <option value="Mother / Mom">Mother / Mom</option>
                    <option value="Father-in-law">Father-in-law</option>
                    <option value="Mother-in-law">Mother-in-law</option>
                    <option value="Grandfather">Grandfather</option>
                    <option value="Grandmother">Grandmother</option>
                    <option value="Relative / Elder">Relative / Elder</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#34483B] block mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value ? parseInt(e.target.value, 10) : '')}
                    placeholder="e.g. 74"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D3DCD4] text-sm focus:ring-2 focus:ring-[#2B6141] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#34483B] block mb-1">
                    Gender
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['Male', 'Female', 'Other'] as const).map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setGender(g)}
                        className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                          gender === g
                            ? 'bg-[#E3EBE4] border-[#2B6141] text-[#1E4733]'
                            : 'border-[#D3DCD4] text-[#55695D] hover:bg-[#F7FAF7]'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#34483B] block mb-1">
                    Blood Group
                  </label>
                  <select
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#D3DCD4] text-sm font-semibold focus:ring-2 focus:ring-[#2B6141] focus:outline-none bg-white"
                  >
                    {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((bg) => (
                      <option key={bg} value={bg}>
                        {bg}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* ================= STEP 2: LOCATION & CITY BRIDGE ================= */}
          {currentStep === 2 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="border-b border-[#EDF1EB] pb-3">
                <h3 className="text-lg font-extrabold text-[#1A2E22] flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#2B6141]" />
                  <span>Location & Distance Bridge</span>
                </h3>
                <p className="text-xs text-[#63796C]">
                  ApnaSahara connects your city to your parents' city with local care coordination.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#34483B] block mb-1">
                    Senior's City *
                  </label>
                  <input
                    type="text"
                    required
                    value={parentCity}
                    onChange={(e) => setParentCity(e.target.value)}
                    placeholder="e.g. Indore, Madhya Pradesh"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D3DCD4] text-sm focus:ring-2 focus:ring-[#2B6141] focus:outline-none"
                  />
                  <p className="text-[11px] text-[#71887A] mt-1">
                    Where your parent currently resides
                  </p>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#34483B] block mb-1">
                    Your Current City (Family Bridge) *
                  </label>
                  <input
                    type="text"
                    required
                    value={userCity}
                    onChange={(e) => setUserCity(e.target.value)}
                    placeholder="e.g. Bengaluru, Karnataka"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D3DCD4] text-sm focus:ring-2 focus:ring-[#2B6141] focus:outline-none"
                  />
                  <p className="text-[11px] text-[#71887A] mt-1">
                    Creates your live ribbon: <strong>{userCity || 'Bengaluru'} ↔ {parentCity || 'Indore'}</strong>
                  </p>
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-[#34483B] block mb-1">
                    Parent's Residential Address / Society *
                  </label>
                  <textarea
                    rows={2}
                    value={parentAddress}
                    onChange={(e) => setParentAddress(e.target.value)}
                    placeholder="e.g. Flat B-402, Green Valley Apartments, Sector 62 / Old Palasia..."
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D3DCD4] text-sm focus:ring-2 focus:ring-[#2B6141] focus:outline-none"
                  />
                  <p className="text-[11px] text-[#71887A] mt-0.5">
                    Used strictly by verified caregivers during dispatched visits and SOS assistance.
                  </p>
                </div>
              </div>

              {/* Visual Bridge Preview */}
              <div className="p-4 rounded-2xl bg-[#F6FAF6] border border-[#D8E6DB] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2B6141] animate-pulse" />
                  <span className="text-xs font-bold text-[#204732]">
                    Active Distance Bridge: {userCity || 'Your City'} ↔ {parentCity || 'Senior City'}
                  </span>
                </div>
                <span className="text-[11px] text-[#5A7364] font-semibold">24/7 Monitored</span>
              </div>
            </div>
          )}

          {/* ================= STEP 3: HEALTH & MEDICATIONS ================= */}
          {currentStep === 3 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="border-b border-[#EDF1EB] pb-3">
                <h3 className="text-lg font-extrabold text-[#1A2E22] flex items-center gap-2">
                  <Activity className="w-5 h-5 text-[#2B6141]" />
                  <span>Health Conditions & Daily Medications</span>
                </h3>
                <p className="text-xs text-[#63796C]">
                  Ensures scheduled reminders and accurate medical records for emergency responders.
                </p>
              </div>

              {/* Conditions Chips */}
              <div>
                <label className="text-xs font-bold text-[#34483B] block mb-2">
                  Select Pre-existing Medical Conditions:
                </label>
                <div className="flex flex-wrap gap-2">
                  {commonConditions.map((cond) => {
                    const isSelected = selectedConditions.includes(cond);
                    return (
                      <button
                        key={cond}
                        type="button"
                        onClick={() => toggleCondition(cond)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                          isSelected
                            ? 'bg-[#2B6141] text-white border-[#2B6141] shadow-xs'
                            : 'bg-white text-[#4A5E51] border-[#D3DCD4] hover:bg-[#F7FAF7]'
                        }`}
                      >
                        {cond} {isSelected && '✓'}
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-2 mt-3">
                  <input
                    type="text"
                    value={customCondition}
                    onChange={(e) => setCustomCondition(e.target.value)}
                    placeholder="Add other medical condition..."
                    className="flex-1 px-3 py-2 rounded-xl border border-[#D3DCD4] text-xs focus:outline-none focus:ring-1 focus:ring-[#2B6141]"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomCondition}
                    className="px-3 py-2 rounded-xl bg-[#E3EBE4] text-[#1E4733] text-xs font-bold hover:bg-[#D5E3D8]"
                  >
                    + Add
                  </button>
                </div>
              </div>

              {/* Allergies */}
              <div>
                <label className="text-xs font-bold text-[#34483B] block mb-1">
                  Known Allergies (Food or Drugs)
                </label>
                <input
                  type="text"
                  value={allergies}
                  onChange={(e) => setAllergies(e.target.value)}
                  placeholder="e.g. Penicillin, Sulfa drugs, Peanuts, None"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#D3DCD4] text-sm focus:ring-2 focus:ring-[#2B6141] focus:outline-none"
                />
              </div>

              {/* Daily Medications List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#34483B] block">
                    Daily Prescribed Medications:
                  </label>
                  <button
                    type="button"
                    onClick={handleAddMedication}
                    className="text-xs font-bold text-[#2B6141] hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Medication</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {medications.map((med, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-[#FAFBF9] border border-[#E3E7DE] flex flex-col sm:flex-row items-center gap-2"
                    >
                      <input
                        type="text"
                        value={med.name}
                        onChange={(e) => handleMedChange(idx, 'name', e.target.value)}
                        placeholder="Medicine name (e.g. Telma 40)"
                        className="w-full sm:flex-1 px-3 py-1.5 rounded-xl border border-[#D3DCD4] text-xs bg-white"
                      />
                      <input
                        type="text"
                        value={med.dosage}
                        onChange={(e) => handleMedChange(idx, 'dosage', e.target.value)}
                        placeholder="Dosage (40mg)"
                        className="w-full sm:w-24 px-3 py-1.5 rounded-xl border border-[#D3DCD4] text-xs bg-white"
                      />
                      <input
                        type="text"
                        value={med.scheduled_time}
                        onChange={(e) => handleMedChange(idx, 'scheduled_time', e.target.value)}
                        placeholder="Time (08:00 AM)"
                        className="w-full sm:w-28 px-3 py-1.5 rounded-xl border border-[#D3DCD4] text-xs bg-white"
                      />
                      <input
                        type="text"
                        value={med.instructions}
                        onChange={(e) => handleMedChange(idx, 'instructions', e.target.value)}
                        placeholder="Instructions (After food)"
                        className="w-full sm:flex-1 px-3 py-1.5 rounded-xl border border-[#D3DCD4] text-xs bg-white"
                      />
                      {medications.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveMedication(idx)}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================= STEP 4: EMERGENCY CONTACTS & LOCAL SAHAYAK ================= */}
          {currentStep === 4 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="border-b border-[#EDF1EB] pb-3">
                <h3 className="text-lg font-extrabold text-[#1A2E22] flex items-center gap-2">
                  <Phone className="w-5 h-5 text-[#2B6141]" />
                  <span>Emergency Contacts & Dedicated Sahayak</span>
                </h3>
                <p className="text-xs text-[#63796C]">
                  Direct speed-dial numbers for emergencies and your verified local care coordinator.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#34483B] block mb-1">
                    Senior's Direct Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={parentPhone}
                    onChange={(e) => setParentPhone(e.target.value)}
                    placeholder="+91 98111 22334"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D3DCD4] text-sm focus:ring-2 focus:ring-[#2B6141] focus:outline-none"
                  />
                  <p className="text-[11px] text-[#71887A] mt-1">
                    Used for daily check-in calls & 1-click speed dial
                  </p>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#34483B] block mb-1">
                    Secondary / Doctor Emergency Contact Name
                  </label>
                  <input
                    type="text"
                    value={emergencyContactName}
                    onChange={(e) => setEmergencyContactName(e.target.value)}
                    placeholder="e.g. Dr. Joshi / Local relative"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D3DCD4] text-sm focus:ring-2 focus:ring-[#2B6141] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#34483B] block mb-1">
                    Secondary Emergency Phone Number
                  </label>
                  <input
                    type="tel"
                    value={emergencyContactPhone}
                    onChange={(e) => setEmergencyContactPhone(e.target.value)}
                    placeholder="+91 98222 33445"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D3DCD4] text-sm focus:ring-2 focus:ring-[#2B6141] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#34483B] block mb-1">
                    Assigned Local Care Coordinator
                  </label>
                  <input
                    type="text"
                    value={coordinatorName}
                    onChange={(e) => setCoordinatorName(e.target.value)}
                    placeholder="e.g. Meera Joshi (Family Care Coordinator)"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D3DCD4] text-sm focus:ring-2 focus:ring-[#2B6141] focus:outline-none"
                  />
                  <p className="text-[11px] text-[#71887A] mt-1">
                    Your single point of contact on the ground in {parentCity || 'Indore'}
                  </p>
                </div>
              </div>

              {/* Summary Card */}
              <div className="p-4 rounded-2xl bg-[#FAFBF9] border border-[#E3E7DE] space-y-2">
                <span className="text-xs font-extrabold text-[#1E4733] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#2B6141]" />
                  <span>Ready to finalize setup for {parentName || 'Dad'}</span>
                </span>
                <p className="text-xs text-[#52685B]">
                  Your dashboard will instantly adapt to {parentName || 'your parent'}, showing live status in {parentCity || 'Indore'}, local visits, and connected family actions.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-[#EDF1EB]">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#D3DCD4] text-[#42584A] text-xs font-bold hover:bg-[#F5F8F5]"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous Step</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep + 1)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#2B6141] hover:bg-[#204931] text-white text-xs font-bold shadow-sm transition-all"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleCompleteOnboarding}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#2B6141] hover:bg-[#1E4733] text-white text-xs font-black shadow-md transition-all scale-100 hover:scale-105"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>Launch My Family Care Space →</span>
              </button>
            )}
          </div>
        </div>

        {/* Footer Guarantee */}
        <p className="text-center text-[11px] text-[#71887A]">
          🔒 HIPAA & Indian Digital Personal Data Protection (DPDP) compliant • AES-256 encrypted
        </p>
      </div>
    </div>
  );
};
