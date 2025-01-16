interface ProduceView {
	modelPositionY: number
	cameraPositionY: number
	cameraZoom: number
	modelRotationSpeed?: number
	modelRotation?: number
	modelRotationOffset?: number
}

export interface ProduceSuperficialStats {
	size: number
	color: number
	sugar: number
	seedCount: number
}

export interface ProduceEssentialStats {
	vitaminC: number
	iron: number
	calcium: number
	potassium: number
	vitaminB6: number
	magnesium: number
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
