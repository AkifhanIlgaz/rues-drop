import { BookmarkIcon } from '@/components/icons/bookmark'
import { CheckIcon } from '@/components/icons/check'
import api from '@/config/api'
import { auth } from '@/lib/firebase'
import { Chip, Link, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import axios from 'axios'
import { useCallback } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
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

export default function Tasks({ projectName }) {
	const [user] = useAuthState(auth)

	const action = async (taskId, type) => {
		try {
			const idToken = await user.getIdToken(true)
			const res = await axios.post(api.action, { projectName, taskId, type }, { headers: { Authorization: `Bearer ${idToken}` } })

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
					<div className="flex items-center justify-center gap-2 ">
						{/* TODO: Update */}
						{task.isDone && (
							<Chip size="sm" variant="shadow" startContent={<CheckIcon className="w-4 h-4 " />} color="warning" className="cursor-pointer text-white" onClick={() => action(task.id, 'Done')}>
								Done
							</Chip>
						)}

						{task.isBookmarked && (
							<Chip size="sm" variant="shadow" startContent={<BookmarkIcon className="w-4 h-4" />} color="primary" className="cursor-pointer" onClick={() => action(task.id, 'Bookmark')}>
								Save
							</Chip>
						)}
					</div>
				)
			default:
				return cellValue
		}
	}, [])

	const { data: tasks, isLoading } = useSWR(`${api.tasks}/${projectName}`)
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
