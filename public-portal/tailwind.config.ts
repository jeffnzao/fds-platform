import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'fds-green': '#10B981',
        'fds-dark': '#1F2937',
        'fds-light': '#F3F4F6',
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      },
    },
  },
  plugins: [],
}
export default config
