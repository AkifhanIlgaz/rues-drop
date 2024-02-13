import { fontMerriweather } from '@/config/fonts'
import { link } from '@/config/links'
import { siteConfig } from '@/config/site'
import { text } from '@/config/text'
import { Button, Link, Navbar, NavbarContent, NavbarItem } from '@nextui-org/react'
import Logo from '../logo'
export default function NotAuthenticatedNavbar() {
	return (
		<Navbar maxWidth="full" className="bg-transparent py-3">
			<NavbarContent justify="start">
				<Logo />
				<p className={`${fontMerriweather.className} text-xl`}>{siteConfig.name}</p>
			</NavbarContent>
			<NavbarContent justify="end">
				<NavbarItem>
					<Link href={link.signIn} className="text-sm">
						{text.signIn}
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Button as={Link} color="primary" href={link.signUp} variant="shadow">
						{text.signUp}
					</Button>
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	)
}
