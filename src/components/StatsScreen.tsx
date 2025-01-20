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

interface Props {
	produceItem: ProduceItemType
}

interface CircularProgressProps {
	value: number
	label: string
	unit: string
	maxValue: number
}

function CircularProgress({ value, label, unit, maxValue }: CircularProgressProps) {
	const circumference = 2 * Math.PI * 40
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
						{value.toFixed(['Seed Count', 'Color'].includes(label) ? 0 : 1)}
					</span>
					<span className='font-pixel text-xs text-woodsmoke-400'>{unit}</span>
				</div>
			</div>
			<span className='mt-2 text-woodsmoke-400 text-sm'>{label}</span>
		</div>
	)
}

function StatsView({ data }: { data: ProduceEssentialStats | ProduceSuperficialStats }) {
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
					return (
						<CircularProgress
							key={key}
							value={value}
							label={toTitleCase(key)}
							unit={unit}
							maxValue={max}
						/>
					)
				})}
		</div>
	)
}

export default function StatsScreen({ produceItem }: Props) {
	const { name, historicalContext } = produceItem

	const [isNavigating, setIsNavigating] = useState(false)

	const [timeframe, setTimeframe] = useState<'historical' | 'modern'>('historical')

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

				<div className='flex items-center justify-center'>
					<h1 className='h-fit font-pixel text-3xl text-white text-center'>{name}</h1>
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
					<h2 className='font-pixel text-xl p-4 border-b border-woodsmoke-800 text-woodsmoke-400'>
						Superficial
					</h2>
					<StatsView data={produceItem[timeframe]['superficial']} />
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
								className={`font-pixel px-4 py-2 ${
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
								className={`font-pixel px-4 py-2 ${
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
					<h2 className='font-pixel text-xl p-4 border-b border-woodsmoke-800 text-woodsmoke-400'>
						Essential
					</h2>
					<StatsView data={produceItem[timeframe]['essential']} />
				</motion.div>
			</motion.div>
		</Screen>
	)
}
