interface ProduceView {
	modelPositionY: number
	cameraPositionY: number
	cameraZoom: number
	modelRotationSpeed?: number
	modelRotation?: number
	modelRotationOffset?: number
}

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

export interface ProduceItem {
	modelPath: string
	texturePath: string
	name: string
	selectView: ProduceView
	statsView: ProduceView
	historical: ProduceStats
	modern: ProduceStats
	historicalContext: string
}
