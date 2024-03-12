'use client'

import BreadCrumbs from '@/components/breadcrumbs'
import Loading from '@/components/loading'
import ProjectInfo from '@/components/project/info'
import Tasks from '@/components/project/tasks'
import { breadcrumbs } from '@/config/links'
import { Avatar, Tab, Tabs } from '@nextui-org/react'
import { usePathname } from 'next/navigation'
import useSWR from 'swr'
import api from '../../../../config/api'

export default function Page() {
	const projectName = usePathname().split('/').at(-1)
	const items = [breadcrumbs.projects, { name: projectName }]

	const { data: project, isLoading } = useSWR(`${api.projects}/${projectName}`)
	if (isLoading) {
		return <Loading />
	}

	// TODO: Links & Todo

	return (
		<div className="w-full h-full">
			<BreadCrumbs items={items} />

			<div className="flex w-full items-center justify-between p-8 ">
				<div className="flex w-full items-center gap-4 ">
					<Avatar src={project.logo} size="lg" />
					<span className="text-2xl">{projectName}</span>
				</div>
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
