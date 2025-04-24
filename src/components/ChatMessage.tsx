import React from 'react';
import { motion } from 'framer-motion';
import { User, Bot } from 'lucide-react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { text, isUser } = message;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`flex max-w-[80%] md:max-w-[70%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${isUser ? 'bg-primary-100 ml-2' : 'bg-secondary-100 mr-2'}`}>
          {isUser ? (
            <User size={16} className="text-primary-600" />
          ) : (
            <Bot size={16} className="text-secondary-600" />
          )}
        </div>
        
        <div 
          className={`px-4 py-3 rounded-2xl ${
            isUser 
              ? 'bg-primary-500 text-white rounded-tr-none' 
              : 'bg-gray-100 text-gray-800 rounded-tl-none'
          }`}
        >
          <p className="text-sm md:text-base whitespace-pre-wrap break-words">{text}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;