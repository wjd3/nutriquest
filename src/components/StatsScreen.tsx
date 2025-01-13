import { useEffect, useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { navigate } from 'astro:transitions/client'
import { $isLoaded, $isStarted } from '@/store'
import Screen from '@/components/Screen'
import SelectItem from '@/components/SelectItem'
import type { ProduceItem } from '@/types'
import { soundManager } from '@/services/SoundManager'

interface Props {
	item: ProduceItem
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
		<div className='grid grid-cols-2 md:grid-cols-3 gap-8 p-6'>
			{Object.entries(data).map(([key, value]) => (
				<CircularProgress key={key} value={value} label={key} />
			))}
		</div>
	)
}

export default function StatsScreen({ item }: Props) {
	const [timeframe, setTimeframe] = useState<'historical' | 'modern'>('modern')

	const isReady = useMemo(
		() => $isLoaded.get() && $isStarted.get(),
		[$isLoaded.get(), $isStarted.get()]
	)

	// useEffect(() => {
	// 	if (!$isLoaded.get()) {
	// 		;(async () => await navigate('/'))()
	// 	} else if (!$isStarted.get()) {
	// 		;(async () => await navigate('/start'))()
	// 	}
	// }, [$isLoaded.get(), $isStarted.get()])

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
						className='mb-8'
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}>
						<h1 className='font-pixel text-3xl text-white'>{item.name}</h1>
					</motion.div>

					{/* Main content */}
					<motion.div
						className='flex flex-col lg:flex-row gap-8'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.2 }}>
						{/* 3D Model Section */}
						<div className='lg:w-1/3'>
							<div className='bg-black/20 border border-woodsmoke-800 p-4 h-[400px] flex items-center justify-center'>
								<div className='w-64 h-64'>
									<SelectItem item={item} isSelected={true} />
								</div>
							</div>
						</div>

						{/* Stats Section */}
						<div className='lg:w-2/3 flex flex-col gap-8'>
							{/* Time Period Toggle */}
							<motion.div
								className='bg-black/20 border border-woodsmoke-800 p-4'
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.5, delay: 0.3 }}>
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
							</motion.div>

							{/* Superficial Stats */}
							<motion.div
								className='bg-black/20 border border-woodsmoke-800'
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.5, delay: 0.4 }}>
								<h2 className='font-pixel text-xl p-4 border-b border-woodsmoke-800 text-woodsmoke-400'>
									Superficial
								</h2>
								<StatsView data={superficialData} type='superficial' />
							</motion.div>

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

							{/* Historical Context */}
							<motion.div
								className='bg-black/20 border border-woodsmoke-800 p-6'
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.5, delay: 0.6 }}>
								<p className='text-woodsmoke-300 font-mono text-sm leading-relaxed'>
									{item.historicalContext ||
										'Text about the change in nutrition in food as a result of industrial farming...'}
								</p>
							</motion.div>
						</div>
					</motion.div>

					{/* Back Button */}
					<motion.div
						className='mt-8'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.7 }}>
						<button
							onClick={async () => {
								await soundManager.play('select')
								await navigate('/select')
							}}
							className='font-pixel px-6 py-3 border border-woodsmoke-400 hover:bg-woodsmoke-400 hover:text-black transition-colors duration-300'>
							BACK
						</button>
					</motion.div>
				</>
			)}
		</Screen>
	)
}
