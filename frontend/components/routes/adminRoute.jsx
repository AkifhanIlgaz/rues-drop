'use client'

import firebaseClient from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

export default function AdminRoute({ children }) {
	const router = useRouter()

	const [user, loading, error] = useAuthState(firebaseClient.auth)

	useEffect(() => {
		user.getIdTokenResult(true).then(res => {
			if (res.claims.role !== 'admin') {
				router.push('/')
			}
		})
	}, [user, router])

	return <>{children}</>
}
