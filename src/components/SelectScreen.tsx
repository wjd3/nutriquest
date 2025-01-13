import { $isLoaded, $isStarted } from '@/store'
import { navigate } from 'astro:transitions/client'
import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import Screen from '@/components/Screen'
import Item from '@/components/Item'
import { produce } from '@/data/produce'
import { soundManager } from '@/services/SoundManager'

export default function SelectScreen() {
	// useEffect(() => {
	// 	if (!$isLoaded.get()) {
	// 		;(async () => await navigate('/'))()
	// 	} else if (!$isStarted.get()) {
	// 		;(async () => await navigate('/start'))()
	// 	}
	// }, [$isStarted.get(), $isLoaded.get()])

	const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

	return (
		<Screen className='flex flex-col items-center justify-center p-8'>
			<motion.h1
				className='font-pixel text-3xl mb-8 text-white'
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}>
				SELECT YOUR PRODUCE
			</motion.h1>

			<motion.div
				className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8'
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5, delay: 0.2 }}>
				{produce
					.sort((a, b) => a.name.localeCompare(b.name))
					.map((item, index) => (
						<button
							key={item.name || index}
							onClick={async () => {
								await soundManager.play('toggle')
								setSelectedIndex(index)
							}}
							className='focus:outline-none transform transition-transform hover:scale-105'>
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
					className={`px-6 py-3 font-pixel border ${
						selectedIndex === null
							? 'bg-gray-800 text-gray-500 border-gray-700 cursor-not-allowed'
							: 'bg-woodsmoke-950 text-white border-fern-400 hover:bg-fern-400 hover:text-black'
					} transition-colors duration-300`}
					disabled={selectedIndex === null}>
					ACCEPT
				</button>
			</motion.div>
		</Screen>
	)
}
