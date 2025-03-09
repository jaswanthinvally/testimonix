"use client";

import { useState, useCallback } from "react";

export default function TripPlanner() {
  const [destination, setDestination] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [days, setDays] = useState(0);
  const [budget, setBudget] = useState("medium");
  const [travelWith, setTravelWith] = useState("single");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to construct the prompt based on user inputs
  const generatePrompt = useCallback(() => {
    return `Create a detailed ${days}-day travel itinerary for ${destination} starting on ${travelDate}. 
    The budget is ${budget}, and the trip is for a ${travelWith} traveler. Include daily activities, 
    recommended places to visit, dining options, and travel tips tailored to this profile. 
    Format the response with clear section headings (e.g., 'Day 1:', 'Dining Options:', 'Travel Tips:') 
    and use bullet points (e.g., '- Activity') for lists. Ensure each section has at least one item.`;
  }, [destination, travelDate, days, budget, travelWith]);

  // Function to fetch the itinerary from the /api/gemini endpoint
  const fetchItinerary = async () => {
    setLoading(true);
    setResponse("");
    setError("");

    try {
      const prompt = generatePrompt();
      const res = await fetch("http://localhost:3000/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      console.log("API Response:", data);

      if (res.ok) {
        setResponse(data.message || "No itinerary generated.");
      } else {
        setError(data.error || "Error generating itinerary.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again later.");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!destination.trim() || !travelDate.trim() || days === 0) {
      setError("Please fill in all fields and select at least 1 day.");
      return;
    }
    fetchItinerary();
  };

  // Enhanced parsing function to handle the response
  const parseItinerary = (text) => {
    const sections = [];
    const lines = text.split("\n").filter((line) => line.trim());
    let currentSection = { title: "", content: [] };

    lines.forEach((line) => {
      const trimmedLine = line.trim();
      if (trimmedLine.match(/^Day \d+:/i) || trimmedLine.match(/^(Dining Options|Travel Tips):/i)) {
        if (currentSection.title) {
          sections.push(currentSection);
        }
        currentSection = { title: trimmedLine.replace(/:$/, ""), content: [] };
      } else if (trimmedLine.startsWith("-") || trimmedLine.startsWith("*")) {
        currentSection.content.push(trimmedLine.replace(/^- /, "").replace(/^\* /, ""));
      } else if (trimmedLine && !currentSection.content.length) {
        currentSection.content.push(trimmedLine);
      }
    });
    if (currentSection.title || sections.length === 0) sections.push(currentSection);
    return sections.length ? sections : [{ title: "Itinerary", content: [text] }];
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-sm bg-black rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-white text-center mb-6">AI Trip Planner</h2>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center">
            <label className="text-sm text-white mb-2">Destination?</label>
            <input
              className="w-full p-2 border border-gray-300 rounded-lg text-white bg-black focus:outline-none"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g., Chennai"
              disabled={loading}
            />
          </div>

          <div className="flex flex-col items-center">
            <label className="text-sm text-white mb-2">Travel Date?</label>
            <input
              type="date"
              className="w-full p-2 border border-gray-300 rounded-lg text-white bg-black focus:outline-none"
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="flex flex-col items-center">
            <label className="text-sm text-white mb-2">Days?</label>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-white">Days:</span>
              <span className="text-lg font-medium text-white">{days}</span>
              <div className="flex space-x-2">
                <button
                  type="button"
                  className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                  onClick={() => setDays((prev) => prev + 1)}
                  disabled={loading}
                >
                  +
                </button>
                <button
                  type="button"
                  className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                  onClick={() => setDays((prev) => Math.max(0, prev - 1))}
                  disabled={loading}
                >
                  -
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <label className="text-sm text-white mb-2">Budget?</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-lg text-white bg-black focus:outline-none"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              disabled={loading}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="flex flex-col items-center">
            <label className="text-sm text-white mb-2">Traveling With?</label>
            <div className="flex space-x-2">
              <button
                type="button"
                className={`px-3 py-1 rounded-full ${
                  travelWith === "single" ? "bg-white text-black" : "bg-gray-200 text-black"
                } hover:bg-gray-300 transition-colors`}
                onClick={() => setTravelWith("single")}
                disabled={loading}
              >
                Single
              </button>
              <button
                type="button"
                className={`px-3 py-1 rounded-full ${
                  travelWith === "couple" ? "bg-white text-black" : "bg-gray-200 text-black"
                } hover:bg-gray-300 transition-colors`}
                onClick={() => setTravelWith("couple")}
                disabled={loading}
              >
                Couple
              </button>
              <button
                type="button"
                className={`px-3 py-1 rounded-full ${
                  travelWith === "family" ? "bg-white text-black" : "bg-gray-200 text-black"
                } hover:bg-gray-300 transition-colors`}
                onClick={() => setTravelWith("family")}
                disabled={loading}
              >
                Family
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full max-w-xs bg-white text-black py-2 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Generating..." : "Create Trip"}
            </button>
          </div>
        </form>

        {/* Display response */}
        {response && (
          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-semibold text-[#F5A623] text-center flex items-center justify-center mb-4">
              <span className="mr-2">🌍</span> Your Trip Plan for {destination}
            </h3>
            {parseItinerary(response).map((section, index) => (
              <div key={index} className="flex flex-col items-center">
                <label className="text-sm text-[#F5A623] mb-2">{section.title}</label>
                <div className="w-full p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {section.content.map((item, idx) => (
                      <li key={idx} className="text-sm">{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Display error */}
        {error && (
          <div className="mt-6 p-4 border border-red-300 rounded-md bg-red-50 text-red-700 text-center">
            <h3 className="font-medium text-lg mb-2">Error:</h3>
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}