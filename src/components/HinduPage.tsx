import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Home } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { callGeminiAPI } from '@/services/geminiApi';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface HinduPageProps {
  onHome: () => void;
}

const HinduPage = ({ onHome }: HinduPageProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

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

    const aiResponse = await callGeminiAPI(inputValue, 'hindu');
    
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 relative overflow-hidden">
      {/* Enhanced 3D Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-orange-300 rounded-full animate-float blur-2xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-amber-400 rounded-full animate-float blur-xl" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-yellow-300 rounded-full animate-float blur-3xl" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 p-4 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
        <div className="flex items-center justify-between max-w-4xl mx-auto relative z-10">
          <Button 
            onClick={onHome}
            variant="ghost" 
            className="text-white hover:bg-white/20 transition-all duration-300 hover:scale-105"
          >
            <Home className="w-5 h-5 mr-2" />
            Home
          </Button>
          <h1 className="text-3xl font-hindi font-bold text-white drop-shadow-lg animate-glow">
            🕉️ हिंदू धर्म गाइड
          </h1>
          <div></div>
        </div>
      </div>

      {/* Enhanced Animated Basuri with 3D effect */}
      <div className="flex justify-center py-12">
        <div className="relative transform-gpu">
          <div className="text-8xl animate-float transform-gpu" style={{
            animation: 'float 4s ease-in-out infinite, rotate3d 12s linear infinite',
            filter: 'drop-shadow(0 10px 20px rgba(255,165,0,0.3))'
          }}>🪈</div>
          <div className="absolute -top-4 -right-4 text-3xl animate-glow">✨</div>
          <div className="absolute -bottom-2 -left-2 text-2xl animate-bounce">🌺</div>
          {/* 3D Floating Musical Notes */}
          <div className="absolute top-0 left-16 text-2xl animate-float opacity-70" style={{ animationDelay: '1s' }}>🎵</div>
          <div className="absolute bottom-4 right-16 text-xl animate-float opacity-60" style={{ animationDelay: '3s' }}>🎶</div>
        </div>
      </div>

      {/* Enhanced Chat Area */}
      <div className="max-w-4xl mx-auto p-4 h-96">
        <ScrollArea className="h-full bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-orange-200" ref={scrollAreaRef}>
          {messages.length === 0 ? (
            <div className="text-center text-orange-600 font-hindi text-xl p-8 animate-fade-in">
              <div className="mb-4 text-4xl">🙏</div>
              <p className="mb-2">राधे राधे! मैं आपका आध्यात्मिक मित्र हूं।</p>
              <p className="text-lg opacity-80">अपने मन के प्रश्न पूछिए और श्री कृष्ण का मार्गदर्शन पाइए...</p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`mb-6 flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs md:max-w-md p-4 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 ${
                    message.isUser
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white'
                      : 'bg-white text-gray-800 shadow-xl border-l-4 border-orange-400'
                  }`}
                >
                  <p className="font-hindi leading-relaxed">{message.text}</p>
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="bg-white p-4 rounded-2xl shadow-lg border-l-4 border-orange-400">
                <div className="animate-pulse text-orange-500 font-hindi flex items-center">
                  <span>श्री कृष्ण से पूछ रहा हूं</span>
                  <div className="ml-2 flex space-x-1">
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </ScrollArea>
      </div>

      {/* Enhanced Input Area */}
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex gap-3 bg-white/90 backdrop-blur-sm rounded-full shadow-2xl p-3 border border-orange-200">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="अपने मन के प्रश्न पूछिए... (हिंदी/English/Hinglish में)"
            className="border-none font-hindi text-lg focus-visible:ring-0 bg-transparent placeholder:text-orange-400"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button
            onClick={handleSendMessage}
            disabled={isLoading}
            className="rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HinduPage;
