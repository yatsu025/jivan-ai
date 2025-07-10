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
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyA7RiLN4pXGdCHd66yXmSdiRrlEgxmQykQ`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are a wise Islamic spiritual guide. Always respond in the same language as the user's question (Hindi, English, Urdu, or Hinglish).

For Islamic spiritual guidance, structure your response as:
"अल्लाह तआला फरमाते हैं: {relevant Quranic verse in Arabic}  
अर्थ: {meaning of the verse in user's language}
समाधान: {practical solution/guidance based on Islamic teachings and Hadith}"

Keep responses helpful, respectful, and based on Islamic teachings, Quran, and Prophet's Hadith. User question: ${prompt}`
            }]
          }]
        })
      });

      if (!response.ok) {
        if (response.status === 429) {
          return 'API अभी व्यस्त है। इंशाअल्लाह 2-3 मिनट बाद कोशिश करें। अल्लाह आपके सब्र को देख रहे हैं। 🤲';
        }
        throw new Error('API Error');
      }

      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || 'इंशाअल्लाह, मैं अल्लाह की मदद से आपकी सहायता करूंगा। कृपया अपना सवाल दोबारा पूछें। ☪️';
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      return 'API में तकनीकी दिक्कत है। इंशाअल्लाह थोड़ी देर बाद कोशिश करें। अल्लाह हाफिज! 🤲';
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
      {/* Enhanced 3D Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-16 left-16 w-36 h-36 bg-green-300 rounded-full animate-float blur-2xl"></div>
        <div className="absolute top-32 right-24 w-28 h-28 bg-emerald-400 rounded-full animate-float blur-xl" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-24 left-1/3 w-44 h-44 bg-teal-300 rounded-full animate-float blur-3xl" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 p-4 shadow-2xl relative overflow-hidden">
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
          <h1 className="text-3xl font-arabic font-bold text-white drop-shadow-lg animate-glow">
            ☪️ Islamic Guide
          </h1>
          <div></div>
        </div>
      </div>

      {/* Enhanced Animated Crescent with 3D effect */}
      <div className="flex justify-center py-12">
        <div className="relative transform-gpu">
          <div className="text-8xl animate-glow transform-gpu" style={{
            animation: 'glow 3s ease-in-out infinite, float 4s ease-in-out infinite',
            filter: 'drop-shadow(0 10px 20px rgba(34,197,94,0.3))'
          }}>☪️</div>
          <div className="absolute -top-4 -right-4 text-3xl animate-float">⭐</div>
          <div className="absolute -bottom-2 -left-2 text-2xl animate-bounce">🌙</div>
          {/* 3D Floating Islamic Elements */}
          <div className="absolute top-2 left-20 text-2xl animate-float opacity-70" style={{ animationDelay: '1s' }}>🕌</div>
          <div className="absolute bottom-4 right-20 text-xl animate-float opacity-60" style={{ animationDelay: '3s' }}>📿</div>
        </div>
      </div>

      {/* Enhanced Chat Area */}
      <div className="max-w-4xl mx-auto p-4 h-96">
        <ScrollArea className="h-full bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-green-200" ref={scrollAreaRef}>
          {messages.length === 0 ? (
            <div className="text-center text-green-600 font-arabic text-xl p-8 animate-fade-in">
              <div className="mb-4 text-4xl">🤲</div>
              <p className="mb-2">अस्सलामु अलैकुम! मैं आपका आध्यात्मिक साथी हूं।</p>
              <p className="text-lg opacity-80">दिल की बात AI से पूछिए और अल्लाह का मार्गदर्शन पाइए...</p>
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
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                      : 'bg-white text-gray-800 shadow-xl border-l-4 border-green-400'
                  }`}
                >
                  <p className="font-arabic leading-relaxed">{message.text}</p>
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="bg-white p-4 rounded-2xl shadow-lg border-l-4 border-green-400">
                <div className="animate-pulse text-green-500 font-arabic flex items-center">
                  <span>अल्लाह से पूछ रहा हूं</span>
                  <div className="ml-2 flex space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </ScrollArea>
      </div>

      {/* Enhanced Input Area */}
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex gap-3 bg-white/90 backdrop-blur-sm rounded-full shadow-2xl p-3 border border-green-200">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="दिल की बात AI से पूछिए... (हिंदी/English/Urdu/Hinglish में)"
            className="border-none font-arabic text-lg focus-visible:ring-0 bg-transparent placeholder:text-green-400"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button
            onClick={handleSendMessage}
            disabled={isLoading}
            className="rounded-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MuslimPage;
