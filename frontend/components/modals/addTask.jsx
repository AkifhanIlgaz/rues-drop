import TextInput from '@/components/inputs/textInput'
import api from '@/config/api'
import { label } from '@/config/labels'
import firebaseClient from '@/lib/firebase'
import { PlusIcon } from '@heroicons/react/24/outline'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
import axios from 'axios'
import clsx from 'clsx'
import { useIdToken } from 'react-firebase-hooks/auth'
export default function AddTask({ errors, register, handleSubmit, projectId }) {
	const [user] = useIdToken(firebaseClient.auth)
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

	const addTask = async data => {
		const idToken = await user.getIdToken(true)
		try {
			const res = await axios.post(api.addTask, { ...data, projectId }, { headers: { Authorization: `Bearer ${idToken}` } })
			console.log(res)

			// TODO: Handle errors
			if (res.status === 200) {
				onClose()
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<Button onPress={onOpen} className={clsx('text-primary-foreground bg-primary', 'dark:text-danger-foreground dark:bg-danger')} startContent={<PlusIcon className="text-white w-5 h-5" />}>
				Add Task
			</Button>
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
