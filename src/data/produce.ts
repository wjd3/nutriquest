import type { ProduceItem } from '@/types'

export const produce: ProduceItem[] = [
	{
		name: 'Apple',
		modelPath: '/models/apple.fbx',
		texturePath: '/textures/apple.jpg',
		selectView: {
			modelPositionY: 3.75,
			cameraPositionY: 2,
			cameraZoom: 11,
			modelRotationOffset: -6
		},
		statsView: {
			modelPositionY: 3.75,
			cameraPositionY: 2,
			cameraZoom: 11,
			modelRotationOffset: -6
		},
		historical: {
			superficial: {
				size: 7.5,
				color: 60,
				sugar: 10,
				seedCount: 8
			},
			essential: {
				vitaminC: 8,
				iron: 0.2,
				calcium: 8,
				potassium: 195,
				magnesium: 9,
				vitaminB6: 0.041
			}
		},
		modern: {
			superficial: {
				size: 9.4,
				color: 85,
				sugar: 14,
				seedCount: 8
			},
			essential: {
				vitaminC: 6,
				iron: 0.1,
				calcium: 6,
				potassium: 180,
				magnesium: 5,
				vitaminB6: 0.038
			}
		},
		historicalContext:
			'Apples have been cultivated for thousands of years. Historical varieties were often smaller and less sweet than modern cultivars, but contained higher levels of nutrients. Traditional varieties showed more diversity in taste, color, and texture.'
	},
	{
		name: 'Grapes',
		modelPath: '/models/grapes.fbx',
		texturePath: '/textures/grapes.jpg',
		selectView: {
			modelPositionY: 7.5,
			cameraPositionY: 3,
			cameraZoom: 21.5,
			modelRotationOffset: 10
		},
		statsView: {
			modelPositionY: 7.5,
			cameraPositionY: 3,
			cameraZoom: 21.5,
			modelRotationOffset: 10
		},
		historical: {
			superficial: {
				size: 12,
				color: 65,
				sugar: 12,
				seedCount: 4
			},
			essential: {
				vitaminC: 5,
				iron: 0.4,
				calcium: 15,
				potassium: 191,
				magnesium: 10,
				vitaminB6: 0.1
			}
		},
		modern: {
			superficial: {
				size: 15.7,
				color: 90,
				sugar: 16,
				seedCount: 0
			},
			essential: {
				vitaminC: 3,
				iron: 0.2,
				calcium: 10,
				potassium: 180,
				magnesium: 6,
				vitaminB6: 0.08
			}
		},
		historicalContext:
			'Ancient grape varieties were smaller and often contained seeds. While less sweet than modern varieties, they were richer in minerals and antioxidants. Traditional cultivation methods produced more diverse varieties with complex flavor profiles.'
	},
	{
		name: 'Eggplant',
		modelPath: '/models/eggplant.fbx',
		texturePath: '/textures/eggplant.jpg',
		selectView: {
			modelPositionY: 10,
			cameraPositionY: 3,
			cameraZoom: 24
		},
		statsView: { modelPositionY: 10, cameraPositionY: 3, cameraZoom: 24 },
		historical: {
			superficial: {
				size: 11,
				color: 70,
				sugar: 2,
				seedCount: 300
			},
			essential: {
				vitaminC: 5,
				iron: 0.3,
				calcium: 14,
				potassium: 230,
				magnesium: 15,
				vitaminB6: 0.084
			}
		},
		modern: {
			superficial: {
				size: 15.7,
				color: 95,
				sugar: 3,
				seedCount: 250
			},
			essential: {
				vitaminC: 3,
				iron: 0.2,
				calcium: 10,
				potassium: 200,
				magnesium: 9,
				vitaminB6: 0.07
			}
		},
		historicalContext:
			'Historical eggplant varieties showed greater diversity in size and shape. While containing more seeds, they were also richer in minerals and antioxidants. Traditional varieties had slightly bitter flavors that have been bred out of modern cultivars.'
	},
	{
		name: 'Orange',
		modelPath: '/models/orange.fbx',
		texturePath: '/textures/orange.jpg',
		selectView: {
			modelPositionY: 8.5,
			cameraPositionY: 2,
			cameraZoom: 18.5,
			modelRotationOffset: -20
		},
		statsView: {
			modelPositionY: 8.5,
			cameraPositionY: 2,
			cameraZoom: 18.5,
			modelRotationOffset: -20
		},
		historical: {
			superficial: {
				size: 8.5,
				color: 65,
				sugar: 9,
				seedCount: 12
			},
			essential: {
				vitaminC: 70,
				iron: 0.4,
				calcium: 40,
				potassium: 330,
				magnesium: 16,
				vitaminB6: 0.1
			}
		},
		modern: {
			superficial: {
				size: 11.0,
				color: 90,
				sugar: 12,
				seedCount: 6
			},
			essential: {
				vitaminC: 50,
				iron: 0.2,
				calcium: 35,
				potassium: 290,
				magnesium: 10,
				vitaminB6: 0.08
			}
		},
		historicalContext:
			'Historical oranges were smaller and often more tart, with higher seed counts. While less sweet, they contained significantly higher levels of vitamin C and other nutrients. Traditional varieties showed more variation in peel thickness and color.'
	},
	{
		name: 'Pear',
		modelPath: '/models/pear.fbx',
		texturePath: '/textures/pear.jpg',
		selectView: {
			modelPositionY: 10,
			cameraPositionY: 2,
			cameraZoom: 24
		},
		statsView: {
			modelPositionY: 10,
			cameraPositionY: 2,
			cameraZoom: 24
		},
		historical: {
			superficial: {
				size: 9,
				color: 65,
				sugar: 9,
				seedCount: 10
			},
			essential: {
				vitaminC: 7,
				iron: 0.3,
				calcium: 9,
				potassium: 180,
				magnesium: 12,
				vitaminB6: 0.045
			}
		},
		modern: {
			superficial: {
				size: 11.8,
				color: 85,
				sugar: 12,
				seedCount: 8
			},
			essential: {
				vitaminC: 5,
				iron: 0.1,
				calcium: 7,
				potassium: 150,
				magnesium: 8,
				vitaminB6: 0.028
			}
		},
		historicalContext:
			'Historical pear varieties were smaller and more diverse in shape and color. While containing more seeds and being less sweet, they had higher concentrations of minerals and fiber. Traditional varieties were known for their complex flavors and aromatic qualities.'
	},
	{
		name: 'Tomato',
		modelPath: '/models/tomato.fbx',
		texturePath: '/textures/tomato.jpg',
		selectView: {
			modelPositionY: 6.5,
			cameraPositionY: 2,
			cameraZoom: 22
		},
		statsView: {
			modelPositionY: 6.5,
			cameraPositionY: 2,
			cameraZoom: 22
		},
		historical: {
			superficial: {
				size: 6.3,
				color: 65,
				sugar: 3,
				seedCount: 150
			},
			essential: {
				vitaminC: 20,
				iron: 0.5,
				calcium: 11,
				potassium: 290,
				magnesium: 16,
				vitaminB6: 0.13
			}
		},
		modern: {
			superficial: {
				size: 9.4,
				color: 90,
				sugar: 5,
				seedCount: 100
			},
			essential: {
				vitaminC: 15,
				iron: 0.3,
				calcium: 8,
				potassium: 250,
				magnesium: 10,
				vitaminB6: 0.08
			}
		},
		historicalContext:
			'Heritage tomato varieties were typically smaller but more flavorful, with higher nutrient content. They showed great diversity in color, from deep purple to yellow, and had more complex taste profiles. Modern breeding has focused on size, shelf life, and uniform ripening.'
	},
	{
		name: 'Carrot',
		modelPath: '/models/carrot.fbx',
		texturePath: '/textures/carrot.jpg',
		selectView: {
			modelPositionY: -3.5,
			cameraPositionY: 2,
			cameraZoom: 31,
			modelRotation: -1.6,
			modelRotationOffset: -55
		},
		statsView: {
			modelPositionY: -3.5,
			cameraPositionY: 2,
			cameraZoom: 31,
			modelRotation: -1.6,
			modelRotationOffset: -55
		},
		historical: {
			superficial: {
				size: 4.7,
				color: 60,
				sugar: 3,
				seedCount: 0
			},
			essential: {
				vitaminC: 9,
				iron: 0.3,
				calcium: 33,
				potassium: 320,
				magnesium: 12,
				vitaminB6: 0.15
			}
		},
		modern: {
			superficial: {
				size: 7.1,
				color: 95,
				sugar: 5,
				seedCount: 0
			},
			essential: {
				vitaminC: 6,
				iron: 0.2,
				calcium: 25,
				potassium: 270,
				magnesium: 8,
				vitaminB6: 0.1
			}
		},
		historicalContext:
			'Original carrots were purple or white, and much smaller than modern varieties. While less sweet, they contained higher levels of minerals and antioxidants. The familiar orange carrot was developed in the Netherlands during the 17th century.'
	},
	{
		name: 'Strawberry',
		modelPath: '/models/strawberry.fbx',
		texturePath: '/textures/strawberry.jpg',
		selectView: {
			modelPositionY: 7,
			cameraPositionY: 2,
			cameraZoom: 45
		},
		statsView: {
			modelPositionY: 7,
			cameraPositionY: 2,
			cameraZoom: 45
		},
		historical: {
			superficial: {
				size: 2.8,
				color: 70,
				sugar: 4,
				seedCount: 200
			},
			essential: {
				vitaminC: 60,
				iron: 0.4,
				calcium: 16,
				potassium: 160,
				magnesium: 13,
				vitaminB6: 0.05
			}
		},
		modern: {
			superficial: {
				size: 4.7,
				color: 90,
				sugar: 7,
				seedCount: 200
			},
			essential: {
				vitaminC: 45,
				iron: 0.2,
				calcium: 10,
				potassium: 140,
				magnesium: 8,
				vitaminB6: 0.03
			}
		},
		historicalContext:
			'Wild strawberries were much smaller but more intensely flavored than modern varieties. They had higher concentrations of nutrients and aromatic compounds. Modern breeding has focused on size and visual appeal, often at the expense of flavor and nutrient content.'
	}
]
