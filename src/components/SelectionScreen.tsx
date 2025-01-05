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
			y: 50,
			stagger: 0.1,
			duration: 0.5,
			ease: 'power2.out'
		})
	}, [])

	const handleHover = async (item: ProduceItem) => {
		setHoveredItem(item)
		await soundManager.play('hover')
		gsap.to(`#item-${item.id}`, { scale: 1.1, duration: 0.3, ease: 'power2.out' })
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
		<div className='min-h-screen bg-n64-blue p-8'>
			<h1 className='text-4xl font-bold mb-8 text-n64-yellow text-center font-title'>
				NUTRI•QUEST: SELECT A PRODUCE
			</h1>
			<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
				{produce.map((item) => (
					<div
						key={item.id}
						id={`item-${item.id}`}
						className='produce-item bg-n64-gray rounded-lg overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-lg transform hover:-translate-y-1'
						onMouseEnter={() => handleHover(item)}
						onMouseLeave={() => handleHoverExit(item)}
						onClick={() => handleSelect(item)}>
						<div className='p-4'>
							<h2 className='text-2xl font-bold mb-2 text-n64-yellow uppercase'>{item.name}</h2>
							{hoveredItem === item && (
								<div className='text-sm text-white'>
									<p>Vitamin C: {item.modern.vitaminC}mg</p>
									{/* ... other stats */}
								</div>
							)}
						</div>
						<div className='bg-n64-blue-dark p-2 text-white text-center uppercase'>
							Click to compare
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
