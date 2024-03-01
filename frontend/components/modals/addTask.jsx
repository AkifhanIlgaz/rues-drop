import TextInput from '@/components/inputs/textInput'
import { label } from '@/config/labels'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
export default function AddTaskModal({ isOpen, onOpenChange }) {
	const {
		register,
		handleSubmit,
		reset,

		clearErrors,
		formState: { errors }
	} = useForm()

	return (
		<Modal isOpen={isOpen} onOpenChange={onOpenChange} size="4xl" className="h-1/2">
			<ModalContent>
				{onClose => (
					<>
						<ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
						<ModalBody>
							<TextInput errors={errors} label={label.email} register={register} />
						</ModalBody>
						<ModalFooter>
							<Button color="danger" variant="light" onPress={onClose}>
								Close
							</Button>
							<Button color="primary" onPress={onClose}>
								Action
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	)
}
