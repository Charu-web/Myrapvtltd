'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#040C18] text-slate-400 py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="h-10 w-10 rounded-xl bg-[#1687E8] flex items-center justify-center text-white font-bold">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                Loan<span className="text-[#1687E8]">Pilot</span>
              </span>
            </Link>
            <p className="text-xs leading-relaxed max-w-sm text-slate-400">
              LoanPilot CRM is India&apos;s leading DSA loan management platform built to centralize leads, track multi-bank applications, calculate commissions, and scale financial teams.
            </p>
            <div className="space-y-2 text-xs text-slate-400 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#1687E8]" />
                <span>Suite 402, DLF Cyber City, Phase III, Gurugram, Haryana</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#1687E8]" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#1687E8]" />
                <span>support@loanpilot.in</span>
              </div>
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Product</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><a href="#features" className="hover:text-blue-400 transition-colors">Lead CRM</a></li>
              <li><a href="#features" className="hover:text-blue-400 transition-colors">Loan Application Pipeline</a></li>
              <li><a href="#features" className="hover:text-blue-400 transition-colors">Commission Engine</a></li>
              <li><a href="#features" className="hover:text-blue-400 transition-colors">Document Vault</a></li>
              <li><a href="#features" className="hover:text-blue-400 transition-colors">Partner Portal</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><Link href="/schemes" className="hover:text-blue-400 transition-colors">Bank Scheme Master</Link></li>
              <li><Link href="/scheme-master/submit" className="hover:text-blue-400 transition-colors">Submit Banker Scheme</Link></li>
              <li><Link href="/pricing" className="hover:text-blue-400 transition-colors">Pricing Calculator</Link></li>
              <li><a href="#faq" className="hover:text-blue-400 transition-colors">Help Center / FAQ</a></li>
              <li><Link href="/login" className="hover:text-blue-400 transition-colors">Demo Login</Link></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Company</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><span className="hover:text-blue-400 cursor-pointer">About LoanPilot</span></li>
              <li><span className="hover:text-blue-400 cursor-pointer">Privacy Policy</span></li>
              <li><span className="hover:text-blue-400 cursor-pointer">Terms of Service</span></li>
              <li><span className="hover:text-blue-400 cursor-pointer">Security Standards</span></li>
              <li><span className="hover:text-blue-400 cursor-pointer">Contact Sales</span></li>
            </ul>
          </div>

        </div>

        <div className="pt-12 mt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} LoanPilot India Pvt Ltd. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Designed for Indian Fintechs, DSAs & Financial Advisory Teams.</p>
        </div>
      </div>
    </footer>
  );
}
