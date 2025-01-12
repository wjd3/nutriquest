/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				woodsmoke: {
					50: '#f6f6f6',
					100: '#e7e7e7',
					200: '#d1d1d1',
					300: '#b0b0b0',
					400: '#888888',
					500: '#6d6d6d',
					600: '#5d5d5d',
					700: '#4f4f4f',
					800: '#454545',
					900: '#3d3d3d',
					950: '#1c1c1c'
				},
				fern: {
					50: '#f5f9f4',
					100: '#e5f3e6',
					200: '#cbe7cc',
					300: '#a3d2a5',
					400: '#68b06c',
					500: '#4f9853',
					600: '#3d7c41',
					700: '#326335',
					800: '#2c4f2e',
					900: '#254228',
					950: '#102312'
				}
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
