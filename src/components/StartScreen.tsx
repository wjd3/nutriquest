import { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { soundManager } from '../services/SoundManager'

interface StartScreenProps {
	onStart: () => void
}

export default function StartScreen({ onStart }: StartScreenProps) {
	const [isPressed, setIsPressed] = useState(false)

	useEffect(() => {
		const tl = gsap.timeline({ repeat: -1 })
		tl.to('.press-start', { opacity: 0, duration: 0.5, ease: 'power2.inOut' })
		tl.to('.press-start', { opacity: 1, duration: 0.5, ease: 'power2.inOut' })

		gsap.from('.title', { y: -50, opacity: 0, duration: 1, ease: 'bounce.out' })
	}, [])

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Enter' || e.key === ' ') {
			handleStart()
		}
	}

	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [])

	const handleStart = async () => {
		setIsPressed(true)
		await soundManager.setVolume(1)
		await soundManager.play('select')
		onStart()
	}

	return (
		<div className='flex flex-col items-center justify-center h-screen bg-n64-blue relative overflow-hidden'>
			<div className='absolute inset-0 z-0'>
				{/* Add rotating fruits/vegetables background here */}
			</div>
			<h1 className='title text-6xl font-bold mb-8 text-n64-yellow z-10 font-title'>NUTRI•QUEST</h1>
			<button
				className={`text-2xl bg-n64-red px-8 py-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-n64-yellow transition-all duration-200 press-start z-10 font-pixel ${
					isPressed ? 'transform scale-95' : ''
				}`}
				onClick={handleStart}>
				PRESS START
			</button>
		</div>
	)
}
