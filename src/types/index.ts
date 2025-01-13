export interface ProduceItem {
	modelPath: string
	texturePath?: string
	name: string
	modelPositionY: number
	cameraPositionY: number
	cameraZoom: number
	modelRotationSpeed?: number
	modelRotation?: number
	modelRotationOffset?: number
	historical?: {
		vitaminA: number
		vitaminC: number
		vitaminK: number
		iron: number
		calcium: number
		potassium: number
	}
	modern?: {
		vitaminA: number
		vitaminC: number
		vitaminK: number
		iron: number
		calcium: number
		potassium: number
	}
	historicalContext?: string
}
