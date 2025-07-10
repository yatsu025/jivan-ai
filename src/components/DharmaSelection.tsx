
import { useState } from 'react';
import { Heart, Star, Shield, Cross } from 'lucide-react';

interface DharmaOption {
  id: string;
  name: string;
  nativeName: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  route: string;
  description: string;
}

const dharmaOptions: DharmaOption[] = [
  {
    id: 'hindu',
    name: 'Hindu',
    nativeName: 'हिंदू धर्म',
    icon: <div className="text-5xl transform-gpu animate-spin-slow">🕉️</div>,
    color: 'text-orange-600',
    bgColor: 'bg-gradient-to-br from-orange-100 via-amber-100 to-yellow-100',
    route: '/hindu',
    description: 'सनातन धर्म'
  },
  {
    id: 'muslim',
    name: 'Muslim',
    nativeName: 'اسلام',
    icon: <div className="text-5xl transform-gpu animate-bounce">☪️</div>,
    color: 'text-green-600',
    bgColor: 'bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100',
    route: '/muslim',
    description: 'دین اسلام'
  },
  {
    id: 'sikh',
    name: 'Sikh',
    nativeName: 'ਸਿੱਖ ਧਰਮ',
    icon: <Shield className="w-12 h-12 transform-gpu animate-pulse" />,
    color: 'text-blue-600',
    bgColor: 'bg-gradient-to-br from-blue-100 via-indigo-100 to-cyan-100',
    route: '/sikh',
    description: 'ਗੁਰੂ ਦਾ ਰਾਹ'
  },
  {
    id: 'christian',
    name: 'Christian',
    nativeName: 'ईसाई धर्म',
    icon: <Cross className="w-12 h-12 transform-gpu animate-glow" />,
    color: 'text-purple-600',
    bgColor: 'bg-gradient-to-br from-purple-100 via-violet-100 to-pink-100',
    route: '/christian',
    description: 'मसीही धर्म'
  }
];

interface DharmaSelectionProps {
  onSelect: (dharma: string) => void;
}

const DharmaSelection = ({ onSelect }: DharmaSelectionProps) => {
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-8 relative overflow-hidden">
      {/* 3D Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-20 h-20 bg-purple-300 rounded-full animate-float blur-xl"></div>
        <div className="absolute top-20 right-20 w-16 h-16 bg-blue-300 rounded-full animate-float blur-xl" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-amber-300 rounded-full animate-float blur-xl" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Enhanced Header */}
      <div className="text-center mb-16 animate-fade-in z-10">
        <h2 className="text-5xl md:text-7xl font-spiritual text-gray-800 mb-6 transform-gpu" style={{
          background: 'linear-gradient(45deg, #4F46E5, #7C3AED, #EC4899)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
          animation: 'text-glow 3s ease-in-out infinite'
        }}>
          Choose Your Spiritual Path
        </h2>
        <p className="text-xl md:text-2xl text-gray-600 font-spiritual animate-fade-in" style={{ animationDelay: '0.5s' }}>
          Select your spiritual tradition to begin your divine journey
        </p>
      </div>

      {/* Enhanced Dharma Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl w-full z-10">
        {dharmaOptions.map((option, index) => (
          <div
            key={option.id}
            className={`
              cursor-pointer p-8 rounded-3xl shadow-xl hover:shadow-3xl 
              transform transition-all duration-500 hover:scale-110 hover:-translate-y-2
              ${option.bgColor}
              ${hoveredOption === option.id ? 'animate-glow scale-105' : ''}
              relative overflow-hidden group
            `}
            style={{ 
              animationDelay: `${index * 0.2}s`,
              boxShadow: hoveredOption === option.id ? 
                '0 25px 50px rgba(0,0,0,0.2), 0 0 30px rgba(120,53,255,0.3)' : 
                '0 10px 30px rgba(0,0,0,0.1)'
            }}
            onMouseEnter={() => setHoveredOption(option.id)}
            onMouseLeave={() => setHoveredOption(null)}
            onClick={() => onSelect(option.id)}
          >
            {/* 3D Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Icon with enhanced 3D effect */}
            <div className={`text-center mb-6 ${option.color} flex justify-center items-center h-20 transform-gpu transition-transform duration-300 group-hover:scale-125`}>
              {option.icon}
            </div>
            
            {/* Enhanced Name and Description */}
            <div className="text-center relative z-10">
              <h3 className={`text-2xl font-spiritual font-bold mb-2 ${option.color} transform-gpu transition-all duration-300 group-hover:scale-105`}>
                {option.name}
              </h3>
              <p className={`text-lg ${option.color} opacity-90 font-semibold mb-2 transition-all duration-300 group-hover:opacity-100`}>
                {option.nativeName}
              </p>
              <p className={`text-sm ${option.color} opacity-70 transition-all duration-300 group-hover:opacity-90`}>
                {option.description}
              </p>
            </div>

            {/* Enhanced Hover Effect */}
            {hoveredOption === option.id && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <div className={`w-16 h-1 ${option.color.replace('text-', 'bg-')} rounded-full animate-pulse shadow-lg`}></div>
              </div>
            )}

            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </div>
        ))}
      </div>

      {/* Enhanced Bottom Message */}
      <div className="text-center mt-16 animate-fade-in z-10" style={{ animationDelay: '1s' }}>
        <p className="text-gray-600 font-spiritual text-xl transform-gpu" style={{
          textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
          animation: 'float 4s ease-in-out infinite'
        }}>
          सर्वे भवन्तु सुखिनः - All paths lead to the same divine truth 🙏
        </p>
      </div>
    </div>
  );
};

export default DharmaSelection;
