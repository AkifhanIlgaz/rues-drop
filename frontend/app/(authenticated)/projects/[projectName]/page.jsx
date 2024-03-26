'use client'

import BreadCrumbs from '@/components/breadcrumbs'
import { DiscordIcon, SiteIcon, TwitterIcon } from '@/components/icons'
import Loading from '@/components/loading'
import Tasks from '@/components/project/user/tasks'
import { breadcrumbs } from '@/config/links'
import { Avatar, Link, Tab, Tabs } from '@nextui-org/react'
import { usePathname } from 'next/navigation'
import useSWR from 'swr'
import api from '../../../../config/api'

export default function Page() {
	const projectName = decodeURI(usePathname().split('/').at(-1).toString())

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
					<Avatar src={project.logo} size="md" />

					<div className="flex items-center justify-center gap-4">
						<span className="text-xl">{projectName}</span>
						<div className="flex items-center justify-center gap-3">
							<Link isExternal color="foreground" showAnchorIcon href={project.website} anchorIcon={<SiteIcon />}></Link>
							<Link isExternal color="foreground" showAnchorIcon href={project.twitter} anchorIcon={<TwitterIcon />}></Link>
							<Link isExternal color="foreground" showAnchorIcon href={project.discord} anchorIcon={<DiscordIcon />}></Link>
						</div>
					</div>
				</div>
			</div>

			<Tabs variant="underlined">
				<Tab title={'Tasks'}>
					<Tasks projectId={project.id} />
				</Tab>
			</Tabs>
		</div>
	)
}
