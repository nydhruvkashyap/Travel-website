export const config = {
  runtime: 'nodejs',
};

import { NextRequest, NextResponse } from 'next/server';
import { createPromptFromSurvey, SurveyData } from '@/lib/createPromptFromSurvey';
import OpenAI from 'openai';
import { generatePDF } from '@/lib/generatePDF';
import { sendEmailWithPDF } from '@/lib/sendEmailWithPDF';

const ai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: NextRequest) {
  try {
    const { email, surveyAnswers: raw } = (await req.json()) as {
      email?: string;
      surveyAnswers?: SurveyData;
    };

    if (!email || !raw) {
      console.error('❌ Missing email or surveyAnswers');
      return NextResponse.json({ error: 'Missing email or surveyAnswers' }, { status: 400 });
    }

    console.log('📬 Received email request for:', email);

    const prompt = createPromptFromSurvey(
      typeof raw === 'string' ? JSON.parse(raw) : raw
    );

    console.log('⚙️ Sending prompt to GPT-4');
    const resp = await ai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 2000,
      temperature: 0.7,
    });

    if (!resp.choices?.length) throw new Error('No GPT response');
    const gptText = resp.choices[0].message.content!;
    console.log('🧾 GPT Response Length:', gptText.length);

    const pdfBytes = await generatePDF(gptText);
    const pdfBuffer = Buffer.from(pdfBytes);
    console.log('📄 PDF generated. Size:', pdfBuffer.length);

    await sendEmailWithPDF(email, pdfBuffer);
    console.log('✅ Email sent successfully');

    return NextResponse.json({ message: '✅ Email sent with GPT-generated itinerary PDF' });
  } catch (err: unknown) {
    console.error('❌ sendEmail error:', err);
    const errorMessage =
      typeof err === 'object' && err !== null && 'message' in err
        ? (err as { message?: string }).message || 'Internal error'
        : 'Internal error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
