'use client'

import firebaseClient from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import { useAuthState } from 'react-firebase-hooks/auth'

export default function Home() {
	const [user, loading, error] = useAuthState(firebaseClient.auth)
	const router = useRouter()

	// const redirectPage = async () => {
	// 	// TODO: Return home page
	// 	if (user === null) return <span>Unauthorized</span>
	// 	const idTokenRes = await user.getIdTokenResult(true)
	// 	if (idTokenRes.claims.role === 'admin') {
	// 		return router.replace(link.admin.projects)
	// 	} else {
	// 		return router.replace(link.home)
	// 	}
	// 	// TODO: Redirect to different pages based on role
	// }

	// useEffect(() => {
	// 	redirectPage()
	// }, [loading])
}
