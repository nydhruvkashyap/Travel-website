'use client';

import { useEffect, useState, useRef } from 'react';
import { createPromptFromSurvey, SurveyData } from '@/lib/createPromptFromSurvey';
import { generateGPTResponse } from '@/lib/generateGPTResponse';
import { generatePDF } from '@/lib/generatePDF';

export default function SurveyComplete() {
  const [message, setMessage] = useState<string>('Generating your itinerary...');
  const hasRunRef = useRef(false);

  useEffect(() => {
    if (hasRunRef.current) return;
    hasRunRef.current = true;

    const surveyAnswersRaw = localStorage.getItem('surveyAnswers');
    const emailFromStorage = localStorage.getItem('userEmail');

    console.log('📦 surveyAnswersRaw:', surveyAnswersRaw);
    console.log('📦 emailFromStorage:', emailFromStorage);

    if (!surveyAnswersRaw || !emailFromStorage) {
      setMessage("Missing survey or email data.");
      return;
    }

    const surveyAnswers: SurveyData = JSON.parse(surveyAnswersRaw);
    const promptOutput = createPromptFromSurvey(surveyAnswers);

    async function generateItineraryAndSend() {
      try {
        console.log("⚙️ Generating GPT response...");
        const gptResponse = await generateGPTResponse(promptOutput);

        if (!gptResponse || typeof gptResponse !== 'string') {
          throw new Error("Invalid GPT response format.");
        }

        console.log("🧾 GPT response snippet:", gptResponse.slice(0, 100));
        console.log("⚙️ Generating PDF...");
        const pdfBlob = await generatePDF(gptResponse);

        console.log("📄 PDF Blob Type:", typeof pdfBlob);
        console.log("📄 PDF Blob Length:", pdfBlob?.length);

        const pdfBase64 = btoa(String.fromCharCode(...new Uint8Array(pdfBlob)));

        console.log("📬 Sending PDF to:", emailFromStorage);
        console.log("📄 Base64 Length:", pdfBase64.length);

        const emailResponse = await fetch('/api/sendEmail', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: emailFromStorage, pdfBase64 }),
        });

        console.log("📩 Email response status:", emailResponse.status);

        const isJson = emailResponse.headers
          .get('content-type')
          ?.includes('application/json');

        const rawText = await emailResponse.text();
        console.log("📩 Email response body:", rawText);

        if (emailResponse.ok) {
          if (isJson) JSON.parse(rawText); // optional read
          setMessage(`✨ Your personalized itinerary has been emailed to ${emailFromStorage}. Check your inbox for a magical journey ahead.`);
        } else {
          let resultMessage = 'Unknown error';
          if (isJson) {
            try {
              const { message } = JSON.parse(rawText);
              resultMessage = message || resultMessage;
            } catch {}
          }
          setMessage(`❌ Failed to email itinerary. Reason: ${resultMessage}`);
        }
      } catch (err) {
        console.error('❌ Itinerary generation/email failed:', err);
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
