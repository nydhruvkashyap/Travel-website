// app/api/sendEmail/route.ts

export const config = {
  runtime: 'nodejs',
};

import { NextRequest, NextResponse } from 'next/server';
//import { createPromptFromSurvey, SurveyData } from '@/lib/createPromptFromSurvey'; // ❌ unused, commented below
import { generatePDF } from '@/lib/generatePDF';
import { sendEmailWithPDF } from '@/lib/sendEmailWithPDF';
// import OpenAI from 'openai'; // ❌ unused

// const ai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY }); // ❌ GPT disabled for test

export async function POST(req: NextRequest) {
  try {
    const { email /* , surveyAnswers: raw */ } = (await req.json()) as {
      email?: string;
      surveyAnswers?: SurveyData; // ❌ surveyAnswers not used in test mode
    };

    if (!email) {
      console.error('❌ Missing email from request');
      return NextResponse.json({ error: 'Missing email' }, { status: 400 });
    }

    console.log('📬 Received email request for:', email);

    // ✅ TEST-ONLY: STATIC ITINERARY TEXT (no GPT call)
    const sampleItinerary = `
DAY 1: Arrival in Delhi
- Arrive at Indira Gandhi International Airport
- Visit India Gate and Connaught Place
- Try local cuisine at Karim’s

DAY 2: Agra Day Trip
- Drive to Agra
- Visit the Taj Mahal and Agra Fort
- Return to Delhi by evening

DAY 3: Jaipur – The Pink City
- Travel to Jaipur by morning train
- Explore Hawa Mahal and Jantar Mantar
- Dinner at Chokhi Dhani

DAY 4: Rishikesh Spiritual Retreat
- Drive to Rishikesh
- Attend Ganga Aarti at Triveni Ghat
- Overnight at a riverside wellness retreat

DAY 5: Yoga & Departure
- Morning yoga session
- Return to Delhi
- Flight back home
`;

    console.log('🧾 Generating PDF...');
    const pdfBytes = await generatePDF(sampleItinerary);
    const pdfBuffer = Buffer.from(pdfBytes);
    console.log('📄 PDF generated. Size:', pdfBuffer.length);

    console.log('📧 Sending email to:', email);
    await sendEmailWithPDF(email, pdfBuffer);
    console.log('✅ Email sent successfully');

    return NextResponse.json({ message: '✅ Test email sent with static itinerary PDF' });

    // 🧠 GPT MODE (commented out during testing)
    /*
    if (!raw) {
      return NextResponse.json({ error: 'Missing survey data' }, { status: 400 });
    }

    const prompt = createPromptFromSurvey(typeof raw === 'string' ? JSON.parse(raw) : raw);
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
    */
  } catch (err: unknown) {
    console.error('❌ sendEmail error:', err);
    const errorMessage =
      typeof err === 'object' && err !== null && 'message' in err
        ? (err as { message?: string }).message || 'Internal error'
        : 'Internal error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
