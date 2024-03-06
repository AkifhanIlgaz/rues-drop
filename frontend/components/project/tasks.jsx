import api from '@/config/api'
import { Chip, Link, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import useSWR from 'swr'
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
		key: 'url',
		label: 'URL'
	}
]

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
					<Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
						{cellValue}
					</Chip>
				)
			case 'url':
				return (
					<Link href={cellValue} isExternal isBlock showAnchorIcon color="danger">
						{cellValue}
					</Link>
				)
			case 'createdAt':
				const date = new Date(cellValue)
				return date.toLocaleDateString()
			default:
				return cellValue
		}
	}, [])

	const { data: tasks, isLoading } = useSWR(`${api.tasks}/${projectId}`)
	if (isLoading) return
	console.log(tasks)
	return (
		<>
			<AddTask errors={errors} register={register} handleSubmit={handleSubmit} projectId={projectId} />
			<Table aria-label="Example table with dynamic content">
				<TableHeader columns={columns}>{column => <TableColumn key={column.key}>{column.label}</TableColumn>}</TableHeader>
				<TableBody items={tasks}>{item => <TableRow key={item.key}>{columnKey => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>}</TableBody>
			</Table>
		</>
	)
}
