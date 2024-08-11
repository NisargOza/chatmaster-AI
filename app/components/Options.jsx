import Link from "next/link";
import React from "react";
import H1 from "./H1";

export default function Options() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gradient-to-r from-gray-900 to-blue-900 p-6">
      <H1 classes="text-gray-100 mb-4">Welcome to AI Support Chatbot!</H1>
      <h2 className="mb-8 text-2xl font-semibold text-gray-300">
        Select an option
      </h2>
      <div className="flex flex-col gap-4">
        <Link
          className="transform rounded-lg bg-gray-800 px-8 py-4 text-lg font-bold text-blue-400 shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:bg-gray-700 hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          href="/chatbot/general"
        >
          General Chat Bot
        </Link>
        <Link
          className="transform rounded-lg bg-gray-800 px-8 py-4 text-lg font-bold text-purple-400 shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:bg-gray-700 hover:text-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          href="/training/youtube"
        >
          Youtube Chat Bot
        </Link>
      </div>
    </div>
  );
}
