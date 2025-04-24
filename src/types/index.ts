export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export interface ChatContextType {
  messages: Message[];
  loading: boolean;
  sendMessage: (text: string) => Promise<void>;
  clearMessages: () => void;
}