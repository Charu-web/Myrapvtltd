import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const banks = await db.bank.findMany({
      include: { _count: { select: { applications: true, schemes: true } } },
      orderBy: { name: 'asc' },
    });
    return NextResponse.json(banks);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const org = await db.organization.findFirst();
    if (!org) return NextResponse.json({ error: 'Organization not found' }, { status: 400 });

    const bank = await db.bank.create({
      data: {
        organizationId: org.id,
        name: body.name,
        code: body.code || body.name.slice(0, 4).toUpperCase(),
        minROI: parseFloat(body.minROI || 8.5),
        maxROI: parseFloat(body.maxROI || 12.0),
        processingFee: body.processingFee || '0.5% + GST',
        averageTAT: parseInt(body.averageTAT || 4),
        rmName: body.rmName || null,
        rmPhone: body.rmPhone || null,
        rmEmail: body.rmEmail || null,
      },
    });
    return NextResponse.json(bank, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
