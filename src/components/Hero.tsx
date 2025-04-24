import React from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 to-secondary-100 py-20 md:py-24">
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute h-56 w-56 rounded-full bg-primary-300 blur-3xl -top-10 -left-10"></div>
        <div className="absolute h-64 w-64 rounded-full bg-secondary-300 blur-3xl top-40 right-20"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-6"
          >
            <span className="inline-flex items-center justify-center p-3 bg-primary-100 rounded-full shadow-lg">
              <Activity size={32} className="text-primary-600" />
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 mb-4"
          >
            Meet FitBuddy
            <span className="block text-primary-600">Your Personal Health Chatbot</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-700 mb-8"
          >
            Get quick, reliable advice for your health, fitness, and wellness.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <a 
              href="#chat" 
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
            >
              Start Chatting
            </a>
          </motion.div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default Hero;