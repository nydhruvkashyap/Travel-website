// app/api/openai/route.ts
import { NextRequest, NextResponse } from 'next/server';

export const config = {
  runtime: 'nodejs',      // bump to Node.js lambda (60 s)
  regions: ['iad1'],      // optional: choose your nearest
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!Array.isArray(body.messages)) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: body.messages,
        max_tokens: 2000,
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('❌ OpenAI error:', res.status, err);
      return NextResponse.json({ error: `OpenAI returned ${res.status}` }, { status: 502 });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error('❌ /api/openai error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
