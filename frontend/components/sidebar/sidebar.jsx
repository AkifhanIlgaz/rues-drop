import SignOutButton from '@/components/buttons/signOut'
import { useSignOut } from 'react-firebase-hooks/auth'
import { auth } from '../../lib/firebase'
import Loading from '../loading'
import NavLinks from './nav-links'

export default function Sidebar({ sidebarLinks }) {
	const [signOut, loading] = useSignOut(auth)

	if (loading) {
		return <Loading />
	}

	return (
		<div className="flex h-full w-1/12 flex-col px-3 py-2 ">
			<NavLinks links={sidebarLinks} />
			<SignOutButton signOut={signOut} />
		</div>
	)
}
