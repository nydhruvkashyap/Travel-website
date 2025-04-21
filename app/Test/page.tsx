// app/Test/page.tsx
'use client';

import { useState } from 'react';

export default function TestPage() {
  const [status, setStatus] = useState<string>('');

  const handleTestSend = async () => {
    setStatus('Sending...');

    const response = await fetch('/api/sendEmail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'nydhruvkashyap@gmail.com', // ✅ Only this is needed
      }),
    });

    const result = await response.json();
    if (response.ok) {
      setStatus('✅ Email sent!');
    } else {
      setStatus(`❌ Failed: ${result?.error || 'Unknown error'}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-bold mb-4">Test PDF + Email Sending</h1>
      <button
        className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
        onClick={handleTestSend}
      >
        Send Test Itinerary
      </button>
      <p className="mt-4 text-gray-700">{status}</p>
    </div>
  );
}
