import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const schemes = await db.scheme.findMany({
      include: { bank: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(schemes);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { bankName, schemeName, product, states, minAmount, maxAmount, minROI, maxROI, cibilScore, foir, minVintage, usps, rmContact } = body;

    let bank = await db.bank.findFirst({
      where: { name: { contains: bankName } },
    });

    if (!bank) {
      const org = await db.organization.findFirst();
      if (!org) return NextResponse.json({ error: 'Organization not found' }, { status: 400 });

      bank = await db.bank.create({
        data: {
          organizationId: org.id,
          name: bankName,
          code: bankName.slice(0, 4).toUpperCase(),
        },
      });
    }

    const scheme = await db.scheme.create({
      data: {
        bankId: bank.id,
        schemeName,
        product: product || 'Home Loan',
        states: states || 'All India',
        minAmount: parseFloat(minAmount || 1000000),
        maxAmount: parseFloat(maxAmount || 50000000),
        minROI: parseFloat(minROI || 8.5),
        maxROI: parseFloat(maxROI || 10.5),
        cibilScore: parseInt(cibilScore || 700),
        foir: parseFloat(foir || 65),
        minVintage: parseInt(minVintage || 2),
        usps: usps || null,
        rmContact: rmContact || null,
      },
    });

    return NextResponse.json(scheme, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
