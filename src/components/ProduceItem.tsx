import { useRef } from 'react'
import { Canvas, useFrame, type Euler } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { useSpring, animated } from '@react-spring/three'
import { Mesh, DoubleSide, type Group } from 'three'
import type { ProduceItem as ProduceItemType, ProduceView } from '@/types'

type Variant = 'select' | 'stats'

interface ProduceItemProps {
	produceItem: ProduceItemType
	isSelected?: boolean
	timeframe?: 'historical' | 'modern'
	variant: Variant
}

const ProduceItemMesh = ({
	node,
	colors,
	timeframe,
	views,
	variant
}: {
	node: Mesh<any, any, any>
	colors: { historical: string; modern: string }
	timeframe: string
	variant: Variant
	views: {
		select: ProduceView | undefined
		stats: ProduceView | undefined
	}
}) => {
	const { color } = useSpring({
		color: timeframe === 'modern' ? colors.modern : colors.historical
	})

	const rotation = [
		views[variant]?.rotate?.x || 0,
		views[variant]?.rotate?.y || 0,
		views[variant]?.rotate?.z || 0
	] as Euler

	return (
		<animated.mesh geometry={node.geometry} rotation={rotation} position={[0, -0.25, 0]}>
			<animated.meshStandardMaterial
				attach='material'
				side={DoubleSide}
				roughness={0.7}
				metalness={0.1}
				color={color}
			/>
		</animated.mesh>
	)
}

const ProduceItemModel = ({
	produceItem,
	variant,
	isSelected = false,
	timeframe = 'historical'
}: ProduceItemProps) => {
	const { modelPath, historicalColors, modernColors } = produceItem

	const pivotRef = useRef<Group>(null)

	const { nodes } = useGLTF(modelPath)

	const { scale } = useSpring({
		scale: timeframe === 'modern' || isSelected ? 1 : 0.75
	})

	// Rotate the model
	useFrame((_, delta) => {
		if (pivotRef.current) {
			const rotationSpeed = 0.25
			pivotRef.current.rotation.y += delta * rotationSpeed
		}
	})

	const views = {
		select: produceItem.selectView,
		stats: produceItem.statsView
	}

	return (
		<animated.group ref={pivotRef} scale={scale} dispose={null}>
			{Object.values(nodes)
				.filter((node) => node instanceof Mesh)
				.map((node, index) => {
					const colors = {
						historical: historicalColors[index],
						modern: modernColors[index]
					}

					return (
						<ProduceItemMesh
							node={node}
							colors={colors}
							views={views}
							timeframe={timeframe}
							variant={variant}
							key={node.uuid || index}
						/>
					)
				})}
		</animated.group>
	)
}

const ProduceItemCanvas = ({ produceItem, isSelected, timeframe, variant }: ProduceItemProps) => {
	return (
		<Canvas
			camera={{
				fov: 45,
				near: 0.1,
				far: 1000,
				position: [0, 0.5, 4.5]
			}}>
			{/* Ambient light */}
			<ambientLight intensity={1} />

			{/* Main directional light */}
			<directionalLight position={[5, 5, 5]} intensity={1.5} castShadow>
				<orthographicCamera attach='shadow-camera' args={[-10, 10, 10, -10]} />
			</directionalLight>

			{/* Fill light */}
			<directionalLight position={[-5, -5, -5]} intensity={0.5} />

			<ProduceItemModel
				variant={variant}
				produceItem={produceItem}
				isSelected={isSelected}
				timeframe={timeframe}
			/>
		</Canvas>
	)
}

const ProduceItem = ({ produceItem, variant, isSelected, timeframe }: ProduceItemProps) => {
	if (variant === 'select') {
		return (
			<div className='relative'>
				<div
					className={`w-48 h-48 canvas-container transition-colors duration-300 ${
						isSelected
							? 'border-2 border-woodsmoke-600 bg-black/25'
							: 'border border-woodsmoke-700 bg-black/15'
					}`}>
					<ProduceItemCanvas
						variant={variant}
						produceItem={produceItem}
						isSelected={isSelected}
						timeframe={timeframe}
					/>
				</div>

				<div className='absolute bottom-2 left-0 right-0 text-center'>
					<span className='font-pixel text-sm bg-woodsmoke-900 text-white px-3 py-1'>
						{produceItem.name}
					</span>
				</div>
			</div>
		)
	} else if (variant === 'stats') {
		return (
			<div className='w-full h-full canvas-container bg-black/25 border border-woodsmoke-700'>
				<ProduceItemCanvas
					variant={variant}
					produceItem={produceItem}
					isSelected={isSelected}
					timeframe={timeframe}
				/>
			</div>
		)
	}

	return null
}

export default ProduceItem
