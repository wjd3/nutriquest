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
		tl.to('.press-start', {
			opacity: 0.2,
			duration: 0.8,
			ease: 'steps(1)',
			yoyo: true,
			repeat: -1
		})

		gsap.from('.title', {
			scale: 0,
			rotation: 720,
			duration: 1.5,
			ease: 'elastic.out(1, 0.3)',
			delay: 0.5
		})

		// Floating fruits background animation
		gsap.to('.floating-fruit', {
			y: 'random(-20, 20)',
			x: 'random(-20, 20)',
			rotation: 'random(-15, 15)',
			duration: 'random(2, 4)',
			ease: 'sine.inOut',
			repeat: -1,
			yoyo: true,
			stagger: {
				amount: 2,
				from: 'random'
			}
		})
	}, [])

	const handleStart = async () => {
		setIsPressed(true)
		gsap.to('.title', {
			scale: 1.2,
			duration: 0.2,
			yoyo: true,
			repeat: 1
		})
		await soundManager.play('select')
		onStart()
	}

	return (
		<div className='flex flex-col items-center justify-center h-screen bg-black relative overflow-hidden'>
			{/* Floating fruits background */}
			<div className='absolute inset-0 opacity-20'>
				{Array.from({ length: 20 }).map((_, i) => (
					<div
						key={i}
						className='floating-fruit absolute w-16 h-16 text-4xl'
						style={{
							left: `${Math.random() * 100}%`,
							top: `${Math.random() * 100}%`
						}}>
						{['🍎', '🍌', '🥕', '🥦', '🍅'][Math.floor(Math.random() * 5)]}
					</div>
				))}
			</div>

			<div className='relative z-10 text-center'>
				<h1 className='title text-7xl font-bold mb-12 text-n64-yellow z-10 font-title tracking-wider'>
					NUTRI•QUEST
				</h1>
				<div className='press-start-wrapper mt-16'>
					<button
						className={`text-3xl bg-transparent border-4 border-n64-yellow px-12 py-6 rounded-lg 
						focus:outline-none transition-all duration-200 press-start z-10 font-pixel
						text-n64-yellow hover:bg-n64-yellow hover:text-black
						${isPressed ? 'transform scale-95' : ''}`}
						onClick={handleStart}>
						PRESS START
					</button>
				</div>
			</div>
		</div>
	)
}
