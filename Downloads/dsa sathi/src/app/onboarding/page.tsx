'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Building2, Users, Landmark, FileSpreadsheet, CheckCircle2, ArrowRight } from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const [orgData, setOrgData] = useState({
    city: 'Delhi NCR',
    gstin: '07AAAAA0000A1Z5',
    address: 'DLF Cyber City, Phase III, Gurugram',
  });

  const [employeeEmail, setEmployeeEmail] = useState('agent2@loanpilot.in');
  const [selectedBanks, setSelectedBanks] = useState(['SBI', 'HDFC', 'ICICI']);

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
    else router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto w-full">
        
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-2">
            <span>Onboarding Progress</span>
            <span>Step {step} of 4</span>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-blue-600 h-full transition-all duration-300 rounded-full"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        <Card className="p-8 shadow-xl">
          
          {/* Step 1: Company details */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Step 1: Setup Organization Profile</h2>
                  <p className="text-xs text-slate-500">Provide company address and tax credentials.</p>
                </div>
              </div>

              <div className="space-y-4">
                <Input
                  label="Primary Operating City"
                  value={orgData.city}
                  onChange={(e) => setOrgData({ ...orgData, city: e.target.value })}
                />
                <Input
                  label="GSTIN Number (Optional)"
                  value={orgData.gstin}
                  onChange={(e) => setOrgData({ ...orgData, gstin: e.target.value })}
                />
                <Input
                  label="Office Address"
                  value={orgData.address}
                  onChange={(e) => setOrgData({ ...orgData, address: e.target.value })}
                />
              </div>
            </div>
          )}

          {/* Step 2: Add Employees */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Step 2: Invite Team Members</h2>
                  <p className="text-xs text-slate-500">Add sales agents, operations, or finance team members.</p>
                </div>
              </div>

              <div className="space-y-4">
                <Input
                  label="Sales Agent Email"
                  placeholder="agent@company.in"
                  value={employeeEmail}
                  onChange={(e) => setEmployeeEmail(e.target.value)}
                />
                <p className="text-xs text-slate-500">
                  An invitation link will be sent automatically to grant login access.
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Add Banks */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Landmark className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Step 3: Select Bank Codes & NBFC Partners</h2>
                  <p className="text-xs text-slate-500">Choose banks your DSA agency currently holds direct codes with.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {['SBI', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Bank', 'Bajaj Finserv'].map((bank) => (
                  <button
                    key={bank}
                    type="button"
                    onClick={() => {
                      if (selectedBanks.includes(bank)) setSelectedBanks(selectedBanks.filter((b) => b !== bank));
                      else setSelectedBanks([...selectedBanks, bank]);
                    }}
                    className={`p-3 rounded-lg border text-xs font-bold transition-all flex items-center justify-between ${
                      selectedBanks.includes(bank)
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    <span>{bank}</span>
                    {selectedBanks.includes(bank) && <CheckCircle2 className="h-4 w-4 text-blue-600" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Import Leads */}
          {step === 4 && (
            <div className="space-y-6 text-center">
              <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto font-bold">
                <FileSpreadsheet className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Step 4: Ready to Import Existing Leads?</h2>
                <p className="text-xs text-slate-500 mt-1">
                  You can upload your Excel/CSV lead file now or skip to your live CRM dashboard.
                </p>
              </div>
              <div className="p-6 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 hover:border-blue-500 cursor-pointer transition-colors">
                <p className="text-xs font-semibold text-slate-700">Drag & drop CSV lead file here</p>
                <p className="text-[10px] text-slate-400 mt-1">Supports .csv, .xlsx formats up to 10,000 rows</p>
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => router.push('/dashboard')}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800"
            >
              Skip and finish later
            </button>
            <Button variant="primary" onClick={nextStep}>
              {step === 4 ? 'Go to CRM Dashboard' : 'Continue'} <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

        </Card>
      </div>
    </div>
  );
}
