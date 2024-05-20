/* eslint-disable no-undef */
import { useState } from 'react';
import PropTypes from 'prop-types';
import './ChatGPT.css';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from '@chatscope/chat-ui-kit-react';

import Button from '../../ui/Button';
const API_KEY = 'ChatGPT_API_Key';
const systemMessage = {
  role: 'system',
  content:
    "Explain things like you're talking to a doctor or a patient in a pediatric clinic.",
};

function ChatGPT({ onClose }) {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm Apollo! Ask me anything!",
      sentTime: 'just now',
      sender: 'Apollo',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Sending state
  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: 'user',
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = '';
      if (messageObject.sender === 'Apollo') {
        role = 'assistant';
      } else {
        role = 'user';
      }
      return { role: role, content: messageObject.message };
    });

    const apiRequestBody = {
      model: 'gpt-3.5-turbo',
      messages: [systemMessage, ...apiMessages],
    };
    // API Connection - fetch
    await fetch('https://api.openai.com/v1/chat/completions ', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: 'Apollo',
          },
        ]);
        setIsTyping(false);
      });
  }

  const handleClose = () => {
    onClose();
  };

  return (
    <div className='chat-popup'>
      <div className='chat-header'>
        <h3>Apollo</h3>
        <Button onClick={handleClose} variation='chat' size='small'>
          Close
        </Button>
      </div>
      <div className='chat-body'>
        <MainContainer>
          <ChatContainer>
            <MessageList
              scrollBehavior='smooth'
              typingIndicator={
                isTyping ? <TypingIndicator content='Apollo is typing' /> : null
              }
            >
              {messages.map((message, i) => (
                <Message key={i} model={message} />
              ))}
            </MessageList>
            <MessageInput placeholder='Type message here' onSend={handleSend} />
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
