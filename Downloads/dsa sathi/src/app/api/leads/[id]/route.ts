import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const lead = await db.lead.findUnique({
      where: { id },
      include: {
        assignedTo: { select: { id: true, fullName: true, role: true, phone: true } },
        activities: { orderBy: { createdAt: 'desc' } },
        applications: { include: { bank: true } },
        documents: true,
        tasks: true,
        calls: true,
        messages: true,
      },
    });

    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    return NextResponse.json(lead);
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

    const existingLead = await db.lead.findUnique({ where: { id } });
    if (!existingLead) return NextResponse.json({ error: 'Lead not found' }, { status: 404 });

    const updatedLead = await db.lead.update({
      where: { id },
      data: body,
    });

    if (body.status && body.status !== existingLead.status) {
      await db.leadActivity.create({
        data: {
          leadId: id,
          type: 'STATUS_CHANGE',
          title: `Status changed to ${body.status}`,
          details: `Lead status updated from ${existingLead.status} to ${body.status}`,
        },
      });
    }

    return NextResponse.json(updatedLead);
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
    await db.lead.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
