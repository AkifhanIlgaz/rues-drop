'use client'

import BreadCrumbs from '@/components/breadcrumbs'
import { breadcrumbs, link } from '@/config/links'
import { Button } from '@nextui-org/button'
import { Link } from '@nextui-org/link'

export default function ProjectPage() {
	const items = [breadcrumbs.projects, breadcrumbs.addProject]

	return (
		<div className="w-full h-full">
			<BreadCrumbs items={items}></BreadCrumbs>

			<Button as={Link} href={link.addProject}>
				Add project
			</Button>
		</div>
	)
}
