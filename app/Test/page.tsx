'use client';

import { useState } from 'react';

const testSurveyAnswers = {
  country: "USA",
  group: "Partner",
  groupSize: "2",
  style: "Curious Explorer",
  budgetType: "per person",
  budgetAmount: "1500 USD",
  focusNote: "",
  travelDate: "15th June",
  knowsTravelDate: "Yes",
  duration: "9",
  topSegments: ["cultural", "culinary", "spiritual"],
  weatherNote: "",
  subPrefs: {
    cultural: [
      "Walk through ancient forts and palaces",
      "Visit ancient ruins and UNESCO sites",
      "Explore traditional art forms like dance and theatre",
      "Join a local heritage walking tour",
      "Discover artisan villages and local crafts"
    ],
    culinary: [
      "Try famous street food like pani puri, kebabs, and biryani",
      "Visit tea estates or coffee plantations and taste fresh brews",
      "Sample wines or craft beers at vineyards and microbreweries",
      "Join a regional food trail or traditional thali experience",
      "Learn to cook Indian dishes in a home-style setting"
    ],
    spiritual: [
      "Join a yoga or meditation retreat in nature",
      "Attend a sacred river ceremony (like the Ganga aarti)",
      "Visit monasteries or spiritual communities",
      "Explore India’s famous temples and pilgrimage routes",
      "Experience healing traditions like Ayurveda or sound therapy"
    ]
  },
  notes: ""
};

export default function TestPage() {
  const [status, setStatus] = useState('Idle');

  const runTest = async () => {
    setStatus('Sending...');

    try {
      const res = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'nydhruvkashyap@gmail.com',
          surveyAnswers: testSurveyAnswers,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus(`✅ Success: ${data.message}`);
      } else {
        setStatus(`❌ Failed: ${data.error || 'Unknown error'}`);
        console.error('❌ Backend Error:', data);
      }
    } catch (err) {
      console.error('❌ Network/Code Error:', err);
      setStatus('❌ Request failed. Check console.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-bold mb-6">Run a Test Survey Submission</h1>
      <button
        onClick={runTest}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        Send Test Email
      </button>
      <p className="mt-6 text-lg text-gray-700">{status}</p>
    </div>
  );
}
