import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Brain, Apple, Activity, AlertCircle } from 'lucide-react';

const features = [
  {
    icon: <Heart className="text-primary-500 h-6 w-6" />,
    title: 'General Health',
    description: 'Tips on hydration, sleep, and daily wellness habits.',
  },
  {
    icon: <Activity className="text-primary-500 h-6 w-6" />,
    title: 'Fitness Tips',
    description: 'Simple home workouts, stretching routines, and activity ideas.',
  },
  {
    icon: <Apple className="text-primary-500 h-6 w-6" />,
    title: 'Nutrition Advice',
    description: 'Balanced meal suggestions and healthy eating principles.',
  },
  {
    icon: <Brain className="text-primary-500 h-6 w-6" />,
    title: 'Mental Wellness',
    description: 'Stress management, motivation, and mindfulness techniques.',
  },
];

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">About FitBuddy</h2>
            <p className="text-lg text-gray-700 mb-8">
              FitBuddy is your smart companion for everyday health questions. From diet tips to simple home workouts and mental wellness advice — FitBuddy responds instantly using AI, trained with real-world tips and care.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mb-12">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
                >
                  <div className="flex items-center mb-4">
                    <div className="mr-4 p-2 bg-primary-50 rounded-full">
                      {feature.icon}
                    </div>
                    <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-orange-50 border border-orange-100 rounded-lg p-6 flex items-start text-left"
            >
              <AlertCircle className="text-orange-500 h-6 w-6 flex-shrink-0 mt-1 mr-4" />
              <div>
                <p className="text-sm text-orange-800 font-medium mb-1">Disclaimer</p>
                <p className="text-sm text-orange-700">
                  Note: FitBuddy does not provide medical diagnoses or prescriptions. For serious concerns, please consult a healthcare professional.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;