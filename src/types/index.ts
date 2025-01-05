export interface ProduceItem {
	id: number
	name: string
	modelPath: string
	historical: {
		vitaminA: number
		vitaminC: number
		vitaminK: number
		iron: number
		calcium: number
		potassium: number
	}
	modern: {
		vitaminA: number
		vitaminC: number
		vitaminK: number
		iron: number
		calcium: number
		potassium: number
	}
	historicalContext: string
}
