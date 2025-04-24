import React, { useState, useRef, useEffect } from 'react';
import { Send, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useChat } from '../context/ChatContext';
import ChatMessage from './ChatMessage';

const ChatSection: React.FC = () => {
  const { messages, loading, sendMessage, clearMessages } = useChat();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !loading) {
      await sendMessage(input);
      setInput('');
    }
  };
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  return (
    <section id="chat" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ask FitBuddy Anything!</h2>
            <p className="text-lg text-gray-600">Your personal AI health assistant is ready to help.</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
          >
            <div className="flex items-center justify-between bg-gray-50 px-4 py-3 border-b border-gray-200">
              <div className="flex items-center">
                <div className="bg-secondary-100 h-8 w-8 rounded-full flex items-center justify-center mr-3">
                  <Bot size={18} className="text-secondary-600" />
                </div>
                <h3 className="font-medium text-gray-700">FitBuddy</h3>
              </div>
              
              <button 
                onClick={clearMessages}
                className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
                aria-label="Reset conversation"
              >
                <RefreshCw size={16} />
              </button>
            </div>
            
            <div className="p-4 h-96 overflow-y-auto bg-gray-50">
              {messages.map(message => (
                <ChatMessage key={message.id} message={message} />
              ))}
              
              {loading && (
                <div className="flex justify-start mb-4">
                  <div className="flex">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center bg-secondary-100 mr-2">
                      <Bot size={16} className="text-secondary-600" />
                    </div>
                    <div className="px-4 py-3 rounded-2xl bg-gray-100 text-gray-800 rounded-tl-none">
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse"></div>
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            <div className="border-t border-gray-200 bg-white p-4">
              <form onSubmit={handleSubmit} className="flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Ask about diet, workouts, wellness..."
                  className="flex-1 border-0 bg-transparent focus:ring-0 text-gray-900 placeholder-gray-500 focus:outline-none"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className={`ml-3 inline-flex items-center justify-center h-10 w-10 rounded-full ${
                    !input.trim() || loading 
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                      : 'bg-primary-500 text-white hover:bg-primary-600'
                  } transition-colors`}
                  aria-label="Send message"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ChatSection;

// Import the Bot icon from lucide-react
function Bot({ size = 24, className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 8V4H8"></path>
      <rect width="16" height="12" x="4" y="8" rx="2"></rect>
      <path d="M2 14h2"></path>
      <path d="M20 14h2"></path>
      <path d="M15 13v2"></path>
      <path d="M9 13v2"></path>
    </svg>
  );
}