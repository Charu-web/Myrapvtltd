import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const tasks = await db.task.findMany({
      include: {
        assignedTo: { select: { fullName: true } },
        lead: { select: { customerName: true, leadId: true } },
      },
      orderBy: { dueDate: 'asc' },
    });
    return NextResponse.json(tasks);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const org = await db.organization.findFirst();
    const user = await db.user.findFirst();
    if (!org || !user) return NextResponse.json({ error: 'Org/User missing' }, { status: 400 });

    const task = await db.task.create({
      data: {
        organizationId: org.id,
        title: body.title,
        description: body.description || null,
        priority: body.priority || 'Medium',
        status: 'Pending',
        dueDate: new Date(body.dueDate || Date.now() + 86400000),
        assignedToId: user.id,
        leadId: body.leadId || null,
      },
    });

    return NextResponse.json(task, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
