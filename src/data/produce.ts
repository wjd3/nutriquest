import type { ProduceItem } from '@/types'

export const produce: ProduceItem[] = [
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
		modelPath: '/models/grapes.fbx',
		texturePath: '/textures/grapes.jpg',
		modelPositionY: 7.5,
		cameraPositionY: 3,
		cameraZoom: 21.5,
		modelRotationOffset: 10
	},
	{
		name: 'Eggplant',
		modelPath: '/models/eggplant.fbx',
		texturePath: '/textures/eggplant.jpg',
		modelPositionY: 10,
		cameraPositionY: 3,
		cameraZoom: 24
	},
	{
		name: 'Orange',
		modelPath: '/models/orange.fbx',
		texturePath: '/textures/orange.jpg',
		modelPositionY: 6,
		cameraPositionY: 2,
		cameraZoom: 18.5,
		modelRotationOffset: -20
	},
	{
		name: 'Pear',
		modelPath: '/models/pear.fbx',
		texturePath: '/textures/pear.jpg',
		modelPositionY: 10,
		cameraPositionY: 2,
		cameraZoom: 24
	},
	{
		name: 'Tomato',
		modelPath: '/models/tomato.fbx',
		texturePath: '/textures/tomato.jpg',
		modelPositionY: 6.5,
		cameraPositionY: 2,
		cameraZoom: 22
	},
	{
		name: 'Carrot',
		modelPath: '/models/carrot.fbx',
		texturePath: '/textures/carrot.jpg',
		modelPositionY: -3.5,
		cameraPositionY: 2,
		cameraZoom: 31,
		modelRotation: -1.6,
		modelRotationOffset: -55
	},
	{
		name: 'Strawberry',
		modelPath: '/models/strawberry.fbx',
		texturePath: '/textures/strawberry.jpg',
		modelPositionY: 7,
		cameraPositionY: 2,
		cameraZoom: 45
	}
]
