/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./*.{js,ts,jsx,tsx}", // <--- Questo dice a Tailwind di scansionare tutti i file .tsx nella root
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}