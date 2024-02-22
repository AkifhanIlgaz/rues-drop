'use client'

import BreadCrumbs from '@/components/breadcrumbs'
import { breadcrumbs } from '@/config/links'

export default function Page() {
	const items = [breadcrumbs.users, breadcrumbs.createAdmin]

	return (
		<div className="w-full h-full">
			<BreadCrumbs items={items}></BreadCrumbs>
		</div>
	)
}
