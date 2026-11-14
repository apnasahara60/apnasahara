import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '../types';
import { dbStore, supabase, isLiveSupabaseConfigured } from '../lib/supabase';

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole | null;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string, role: UserRole, phone: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  resetPassword: (email: string) => Promise<{ success: boolean; message: string }>;
  switchDemoRole: (role: UserRole) => void;
  updateProfile: (data: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check saved session in localStorage
    const saved = localStorage.getItem('apnasahara_current_session');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUser(parsed);
      } catch (e) {
        console.error('Session load error', e);
      }
    } else {
      // Default to family role for immediate preview if desired, or null
      // Let's set default demo user to Family for effortless exploration
      const users = dbStore.getUsers();
      const defaultFamily = users.find(u => u.role === 'family') || users[0];
      if (defaultFamily) {
        setUser(defaultFamily);
        localStorage.setItem('apnasahara_current_session', JSON.stringify(defaultFamily));
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password?: string) => {
    setIsLoading(true);
    try {
      if (isLiveSupabaseConfigured && supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password: password || 'password123'
        });
        if (error) throw error;
        // Fetch profile
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (profileData) {
          const u: UserProfile = {
            id: profileData.id,
            email: profileData.email,
            name: profileData.name,
            role: profileData.role,
            phone: profileData.phone || '',
            avatar_url: profileData.avatar_url
          };
          setUser(u);
          localStorage.setItem('apnasahara_current_session', JSON.stringify(u));
          setIsLoading(false);
          return { success: true };
        }
      }

      // Fallback local auth
      const users = dbStore.getUsers();
      const match = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (match) {
        setUser(match);
        localStorage.setItem('apnasahara_current_session', JSON.stringify(match));
        setIsLoading(false);
        return { success: true };
      } else {
        // Create demo user on the fly if not found
        const newUser: UserProfile = {
          id: `user-${Date.now()}`,
          email,
          name: email.split('@')[0].toUpperCase(),
          role: 'family',
          phone: '+91 98000 00000',
          avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'
        };
        dbStore.saveUser(newUser);
        setUser(newUser);
        localStorage.setItem('apnasahara_current_session', JSON.stringify(newUser));
        setIsLoading(false);
        return { success: true };
      }
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err.message || 'Login failed' };
    }
  };

  const register = async (name: string, email: string, password: string, role: UserRole, phone: string) => {
    setIsLoading(true);
    try {
      if (isLiveSupabaseConfigured && supabase) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { name, role, phone }
          }
        });
        if (error) throw error;
      }

      const newUser: UserProfile = {
        id: `user-${Date.now()}`,
        email,
        name,
        role,
        phone,
        avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'
      };
      dbStore.saveUser(newUser);
      setUser(newUser);
      localStorage.setItem('apnasahara_current_session', JSON.stringify(newUser));
      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err.message || 'Registration failed' };
    }
  };

  const logout = () => {
    if (isLiveSupabaseConfigured && supabase) {
      supabase.auth.signOut();
    }
    localStorage.removeItem('apnasahara_current_session');
    setUser(null);
  };

  const resetPassword = async (email: string) => {
    if (isLiveSupabaseConfigured && supabase) {
      await supabase.auth.resetPasswordForEmail(email);
    }
    return {
      success: true,
      message: `If an account exists for ${email}, a password reset link has been dispatched.`
    };
  };

  const switchDemoRole = (targetRole: UserRole) => {
    const users = dbStore.getUsers();
    const match = users.find(u => u.role === targetRole);
    if (match) {
      setUser(match);
      localStorage.setItem('apnasahara_current_session', JSON.stringify(match));
    }
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    dbStore.saveUser(updated);
    localStorage.setItem('apnasahara_current_session', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user ? user.role : null,
        isLoading,
        login,
        register,
        logout,
        resetPassword,
        switchDemoRole,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
