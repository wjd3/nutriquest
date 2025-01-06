import { useState, useEffect } from 'react'
import StartScreen from './StartScreen'
import SelectionScreen from './SelectionScreen'
import ProducePage from './ProducePage'
import N64Boot from './LoadingScreen'
import CRTEffect from './CrtEffect'
import { produce } from '../data/produce'
import { soundManager } from '../services/SoundManager'
import type { ProduceItem } from '../types'

export default function Home() {
	const [currentScreen, setCurrentScreen] = useState('loading')
	const [selectedProduce, setSelectedProduce] = useState<ProduceItem | null>(null)
	const [achievements, setAchievements] = useState<Set<number>>(new Set())

	useEffect(() => {
		const timer = setTimeout(() => {
			setCurrentScreen('start')
		}, 4000) // Longer time to show boot sequence

		return () => {
			clearTimeout(timer)
			;(async () => await soundManager.stop())()
		}
	}, [])

	const handleStartClick = () => {
		setCurrentScreen('selection')
	}

	const handleProduceSelect = (item: ProduceItem) => {
		setSelectedProduce(item)
		setCurrentScreen('produce')
		setAchievements((prev) => new Set(prev).add(item.id))
	}

	const handleBackToSelection = () => {
		setSelectedProduce(null)
		setCurrentScreen('selection')
	}

	const allAchievementsUnlocked = achievements.size === produce.length

	if (currentScreen === 'loading') {
		return <N64Boot />
	}

	return (
		<CRTEffect>
			<main className='min-h-screen bg-n64-blue text-white'>
				{currentScreen === 'start' && <StartScreen onStart={handleStartClick} />}
				{currentScreen === 'selection' && (
					<SelectionScreen produce={produce} onSelect={handleProduceSelect} />
				)}
				{currentScreen === 'produce' && selectedProduce && (
					<ProducePage item={selectedProduce} onBack={handleBackToSelection} />
				)}
				{allAchievementsUnlocked && (
					<div className='fixed bottom-4 right-4 bg-n64-yellow text-n64-blue px-4 py-2 rounded-lg animate-bounce n64-border'>
						Achievement Unlocked: NUTRI•QUEST Master!
					</div>
				)}
			</main>
		</CRTEffect>
	)
}
