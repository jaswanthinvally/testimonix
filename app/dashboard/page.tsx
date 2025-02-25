"use client";

import { useState } from "react";

const API_KEY = "YOUR_OPENAI_API_KEY"; // Replace with your API key

export default function Dashboard() {
  const [messages, setMessages] = useState([
    { sender: "User", text: "Hello, how can you assist me?" },
    { sender: "AI", text: "I can help you with various queries and tasks. How may I assist you today?" }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { sender: "User", text: input }];
    setMessages(newMessages);
    setInput("");

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: newMessages.map(msg => ({ role: msg.sender === "User" ? "user" : "assistant", content: msg.text }))
      }),
    });

    const data = await response.json();
    const aiReply = data.choices[0].message.content;
    setMessages([...newMessages, { sender: "AI", text: aiReply }]);
  };

  return (
    <div className="h-screen bg-black text-white font-Poppins flex flex-col">
      <header className="bg-customblue py-4 text-center text-xl font-semibold">
        AI Chat Dashboard
      </header>
      
      <div className="flex-1 flex flex-col p-4 mx-4 md:mx-24 overflow-hidden">
        <div className="flex-1 bg-gray-900 p-4 rounded-lg overflow-y-auto max-h-[70vh]">
          {messages.map((msg, index) => (
            <div key={index} className={`mb-4 ${msg.sender === "AI" ? "text-right" : "text-left"}`}>
              <p className="text-sm text-gray-400">{msg.sender}</p>
              <div className={`${msg.sender === "AI" ? "bg-customblue ml-auto" : "bg-gray-700"} p-3 rounded-md max-w-md`}>{msg.text}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 bg-gray-800 flex items-center mx-4 md:mx-24 rounded-lg">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 p-2 bg-transparent border-b border-gray-600 focus:outline-none text-white"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="bg-customblue px-4 py-2 ml-2 rounded-sm" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
