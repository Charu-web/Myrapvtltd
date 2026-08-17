'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ShieldCheck, Mail, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your registered email address.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setSent(true);
    } catch {
      setError('Unable to send password reset link. Please try again.');
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
        <h2 className="text-xl font-extrabold text-white tracking-tight">Forgot Your Password?</h2>
        <p className="text-xs text-[#A8B4C7]">Enter your work email address to receive password recovery instructions</p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-[#0B1E38]/90 backdrop-blur-xl border border-white/10 p-6 sm:p-8 rounded-2xl shadow-2xl space-y-5 text-white">
          
          {sent ? (
            <div className="text-center space-y-4 py-2">
              <CheckCircle2 className="h-12 w-12 text-emerald-400 mx-auto" />
              <h3 className="text-lg font-bold text-white">Reset Link Sent!</h3>
              <p className="text-xs text-[#A8B4C7] leading-relaxed">
                We sent password recovery instructions to <strong className="text-white">{email}</strong>. Please check your inbox.
              </p>
              <Link href="/login">
                <Button className="w-full bg-[#1687E8] text-white hover:bg-blue-500 shadow-md border-0 mt-4">
                  Return to Login
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              
              {error && (
                <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-500/40 text-xs font-semibold text-rose-200 flex items-center gap-2.5">
                  <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                  Registered Work Email *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    type="email"
                    placeholder="name@company.in"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-white/15 bg-[#071426] text-xs font-medium text-white placeholder-slate-500 focus:border-[#1687E8] focus:bg-[#061226] focus:outline-none transition-colors"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#1687E8] text-white hover:bg-blue-500 shadow-lg shadow-blue-500/25 border-0 font-bold text-xs py-2.5 mt-2"
                isLoading={isLoading}
                disabled={isLoading}
              >
                {isLoading ? 'Sending Request...' : 'Send Reset Link'}
              </Button>

              <div className="text-center pt-3">
                <Link href="/login" className="inline-flex items-center gap-1.5 text-xs text-[#7FA8FF] hover:underline font-semibold">
                  <ArrowLeft className="h-3.5 w-3.5" /> Back to Login
                </Link>
              </div>

            </form>
          )}

        </div>
      </div>
    </div>
  );
}
