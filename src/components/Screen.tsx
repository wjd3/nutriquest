import React from 'react'

interface ScreenProps extends React.HTMLProps<HTMLDivElement> {
	children: React.ReactNode
}

export default function Screen({ children, ...divProps }: ScreenProps) {
	return (
		<main
			{...divProps}
			className={`bg-woodsmoke-950 h-[100lvh] w-screen overflow-hidden text-white ${divProps?.className || ''}`}>
			{children}
		</main>
	)
}
