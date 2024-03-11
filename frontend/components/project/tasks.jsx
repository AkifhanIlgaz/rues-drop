import api from '@/config/api'

import EditTask from '@/components/modals/editTask'
import firebaseClient from '@/lib/firebase'
import { Chip, Input, Link, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from '@nextui-org/react'
import axios from 'axios'
import React, { useCallback } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useForm } from 'react-hook-form'
import useSWR from 'swr'
import { CheckIcon } from '../icons/check'
import { DeleteIcon } from '../icons/delete'
import AddTask from '../modals/addTask'

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
	const [user] = useAuthState(firebaseClient.auth)
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({})

	const deleteTask = async taskId => {
		try {
			const idToken = await user.getIdToken(true)

			await axios.delete(`${api.tasks}/${taskId}`, { headers: { Authorization: `Bearer ${idToken}` } })
		} catch (error) {
			console.log(error)
		}
	}

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
					<Link href={cellValue} isExternal showAnchorIcon isBlock className="text-sm">
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
					<div className="relative flex items-center justify-center gap-2">
						<Tooltip content="Edit task">
							<EditTask />
						</Tooltip>
						<Tooltip color="danger" content="Delete task">
							<span className="text-lg text-danger cursor-pointer active:opacity-50 " onClick={() => deleteTask(task.id)}>
								<DeleteIcon />
							</span>
						</Tooltip>
						<Tooltip color="success" content="Finish task" className="text-white">
							<span className="text-lg text-success cursor-pointer active:opacity-50" onClick={() => finishTask(task.id)}>
								<CheckIcon />
							</span>
						</Tooltip>
					</div>
				)
			default:
				return cellValue
		}
	}, [])

	const topContent = React.useMemo(() => {
		return (
			<div className="flex justify-between items-center ">
				<Input isClearable className="w-full sm:max-w-[44%]" placeholder="Search by description..." variant="flat" labelPlacement="outside" />
				<AddTask errors={errors} register={register} handleSubmit={handleSubmit} projectId={projectId} />
			</div>
		)
	}, [])

	const { data: tasks, isLoading } = useSWR(`${api.tasks}/${projectId}`)
	if (isLoading) return

	return (
		<Table aria-label="Tasks table" topContent={topContent} topContentPlacement="outside" className="mt-2">
			<TableHeader columns={columns}>
				{column => (
					<TableColumn className={column.key === 'actions' && ' text-center '} key={column.key}>
						{column.label}
					</TableColumn>
				)}
			</TableHeader>
			<TableBody items={tasks}>{item => <TableRow key={item.key}>{columnKey => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>}</TableBody>
		</Table>
	)
}
