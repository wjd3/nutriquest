export const produce = [
	{
		id: 1,
		name: 'Apple',
		modelPath: 'apple.glb',
		historical: {
			vitaminA: 30,
			vitaminC: 40,
			vitaminK: 20,
			iron: 10,
			calcium: 15,
			potassium: 50
		},
		modern: {
			vitaminA: 35,
			vitaminC: 60,
			vitaminK: 25,
			iron: 12,
			calcium: 20,
			potassium: 70
		},
		historicalContext:
			'Apples have been cultivated for thousands of years. Historical varieties were often smaller and less sweet than modern cultivars. The development of modern apple varieties has focused on increasing size, sweetness, and disease resistance.'
	},
	{
		id: 2,
		name: 'Tomato',
		modelPath: 'tomato.glb',
		historical: {
			vitaminA: 40,
			vitaminC: 50,
			vitaminK: 30,
			iron: 15,
			calcium: 20,
			potassium: 60
		},
		modern: {
			vitaminA: 45,
			vitaminC: 70,
			vitaminK: 35,
			iron: 18,
			calcium: 25,
			potassium: 80
		},
		historicalContext:
			'Tomatoes were first domesticated in Mexico around 7,000 years ago. Historical tomatoes were much smaller and often yellow or green. Modern breeding has led to larger, redder tomatoes with increased lycopene content.'
	}
	// Add more produce items as needed
]
