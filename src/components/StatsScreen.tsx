import { useState } from 'react'
import { motion } from 'motion/react'
import Screen from '@/components/Screen'
import ProduceItem from '@/components/ProduceItem'
import { soundManager } from '@/services/SoundManager'
import { navigateTo, toTitleCase } from '@/utils'
import type {
	ProduceItem as ProduceItemType,
	ProduceSuperficialStats,
	ProduceEssentialStats
} from '@/types'
import InfoModal from '@/components/InfoModal'

type Timeframe = 'historical' | 'modern'

interface StatsScreenProps {
	produceItem: ProduceItemType
}

interface StatsViewProps {
	data: ProduceEssentialStats | ProduceSuperficialStats
	timeframe: Timeframe
	produceItem: ProduceItemType
}

interface CircularProgressProps {
	value: number
	label: string
	unit: string
	maxValue: number
	timeframe: Timeframe
	index: number
	isColor?: boolean
	colors?: { historical: string; modern: string }
}

const CircularProgress = ({
	value,
	label,
	unit,
	maxValue,
	isColor,
	colors,
	timeframe,
	index
}: CircularProgressProps) => {
	const circumference = 2 * Math.PI * 40

	if (isColor && colors) {
		return (
			<div className='flex flex-col items-center'>
				<div className='relative w-24 h-24'>
					<svg className='w-full h-full'>
						{/* White circle border */}
						<circle cx='48' cy='48' r='40' stroke='currentColor' strokeWidth='8' fill='none' />
						{/* Colored circle for the produce color */}
						<motion.circle
							cx='48'
							cy='48'
							r='36'
							animate={timeframe}
							variants={{
								historical: {
									fill: colors.historical
								},
								modern: {
									fill: colors.modern
								}
							}}
						/>
					</svg>
				</div>
				<span className='mt-2 text-woodsmoke-400 text-sm'>{label}</span>
			</div>
		)
	}

	const percentage = (value / maxValue) * 100
	const strokeDashoffset = circumference - (percentage / 100) * circumference

	return (
		<div
			className={`flex flex-col items-center ${index === 4 ? 'max-sm:col-start-auto max-xl:col-start-2' : index === 5 ? 'max-sm:col-start-auto max-xl:col-start-3' : ''}`}>
			<div className='relative w-24 h-24'>
				{/* Background circle */}
				<svg className='w-full h-full -rotate-90'>
					<circle
						cx='48'
						cy='48'
						r='40'
						stroke='#1c1c1c'
						strokeWidth='8'
						fill='none'
						className='opacity-25'
					/>

					{/* Progress circle */}
					<motion.circle
						cx='48'
						cy='48'
						r='40'
						stroke='currentColor'
						strokeWidth='8'
						fill='none'
						initial={{ strokeDashoffset: circumference }}
						animate={{ strokeDashoffset }}
						style={{ strokeDasharray: circumference }}
						transition={{ duration: 0.4, ease: 'easeInOut' }}
					/>
				</svg>

				{/* Value with units */}
				<div className='absolute inset-0 flex flex-col items-center justify-center'>
					<span className='font-pixel text-lg'>
						{value.toFixed(label === 'Seed Count' ? 0 : 1)}
					</span>
					<span className='font-pixel text-sm text-woodsmoke-400'>{unit}</span>
				</div>
			</div>
			<span className='mt-2 text-woodsmoke-400 text-sm text-center'>{label}</span>
		</div>
	)
}

const StatsView = ({ data, timeframe, produceItem }: StatsViewProps) => {
	const getUnitAndMax = (key: string): { unit: string; max: number } => {
		const units = {
			// Superficial stats
			size: { unit: 'in', max: 20 },
			color: { unit: '%', max: 100 },
			sugar: { unit: 'g', max: 30 },
			seedCount: { unit: 'seeds', max: 300 },

			// Essential stats
			vitaminC: { unit: 'mg', max: 100 },
			iron: { unit: 'mg', max: 5 },
			calcium: { unit: 'mg', max: 50 },
			potassium: { unit: 'mg', max: 500 },
			magnesium: { unit: 'mg', max: 50 },
			vitaminB6: { unit: 'mg', max: 2 }
		}

		return units[key as keyof typeof units] || { unit: '', max: 100 }
	}

	return (
		<div className='grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-2 gap-4 sm:gap-8 p-4 sm:p-6'>
			{Object.entries(data)
				.sort((a, b) => a[0].localeCompare(b[0]))
				.map(([key, value], index) => {
					const { unit, max } = getUnitAndMax(key)

					const isColor = key === 'color'
					const { historicalColors, modernColors, bodyColorIndex } = produceItem
					const colors = {
						historical: historicalColors[bodyColorIndex],
						modern: modernColors[bodyColorIndex]
					}

					return (
						<CircularProgress
							key={key}
							value={value}
							label={toTitleCase(key)}
							unit={unit}
							maxValue={max}
							timeframe={timeframe}
							isColor={isColor}
							colors={isColor ? colors : undefined}
							index={index}
						/>
					)
				})}
		</div>
	)
}

const StatsScreen = ({ produceItem }: StatsScreenProps) => {
	const { name, latinName, historicalContext } = produceItem

	const [isNavigating, setIsNavigating] = useState(false)
	const [timeframe, setTimeframe] = useState<Timeframe>('historical')
	const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)

	return (
		<Screen className='relative flex flex-col p-4 sm:p-6 md:p-8'>
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
						BACK
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
						initial={{ opacity: 0, y: -20 }}
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

					{/* Time Period Toggle */}
					<div className='bg-black/20 border border-woodsmoke-800 p-3 sm:p-4'>
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
							{historicalContext}
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
				<div className='bg-black/20 border border-woodsmoke-800 p-4 sm:p-6 xl:hidden'>
					<p className='text-woodsmoke-300 font-mono text-sm leading-relaxed'>
						{historicalContext}
					</p>
				</div>
			</motion.div>

			{/* Info Modal */}
			<InfoModal isOpen={isInfoModalOpen} onClose={() => setIsInfoModalOpen(false)} />
		</Screen>
	)
}

export default StatsScreen
