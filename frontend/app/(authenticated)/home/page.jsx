'use client'

import firebase from '@/lib/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

export default function Home() {
	const [user, loading, error] = useAuthState(firebase.auth)

	if (loading) {
		return (
			<div>
				<p>Initialising User...</p>
			</div>
		)
	}
	if (error) {
		return (
			<div>
				<p>Error: {error}</p>
			</div>
		)
	}
	if (user) {
		return (
			<div>
				<p>Current User: {user.email}</p>
				<button>Log out</button>
			</div>
		)
	}
	return <button>Log in</button>
}
