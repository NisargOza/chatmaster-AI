"use client";
import React from "react";
import ChatInterface from "./ChatInterface";

export default function YoutubeChat() {
  const initialMessage = `Hi! I'm an AI chatbot designed to answer questions related to the Youtube video you just entered. Feel free to ask me anything!`;
  const apiEndpoint = "/api/chat/youtube";
  const messageColors = {
    user: "bg-green-700",
    assistant: "bg-purple-700",
  };

  return (
    <ChatInterface
      initialMessage={initialMessage}
      apiEndpoint={apiEndpoint}
      messageColors={messageColors}
    />
  );
}
