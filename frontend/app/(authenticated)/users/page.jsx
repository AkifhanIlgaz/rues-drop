'use client'

import BreadCrumbs from '@/components/breadcrumbs'
import { breadcrumbs } from '@/config/links'

import { link } from '@/config/links'
import { PlusIcon } from '@heroicons/react/24/outline'
import { Button } from '@nextui-org/button'
import { Link } from '@nextui-org/link'
import { useTheme } from 'next-themes'

export default function Page() {
	const { theme } = useTheme()
	const items = [breadcrumbs.users]

	return (
		<div className="w-full h-full">
			<div className="flex h-5 items-center justify-between">
				<BreadCrumbs items={items}></BreadCrumbs>
				<Button as={Link} href={link.addAdmin} startContent={<PlusIcon className="h-1/2" />} className="mr-6" color={theme == 'light' ? 'primary' : 'danger'}>
					Create Admin
				</Button>
			</div>
		</div>
	)
}