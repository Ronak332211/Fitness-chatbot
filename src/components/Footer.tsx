import React from 'react';
import { Github, Twitter, Linkedin, Instagram, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const socialLinks = [
    { icon: <Twitter size={20} />, url: '#', label: 'Twitter' },
    { icon: <Instagram size={20} />, url: '#', label: 'Instagram' },
    { icon: <Linkedin size={20} />, url: '#', label: 'LinkedIn' },
    { icon: <Github size={20} />, url: '#', label: 'GitHub' },
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <div className="mr-3 bg-primary-600 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 22a2 2 0 0 1-2-2H2a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v16a2 2 0 1 1-4 0Z"></path>
                    <path d="M18 14h-8"></path>
                    <path d="M15 18h-5"></path>
                    <path d="M10 6h8"></path>
                    <path d="M13 10h5"></path>
                  </svg>
                </div>
                <span className="text-2xl font-bold">FitBuddy</span>
              </div>
              <p className="text-gray-400 mt-2 max-w-xs">Your personal health companion powered by AI</p>
            </div>
            
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-full"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                &copy; {new Date().getFullYear()} FitBuddy. All rights reserved.
              </p>
              
              <p className="text-gray-400 text-sm flex items-center">
                Made with <Heart size={14} className="mx-1 text-red-500" /> by Ronak Nehara | Powered by Gemini AI
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;