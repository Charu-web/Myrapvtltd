'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { ShieldCheck, Mail, Lock, Eye, EyeOff, Sparkles, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('admin@loanpilot.in');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeDemoRole, setActiveDemoRole] = useState<string | null>(null);
  const [error, setError] = useState('');

  const demoAccounts = [
    { role: 'Admin / Owner', email: 'admin@loanpilot.in', color: 'bg-blue-600 hover:bg-blue-500 text-white' },
    { role: 'Sales Agent', email: 'agent@loanpilot.in', color: 'bg-indigo-600 hover:bg-indigo-500 text-white' },
    { role: 'Operations', email: 'ops@loanpilot.in', color: 'bg-cyan-600 hover:bg-cyan-500 text-white' },
    { role: 'Finance', email: 'finance@loanpilot.in', color: 'bg-emerald-600 hover:bg-emerald-500 text-white' },
    { role: 'HR Manager', email: 'hr@loanpilot.in', color: 'bg-purple-600 hover:bg-purple-500 text-white' },
    { role: 'Sub-DSA Partner', email: 'partner@loanpilot.in', color: 'bg-amber-600 hover:bg-amber-500 text-white' },
  ];

  const validateForm = () => {
    if (!email.trim()) {
      setError('Please enter your email or mobile number.');
      return false;
    }
    if (!password) {
      setError('Please enter your password.');
      return false;
    }
    return true;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    setError('');

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await login(email.trim(), password);
      router.push('/dashboard');
    } catch (err: any) {
      if (err.message && err.message.includes('Failed to fetch')) {
        setError('Unable to connect to the authentication server. Please try again.');
      } else {
        setError(err.message || 'Invalid email/mobile or password.');
      }
    } finally {
      setIsLoading(false);
      setActiveDemoRole(null);
    }
  };

  const handleDemoAccountLogin = async (accRole: string, accEmail: string) => {
    if (isLoading) return;
    setError('');
    setEmail(accEmail);
    setPassword('password123');
    setActiveDemoRole(accRole);
    setIsLoading(true);

    try {
      await login(accEmail, 'password123');
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || `Failed to sign in as ${accRole}`);
      setIsLoading(false);
      setActiveDemoRole(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#071426] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Background Radial Glow Effects */}
      <div
        className="absolute top-1/4 right-10 w-[500px] h-[500px] pointer-events-none rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.16) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute bottom-10 left-10 w-[400px] h-[400px] pointer-events-none rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.12) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3 relative z-10">
        <Link href="/" className="inline-flex items-center gap-2.5 group">
          <div className="h-10 w-10 rounded-xl bg-[#1687E8] flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform">
            <ShieldCheck className="h-6 w-6 stroke-[2.5]" />
          </div>
          <span className="text-2xl font-extrabold text-white tracking-tight">
            Loan<span className="text-[#1687E8]">Pilot</span>
          </span>
        </Link>
        <h2 className="text-xl font-extrabold text-white tracking-tight">Welcome Back 👋</h2>
        <p className="text-xs text-[#A8B4C7]">Sign in to your Loan Pilot DSA CRM workspace</p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-[#0B1E38]/90 backdrop-blur-xl border border-white/10 p-6 sm:p-8 rounded-2xl shadow-2xl space-y-5 text-white">
          
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-500/40 text-xs font-semibold text-rose-200 flex items-center gap-2.5">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4" noValidate>
            
            {/* Email / Mobile Field */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                Email or Mobile Number *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  placeholder="admin@loanpilot.in or +91 9876543210"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-white/15 bg-[#071426] text-xs font-medium text-white placeholder-slate-500 focus:border-[#1687E8] focus:bg-[#061226] focus:outline-none transition-colors"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
            </div>
            
            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                  Password *
                </label>
                <Link href="/forgot-password" className="text-xs font-semibold text-[#7FA8FF] hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-white/15 bg-[#071426] text-xs font-medium text-white placeholder-slate-500 focus:border-[#1687E8] focus:bg-[#061226] focus:outline-none transition-colors"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200 focus:outline-none"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-slate-700 bg-[#071426] text-[#1687E8] focus:ring-blue-600"
              />
              <label htmlFor="remember" className="text-xs text-[#A8B4C7] font-medium cursor-pointer">
                Remember me on this device
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-[#1687E8] text-white hover:bg-blue-500 shadow-lg shadow-blue-500/25 border-0 font-bold text-xs py-2.5 mt-2"
              isLoading={isLoading && !activeDemoRole}
              disabled={isLoading}
            >
              {isLoading && activeDemoRole
                ? `Signing in as ${activeDemoRole}...`
                : isLoading
                ? 'Signing in...'
                : 'Log In to Dashboard'}
            </Button>

          </form>

          {/* Divider */}
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#0B1E38] px-3 text-slate-400 font-semibold">or 1-Click Demo Login</span>
            </div>
          </div>

          {/* Quick Demo Seed Accounts */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
              <span className="flex items-center gap-1.5 text-[#7FA8FF]">
                <Sparkles className="h-3.5 w-3.5 text-amber-400" /> Instant Demo Accounts
              </span>
              <span className="text-[10px] text-slate-400">Pass: password123</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {demoAccounts.map((acc, idx) => {
                const isSigningInThisRole = isLoading && activeDemoRole === acc.role;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleDemoAccountLogin(acc.role, acc.email)}
                    disabled={isLoading}
                    aria-label={`Sign in as ${acc.role}`}
                    className={`text-[11px] font-bold py-2 px-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400 min-h-[44px] ${acc.color} ${
                      isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]'
                    }`}
                  >
                    {isSigningInThisRole ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        <span>Signing in...</span>
                      </>
                    ) : (
                      <span>{acc.role}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Create Account CTA */}
          <div className="pt-2 text-center text-xs text-[#A8B4C7]">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="font-bold text-[#7FA8FF] hover:underline">
              Create Account
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
