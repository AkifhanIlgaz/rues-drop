'use client'

import Loading from '@/components/loading'
import AuthenticatedNavbar from '@/components/navbar/authenticatedNavbar'
import Sidebar from '@/components/sidebar/sidebar'
import { link } from '@/config/links'
import firebase from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

export default function Layout({ children }) {
	const [user, loading, error] = useAuthState(firebase.auth)
	const router = useRouter()

	const [isSidebarOpen, setIsSidebarOpen] = useState(true)

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen)
	}

	if (loading) {
		return <Loading />
	}

	if (error || !user) {
		router.replace(link.root)
	}

	return (
		<div className="flex flex-col w-auto h-screen  ">
			<AuthenticatedNavbar toggleSidebar={toggleSidebar} />
			<div className="flex h-full">
				{isSidebarOpen && <Sidebar />}
				<div className="w-full h-full p-3">{children}</div>
			</div>
		</div>
	)
}
