import { useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { $isLoaded, $isStarted } from '@/store'
import Screen from '@/components/Screen'
import StatsItem from '@/components/StatsItem'
import { soundManager } from '@/services/SoundManager'
import { navigateTo } from '@/utils/navigate'
import type { ProduceItem } from '@/types'

interface Props {
	item: ProduceItem
}

const toTitleCase = (str: string): string => {
	// First, handle kebab-case and snake_case by replacing separators with spaces
	const withSpaces = str.replace(/[-_]/g, ' ')

	// Handle camelCase by adding spaces before capital letters
	const separated = withSpaces.replace(/([A-Z])/g, ' $1')

	// Split into words, capitalize first letter of each word, and join
	return separated
		.toLowerCase()
		.split(' ')
		.filter((word) => word.length > 0) // Remove empty strings
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ')
}

// Circular progress component
function CircularProgress({ value, label }: { value: number; label: string }) {
	const circumference = 2 * Math.PI * 40 // radius = 40
	const strokeDashoffset = circumference - (value / 100) * circumference

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
						transition={{ duration: 1, ease: 'easeOut' }}
					/>
				</svg>
				{/* Percentage text */}
				<div className='absolute inset-0 flex items-center justify-center'>
					<span className='font-pixel text-lg'>{value}%</span>
				</div>
			</div>
			<span className='mt-2 text-woodsmoke-400 text-sm'>{label}</span>
		</div>
	)
}

// Stats view component
function StatsView({
	data,
	type
}: {
	data: Record<string, number>
	type: 'superficial' | 'essential'
}) {
	return (
		<div className='grid grid-cols-2 gap-8 p-6'>
			{Object.entries(data).map(([key, value]) => (
				<CircularProgress key={key} value={value} label={toTitleCase(key)} />
			))}
		</div>
	)
}

export default function StatsScreen({ item }: Props) {
	const [isNavigating, setIsNavigating] = useState(false)

	const [timeframe, setTimeframe] = useState<'historical' | 'modern'>('historical')

	const superficialData = {
		size: 65,
		color: 72,
		sugar: 19
	}

	return (
		<Screen className='flex flex-col p-8'>
			{true && (
				// {isReady && (
				<>
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
							<h1 className='h-fit font-pixel text-3xl text-white text-center'>{item.name}</h1>
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
							<StatsView data={superficialData} type='superficial' />
						</motion.div>

						<div className='col-span-3 flex flex-col gap-8'>
							{/* 3D Model */}
							<div className='bg-black/20 border border-woodsmoke-800 h-[400px]'>
								<StatsItem item={item} />
							</div>

							{/* Time Period Toggle */}
							<div className='bg-black/20 border border-woodsmoke-800 p-4'>
								<div className='flex gap-4 justify-center'>
									<button
										onClick={async () => {
											await soundManager.play('toggle')
											setTimeframe('historical')
										}}
										className={`font-pixel px-4 py-2 ${
											timeframe === 'historical'
												? 'bg-woodsmoke-400 text-black'
												: 'text-woodsmoke-400'
										}`}>
										HISTORICAL
									</button>
									<button
										onClick={async () => {
											await soundManager.play('toggle')
											setTimeframe('modern')
										}}
										className={`font-pixel px-4 py-2 ${
											timeframe === 'modern' ? 'bg-woodsmoke-400 text-black' : 'text-woodsmoke-400'
										}`}>
										MODERN
									</button>
								</div>
							</div>

							{/* Historical Context */}
							<div className='bg-black/20 border border-woodsmoke-800 p-6'>
								<p className='text-woodsmoke-300 font-mono text-sm leading-relaxed'>
									{item.historicalContext ||
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
							<StatsView
								data={item[timeframe]?.vitaminA ? item[timeframe]! : {}}
								type='essential'
							/>
						</motion.div>
					</motion.div>
				</>
			)}
		</Screen>
	)
}
