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
    <div className="py-12 space-y-16 font-serif text-[#17211C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase font-bold tracking-widest text-[#008080] bg-[#008080]/10 border border-[#008080]/30 px-3.5 py-1 rounded-full font-sans">
            24/7 Helpline & Care Concierge
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#17211C] tracking-tight">
            We Are Here For Your Family
          </h1>
          <div className="w-full max-w-xs mx-auto my-4 border-t border-[#CFB53B]/25" />
          <p className="text-base sm:text-lg text-[#17211C]/80 leading-relaxed font-sans">
            Have questions about care plans, need immediate emergency assistance, or want to speak with our Geriatric Care Director? Reach out anytime.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="relative p-8 rounded-art bg-gradient-to-r from-[#17211C] to-[#232F28] text-[#FFFFF0] border-2 border-[#CFB53B] space-y-6 shadow-xl">
              
              

              <h3 className="text-2xl font-bold">Direct Contacts</h3>
              <p className="text-xs text-[#FFFDD0] font-sans">
                Operating round-the-clock across Delhi NCR, Bengaluru, Mumbai, Pune, and Hyderabad.
              </p>

              <div className="space-y-4 text-xs sm:text-sm font-sans">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-art bg-[#800020]/30 border border-[#800020] text-[#FFFDD0] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-[#CFB53B]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#FFFFF0] font-serif">Emergency Telemetry Desk (24/7)</p>
                    <a href="tel:18002081122" className="text-[#CFB53B] font-bold font-mono hover:underline">
                      1800-208-1122 (Toll Free)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-art bg-[#008080]/30 border border-[#008080] text-[#FFFDD0] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-[#CFB53B]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#FFFFF0] font-serif">Care Coordination Email</p>
                    <a href="mailto:care@apnasahara.com" className="text-[#FFFDD0] hover:underline font-mono">
                      care@apnasahara.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-art bg-[#005F9E]/30 border border-[#005F9E] text-[#FFFDD0] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-[#CFB53B]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#FFFFF0] font-serif">Care Operations Centre</p>
                    <p className="text-[#FFFDD0]/80 text-xs">
                      Tower B, Cyber City, DLF Phase 2, Gurugram, NCR, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-art bg-[#CFB53B]/20 border border-[#CFB53B] text-[#FFFDD0] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-[#CFB53B]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#FFFFF0] font-serif">Response Time</p>
                    <p className="text-[#FFFDD0]/80 text-xs">
                      Inquiries answered within 15 minutes. Emergency SOS immediate.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="relative art-card p-8 sm:p-10 shadow-xl">
              
              

              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#808000]/15 text-[#808000] border-2 border-[#808000] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#17211C]">Thank You for Reaching Out</h3>
                  <p className="text-xs sm:text-sm text-[#17211C]/75 max-w-md mx-auto font-sans">
                    Our Senior Care Manager has received your inquiry and will contact you via phone or WhatsApp within 30 minutes.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="art-btn-secondary px-6 py-2.5 text-xs font-bold"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 font-sans">
                  <div>
                    <h3 className="text-2xl font-bold text-[#17211C] font-serif">Send Us a Message</h3>
                    <p className="text-xs text-[#17211C]/65 mt-1">
                      Fill out the form below and our care team will get back to you shortly.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[#17211C] block mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                        className="art-input w-full text-sm font-serif"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#17211C] block mb-1">Your Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="rahul@example.com"
                        className="art-input w-full text-sm font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#17211C] block mb-1">Your Phone (+91) *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="art-input w-full text-sm font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#17211C] block mb-1">Parent's City in India</label>
                      <select
                        value={formData.parentCity}
                        onChange={(e) => setFormData({ ...formData, parentCity: e.target.value })}
                        className="art-input w-full text-sm bg-[#FFFFF0]"
                      >
                        <option>NCR (Delhi, Noida, Gurugram)</option>
                        <option>Bengaluru, Karnataka</option>
                        <option>Mumbai / Thane / Navi Mumbai</option>
                        <option>Pune, Maharashtra</option>
                        <option>Indore, Madhya Pradesh</option>
                        <option>Hyderabad, Telangana</option>
                        <option>Other / Not Listed</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#17211C] block mb-1">Message or Care Requirement</label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your parents' living arrangement, health conditions, or questions about our plans..."
                      className="art-input w-full text-sm font-serif"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSending}
                      className="art-btn-primary w-full py-3.5 text-sm font-serif font-bold shadow-md flex items-center justify-center gap-2 transition-all"
                    >
                      {isSending ? (
                        <span className="w-4 h-4 border-2 border-[#FFFFF0] border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-[#CFB53B]" /> Send Consultation Request
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
