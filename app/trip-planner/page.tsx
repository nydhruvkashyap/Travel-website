'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TripPlanner() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError('Please enter a valid email address.');
      return;
    }

    // Temporarily store user's email and itinerary type
    localStorage.setItem('userEmail', email);
    localStorage.setItem('itineraryType', 'gpt');

    // Navigate to the personalized survey page
    router.push('/survey');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8 px-4">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">Mythara Trip Planner</h1>

        <p className="text-gray-600 text-center mb-8">
          Receive a personalized, AI-generated itinerary delivered directly to your inbox.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Your Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {error && <div className="mb-4 text-red-500 font-medium">{error}</div>}

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
          >
            Continue to 5-Minute Survey
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">
            You'll be redirected to a brief survey to help us personalize your itinerary.
          </p>
        </form>
      </div>
    </div>
  );
}
