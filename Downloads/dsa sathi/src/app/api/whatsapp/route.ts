import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const messages = await db.message.findMany({
      include: {
        lead: { select: { customerName: true, phone: true } },
        sender: { select: { fullName: true } },
      },
      orderBy: { sentAt: 'desc' },
    });

    const templates = [
      { id: '1', title: 'Document Request', code: 'DOC_REQ', content: 'Hi {{name}}, please share 6 months bank statement and PAN copy for loan processing.' },
      { id: '2', title: 'Sanction Congratulations', code: 'SANCTION_ALERT', content: 'Congrats {{name}}! Your loan of {{amount}} from {{bank}} has been sanctioned!' },
      { id: '3', title: 'Follow-up Reminder', code: 'FOLLOWUP', content: 'Hi {{name}}, checking in regarding your home loan inquiry with LoanPilot.' },
    ];

    return NextResponse.json({ messages, templates });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
