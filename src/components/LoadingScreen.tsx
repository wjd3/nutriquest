import { useEffect } from 'react'
import { motion, useAnimate } from 'motion/react'
import Logo from './Logo'
import { navigate } from 'astro:transitions/client'

const LoadingScreen = () => {
	const [scope, animate] = useAnimate()

	useEffect(() => {
		const sequence = async () => {
			// Initial boot screen animation
			await animate(
				scope.current,
				{
					height: '100lvh',
					background: '#1c1c1c'
				},
				{
					duration: 0.2,
					delay: 0.5,
					ease: 'easeOut'
				}
			)

			// Fade in text and logo
			await animate(
				'.boot-text',
				{
					opacity: 1
				},
				{
					duration: 0.5,
					delay: 1,
					ease: 'easeOut'
				}
			)

			await animate(
				'.boot-logo',
				{
					opacity: 1,
					x: 0
				},
				{
					duration: 0.5,
					delay: 0.5,
					ease: 'easeOut'
				}
			)

			// Fade out everything
			await animate(
				'.boot',
				{
					opacity: 0
				},
				{
					duration: 0.5,
					delay: 2,
					ease: 'easeOut'
				}
			)

			// Navigate to start screen
			await navigate('/start')
		}

		;(async () => await sequence())()
	}, [])

	return (
		<main className='bg-black w-screen h-[100lvh]'>
			<motion.div
				ref={scope}
				className='boot-screen flex flex-col items-center justify-center w-screen h-px bg-black text-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
				<motion.div className='boot boot-logo mb-4' initial={{ opacity: 0, x: -10 }}>
					<Logo />
				</motion.div>

				<div className='text-center'>
					<motion.div className='boot boot-text text-2xl mb-2 font-pixel' initial={{ opacity: 0 }}>
						NUTRI•QUEST
					</motion.div>
					<motion.div className='boot boot-text text-sm font-pixel' initial={{ opacity: 0 }}>
						© 2024 WJD3
					</motion.div>
					<motion.div className='boot boot-text text-sm font-pixel' initial={{ opacity: 0 }}>
						LICENSED BY DAVIS REGENERATIVE
					</motion.div>
				</div>
			</motion.div>
		</main>
	)
}

export default LoadingScreen
