'use client'

import Loading from '@/components/loading'
import AuthenticatedNavbar from '@/components/navbar/authenticatedNavbar'
import Sidebar from '@/components/sidebar/sidebar'
import { link } from '@/config/links'
import firebaseClient from '@/lib/firebase'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { SWRConfig } from 'swr'

export default function Layout({ children }) {
	const [user, loading, error] = useAuthState(firebaseClient.auth)
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
				<div className="w-full h-full p-8">
					<SWRConfig
						value={{
							fetcher: async url => {
								const idToken = await user.getIdToken(true)

								const res = await axios.get(url, {
									headers: {
										'Content-Type': 'application/json',
										Authorization: `Bearer ${idToken}`
									}
								})

								return res.data
							}
						}}
					>
						{children}
					</SWRConfig>
				</div>
			</div>
		</div>
	)
}
