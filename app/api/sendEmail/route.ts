// Force this API to run on Node.js (60 sec timeout), not Edge (10 sec)
export const config = {
  runtime: 'nodejs',
  regions: ['iad1'],  // optional, pin to your region
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
      surveyAnswers?: SurveyData;
    };
    if (!email || !raw) {
      return NextResponse.json({ error: 'Missing data' }, { status: 400 });
    }
    const prompt = createPromptFromSurvey(
      typeof raw === 'string' ? JSON.parse(raw) : raw
    );
    const resp = await ai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 2000,
      temperature: 0.7,
    });
    if (!resp.choices?.length) throw new Error('No GPT response');
    const text = resp.choices[0].message.content!;
    const pdfBytes = await generatePDF(text);
    const pdfBuffer = Buffer.from(pdfBytes);
    await sendEmailWithPDF(email, pdfBuffer);
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
