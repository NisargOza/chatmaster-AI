import React from "react";
import Chat from "../../components/Chat";
import NextBreadcrumb from "../../components/NextBreadcrumb";

export default function GeneralChatBot() {
  return (
    <div className="flex h-screen flex-col">
      <NextBreadcrumb />

      <div className="flex-1 overflow-hidden">
        <Chat />
      </div>
    </div>
  );
}
