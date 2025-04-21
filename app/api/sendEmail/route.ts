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
  console.time('⏱ Total Request Time');
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

    console.log('🧠 GPT Prompt Preview:', prompt.slice(0, 500));
    console.log('🧠 Prompt Length:', prompt.length);

    let resp;
    try {
      console.time('⚙️ GPT Generation');
      resp = await ai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 2000,
        temperature: 0.7,
      });
      console.timeEnd('⚙️ GPT Generation');
    } catch (gptError) {
      console.error('🚨 GPT API call failed:', gptError);
      throw new Error('GPT generation failed');
    }

    if (!resp.choices?.length) throw new Error('No GPT response');
    const gptText = resp.choices[0].message.content!;
    console.log('🧾 GPT Response Length:', gptText.length);
    console.log('📄 GPT Response Preview:', gptText.slice(0, 300));

    console.time('📄 PDF Generation');
    console.log('🧪 Passing GPT text to generatePDF:', gptText.slice(0, 200));
    const pdfBytes = await generatePDF(gptText);
    const pdfBuffer = Buffer.from(pdfBytes);
    console.log('📄 PDF generated. Size:', pdfBuffer.length);
    console.timeEnd('📄 PDF Generation');

    console.time('📧 Email Sending');
    await sendEmailWithPDF(email, pdfBuffer);
    console.timeEnd('📧 Email Sending');

    console.log('✅ Email sent successfully');
    console.timeEnd('⏱ Total Request Time');

    return NextResponse.json({ message: '✅ Email sent with GPT-generated itinerary PDF' });
  } catch (err: unknown) {
    console.timeEnd('⏱ Total Request Time');
    console.error('❌ sendEmail error:', err);
    const errorMessage =
      typeof err === 'object' && err !== null && 'message' in err
        ? (err as { message?: string }).message || 'Internal error'
        : 'Internal error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
