'use client'

import BreadCrumbs from '@/components/breadcrumbs'
import { DeleteIcon } from '@/components/icons/delete'
import Loading from '@/components/loading'
import ProjectInfo from '@/components/project/info'
import Tasks from '@/components/project/tasks'
import { adminBreadcrumbs } from '@/config/links'
import firebaseClient from '@/lib/firebase'
import { Avatar, Button, Tab, Tabs } from '@nextui-org/react'
import { usePathname } from 'next/navigation'
import { useAuthState } from 'react-firebase-hooks/auth'
import useSWR from 'swr'
import api from '../../../../config/api'

export default function Page() {
	const [user] = useAuthState(firebaseClient.auth)
	const projectName = decodeURI(usePathname().split('/').at(-1).toString())

	const items = [adminBreadcrumbs.projects, { name: projectName }]
	const { data: project, isLoading } = useSWR(`${api.projects}/${projectName}`)
	if (isLoading) {
		return <Loading />
	}

	const deleteProject = async () => {
		try {
			const idToken = await user.getIdToken(true)

			await axios.delete(api.projects + `/${projectName}`, {
				headers: {
					Authorization: `Bearer ${idToken}`
				}
			})
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className="w-full h-full">
			<BreadCrumbs items={items} />

			<div className="flex w-full items-center justify-between p-8 ">
				<div className="flex w-full items-center gap-4 ">
					<Avatar src={project.logo} size="lg" />
					<span className="text-2xl">{projectName}</span>
				</div>
				<Button color="danger" startContent={<DeleteIcon className="w-7 h-7" />} onClick={deleteProject}>
					Delete Project
				</Button>
			</div>

			<Tabs variant="underlined">
				<Tab title={'Info'}>
					<ProjectInfo project={project} />
				</Tab>
				<Tab title={'Tasks'}>
					<Tasks projectId={project.id} />
				</Tab>
			</Tabs>
		</div>
	)
}
