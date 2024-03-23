'use client'

import { link } from '@/config/links'
import { useRouter } from 'next/navigation'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../lib/firebase'

export default function Home() {
	const [user, loading, error] = useAuthState(auth)
	const router = useRouter()

	const redirectPage = async () => {
		// TODO: Return home page
		if (user === null) return router.replace(link.root)
		const idTokenRes = await user.getIdTokenResult(true)
		if (idTokenRes.claims.role === 'admin') {
			return router.replace(link.admin.projects)
		} else {
			return router.replace(link.home)
		}
		// TODO: Redirect to different pages based on role
	}

	useEffect(() => {
		redirectPage()
	}, [loading])
}
