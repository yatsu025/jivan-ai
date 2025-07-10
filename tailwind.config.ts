import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				spiritual: {
					hindu: {
						primary: '#FF6B35',
						secondary: '#FFA726',
						accent: '#FFE0B2'
					},
					muslim: {
						primary: '#2E7D32',
						secondary: '#66BB6A',
						accent: '#C8E6C9'
					},
					sikh: {
						primary: '#1565C0',
						secondary: '#42A5F5',
						accent: '#E3F2FD'
					},
					christian: {
						primary: '#5E72E4',
						secondary: '#8A9BF7',
						accent: '#E8EDFF'
					}
				}
			},
			fontFamily: {
				'spiritual': ['Merriweather', 'serif'],
				'hindi': ['Noto Sans Devanagari', 'sans-serif'],
				'arabic': ['Noto Sans Arabic', 'sans-serif'],
				'punjabi': ['Noto Sans Gurmukhi', 'sans-serif']
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px) rotateX(0deg)' },
					'50%': { transform: 'translateY(-20px) rotateX(10deg)' }
				},
				'glow': {
					'0%, 100%': { 
						opacity: '0.8',
						textShadow: '0 0 20px currentColor'
					},
					'50%': { 
						opacity: '1',
						textShadow: '0 0 30px currentColor, 0 0 40px currentColor'
					}
				},
				'fade-in': {
					'0%': { 
						opacity: '0', 
						transform: 'translateY(30px) scale(0.9)' 
					},
					'100%': { 
						opacity: '1', 
						transform: 'translateY(0) scale(1)' 
					}
				},
				'spin-slow': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'gradient-x': {
					'0%, 100%': {
						'background-size': '200% 200%',
						'background-position': 'left center'
					},
					'50%': {
						'background-size': '200% 200%',
						'background-position': 'right center'
					}
				},
				'text-glow': {
					'0%, 100%': {
						'text-shadow': '0 0 20px rgba(120, 53, 255, 0.5)'
					},
					'50%': {
						'text-shadow': '0 0 30px rgba(120, 53, 255, 0.8), 0 0 40px rgba(59, 130, 246, 0.5)'
					}
				},
				'text-fade': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.7' }
				},
				'button-pulse': {
					'0%, 100%': {
						transform: 'scale(1)',
						boxShadow: '0 20px 40px rgba(120, 53, 255, 0.3)'
					},
					'50%': {
						transform: 'scale(1.02)',
						boxShadow: '0 25px 50px rgba(120, 53, 255, 0.4)'
					}
				},
				'rotate3d': {
					'0%': { transform: 'rotateX(0deg) rotateY(0deg)' },
					'25%': { transform: 'rotateX(90deg) rotateY(90deg)' },
					'50%': { transform: 'rotateX(180deg) rotateY(180deg)' },
					'75%': { transform: 'rotateX(270deg) rotateY(270deg)' },
					'100%': { transform: 'rotateX(360deg) rotateY(360deg)' }
				},
				'rotate-3d': {
					'0%': { transform: 'rotateY(0deg)' },
					'100%': { transform: 'rotateY(360deg)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 4s ease-in-out infinite',
				'glow': 'glow 2s ease-in-out infinite',
				'fade-in': 'fade-in 0.8s ease-out',
				'spin-slow': 'spin-slow 8s linear infinite',
				'gradient-x': 'gradient-x 4s ease infinite',
				'text-glow': 'text-glow 3s ease-in-out infinite',
				'text-fade': 'text-fade 3s ease-in-out infinite',
				'button-pulse': 'button-pulse 4s ease-in-out infinite',
				'rotate3d': 'rotate3d 12s linear infinite',
				'rotate-3d': 'rotate-3d 12s linear infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
