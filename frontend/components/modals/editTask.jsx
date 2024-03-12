'use client'

import { Label } from '@/components/label'
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
import { useState } from 'react'
import { EditIcon } from '../icons/edit'

export default function EditTask({ task }) {
	const [description, setDescription] = useState(task.description)
	const [url, setUrl] = useState(task.url)
	const { isOpen, onOpen, onOpenChange } = useDisclosure()

	const editTask = async () => {}

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
								<Button color="primary" onPress={onClose}>
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
