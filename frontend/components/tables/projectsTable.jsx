'use client'

import { DiscordIcon, SiteIcon, TwitterIcon } from '@/components/icons'
import api from '@/config/api'
import { link } from '@/config/links'
import { Link, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, User } from '@nextui-org/react'
import clsx from 'clsx'
import React from 'react'
import useSWR from 'swr'

const columns = [
	{ name: 'Name', uid: 'name' },
	{ name: 'Links', uid: 'links' }
]

export default function ProjectsTable() {
	const { data: projects, isLoading } = useSWR(api.allProjects)

	const renderCell = React.useCallback((project, columnKey) => {
		const cellValue = project[columnKey]

		switch (columnKey) {
			case 'name':
				return <User className="text-md font-semibold" as={Link} color="foreground" href={`${link.projects}/${cellValue}`} avatarProps={{ radius: 'full', src: project.logo }} name={cellValue} />
			case 'links':
				return (
					<div className="flex items-center gap-4">
						<Link isExternal color="foreground" showAnchorIcon href={project.website} anchorIcon={<SiteIcon />}></Link>
						<Link isExternal color="foreground" showAnchorIcon href={project.twitter} anchorIcon={<TwitterIcon />}></Link>
						<Link isExternal color="foreground" showAnchorIcon href={project.discord} anchorIcon={<DiscordIcon />}></Link>
					</div>
				)
			default:
				return cellValue
		}
	}, [])

	return (
		<div className="flex justify-center">
			<Table aria-label="Example table with custom cells" className="w-2/3">
				<TableHeader columns={columns}>
					{column => (
						<TableColumn
							key={column.uid}
							className={clsx({
								'text-center': column.uid === 'actions',
								'pl-12': column.uid === 'links'
							})}
						>
							{column.name}
						</TableColumn>
					)}
				</TableHeader>
				(
				<TableBody emptyContent={'There are no projects to display'} items={projects || []} isLoading={isLoading} loadingContent={<Spinner />}>
					{item => <TableRow key={item.name}>{columnKey => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>}
				</TableBody>
				)
			</Table>
		</div>
	)
}
