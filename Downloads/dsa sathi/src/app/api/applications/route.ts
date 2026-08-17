import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');

    const where: any = {};
    if (status && status !== 'All') where.status = status;

    const applications = await db.loanApplication.findMany({
      where,
      include: {
        lead: true,
        bank: true,
        assignedEmployee: { select: { fullName: true } },
        partner: { select: { name: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(applications);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { leadId, bankId, loanType, amount, tenure, roi, partnerId } = body;

    const org = await db.organization.findFirst();
    if (!org) return NextResponse.json({ error: 'Organization not found' }, { status: 400 });

    const appNumber = `LP-APP-2026-${Math.floor(100 + Math.random() * 900)}`;

    const app = await db.loanApplication.create({
      data: {
        organizationId: org.id,
        applicationNumber: appNumber,
        leadId,
        bankId,
        loanType,
        amount: parseFloat(amount),
        tenure: parseInt(tenure || 240),
        roi: parseFloat(roi || 8.5),
        partnerId: partnerId || null,
        status: 'Login',
        loginDate: new Date(),
      },
    });

    // Update lead status to Application Started
    await db.lead.update({
      where: { id: leadId },
      data: { status: 'Login' },
    });

    return NextResponse.json(app, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
