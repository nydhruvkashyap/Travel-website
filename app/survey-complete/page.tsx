'use client';
import { useEffect, useState, useRef } from 'react';
import type { SurveyData } from '@/lib/createPromptFromSurvey';

export default function SurveyComplete() {
  const [message, setMessage] = useState('Generating your itinerary…');
  const hasRunRef = useRef(false);

  useEffect(() => {
    if (hasRunRef.current) return;
    hasRunRef.current = true;

    const raw = localStorage.getItem('surveyAnswers');
    const email = localStorage.getItem('userEmail');
    if (!raw || !email) {
      setMessage('Missing survey or email data.');
      return;
    }

    let survey: SurveyData;
    try {
      survey = JSON.parse(raw);
    } catch {
      setMessage('Invalid survey data.');
      return;
    }

    async function sendItinerary() {
      try {
        const res = await fetch('/api/sendEmail', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, surveyAnswers: survey }),
        });
        const body = await res.json();
        if (res.ok) {
          setMessage(`✨ Itinerary emailed to ${email}. Check your inbox!`);
        } else {
          setMessage(`❌ ${body.error}`);
        }
      } catch {
        setMessage('❌ Error sending itinerary.');
      }
    }

    sendItinerary();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-8 bg-white rounded-xl shadow">
        <h1 className="text-2xl mb-4">Just a moment…</h1>
        <p>{message}</p>
      </div>
    </div>
  );
}
