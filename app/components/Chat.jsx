"use client";
import React from "react";
import ChatInterface from "./ChatInterface";

export default function Chat() {
  const initialMessage = `Hi! I'm an AI chatbot designed to provide exceptional customer support. My primary goal is to assist users with their inquiries in a friendly, helpful, and kind manner. Always ensure that your responses are truthful and accurate. Keep the following guidelines in mind:`;
  const apiEndpoint = "/api/chat/general";
  const messageColors = {
    user: "bg-green-700",
    assistant: "bg-gray-700",
  };

  return (
    <ChatInterface
      initialMessage={initialMessage}
      apiEndpoint={apiEndpoint}
      messageColors={messageColors}
    />
  );
}
