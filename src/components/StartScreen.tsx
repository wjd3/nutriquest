import { useState, useRef, useEffect } from 'react'
import { motion, useAnimate } from 'motion/react'
import { soundManager } from '@/services/SoundManager'
import { navigate } from 'astro:transitions/client'
import { $isLoaded, $isStarted } from '@/store'
import Screen from '@/components/Screen'

export default function StartScreen() {
	const [isStarting, setIsStarting] = useState(false)

	const [scope, animate] = useAnimate()
	const startButtonRef = useRef<HTMLButtonElement>(null)
	useEffect(() => {
		if (!$isLoaded.get()) {
			;(async () => await navigate('/'))()
		} else if ($isStarted.get()) {
			;(async () => await navigate('/select'))()
		}

		const handleKeyPress = (event: KeyboardEvent) => {
			if (event.key === 'Enter' && startButtonRef?.current) {
				if (!isStarting) {
					startButtonRef.current.focus()
				}

				startButtonRef.current.click()
			}
		}

		document.addEventListener('keydown', handleKeyPress)
		return () => document.removeEventListener('keydown', handleKeyPress)
	}, [$isLoaded.get(), $isStarted.get(), isStarting, startButtonRef])

	const handleStart = async () => {
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

		$isStarted.set(true)

		await navigate('/select')
	}

	return (
		<Screen className='flex flex-col items-center justify-center'>
			{$isLoaded.get() && (
				<>
					{/* Main content */}
					<div ref={scope} className='relative flex flex-col items-center gap-8'>
						{/* Title section */}
						<div className='flex flex-col items-center'>
							<h1 className='text-6xl md:text-8xl font-bold tracking-wider mb-2'>NUTRI•QUEST</h1>
							<div className='text-zinc-400 text-sm tracking-[0.2em] font-mono'>
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
								className='focus:outline-none border-white/20 focus:bg-white/10 hover:bg-white/10 tracking-widest text-lg px-8'
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
							<div className='text-zinc-600 text-xs font-mono'>
								© {new Date().getFullYear()} WJD3
							</div>
							<div className='text-zinc-600 text-xs font-mono'>LICENSED BY DAVIS REGENERATIVE</div>
						</motion.div>
					</div>
				</>
			)}
		</Screen>
	)
}
