import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const partners = await db.partner.findMany({
      include: {
        _count: { select: { applications: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(partners);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const org = await db.organization.findFirst();
    if (!org) return NextResponse.json({ error: 'Organization not found' }, { status: 400 });

    const partnerCode = `PTR-${Math.floor(100 + Math.random() * 900)}`;
    const partner = await db.partner.create({
      data: {
        organizationId: org.id,
        partnerCode,
        name: body.name,
        type: body.type || 'Sub-DSA',
        phone: body.phone,
        email: body.email,
        city: body.city || 'Delhi NCR',
        commissionRate: parseFloat(body.commissionRate || 70),
      },
    });

    return NextResponse.json(partner, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
