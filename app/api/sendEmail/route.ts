// app/api/sendEmail/route.ts

export const config = {
  runtime: 'nodejs',
  regions: ['iad1'],
};

import { NextRequest, NextResponse } from 'next/server';
import { createPromptFromSurvey, SurveyData } from '@/lib/createPromptFromSurvey';
import OpenAI from 'openai';
import { generatePDF } from '@/lib/generatePDF';
import { sendEmailWithPDF } from '@/lib/sendEmailWithPDF';

const ai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { email, surveyAnswers: raw } = (await req.json()) as {
      email?: string;
      surveyAnswers?: SurveyData | string;
    };

    console.log('✅ Incoming request');
    console.log('📧 Email:', email);
    console.log('📊 Raw surveyAnswers:', typeof raw === 'string' ? raw.slice(0, 200) : JSON.stringify(raw).slice(0, 200));

    if (!email || !raw) {
      console.error('❌ Missing email or surveyAnswers');
      return NextResponse.json({ error: 'Missing data' }, { status: 400 });
    }

    const surveyObj: SurveyData = typeof raw === 'string' ? JSON.parse(raw) : raw;
    const prompt = createPromptFromSurvey(surveyObj);

    console.log('🧠 Prompt snippet:', prompt.slice(0, 200));
    console.log('🧠 Prompt length:', prompt.length);

    const resp = await ai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 2000,
      temperature: 0.7,
    });

    if (!resp.choices?.length) {
      console.error('❌ No GPT response received');
      throw new Error('No GPT response');
    }

    const gptText = resp.choices[0].message.content;
    console.log('📨 GPT response received');

    const pdfBytes = await generatePDF(gptText || '');
    console.log('📄 PDF generated, size:', pdfBytes.length);

    const pdfBuffer = Buffer.from(pdfBytes);
    await sendEmailWithPDF(email, pdfBuffer);
    console.log('📬 Email sent to:', email);

    return NextResponse.json({ message: 'Email sent!' });
  } catch (err: unknown) {
    console.error('❌ sendEmail error:', err);
    let errorMessage = 'Internal error';
    if (typeof err === 'object' && err !== null && 'message' in err) {
      errorMessage = (err as { message?: string }).message ?? errorMessage;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
