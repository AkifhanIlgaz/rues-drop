'use client'
'use client'

import BreadCrumbs from '@/components/breadcrumbs'
import { breadcrumbs } from '@/config/links'

export default function Home() {
	const items = [breadcrumbs.home]

	return (
		<div className="w-full h-full">
			<BreadCrumbs items={items}></BreadCrumbs>
		</div>
	)
}
