import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const commission = await db.commission.findUnique({
      where: { id },
      include: {
        application: { include: { bank: true, partner: true, lead: true } },
        lead: true,
        transactions: true,
      },
    });

    if (!commission) return NextResponse.json({ error: 'Commission record not found' }, { status: 404 });

    return NextResponse.json(commission);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const updatedCommission = await db.commission.update({
      where: { id },
      data: {
        ...(body.status !== undefined && { status: body.status }),
        ...(body.payoutStatus !== undefined && { status: body.payoutStatus }),
        ...(body.payInPercent !== undefined && { payInPercent: parseFloat(body.payInPercent) }),
        ...(body.totalPayIn !== undefined && { totalPayIn: parseFloat(body.totalPayIn) }),
        ...(body.partnerPayout !== undefined && { partnerPayout: parseFloat(body.partnerPayout) }),
        ...(body.tdsAmount !== undefined && { tdsAmount: parseFloat(body.tdsAmount) }),
        ...(body.gstAmount !== undefined && { gstAmount: parseFloat(body.gstAmount) }),
        ...(body.netPayout !== undefined && { netPayout: parseFloat(body.netPayout) }),
      },
    });

    return NextResponse.json(updatedCommission);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await db.commission.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
