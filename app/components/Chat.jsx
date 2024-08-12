'use client';
import React from 'react';
import ChatInterface from './ChatInterface';

export default function Chat() {
  const initialMessage = `Hi! I'm an AI chatbot designed to help you with general inquiries. How can I help you today?`;
  const apiEndpoint = '/api/chat/general';
  const messageColors = {
    user: 'bg-green-700',
    assistant: 'bg-gray-700',
  };

  return (
    <ChatInterface
      initialMessage={initialMessage}
      apiEndpoint={apiEndpoint}
      messageColors={messageColors}
    />
  );
}
