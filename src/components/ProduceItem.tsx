import { useRef } from 'react'
import { Canvas, useFrame, type Euler, type Vector3 } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { useSpring, animated } from '@react-spring/three'
import { Mesh, DoubleSide, type Group } from 'three'
import type { ProduceItem as ProduceItemType, ProduceView } from '@/types'

type Variant = 'select' | 'stats'

type Views = {
	select: ProduceView | undefined
	stats: ProduceView | undefined
}

interface ProduceItemProps {
	produceItem: ProduceItemType
	isSelected?: boolean
	timeframe?: 'historical' | 'modern'
	variant: Variant
}

interface ProduceItemModelProps extends ProduceItemProps {
	views: Views
}

interface ProduceItemMeshProps {
	node: Mesh<any, any, any>
	colors: { historical: string; modern: string }
	timeframe: string
	variant: Variant
	views: Views
}

const ProduceItemMesh = ({ node, colors, timeframe, views, variant }: ProduceItemMeshProps) => {
	// Color
	const { color } = useSpring({
		color: timeframe === 'modern' ? colors.modern : colors.historical
	})

	// Rotation
	const defaultRotation = variant === 'stats' ? [0, 0, 0] : [0, 0, 0]

	const rotation = [
		views[variant]?.rotate?.x || defaultRotation[0],
		views[variant]?.rotate?.y || defaultRotation[1],
		views[variant]?.rotate?.z || defaultRotation[2]
	] as Euler

	// Position
	const defaultPosition = variant === 'stats' ? [0, -0.25, 0] : [0, 0, 0]

	const position = [
		views[variant]?.position?.x || defaultPosition[0],
		views[variant]?.position?.y || defaultPosition[1],
		views[variant]?.position?.z || defaultPosition[2]
	] as Vector3

	return (
		<animated.mesh geometry={node.geometry} rotation={rotation} position={position}>
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
	timeframe = 'historical',
	views
}: ProduceItemModelProps) => {
	const { modelPath, historicalColors, modernColors } = produceItem

	const pivotRef = useRef<Group>(null)

	const { nodes } = useGLTF(modelPath)

	const { scale } = useSpring({
		scale: timeframe === 'modern' ? 1 : isSelected ? 0.9 : 0.75
	})

	// Rotate the model
	useFrame((_, delta) => {
		if (pivotRef.current) {
			const rotationSpeed = 0.25
			pivotRef.current.rotation.y += delta * rotationSpeed
		}
	})

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
	const views = {
		select: produceItem.selectView,
		stats: produceItem.statsView
	}

	// Camera Position
	const defaultCamera = variant === 'select' ? [0, 0.5, 4.5] : [0, 0.5, 4.5]

	const cameraPosition = [
		views[variant]?.camera?.x || defaultCamera[0],
		views[variant]?.camera?.y || defaultCamera[1],
		views[variant]?.camera?.z || defaultCamera[2]
	] as Vector3

	return (
		<Canvas
			camera={{
				fov: 45,
				near: 0.1,
				far: 1000,
				position: cameraPosition
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
				views={views}
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
					className={`w-40 h-40 md:w-48 md:h-48 canvas-container transition-colors duration-300 ${
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

				<div className='absolute bottom-3 left-0 right-0 text-center'>
					<span className='font-pixel text-sm sm:text-base bg-woodsmoke-900 text-white px-3 py-1'>
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
