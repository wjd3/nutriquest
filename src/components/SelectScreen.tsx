import { navigateTo } from '@/utils'
import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Screen from '@/components/Screen'
import ProduceItem from '@/components/ProduceItem'
import { produce } from '@/data/produce'
import { soundManager } from '@/services/SoundManager'
import InfoModal from '@/components/InfoModal'

export default function SelectScreen() {
	const [isNavigating, setIsNavigating] = useState(false)
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
	const [itemsPerRow, setItemsPerRow] = useState<number>(2)
	const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)

	useEffect(() => {
		const updateItemsPerRow = () => {
			if (window.innerWidth >= 1024) {
				setItemsPerRow(4)
			} else if (window.innerWidth >= 640) {
				setItemsPerRow(3)
			} else {
				setItemsPerRow(2)
			}
		}
		updateItemsPerRow()

		window.addEventListener('resize', updateItemsPerRow)
		return () => window.removeEventListener('resize', updateItemsPerRow)
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
				case ' ':
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

		document.addEventListener('keydown', handleKeyDown)
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [selectedIndex, itemsPerRow])

	return (
		<Screen
			className={`relative flex flex-col items-center justify-center sm:p-6 md:p-8 min-h-0 transition-all duration-300 ${
				selectedIndex != null ? 'pb-24 px-4 pt-6' : 'py-6 px-4'
			}`}
			onClick={async (e) => {
				// Only deselect if clicking directly on the Screen component
				if (e.target === e.currentTarget) {
					if (selectedIndex !== null) {
						await soundManager.play('toggle')
						setSelectedIndex(null)
					}
				}
			}}>
			<motion.h1
				className='font-pixel text-xl sm:text-2xl md:text-3xl mb-6 md:mb-8 text-white'
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.2 }}>
				SELECT YOUR PRODUCE
			</motion.h1>
			<motion.div
				className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 sm:mb-6 md:mb-8'
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5, delay: 0.4 }}
				onClick={async (e) => {
					// Check if we clicked directly on the grid container or an empty grid space
					const clickedElement = e.target as HTMLElement
					const isGridOrEmptySpace =
						clickedElement.classList.contains('grid') ||
						(clickedElement === e.currentTarget && !('button' in (e.target as any)))

					if (isGridOrEmptySpace && selectedIndex !== null) {
						await soundManager.play('toggle')
						setSelectedIndex(null)
					}
				}}>
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
							className={`focus:outline-none transform transition-transform ${
								!isNavigating ? 'hover:scale-105' : ''
							} ${selectedIndex === index ? 'ring-2 ring-woodsmoke-400' : ''}`}>
							<ProduceItem
								variant='select'
								produceItem={produceItem}
								isSelected={selectedIndex === index}
							/>
						</button>
					))}
			</motion.div>

			{/* Desktop accept button - hidden on mobile */}
			<motion.div
				className='hidden sm:flex justify-center'
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
					className={`px-6 py-3 font-pixel text-base border transition-colors duration-300 
						${
							selectedIndex == null
								? 'bg-gray-800 text-gray-500 border-gray-700 cursor-not-allowed'
								: `border-woodsmoke-400 focus:outline-none 
									${
										isNavigating
											? 'bg-woodsmoke-400 text-black'
											: 'bg-woodsmoke-950 text-white hover:bg-woodsmoke-400 hover:text-black focus:bg-woodsmoke-400 focus:text-black'
									}`
						}`}
					disabled={isNavigating || selectedIndex == null}>
					{isNavigating ? 'LOADING...' : 'ACCEPT'}
				</button>
			</motion.div>

			{/* Mobile accept button modal */}
			<AnimatePresence>
				{selectedIndex != null && (
					<motion.div
						initial={{ y: '100%' }}
						animate={{ y: 0 }}
						exit={{ y: '100%' }}
						transition={{ type: 'spring', damping: 25, stiffness: 200 }}
						className='sm:hidden fixed bottom-0 left-0 right-0 bg-woodsmoke-950 border-t border-woodsmoke-400 p-4 flex justify-center items-center'
						style={{ zIndex: 50 }}>
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
							className={`w-full px-4 py-3 font-pixel text-sm border transition-colors duration-300 ${
								!isNavigating
									? 'bg-woodsmoke-950 text-white border-woodsmoke-400 active:bg-woodsmoke-400 active:text-black'
									: 'bg-woodsmoke-400 text-black border-woodsmoke-400'
							}`}
							disabled={isNavigating}>
							{isNavigating ? 'LOADING...' : 'ACCEPT'}
						</button>
					</motion.div>
				)}
			</AnimatePresence>

			<div className='absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8'>
				<motion.button
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.6 }}
					onClick={() => setIsInfoModalOpen(true)}
					className='w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-woodsmoke-400 text-woodsmoke-400 flex items-center justify-center hover:bg-woodsmoke-400 hover:text-black transition-colors duration-300'>
					?
				</motion.button>
			</div>

			<InfoModal isOpen={isInfoModalOpen} onClose={() => setIsInfoModalOpen(false)} />
		</Screen>
	)
}
