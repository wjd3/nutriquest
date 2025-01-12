import { useEffect } from 'react'
import { gsap } from 'gsap'
import Logo from './Logo'
import { navigate } from 'astro:transitions/client'

const LoadingScreen = () => {
	useEffect(() => {
		const timeline = gsap.timeline()

		const bootScreenSelector = '.boot-screen'
		const bootTextSelector = '.boot-text'
		const bootLogoSelector = '.boot-logo'

		timeline
			.to(bootScreenSelector, {
				height: '100lvh',
				ease: 'power2.out',
				background: '#1c1c1c',
				delay: 0.5,
				duration: 0.2
			})
			.from(bootTextSelector, {
				opacity: 0,
				y: 20,
				duration: 0.5,
				delay: 1,
				stagger: 0.2
			})
			.from(bootLogoSelector, {
				opacity: 0,
				transform: 'translate3d(-12.5%,0,0)',
				duration: 0.5,
				ease: 'power1.out'
			})
			.to(`${bootTextSelector}, ${bootLogoSelector}`, {
				opacity: 0,
				duration: 0.5,
				delay: 2,
				ease: 'power2.out'
			})
			.then(async () => await navigate('/start'))
	}, [])

	return (
		<div className='boot-screen flex flex-col items-center justify-center w-screen h-px bg-black text-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
			<div className='boot-logo mb-4'>
				<Logo />
			</div>

			<div className='text-center'>
				<div className='boot-text text-2xl mb-2 font-pixel'>NUTRI•QUEST</div>
				<div className='boot-text text-sm font-pixel'>© 2024 WJD3</div>
				<div className='boot-text text-sm font-pixel'>LICENSED BY DAVIS REGENERATIVE</div>
			</div>
		</div>
	)
}

export default LoadingScreen
