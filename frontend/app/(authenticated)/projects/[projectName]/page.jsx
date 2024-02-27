'use client'

import { usePathname } from 'next/navigation'

export default function Page() {
	const path = usePathname()

	return <p>{path}</p>
}
