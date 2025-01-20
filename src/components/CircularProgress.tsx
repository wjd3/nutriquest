import { motion } from 'motion/react'
import type { Timeframe } from '@/types'

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

export default CircularProgress
