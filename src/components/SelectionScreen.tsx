import { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { soundManager } from '../services/SoundManager'
import type { ProduceItem } from '../types'

interface SelectionScreenProps {
	produce: ProduceItem[]
	onSelect: (item: ProduceItem) => void
}

export default function SelectionScreen({ produce, onSelect }: SelectionScreenProps) {
	const [hoveredItem, setHoveredItem] = useState<ProduceItem | null>(null)

	useEffect(() => {
		gsap.from('.produce-item', {
			opacity: 0,
			scale: 0,
			rotation: 720,
			duration: 0.5,
			stagger: {
				grid: [2, 4],
				from: 'center',
				amount: 1
			},
			ease: 'back.out(1.7)'
		})
	}, [])

	const handleHover = async (item: ProduceItem) => {
		setHoveredItem(item)
		await soundManager.play('hover')
		gsap.to(`#item-${item.id}`, {
			scale: 1.1,
			duration: 0.3,
			ease: 'power2.out',
			boxShadow: '0 0 20px rgba(255, 255, 0, 0.5)'
		})
	}

	const handleHoverExit = (item: ProduceItem) => {
		setHoveredItem(null)
		gsap.to(`#item-${item.id}`, { scale: 1, duration: 0.3, ease: 'power2.out' })
	}

	const handleSelect = async (item: ProduceItem) => {
		await soundManager.play('select')
		onSelect(item)
	}

	return (
		<div className='min-h-screen bg-black p-8'>
			<h1 className='text-5xl font-bold mb-12 text-n64-yellow text-center font-title tracking-wider retro-text-shadow'>
				SELECT YOUR PRODUCE
			</h1>
			<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto'>
				{produce.map((item) => (
					<div
						key={item.id}
						id={`item-${item.id}`}
						className='produce-item relative bg-gradient-to-br from-n64-blue-dark to-black 
						rounded-lg overflow-hidden cursor-pointer transition-all duration-300
						transform hover:-translate-y-2 n64-border'
						onMouseEnter={() => handleHover(item)}
						onMouseLeave={() => handleHoverExit(item)}
						onClick={() => handleSelect(item)}>
						<div className='p-6 text-center'>
							<h2 className='text-3xl font-bold mb-4 text-n64-yellow uppercase retro-text-shadow'>
								{item.name}
							</h2>
							{hoveredItem === item && (
								<div className='text-sm text-white space-y-2 animate-fadeIn'>
									<p className='text-n64-yellow'>Vitamin C: {item.modern.vitaminC}mg</p>
									<div className='mt-2 text-xs text-n64-gray-light'>Press A to Select</div>
								</div>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
