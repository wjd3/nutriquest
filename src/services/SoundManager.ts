class SoundManager {
	private context?: AudioContext
	private sounds: { [key: string]: AudioBuffer } = {}
	private gainNode?: GainNode
	private initialized = false
	private initPromise?: Promise<void>

	private async initialize() {
		if (this.initialized) return
		if (this.initPromise) return this.initPromise

		this.initPromise = (async () => {
			this.context = new (window.AudioContext || (window as any).webkitAudioContext)()
			this.gainNode = this.context.createGain()
			this.gainNode.connect(this.context.destination)
			await this.preloadSounds()
			this.initialized = true
		})()

		return this.initPromise
	}

	private async preloadSounds() {
		if (!this.context) throw new Error('AudioContext not initialized')

		const soundEffects = [
			{ name: 'select', file: 'select.mp3' },
			{ name: 'hover', file: 'hover.mp3' },
			{ name: 'back', file: 'back.mp3' },
			{ name: 'toggle', file: 'toggle.mp3' }
		]

		for (const sound of soundEffects) {
			try {
				const response = await fetch(`/sounds/${sound.file}`)
				const arrayBuffer = await response.arrayBuffer()
				const audioBuffer = await this.context.decodeAudioData(arrayBuffer)
				this.sounds[sound.name] = audioBuffer
			} catch (error) {
				console.error(`Error loading sound ${sound.name}:`, error)
			}
		}
	}

	async play(soundName: string) {
		await this.initialize()
		if (!this.context || !this.gainNode) return

		const sound = this.sounds[soundName]
		if (sound) {
			const source = this.context.createBufferSource()
			source.buffer = sound
			source.connect(this.gainNode)
			source.start(0)
		} else {
			console.warn(`Sound ${soundName} not found`)
		}
	}

	async setVolume(volume: number) {
		await this.initialize()
		if (!this.context || !this.gainNode) return

		this.gainNode.gain.setValueAtTime(volume, this.context.currentTime)
	}

	async stop() {
		if (!this.context) return

		await this.context.close()
		this.context = undefined
		this.gainNode = undefined
		this.initialized = false
		this.initPromise = undefined
	}
}

export const soundManager = new SoundManager()
