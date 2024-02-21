import { generateError } from '@/lib/errors'
import { Input } from '@nextui-org/react'
import { Label } from '../label'

export default function TextInput({ register, errors, label, required = false }) {
	return (
		<Input
			color="primary"
			type="text"
			placeholder={label.title}
			label={<Label label={label.title} isRequired={required} />}
			labelPlacement="outside"
			variant="bordered"
			classNames={{ errorMessage: 'text-danger text-sm pt-1' }}
			errorMessage={errors[label.key] && generateError(label.key, errors[label.key])}
			{...register(label.key, {
				required
			})}
		/>
	)
}
