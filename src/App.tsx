import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Hero from './components/Hero';
import ChatSection from './components/ChatSection';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import ApiKeyInput from './components/ApiKeyInput';
import { ChatProvider } from './context/ChatContext';

function App() {
  const [apiKey, setApiKey] = useState<string>('');
  
  const handleApiKeySubmit = (key: string) => {
    console.log("API key submitted:", key ? `${key.substring(0, 5)}...` : 'No key provided');
    setApiKey(key);
    localStorage.setItem('gemini-api-key', key);
  };
  
  useEffect(() => {
    const envApiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const savedApiKey = localStorage.getItem('gemini-api-key');
    
    console.log("Environment API key:", envApiKey ? "Present" : "Not present");
    console.log("Saved API key:", savedApiKey ? "Present" : "Not present");
    
    if (envApiKey) {
      console.log("Using environment API key");
      setApiKey(envApiKey);
    } else if (savedApiKey) {
      console.log("Using saved API key");
      setApiKey(savedApiKey);
    }
  }, []);
  
  return (
    <div className="min-h-screen bg-white">
      {!apiKey && <ApiKeyInput onSubmit={handleApiKeySubmit} />}
      
      {apiKey && (
        <ChatProvider apiKey={apiKey}>
          <header className="fixed top-0 left-0 right-0 bg-white z-10 shadow-sm">
            <div className="container mx-auto">
              <nav className="flex items-center justify-between p-4">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-600 mr-2">
                    <path d="M16 22a2 2 0 0 1-2-2H2a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v16a2 2 0 1 1-4 0Z"></path>
                    <path d="M18 14h-8"></path>
                    <path d="M15 18h-5"></path>
                    <path d="M10 6h8"></path>
                    <path d="M13 10h5"></path>
                  </svg>
                  <span className="font-bold text-xl">FitBuddy</span>
                </div>
                
                <div className="hidden md:flex space-x-6">
                  <a href="#" className="text-gray-700 hover:text-primary-600 transition-colors">Home</a>
                  <a href="#chat" className="text-gray-700 hover:text-primary-600 transition-colors">Chat</a>
                  <a href="#about" className="text-gray-700 hover:text-primary-600 transition-colors">About</a>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary-50 text-primary-600 font-medium px-4 py-2 rounded-md hover:bg-primary-100 transition-colors"
                  onClick={() => {
                    console.log("Clearing API key");
                    localStorage.removeItem('gemini-api-key');
                    setApiKey('');
                  }}
                >
                  Change API Key
                </motion.button>
              </nav>
            </div>
          </header>
          
          <main className="pt-16">
            <Hero />
            <ChatSection />
            <AboutSection />
          </main>
          
          <Footer />
        </ChatProvider>
      )}
    </div>
  );
}

export default App;