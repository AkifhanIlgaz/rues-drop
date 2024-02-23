'use client'

import BreadCrumbs from '@/components/breadcrumbs'
import { breadcrumbs } from '@/config/links'

export default function TodoPage() {
	const items = [breadcrumbs.todo]

	return <BreadCrumbs items={items}></BreadCrumbs>
}
