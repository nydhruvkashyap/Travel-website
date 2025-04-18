'use client';

import { useEffect, useState, useRef } from 'react';
import { createPromptFromSurvey, SurveyData } from '@/lib/createPromptFromSurvey';
import { generateGPTResponse } from '@/lib/generateGPTResponse';
import { generatePDF } from '@/lib/generatePDF';

export default function SurveyComplete() {
  const [message, setMessage] = useState<string>('Generating your itinerary...');
  const [userEmail, setUserEmail] = useState<string>('');
  const hasRunRef = useRef(false);

  useEffect(() => {
    if (hasRunRef.current) return;
    hasRunRef.current = true;

    const surveyAnswersRaw = localStorage.getItem('surveyAnswers');
    const emailFromStorage = localStorage.getItem('userEmail');

    if (!surveyAnswersRaw || !emailFromStorage) {
      setMessage("Missing survey or email data.");
      return;
    }

    const surveyAnswers: SurveyData = JSON.parse(surveyAnswersRaw);
    const promptOutput = createPromptFromSurvey(surveyAnswers);
    setUserEmail(emailFromStorage);

    async function generateItineraryAndSend() {
      try {
        const gptResponse = await generateGPTResponse(promptOutput);
        if (!gptResponse || typeof gptResponse !== 'string') {
          throw new Error("Invalid GPT response format.");
        }

        const pdfBlob = await generatePDF(gptResponse);
        const pdfBase64 = Buffer.from(pdfBlob).toString('base64');

        const emailResponse = await fetch('/api/sendEmail', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: emailFromStorage, pdfBase64 }),
        });

        const isJson = emailResponse.headers
          .get('content-type')
          ?.includes('application/json');

        if (emailResponse.ok) {
          const result = isJson ? await emailResponse.json() : { message: 'Success' };
          setMessage(`✨ Your personalized itinerary has been emailed to ${emailFromStorage}. Check your inbox for a magical journey ahead.`);
        } else {
          let resultMessage = 'Unknown error';
          if (isJson) {
            try {
              const result = await emailResponse.json();
              resultMessage = result.message || resultMessage;
            } catch {}
          }
          setMessage(`❌ Failed to email itinerary. Reason: ${resultMessage}`);
        }
      } catch (err) {
        console.error('Itinerary generation/email failed:', err);
        setMessage('❌ There was an error generating or sending your itinerary.');
      }
    }

    generateItineraryAndSend();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fafafa] to-[#f0f0f0] flex items-center justify-center px-6 py-12">
      <div className="bg-white shadow-xl rounded-2xl px-8 py-10 max-w-xl text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Just a moment...</h1>
        <p className="text-gray-600 text-lg animate-pulse">
          {message}
        </p>
      </div>
    </div>
  );
}
