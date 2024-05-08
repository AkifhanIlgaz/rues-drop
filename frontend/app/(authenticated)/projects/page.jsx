'use client'

import BreadCrumbs from '@/components/breadcrumbs'
import ProjectsTable from '@/components/tables/projectsTable'
import api from '@/config/api'
import { breadcrumbs } from '@/config/links'
import useSWR from 'swr'

export default function ProjectPage() {
	const items = [breadcrumbs.projects]
	const { data: projects, isLoading } = useSWR(api.allProjects)

	return (
		<div>
			<div className="flex w-full h-5 items-center justify-between  mb-10">
				<BreadCrumbs items={items}></BreadCrumbs>
			</div>

			<ProjectsTable projects={projects} isLoading={isLoading} />
		</div>
	)
}
