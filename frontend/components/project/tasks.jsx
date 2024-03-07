import api from '@/config/api'
import { Chip, Link, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from '@nextui-org/react'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import useSWR from 'swr'
import { DeleteIcon } from '../icons/delete'
import { EditIcon } from '../icons/edit'
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
		key: 'url',
		label: 'URL'
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
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({})

	const renderCell = useCallback((user, columnKey) => {
		const cellValue = user[columnKey]

		switch (columnKey) {
			case 'status':
				return (
					<Chip className="capitalize" color={statusColorMap[cellValue]} size="sm" variant="flat">
						{cellValue}
					</Chip>
				)
			case 'url':
				return <Link href={cellValue} isExternal showAnchorIcon color="primary"></Link>
			case 'createdAt':
				const date = new Date(cellValue)
				return date.toLocaleDateString('tr-TR')
			case 'actions':
				return (
					<div className="relative flex items-center gap-2">
						<Tooltip content="Edit task">
							<span className="text-lg text-default-400 cursor-pointer active:opacity-50">
								<EditIcon />
							</span>
						</Tooltip>
						<Tooltip color="danger" content="Delete task">
							<span className="text-lg text-danger cursor-pointer active:opacity-50">
								<DeleteIcon />
							</span>
						</Tooltip>
					</div>
				)
			default:
				return cellValue
		}
	}, [])

	const { data: tasks, isLoading } = useSWR(`${api.tasks}/${projectId}`)
	if (isLoading) return

	return (
		<>
			<AddTask errors={errors} register={register} handleSubmit={handleSubmit} projectId={projectId} />
			<Table isStriped aria-label="Example table with dynamic content">
				<TableHeader columns={columns}>
					{column => (
						<TableColumn align={column.key === 'actions' ? 'end' : 'start'} key={column.key}>
							{column.label}
						</TableColumn>
					)}
				</TableHeader>
				<TableBody items={tasks}>{item => <TableRow key={item.key}>{columnKey => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>}</TableBody>
			</Table>
		</>
	)
}
