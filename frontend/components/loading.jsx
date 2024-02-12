import { Spinner } from '@nextui-org/react'

export default function Loading() {
	return (
		<div className="flex flex-col w-full h-screen items-center justify-center gap-4">
			<Spinner size="lg" color="primary" />
			<span className="text-lg">Loading ...</span>
		</div>
	)
}
