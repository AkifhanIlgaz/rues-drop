'use client'

import BreadCrumbs from '@/components/breadcrumbs'
import { breadcrumbs } from '@/config/links'

import { link } from '@/config/links'
import { Button } from '@nextui-org/button'
import { Link } from '@nextui-org/link'
import { useTheme } from 'next-themes'

export default function Page() {
	const { theme } = useTheme()
	const items = [breadcrumbs.moderators]

	return (
		<div className="flex h-5 items-center justify-between">
			<BreadCrumbs items={items}></BreadCrumbs>
			<Button as={Link} href={link.createModerator} className="mr-6" color={theme == 'light' ? 'primary' : 'danger'}>
				Add Moderator
			</Button>
		</div>
	)
}