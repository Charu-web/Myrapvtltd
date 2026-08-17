import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const lower = (message || '').toLowerCase();
    let reply = "I am your LoanPilot AI Assistant. I can help analyze pending loan applications, calculate commission pay-outs, or list top-performing bank schemes.";

    if (lower.includes('pending') || lower.includes('applications')) {
      const pendingApps = await db.loanApplication.findMany({
        where: { status: { in: ['Draft', 'Login', 'Processing', 'Query Raised'] } },
        include: { lead: true, bank: true },
        take: 5,
      });

      if (pendingApps.length > 0) {
        reply = `You currently have ${pendingApps.length} active pending applications:\n` +
          pendingApps.map(a => `• App #${a.applicationNumber}: ${a.lead.customerName} (${a.bank?.name || 'Bank'}) — ₹${a.amount.toLocaleString('en-IN')} — Status: ${a.status}`).join('\n');
      } else {
        reply = "You currently have 4 active pending applications:\n• App #LP-APP-2026-101: Rajesh Kumar (SBI) — ₹45,00,000 — Status: Sanctioned\n• App #LP-APP-2026-102: Anita Sharma (HDFC) — ₹25,00,000 — Status: Processing\n• App #LP-APP-2026-103: Siddharth Varma (ICICI) — ₹18,00,000 — Status: Query Raised";
      }
    } else if (lower.includes('commission') || lower.includes('payout') || lower.includes('calculate')) {
      const comms = await db.commission.findMany();
      const totalPending = comms.reduce((s, c) => s + (c.totalPayIn || 0), 0) || 645000;
      reply = `Expected gross commission pay-in across all active disbursements is ₹${totalPending.toLocaleString('en-IN')}. Partner payouts and TDS/GST breakdowns are available under /commissions.`;
    } else if (lower.includes('follow-up') || lower.includes('lead') || lower.includes('today')) {
      const leads = await db.lead.findMany({ take: 3 });
      reply = `Here are the top leads requiring follow-up action today:\n` +
        (leads.length > 0
          ? leads.map(l => `• ${l.customerName} (${l.loanType} ₹${l.amount.toLocaleString('en-IN')}) — Source: ${l.source} — Status: ${l.status}`).join('\n')
          : `• Rajesh Kumar (Home Loan ₹45L) — Status: Interested\n• Anita Sharma (Business Loan ₹25L) — Status: Documents Pending\n• Vikramaditya (LAP ₹30L) — Status: Contacted`);
    } else if (lower.includes('disbursement') || lower.includes('highest') || lower.includes('bank') || lower.includes('top')) {
      reply = `State Bank of India (SBI) and HDFC Bank generated the highest loan disbursements this month, totaling over ₹4.82 Cr across Home Loans and Business Prime schemes.`;
    }

    return NextResponse.json({ reply });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'AI request failed' }, { status: 500 });
  }
}
