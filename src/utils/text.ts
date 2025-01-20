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

export { toTitleCase }
