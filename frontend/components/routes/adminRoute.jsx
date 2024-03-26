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
			if (res.claims.role !== 'admin' || res.claims.projects.length === 0) {
				router.push('/')
			}
		})
	}, [user, router])

	if (loading) return

	return <>{children}</>
}
