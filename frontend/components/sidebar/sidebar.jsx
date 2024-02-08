import { link } from '@/config/links'
import firebase from '@/lib/firebase'
import { Button } from '@nextui-org/react'
import clsx from 'clsx'
import NavLinks from './nav-links'

export default function Sidebar() {
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
		<div className="flex h-full w-1/12 flex-col px-3 py-2  ">
			<NavLinks />
			<Button onClick={signOut} className={clsx('flex h-[48px] grow text-danger items-center justify-center gap-2 rounded-md bg-transparent p-3 text-sm font-medium hover:bg-danger hover:text-white md:flex-none md:justify-start md:p-2 md:px-3')}>
				Sign Out
			</Button>
		</div>
	)
}
