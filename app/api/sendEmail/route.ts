export const config = {
  runtime: 'nodejs',
};

import { NextRequest, NextResponse } from 'next/server';
import { createPromptFromSurvey, SurveyData } from '@/lib/createPromptFromSurvey';
import OpenAI from 'openai';
import { generatePDF } from '@/lib/generatePDF';
import { sendEmailWithPDF } from '@/lib/sendEmailWithPDF';

const ai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

async function sendLiveLog(message: string) {
  try {
    await fetch(process.env.LOG_WEBHOOK!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, timestamp: new Date().toISOString() }),
    });
  } catch (e) {
    console.error('⚠️ Failed to send live log:', e);
  }
}

export async function POST(req: NextRequest) {
  console.time('⏱ Total Request Time');
  await sendLiveLog('🚀 POST /api/sendEmail triggered');
  try {
    const { email, surveyAnswers: raw } = (await req.json()) as {
      email?: string;
      surveyAnswers?: SurveyData;
    };

    if (!email || !raw) {
      const msg = '❌ Missing email or surveyAnswers';
      console.error(msg);
      await sendLiveLog(msg);
      return NextResponse.json({ error: msg }, { status: 400 });
    }

    console.log('📬 Received email request for:', email);
    await sendLiveLog(`📬 Received request for: ${email}`);

    const prompt = createPromptFromSurvey(
      typeof raw === 'string' ? JSON.parse(raw) : raw
    );

    await sendLiveLog('🧠 GPT Prompt Prepared');
    console.log('🧠 GPT Prompt Preview:', prompt.slice(0, 500));

    let resp;
    try {
      console.time('⚙️ GPT Generation');
      await sendLiveLog('⚙️ Sending prompt to GPT-4');
      resp = await ai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 2000,
        temperature: 0.7,
      });
      console.timeEnd('⚙️ GPT Generation');
      await sendLiveLog('✅ GPT response received');
    } catch (gptError) {
      const errMsg = '🚨 GPT API call failed';
      console.error(errMsg, gptError);
      await sendLiveLog(errMsg + ': ' + String(gptError));
      throw new Error('GPT generation failed');
    }

    if (!resp.choices?.length) throw new Error('No GPT response');
    const gptText = resp.choices[0].message.content!;
    console.log('📄 GPT Response Preview:', gptText.slice(0, 300));

    console.time('📄 PDF Generation');
    await sendLiveLog('📄 Starting PDF generation');
    const pdfBytes = await generatePDF(gptText);
    const pdfBuffer = Buffer.from(pdfBytes);
    console.log('📄 PDF generated. Size:', pdfBuffer.length);
    console.timeEnd('📄 PDF Generation');
    await sendLiveLog('✅ PDF generated');

    console.time('📧 Email Sending');
    await sendLiveLog('📧 Sending email with PDF');
    await sendEmailWithPDF(email, pdfBuffer);
    console.timeEnd('📧 Email Sending');
    await sendLiveLog('✅ Email sent');

    console.timeEnd('⏱ Total Request Time');
    await sendLiveLog('✅ Flow completed successfully');

    return NextResponse.json({ message: '✅ Email sent with GPT-generated itinerary PDF' });
  } catch (err: unknown) {
    console.timeEnd('⏱ Total Request Time');
    const errorMessage =
      typeof err === 'object' && err !== null && 'message' in err
        ? (err as { message?: string }).message || 'Internal error'
        : 'Internal error';
    console.error('❌ sendEmail error:', err);
    await sendLiveLog('❌ sendEmail error: ' + String(err));
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
