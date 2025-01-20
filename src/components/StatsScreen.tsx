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
	timeframe
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
		<div className='flex flex-col items-center'>
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
					<span className='font-pixel text-xs text-woodsmoke-400'>{unit}</span>
				</div>
			</div>
			<span className='mt-2 text-woodsmoke-400 text-sm'>{label}</span>
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
		<div className='grid grid-cols-2 gap-8 p-6'>
			{Object.entries(data)
				.sort((a, b) => a[0].localeCompare(b[0]))
				.map(([key, value]) => {
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

	return (
		<Screen className='flex flex-col p-8'>
			{/* Header */}
			<motion.div
				className='mb-8 grid grid-cols-3'
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}>
				{/* Back Button */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.7 }}>
					<button
						disabled={isNavigating}
						onClick={async () => {
							setIsNavigating(true)

							await soundManager.play('select', async () => await navigateTo('/select'))
						}}
						className={`font-pixel px-6 py-3 border border-woodsmoke-400 transition-colors duration-300 focus:outline-none ${
							!isNavigating
								? 'hover:bg-woodsmoke-400 hover:text-black focus:bg-woodsmoke-400 focus:text-black'
								: 'bg-woodsmoke-400 text-black'
						}`}>
						BACK
					</button>
				</motion.div>

				<div className='flex items-center justify-center flex-col'>
					<h1 className='h-fit font-pixel text-2xl text-white text-center'>{name}</h1>
					<h2 className='italic text-lg'>({latinName})</h2>
				</div>
			</motion.div>

			{/* Main content */}
			<motion.div
				className='grid grid-cols-5 gap-8'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5, delay: 0.2 }}>
				{/* Superficial Stats */}
				<motion.div
					className='bg-black/20 border border-woodsmoke-800'
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5, delay: 0.4 }}>
					<h3 className='font-pixel text-xl text-center p-4 border-b border-woodsmoke-800 text-woodsmoke-400'>
						Superficial
					</h3>
					<StatsView
						data={produceItem[timeframe]['superficial']}
						timeframe={timeframe}
						produceItem={produceItem}
					/>
				</motion.div>

				<div className='col-span-3 flex flex-col gap-8'>
					{/* 3D Model */}
					<div className='bg-black/20 border border-woodsmoke-800 h-[400px]'>
						<ProduceItem variant='stats' produceItem={produceItem} timeframe={timeframe} />
					</div>

					{/* Time Period Toggle */}
					<div className='bg-black/20 border border-woodsmoke-800 p-4'>
						<div className='flex gap-4 justify-center'>
							<button
								disabled={timeframe === 'historical'}
								onClick={async () => {
									await soundManager.play('toggle')

									setTimeframe('historical')
								}}
								className={`transition-colors duration-300 font-pixel px-4 py-2 focus:outline-none border border-transparent focus:border-woodsmoke-400 ${
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
								className={`transition-colors duration-300 font-pixel px-4 py-2 focus:outline-none border border-transparent focus:border-woodsmoke-400 ${
									timeframe === 'modern' ? 'bg-woodsmoke-400 text-black' : 'text-woodsmoke-400'
								}`}>
								POST-INDUSTRIAL
							</button>
						</div>
					</div>

					{/* Historical Context */}
					<div className='bg-black/20 border border-woodsmoke-800 p-6'>
						<p className='text-woodsmoke-300 font-mono text-sm leading-relaxed'>
							{historicalContext ||
								'Text about the change in nutrition in food as a result of industrial farming...'}
						</p>
					</div>
				</div>

				{/* Essential Stats */}
				<motion.div
					className='bg-black/20 border border-woodsmoke-800'
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5, delay: 0.5 }}>
					<h3 className='font-pixel text-xl text-center p-4 border-b border-woodsmoke-800 text-woodsmoke-400'>
						Essential
					</h3>
					<StatsView
						data={produceItem[timeframe]['essential']}
						timeframe={timeframe}
						produceItem={produceItem}
					/>
				</motion.div>
			</motion.div>
		</Screen>
	)
}

export default StatsScreen
