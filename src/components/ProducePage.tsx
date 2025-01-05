import { useState, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { gsap } from 'gsap'
import StatBar from './StatBar'
import { soundManager } from '../services/SoundManager'

interface ProducePageProps {
	item: any
	onBack: () => void
}

export default function ProducePage({ item, onBack }: ProducePageProps) {
	const [isHistorical, setIsHistorical] = useState(true)
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const sceneRef = useRef<THREE.Scene | null>(null)
	const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
	const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
	const modelRef = useRef<THREE.Object3D | null>(null)

	useEffect(() => {
		if (!canvasRef.current) return

		// Scene setup
		const scene = new THREE.Scene()
		sceneRef.current = scene

		// Camera setup
		const camera = new THREE.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			0.1,
			1000
		)
		camera.position.z = 5
		cameraRef.current = camera

		// Renderer setup
		const renderer = new THREE.WebGLRenderer({
			canvas: canvasRef.current,
			alpha: true,
			antialias: true
		})
		renderer.setSize(window.innerWidth, window.innerHeight)
		renderer.setPixelRatio(window.devicePixelRatio)
		rendererRef.current = renderer

		// Lighting
		const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
		scene.add(ambientLight)

		const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
		directionalLight.position.set(5, 5, 5)
		scene.add(directionalLight)

		// Controls
		const controls = new OrbitControls(camera, renderer.domElement)
		controls.enableDamping = true
		controls.dampingFactor = 0.25
		controls.enableZoom = false

		// Load 3D model
		const loader = new GLTFLoader()
		loader.load(
			`/models/${item.modelPath}`,
			(gltf) => {
				modelRef.current = gltf.scene
				scene.add(gltf.scene)
				gltf.scene.scale.set(2, 2, 2) // Adjust scale as needed
			},
			undefined,
			(error) => {
				console.error('An error occurred while loading the 3D model:', error)
			}
		)

		// Animation loop
		const animate = () => {
			requestAnimationFrame(animate)
			controls.update()
			if (modelRef.current) {
				modelRef.current.rotation.y += 0.005 // Continuous rotation
			}
			renderer.render(scene, camera)
		}
		animate()

		// Resize handler
		const handleResize = () => {
			if (cameraRef.current && rendererRef.current) {
				cameraRef.current.aspect = window.innerWidth / window.innerHeight
				cameraRef.current.updateProjectionMatrix()
				rendererRef.current.setSize(window.innerWidth, window.innerHeight)
			}
		}
		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
			renderer.dispose()
		}
	}, [item])

	const toggleVersion = async () => {
		setIsHistorical(!isHistorical)
		await soundManager.play('toggle')
		if (modelRef.current) {
			gsap.to(modelRef.current.scale, {
				x: isHistorical ? 2.5 : 2,
				y: isHistorical ? 2.5 : 2,
				z: isHistorical ? 2.5 : 2,
				duration: 1,
				ease: 'power2.inOut'
			})
		}
	}

	const handleBack = async () => {
		await soundManager.play('back')
		onBack()
	}

	const currentStats = isHistorical ? item.historical : item.modern

	return (
		<div className='relative h-screen bg-n64-blue text-white overflow-hidden'>
			<canvas ref={canvasRef} className='absolute inset-0 z-0' />
			<div className='absolute inset-0 z-10 p-8 flex flex-col'>
				<h1 className='text-4xl font-bold mb-4 text-n64-yellow font-title'>
					{item.name.toUpperCase()}
				</h1>
				<button
					className='bg-n64-red text-white px-4 py-2 rounded-lg mb-4 hover:bg-n64-red-dark transition-colors duration-200 uppercase'
					onClick={toggleVersion}>
					{isHistorical ? 'Show Modern' : 'Show Historical'}
				</button>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4 bg-n64-gray bg-opacity-80 p-4 rounded-lg overflow-auto'>
					<div>
						<h2 className='text-2xl font-bold mb-2 text-n64-yellow uppercase'>Vitamins</h2>
						<StatBar label='Vitamin A' value={currentStats.vitaminA} maxValue={100} />
						<StatBar label='Vitamin C' value={currentStats.vitaminC} maxValue={100} />
						<StatBar label='Vitamin K' value={currentStats.vitaminK} maxValue={100} />
					</div>
					<div>
						<h2 className='text-2xl font-bold mb-2 text-n64-yellow uppercase'>Minerals</h2>
						<StatBar label='Iron' value={currentStats.iron} maxValue={100} />
						<StatBar label='Calcium' value={currentStats.calcium} maxValue={100} />
						<StatBar label='Potassium' value={currentStats.potassium} maxValue={100} />
					</div>
				</div>
				<div className='mt-4 bg-n64-gray bg-opacity-80 p-4 rounded-lg overflow-auto'>
					<h2 className='text-2xl font-bold mb-2 text-n64-yellow uppercase'>Historical Context</h2>
					<p>{item.historicalContext}</p>
				</div>
				<button
					className='bg-n64-yellow text-n64-blue px-4 py-2 rounded-lg mt-4 hover:bg-n64-yellow-dark transition-colors duration-200 uppercase'
					onClick={handleBack}>
					Back to Selection
				</button>
			</div>
		</div>
	)
}
