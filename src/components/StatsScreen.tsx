import type { ProduceItem } from '@/types'

interface Props {
	item: ProduceItem
}

export default function StatsScreen({ item }: Props) {
	return <main>{JSON.stringify(item, null, 2)}</main>
}
