'use client'

import Logo from '@/components/logo'
import { link } from '@/config/links'
import { siteConfig } from '@/config/site'
import { text } from '@/config/text'
import firebase from '@/lib/firebase'
import { Bars4Icon } from '@heroicons/react/24/outline'
import UserCircleIcon from '@heroicons/react/24/outline/UserCircleIcon'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AuthenticatedNavbar({ toggleSidebar }) {
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
		<div className="flex items-center justify-between bg-transparent px-6 py-3">
			{/* Logo and menu */}
			<div className="flex justify-center items-center text-3xl gap-3">
				<Button isIconOnly className="bg-transparent" onClick={toggleSidebar}>
					<Bars4Icon width={28} height={28}></Bars4Icon>
				</Button>

				<Logo />
				<p>{siteConfig.name}</p>
			</div>
			<div className="flex justify-center items-center ">
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
			</div>
		</div>
	)
}
