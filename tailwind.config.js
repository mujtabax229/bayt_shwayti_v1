/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
        tajawal: ['Tajawal', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#fef7ed',
          100: '#fdecd4',
          200: '#fad5a8',
          300: '#f6b671',
          400: '#f18e38',
          500: '#ee7214',
          600: '#df580a',
          700: '#b9410a',
          800: '#933510',
          900: '#772d10',
        },
        earth: {
          50: '#faf6f1',
          100: '#f0e6d3',
          200: '#e0cba3',
          300: '#d1ab6e',
          400: '#c4934a',
          500: '#b17d37',
          600: '#97642b',
          700: '#7a4d25',
          800: '#653f24',
          900: '#553622',
        },
        olive: {
          50: '#f6f7f0',
          100: '#e8ebd6',
          200: '#d2d7b0',
          300: '#b8bf85',
          400: '#a3ab65',
          500: '#8f974d',
          600: '#71783d',
          700: '#575d33',
          800: '#494d2e',
          900: '#3f4229',
        },
        cream: {
          50: '#fffdf7',
          100: '#fef9ed',
          200: '#fdf0d3',
          300: '#fbe3af',
          400: '#f8d084',
          500: '#f5b95d',
          600: '#e89a3a',
          700: '#c2762d',
          800: '#9d5d28',
          900: '#804c25',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-right': 'slideRight 0.5s ease-out forwards',
        'scale-in': 'scaleIn 0.4s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
