'use client'

import BreadCrumbs from '@/components/breadcrumbs'
import { breadcrumbs, link } from '@/config/links'
import { Button } from '@nextui-org/button'
import { Link } from '@nextui-org/link'
import { useTheme } from 'next-themes'
export default function ProjectPage() {
	const { theme } = useTheme()

	const items = [breadcrumbs.projects]

	return (
		<div className="w-full h-full">
			<div className="flex h-5 items-center justify-between">
				<BreadCrumbs items={items}></BreadCrumbs>

				<Button as={Link} href={link.addProject} className="mr-6" color={theme == 'light' ? 'primary' : 'danger'}>
					Add project
				</Button>
			</div>
		</div>
	)
}
