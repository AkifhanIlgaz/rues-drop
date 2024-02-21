'use client'

import BreadCrumbs from '@/components/breadcrumbs'
import { breadcrumbs } from '@/config/links'

export default function AddProject() {
	const items = [breadcrumbs.projects, breadcrumbs.addProject]

	return (
		<div className="w-full h-full">
			<BreadCrumbs items={items}></BreadCrumbs>
		</div>
	)
}
