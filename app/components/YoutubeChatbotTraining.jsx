"use client";

import H1 from "./H1";
import Button from "./Button";
import { feedModel } from "../lib/actions";
import { useFormState } from "react-dom";

export default function YoutubeChatbotTraining() {
  const [state, dispatch] = useFormState(feedModel, null);

  const handleSubmit = async (formData) => {
    // Prevent the default form submission
    const url = formData.get("url");
    dispatch(url);
  };

  return (
    <form action={handleSubmit} className="flex flex-col items-center">
      <H1 classes="my-4 py-4">Ask any questions related to a Youtube Video</H1>
      <label className="mb-2 text-lg font-semibold text-gray-700">
        Enter the Youtube URL
      </label>
      <input
        className="w-96 rounded-lg border-2 border-gray-300 p-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        placeholder="E.g: https://www.youtube.com/watch?v=cTO-9mORwYs"
        name="url"
      />
      {state?.statusCode === 400 && (
        <p className="mt-2 text-sm text-red-500">
          Please enter a valid Youtube URL
        </p>
      )}
      {state?.statusCode === 500 && (
        <p className="mt-2 text-sm text-red-500">
          Something went wrong. Please try again
        </p>
      )}
      <Button
        loadingText={"Training..."}
        type="submit"
        classes="mt-4 py-2 px-4"
      >
        Start Chatting
      </Button>
    </form>
  );
}
