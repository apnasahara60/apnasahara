import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Lock, Mail, User, Phone, ArrowRight, ShieldCheck, Users, Stethoscope } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { OrnateCorner, WhiplashDivider } from '../../components/art-nouveau/ArtNouveauDecorations';

export const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const [role, setRole] = useState<UserRole>('family');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const res = await register(name, email, password, role, phone);
    setIsLoading(false);

    if (res.success) {
      navigate('/onboarding');
    } else {
      setError(res.error || 'Registration failed');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-serif">
      <div className="relative max-w-md w-full space-y-6 art-card p-8 sm:p-10 shadow-2xl">
        <OrnateCorner position="top-left" color="#CFB53B" size={40} />
        <OrnateCorner position="top-right" color="#CFB53B" size={40} />

        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-art bg-[#008080] text-[#FFFFF0] border-2 border-[#CFB53B] flex items-center justify-center mx-auto shadow-md">
            <Heart className="w-6 h-6 fill-[#FFFFF0]" />
          </div>
          <h2 className="text-3xl font-bold text-[#17211C] tracking-tight">Join ApnaSahara</h2>
          <p className="text-xs text-[#17211C]/70 font-sans">Create an account for personalized eldercare sanctuary</p>
        </div>

        <WhiplashDivider color="#CFB53B" className="max-w-[200px] mx-auto" />

        {/* Role Selector */}
        <div className="space-y-1 font-sans">
          <label className="text-xs font-bold text-[#17211C] block">I am registering as:</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'family', Icon: Users, label: 'Family', sub: 'For children' },
              { id: 'elder', Icon: Heart, label: 'Senior', sub: 'For parents' },
              { id: 'caregiver', Icon: Stethoscope, label: 'Sahayak', sub: 'Attendant' }
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setRole(item.id as UserRole)}
                className={`p-2.5 rounded-art border text-center transition-all ${
                  role === item.id
                    ? 'bg-[#FFFDD0] border-[#008080] text-[#008080] font-bold ring-1 ring-[#008080]'
                    : 'bg-[#FFFFF0] border-[#CFB53B]/40 text-[#17211C]/70 hover:bg-[#FFFDD0]/50 text-xs'
                }`}
              >
                <item.Icon className="w-4 h-4 mx-auto mb-1 text-[#008080]" />
                <div className="text-xs font-bold font-serif">{item.label}</div>
                <div className="text-[10px] text-[#17211C]/50 mt-0.5">{item.sub}</div>
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-art bg-[#800020]/10 border border-[#800020]/40 text-[#800020] text-xs font-sans">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4 font-sans">
          <div>
            <label className="text-xs font-bold text-[#17211C] block mb-1">Full Legal Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-[#008080] absolute left-3.5 top-3" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="art-input w-full pl-10 pr-4 py-2.5 text-sm font-serif"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[#17211C] block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#008080] absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. rahul@example.com"
                className="art-input w-full pl-10 pr-4 py-2.5 text-sm font-mono"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[#17211C] block mb-1">Mobile Number (+91)</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-[#008080] absolute left-3.5 top-3" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="art-input w-full pl-10 pr-4 py-2.5 text-sm font-mono"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[#17211C] block mb-1">Create Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#008080] absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="art-input w-full pl-10 pr-4 py-2.5 text-sm font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="art-btn-primary w-full py-3.5 text-sm shadow-md flex items-center justify-center gap-2 font-serif font-bold"
          >
            {isLoading ? (
              <span className="w-4 h-4 border-2 border-[#FFFFF0] border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                Create Account & Begin Onboarding
                <ArrowRight className="w-4 h-4 text-[#CFB53B]" />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-xs text-[#17211C]/75 font-sans">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-[#008080] hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};
