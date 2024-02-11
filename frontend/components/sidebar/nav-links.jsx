'use client'

import { sidebarLinks } from '@/config/links'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NavLinks() {
	const pathName = usePathname()

	return sidebarLinks.map(link => {
		const LinkIcon = link.icon

		return (
			<Link
				key={link.name}
				href={link.href}
				className={clsx('flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-transparent p-3 text-sm font-medium hover:bg-primary hover:text-white md:flex-none md:justify-start md:p-2 md:px-3', {
					'bg-gray-50 text-blue-600': pathName === link.href
				})}
			>
				<LinkIcon className="w-6" />
				<p className="hidden md:block">{link.name}</p>
			</Link>
		)
	})
}
