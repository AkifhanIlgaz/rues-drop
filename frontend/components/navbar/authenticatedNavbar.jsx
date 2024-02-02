'use client'

import { fontMerriweather } from '@/config/fonts'
import { siteConfig } from '@/config/site'
import UserCircleIcon from '@heroicons/react/24/outline/UserCircleIcon'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Navbar, NavbarContent } from '@nextui-org/react'

export default function AuthenticatedNavbar() {
	return (
		<Navbar maxWidth="full" isBordered>
			<NavbarContent justify="start">
				<p className={`${fontMerriweather.className} text-2xl`}>{siteConfig.name}</p>
			</NavbarContent>
			<NavbarContent justify="end">
				<Dropdown>
					<DropdownTrigger>
						<Button isIconOnly className="bg-transparent text-sky-900">
							<UserCircleIcon />
						</Button>
					</DropdownTrigger>

					<DropdownMenu>
						<DropdownItem key="profile">Profile</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</NavbarContent>
		</Navbar>
	)
}
