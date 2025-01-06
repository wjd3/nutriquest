import React, { useEffect, useState } from 'react'
import { gsap } from 'gsap'

const LoadingScreen = () => {
	const [showLogo, setShowLogo] = useState(false)
	const [showText, setShowText] = useState(false)

	useEffect(() => {
		const tl = gsap.timeline()

		// Initial pause
		tl.to({}, { duration: 0.5 })
			// Fade in logo and text simultaneously
			.add(() => {
				setShowLogo(true)
				setShowText(true)
			})
			.from('.n64-logo', {
				scale: 0,
				rotation: 720,
				duration: 1.5,
				ease: 'power2.out'
			})
			.from(
				'.boot-text',
				{
					opacity: 0,
					y: 20,
					duration: 0.5,
					stagger: 0.2
				},
				'-=1.5'
			)
	}, [])

	return (
		<div className='flex flex-col items-center justify-center h-screen bg-black text-white'>
			{showLogo && (
				<div className='n64-logo mb-8'>
					<svg width='200' height='200' viewBox='0 0 100 100' className='text-n64-red fill-current'>
						<path d='M50 0L100 25V75L50 100L0 75V25L50 0ZM50 10L90 30V70L50 90L10 70V30L50 10Z' />
					</svg>
				</div>
			)}
			{showText && (
				<div className='text-center'>
					<div className='boot-text text-2xl mb-4 font-pixel'>NUTRI•QUEST</div>
					<div className='boot-text text-sm font-pixel'>© 2024 DAVIS REGENERATIVE</div>
					<div className='boot-text text-sm font-pixel'>LICENSED BY DR AI</div>
				</div>
			)}
		</div>
	)
}

export default LoadingScreen
