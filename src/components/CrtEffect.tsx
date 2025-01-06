const CrtEffect = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='crt-container relative w-full h-full'>
			{children}
			<div className='crt-overlay absolute inset-0 pointer-events-none' />
			<div className='crt-lines absolute inset-0 pointer-events-none' />
			<div className='crt-flicker absolute inset-0 pointer-events-none' />
		</div>
	)
}

export default CrtEffect
