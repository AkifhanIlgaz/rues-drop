'use client'

import BreadCrumbs from '@/components/breadcrumbs'
import Loading from '@/components/loading'
import AddTaskModal from '@/components/modals/addTask'
import ProjectInfo from '@/components/project/info'
import Tasks from '@/components/project/tasks'
import { breadcrumbs } from '@/config/links'
import { Avatar, Button, Tab, Tabs, useDisclosure } from '@nextui-org/react'
import { usePathname } from 'next/navigation'
import useSWR from 'swr'
import api from '../../../../config/api'

export default function Page() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()

	const projectName = usePathname().split('/').at(-1)
	const items = [breadcrumbs.projects, { name: projectName }]

	const { data: project, isLoading } = useSWR(`${api.projects}/${projectName}`)
	console.log(project)
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

				<div className="flex gap-2">
					<Button onPress={onOpen}>Add Task</Button>
					<Button>Add Helpful Link</Button>
				</div>
			</div>

			<Tabs variant="underlined">
				<Tab title={'Info'}>
					<ProjectInfo project={project} />
				</Tab>
				<Tab title={'Tasks'}>
					<Tasks />
				</Tab>
			</Tabs>

			<AddTaskModal isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} />
		</div>
	)
}
