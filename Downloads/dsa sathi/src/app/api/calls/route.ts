import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const calls = await db.call.findMany({
      include: {
        lead: { select: { id: true, customerName: true, phone: true, leadId: true } },
        caller: { select: { id: true, fullName: true } },
      },
      orderBy: { date: 'desc' },
    });
    return NextResponse.json(calls);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { leadId, callerId, callType, duration, result, notes } = body;

    if (!leadId) {
      return NextResponse.json({ error: 'Lead selection is required' }, { status: 400 });
    }

    const user = callerId ? { id: callerId } : await db.user.findFirst();

    const callRecord = await db.call.create({
      data: {
        leadId,
        callerId: user?.id || null,
        callType: callType || 'OUTBOUND',
        duration: parseInt(duration || 120),
        result: result || 'Connected',
        notes: notes || 'Outbound call logged',
        date: new Date(),
      },
      include: {
        lead: { select: { id: true, customerName: true, phone: true, leadId: true } },
        caller: { select: { id: true, fullName: true } },
      },
    });

    // Also add lead activity log
    await db.leadActivity.create({
      data: {
        leadId,
        type: 'CALL',
        title: `Outbound Call (${result || 'Connected'})`,
        details: notes || `Call duration: ${duration}s`,
      },
    });

    return NextResponse.json(callRecord, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
