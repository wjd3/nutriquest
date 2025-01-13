interface Item {
	modelPath: string
	texturePath?: string
	name: string
	modelPositionY: number
	cameraPositionY: number
	cameraZoom: number
	modelRotationSpeed?: number
	modelRotation?: number
	modelRotationOffset?: number
	historical?: Record<string, number>
	modern?: Record<string, number>
	historicalContext?: string
}

export const produce: Item[] = [
	{
		name: 'Apple',
		modelPath: '/models/apple.fbx',
		texturePath: '/textures/apple.jpg',
		modelPositionY: 3.75,
		cameraPositionY: 2,
		cameraZoom: 11,
		modelRotationOffset: -6,
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
		name: 'Grapes',
		modelPath: '/models/grapes-green.fbx',
		texturePath: '/textures/grapes-green.jpg',
		modelPositionY: 7.5,
		cameraPositionY: 3,
		cameraZoom: 21.5,
		modelRotationOffset: 10
	},
	{
		name: 'Eggplant',
		modelPath: '/models/eggplant.fbx',
		modelPositionY: 10,
		cameraPositionY: 3,
		cameraZoom: 24
	},
	{
		name: 'Orange',
		modelPath: '/models/orange.fbx',
		modelPositionY: 6,
		cameraPositionY: 2,
		cameraZoom: 18.5,
		modelRotationOffset: -20
	},
	{
		name: 'Pear',
		modelPath: '/models/pear.fbx',
		modelPositionY: 10,
		cameraPositionY: 2,
		cameraZoom: 24
	},
	{
		name: 'Tomato',
		modelPath: '/models/tomato.fbx',
		modelPositionY: 6.5,
		cameraPositionY: 2,
		cameraZoom: 22
	},
	{
		name: 'Pumpkin',
		modelPath: '/models/pumpkin.fbx',
		modelPositionY: 6,
		cameraPositionY: 2,
		cameraZoom: 20
	},
	{
		name: 'Strawberry',
		modelPath: '/models/strawberry.fbx',
		modelPositionY: 7,
		cameraPositionY: 2,
		cameraZoom: 45
	}
]
