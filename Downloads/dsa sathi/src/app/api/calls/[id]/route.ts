import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const callRecord = await db.call.findUnique({
      where: { id },
      include: {
        lead: { select: { id: true, customerName: true, phone: true, leadId: true } },
        caller: { select: { id: true, fullName: true } },
      },
    });

    if (!callRecord) return NextResponse.json({ error: 'Call record not found' }, { status: 404 });

    return NextResponse.json(callRecord);
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

    const updatedCall = await db.call.update({
      where: { id },
      data: {
        ...(body.result !== undefined && { result: body.result }),
        ...(body.notes !== undefined && { notes: body.notes }),
        ...(body.duration !== undefined && { duration: parseInt(body.duration) }),
      },
    });

    return NextResponse.json(updatedCall);
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
    await db.call.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
