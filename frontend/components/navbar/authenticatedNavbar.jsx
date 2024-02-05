'use client'

import Logo from '@/components/logo'
import { fontMerriweather } from '@/config/fonts'
import { link } from '@/config/links'
import { siteConfig } from '@/config/site'
import { text } from '@/config/text'
import firebase from '@/lib/firebase'
import UserCircleIcon from '@heroicons/react/24/outline/UserCircleIcon'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Navbar, NavbarContent } from '@nextui-org/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AuthenticatedNavbar() {
	const router = useRouter()

	const signOut = async () => {
		try {
			await firebase.auth.signOut()
			router.push(link.root)
		} catch (error) {
			// Todo: Handle error
			console.log(error)
		}
	}

	return (
		<Navbar maxWidth="full" isBordered>
			<NavbarContent justify="start">
				<Logo />
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
						<DropdownItem key="profile" as={Link} href={link.profile} color="primary" className="text-primary">
							{text.profile}
						</DropdownItem>
						<DropdownItem key="signout" className="text-danger" color="danger" onClick={signOut}>
							{text.signOut}
						</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</NavbarContent>
		</Navbar>
	)
}
