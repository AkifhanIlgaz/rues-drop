import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, User } from '@nextui-org/react'

import React from 'react'
import { DeleteIcon } from '../icons'

const columns = [
	{ name: 'Project Name', uid: 'name' },
	{ name: 'ROLE', uid: 'role' },
	{ name: 'ACTIONS', uid: 'actions' }
]

const users = [
	{
		id: 1,
		name: 'Tony Reichert',
		role: 'CEO',
		team: 'Management',

		age: '29',
		avatar: 'https://s2.coinmarketcap.com/static/img/coins/64x64/28932.png',
		email: 'tony.reichert@example.com'
	},
	{
		id: 2,
		name: 'Zoey Lang',
		role: 'Technical Lead',
		team: 'Development',

		age: '25',
		avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
		email: 'zoey.lang@example.com'
	},
	{
		id: 3,
		name: 'Jane Fisher',
		role: 'Senior Developer',
		team: 'Development',

		age: '22',
		avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
		email: 'jane.fisher@example.com'
	},
	{
		id: 4,
		name: 'William Howard',
		role: 'Community Manager',
		team: 'Marketing',

		age: '28',
		avatar: 'https://i.pravatar.cc/150?u=a048581f4e29026701d',
		email: 'william.howard@example.com'
	},
	{
		id: 5,
		name: 'Kristen Copper',
		role: 'Sales Manager',
		team: 'Sales',

		age: '24',
		avatar: 'https://i.pravatar.cc/150?u=a092581d4ef9026700d',
		email: 'kristen.cooper@example.com'
	}
]

export default function ProjectsTable() {
	const renderCell = React.useCallback((user, columnKey) => {
		const cellValue = user[columnKey]

		switch (columnKey) {
			case 'name':
				return <User className="text-md font-semibold " avatarProps={{ radius: 'full', src: user.avatar }} name={cellValue} />
			case 'role':
				return (
					<div className="flex flex-col">
						<p className="text-bold text-sm capitalize">{cellValue}</p>
						<p className="text-bold text-sm capitalize text-default-400">{user.team}</p>
					</div>
				)
			case 'actions':
				return (
					<div className="flex justify-end items-center gap-2">
						<Tooltip content="Delete">
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

	return (
		<Table aria-label="Example table with custom cells" hideHeader>
			<TableHeader columns={columns}>
				{column => (
					<TableColumn key={column.uid} align={column.uid === 'actions' ? 'center' : 'start'}>
						{column.name}
					</TableColumn>
				)}
			</TableHeader>
			<TableBody items={users}>{item => <TableRow key={item.id}>{columnKey => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>}</TableBody>
		</Table>
	)
}
