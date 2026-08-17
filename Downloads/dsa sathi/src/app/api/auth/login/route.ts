import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { signToken } from '@/lib/auth';

const DEMO_USERS: Record<string, { fullName: string; role: string; phone: string }> = {
  'admin@loanpilot.in': { fullName: 'Vikramaditya (Admin)', role: 'ADMIN', phone: '+919876543210' },
  'agent@loanpilot.in': { fullName: 'Rajesh Sharma (Sales)', role: 'SALES_AGENT', phone: '+919876543211' },
  'ops@loanpilot.in': { fullName: 'Priya Verma (Operations)', role: 'OPERATIONS', phone: '+919876543212' },
  'finance@loanpilot.in': { fullName: 'Amitabh Patel (Finance)', role: 'FINANCE', phone: '+919876543213' },
  'hr@loanpilot.in': { fullName: 'Sunita Rao (HR)', role: 'HR', phone: '+919876543214' },
  'partner@loanpilot.in': { fullName: 'Kapil Financial Sub-DSA', role: 'PARTNER', phone: '+919876543215' },
};

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Please enter your email or mobile number and password.' }, { status: 400 });
    }

    const inputLower = email.trim().toLowerCase();

    // Lookup user by email OR phone
    let user = await db.user.findFirst({
      where: {
        OR: [
          { email: inputLower },
          { phone: inputLower },
          { phone: email.trim() },
        ],
      },
      include: { organization: true },
    });

    // Auto-seed demo users if logging in as demo email and user doesn't exist yet
    if (!user && DEMO_USERS[inputLower]) {
      let org = await db.organization.findFirst();
      if (!org) {
        org = await db.organization.create({
          data: {
            name: 'LoanPilot India DSA Ltd',
            code: 'LP-DSA-001',
            email: 'support@loanpilot.in',
            phone: '+919876543210',
          },
        });
      }

      const demo = DEMO_USERS[inputLower];
      const hashedPassword = await bcrypt.hash(password || 'password123', 10);

      user = await db.user.create({
        data: {
          organizationId: org.id,
          email: inputLower,
          password: hashedPassword,
          fullName: demo.fullName,
          phone: demo.phone,
          role: demo.role,
          isActive: true,
        },
        include: { organization: true },
      });
    }

    if (!user || !user.isActive) {
      return NextResponse.json({ error: 'Invalid email/mobile or password.' }, { status: 401 });
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return NextResponse.json({ error: 'Invalid email/mobile or password.' }, { status: 401 });
    }

    const token = signToken({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      organizationId: user.organizationId,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        organizationName: user.organization?.name || 'LoanPilot DSA',
      },
    });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
