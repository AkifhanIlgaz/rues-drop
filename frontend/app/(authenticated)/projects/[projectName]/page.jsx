'use client'

import BreadCrumbs from '@/components/breadcrumbs'
import Loading from '@/components/loading'
import { label } from '@/config/labels'
import { breadcrumbs } from '@/config/links'
import { Accordion, AccordionItem, Avatar, Button } from '@nextui-org/react'
import { usePathname } from 'next/navigation'
import useSWR from 'swr'
import EditInput from '../../../../components/inputs/editInput'
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

				<div className="flex gap-2">
					<Button>Add Task</Button>
					<Button>Add Helpful Link</Button>
				</div>
			</div>

			<div className="grid grid-cols-2 gap-3 pb-8">
				<EditInput projectName={projectName} label={label.website} value={project.website} />
				<EditInput projectName={projectName} label={label.discord} value={project.discord} />
				<EditInput projectName={projectName} label={label.twitter} value={project.twitter} />
				<EditInput projectName={projectName} label={label.logo} value={project.logo} />
			</div>

			<Accordion variant="bordered" isCompact>
				<AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
					<div color="foreground" className="w-full flex items-center justify-between">
						<span>Ddsfşlkdsflkdsf</span>
						<Button>sdşlfk</Button>
					</div>
				</AccordionItem>
			</Accordion>
		</div>
	)
}
