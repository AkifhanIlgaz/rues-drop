import TextInput from '@/components/inputs/textInput'
import api from '@/config/api'
import { label } from '@/config/labels'
import firebaseClient from '@/lib/firebase'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
import axios from 'axios'
import { useIdToken } from 'react-firebase-hooks/auth'
export default function AddTask({ errors, register, handleSubmit, projectId }) {
	const [user] = useIdToken(firebaseClient.auth)
	const { isOpen, onOpen, onOpenChange } = useDisclosure()

	const addTask = async data => {
		const idToken = await user.getIdToken(true)
		try {
			const res = await axios.post(api.addTask, { ...data, projectId }, { headers: { Authorization: `Bearer ${idToken}` } })
			console.log(res)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<Button onPress={onOpen}>Add Task</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
				<form onSubmit={handleSubmit(addTask)}>
					<ModalContent>
						{onClose => (
							<>
								<ModalHeader className="flex flex-col gap-1">Add Task</ModalHeader>
								<ModalBody>
									<TextInput errors={errors} label={label.description} register={register} required={true} />
									<TextInput errors={errors} label={label.url} register={register} required={true} />
								</ModalBody>
								<ModalFooter>
									<Button color="danger" variant="light" onPress={onClose}>
										Close
									</Button>
									<Button type="submit" color="primary">
										Add
									</Button>
								</ModalFooter>
							</>
						)}
					</ModalContent>
				</form>
			</Modal>
		</>
	)
}
