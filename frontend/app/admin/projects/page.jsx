'use client'

import BreadCrumbs from '@/components/breadcrumbs'
import ProjectsTable from '@/components/tables/projectsTable'
import { adminBreadcrumbs, link } from '@/config/links'
import { Button } from '@nextui-org/button'
import { Link } from '@nextui-org/link'
import { useTheme } from 'next-themes'

export default function ProjectPage() {
	const { theme } = useTheme()
	const items = [adminBreadcrumbs.projects]

	return (
		<div>
			<div className="flex w-full h-5 items-center justify-between  mb-10">
				<BreadCrumbs items={items}></BreadCrumbs>

				<Button as={Link} href={link.admin.addProject} className="mr-6" color={theme == 'light' ? 'primary' : 'danger'}>
					Add project
				</Button>
			</div>

			<ProjectsTable />
		</div>
	)
}
