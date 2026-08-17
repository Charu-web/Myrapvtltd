'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency, formatDate } from '@/lib/utils';
import { ArrowLeft, Users, Phone, Mail, MapPin, DollarSign, FileCheck } from 'lucide-react';

export default function PartnerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [partner, setPartner] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchPartnerDetail();
  }, [id]);

  const fetchPartnerDetail = async () => {
    try {
      const res = await fetch(`/api/partners/${id}`);
      const data = await res.json();
      setPartner(data);
    } catch {
      // ignore
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div className="p-12 text-center text-xs text-slate-500">Loading partner profile...</div>;
  if (!partner) return <div className="p-12 text-center text-xs text-rose-500">Partner not found.</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/partners">
          <Button variant="ghost" size="sm"><ArrowLeft className="h-4 w-4" /> Back to Partners</Button>
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">{partner.name}</h1>
          <p className="text-xs text-slate-500">{partner.partnerCode} • {partner.type}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <Card className="p-6">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Partner Referred Applications</h3>
            {partner.applications?.length === 0 ? (
              <p className="text-xs text-slate-500 py-4 text-center">No referred loan applications recorded yet.</p>
            ) : (
              <div className="space-y-3">
                {partner.applications?.map((app: any) => (
                  <div key={app.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-blue-600">{app.applicationNumber}</span>
                        <Badge statusText={app.status} />
                      </div>
                      <p className="font-bold text-slate-900 mt-1">{app.lead?.customerName}</p>
                      <p className="text-slate-500">{app.bank?.name} • {formatCurrency(app.amount)}</p>
                    </div>
                    <span className="font-extrabold text-emerald-600">70% Split</span>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <Card className="p-5 space-y-3 text-xs">
            <h3 className="text-xs font-bold text-slate-400 uppercase">Contact Information</h3>
            <p className="flex items-center gap-2 text-slate-700 font-bold"><Phone className="h-4 w-4 text-slate-400" /> {partner.phone}</p>
            <p className="flex items-center gap-2 text-slate-700"><Mail className="h-4 w-4 text-slate-400" /> {partner.email}</p>
            <p className="flex items-center gap-2 text-slate-700"><MapPin className="h-4 w-4 text-slate-400" /> {partner.city || 'Delhi NCR'}</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
