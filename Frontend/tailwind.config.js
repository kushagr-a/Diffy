/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'diffy-black': '#0B0E14',
                'diffy-gray': '#151921',
                'diffy-purple': '#A855F7',
                'diffy-green': '#22C55E',
                'diffy-red': '#EF4444',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['Fira Code', 'monospace'],
            },
            boxShadow: {
                'glow-purple': '0 0 20px rgba(168, 85, 247, 0.4)',
                'glow-green': '0 0 20px rgba(34, 197, 94, 0.4)',
            }
        },
    },
    plugins: [],
}
