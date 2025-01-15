import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import type { ProduceItem } from '@/types'

interface ThreeMesh extends THREE.Object3D {
	isMesh?: boolean
	material?: THREE.Material & {
		emissive?: THREE.Color
		map?: THREE.Texture
	}
}

interface StatsItemProps {
	item: ProduceItem
}

const StatsItem = ({ item }: StatsItemProps) => {
	const {
		modelPath,
		texturePath,
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
				group.scale.set(0.15, 0.15, 0.15) // Larger scale for stats view
				group.position.y -= modelPositionY

				scene.add(group)
			})
		} else {
			loader.load(modelPath, (fbx: THREE.Group) => {
				loadModelWithTexture(fbx)
				modelRef.current = fbx
				fbx.scale.set(0.15, 0.15, 0.15) // Larger scale for stats view
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
	}, [modelPath, texturePath])

	return (
		<div className='w-full h-full'>
			<div ref={mountRef} className='w-full h-full bg-black/20 border border-woodsmoke-800' />
		</div>
	)
}

export default StatsItem
