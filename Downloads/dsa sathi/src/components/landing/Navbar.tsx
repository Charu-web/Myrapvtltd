'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) setIsScrolled(true);
      else setIsScrolled(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#071426]/90 backdrop-blur-md shadow-lg border-b border-white/10 py-3'
          : 'bg-transparent border-b border-white/5 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/30 group-hover:scale-105 transition-transform">
            <ShieldCheck className="h-6 w-6 stroke-[2.5]" />
          </div>
          <div>
            <span className="text-xl font-extrabold text-white tracking-tight flex items-center gap-1">
              Loan<span className="text-[#1687E8]">Pilot</span>
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-widest text-slate-400 -mt-1">
              DSA CRM
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#CBD5E1]">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#loan-types" className="hover:text-white transition-colors">Loan Products</a>
          <a href="#before-after" className="hover:text-white transition-colors">Why LoanPilot</a>
          <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
          <Link href="/schemes" className="hover:text-white transition-colors">Bank Schemes</Link>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm" className="text-slate-200 hover:text-white hover:bg-white/10">
              Log In
            </Button>
          </Link>
          <Link href="/register">
            <Button size="sm" className="bg-[#1687E8] text-white hover:bg-blue-500 shadow-lg shadow-blue-500/25 border-0 gap-1.5 group">
              Start Free Trial
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#071426] border-b border-white/10 px-4 pt-3 pb-6 space-y-4 shadow-2xl">
          <div className="flex flex-col space-y-3 font-medium text-slate-200">
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="hover:text-white py-1">Features</a>
            <a href="#loan-types" onClick={() => setMobileMenuOpen(false)} className="hover:text-white py-1">Loan Products</a>
            <a href="#before-after" onClick={() => setMobileMenuOpen(false)} className="hover:text-white py-1">Why LoanPilot</a>
            <Link href="/pricing" onClick={() => setMobileMenuOpen(false)} className="hover:text-white py-1">Pricing</Link>
            <Link href="/schemes" onClick={() => setMobileMenuOpen(false)} className="hover:text-white py-1">Bank Schemes</Link>
          </div>
          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full text-slate-200 border-white/20 hover:bg-white/10">Log In</Button>
            </Link>
            <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full bg-[#1687E8] text-white hover:bg-blue-500 shadow-md">Start Free Trial</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
