import { useState, useRef } from 'react'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react'
import Screen from '@/components/Screen'
import ProduceItem from '@/components/ProduceItem'
import { soundManager } from '@/services/SoundManager'
import { navigateTo } from '@/utils'
import InfoModal from '@/components/InfoModal'
import type { ProduceItem as ProduceItemType, Timeframe } from '@/types'
import StatsView from './StatsView'

interface StatsScreenProps {
	produceItem: ProduceItemType
}

const StatsScreen = ({ produceItem }: StatsScreenProps) => {
	const { name, latinName, preIndustrialContext, postIndustrialContext } = produceItem

	const [isNavigating, setIsNavigating] = useState(false)
	const [timeframe, setTimeframe] = useState<Timeframe>('historical')
	const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
	const [showFloatingToggle, setShowFloatingToggle] = useState(false)

	// Create ref for the original toggle buttons
	const toggleRef = useRef<HTMLDivElement>(null)

	// Setup scroll tracking
	const { scrollY } = useScroll()

	// Watch scroll position to show/hide floating toggle
	useMotionValueEvent(scrollY, 'change', () => {
		if (!toggleRef.current) return

		const toggleRect = toggleRef.current.getBoundingClientRect()
		setShowFloatingToggle(toggleRect.top < 0)
	})

	return (
		<Screen className='min-h-[100lvh] relative flex flex-col p-4 sm:p-6 md:p-8'>
			{/* Header */}
			<div className='mb-4 sm:mb-6 grid grid-cols-3'>
				{/* Back Button */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.5 }}>
					<button
						disabled={isNavigating}
						onClick={async () => {
							setIsNavigating(true)
							await soundManager.play('select', async () => await navigateTo('/select'))
						}}
						className={`my-auto block font-pixel px-3 sm:px-6 py-2 sm:py-3 border border-woodsmoke-400 transition-colors duration-300 focus:outline-none text-sm sm:text-base ${
							!isNavigating
								? 'hover:bg-woodsmoke-400 hover:text-black focus:bg-woodsmoke-400 focus:text-black'
								: 'bg-woodsmoke-400 text-black'
						}`}>
						{isNavigating ? 'LOADING...' : 'BACK'}
					</button>
				</motion.div>

				<div className='flex items-center justify-center flex-col text-center'>
					<motion.h1
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.1 }}
						className='h-fit font-pixel text-2xl md:text-3xl text-white text-center'>
						{name}
					</motion.h1>
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className='italic text-xs sm:text-base md:text-lg'>
						({latinName})
					</motion.h2>
				</div>

				{/* Info Button */}
				<motion.div
					className='flex justify-end xl:self-center'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.5 }}>
					<button
						onClick={() => setIsInfoModalOpen(true)}
						className='w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-woodsmoke-400 text-woodsmoke-400 flex items-center justify-center hover:bg-woodsmoke-400 hover:text-black transition-colors duration-300'>
						?
					</button>
				</motion.div>
			</div>

			{/* Main content */}
			<motion.div
				className='grid grid-cols-1 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5, delay: 0.2 }}>
				{/* Superficial Stats */}
				<motion.div
					className='bg-black/20 border border-woodsmoke-800 md:col-span-3 xl:col-span-1'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.4 }}>
					<h3 className='font-pixel text-lg sm:text-xl text-center p-3 sm:p-4 border-b border-woodsmoke-800 text-woodsmoke-400'>
						Superficial
					</h3>
					<StatsView
						data={produceItem[timeframe]['superficial']}
						timeframe={timeframe}
						produceItem={produceItem}
					/>
				</motion.div>

				<div className='md:col-span-3 flex flex-col gap-4 sm:gap-6 max-xl:row-start-1'>
					{/* 3D Model */}
					<div className='bg-black/20 border border-woodsmoke-800 h-[300px] sm:h-[350px] md:h-[400px]'>
						<ProduceItem variant='stats' produceItem={produceItem} timeframe={timeframe} />
					</div>

					{/* Original Time Period Toggle */}
					<div ref={toggleRef} className='bg-black/20 border border-woodsmoke-800 p-3 sm:p-4'>
						<div className='flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center'>
							<button
								disabled={timeframe === 'historical'}
								onClick={async () => {
									await soundManager.play('toggle')
									setTimeframe('historical')
								}}
								className={`transition-colors duration-300 font-pixel px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none border border-transparent focus:border-woodsmoke-400 ${
									timeframe === 'historical' ? 'bg-woodsmoke-400 text-black' : 'text-woodsmoke-400'
								}`}>
								PRE-INDUSTRIAL
							</button>
							<button
								disabled={timeframe === 'modern'}
								onClick={async () => {
									await soundManager.play('toggle')
									setTimeframe('modern')
								}}
								className={`transition-colors duration-300 font-pixel px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none border border-transparent focus:border-woodsmoke-400 ${
									timeframe === 'modern' ? 'bg-woodsmoke-400 text-black' : 'text-woodsmoke-400'
								}`}>
								POST-INDUSTRIAL
							</button>
						</div>
					</div>

					{/* Historical Context */}
					<div className='bg-black/20 border border-woodsmoke-800 p-4 sm:p-6 max-xl:hidden'>
						<p className='text-woodsmoke-300 font-mono text-sm leading-relaxed'>
							{timeframe === 'historical' ? preIndustrialContext : postIndustrialContext}
						</p>
					</div>
				</div>

				{/* Essential Stats */}
				<motion.div
					className='bg-black/20 border border-woodsmoke-800 md:col-span-3 xl:col-span-1'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.4 }}>
					<h3 className='font-pixel text-lg sm:text-xl text-center p-3 sm:p-4 border-b border-woodsmoke-800 text-woodsmoke-400'>
						Essential
					</h3>
					<StatsView
						data={produceItem[timeframe]['essential']}
						timeframe={timeframe}
						produceItem={produceItem}
					/>
				</motion.div>

				{/* Historical Context */}
				<div className='bg-black/20 border border-woodsmoke-800 p-4 sm:p-6 xl:hidden sm:col-span-3 max-sm:mb-16'>
					<p className='text-woodsmoke-300 font-mono text-sm leading-relaxed'>
						{timeframe === 'historical' ? preIndustrialContext : postIndustrialContext}
					</p>
				</div>
			</motion.div>

			{/* Floating Time Period Toggle */}
			<AnimatePresence>
				{showFloatingToggle && (
					<motion.div
						initial={{ y: '100%', opacity: 0 }}
						animate={{ y: '0%', opacity: 1 }}
						exit={{ y: '100%', opacity: 0 }}
						transition={{ duration: 0.3 }}
						className='fixed bottom-0 left-0 right-0 bg-black/70 backdrop-blur border-t border-woodsmoke-800 p-3 sm:p-4 z-10'>
						<div className='container mx-auto flex justify-center gap-2 sm:gap-4'>
							<button
								disabled={timeframe === 'historical'}
								onClick={async () => {
									await soundManager.play('toggle')
									setTimeframe('historical')
								}}
								className={`transition-colors duration-300 font-pixel px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none border border-transparent focus:border-woodsmoke-400 ${
									timeframe === 'historical' ? 'bg-woodsmoke-400 text-black' : 'text-woodsmoke-400'
								}`}>
								PRE-INDUSTRIAL
							</button>

							<button
								disabled={timeframe === 'modern'}
								onClick={async () => {
									await soundManager.play('toggle')
									setTimeframe('modern')
								}}
								className={`transition-colors duration-300 font-pixel px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none border border-transparent focus:border-woodsmoke-400 ${
									timeframe === 'modern' ? 'bg-woodsmoke-400 text-black' : 'text-woodsmoke-400'
								}`}>
								POST-INDUSTRIAL
							</button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Info Modal */}
			<InfoModal isOpen={isInfoModalOpen} onClose={() => setIsInfoModalOpen(false)} />
		</Screen>
	)
}

export default StatsScreen
