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

function timeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('GPT response timed out')), ms);
    promise.then(
      (res) => {
        clearTimeout(timer);
        resolve(res);
      },
      (err) => {
        clearTimeout(timer);
        reject(err);
      }
    );
  });
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
      await sendLiveLog('❌ Missing email or surveyAnswers');
      return NextResponse.json({ error: 'Missing email or surveyAnswers' }, { status: 400 });
    }

    await sendLiveLog(`📬 Received request for: ${email}`);
    const prompt = createPromptFromSurvey(typeof raw === 'string' ? JSON.parse(raw) : raw);
    await sendLiveLog('🧠 GPT Prompt Prepared');
    await sendLiveLog('⚙️ Sending prompt to gpt-3.5-turbo');

    let resp;
    try {
      console.time('⚙️ GPT Generation');
      resp = await timeout(
        ai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 2000,
          temperature: 0.7,
        }),
        25000
      );
      console.timeEnd('⚙️ GPT Generation');
      await sendLiveLog('✅ GPT response received');
    } catch (gptError) {
      const errMsg = '🚨 GPT API call failed or timed out';
      await sendLiveLog(errMsg + ': ' + String(gptError));
      console.error(errMsg, gptError);
      throw new Error('GPT generation failed');
    }

    if (!resp.choices?.length) throw new Error('No GPT response');
    const gptText = resp.choices[0].message.content!;
    await sendLiveLog(`🧾 GPT Output Received. Length: ${gptText.length}`);

    console.time('📄 PDF Generation');
    await sendLiveLog('📄 Calling generatePDF()...');
    const pdfBytes = await generatePDF(gptText);
    const pdfBuffer = Buffer.from(pdfBytes);
    console.timeEnd('📄 PDF Generation');
    await sendLiveLog(`📄 PDF Generated. Size: ${pdfBuffer.length}`);

    console.time('📧 Email Sending');
    await sendLiveLog(`📧 Sending email to: ${email}`);
    await sendEmailWithPDF(email, pdfBuffer);
    console.timeEnd('📧 Email Sending');

    await sendLiveLog('✅ Email sent successfully');
    console.timeEnd('⏱ Total Request Time');
    return NextResponse.json({ message: '✅ Email sent with GPT-generated itinerary PDF' });
  } catch (err: unknown) {
    console.timeEnd('⏱ Total Request Time');
    const errorMessage =
      typeof err === 'object' && err !== null && 'message' in err
        ? (err as { message?: string }).message || 'Internal error'
        : 'Internal error';
    await sendLiveLog('❌ sendEmail error: ' + errorMessage);
    console.error('❌ sendEmail error:', err);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
