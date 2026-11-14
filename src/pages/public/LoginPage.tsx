import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Heart,
  Lock,
  Mail,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Users,
  Stethoscope,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { dbStore } from '../../lib/mongoStore';
import { OrnateCorner, WhiplashDivider } from '../../components/art-nouveau/ArtNouveauDecorations';

export const LoginPage: React.FC = () => {
  const { login, switchDemoRole } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname;

  const handleStandardLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const res = await login(email, password);
    setIsLoading(false);

    if (res.success) {
      const saved = localStorage.getItem('apnasahara_current_session');
      let sessionUser: any = null;
      if (saved) {
        try { sessionUser = JSON.parse(saved); } catch (e) {}
      }
      if (sessionUser && sessionUser.is_onboarded === false) {
        navigate('/onboarding');
        return;
      }

      if (from) {
        navigate(from);
      } else {
        if (email.includes('parent') || email.includes('elder')) navigate('/parent');
        else if (email.includes('caregiver')) navigate('/caregiver');
        else if (email.includes('admin')) navigate('/admin');
        else navigate('/family');
      }
    } else {
      setError(res.error || 'Invalid email or password');
    }
  };

  const handleQuickDemoLogin = (role: UserRole, targetPath: string) => {
    switchDemoRole(role);
    navigate(targetPath);
  };

  const handleStartOnboardingDemo = () => {
    const demoUser = {
      id: `user-new-${Date.now()}`,
      email: 'newfamily@apnasahara.com',
      name: 'Ananya Sharma',
      role: 'family' as UserRole,
      phone: '+91 98765 00000',
      is_onboarded: false,
      city: 'Bengaluru'
    };
    dbStore.saveUser(demoUser);
    localStorage.setItem('apnasahara_current_session', JSON.stringify(demoUser));
    window.location.href = '/onboarding';
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-serif">
      <div className="relative max-w-md w-full space-y-7 art-card p-8 sm:p-10 shadow-2xl">
        <OrnateCorner position="top-left" color="#CFB53B" size={40} />
        <OrnateCorner position="top-right" color="#CFB53B" size={40} />

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-art bg-[#008080] text-[#FFFFF0] border-2 border-[#CFB53B] flex items-center justify-center mx-auto shadow-md">
            <Heart className="w-6 h-6 fill-[#FFFFF0]" />
          </div>
          <h2 className="text-3xl font-bold text-[#17211C] tracking-tight">Sign In to ApnaSahara</h2>
          <p className="text-xs text-[#17211C]/70 font-sans">Enter the Belle Époque sanctuary of filial care</p>
        </div>

        <WhiplashDivider color="#CFB53B" className="max-w-[200px] mx-auto" />

        {/* Quick Demo Logins Section */}
        <div className="p-4 rounded-art bg-[#FFFDD0] border border-[#CFB53B]/60 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#008080] flex items-center gap-1.5 font-sans">
              <Sparkles className="w-3.5 h-3.5 text-[#CFB53B]" />
              Role Quick-Access
            </span>
            <span className="text-[10px] bg-[#FFFFF0] border border-[#CFB53B]/50 text-[#17211C] px-2 py-0.5 rounded-art font-bold font-mono">
              Demo Access
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-bold font-sans">
            <button
              onClick={() => handleQuickDemoLogin('family', '/family')}
              className="p-2.5 rounded-art bg-[#FFFFF0] hover:bg-[#FFFDD0] text-[#17211C] border border-[#CFB53B]/40 hover:border-[#008080] text-left transition-all group"
            >
              <div className="flex items-center gap-1.5 text-[#008080]">
                <Users className="w-4 h-4 text-[#008080]" />
                <span className="font-serif">Family Member</span>
              </div>
              <p className="text-[10px] text-[#17211C]/60 font-normal truncate mt-0.5">Rahul Sharma (BLR)</p>
            </button>

            <button
              onClick={() => handleQuickDemoLogin('elder', '/parent')}
              className="p-2.5 rounded-art bg-[#FFFFF0] hover:bg-[#FFFDD0] text-[#17211C] border border-[#CFB53B]/40 hover:border-[#808000] text-left transition-all group"
            >
              <div className="flex items-center gap-1.5 text-[#808000]">
                <Heart className="w-4 h-4 text-[#808000]" />
                <span className="font-serif">Elderly Parent</span>
              </div>
              <p className="text-[10px] text-[#17211C]/60 font-normal truncate mt-0.5">Ramesh Sharma (DEL)</p>
            </button>

            <button
              onClick={() => handleQuickDemoLogin('caregiver', '/caregiver')}
              className="p-2.5 rounded-art bg-[#FFFFF0] hover:bg-[#FFFDD0] text-[#17211C] border border-[#CFB53B]/40 hover:border-[#005F9E] text-left transition-all group"
            >
              <div className="flex items-center gap-1.5 text-[#005F9E]">
                <Stethoscope className="w-4 h-4 text-[#005F9E]" />
                <span className="font-serif">Verified Sahayak</span>
              </div>
              <p className="text-[10px] text-[#17211C]/60 font-normal truncate mt-0.5">Priya Verma (GDA)</p>
            </button>

            <button
              onClick={() => handleQuickDemoLogin('admin', '/admin')}
              className="p-2.5 rounded-art bg-[#FFFFF0] hover:bg-[#FFFDD0] text-[#17211C] border border-[#CFB53B]/40 hover:border-[#800020] text-left transition-all group"
            >
              <div className="flex items-center gap-1.5 text-[#800020]">
                <ShieldCheck className="w-4 h-4 text-[#800020]" />
                <span className="font-serif">Care Director</span>
              </div>
              <p className="text-[10px] text-[#17211C]/60 font-normal truncate mt-0.5">Dr. Ananya Roy (Ops)</p>
            </button>
          </div>

          <button
            type="button"
            onClick={handleStartOnboardingDemo}
            className="w-full mt-2 p-2 rounded-art bg-[#008080]/10 hover:bg-[#008080]/20 text-[#008080] text-xs font-bold border border-[#008080]/30 transition-colors flex items-center justify-center gap-1.5 font-sans"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#CFB53B]" />
            <span>Test New Family Onboarding Flow →</span>
          </button>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-[#CFB53B]/30 w-full" />
          <span className="bg-[#FFFFF0] px-3 text-xs text-[#17211C]/50 font-medium absolute font-sans">or credentials sign in</span>
        </div>

        {error && (
          <div className="p-3 rounded-art bg-[#800020]/10 border border-[#800020]/40 text-[#800020] text-xs flex items-center gap-2 font-sans">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Standard Email Login Form */}
        <form onSubmit={handleStandardLogin} className="space-y-4 font-sans">
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

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-[#17211C]">Password</label>
              <Link to="/forgot-password" className="text-xs text-[#008080] hover:underline font-bold">
                Forgot Password?
              </Link>
            </div>
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
                Sign In to Sanctuary
                <ArrowRight className="w-4 h-4 text-[#CFB53B]" />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-xs text-[#17211C]/75 font-sans">
          Don't have an account yet?{' '}
          <Link to="/register" className="font-bold text-[#008080] hover:underline">
            Register your family
          </Link>
        </p>
      </div>
    </div>
  );
};
