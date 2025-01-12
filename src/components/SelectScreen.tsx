import { $isLoaded, $isStarted } from '@/store'
import { navigate } from 'astro:transitions/client'
import { useEffect } from 'react'
import Screen from '@/components/Screen'

export default function SelectScreen() {
	useEffect(() => {
		if (!$isLoaded.get()) {
			;(async () => await navigate('/'))()
		} else if (!$isStarted.get()) {
			;(async () => await navigate('/start'))()
		}
	}, [$isStarted.get(), $isLoaded.get()])

	return <Screen>{$isLoaded.get() && $isStarted.get() && <div>Select Screen</div>}</Screen>
}
