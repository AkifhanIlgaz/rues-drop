'use client'

import BreadCrumbs from '@/components/breadcrumbs'
import { DeleteIcon } from '@/components/icons/delete'
import Loading from '@/components/loading'
import ProjectInfo from '@/components/project/info'
import Tasks from '@/components/project/tasks'
import ModeratorsTable from '@/components/tables/admin/moderatorsTable'
import { adminBreadcrumbs } from '@/config/links'
import { BriefcaseIcon, InformationCircleIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import { Avatar, Button, Tab, Tabs } from '@nextui-org/react'
import axios from 'axios'
import { usePathname } from 'next/navigation'
import { useAuthState } from 'react-firebase-hooks/auth'
import useSWR from 'swr'
import api from '../../../../config/api'
import { auth } from '../../../../lib/firebase'

export default function Page() {
	const [user] = useAuthState(auth)
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
				<Tab
					title={
						<div className="flex items-center space-x-2">
							<InformationCircleIcon className="w-5 h-5" />
							<span>Info</span>
						</div>
					}
				>
					<ProjectInfo project={project} />
				</Tab>
				<Tab
					title={
						<div className="flex items-center space-x-2">
							<BriefcaseIcon className="w-5 h-5" />
							<span>Tasks</span>
						</div>
					}
				>
					<Tasks projectName={project.name} />
				</Tab>
				<Tab
					title={
						<div className="flex items-center space-x-2">
							<UserGroupIcon className="w-5 h-5" />
							<span>Moderators</span>
						</div>
					}
				>
					<ModeratorsTable projectName={projectName} />
				</Tab>
			</Tabs>
		</div>
	)
}
