import { $isLoaded, $isStarted } from '@/store'
import { navigate } from 'astro:transitions/client'
import { useEffect, useState, useRef, useMemo } from 'react'
import { motion } from 'motion/react'
import Screen from '@/components/Screen'
import Item from '@/components/Item'
import { produce } from '@/data/produce'
import { soundManager } from '@/services/SoundManager'

export default function SelectScreen() {
	const [selectedIndex, setSelectedIndex] = useState<number | null>(0) // Start with first item selected
	const [itemsPerRow, setItemsPerRow] = useState<number>(4) // Default to 4 items per row

	const isReady = useMemo(
		() => $isLoaded.get() && $isStarted.get(),
		[$isLoaded.get(), $isStarted.get()]
	)

	useEffect(() => {
		if (!$isLoaded.get()) {
			;(async () => await navigate('/'))()
		} else if (!$isStarted.get()) {
			;(async () => await navigate('/start'))()
		}
	}, [$isLoaded.get(), $isStarted.get()])

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
		return () => {
			window.removeEventListener('resize', updateItemsPerRow) // Cleanup listener
		}
	}, [])

	const acceptButtonRef = useRef<HTMLButtonElement>(null)

	// Handle keyboard navigation
	useEffect(() => {
		const handleKeyDown = async (e: globalThis.KeyboardEvent) => {
			if (selectedIndex === null) return

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
		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [selectedIndex, itemsPerRow])

	return (
		<Screen className='flex flex-col items-center justify-center p-8'>
			{isReady && (
				<>
					{' '}
					<motion.h1
						className='font-pixel text-3xl mb-8 text-white'
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}>
						SELECT YOUR PRODUCE
					</motion.h1>
					<motion.div
						className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8'
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.5, delay: 0.2 }}>
						{produce
							.sort((a, b) => a.name.localeCompare(b.name))
							.map((item, index) => (
								<button
									key={item.name || index}
									onClick={async () => {
										if (index != selectedIndex) {
											await soundManager.play('toggle')
											setSelectedIndex(index)
										}
									}}
									className={`focus:outline-none transform transition-transform hover:scale-105 ${
										selectedIndex === index ? 'ring-2 ring-woodsmoke-400' : ''
									}`}>
									<Item item={item} isSelected={selectedIndex === index} />
								</button>
							))}
					</motion.div>
					<motion.div
						className='flex justify-center gap-4'
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.4 }}>
						<button
							onClick={async () => {
								if (selectedIndex != null) {
									await soundManager.play('select')
									await navigate(
										`/stats/${produce[selectedIndex].name.toLowerCase().replace(/\s+/g, '-')}`
									)
								}
							}}
							ref={acceptButtonRef}
							className={`px-6 py-3 font-pixel border ${
								selectedIndex == null
									? 'bg-gray-800 text-gray-500 border-gray-700 cursor-not-allowed'
									: 'bg-woodsmoke-950 text-white border-woodsmoke-400 hover:bg-woodsmoke-400 hover:text-black focus:outline-none focus:bg-woodsmoke-400 focus:text-black'
							} transition-colors duration-300`}
							disabled={selectedIndex == null}>
							ACCEPT
						</button>
					</motion.div>
				</>
			)}
		</Screen>
	)
}
