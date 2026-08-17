import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const loanType = searchParams.get('loanType');
    const search = searchParams.get('search');

    const where: any = {};
    if (status && status !== 'All') where.status = status;
    if (loanType && loanType !== 'All') where.loanType = loanType;
    if (search) {
      where.OR = [
        { customerName: { contains: search } },
        { phone: { contains: search } },
        { leadId: { contains: search } },
      ];
    }

    const leads = await db.lead.findMany({
      where,
      include: {
        assignedTo: { select: { id: true, fullName: true, role: true } },
      },
      orderBy: { createdDate: 'desc' },
    });

    return NextResponse.json(leads);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customerName, phone, email, city, loanType, amount, source, notes } = body;

    if (!customerName || !phone || !loanType || !amount) {
      return NextResponse.json({ error: 'Customer name, phone, loan type and amount are required' }, { status: 400 });
    }

    const org = await db.organization.findFirst();
    if (!org) return NextResponse.json({ error: 'Organization not found' }, { status: 400 });

    const leadNum = Math.floor(1000 + Math.random() * 9000);
    const lead = await db.lead.create({
      data: {
        organizationId: org.id,
        leadId: `LP-LD-${leadNum}`,
        customerName,
        phone,
        email: email || null,
        city: city || 'Delhi NCR',
        loanType,
        amount: parseFloat(amount),
        source: source || 'Website',
        status: 'New',
        notes: notes || null,
      },
    });

    await db.leadActivity.create({
      data: {
        leadId: lead.id,
        type: 'STATUS_CHANGE',
        title: 'Lead Created',
        details: `Initial lead entered from source ${source || 'Website'}`,
      },
    });

    return NextResponse.json(lead, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
