'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../lib/firebase'

export default function AdminRoute({ children }) {
	const router = useRouter()
	const [user, loading, error] = useAuthState(auth)

	useEffect(() => {
		user.getIdTokenResult(true).then(res => {
			if (!['moderator', 'admin'].includes(res.claims.role)) {
				router.push('/')
			}
		})
	}, [user, router])

	if (loading) return

	return <>{children}</>
}
