/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'n64-blue': '#005499',
				'n64-red': '#C4151C',
				'n64-yellow': '#FDB827',
				'n64-gray': '#4A4A4A',
				'n64-blue-dark': '#003C7D',
				'n64-red-dark': '#8B0000',
				'n64-yellow-dark': '#D4940B'
			},
			fontFamily: {
				sans: ['Chakra Petch', 'sans-serif'],
				title: ['Russo One', 'sans-serif'],
				pixel: ['Press Start 2P', 'monospace']
			}
		}
	},
	plugins: []
}
