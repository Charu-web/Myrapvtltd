import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const user = await db.user.findFirst();
    const org = await db.organization.findFirst();

    if (!user || !org) return NextResponse.json([]);

    let employees = await db.employee.findMany({
      include: {
        user: { select: { fullName: true, email: true, phone: true, role: true } },
        attendances: true,
        leaves: true,
      },
    });

    if (employees.length === 0) {
      await db.employee.create({
        data: {
          organizationId: org.id,
          empCode: 'EMP-101',
          userId: user.id,
          department: 'Sales',
          designation: 'Senior Loan Specialist',
          salary: 55000,
          targetAmount: 5000000,
          achievedAmount: 3800000,
        },
      });

      employees = await db.employee.findMany({
        include: {
          user: { select: { fullName: true, email: true, phone: true, role: true } },
          attendances: true,
          leaves: true,
        },
      });
    }

    return NextResponse.json(employees);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch HR data' }, { status: 500 });
  }
}
