import CircularProgress from '@/components/CircularProgress'
import { toTitleCase } from '@/utils/text'
import type {
	ProduceItem as ProduceItemType,
	ProduceSuperficialStats,
	ProduceEssentialStats,
	Timeframe
} from '@/types'

interface StatsViewProps {
	data: ProduceEssentialStats | ProduceSuperficialStats
	timeframe: Timeframe
	produceItem: ProduceItemType
}

const StatsView = ({ data, timeframe, produceItem }: StatsViewProps) => {
	const getUnitAndMax = (key: string): { unit: string; max: number } => {
		const units = {
			// Superficial stats
			size: { unit: 'in', max: 20 },
			color: { unit: '%', max: 100 },
			sugar: { unit: 'g', max: 30 },
			seedCount: { unit: 'seeds', max: 300 },

			// Essential stats
			vitaminC: { unit: 'mg', max: 100 },
			iron: { unit: 'mg', max: 5 },
			calcium: { unit: 'mg', max: 50 },
			potassium: { unit: 'mg', max: 500 },
			magnesium: { unit: 'mg', max: 50 },
			vitaminB6: { unit: 'mg', max: 2 }
		}

		return units[key as keyof typeof units] || { unit: '', max: 100 }
	}

	return (
		<div className='grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-2 gap-4 sm:gap-8 p-4 sm:p-6'>
			{Object.entries(data)
				.sort((a, b) => a[0].localeCompare(b[0]))
				.map(([key, value], index) => {
					const { unit, max } = getUnitAndMax(key)

					const isColor = key === 'color'
					const { historicalColors, modernColors, bodyColorIndex } = produceItem
					const colors = {
						historical: historicalColors[bodyColorIndex],
						modern: modernColors[bodyColorIndex]
					}

					return (
						<CircularProgress
							key={key}
							value={value}
							label={toTitleCase(key)}
							unit={unit}
							maxValue={max}
							timeframe={timeframe}
							isColor={isColor}
							colors={isColor ? colors : undefined}
							index={index}
						/>
					)
				})}
		</div>
	)
}

export default StatsView
