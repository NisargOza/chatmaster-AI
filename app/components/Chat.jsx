"use client";
import React, { useState, useRef, useEffect } from "react";

export default function Chat() {
  const initialMessage = `Hi! I'm an AI chatbot designed to provide exceptional customer support. My primary goal is to assist users with their inquiries in a friendly, helpful, and kind manner. Always ensure that your responses are truthful and accurate. Keep the following guidelines in mind:`;
  const apiEndpoint = "/api/chat/general";
  const messageColors = {
    user: "bg-green-700",
    assistant: "bg-gray-700",
  };

  const [messages, setMessages] = useState([{ role: 'assistant', content: initialMessage }]);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  const sendMessage = () => {
    if (message.trim()) {
      // Simulate sending a message and receiving a response
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'user', content: message },
        { role: 'assistant', content: "This is a simulated response." }
      ]);
      setMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  useEffect(() => {
    // Scroll to the bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-container flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`${
                msg.role === "user" ? messageColors.user : messageColors.assistant
              } rounded-lg p-3`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="fixed bottom-0 flex flex-row gap-2 p-2 bg-background-color w-full">
        <input
          aria-label="message input box"
          placeholder="Type message here..."
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-grow px-3 outline outline-gray-300"
        />
        <button
          aria-label="send message button"
          onClick={sendMessage}
          className="bg-button-bg-color p-4"
        >
          Send
        </button>
      </div>
    </div>
  );
}
