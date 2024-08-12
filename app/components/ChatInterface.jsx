import React, { useState, useRef, useEffect } from "react";
import { marked } from "marked";
import Modal from "./Modal";
import { CircularButton } from "./Button";

const ChatInterface = ({ initialMessage, apiEndpoint, messageColors }) => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: initialMessage,
    },
  ]);
  const [message, setMessage] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (messages.length === 7) {
      setModalIsOpen(true);
    }
  }, [messages]);

  const sendMessage = async () => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: message },
      { role: "assistant", content: "" },
    ]);
    setMessage("");

    const response = fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([...messages, { role: "user", content: message }]),
    }).then(async (res) => {
      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      let result = "";
      return reader.read().then(function processText({ done, value }) {
        if (done) {
          return result;
        }

        const text = decoder.decode(value || new Int8Array(), { stream: true });
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1];
          let otherMessages = messages.slice(0, messages.length - 1);

          return [
            ...otherMessages,
            {
              ...lastMessage,
              content: lastMessage.content + text,
            },
          ];
        });

        return reader.read().then(processText);
      });
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const handleSubmitFeedback = () => {
    setFeedbackSubmitted(true);
    setTimeout(() => {
      handleCloseModal();
    }, 1000);
  };

  return (
    <div className="box-border flex h-full flex-col items-center justify-center overflow-auto bg-gray-900 text-white">
      {modalIsOpen && (
        <Modal onClose={handleCloseModal}>
          How would you rate the Chatbot responses?
          <div className="my-4 flex justify-between">
            {[1, 2, 3, 4, 5].map((rating) => (
              <CircularButton onSubmit={handleSubmitFeedback} key={rating}>
                {rating}
              </CircularButton>
            ))}
          </div>
          {feedbackSubmitted && (
            <div className="text-center text-sm text-green-300">
              Thank you for your feedback!
            </div>
          )}
        </Modal>
      )}
      <div className="flex h-full w-full flex-col gap-3 p-2">
        <div className="flex h-full flex-col gap-2 overflow-y-auto">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`${
                  msg.role === "user"
                    ? messageColors.user
                    : messageColors.assistant
                } rounded-lg p-3`}
              >
                <div
                  className="prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: marked(msg.content) }}
                />
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="sticky bottom-0 flex flex-row gap-2 p-2">
          <input
            aria-label="message input box"
            placeholder="Type message here..."
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow rounded-md bg-gray-700 px-3 py-2 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            aria-label="send message button"
            onClick={sendMessage}
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
