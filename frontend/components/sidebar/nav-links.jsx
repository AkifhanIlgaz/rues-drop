'use client'

import { sidebarLinks } from '@/config/links'
import { clsx } from 'clsx'
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
				className={clsx(
					// Base style
					'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-transparent p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3',
					// Light
					'text-black hover:text-white hover:bg-primary',
					// Dark
					'dark:text-white dark:hover:bg-white dark:hover:text-danger',
					// Selected
					{ ' text-blue-600 hover:bg-transparent hover:text-blue-600  dark:hover:bg-transparent dark:text-danger': pathName === link.href }
				)}
			>
				<LinkIcon className="w-6" />
				<p className="hidden md:block">{link.name}</p>
			</Link>
		)
	})
}
