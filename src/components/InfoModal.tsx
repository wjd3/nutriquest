import { motion, AnimatePresence } from 'motion/react'

interface InfoModalProps {
	isOpen: boolean
	onClose: () => void
}

const InfoModal = ({ isOpen, onClose }: InfoModalProps) => {
	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* Backdrop */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={onClose}
						className='fixed inset-0 bg-black/60 z-50'
					/>

					{/* Modal */}
					<motion.div
						initial={{ opacity: 0, scale: 0.95, y: '-50%', x: '-50%' }}
						animate={{ opacity: 1, scale: 1, y: '-50%', x: '-50%' }}
						exit={{ opacity: 0, scale: 0.95, y: '-50%', x: '-50%' }}
						className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-lg bg-woodsmoke-950 border border-woodsmoke-800 p-6 z-50'>
						<h2 className='font-pixel text-xl mb-4 text-woodsmoke-400'>About This Project</h2>
						<div className='font-mono text-sm space-y-4 text-woodsmoke-300'>
							<p>
								This interactive visualization demonstrates the significant changes in produce
								characteristics from pre-industrial times to the present day.
							</p>
							<p>
								Since the Industrial Revolution, modern farming practices have prioritized factors
								like yield, size, and shelf life over nutritional content. This has led to a
								substantial decline in the nutrient density of our fruits and vegetables.
							</p>
							<p>
								The data shown compares historical produce varieties with their modern counterparts,
								highlighting the loss of essential nutrients that contribute to our overall health
								and wellbeing.
							</p>
						</div>
						<button
							onClick={onClose}
							className='mt-6 px-4 py-2 font-pixel text-sm border border-woodsmoke-400 text-woodsmoke-400 hover:bg-woodsmoke-400 hover:text-black transition-colors duration-300'>
							CLOSE
						</button>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	)
}

export default InfoModal
