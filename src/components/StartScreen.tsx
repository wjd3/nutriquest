import { useState, useRef, useEffect } from 'react'
import { motion, useAnimate } from 'motion/react'
import { soundManager } from '@/services/SoundManager'
import Screen from '@/components/Screen'
import { navigateTo } from '@/utils'

export default function StartScreen() {
	const [isStarting, setIsStarting] = useState(false)

	const [scope, animate] = useAnimate()
	const startButtonRef = useRef<HTMLButtonElement>(null)
	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			if (startButtonRef?.current) {
				if (event.key === 'Enter' || event.key === ' ') {
					if (!isStarting) {
						startButtonRef.current.focus()
					}

					startButtonRef.current.click()
				}
			}
		}

		document.addEventListener('keydown', handleKeyPress)
		return () => document.removeEventListener('keydown', handleKeyPress)
	}, [isStarting, startButtonRef])

	const handleStart = async () => {
		setIsStarting(true)

		await soundManager.play('start', async () => {
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

			await navigateTo('/select')
		})
	}

	return (
		<Screen className='flex flex-col items-center justify-center'>
			{/* Main content */}
			<div ref={scope} className='relative flex flex-col items-center gap-4 sm:gap-8'>
				{/* Title section */}
				<div className='flex flex-col items-center'>
					<h1 className='text-5xl sm:text-7xl lg:text-8xl font-bold tracking-wider mb-2'>
						NUTRI•QUEST
					</h1>
					<div className='text-zinc-400 text-xs sm:text-sm lg:text-base tracking-[0.2em] font-mono'>
						NUTRIENT DATABASE SYSTEM v1.0
					</div>
				</div>

				{/* Start button */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 1, duration: 1 }}>
					<motion.button
						animate={{ opacity: [1, 0.2, 1] }}
						transition={{
							duration: 1.6,
							delay: 2,
							repeat: Infinity,
							ease: 'easeInOut'
						}}
						disabled={isStarting}
						ref={startButtonRef}
						className={`focus:outline-none border-white/20 tracking-widest text-sm sm:text-base lg:text-lg px-8 ${!isStarting ? 'focus:bg-white/10 hover:bg-white/10' : ''}`}
						onClick={handleStart}>
						PRESS START
					</motion.button>
				</motion.div>

				{/* Copyright notice */}
				<motion.div
					className='text-center gap-1 fixed bottom-4 left-1/2 -translate-x-1/2'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 1, duration: 1 }}>
					<div className='text-zinc-600 text-xs'>© {new Date().getFullYear()} WJD3</div>
					<div className='text-zinc-600 text-xs'>LICENSED BY DAVIS REGENERATIVE</div>
				</motion.div>
			</div>
		</Screen>
	)
}
