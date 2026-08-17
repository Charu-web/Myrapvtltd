import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      // Fallback to first organization for public view if unauthenticated
      const org = await db.organization.findFirst({
        include: { users: true },
      });
      return NextResponse.json(org);
    }

    const org = await db.organization.findUnique({
      where: { id: user.organizationId },
      include: { users: true },
    });

    return NextResponse.json(org);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized session' }, { status: 401 });
    }

    const body = await req.json();
    const { name, legalName, email, phone } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Organization name, work email, and phone number are required.' },
        { status: 400 }
      );
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    const updatedOrg = await db.organization.update({
      where: { id: currentUser.organizationId },
      data: {
        name: name.trim(),
        legalName: legalName ? legalName.trim() : null,
        email: email.trim(),
        phone: phone.trim(),
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Organization settings saved successfully.',
      organization: updatedOrg,
    });
  } catch (error: any) {
    console.error('Settings Update Error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
