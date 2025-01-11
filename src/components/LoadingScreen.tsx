import { useEffect } from 'react'
import { gsap } from 'gsap'
import Logo from './Logo'
import { navigate } from 'astro:transitions/client'

const LoadingScreen = () => {
	useEffect(() => {
		const tl = gsap.timeline()

		tl.from('.boot-text', {
			opacity: 0,
			y: 20,
			duration: 0.5,
			delay: 1,
			stagger: 0.2
		})
			.to({}, { duration: 0.5 })
			.from('.splash-logo', {
				opacity: 0,
				transform: 'translate3d(-12.5%,0,0)',
				duration: 0.5,
				ease: 'power1.out'
			})
			.to('.boot-text, .splash-logo', {
				opacity: 0,
				duration: 0.5,
				delay: 2,
				ease: 'power2.out'
			})
			.then(async () => await navigate('/start'))
	}, [])

	return (
		<div className='flex flex-col items-center justify-center h-screen bg-black text-white'>
			<div className='splash-logo mb-4'>
				<Logo />
			</div>

			<div className='text-center'>
				<div className='boot-text text-2xl mb-2 font-pixel'>NUTRI•QUEST</div>
				<div className='boot-text text-sm font-pixel'>© 2024 DAVIS REGENERATIVE</div>
				<div className='boot-text text-sm font-pixel'>LICENSED BY WJD3</div>
			</div>
		</div>
	)
}

export default LoadingScreen
