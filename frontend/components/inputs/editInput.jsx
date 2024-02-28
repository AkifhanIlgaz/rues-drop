'use client'

import { Label } from '@/components/label'
import api from '@/config/api'
import firebaseClient from '@/lib/firebase'
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
import axios from 'axios'
import { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { EditIcon } from '../icons'

export default function EditInput({ projectName, label, value }) {
	const [user] = useAuthState(firebaseClient.auth)
	const { isOpen, onOpen, onOpenChange } = useDisclosure()
	const [editInput, setEditInput] = useState('')

	const edit = async () => {
		const query = new Map()
		query.set(label.key, editInput)

		try {
			const idToken = await user.getIdToken(true)
			const res = await axios.put(`${api.projects}/${projectName}`, {}, { params: Object.fromEntries(query), headers: { Authorization: `Bearer ${idToken}` } })

			console.log(res)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<Input
				color="primary"
				type="text"
				placeholder={label.title}
				label={<Label label={label.title} />}
				labelPlacement="outside"
				variant="bordered"
				endContent={
					<Button isIconOnly color="foreground" onClick={onOpen}>
						<EditIcon size={16} />
					</Button>
				}
				isReadOnly
				value={value}
			/>

			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{onClose => (
						<>
							<ModalHeader className="flex flex-col gap-1">Edit {label.title}</ModalHeader>
							<ModalBody>
								<Input
									color="primary"
									type="text"
									placeholder={label.title}
									labelPlacement="outside"
									variant="bordered"
									autoFocus
									onChange={e => {
										setEditInput(e.target.value)
									}}
								/>
							</ModalBody>
							<ModalFooter>
								<Button
									color="danger"
									variant="light"
									onPress={() => {
										setEditInput('')
										onClose()
									}}
								>
									Cancel
								</Button>
								<Button
									color="primary"
									onPress={async () => {
										await edit()
										onClose()
									}}
								>
									Save
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	)
}
