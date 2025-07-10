import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Home, Shield } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface SikhPageProps {
  onHome: () => void;
}

const SikhPage = ({ onHome }: SikhPageProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const callGeminiAPI = async (prompt: string) => {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyA7RiLN4pXGdCHd66yXmSdiRrlEgxmQykQ`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are a wise Sikh spiritual guide and follower of Guru Nanak. Always respond in the same language as the user's question (Hindi, English, Punjabi, or Hinglish).

For Sikh spiritual guidance, structure your response as:
"गुरु साहब कहते हैं: {relevant Guru Granth Sahib verse in Gurmukhi with translation}
अर्थ: {meaning of the verse in user's language}  
समाधान: {practical solution/guidance based on Guru's teachings}"

Keep responses helpful, respectful, and based on Sikh teachings, Guru Granth Sahib, and Guru's wisdom. User question: ${prompt}`
            }]
          }]
        })
      });

      if (!response.ok) {
        if (response.status === 429) {
          return 'API अभी व्यस्त है। गुरु की कृपा से 2-3 मिनट बाद कोशिश करो। वाहेगुरु जी का खालसा! 🙏';
        }
        throw new Error('API Error');
      }

      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || 'वाहेगुरु जी का खालसा, वाहेगुरु जी की फतह! गुरु की कृपा से मैं आपकी सहायता करूंगा। 🗡️';
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      return 'API में तकनीकी समस्या है। गुरु की कृपा से बाद में कोशिश करो। सत श्री अकाल! 🙏';
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-orange-50 relative overflow-hidden">
      {/* Enhanced 3D Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-14 left-14 w-34 h-34 bg-blue-300 rounded-full animate-float blur-2xl"></div>
        <div className="absolute top-36 right-20 w-26 h-26 bg-indigo-400 rounded-full animate-float blur-xl" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-28 left-1/4 w-40 h-40 bg-orange-300 rounded-full animate-float blur-3xl" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-700 to-orange-500 p-4 shadow-2xl relative overflow-hidden">
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
          <h1 className="text-3xl font-punjabi font-bold text-white drop-shadow-lg animate-glow">
            🗡️ Sikh Guide
          </h1>
          <div></div>
        </div>
      </div>

      {/* Enhanced Animated Khanda with 3D effect */}
      <div className="flex justify-center py-12">
        <div className="relative transform-gpu">
          <Shield className="w-20 h-20 text-blue-600 animate-spin-slow transform-gpu" style={{
            filter: 'drop-shadow(0 10px 20px rgba(37,99,235,0.3))',
            animation: 'spin-slow 8s linear infinite, glow 3s ease-in-out infinite'
          }} />
          <div className="absolute -top-4 -right-4 text-3xl animate-glow">✨</div>
          <div className="absolute -bottom-2 -left-2 text-2xl animate-bounce">⚔️</div>
          {/* 3D Floating Sikh Elements */}
          <div className="absolute top-2 left-24 text-2xl animate-float opacity-70" style={{ animationDelay: '1s' }}>🎵</div>
          <div className="absolute bottom-4 right-24 text-xl animate-float opacity-60" style={{ animationDelay: '3s' }}>🙏</div>
        </div>
      </div>

      {/* Enhanced Chat Area */}
      <div className="max-w-4xl mx-auto p-4 h-96">
        <ScrollArea className="h-full bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-blue-200" ref={scrollAreaRef}>
          {messages.length === 0 ? (
            <div className="text-center text-blue-600 font-punjabi text-xl p-8 animate-fade-in">
              <div className="mb-4 text-4xl">🙏</div>
              <p className="mb-2">सत श्री अकाल! मैं आपका आध्यात्मिक साथी हूं।</p>
              <p className="text-lg opacity-80">गुरु की कृपा नाल सवाल करो और मार्गदर्शन पाओ...</p>
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
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                      : 'bg-white text-gray-800 shadow-xl border-l-4 border-blue-400'
                  }`}
                >
                  <p className="font-punjabi leading-relaxed">{message.text}</p>
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="bg-white p-4 rounded-2xl shadow-lg border-l-4 border-blue-400">
                <div className="animate-pulse text-blue-500 font-punjabi flex items-center">
                  <span>गुरु साहब से पूछ रहा हूं</span>
                  <div className="ml-2 flex space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </ScrollArea>
      </div>

      {/* Enhanced Input Area */}  
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex gap-3 bg-white/90 backdrop-blur-sm rounded-full shadow-2xl p-3 border border-blue-200">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="गुरु की कृपा नाल सवाल करो... (हिंदी/English/Punjabi/Hinglish में)"
            className="border-none font-punjabi text-lg focus-visible:ring-0 bg-transparent placeholder:text-blue-400"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button
            onClick={handleSendMessage}
            disabled={isLoading}
            className="rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SikhPage;
