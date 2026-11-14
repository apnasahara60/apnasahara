import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Heart, Lock, Mail, ArrowRight, Sparkles, Shield, UserCheck, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { dbStore } from '../../lib/supabase';

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
        // Redirect by email heuristics or default
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
    // Switch to a new un-onboarded user for demonstration
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
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-slate-200">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-brand-600 text-white flex items-center justify-center mx-auto shadow-md shadow-brand-500/20">
            <Heart className="w-6 h-6 fill-white" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Sign In to ApnaSahara</h2>
          <p className="text-xs text-slate-500">Access your role-based eldercare portal</p>
        </div>

        {/* Quick Demo Logins Section */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              1-Click Demo Login
            </span>
            <span className="text-[10px] bg-brand-100 text-brand-800 px-2 py-0.5 rounded font-bold">Instant Access</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-bold">
            <button
              onClick={() => handleQuickDemoLogin('family', '/family')}
              className="p-2.5 rounded-xl bg-white hover:bg-emerald-50 text-slate-800 border border-slate-200 hover:border-emerald-300 text-left transition-all"
            >
              <div className="flex items-center gap-1.5 text-emerald-700">
                <span>👨‍👩‍👧</span>
                <span>Family Portal</span>
              </div>
              <p className="text-[10px] text-slate-400 font-normal truncate mt-0.5">Rahul Sharma</p>
            </button>

            <button
              onClick={() => handleQuickDemoLogin('elder', '/parent')}
              className="p-2.5 rounded-xl bg-white hover:bg-amber-50 text-slate-800 border border-slate-200 hover:border-amber-300 text-left transition-all"
            >
              <div className="flex items-center gap-1.5 text-amber-700">
                <span>👴</span>
                <span>Elder Portal</span>
              </div>
              <p className="text-[10px] text-slate-400 font-normal truncate mt-0.5">Ramesh Sharma</p>
            </button>

            <button
              onClick={() => handleQuickDemoLogin('caregiver', '/caregiver')}
              className="p-2.5 rounded-xl bg-white hover:bg-blue-50 text-slate-800 border border-slate-200 hover:border-blue-300 text-left transition-all"
            >
              <div className="flex items-center gap-1.5 text-blue-700">
                <span>🩺</span>
                <span>Caregiver</span>
              </div>
              <p className="text-[10px] text-slate-400 font-normal truncate mt-0.5">Priya Verma (GDA)</p>
            </button>

            <button
              onClick={() => handleQuickDemoLogin('admin', '/admin')}
              className="p-2.5 rounded-xl bg-white hover:bg-purple-50 text-slate-800 border border-slate-200 hover:border-purple-300 text-left transition-all"
            >
              <div className="flex items-center gap-1.5 text-purple-700">
                <span>🛡️</span>
                <span>Admin Ops</span>
              </div>
              <p className="text-[10px] text-slate-400 font-normal truncate mt-0.5">Dr. Ananya Roy</p>
            </button>
          </div>

          {/* Direct link to test new user onboarding experience */}
          <button
            type="button"
            onClick={handleStartOnboardingDemo}
            className="w-full mt-2 p-2 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-800 text-xs font-bold border border-brand-200 transition-colors flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>Test New User Onboarding Flow (Input Custom Family Data) →</span>
          </button>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-slate-200 w-full" />
          <span className="bg-white px-3 text-xs text-slate-400 font-medium absolute">or use password</span>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Standard Email Login Form */}
        <form onSubmit={handleStandardLogin} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. family@apnasahara.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-700">Password</label>
              <Link to="/forgot-password" className="text-xs text-brand-600 hover:underline">
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-lg shadow-brand-600/30 flex items-center justify-center gap-2 transition-all"
          >
            {isLoading ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                Sign In
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-xs text-slate-500">
          Don't have an account yet?{' '}
          <Link to="/register" className="font-bold text-brand-600 hover:underline">
            Register your family
          </Link>
        </p>
      </div>
    </div>
  );
};
