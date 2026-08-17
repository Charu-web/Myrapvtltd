import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { uploadDocumentToS3 } from '@/lib/storage';

export async function GET() {
  try {
    const documents = await db.document.findMany({
      include: {
        lead: { select: { customerName: true, leadId: true } },
        application: { select: { applicationNumber: true } },
      },
      orderBy: { uploadedAt: 'desc' },
    });
    return NextResponse.json(documents);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, type, leadId, applicationId } = body;

    const org = await db.organization.findFirst();
    if (!org) return NextResponse.json({ error: 'Organization not found' }, { status: 400 });

    const s3Result = await uploadDocumentToS3(name, Buffer.from('demo'), 'application/pdf');

    const doc = await db.document.create({
      data: {
        organizationId: org.id,
        name,
        type: type || 'KYC',
        fileUrl: s3Result.fileUrl,
        fileSize: '1.4 MB',
        status: 'Verified',
        leadId: leadId || null,
        applicationId: applicationId || null,
      },
    });

    return NextResponse.json(doc, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
