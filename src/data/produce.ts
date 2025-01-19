import type { ProduceItem } from '@/types'

export const produce: ProduceItem[] = [
	{
		name: 'Apple',
		latinName: 'Malus domestica',
		modelPath: '/models/apple.glb',
		historicalColors: ['#C04A31', '#6B4C33', '#4B5D35'],
		modernColors: ['#FF3B30', '#8B5E3C', '#2D8A3F'],
		historical: {
			superficial: {
				size: 6.8,
				color: 60,
				sugar: 10,
				seedCount: 8
			},
			essential: {
				vitaminC: 9.6,
				iron: 0.48,
				calcium: 11.2,
				potassium: 205,
				magnesium: 11.8,
				vitaminB6: 0.052
			}
		},
		modern: {
			superficial: {
				size: 8.9,
				color: 85,
				sugar: 14,
				seedCount: 8
			},
			essential: {
				vitaminC: 5.4,
				iron: 0.22,
				calcium: 6.8,
				potassium: 158,
				magnesium: 6.9,
				vitaminB6: 0.037
			}
		},
		historicalContext:
			'Apples have been cultivated for thousands of years. Historical varieties were often smaller and less sweet than modern cultivars, but contained higher levels of nutrients. Traditional varieties showed more diversity in taste, color, and texture.'
	},
	{
		name: 'Grapes',
		latinName: 'Vitis vinifera',
		modelPath: '/models/grapes.glb',
		historicalColors: ['#6B365C', '#445A34', '#5D4331'],
		modernColors: ['#9E1B8C', '#39B52A', '#795640'],
		historical: {
			superficial: {
				size: 11.4,
				color: 65,
				sugar: 12,
				seedCount: 4
			},
			essential: {
				vitaminC: 6.8,
				iron: 0.56,
				calcium: 18.4,
				potassium: 198,
				magnesium: 12.4,
				vitaminB6: 0.116
			}
		},
		modern: {
			superficial: {
				size: 15.2,
				color: 90,
				sugar: 16,
				seedCount: 0
			},
			essential: {
				vitaminC: 3.2,
				iron: 0.24,
				calcium: 9.6,
				potassium: 154,
				magnesium: 7.2,
				vitaminB6: 0.074
			}
		},
		historicalContext:
			'Ancient grape varieties were smaller and often contained seeds. While less sweet than modern varieties, they were richer in minerals and antioxidants. Traditional cultivation methods produced more diverse varieties with complex flavor profiles.'
	},
	{
		name: 'Eggplant',
		latinName: 'Solanum melongena',
		modelPath: '/models/eggplant.glb',
		historicalColors: ['#3D4A2F', '#4A3854'],
		modernColors: ['#45B52F', '#6C2F8E'],
		historical: {
			superficial: {
				size: 10.2,
				color: 70,
				sugar: 2,
				seedCount: 300
			},
			essential: {
				vitaminC: 6.8,
				iron: 0.42,
				calcium: 16.8,
				potassium: 242,
				magnesium: 17.6,
				vitaminB6: 0.092
			}
		},
		modern: {
			superficial: {
				size: 15.4,
				color: 95,
				sugar: 3,
				seedCount: 250
			},
			essential: {
				vitaminC: 3.4,
				iron: 0.22,
				calcium: 8.9,
				potassium: 196,
				magnesium: 8.8,
				vitaminB6: 0.068
			}
		},
		historicalContext:
			'Historical eggplant varieties showed greater diversity in size and shape. While containing more seeds, they were also richer in minerals and antioxidants. Traditional varieties had slightly bitter flavors that have been bred out of modern cultivars.'
	},
	{
		name: 'Orange',
		latinName: 'Citrus sinensis',
		modelPath: '/models/orange.glb',
		historicalColors: ['#B85B24', '#3D4A2F', '#6B4C33'],
		modernColors: ['#FF8C1A', '#45B52F', '#8B5E3C'],
		historical: {
			superficial: {
				size: 7.8,
				color: 65,
				sugar: 9,
				seedCount: 12
			},
			essential: {
				vitaminC: 82.4,
				iron: 0.62,
				calcium: 48.6,
				potassium: 342,
				magnesium: 18.8,
				vitaminB6: 0.108
			}
		},
		modern: {
			superficial: {
				size: 10.6,
				color: 90,
				sugar: 12,
				seedCount: 6
			},
			essential: {
				vitaminC: 48.6,
				iron: 0.28,
				calcium: 31.2,
				potassium: 284,
				magnesium: 9.4,
				vitaminB6: 0.072
			}
		},
		historicalContext:
			'Historical oranges were smaller and often more tart, with higher seed counts. While less sweet, they contained significantly higher levels of vitamin C and other nutrients. Traditional varieties showed more variation in peel thickness and color.'
	},
	{
		name: 'Pear',
		latinName: 'Pyrus communis',
		modelPath: '/models/pear.glb',
		historicalColors: ['#4D5A34', '#A89A45', '#614935'],
		modernColors: ['#39B52A', '#D4E225', '#7C5B3D'],
		historical: {
			superficial: {
				size: 8.6,
				color: 65,
				sugar: 9,
				seedCount: 10
			},
			essential: {
				vitaminC: 8.4,
				iron: 0.38,
				calcium: 11.2,
				potassium: 192,
				magnesium: 14.2,
				vitaminB6: 0.052
			}
		},
		modern: {
			superficial: {
				size: 11.4,
				color: 85,
				sugar: 12,
				seedCount: 8
			},
			essential: {
				vitaminC: 4.8,
				iron: 0.18,
				calcium: 6.8,
				potassium: 146,
				magnesium: 7.6,
				vitaminB6: 0.028
			}
		},
		historicalContext:
			'Historical pear varieties were smaller and more diverse in shape and color. While containing more seeds and being less sweet, they had higher concentrations of minerals and fiber. Traditional varieties were known for their complex flavors and aromatic qualities.'
	},
	{
		name: 'Tomato',
		latinName: 'Solanum lycopersicum',
		modelPath: '/models/tomato.glb',
		historicalColors: ['#A93F3F', '#4D5B35'],
		modernColors: ['#FF3333', '#34A843'],
		historical: {
			superficial: {
				size: 5.8,
				color: 65,
				sugar: 3,
				seedCount: 150
			},
			essential: {
				vitaminC: 28.4,
				iron: 0.68,
				calcium: 14.8,
				potassium: 302,
				magnesium: 18.2,
				vitaminB6: 0.142
			}
		},
		modern: {
			superficial: {
				size: 8.9,
				color: 90,
				sugar: 5,
				seedCount: 100
			},
			essential: {
				vitaminC: 16.2,
				iron: 0.32,
				calcium: 7.8,
				potassium: 246,
				magnesium: 9.6,
				vitaminB6: 0.084
			}
		},
		historicalContext:
			'Heritage tomato varieties were typically smaller but more flavorful, with higher nutrient content. They showed great diversity in color, from deep purple to yellow, and had more complex taste profiles. Modern breeding has focused on size, shelf life, and uniform ripening.'
	},
	{
		name: 'Carrot',
		latinName: 'Daucus carota',
		modelPath: '/models/carrot.glb',
		historicalColors: ['#B86538', '#526B3A'],
		modernColors: ['#FF8427', '#2EA846'],
		historical: {
			superficial: {
				size: 4.2,
				color: 60,
				sugar: 3,
				seedCount: 0
			},
			essential: {
				vitaminC: 12.8,
				iron: 0.46,
				calcium: 38.4,
				potassium: 328,
				magnesium: 14.6,
				vitaminB6: 0.168
			}
		},
		modern: {
			superficial: {
				size: 6.8,
				color: 95,
				sugar: 5,
				seedCount: 0
			},
			essential: {
				vitaminC: 6.2,
				iron: 0.24,
				calcium: 24.2,
				potassium: 264,
				magnesium: 7.8,
				vitaminB6: 0.096
			}
		},
		historicalContext:
			'Original carrots were purple or white, and much smaller than modern varieties. While less sweet, they contained higher levels of minerals and antioxidants. The familiar orange carrot was developed in the Netherlands during the 17th century.'
	},
	{
		name: 'Strawberry',
		latinName: 'Fragaria × ananassa',
		modelPath: '/models/strawberry.glb',
		historicalColors: ['#982C2C', '#4A5D36'],
		modernColors: ['#FF1919', '#2D8A3F'],
		historical: {
			superficial: {
				size: 2.4,
				color: 70,
				sugar: 4,
				seedCount: 200
			},
			essential: {
				vitaminC: 68.4,
				iron: 0.52,
				calcium: 19.2,
				potassium: 172,
				magnesium: 15.4,
				vitaminB6: 0.058
			}
		},
		modern: {
			superficial: {
				size: 4.2,
				color: 90,
				sugar: 7,
				seedCount: 200
			},
			essential: {
				vitaminC: 42.6,
				iron: 0.26,
				calcium: 11.4,
				potassium: 138,
				magnesium: 7.6,
				vitaminB6: 0.032
			}
		},
		historicalContext:
			'Wild strawberries were much smaller but more intensely flavored than modern varieties. They had higher concentrations of nutrients and aromatic compounds. Modern breeding has focused on size and visual appeal, often at the expense of flavor and nutrient content.'
	}
]
