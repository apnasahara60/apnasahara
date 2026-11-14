import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { OrnateCorner, WhiplashDivider } from '../../components/art-nouveau/ArtNouveauDecorations';

export const ForgotPasswordPage: React.FC = () => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await resetPassword(email);
    setIsLoading(false);
    setMessage(res.message);
    setSubmitted(true);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-serif">
      <div className="relative max-w-md w-full space-y-6 art-card p-8 sm:p-10 shadow-2xl">
        <OrnateCorner position="top-left" color="#CFB53B" size={40} />
        <OrnateCorner position="top-right" color="#CFB53B" size={40} />

        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-art bg-[#008080] text-[#FFFFF0] border-2 border-[#CFB53B] flex items-center justify-center mx-auto shadow-md">
            <Heart className="w-6 h-6 fill-[#FFFFF0]" />
          </div>
          <h2 className="text-2xl font-bold text-[#17211C]">Reset Your Password</h2>
          <p className="text-xs text-[#17211C]/70 font-sans">
            Enter your account email to receive reset instructions
          </p>
        </div>

        <WhiplashDivider color="#CFB53B" className="max-w-[180px] mx-auto" />

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#808000]/15 text-[#808000] border border-[#808000]/40 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <p className="text-xs text-[#17211C]/75 font-sans leading-relaxed">{message}</p>
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#008080] hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#CFB53B]" /> Back to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 font-sans">
            <div>
              <label className="text-xs font-bold text-[#17211C] block mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#008080] absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. family@apnasahara.com"
                  className="art-input w-full pl-10 pr-4 py-2.5 text-sm font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="art-btn-primary w-full py-3.5 text-sm shadow-md font-serif font-bold transition-all"
            >
              {isLoading ? 'Sending...' : 'Send Password Reset Link'}
            </button>

            <div className="text-center pt-2">
              <Link to="/login" className="inline-flex items-center gap-1 text-xs text-[#17211C]/60 hover:text-[#008080]">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
