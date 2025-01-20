export interface ProduceSuperficialStats {
	size: number // inches (circumference)
	color: number // percentage
	sugar: number // grams
	seedCount: number // count
}

export interface ProduceEssentialStats {
	vitaminC: number // mg
	iron: number // mg
	calcium: number // mg
	potassium: number // mg
	vitaminB6: number // mg
	magnesium: number // mg
}

export interface ProduceStats {
	superficial: ProduceSuperficialStats
	essential: ProduceEssentialStats
}

export interface ProduceView {
	rotate?: {
		x?: number
		y?: number
		z?: number
	}
}

export interface ProduceItem {
	modelPath: string
	name: string
	latinName: string
	historicalColors: string[]
	modernColors: string[]
	statsView?: ProduceView
	selectView?: ProduceView
	historical: ProduceStats
	modern: ProduceStats
	historicalContext: string
}
