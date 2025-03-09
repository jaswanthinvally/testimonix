'use client';

import { useState } from 'react';

const GeminiChat = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const fetchGeminiResponse = async () => {
    setLoading(true);
    setResponse('');
    setError('');

    try {
      const res = await fetch('http://localhost:3000/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (res.ok) {
        setResponse(data.message);
      } else {
        setError(data.error || 'Error fetching response from Gemini API.');
      }
    } catch (error) {
      setError('Something went wrong. Please try again later.');
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setError('Please enter a valid prompt.');
      return;
    }
    fetchGeminiResponse();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4 sm:p-6">
      <div className="w-full max-w-md sm:max-w-lg bg-white rounded-lg shadow-lg p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-[#F5A623] text-center">
          Ask AI Trip Planner
        </h2>

        {/* Form for prompt input */}
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F5A623] resize-y text-gray-700 placeholder-gray-400 transition-all duration-300"
            rows={4}
            placeholder="Type your travel query here (e.g., 'Plan a 3-day trip to Paris')..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={loading}
          />
          <button
            type="submit"
            className="w-full mt-4 bg-[#F5A623] text-white p-3 rounded-md hover:bg-[#e69520] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            disabled={loading || !prompt.trim()}
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Loading...</span>
              </div>
            ) : (
              'Plan My Trip'
            )}
          </button>
        </form>

        {/* Display response */}
        {response && (
          <div className="mt-6 p-4 border border-gray-200 rounded-md bg-gray-50 text-gray-800">
            <h3 className="font-medium text-lg mb-2 text-[#F5A623]">Your Trip Plan:</h3>
            <p className="whitespace-pre-wrap">{response}</p>
          </div>
        )}

        {/* Display error */}
        {error && (
          <div className="mt-6 p-4 border border-red-300 rounded-md bg-red-50 text-red-700">
            <h3 className="font-medium text-lg mb-2">Error:</h3>
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeminiChat;