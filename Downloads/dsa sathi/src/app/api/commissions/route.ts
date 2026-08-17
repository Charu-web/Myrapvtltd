import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const commissions = await db.commission.findMany({
      include: {
        application: { include: { bank: true, partner: true } },
        lead: true,
        transactions: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(commissions);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
