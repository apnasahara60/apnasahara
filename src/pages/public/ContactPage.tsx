import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, Clock } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useNotification();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    parentCity: 'NCR (Delhi, Noida, Gurugram)',
    message: '',
    urgency: 'Routine Consultation'
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      setSubmitted(true);
      showToast('Inquiry Received', 'Our senior care manager will call you within 30 minutes.', 'info');
    }, 800);
  };

  return (
    <div className="py-12 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase font-extrabold tracking-widest text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
            24/7 Helpline & Care Concierge
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            We Are Here For Your Family
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Have questions about care plans, need immediate emergency assistance, or want to speak with our Geriatric Care Director? Reach out anytime.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-3xl bg-slate-900 text-white space-y-6 shadow-xl">
              <h3 className="text-2xl font-black">Direct Contacts</h3>
              <p className="text-xs text-slate-400">
                Operating round-the-clock across Delhi NCR, Bengaluru, Mumbai, Pune, and Hyderabad.
              </p>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-red-600/20 text-red-400 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-white">Emergency Desk (24/7)</p>
                    <a href="tel:18002081122" className="text-red-400 font-extrabold hover:underline">
                      1800-208-1122 (Toll Free)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-white">Care Coordination Email</p>
                    <a href="mailto:care@apnasahara.com" className="text-slate-300 hover:underline">
                      care@apnasahara.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-white">Care Operations Centre</p>
                    <p className="text-slate-400 text-xs">
                      Tower B, Cyber City, DLF Phase 2, Gurugram, NCR, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-white">Response Time</p>
                    <p className="text-slate-400 text-xs">
                      Inquiries answered within 15 minutes. Emergency SOS immediate.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Senior helpline info */}
            <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-2">
              <p className="font-bold text-sm">Govt. Elderline Integration</p>
              <p>
                In addition to ApnaSahara's private caregiver network, we are integrated with India's National Senior Citizen Helpline <strong>14567</strong> for legal and social security support.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl">
            {submitted ? (
              <div className="text-center py-12 space-y-4 animate-in fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-slate-900">Message Received!</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Thank you, <strong>{formData.name}</strong>. A dedicated ApnaSahara care manager has been notified and will reach out to <strong>{formData.phone || formData.email}</strong> shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      parentCity: 'NCR (Delhi, Noida, Gurugram)',
                      message: '',
                      urgency: 'Routine Consultation'
                    });
                  }}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-xl font-black text-slate-900">Request Eldercare Consultation</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Fill in your details and tell us about your parent’s care needs.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number (with country code) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210 or +1 ..."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Parent's City in India</label>
                    <select
                      value={formData.parentCity}
                      onChange={(e) => setFormData({ ...formData, parentCity: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none bg-white"
                    >
                      <option>NCR (Delhi, Noida, Gurugram, Faridabad)</option>
                      <option>Bengaluru</option>
                      <option>Mumbai & Navi Mumbai</option>
                      <option>Pune</option>
                      <option>Hyderabad</option>
                      <option>Chennai</option>
                      <option>Kolkata</option>
                      <option>Other Tier-1/2 City</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Care Urgency</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Urgent (within 24 hrs)', 'Routine Consultation', 'Exploring Future Care'].map((u) => (
                      <button
                        key={u}
                        type="button"
                        onClick={() => setFormData({ ...formData, urgency: u })}
                        className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all text-center ${
                          formData.urgency === u
                            ? 'bg-brand-50 border-brand-500 text-brand-700 font-bold'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {u}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Tell us about your parents' needs</label>
                  <textarea
                    rows={4}
                    placeholder="e.g. My 74-year-old father has mild mobility issues and hypertension. Need someone for morning BP checks, companionship, and escort to Max Hospital..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-4 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-lg shadow-brand-600/30 flex items-center justify-center gap-2 transition-all"
                >
                  {isSending ? (
                    <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit Consultation Request
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
