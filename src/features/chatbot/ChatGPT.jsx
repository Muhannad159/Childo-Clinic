import { useState } from "react";
import PropTypes from "prop-types";
import "./ChatGPT.css";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

import Button from "../../ui/Button";
const API_KEY = "AIzaSyAcWxlhFcMPXt61Yjhd4RGe9UhDcj6P36o";
const systemMessage = {
  role: "system",
  content:
    "Explain things like you're talking to a doctor or a patient in a pediatric clinic.",
};

function ChatGPT({ onClose }) {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm KidCompanion! Ask me anything!",
      sentTime: "just now",
      sender: "KidCompanion",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Sending state
  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user",
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    setIsTyping(true);
    await sendChatRequest(
      systemMessage.content,
      newMessages.map((msg) => msg.message)
    );
  };

  const sendChatRequest = async (systemMessage, apiMessages) => {
    const API_ENDPOINT =
      "https://generativelanguage.googleapis.com/v1beta2/models/chat-bison-001:generateMessage?key=" +
      API_KEY;

    const requestBody = {
      prompt: {
        context: "",
        examples: [],
        messages: [
          {
            content: systemMessage,
          },
          ...apiMessages.map((message) => ({ content: message })),
        ],
      },
      temperature: 0.25,
      top_k: 40,
      top_p: 0.95,
      candidate_count: 1,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    };

    try {
      const response = await fetch(API_ENDPOINT, requestOptions);
      const data = await response.json();

      if (
        data.filters &&
        data.filters.length > 0 &&
        data.filters[0].reason === "OTHER"
      ) {
        const errorMessage = "Sorry, I can't assist you with this.";
        console.error(errorMessage); // Log error
        const errorMessageObj = {
          message: errorMessage,
          sender: "KidCompanion",
          direction: "incoming",
        };
        setMessages((prevMessages) => [...prevMessages, errorMessageObj]);
      } else if (
        data.candidates &&
        data.candidates.length > 0 &&
        data.candidates[0].content
      ) {
        const message = data.candidates[0].content;
        console.log("Message Response:", data);
        console.log("Message text:", message);
        const newMessage = {
          message: message,
          sender: "KidCompanion",
          direction: "incoming",
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      } else {
        throw new Error("API call failed");
      }
    } catch (error) {
      console.error("API call failed:", error.message); // Log error
      const errorMessageObj = {
        message: error.message,
        sender: "KidCompanion",
        direction: "incoming",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessageObj]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="chat-popup">
      <div className="chat-header">
        <h3>KidCompanion</h3>
        <Button onClick={handleClose} variation="chat" size="small">
          Close
        </Button>
      </div>
      <div className="chat-body">
        <MainContainer>
          <ChatContainer>
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={
                isTyping ? (
                  <TypingIndicator content="KidCompanion is typing" />
                ) : null
              }
            >
              {messages.map((message, i) => (
                <Message key={i} model={message} />
              ))}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}

ChatGPT.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ChatGPT;
