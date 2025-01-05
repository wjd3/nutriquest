export default function LoadingScreen() {
	return (
		<div className='flex flex-col items-center justify-center h-screen bg-n64-blue'>
			<h1 className='text-4xl font-bold mb-4 text-n64-yellow font-title'>NUTRI•QUEST</h1>
			<div className='text-2xl text-white animate-pulse font-pixel'>Loading...</div>
		</div>
	)
}
