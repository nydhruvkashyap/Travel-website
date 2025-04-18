'use client';

import { useState } from 'react';

export default function TestPage() {
  const [itinerary, setItinerary] = useState('');
  const [status, setStatus] = useState('');

  const handleGeneratePDF = async () => {
    setStatus('⏳ Generating PDF...');
    try {
      const res = await fetch('/api/test-send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: itinerary }),
      });

      if (!res.ok) throw new Error('PDF generation failed');

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = 'Mythara_Itinerary.pdf';
      document.body.appendChild(link);
      link.click();
      link.remove();

      setStatus('✅ PDF downloaded!');
    } catch (err) {
      console.error(err);
      setStatus('❌ Failed to generate PDF.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-900">Test PDF Generator</h1>
        <textarea
          value={itinerary}
          onChange={(e) => setItinerary(e.target.value)}
          placeholder="Paste your itinerary text here..."
          className="w-full h-72 p-4 border rounded-md text-sm font-mono"
        />
        <button
          onClick={handleGeneratePDF}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Generate & Download PDF
        </button>
        {status && <p className="mt-2 text-sm text-gray-600">{status}</p>}
      </div>
    </div>
  );
}
