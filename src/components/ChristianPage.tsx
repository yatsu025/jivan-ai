import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Home, Cross } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { callGeminiAPI } from '@/services/geminiApi';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChristianPageProps {
  onHome: () => void;
}

const ChristianPage = ({ onHome }: ChristianPageProps) => {
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

    const aiResponse = await callGeminiAPI(inputValue, 'christian');
    
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Enhanced 3D Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-12 left-12 w-32 h-32 bg-purple-300 rounded-full animate-float blur-2xl"></div>
        <div className="absolute top-32 right-16 w-24 h-24 bg-blue-400 rounded-full animate-float blur-xl" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-24 left-1/3 w-36 h-36 bg-violet-300 rounded-full animate-float blur-3xl" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-violet-600 p-4 shadow-2xl relative overflow-hidden">
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
          <h1 className="text-3xl font-spiritual font-bold text-white drop-shadow-lg animate-glow">
            ✝️ Christian Guide
          </h1>
          <div></div>
        </div>
      </div>

      {/* Enhanced Animated Cross with 3D effect */}
      <div className="flex justify-center py-12">
        <div className="relative transform-gpu">
          <Cross className="w-20 h-20 text-purple-600 animate-glow transform-gpu" style={{
            filter: 'drop-shadow(0 10px 20px rgba(147,51,234,0.3))',
            animation: 'glow 3s ease-in-out infinite, rotate-3d 12s linear infinite'
          }} />
          <div className="absolute -top-4 -right-4 text-3xl animate-float">✨</div>
          <div className="absolute -bottom-2 -left-2 text-2xl animate-bounce">🕊️</div>
          {/* 3D Floating Christian Elements */}
          <div className="absolute top-2 left-24 text-2xl animate-float opacity-70" style={{ animationDelay: '1s' }}>⛪</div>
          <div className="absolute bottom-4 right-24 text-xl animate-float opacity-60" style={{ animationDelay: '3s' }}>📖</div>
        </div>
      </div>

      {/* Enhanced Chat Area */}
      <div className="max-w-4xl mx-auto p-4 h-96">
        <ScrollArea className="h-full bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-purple-200" ref={scrollAreaRef}>
          {messages.length === 0 ? (
            <div className="text-center text-purple-600 font-spiritual text-xl p-8 animate-fade-in">
              <div className="mb-4 text-4xl">✝️</div>
              <p className="mb-2">भगवान आपको आशीर्वाद दे! मैं आपका आध्यात्मिक साथी हूं।</p>
              <p className="text-lg opacity-80">विश्वास के साथ पूछिए और प्रभु यीशु का मार्गदर्शन पाइए...</p>
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
                      ? 'bg-gradient-to-r from-purple-500 to-violet-500 text-white'
                      : 'bg-white text-gray-800 shadow-xl border-l-4 border-purple-400'
                  }`}
                >
                  <p className="font-spiritual leading-relaxed">{message.text}</p>
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="bg-white p-4 rounded-2xl shadow-lg border-l-4 border-purple-400">
                <div className="animate-pulse text-purple-500 font-spiritual flex items-center">
                  <span>प्रभु यीशु से पूछ रहा हूं</span>
                  <div className="ml-2 flex space-x-1">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </ScrollArea>
      </div>

      {/* Enhanced Input Area */}
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex gap-3 bg-white/90 backdrop-blur-sm rounded-full shadow-2xl p-3 border border-purple-200">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="विश्वास के साथ पूछिए... (हिंदी/English/Hinglish में)"
            className="border-none font-spiritual text-lg focus-visible:ring-0 bg-transparent placeholder:text-purple-400"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button
            onClick={handleSendMessage}
            disabled={isLoading}
            className="rounded-full bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChristianPage;
