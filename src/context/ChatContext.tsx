import React, { createContext, useContext, useState, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Message, ChatContextType } from '../types';
import { generateAIResponse } from '../services/geminiService';

// Create the context outside of any component
export const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Separate the provider component
export function ChatProvider({ children, apiKey }: { children: ReactNode; apiKey: string }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uuidv4(),
      text: "Hi there! I'm FitBuddy, your personal health assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Log the API key status (first few characters only for security)
    console.log('API Key Status:', apiKey ? `Present (${apiKey.substring(0, 5)}...)` : 'Missing');

    const userMessage: Message = {
      id: uuidv4(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      console.log('Sending message to Gemini API...');
      // Our updated service now returns a string instead of throwing errors
      const aiResponse = await generateAIResponse(text.trim(), messages, apiKey);
      console.log('Received response from Gemini API:', aiResponse ? aiResponse.substring(0, 50) + '...' : 'No response');

      const aiMessage: Message = {
        id: uuidv4(),
        text: aiResponse || "Sorry, I couldn't generate a response. Please try again.",
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error: any) {
      console.error('Error in ChatContext:', error);
      
      const errorMessage: Message = {
        id: uuidv4(),
        text: error.message || "Sorry, I couldn't process your request. Please try again.",
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const clearMessages = () => {
    setMessages([
      {
        id: uuidv4(),
        text: "Hi there! I'm FitBuddy, your personal health assistant. How can I help you today?",
        isUser: false,
        timestamp: new Date(),
      },
    ]);
  };

  const value = {
    messages,
    loading,
    sendMessage,
    clearMessages
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
}

// Separate hook function
export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}