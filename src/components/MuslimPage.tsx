
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Home } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface MuslimPageProps {
  onHome: () => void;
}

const MuslimPage = ({ onHome }: MuslimPageProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const callGeminiAPI = async (prompt: string) => {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyC5HvSdg2QN1eHINuqO9yxJwY7r6Op3Mo8`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are a wise Islamic spiritual guide. Respond with compassion and wisdom based on Islamic teachings, Quran, and Hadith. Keep responses helpful and respectful. User question: ${prompt}`
            }]
          }]
        })
      });

      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || 'InshAllah, I am here to help you. Please feel free to ask your question again.';
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      return 'Maaf, there seems to be a technical issue. Please try again later.';
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    const aiResponse = await callGeminiAPI(inputValue);
    
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: aiResponse,
      isUser: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMessage]);
    setIsLoading(false);
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4 shadow-lg">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <Button 
            onClick={onHome}
            variant="ghost" 
            className="text-white hover:bg-white/20"
          >
            <Home className="w-5 h-5 mr-2" />
            Home
          </Button>
          <h1 className="text-2xl font-arabic font-semibold text-white">
            ☪️ Islamic Guide
          </h1>
          <div></div>
        </div>
      </div>

      {/* Animated Crescent */}
      <div className="flex justify-center py-8">
        <div className="relative">
          <div className="text-6xl animate-glow">☪️</div>
          <div className="absolute -top-2 -right-2 text-2xl animate-float">⭐</div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="max-w-4xl mx-auto p-4 h-96">
        <ScrollArea className="h-full bg-white/70 rounded-2xl p-4 shadow-inner" ref={scrollAreaRef}>
          {messages.length === 0 ? (
            <div className="text-center text-green-600 font-arabic text-lg p-8">
              <p>🤲 Assalamu Alaikum! I am your spiritual companion.</p>
              <p className="mt-2">Dil ki baat AI se poochhiye...</p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs md:max-w-md p-3 rounded-2xl ${
                    message.isUser
                      ? 'bg-green-500 text-white'
                      : 'bg-white text-gray-800 shadow-md'
                  }`}
                >
                  <p className="font-arabic">{message.text}</p>
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="bg-white p-3 rounded-2xl shadow-md">
                <div className="animate-pulse text-green-500">Thinking...</div>
              </div>
            </div>
          )}
        </ScrollArea>
      </div>

      {/* Input Area */}
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex gap-2 bg-white rounded-full shadow-lg p-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Dil ki baat AI se poochhiye..."
            className="border-none font-arabic text-lg focus-visible:ring-0"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button
            onClick={handleSendMessage}
            disabled={isLoading}
            className="rounded-full bg-green-500 hover:bg-green-600"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MuslimPage;
