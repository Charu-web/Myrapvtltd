import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

const initialSeedNotifications = [
  {
    title: 'Loan Application Sanctioned',
    message: 'Rajesh Kumar\'s HDFC Home Loan application of ₹45,00,000 has been sanctioned.',
    type: 'LOAN_ALERT',
    link: '/applications',
    read: false,
  },
  {
    title: 'New Lead Assigned',
    message: 'Anita Sharma (Business Loan ₹25,00,000) has been assigned to your workspace.',
    type: 'LEAD_UPDATE',
    link: '/leads',
    read: false,
  },
  {
    title: 'Document Verification Required',
    message: 'Customer PAN Card & 6-Month Bank Statements uploaded for Siddharth Varma.',
    type: 'DOCUMENT',
    link: '/documents',
    read: false,
  },
  {
    title: 'Commission Credited',
    message: '₹16,750 commission payout generated for App LP-APP-2026-101 (SBI Home Loan).',
    type: 'COMMISSION',
    link: '/commissions',
    read: false,
  },
  {
    title: 'Bank Rate Revision Alert',
    message: 'ICICI Bank revised Home Loan ROI slabs starting at 8.45% p.a. for CIBIL 750+.',
    type: 'SYSTEM',
    link: '/banks',
    read: false,
  },
  {
    title: 'Task Follow-up Overdue',
    message: 'Urgent: Bank query resolution call pending for Home Loan file LP-APP-2026-088.',
    type: 'LOAN_ALERT',
    link: '/tasks',
    read: true,
  },
  {
    title: 'Sub-DSA Partner Onboarded',
    message: 'New Sub-DSA partner "Capital Prime Advisors" registered under your network.',
    type: 'SYSTEM',
    link: '/partners',
    read: true,
  },
  {
    title: 'Monthly TDS Certificate Ready',
    message: 'Form 16A TDS deduction certificate & GST ledger statement generated for Q2.',
    type: 'COMMISSION',
    link: '/commissions',
    read: true,
  },
];

export async function GET() {
  try {
    const user = await db.user.findFirst();
    if (!user) return NextResponse.json([]);

    let notifications = await db.notification.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    });

    // Auto-seed initial rich notifications if empty
    if (notifications.length === 0) {
      await Promise.all(
        initialSeedNotifications.map((item) =>
          db.notification.create({
            data: {
              userId: user.id,
              title: item.title,
              message: item.message,
              type: item.type,
              link: item.link,
              read: item.read,
            },
          })
        )
      );

      notifications = await db.notification.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' },
      });
    }

    return NextResponse.json(notifications);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch notifications' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const user = await db.user.findFirst();
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    if (body.markAllRead) {
      await db.notification.updateMany({
        where: { userId: user.id, read: false },
        data: { read: true },
      });
      return NextResponse.json({ success: true, message: 'All notifications marked as read' });
    }

    if (body.id) {
      const updated = await db.notification.update({
        where: { id: body.id },
        data: { read: body.read !== undefined ? body.read : true },
      });
      return NextResponse.json(updated);
    }

    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update notification' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Notification ID required' }, { status: 400 });
    }

    await db.notification.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Notification deleted' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to delete notification' }, { status: 500 });
  }
}
