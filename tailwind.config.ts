import type { Config } from "tailwindcss";
//import flowbite from "flowbite-react/tailwind";
const flowbite = require("flowbite-react/tailwind");

export default {
	darkMode: "class",
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		flowbite.content(),
	],
	theme: {
		extend: {
			spacing: {
				'15': '3.75rem', // 60px
				'18': '4.5rem',  // 72px
				'22': '5.5rem',  // 88px
				'30': '7.5rem',  // 120px
			},
			fontFamily: {
				"work-sans": ["var(--font-work-sans)"],
			},
			animation: {
				'gradient-x': 'gradient-x 10s linear infinite',
			},
			keyframes: {
				'gradient-x': {
					'0%': {
						'background-size': '200% 100%',
						'background-position': '0% 50%',
					},
					'25%': {
						'background-size': '200% 100%',
						'background-position': '50% 50%',
					},
					'50%': {
						'background-size': '200% 100%',
						'background-position': '100% 50%',
					},
					'75%': {
						'background-size': '200% 100%',
						'background-position': '150% 50%',
					},
					'100%': {
						'background-size': '200% 100%',
						'background-position': '200% 50%',
					},
				},
			},
			colors: {
				'primary-100': '#9500FF',
				'primary-200': '#8600e6',
				'primary-300': '#7700cc',
				'primary-400': '#6800b3',
				'primary-light': '#aa33ff',
				'primary-dark': '#590099',
				'off-white': '#D0DFFF',
				red: '#FF5A5A',
				'dark-1': '#000000',
				'dark-2': '#09090A',
				'dark-3': '#101012',
				'dark-4': '#1F1F22',
				'light-1': '#FFFFFF',
				'light-2': '#EFEFEF',
				'light-3': '#7878A3',
				'light-4': '#5C5C7B',
				'toast-bg': '#1a1a1a',
				'toast-border': '#4a4a4a',
				'toast-text': '#ffffff',
				'toast-close': '#ff0000',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		}
	},
	plugins: [require("tailwindcss-animate"), flowbite.plugin(),],
} satisfies Config;
