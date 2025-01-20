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

export { navigateTo }
