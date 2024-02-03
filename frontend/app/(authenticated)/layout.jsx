'use client'

import AuthenticatedNavbar from '@/components/navbar/authenticatedNavbar'
import { link } from '@/config/links'
import firebase from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import { useAuthState } from 'react-firebase-hooks/auth'

export default function Layout({ children }) {
	const [user, loading, error] = useAuthState(firebase.auth)
	const router = useRouter()

	if (loading) {
		return <p>loading</p>
	}

	if (error || !user) {
		router.replace(link.root)
	}

	return (
		<div>
			<AuthenticatedNavbar />
			{children}
		</div>
	)
}
