import { $isLoaded, $isStarted } from '@/store'

const navigateTo = async (path: string): Promise<void> => {
	try {
		// Validate path
		if (!path.startsWith('/')) {
			throw new Error('Path must start with a forward slash')
		}

		// Push new state to history
		window.location.pathname = path
		// window.history.pushState({}, '', path)

		// Dispatch navigation event
		window.dispatchEvent(new PopStateEvent('popstate'))
	} catch (error) {
		console.error('Navigation failed:', error)
		throw error
	}
}

const redirectFrom = async (page: 'loading' | 'start' | 'select' | 'stats') => {
	const isLoaded = $isLoaded.get()
	const isStarted = $isStarted.get()

	switch (page) {
		case 'loading':
			if (isLoaded) {
				if (!isStarted) {
					await navigateTo('/start')
				} else {
					await navigateTo('/select')
				}
			}

			break

		case 'start':
			if (!isLoaded) {
				await navigateTo('/')
			} else if (isStarted) {
				await navigateTo('/select')
			}

			break

		case 'select':
		case 'stats':
			if (!isLoaded) {
				await navigateTo('/')
			} else if (!isStarted) {
				await navigateTo('/start')
			}

			break

		default:
			return
	}
}

export { navigateTo, redirectFrom }
