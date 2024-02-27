'use client'

import BreadCrumbs from '@/components/breadcrumbs'
import Loading from '@/components/loading'
import ProjectsTable from '@/components/tables/projectsTable'
import api from '@/config/api'
import { breadcrumbs, link } from '@/config/links'
import firebaseClient from '@/lib/firebase'
import { Button } from '@nextui-org/button'
import { Link } from '@nextui-org/link'
import axios from 'axios'
import { useTheme } from 'next-themes'
import { useAuthState } from 'react-firebase-hooks/auth'
import useSWR from 'swr'

export default function ProjectPage() {
	const [user, loading, error] = useAuthState(firebaseClient.auth)
	const fetcher = async url => {
		const idToken = await user.getIdToken(true)

		const res = await axios.get(url, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${idToken}`
			}
		})

		return res.data
	}
	const { data, isLoading } = useSWR(api.allProjects, fetcher)

	const { theme } = useTheme()

	const items = [breadcrumbs.projects]

	if (isLoading) return <Loading />

	return (
		<div>
			<div className="flex w-full h-5 items-center justify-between  mb-10">
				<BreadCrumbs items={items}></BreadCrumbs>

				<Button as={Link} href={link.addProject} className="mr-6" color={theme == 'light' ? 'primary' : 'danger'}>
					Add project
				</Button>
			</div>

			<ProjectsTable />
		</div>
	)
}
