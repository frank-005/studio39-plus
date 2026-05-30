export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#E9E7DD',
        sage: '#A8B39F',
        sand: '#D5CABC',
        mist: '#D9D9D9',
        charcoal: '#2F2C28',
        neutral: {
          100: '#F2EEE6',
          200: '#E6DDCF',
          300: '#CFC2AD',
          500: '#8B857B',
          700: '#5D574F',
          900: '#2F2C28'
        },
        accent: '#A8B39F'
      },
      fontFamily: {
        sans: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif']
      },
      boxShadow: {
        soft: '0 24px 80px rgba(47, 44, 40, 0.08)'
      }
    }
  },
  plugins: [],
};
