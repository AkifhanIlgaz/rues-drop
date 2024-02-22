'use client'

import BreadCrumbs from '@/components/breadcrumbs'
import { breadcrumbs } from '@/config/links'

export default function TodoPage() {
	const items = [breadcrumbs.todo]

	return (
		<div className="w-full h-full">
			<BreadCrumbs items={items}></BreadCrumbs>
		</div>
	)
}