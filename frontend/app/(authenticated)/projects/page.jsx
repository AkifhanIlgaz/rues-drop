'use client'

import BreadCrumbs from '@/components/breadcrumbs'
import ProjectsTable from '@/components/tables/projectsTable'
import { breadcrumbs } from '@/config/links'

export default function ProjectPage() {
	const items = [breadcrumbs.projects]

	return (
		<div>
			<div className="flex w-full h-5 items-center justify-between  mb-10">
				<BreadCrumbs items={items}></BreadCrumbs>
			</div>

			<ProjectsTable />
		</div>
	)
}
