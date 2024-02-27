'use client'

import { Label } from '@/components/label'
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
import { EditIcon } from '../icons'
export default function EditInput({ label, value }) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()
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
						<EditIcon size={18} />
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
								<Input color="primary" type="text" placeholder={label.title} labelPlacement="outside" variant="bordered" autoFocus />
							</ModalBody>
							<ModalFooter>
								<Button color="danger" variant="light" onPress={onClose}>
									Cancel
								</Button>
								<Button color="primary" onPress={onClose}>
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
