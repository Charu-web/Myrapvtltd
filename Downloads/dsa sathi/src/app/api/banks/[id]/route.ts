import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const bank = await db.bank.findUnique({
      where: { id },
      include: {
        applications: { include: { lead: true } },
        schemes: true,
      },
    });

    if (!bank) return NextResponse.json({ error: 'Bank not found' }, { status: 404 });

    return NextResponse.json(bank);
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

    const existingBank = await db.bank.findUnique({ where: { id } });
    if (!existingBank) return NextResponse.json({ error: 'Bank not found' }, { status: 404 });

    const updatedBank = await db.bank.update({
      where: { id },
      data: {
        ...(body.name !== undefined && { name: body.name }),
        ...(body.code !== undefined && { code: body.code }),
        ...(body.active !== undefined && { active: body.active }),
        ...(body.minROI !== undefined && { minROI: parseFloat(body.minROI) }),
        ...(body.maxROI !== undefined && { maxROI: parseFloat(body.maxROI) }),
        ...(body.processingFee !== undefined && { processingFee: body.processingFee }),
        ...(body.averageTAT !== undefined && { averageTAT: parseInt(body.averageTAT) }),
        ...(body.rmName !== undefined && { rmName: body.rmName }),
        ...(body.rmPhone !== undefined && { rmPhone: body.rmPhone }),
        ...(body.rmEmail !== undefined && { rmEmail: body.rmEmail }),
      },
    });

    return NextResponse.json(updatedBank);
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
    await db.bank.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
