import { navigateTo } from '@/utils'
import { useEffect, useState, useRef } from 'react'
import { motion } from 'motion/react'
import Screen from '@/components/Screen'
import ProduceItem from '@/components/ProduceItem'
import { produce } from '@/data/produce'
import { soundManager } from '@/services/SoundManager'

export default function SelectScreen() {
	const [isNavigating, setIsNavigating] = useState(false)

	const [selectedIndex, setSelectedIndex] = useState<number | null>(null) // Start with no items selected
	const [itemsPerRow, setItemsPerRow] = useState<number>(2) // Default to 2 items per row (mobile)

	useEffect(() => {
		const updateItemsPerRow = () => {
			if (window.innerWidth >= 1024) {
				setItemsPerRow(4)
			} else if (window.innerWidth >= 768) {
				setItemsPerRow(3)
			} else {
				setItemsPerRow(2)
			}
		}
		updateItemsPerRow() // Set initial value

		window.addEventListener('resize', updateItemsPerRow) // Update on resize
		return () => window.removeEventListener('resize', updateItemsPerRow) // Cleanup listener
	}, [])

	const acceptButtonRef = useRef<HTMLButtonElement>(null)

	// Handle keyboard navigation
	useEffect(() => {
		const handleKeyDown = async (e: globalThis.KeyboardEvent) => {
			if (
				selectedIndex == null &&
				['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp'].includes(e.key)
			) {
				await soundManager.play('toggle')
				setSelectedIndex(0)
				return
			}

			if (selectedIndex == null) return

			let newIndex = selectedIndex
			const totalItems = produce.length
			switch (e.key) {
				case 'ArrowRight':
					if (selectedIndex === produce.length - 1) {
						newIndex = 0
					} else {
						newIndex = Math.min(selectedIndex + 1, totalItems - 1)
					}

					await soundManager.play('toggle')
					break
				case 'ArrowLeft':
					if (selectedIndex === 0) {
						newIndex = produce.length - 1
					} else {
						newIndex = Math.max(selectedIndex - 1, 0)
					}

					await soundManager.play('toggle')
					break
				case 'ArrowDown':
					const isInFinalRow = (itemIndex: number): boolean => {
						const numberOfRows = Math.ceil(totalItems / itemsPerRow)
						const finalRowStart = (numberOfRows - 1) * itemsPerRow + 1
						return itemIndex >= finalRowStart && itemIndex <= totalItems
					}

					if (!isInFinalRow(selectedIndex + 1)) {
						newIndex = Math.min(selectedIndex + itemsPerRow, totalItems - 1)
						await soundManager.play('toggle')
					}

					break
				case 'ArrowUp':
					if (selectedIndex + 1 > itemsPerRow) {
						newIndex = Math.max(selectedIndex - itemsPerRow, 0)
						await soundManager.play('toggle')
					}

					break
				case 'Enter':
				case ' ': // Space key
					if (acceptButtonRef?.current) {
						acceptButtonRef.current.focus()
						acceptButtonRef.current.click()
					}

					break
				default:
					return
			}

			if (newIndex != selectedIndex) {
				setSelectedIndex(newIndex)
			}
		}

		// Add event listener
		document.addEventListener('keydown', handleKeyDown)
		// Cleanup
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [selectedIndex, itemsPerRow])

	return (
		<Screen className='flex flex-col items-center justify-center p-8'>
			<motion.h1
				className='font-pixel text-3xl mb-8 text-white'
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.2 }}>
				SELECT YOUR PRODUCE
			</motion.h1>
			<motion.div
				className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8'
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5, delay: 0.4 }}>
				{produce
					.sort((a, b) => a.name.localeCompare(b.name))
					.map((produceItem, index) => (
						<button
							disabled={isNavigating}
							key={produceItem.name || index}
							onClick={async () => {
								await soundManager.play('toggle')

								setSelectedIndex(index !== selectedIndex ? index : null)
							}}
							className={`focus:outline-none transform transition-transform ${!isNavigating ? 'hover:scale-105' : ''} ${
								selectedIndex === index ? 'ring-2 ring-woodsmoke-400' : ''
							}`}>
							<ProduceItem
								variant='select'
								produceItem={produceItem}
								isSelected={selectedIndex === index}
							/>
						</button>
					))}
			</motion.div>
			<motion.div
				className='flex justify-center gap-4'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.6 }}>
				<button
					onClick={async () => {
						if (selectedIndex != null) {
							setIsNavigating(true)

							await soundManager.play(
								'select',
								async () =>
									await navigateTo(
										`/stats/${produce[selectedIndex].name.toLowerCase().replace(/\s+/g, '-')}`
									)
							)
						}
					}}
					ref={acceptButtonRef}
					className={`px-6 py-3 font-pixel border ${
						selectedIndex == null
							? 'bg-gray-800 text-gray-500 border-gray-700 cursor-not-allowed'
							: `border-woodsmoke-400 focus:outline-none ${
									!isNavigating
										? 'bg-woodsmoke-950 text-white hover:bg-woodsmoke-400 hover:text-black focus:bg-woodsmoke-400 focus:text-black'
										: 'bg-woodsmoke-400 text-black'
								}`
					} transition-colors duration-300`}
					disabled={isNavigating || selectedIndex == null}>
					ACCEPT
				</button>
			</motion.div>
		</Screen>
	)
}
