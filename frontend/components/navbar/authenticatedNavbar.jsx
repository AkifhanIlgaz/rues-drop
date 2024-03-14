'use client'

import Logo from '@/components/logo'
import { ThemeSwitcher } from '@/components/themeSwitcher'
import { useRouter } from 'next/navigation'

export default function AuthenticatedNavbar() {
	const router = useRouter()

	return (
		<div className="flex items-center justify-between px-12 py-3">
			{/* Logo and menu */}
			<Logo />

			<ThemeSwitcher />
		</div>
	)
}
