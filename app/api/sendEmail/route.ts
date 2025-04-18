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
  } catch (err: unknown) {
    console.error('❌ Error in /api/sendEmail:', err);

    let errorMessage = 'Email failed.';
    if (err && typeof err === 'object' && 'message' in err) {
      errorMessage = (err as { message?: string }).message || errorMessage;
    }

    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
