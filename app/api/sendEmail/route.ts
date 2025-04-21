// app/api/sendEmail/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createPromptFromSurvey, SurveyData } from '@/lib/createPromptFromSurvey';
import OpenAI from 'openai';
import { generatePDF } from '@/lib/generatePDF';
import { sendEmailWithPDF } from '@/lib/sendEmailWithPDF';

// deploy as Node.js lambda (60s limit)
export const config = { runtime: 'nodejs', regions: ['iad1'] };

// initialize once outside handler
const ai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    // 1) Parse & type the body
    const body = (await req.json()) as {
      email?: string;
      surveyAnswers?: string | SurveyData;
    };
    const { email, surveyAnswers: surveyRaw } = body;

    // 2) Guard against missing or invalid data
    if (!email || !surveyRaw) {
      return NextResponse.json(
        { error: 'Missing email or survey data' },
        { status: 400 }
      );
    }

    // TS now knows `email` is a string
    // 3) Parse surveyAnswers if it arrived as JSON string
    const surveyData: SurveyData =
      typeof surveyRaw === 'string'
        ? JSON.parse(surveyRaw)
        : surveyRaw;

    // 4) Build the prompt
    const prompt = createPromptFromSurvey(surveyData);

    // 5) Call OpenAI (Node.js runtime = 60s)
    const resp = await ai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 2000,
      temperature: 0.7,
    });
    if (!resp.choices?.length) {
      throw new Error('OpenAI returned no choices');
    }
    const gptText = resp.choices[0].message.content;

    // 6) Generate the PDF
    const pdfBytes = await generatePDF(gptText!);
    const pdfBuffer = Buffer.from(pdfBytes);

    // 7) Email the PDF
    await sendEmailWithPDF(email, pdfBuffer);

    // 8) Success
    return NextResponse.json({ message: 'Email sent successfully!' });
  } catch (err: any) {
    console.error('❌ sendEmail error:', err);
    return NextResponse.json(
      { error: err.message || 'Internal error' },
      { status: 500 }
    );
  }
}
