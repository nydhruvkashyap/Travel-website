import { NextRequest } from 'next/server';
import { generatePDF } from '@/lib/generatePDF';

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();
    console.log('📥 Received text input:', text);

    if (!text || typeof text !== 'string') {
      console.log('⚠️ Invalid input:', text);
      return new Response(JSON.stringify({ error: 'Invalid input' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const pdfBytes = await generatePDF(text);

    if (!pdfBytes || !(pdfBytes instanceof Uint8Array)) {
      console.error('❌ Invalid PDF output');
      return new Response(JSON.stringify({ error: 'PDF generation failed' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Convert to Node.js Buffer for compatibility with Content-Length
    const buffer = Buffer.from(pdfBytes);
    console.log('📄 PDF generated, byte length:', buffer.length);

    return new Response(buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Mythara_Itinerary.pdf"',
        'Content-Length': buffer.length.toString(),
      },
    });
  } catch (err: any) {
    console.error('❌ PDF generation failed:', err);
    return new Response(JSON.stringify({ error: 'PDF generation failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
