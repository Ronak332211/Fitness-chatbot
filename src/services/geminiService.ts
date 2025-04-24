import { GoogleGenerativeAI } from '@google/generative-ai';
import { Message } from '../types';

export const generateAIResponse = async (
  message: string, 
  chatHistory: Message[],
  apiKey: string
): Promise<string> => {
  try {
    console.log("Starting API call with key:", apiKey ? "Key exists (first chars: " + apiKey.substring(0, 5) + "...)" : "No key provided");
    
    if (!apiKey) {
      throw new Error('API key is required. Please enter a valid Gemini API key.');
    }

    // Initialize with the specified model
    const genAI = new GoogleGenerativeAI(apiKey);
    console.log("Initialized GoogleGenerativeAI");
    
    // Create a list of models to try in order
    const modelOptions = [
      'gemini-pro',
      'gemini-1.0-pro',
      'gemini-1.5-pro',
      'gemini-1.0-pro-001',
      'gemini-pro-vision'
    ];
    
    let model;
    let modelName = '';
    let lastError: Error | null = null;
    
    // Try each model until one works
    for (const modelOption of modelOptions) {
      try {
        console.log(`Trying model: ${modelOption}`);
        model = genAI.getGenerativeModel({ model: modelOption });
        // Test if the model can be used
        await model.generateContent("Test");
        modelName = modelOption;
        console.log(`Successfully connected to model: ${modelOption}`);
        // Break out of the loop if successful
        break;
      } catch (e: any) {
        console.log(`Model ${modelOption} not available: ${e.message}`);
        lastError = e;
        // Continue to the next model
      }
    }
    
    if (!model) {
      throw new Error('No available models found: ' + (lastError?.message || 'Unknown error'));
    }
    
    console.log(`Using model: ${modelName}`);

    // Format previous messages for context (last 3 only to keep it simple)
    let prompt = '';
    const recentMessages = chatHistory.slice(-3);
    
    for (const msg of recentMessages) {
      if (msg.isUser) {
        prompt += `User: ${msg.text}\n`;
      } else {
        prompt += `Assistant: ${msg.text}\n`;
      }
    }
    
    // Add the current message
    prompt += `User: ${message}\nAssistant:`;
    console.log("Prompt prepared, sending to API...");

    // Generate content with simple configuration
    const result = await model.generateContent(prompt);
    console.log("Response received from API");
    const response = result.response;
    return response.text();
    
  } catch (error: any) {
    console.error('Error calling Gemini API:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    
    // Provide detailed error message
    if (error.message?.includes('API key')) {
      return 'Invalid API key. Please check your Gemini API key and try again.';
    } else if (error.message?.includes('quota')) {
      return 'API quota exceeded. Please check your Gemini API usage limits.';
    } else if (error.message?.includes('network')) {
      return 'Network error. Please check your internet connection and try again.';
    } else if (error.message?.includes('safety')) {
      return 'Your message was blocked by safety filters. Please try rephrasing your question.';
    } else if (error.message?.includes('not found') || error.message?.includes('model')) {
      return 'No available AI models found. Please try again later with a different API key.';
    } else {
      return `Error: ${error.message || 'An unexpected error occurred. Please try again.'}`;
    }
  }
};