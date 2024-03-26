import api from '@/config/api'

import { CheckIcon } from '@/components/icons/check'
import { auth } from '@/lib/firebase'
import { Button, Chip, Link, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import axios from 'axios'
import { useCallback } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useForm } from 'react-hook-form'
import useSWR from 'swr'

const columns = [
	{
		key: 'description',
		label: 'Description'
	},
	{
		key: 'createdAt',
		label: 'Created At'
	},
	{
		key: 'status',
		label: 'Status'
	},
	{
		key: 'actions',
		label: 'Actions'
	}
]

const statusColorMap = {
	'In Progress': 'warning',
	Finished: 'success'
}

export default function Tasks({ projectId }) {
	const [user] = useAuthState(auth)
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({})

	const finishTask = async taskId => {
		try {
			const idToken = await user.getIdToken(true)
			const res = await axios.put(`${api.finishTask}/${taskId}`, undefined, { headers: { Authorization: `Bearer ${idToken}` } })

			console.log(res)
		} catch (error) {
			console.log(error)
		}
	}

	const renderCell = useCallback((task, columnKey) => {
		const cellValue = task[columnKey]

		switch (columnKey) {
			case 'description':
				return (
					<Link href={task['url']} isExternal showAnchorIcon isBlock className="text-sm">
						{cellValue}
					</Link>
				)
			case 'status':
				return (
					<Chip className="capitalize" color={statusColorMap[cellValue]} size="sm" variant="flat">
						{cellValue}
					</Chip>
				)
			case 'createdAt':
				const date = new Date(cellValue)
				return date.toLocaleDateString('tr-TR')
			case 'actions':
				return (
					<div className="relative flex items-center justify-center ">
						<Chip as={Button} variant="shadow" color="success" onClick={() => finishTask(task.id)}>
							<div className="flex text-white">
								<CheckIcon />
								Finish Task
							</div>
						</Chip>
					</div>
				)
			default:
				return cellValue
		}
	}, [])

	const { data: tasks, isLoading } = useSWR(`${api.tasks}/${projectId}`)
	if (isLoading) return

	return (
		<div className="flex justify-center">
			<Table aria-label="Tasks table" topContentPlacement="outside" className="mt-2 ">
				<TableHeader columns={columns}>
					{column => (
						<TableColumn className={column.key === 'actions' && ' text-center '} key={column.key}>
							{column.label}
						</TableColumn>
					)}
				</TableHeader>
				<TableBody items={tasks}>{item => <TableRow key={item.key}>{columnKey => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>}</TableBody>
			</Table>
		</div>
	)
}
