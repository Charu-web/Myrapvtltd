import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const app = await db.loanApplication.findUnique({
      where: { id },
      include: {
        lead: { include: { documents: true, activities: true } },
        bank: true,
        assignedEmployee: true,
        partner: true,
        documents: true,
        commissions: true,
        tasks: true,
      },
    });

    if (!app) return NextResponse.json({ error: 'Application not found' }, { status: 404 });

    return NextResponse.json(app);
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

    const updatedApp = await db.loanApplication.update({
      where: { id },
      data: body,
    });

    // If status updated to Disbursed, also update lead and generate commission entry if missing
    if (body.status === 'Disbursed') {
      await db.lead.update({
        where: { id: updatedApp.leadId },
        data: { status: 'Disbursed' },
      });

      const existingComm = await db.commission.findFirst({ where: { applicationId: id } });
      if (!existingComm) {
        const payInPct = 1.5;
        const totalPayIn = (updatedApp.amount * payInPct) / 100;
        const partnerPayout = (totalPayIn * 70) / 100;
        const gstAmount = totalPayIn * 0.18;
        const tdsAmount = totalPayIn * 0.05;
        const netPayout = totalPayIn - tdsAmount;

        await db.commission.create({
          data: {
            applicationId: id,
            leadId: updatedApp.leadId,
            disbursedAmount: updatedApp.amount,
            payInPercent: payInPct,
            totalPayIn,
            partnerPayout,
            employeeIncentive: totalPayIn * 0.05,
            gstAmount,
            tdsAmount,
            netPayout,
            status: 'Approved',
          },
        });
      }
    }

    return NextResponse.json(updatedApp);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
