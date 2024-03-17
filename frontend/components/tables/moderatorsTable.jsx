'use client'

import api from '@/config/api'
import firebaseClient from '@/lib/firebase'
import { Button, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, User } from '@nextui-org/react'
import axios from 'axios'
import clsx from 'clsx'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import useSWR from 'swr'
import { DeleteIcon } from '../icons/delete'

const columns = [
	{ name: 'Username', uid: 'username' },
	{ name: 'Action', uid: 'action' }
]

export default function ModeratorsTable({ projectName }) {
	const [user] = useAuthState(firebaseClient.auth)
	const { data: moderators, isLoading } = useSWR(`${api.moderators}/${projectName}`)

	const deleteModerator = async uid => {
		try {
			const idToken = await user.getIdToken(true)

			const res = await axios.delete(api.deleteModerator, {
				data: { uid, projectName },
				headers: {
					Authorization: `Bearer ${idToken}`
				}
			})

			console.log(res)
		} catch (error) {
			console.log(error)
		}
	}

	const renderCell = React.useCallback((mod, columnKey) => {
		const cellValue = mod[columnKey]

		switch (columnKey) {
			case 'username':
				return <User className="text-md font-semibold" color="foreground" avatarProps={{ radius: 'full' }} name={cellValue} />
			case 'action':
				return (
					<div className="flex justify-end">
						<Button color="danger" startContent={<DeleteIcon className="w-4 h-4" />} size="sm" onClick={() => deleteModerator(mod.uid)}>
							Remove
						</Button>
					</div>
				)
			default:
				return cellValue
		}
	}, [])

	return (
		<div className="flex justify-center mt-6">
			<Table aria-label="Example table with custom cells" className="w-1/2">
				<TableHeader columns={columns}>
					{column => (
						<TableColumn
							key={column.uid}
							className={clsx({
								'text-end pr-10 ': column.uid === 'action'
							})}
						>
							{column.name}
						</TableColumn>
					)}
				</TableHeader>
				(
				<TableBody emptyContent={'There are no projects to display'} items={moderators || []} isLoading={isLoading} loadingContent={<Spinner />}>
					{item => <TableRow key={item.uid}>{columnKey => <TableCell align="end">{renderCell(item, columnKey)}</TableCell>}</TableRow>}
				</TableBody>
				)
			</Table>
		</div>
	)
}
