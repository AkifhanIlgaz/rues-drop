'use client'

import api from '@/config/api'
import firebaseClient from '@/lib/firebase'
import { Autocomplete, AutocompleteItem, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, User, useDisclosure } from '@nextui-org/react'
import axios from 'axios'
import clsx from 'clsx'
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import useSWR from 'swr'
import { auth } from '../../lib/firebase'
import { DeleteIcon } from '../icons/delete'
import { Label } from '../label'

const columns = [
	{ name: 'Username', uid: 'username' },
	{ name: 'Action', uid: 'action' }
]

export default function ModeratorsTable({ projectName }) {
	const [user] = useAuthState(auth)

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
			<Table aria-label="Example table with custom cells" className="w-1/2" topContentPlacement="outside" topContent={<AddModerator projectName={projectName} />}>
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
				<TableBody emptyContent={'There are no moderators to display'} items={moderators || []} isLoading={isLoading} loadingContent={<Spinner />}>
					{item => <TableRow key={item.uid}>{columnKey => <TableCell align="end">{renderCell(item, columnKey)}</TableCell>}</TableRow>}
				</TableBody>
				)
			</Table>
		</div>
	)
}

function AddModerator({ projectName }) {
	const [user] = useAuthState(firebaseClient.auth)
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
	const [selectedModerator, setSelectedModerator] = useState('')

	const { data: moderators } = useSWR(api.allModerators)

	const addMod = async () => {
		try {
			const idToken = await user.getIdToken(true)

			const res = await axios.put(
				api.addModerator,
				{ projectName, id: selectedModerator },
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${idToken}`
					}
				}
			)

			console.log(res)
		} catch (error) {
			console.log(error)
		} finally {
			onClose()
		}
	}

	return (
		<div className="flex self-end">
			<Button onClick={onOpen} size="sm">
				Add Moderator
			</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{onClose => (
						<>
							<ModalHeader className="flex flex-col gap-1">Add Moderator</ModalHeader>
							<ModalBody>
								<Autocomplete onSelectionChange={setSelectedModerator} variant="bordered" labelPlacement="outside" defaultItems={moderators} label={<Label label={'Moderators'} isRequired={true} />} placeholder={'Select a moderator'}>
									{mod => <AutocompleteItem key={mod.id}>{mod.username}</AutocompleteItem>}
								</Autocomplete>
							</ModalBody>
							<ModalFooter>
								<Button color="danger" variant="light" onPress={onClose}>
									Cancel
								</Button>
								<Button color="primary" onPress={addMod}>
									Add
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</div>
	)
}
