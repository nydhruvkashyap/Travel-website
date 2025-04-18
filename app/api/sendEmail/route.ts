import { NextResponse } from 'next/server';
import { sendEmailWithPDF } from '@/lib/sendEmailWithPDF';

export async function POST(req: Request) {
  try {
    const { email, pdfBase64 } = await req.json();

    if (!email || !pdfBase64) {
      return NextResponse.json({ message: 'Email and PDF are required.' }, { status: 400 });
    }

    const pdfBuffer = Buffer.from(pdfBase64, 'base64');
    await sendEmailWithPDF(email, pdfBuffer);

    return NextResponse.json({ message: 'Email sent successfully!' });
  } catch (err: any) {
    console.error('❌ Error in /api/sendEmail:', err);
    return NextResponse.json({ message: err.message || 'Email failed.' }, { status: 500 });
  }
}
