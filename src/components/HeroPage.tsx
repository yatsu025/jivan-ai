
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Heart } from 'lucide-react';

interface HeroPageProps {
  onGetStarted: () => void;
}

const HeroPage = ({ onGetStarted }: HeroPageProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-blue-50 to-amber-50">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent animate-pulse"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 animate-float">
        <Sparkles className="w-8 h-8 text-purple-300 opacity-60" />
      </div>
      <div className="absolute top-40 right-32 animate-float" style={{ animationDelay: '1s' }}>
        <Heart className="w-6 h-6 text-pink-300 opacity-60" />
      </div>
      <div className="absolute bottom-32 left-32 animate-float" style={{ animationDelay: '2s' }}>
        <Sparkles className="w-10 h-10 text-amber-300 opacity-60" />
      </div>
      <div className="absolute bottom-20 right-20 animate-float" style={{ animationDelay: '0.5s' }}>
        <Heart className="w-8 h-8 text-blue-300 opacity-60" />
      </div>

      {/* Main Content */}
      <div className={`text-center z-10 px-8 max-w-4xl transition-all duration-1000 ${
        isVisible ? 'animate-fade-in' : 'opacity-0'
      }`}>
        {/* Title */}
        <h1 className="text-6xl md:text-8xl font-spiritual font-light text-gray-800 mb-6 leading-tight">
          <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-amber-600 bg-clip-text text-transparent">
            Jivan AI
          </span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl md:text-2xl font-spiritual text-gray-600 mb-4 leading-relaxed">
          A Spiritual AI Companion
        </p>
        
        {/* Description */}
        <p className="text-lg md:text-xl text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed font-spiritual">
          Connect with your faith, share your thoughts, and seek guidance with the help of AI
        </p>
        
        {/* CTA Button */}
        <Button 
          onClick={onGetStarted}
          size="lg"
          className="text-lg px-12 py-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-spiritual"
        >
          Get Started
          <Sparkles className="ml-2 w-5 h-5" />
        </Button>
      </div>

      {/* Bottom Decorative Element */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/50 to-transparent"></div>
    </div>
  );
};

export default HeroPage;
