'use client'

import { Label } from '@/components/label'
import api from '@/config/api'
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
import axios from 'axios'
import { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../lib/firebase'
import { EditIcon } from '../icons/edit'

export default function EditTask({ task }) {
	const [user] = useAuthState(auth)
	const [description, setDescription] = useState(task.description)
	const [url, setUrl] = useState(task.url)
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

	const editTask = async () => {
		// TODO: Handle the situation that user doesn't change values
		// TODO: Mutate || Revalidate data

		try {
			const idToken = await user.getIdToken(true)

			const res = await axios.put(
				`${api.tasks}/${task.id}`,
				{
					description,
					url
				},
				{ headers: { Authorization: `Bearer ${idToken}` } }
			)

			console.log(res)
		} catch (error) {
			console.log(error)
		} finally {
			onClose()
		}
	}

	return (
		<>
			<span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={onOpen}>
				<EditIcon />
			</span>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{onClose => (
						<>
							<ModalHeader className="flex flex-col gap-1">Edit Task</ModalHeader>
							<ModalBody>
								<Input
									color="primary"
									type="text"
									label={<Label label={'Description'} />}
									labelPlacement="outside"
									variant="bordered"
									endContent={
										<Button isIconOnly color="foreground">
											<EditIcon size={16} />
										</Button>
									}
									autoFocus
									onValueChange={setDescription}
									value={description}
								></Input>
								<Input
									color="primary"
									type="text"
									label={<Label label={'URL'} />}
									labelPlacement="outside"
									variant="bordered"
									endContent={
										<Button isIconOnly color="foreground">
											<EditIcon size={16} />
										</Button>
									}
									onValueChange={setUrl}
									value={url}
								></Input>
							</ModalBody>
							<ModalFooter>
								<Button
									color="danger"
									variant="light"
									onPress={() => {
										setDescription(task.description)
										setUrl(task.url)
										onClose()
									}}
								>
									Cancel
								</Button>
								<Button
									color="primary"
									onPress={() => {
										editTask()
									}}
								>
									Edit
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	)
}
