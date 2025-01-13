import React from 'react'

interface ScreenProps extends React.HTMLProps<HTMLDivElement> {
	children: React.ReactNode
}

export default function Screen({ children, ...divProps }: ScreenProps) {
	return (
		<main
			{...divProps}
			className={`bg-woodsmoke-950 min-h-[100lvh] w-screen text-white ${divProps?.className || ''}`}>
			{children}
		</main>
	)
}
