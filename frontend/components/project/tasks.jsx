import { Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, getKeyValue } from '@nextui-org/react'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import AddTask from '../modals/addTask'

const rows = [
	{
		key: '1',
		description: 'Join to discord',
		role: 'CEO',
		status: 'Active'
	},
	{
		key: '2',
		description: 'Zoey Lang',
		role: 'Technical Lead',
		status: 'Paused'
	},
	{
		key: '3',
		description: 'Jane Fisher',
		role: 'Senior Developer',
		status: 'Active'
	},
	{
		key: '4',
		description: 'William Howard',
		role: 'Community Manager',
		status: 'Vacation'
	}
]

const columns = [
	{
		key: 'description',
		label: 'Description'
	},
	{
		key: 'role',
		label: 'ROLE'
	},
	{
		key: 'status',
		label: 'STATUS'
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
			case 'description':
				return cellValue
			case 'role':
				return (
					<div className="flex flex-col">
						<p className="text-bold text-small capitalize">{cellValue}</p>
						<p className="text-bold text-tiny capitalize text-default-400">{user.team}</p>
					</div>
				)
			case 'status':
				return (
					<Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
						{cellValue}
					</Chip>
				)
			case 'actions':
				return (
					<div className="relative flex justify-end items-center gap-2">
						<Dropdown>
							<DropdownTrigger>
								<Button isIconOnly size="sm" variant="light">
									sdf
								</Button>
							</DropdownTrigger>
							<DropdownMenu>
								<DropdownItem>View</DropdownItem>
								<DropdownItem>Edit</DropdownItem>
								<DropdownItem>Delete</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</div>
				)
			default:
				return cellValue
		}
	}, [])

	return (
		<>
			<AddTask errors={errors} register={register} handleSubmit={handleSubmit} projectId={projectId} />
			<Table aria-label="Example table with dynamic content">
				<TableHeader columns={columns}>{column => <TableColumn key={column.key}>{column.label}</TableColumn>}</TableHeader>
				<TableBody items={rows}>{item => <TableRow key={item.key}>{columnKey => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}</TableRow>}</TableBody>
			</Table>
		</>
	)
}
