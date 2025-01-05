/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'n64-blue': '#00549F',
				'n64-red': '#E60012',
				'n64-yellow': '#FFC300',
				'n64-gray': '#4A4A4A',
				'n64-blue-dark': '#003C7D',
				'n64-red-dark': '#B8000E',
				'n64-yellow-dark': '#D6A100'
			},
			fontFamily: {
				sans: ['var(--font-chakra-petch)', 'sans-serif'],
				title: ['var(--font-russo-one)', 'sans-serif'],
				pixel: ['var(--font-press-start-2p)', 'monospace']
			}
		}
	},
	plugins: []
}
