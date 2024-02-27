'use client'

import BreadCrumbs from '@/components/breadcrumbs'
import { breadcrumbs } from '@/config/links'
import { usePathname } from 'next/navigation'

export default function Page() {
	const projectName = usePathname().split('/').at(-1)

	const items = [breadcrumbs.projects, { name: projectName }]

	// TODO: Flag
	// TODO: Links & Todo

	return (
		<div className="w-full h-full">
			<BreadCrumbs items={items} />
		</div>
	)
}
