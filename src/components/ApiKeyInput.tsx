import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Key, Check, X } from 'lucide-react';

interface ApiKeyInputProps {
  onSubmit: (apiKey: string) => void;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onSubmit }) => {
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!apiKey.trim()) {
      setError('Please enter your Gemini API key');
      return;
    }
    
    if (apiKey.trim().length < 10) {
      setError('API key seems too short. Please check and try again.');
      return;
    }
    
    onSubmit(apiKey.trim());
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 p-4"
    >
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
        <div className="text-center mb-6">
          <div className="mx-auto h-16 w-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
            <Key size={28} className="text-primary-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Enter Your Gemini API Key</h2>
          <p className="text-gray-600">
            FitBuddy needs your Gemini API key to provide health and wellness advice.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-1">
              Gemini API Key
            </label>
            <input
              type="password"
              id="apiKey"
              value={apiKey}
              onChange={(e) => {
                setApiKey(e.target.value);
                setError('');
              }}
              className={`w-full px-4 py-3 border ${
                error ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-primary-500'
              } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-transparent`}
              placeholder="Paste your API key here"
            />
            {error && (
              <div className="mt-2 flex items-center text-sm text-red-600">
                <X size={16} className="mr-1" />
                {error}
              </div>
            )}
          </div>
          
          <div className="pt-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <Check size={18} className="mr-2" />
              Connect to Gemini
            </button>
          </div>
          
          <div className="mt-4 text-sm text-center text-gray-500">
            <p>
              Your API key is used only in your browser and is not stored on any server.
            </p>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default ApiKeyInput;