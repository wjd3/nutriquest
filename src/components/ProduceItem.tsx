import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { animate } from 'motion'
import type { ProduceItem } from '@/types'

interface ThreeMesh extends THREE.Object3D {
	isMesh?: boolean
	material?: THREE.Material & {
		emissive?: THREE.Color
		map?: THREE.Texture
	}
}

interface ItemProps {
	item: ProduceItem
	variant: 'select' | 'stats'
	isSelected?: boolean // Optional since it's only needed for select variant
}

const Item = ({ item, variant, isSelected = false }: ItemProps) => {
	const {
		modelPath,
		texturePath,
		name,
		modelPositionY,
		cameraZoom,
		modelRotationSpeed,
		modelRotation,
		cameraPositionY,
		modelRotationOffset
	} = item

	const mountRef = useRef<HTMLDivElement>(null)
	const sceneRef = useRef<THREE.Scene | null>(null)
	const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
	const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
	const modelRef = useRef<THREE.Group | null>(null)

	useEffect(() => {
		// Set up scene
		const scene = new THREE.Scene()
		sceneRef.current = scene

		// Add lighting
		const ambientLight = new THREE.AmbientLight(0x404040)
		const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
		directionalLight.position.set(0, 1, 1)
		scene.add(ambientLight)
		scene.add(directionalLight)

		// Set up camera
		const camera = new THREE.PerspectiveCamera(
			75,
			mountRef?.current ? mountRef.current.clientWidth / mountRef.current.clientHeight : 1,
			0.1,
			1000
		)
		camera.position.z = cameraZoom
		camera.position.y = cameraPositionY
		camera.lookAt(0, 0, 0)
		cameraRef.current = camera

		// Set up renderer
		const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
		renderer.setSize(mountRef?.current?.clientWidth || 1, mountRef?.current?.clientHeight || 1)
		renderer.setClearColor(0x000000, 0)
		mountRef?.current?.appendChild(renderer.domElement)
		rendererRef.current = renderer

		// Create texture loader
		const textureLoader = new THREE.TextureLoader()
		const texture = textureLoader.load(texturePath || '')

		// Load model
		const loader = new FBXLoader()

		const loadModelWithTexture = (fbx: THREE.Group) => {
			fbx.traverse((child: ThreeMesh) => {
				if (child.isMesh && child.material) {
					if (Array.isArray(child.material)) {
						child.material.forEach((mat) => {
							mat.map = texture
							mat.needsUpdate = true
						})
					} else {
						child.material.map = texture
						child.material.needsUpdate = true
					}
				}
			})
			return fbx
		}

		const initialScale = variant === 'select' ? 0.1 : 0.15

		if (modelRotationOffset != null) {
			loader.load(modelPath, (fbx: THREE.Group) => {
				const group = new THREE.Group()
				loadModelWithTexture(fbx)
				group.add(fbx)

				if (modelRotation) {
					fbx.position.set(0, modelRotationOffset, 0)
					group.rotation.z = modelRotation
				} else {
					fbx.position.set(modelRotationOffset, 0, 0)
				}

				modelRef.current = group
				group.scale.set(initialScale, initialScale, initialScale)
				group.position.y -= modelPositionY

				scene.add(group)
			})
		} else {
			loader.load(modelPath, (fbx: THREE.Group) => {
				loadModelWithTexture(fbx)
				modelRef.current = fbx
				fbx.scale.set(initialScale, initialScale, initialScale)
				fbx.position.y -= modelPositionY

				if (modelRotation) {
					fbx.rotation.z = modelRotation
				}

				scene.add(fbx)
			})
		}

		// Animation loop
		const animate = () => {
			requestAnimationFrame(animate)
			if (modelRef.current) {
				modelRef.current.rotation.y += modelRotationSpeed != null ? modelRotationSpeed : 0.0065
			}
			renderer.render(scene, camera)
		}
		animate()

		// Cleanup
		return () => {
			if (mountRef.current && renderer.domElement) {
				mountRef.current.removeChild(renderer.domElement)
			}
			renderer.dispose()
		}
	}, [modelPath, texturePath, variant])

	// Handle selection effects for select variant
	useEffect(() => {
		if (variant !== 'select' || !modelRef.current) return

		const model = modelRef.current

		if (isSelected) {
			animate([[model.scale, { x: 0.11, y: 0.11, z: 0.11 }]], {
				duration: 0.3,
				easing: 'ease-out'
			})
		} else {
			animate(
				[
					[model.scale, { x: 0.1, y: 0.1, z: 0.1 }],
					['.item-name', { backgroundColor: '#1c1c1c' }]
				],
				{
					duration: 0.3,
					easing: 'ease-out'
				}
			)
		}
	}, [isSelected, variant])

	if (variant === 'select') {
		return (
			<div className='relative'>
				<div
					ref={mountRef}
					className={`w-48 h-48 ${
						isSelected
							? 'border-2 border-woodsmoke-700 bg-black/20'
							: 'border border-woodsmoke-800 bg-black/10'
					} transition-colors duration-300`}
				/>
				<div className='absolute bottom-2 left-0 right-0 text-center'>
					<span className='item-name font-pixel text-sm bg-woodsmoke-950 text-white px-3 py-1'>
						{name}
					</span>
				</div>
			</div>
		)
	}

	return (
		<div className='w-full h-full'>
			<div ref={mountRef} className='w-full h-full bg-black/20 border border-woodsmoke-800' />
		</div>
	)
}

export default Item
