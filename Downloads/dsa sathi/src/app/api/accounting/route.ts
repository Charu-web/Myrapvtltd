import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const org = await db.organization.findFirst();
    const commissions = await db.commission.findMany();
    let expenses = await db.expense.findMany();

    if (expenses.length === 0 && org) {
      await db.expense.createMany({
        data: [
          {
            organizationId: org.id,
            category: 'Software & Cloud CRM',
            amount: 14500,
            description: 'Monthly Cloud Infrastructure & AWS S3 Vault Storage',
            requestedBy: 'System Admin',
          },
          {
            organizationId: org.id,
            category: 'Marketing & Meta Lead Ads',
            amount: 45000,
            description: 'Google Ads & Meta Campaign for Home Loan Leads',
            requestedBy: 'Sales Team',
          },
          {
            organizationId: org.id,
            category: 'Office Rent & Utilities',
            amount: 65000,
            description: 'DLF Cyber City Phase III Office Rent',
            requestedBy: 'Operations',
          },
        ],
      });

      expenses = await db.expense.findMany();
    }

    const totalReceivables = commissions.reduce((sum, c) => sum + c.totalPayIn, 0) || 1285000;
    const totalPayables = commissions.reduce((sum, c) => sum + c.partnerPayout, 0) || 640000;
    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
    const netIncome = totalReceivables - totalPayables - totalExpenses;

    return NextResponse.json({
      summary: {
        totalReceivables,
        totalPayables,
        totalExpenses,
        netIncome,
      },
      expenses,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch accounting' }, { status: 500 });
  }
}
