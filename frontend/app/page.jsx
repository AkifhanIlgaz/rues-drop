'use client'

import Loading from '@/components/loading'
import NotAuthenticatedNavbar from '@/components/navbar/notAuthenticatedNavbar'
import { link } from '@/config/links'
import firebaseClient from '@/lib/firebase'
import { RedirectType, redirect } from 'next/navigation'
import { useAuthState } from 'react-firebase-hooks/auth'

export default function Home() {
	const [user, loading, error] = useAuthState(firebaseClient.auth)

	if (loading) {
		return <Loading />
	}

	if (user) {
		redirect(link.home, RedirectType.replace)
	}

	return <NotAuthenticatedNavbar />
}
