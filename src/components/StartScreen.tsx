import { useState, useRef, useEffect } from 'react'
import { motion, useAnimate } from 'motion/react'
import { soundManager } from '@/services/SoundManager'
import { navigate } from 'astro:transitions/client'

export default function StartScreen() {
	const [isStarting, setIsStarting] = useState(false)

	const [scope, animate] = useAnimate()
	const startButtonRef = useRef<HTMLButtonElement>(null)
	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			if (event.key === 'Enter' && !isStarting && startButtonRef.current) {
				startButtonRef.current.focus()
				startButtonRef.current.click()
			}
		}

		document.addEventListener('keydown', handleKeyPress)
		return () => {
			document.removeEventListener('keydown', handleKeyPress)
		}
	}, [])

	const handleStart = async () => {
		if (!isStarting) {
			setIsStarting(true)

			await soundManager.play('select')

			await animate(
				scope.current,
				{
					opacity: 0
				},
				{
					duration: 0.5,
					ease: 'easeOut'
				}
			)

			await navigate('/select')
		}
	}

	return (
		<main className='h-screen w-full bg-woodsmoke-950 flex flex-col items-center justify-center overflow-hidden'>
			{/* Main content */}
			<div ref={scope} className='relative flex flex-col items-center gap-8'>
				{/* Title section */}
				<div className='flex flex-col items-center'>
					<h1 className='text-6xl md:text-8xl font-bold text-white tracking-wider mb-2'>
						NUTRI•QUEST
					</h1>
					<div className='text-zinc-400 text-sm tracking-[0.2em] font-mono'>
						NUTRIENT DATABASE SYSTEM v1.0
					</div>
				</div>

				{/* Start button */}
				<motion.div
					animate={{ opacity: [1, 0.2, 1] }}
					transition={{
						duration: 1.6,
						repeat: Infinity,
						ease: 'easeInOut'
					}}>
					<button
						ref={startButtonRef}
						className='focus:outline-none text-white border-white/20 focus:bg-white/10 hover:bg-white/10 tracking-widest text-lg px-8'
						onClick={handleStart}>
						PRESS START
					</button>
				</motion.div>

				{/* Copyright notice */}
				<motion.div
					className='text-center gap-1 fixed bottom-4 left-1/2 -translate-x-1/2'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 1, duration: 1 }}>
					<div className='text-zinc-600 text-xs font-mono'>© 2024 WJD3</div>
					<div className='text-zinc-600 text-xs font-mono'>LICENSED BY DAVIS REGENERATIVE</div>
				</motion.div>
			</div>
		</main>
	)
}
