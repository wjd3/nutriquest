import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { animate } from 'motion'

interface ItemProps {
	item: {
		modelPath: string
		texturePath: string // Add this new prop for texture path
		name: string
		modelPositionY: number
		cameraPositionY: number
		cameraZoom: number
		modelRotationSpeed?: number
		modelRotation?: number
		modelRotationOffset?: number
	}
	isSelected: boolean
}

interface ThreeMesh extends THREE.Object3D {
	isMesh?: boolean
	material?: THREE.Material & {
		emissive?: THREE.Color
		map?: THREE.Texture // Add this for texture mapping
	}
}

const Item = ({ item, isSelected }: ItemProps) => {
	const {
		modelPath,
		texturePath, // Add this
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
		const texture = textureLoader.load(texturePath)

		// Load model
		const loader = new FBXLoader()

		const loadModelWithTexture = (fbx: THREE.Group) => {
			// Apply texture to all mesh materials in the model
			fbx.traverse((child: ThreeMesh) => {
				if (child.isMesh && child.material) {
					// If the material is an array, apply texture to all materials
					if (Array.isArray(child.material)) {
						child.material.forEach((mat) => {
							mat.map = texture
							mat.needsUpdate = true
						})
					} else {
						// Single material
						child.material.map = texture
						child.material.needsUpdate = true
					}
				}
			})

			return fbx
		}

		if (modelRotationOffset != null) {
			loader.load(modelPath, (fbx: THREE.Group) => {
				const group = new THREE.Group()
				loadModelWithTexture(fbx) // Apply texture
				group.add(fbx)

				fbx.position.set(modelRotationOffset, 0, 0)

				modelRef.current = group
				group.scale.set(0.1, 0.1, 0.1)
				group.position.y -= modelPositionY

				if (modelRotation) {
					group.rotation.z = modelRotation
				}

				scene.add(group)
			})
		} else {
			loader.load(modelPath, (fbx: THREE.Group) => {
				loadModelWithTexture(fbx) // Apply texture
				modelRef.current = fbx
				fbx.scale.set(0.1, 0.1, 0.1)
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
	}, [modelPath, texturePath]) // Add texturePath to dependencies

	// Handle selection effects
	useEffect(() => {
		if (!modelRef.current) return

		const model = modelRef.current

		if (isSelected) {
			animate(
				[
					[model.scale, { x: 0.11, y: 0.11, z: 0.11 }],
					['.item-name', { backgroundColor: '#68b06c' }]
				],
				{
					duration: 0.3,
					easing: 'ease-out'
				}
			)

			model.traverse((child: ThreeMesh) => {
				if (child.isMesh && child.material?.emissive) {
					child.material.emissive = new THREE.Color(0.2, 0.5, 0.2)
				}
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

			model.traverse((child: ThreeMesh) => {
				if (child.isMesh && child.material?.emissive) {
					child.material.emissive = new THREE.Color(0, 0, 0)
				}
			})
		}
	}, [isSelected])

	return (
		<div className='relative'>
			<div
				ref={mountRef}
				className={`w-48 h-48 ${
					isSelected
						? 'border-2 border-fern-400 bg-black/20'
						: 'border border-woodsmoke-950 bg-black/10'
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

export default Item
