import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface StatBarProps {
	label: string
	value: number
	maxValue: number
}

export default function StatBar({ label, value, maxValue }: StatBarProps) {
	const barRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (barRef.current) {
			gsap.to(barRef.current, {
				width: `${(value / maxValue) * 100}%`,
				duration: 1,
				ease: 'power2.out'
			})
		}
	}, [value, maxValue])

	return (
		<div className='mb-2'>
			<div className='flex justify-between mb-1'>
				<span className='text-sm font-medium'>{label}</span>
				<span className='text-sm font-medium'>
					{value}/{maxValue}
				</span>
			</div>
			<div className='w-full bg-gray-200 rounded-full h-2.5'>
				<div ref={barRef} className='bg-n64-red h-2.5 rounded-full' style={{ width: '0%' }}></div>
			</div>
		</div>
	)
}
