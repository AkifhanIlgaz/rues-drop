'use client'

import api from '@/config/api'
import { link } from '@/config/links'
import firebaseClient from '@/lib/firebase'
import { Link, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, User } from '@nextui-org/react'
import axios from 'axios'
import clsx from 'clsx'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import useSWR from 'swr'
import { DeleteIcon, DiscordIcon, SiteIcon, TwitterIcon } from '../icons'

const columns = [
	{ name: 'Project Name', uid: 'projectName' },
	{ name: 'Links', uid: 'links' },
	{ name: 'Actions', uid: 'actions' }
]

export default function ProjectsTable() {
	const [user, loading] = useAuthState(firebaseClient.auth)

	const { data: projects, isLoading, mutate } = useSWR(api.allProjects)

	const deleteProject = async name => {
		try {
			const idToken = await user.getIdToken(true)

			await axios.delete(api.projects + `/${name}`, {
				headers: {
					Authorization: `Bearer ${idToken}`
				}
			})

			const newData = data.filter(project => project.projectName !== name)
			await mutate(newData, false)
		} catch (error) {
			console.log(error)
		}
	}

	const renderCell = React.useCallback((project, columnKey) => {
		const cellValue = project[columnKey]

		switch (columnKey) {
			case 'projectName':
				return <User className="text-md font-semibold" as={Link} color="foreground" href={`${link.projects}/${cellValue}`} avatarProps={{ radius: 'full', src: project.logo }} name={cellValue} />
			case 'links':
				return (
					<div className="flex items-center gap-4">
						<Link isExternal color="foreground" showAnchorIcon href={project.website} anchorIcon={<SiteIcon />}></Link>
						<Link isExternal color="foreground" showAnchorIcon href={project.twitter} anchorIcon={<TwitterIcon />}></Link>
						<Link isExternal color="foreground" showAnchorIcon href={project.discord} anchorIcon={<DiscordIcon />}></Link>
					</div>
				)
			case 'actions':
				return (
					<div className=" flex justify-center items-center">
						<Tooltip color="danger" content="Delete Project">
							<span
								className="text-danger cursor-pointer active:opacity-50"
								onClick={() => {
									deleteProject(project.projectName)
								}}
							>
								<DeleteIcon />
							</span>
						</Tooltip>
					</div>
				)
			default:
				return cellValue
		}
	}, [])

	return (
		<Table aria-label="Example table with custom cells">
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
				{item => <TableRow key={item.id}>{columnKey => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>}
			</TableBody>
			)
		</Table>
	)
}