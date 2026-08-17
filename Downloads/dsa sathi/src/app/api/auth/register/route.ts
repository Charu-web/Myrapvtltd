import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { signToken } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { companyName, legalName, fullName, email, phone, password } = await req.json();

    if (!companyName || !fullName || !email || !password) {
      return NextResponse.json({ error: 'All required fields must be filled' }, { status: 400 });
    }

    const existingUser = await db.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 });
    }

    const orgCode = `ORG-${Date.now().toString().slice(-6)}`;
    const organization = await db.organization.create({
      data: {
        name: companyName,
        code: orgCode,
        legalName: legalName || companyName,
        email: email.toLowerCase(),
        phone: phone || '+91 98765 43210',
      },
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        organizationId: organization.id,
        email: email.toLowerCase(),
        password: hashedPassword,
        fullName,
        phone: phone || '+91 98765 43210',
        role: 'ADMIN',
      },
    });

    const token = signToken({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      organizationId: organization.id,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        organizationName: organization.name,
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
    return NextResponse.json({ error: error.message || 'Registration failed' }, { status: 500 });
  }
}
