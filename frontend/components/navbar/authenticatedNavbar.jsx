'use client'

import { fontMerriweather } from '@/config/fonts'
import { link } from '@/config/links'
import { siteConfig } from '@/config/site'
import { text } from '@/config/text'
import firebase from '@/lib/firebase'
import UserCircleIcon from '@heroicons/react/24/outline/UserCircleIcon'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Navbar, NavbarContent } from '@nextui-org/react'
import Link from 'next/link'


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
						<DropdownItem key="profile" as={Link} href={link.profile}>
							{text.profile}
						</DropdownItem>
						<DropdownItem key="signout" className="text-danger" color="danger" onClick={() => firebase.auth.signOut()}>
							{text.signOut}
						</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</NavbarContent>
		</Navbar>
	)
}
