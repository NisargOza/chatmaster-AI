import NextBreadcrumbs from "../../components/NextBreadcrumb";
import YoutubeChatbotTraining from "../../components/YoutubeChatbotTraining";
import React from "react";

export default function TrainingBot() {
  return (
    <div className="flex h-screen flex-col">
      <NextBreadcrumbs />
      <YoutubeChatbotTraining />
    </div>
  );
}
