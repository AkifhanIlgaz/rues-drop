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
	const defaultContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

	const projectName = usePathname().split('/').at(-1)
	const items = [breadcrumbs.projects, { name: projectName }]

	const { data: project, isLoading } = useSWR(`${api.projects}/${projectName}`)

	if (isLoading) {
		return <Loading />
	}

	const itemClasses = {
		base: 'py-0 w-full bg-danger',
		title: 'font-normal text-medium',
		trigger: 'px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center',
		indicator: 'text-medium',
		content: 'text-small px-2'
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
					<Button>Add To-do</Button>
					<Button>Add Helpful Link</Button>
				</div>
			</div>

			<div className="grid grid-cols-2 gap-3 pb-8">
				<EditInput label={label.website} value={project.website} />
				<EditInput label={label.discord} value={project.discord} />
				<EditInput label={label.twitter} value={project.twitter} />
				<EditInput label={label.logo} value={project.logo} />
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
