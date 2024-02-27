import SignOutButton from '@/components/buttons/signOut'
import firebase from '@/lib/firebase'
import { useSignOut } from 'react-firebase-hooks/auth'
import Loading from '../loading'
import NavLinks from './nav-links'

export default function Sidebar() {
	const [signOut, loading] = useSignOut(firebase.auth)

	if (loading) {
		return <Loading />
	}

	return (
		<div className="flex h-full w-1/12 flex-col px-3 py-2 ">
			<NavLinks />
			<SignOutButton signOut={signOut} />
		</div>
	)
}

// flex h-[48px] grow text-danger items-center justify-center gap-2 rounded-md bg-transparent p-3 text-sm font-medium hover:bg-danger-500 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3
