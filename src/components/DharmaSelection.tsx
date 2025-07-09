
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
}

const dharmaOptions: DharmaOption[] = [
  {
    id: 'hindu',
    name: 'Hindu',
    nativeName: 'हिंदू',
    icon: <div className="text-4xl">🕉️</div>,
    color: 'text-orange-600',
    bgColor: 'bg-gradient-to-br from-orange-100 to-amber-100',
    route: '/hindu'
  },
  {
    id: 'muslim',
    name: 'Muslim',
    nativeName: 'مسلم',
    icon: <div className="text-4xl">☪️</div>,
    color: 'text-green-600',
    bgColor: 'bg-gradient-to-br from-green-100 to-emerald-100',
    route: '/muslim'
  },
  {
    id: 'sikh',
    name: 'Sikh',
    nativeName: 'ਸਿੱਖ',
    icon: <Shield className="w-12 h-12" />,
    color: 'text-blue-600',
    bgColor: 'bg-gradient-to-br from-blue-100 to-indigo-100',
    route: '/sikh'
  },
  {
    id: 'christian',
    name: 'Christian',
    nativeName: 'क्रिश्चियन',
    icon: <Cross className="w-12 h-12" />,
    color: 'text-purple-600',
    bgColor: 'bg-gradient-to-br from-purple-100 to-violet-100',
    route: '/christian'
  }
];

interface DharmaSelectionProps {
  onSelect: (dharma: string) => void;
}

const DharmaSelection = ({ onSelect }: DharmaSelectionProps) => {
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-8">
      {/* Header */}
      <div className="text-center mb-16 animate-fade-in">
        <h2 className="text-4xl md:text-6xl font-spiritual text-gray-800 mb-4">
          Choose Your Path
        </h2>
        <p className="text-lg md:text-xl text-gray-600 font-spiritual">
          Select your spiritual tradition to begin your journey
        </p>
      </div>

      {/* Dharma Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl w-full">
        {dharmaOptions.map((option, index) => (
          <div
            key={option.id}
            className={`
              cursor-pointer p-8 rounded-3xl shadow-lg hover:shadow-2xl 
              transform transition-all duration-300 hover:scale-105
              ${option.bgColor}
              ${hoveredOption === option.id ? 'animate-glow' : ''}
            `}
            style={{ animationDelay: `${index * 0.2}s` }}
            onMouseEnter={() => setHoveredOption(option.id)}
            onMouseLeave={() => setHoveredOption(null)}
            onClick={() => onSelect(option.id)}
          >
            {/* Icon */}
            <div className={`text-center mb-6 ${option.color} flex justify-center items-center h-16`}>
              {option.icon}
            </div>
            
            {/* Name */}
            <div className="text-center">
              <h3 className={`text-2xl font-spiritual font-semibold mb-2 ${option.color}`}>
                {option.name}
              </h3>
              <p className={`text-lg ${option.color} opacity-80 font-semibold`}>
                {option.nativeName}
              </p>
            </div>

            {/* Hover Effect */}
            {hoveredOption === option.id && (
              <div className="mt-4 text-center">
                <div className={`inline-block w-12 h-1 ${option.color.replace('text-', 'bg-')} rounded-full animate-pulse`}></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Message */}
      <div className="text-center mt-16 animate-fade-in">
        <p className="text-gray-500 font-spiritual text-lg">
          All paths lead to the same divine truth 🙏
        </p>
      </div>
    </div>
  );
};

export default DharmaSelection;
