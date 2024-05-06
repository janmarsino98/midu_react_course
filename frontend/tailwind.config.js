/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-black': '#000000',
        'gray-username': 'rgb(113, 118, 123)',
        'blue-main': 'rgb(29, 155, 240)',
        'gray-main-borders': 'rgb(255, 255, 255, 0.2)',
        'bg-disabled-button': 'rgb(29, 155, 240, 0.5)',
        'disabled-button': 'rgb(255, 255, 255, 0.5)',
        'tweet-feed-light-gray': 'rgb(113, 118, 123)',
        'card-hover-bg': 'rgba(255, 255, 255, 0.03)',
        'searchbar-bg': 'rgb(32, 35, 39)',
        'dark-gray': '#16181C',
        'light-gray': '#71767B',
        'custom-white': '#FFFFFF',
        'transparent-white': 'rgba(255, 255, 255, 0.2)',
        'light-red': 'rgba(255, 0, 0, 0.339)',
        'bright-blue': '#1D9BF0',
        'transparent-blue': 'rgba(29, 155, 240, 0.5)',
        'lighter-gray': 'rgba(87, 85, 85, 0.39)'
      },
      fontSize: {
        'tweet-message': '20px',
        'icon-size': '30px',
        'tweet': '15px',
      },
      boxShadow: {
        'searchbar-results': '0 0 15px rgba(255, 255, 255, 0.2)',
      },
      fontFamily: {
        'seoge': ['segoe ui']
      }
    },
  },
  plugins: [],
}
