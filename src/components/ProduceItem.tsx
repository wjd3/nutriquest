import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { useSpring, animated } from '@react-spring/three'
import { Mesh, DoubleSide, MeshStandardMaterial } from 'three'
import type { ProduceItem as ProduceItemType } from '@/types'
import type { Group } from 'three'

interface ProduceItemModelProps {
	produceItem: ProduceItemType
	isSelected?: boolean
	timeframe?: 'historical' | 'modern'
}
type ProduceItemCanvasProps = ProduceItemModelProps

interface ProduceItemProps extends ProduceItemCanvasProps {
	variant: 'select' | 'stats'
}

const ProduceItemMesh = ({
	node,
	historicalColor,
	modernColor,
	timeframe
}: {
	node: Mesh<any, any, any>
	historicalColor: string
	modernColor: string
	timeframe: string
}) => {
	const { color } = useSpring({
		color: timeframe === 'modern' ? modernColor : historicalColor
	})

	return (
		<animated.mesh
			geometry={node.geometry}
			material={
				new MeshStandardMaterial({
					...node.material,
					side: DoubleSide
				})
			}
			material-color={color}
			position={[0, -0.5, 0]}
		/>
	)
}

const ProduceItemModel = ({
	produceItem,
	isSelected = false,
	timeframe = 'historical'
}: ProduceItemModelProps) => {
	const { modelPath, historicalColors, modernColors } = produceItem

	const pivotRef = useRef<Group>(null)

	const { nodes } = useGLTF(modelPath)

	const { scale } = useSpring({
		scale: timeframe === 'modern' || isSelected ? 1 : 0.75
	})

	useFrame((_, delta) => {
		// Rotate the model slowly
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
					return (
						<ProduceItemMesh
							node={node}
							historicalColor={historicalColors[index]}
							modernColor={modernColors[index]}
							timeframe={timeframe}
							key={node.uuid || index}
						/>
					)
				})}
		</animated.group>
	)
}

const ProduceItemCanvas = ({ produceItem, isSelected, timeframe }: ProduceItemCanvasProps) => {
	return (
		<Canvas
			camera={{
				fov: 45,
				near: 0.1,
				far: 1000,
				position: [0, 0.5, 4.25]
			}}>
			{/* Ambient light */}
			<ambientLight intensity={2.5} color='#ffffff' />
			{/* Key light */}
			<directionalLight
				position={[5, 10, 5]}
				intensity={2}
				color='#ffffff'
				castShadow
				shadow-mapSize={[1024, 1024]}
				shadow-camera-far={50}
				shadow-camera-left={-10}
				shadow-camera-right={10}
				shadow-camera-top={10}
				shadow-camera-bottom={-10}
			/>
			{/* Fill light 1 */}
			<directionalLight position={[0, -5, 0]} intensity={1.5} color='#ffffff' />
			{/* Fill light 2 */}
			<directionalLight position={[0, 2, 5]} intensity={2.5} color='#ffffff' />

			<ProduceItemModel produceItem={produceItem} isSelected={isSelected} timeframe={timeframe} />
		</Canvas>
	)
}

const ProduceItem = ({ produceItem, variant, isSelected, timeframe }: ProduceItemProps) => {
	const { name } = produceItem

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
						produceItem={produceItem}
						isSelected={isSelected}
						timeframe={timeframe}
					/>
				</div>

				<div className='absolute bottom-2 left-0 right-0 text-center'>
					<span className='item-name font-pixel text-sm bg-woodsmoke-900 text-white px-3 py-1'>
						{name}
					</span>
				</div>
			</div>
		)
	}

	return (
		<div className='w-full h-full canvas-container bg-black/25 border border-woodsmoke-700'>
			<ProduceItemCanvas produceItem={produceItem} isSelected={isSelected} timeframe={timeframe} />
		</div>
	)
}

export default ProduceItem
