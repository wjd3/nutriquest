import type { HTMLProps, ReactNode } from 'react'

interface ScreenProps extends HTMLProps<HTMLDivElement> {
	children: ReactNode
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
