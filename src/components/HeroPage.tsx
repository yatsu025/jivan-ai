
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Heart } from 'lucide-react';

interface HeroPageProps {
  onGetStarted: () => void;
}

const HeroPage = ({ onGetStarted }: HeroPageProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  
  const spiritualTexts = [
    "Connect with your faith",
    "Share your thoughts", 
    "Seek divine guidance",
    "Find inner peace"
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % spiritualTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Enhanced 3D Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-blue-50 to-amber-50">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent animate-pulse"></div>
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(circle at 30% 20%, rgba(120, 53, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(255, 193, 7, 0.1) 0%, transparent 50%)',
          animation: 'float 8s ease-in-out infinite'
        }}></div>
      </div>
      
      {/* Enhanced Floating 3D Elements */}
      <div className="absolute top-20 left-20 animate-float transform-gpu" style={{ 
        transform: 'rotateX(20deg) rotateY(20deg)',
        animation: 'float 6s ease-in-out infinite, rotate3d 12s linear infinite'
      }}>
        <Sparkles className="w-12 h-12 text-purple-400 opacity-80 drop-shadow-lg" />
      </div>
      <div className="absolute top-40 right-32 animate-float transform-gpu" style={{ 
        animationDelay: '1s',
        transform: 'rotateX(-15deg) rotateY(30deg)',
        animation: 'float 5s ease-in-out infinite 1s, rotate3d 10s linear infinite 1s'
      }}>
        <Heart className="w-8 h-8 text-pink-400 opacity-80 drop-shadow-lg" />
      </div>
      <div className="absolute bottom-32 left-32 animate-float transform-gpu" style={{ 
        animationDelay: '2s',
        transform: 'rotateX(25deg) rotateY(-20deg)',
        animation: 'float 7s ease-in-out infinite 2s, rotate3d 15s linear infinite 2s'
      }}>
        <Sparkles className="w-14 h-14 text-amber-400 opacity-80 drop-shadow-lg" />
      </div>
      <div className="absolute bottom-20 right-20 animate-float transform-gpu" style={{ 
        animationDelay: '0.5s',
        transform: 'rotateX(-20deg) rotateY(25deg)',
        animation: 'float 6s ease-in-out infinite 0.5s, rotate3d 8s linear infinite 0.5s'
      }}>
        <Heart className="w-10 h-10 text-blue-400 opacity-80 drop-shadow-lg" />
      </div>

      {/* Main Content with Enhanced Animations */}
      <div className={`text-center z-10 px-8 max-w-4xl transition-all duration-1000 transform-gpu ${
        isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-10'
      }`}>
        {/* Enhanced Animated Title */}
        <h1 className="text-6xl md:text-8xl font-spiritual font-light text-gray-800 mb-6 leading-tight transform-gpu">
          <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-amber-600 bg-clip-text text-transparent animate-gradient-x drop-shadow-2xl" style={{
            backgroundSize: '200% 200%',
            animation: 'gradient-x 4s ease infinite, text-glow 3s ease-in-out infinite'
          }}>
            Jivan AI
          </span>
        </h1>
        
        {/* Enhanced Subtitle with 3D effect */}
        <p className="text-xl md:text-2xl font-spiritual text-gray-600 mb-4 leading-relaxed transform-gpu" style={{
          textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
          animation: 'float 4s ease-in-out infinite'
        }}>
          A Spiritual AI Companion
        </p>
        
        {/* Animated Rotating Description */}
        <div className="h-16 flex items-center justify-center mb-8">
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-spiritual transform-gpu transition-all duration-1000" style={{
            animation: 'text-fade 3s ease-in-out infinite',
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
          }}>
            {spiritualTexts[textIndex]} with the help of AI
          </p>
        </div>
        
        {/* Enhanced CTA Button with 3D effect */}
        <Button 
          onClick={onGetStarted}
          size="lg"
          className="text-lg px-12 py-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-500 font-spiritual relative overflow-hidden group"
          style={{
            boxShadow: '0 20px 40px rgba(120, 53, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            animation: 'button-pulse 4s ease-in-out infinite'
          }}
        >
          <span className="relative z-10 flex items-center">
            Get Started
            <Sparkles className="ml-2 w-5 h-5 animate-spin" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </Button>
      </div>

      {/* Enhanced Bottom Decorative Element with 3D perspective */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/60 to-transparent transform-gpu" style={{
        background: 'linear-gradient(to top, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
        backdropFilter: 'blur(2px)'
      }}></div>
    </div>
  );
};

export default HeroPage;
