'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { ShieldCheck, Building2, User, Mail, Phone, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    companyName: '',
    legalName: '',
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [agreedTerms, setAgreedTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const validate = () => {
    if (!formData.companyName.trim()) {
      setError('Company / Agency Name is required.');
      return false;
    }
    if (!formData.fullName.trim()) {
      setError('Admin Full Name is required.');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Work Email is required.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setError('Please enter a valid email address.');
      return false;
    }
    if (!formData.phone.trim()) {
      setError('Mobile Number is required.');
      return false;
    }
    if (!formData.password || formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return false;
    }
    if (formData.confirmPassword && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return false;
    }
    if (!agreedTerms) {
      setError('You must agree to the Terms & Privacy Policy.');
      return false;
    }
    return true;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    setError('');

    if (!validate()) return;

    setIsLoading(true);

    try {
      await register({
        ...formData,
        email: formData.email.trim(),
      });
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
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

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3 relative z-10">
        <Link href="/" className="inline-flex items-center gap-2.5 group">
          <div className="h-10 w-10 rounded-xl bg-[#1687E8] flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform">
            <ShieldCheck className="h-6 w-6 stroke-[2.5]" />
          </div>
          <span className="text-2xl font-extrabold text-white tracking-tight">
            Loan<span className="text-[#1687E8]">Pilot</span>
          </span>
        </Link>
        <h2 className="text-xl font-extrabold text-white tracking-tight">Create Your Loan Pilot Account</h2>
        <p className="text-xs text-[#A8B4C7]">Start your 14-Day Free DSA CRM Trial with full feature access</p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-xl relative z-10">
        <div className="bg-[#0B1E38]/90 backdrop-blur-xl border border-white/10 p-6 sm:p-8 rounded-2xl shadow-2xl space-y-4 text-white">
          
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-500/40 text-xs font-semibold text-rose-200 flex items-center gap-2.5">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4" noValidate>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                  Company / Agency Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Building2 className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    placeholder="Apex Financial Solutions"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-white/15 bg-[#071426] text-xs font-medium text-white placeholder-slate-500 focus:border-[#1687E8] focus:bg-[#061226] focus:outline-none transition-colors"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                  Legal / Billing Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Building2 className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    placeholder="Apex Fin Pvt Ltd"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-white/15 bg-[#071426] text-xs font-medium text-white placeholder-slate-500 focus:border-[#1687E8] focus:bg-[#061226] focus:outline-none transition-colors"
                    value={formData.legalName}
                    onChange={(e) => setFormData({ ...formData, legalName: e.target.value })}
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                Admin Full Name *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  placeholder="Vikramaditya Sharma"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-white/15 bg-[#071426] text-xs font-medium text-white placeholder-slate-500 focus:border-[#1687E8] focus:bg-[#061226] focus:outline-none transition-colors"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  disabled={isLoading}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                  Work Email *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    type="email"
                    placeholder="vikram@apexfin.in"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-white/15 bg-[#071426] text-xs font-medium text-white placeholder-slate-500 focus:border-[#1687E8] focus:bg-[#061226] focus:outline-none transition-colors"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                  Mobile Number *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Phone className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    placeholder="+91 98765 43210"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-white/15 bg-[#071426] text-xs font-medium text-white placeholder-slate-500 focus:border-[#1687E8] focus:bg-[#061226] focus:outline-none transition-colors"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                  Create Password *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    type="password"
                    placeholder="At least 6 characters"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-white/15 bg-[#071426] text-xs font-medium text-white placeholder-slate-500 focus:border-[#1687E8] focus:bg-[#061226] focus:outline-none transition-colors"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                  Confirm Password *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    type="password"
                    placeholder="Re-enter password"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-white/15 bg-[#071426] text-xs font-medium text-white placeholder-slate-500 focus:border-[#1687E8] focus:bg-[#061226] focus:outline-none transition-colors"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="terms"
                checked={agreedTerms}
                onChange={(e) => setAgreedTerms(e.target.checked)}
                className="h-4 w-4 rounded border-slate-700 bg-[#071426] text-[#1687E8] focus:ring-blue-600"
              />
              <label htmlFor="terms" className="text-xs text-[#A8B4C7] font-medium cursor-pointer">
                I agree to the <span className="text-[#7FA8FF] underline">Terms of Service</span> & <span className="text-[#7FA8FF] underline">Privacy Policy</span>
              </label>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#1687E8] text-white hover:bg-blue-500 shadow-lg shadow-blue-500/25 border-0 font-bold text-xs py-2.5 mt-2 gap-1.5"
              isLoading={isLoading}
              disabled={isLoading}
            >
              Create Account & Go to Dashboard <ArrowRight className="h-4 w-4" />
            </Button>

          </form>

          <div className="pt-2 text-center text-xs text-[#A8B4C7]">
            Already have an account?{' '}
            <Link href="/login" className="font-bold text-[#7FA8FF] hover:underline">
              Log In
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
