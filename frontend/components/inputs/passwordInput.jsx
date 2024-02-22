import { generateError } from '@/lib/errors'
import { Input } from '@nextui-org/react'
import { useState } from 'react'
import PasswordVisibilityToggleButton from '../buttons/passwordVisibilityToggleButton'
import { Label } from '../label'

export default function PasswordInput({ register, errors, label, required = false }) {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false)

	const togglePasswordVisibility = () => {
		setIsPasswordVisible(!isPasswordVisible)
	}

	return (
		<Input
			color="primary"
			type={isPasswordVisible ? 'text' : 'password'}
			endContent={<PasswordVisibilityToggleButton isPasswordVisible={isPasswordVisible} togglePasswordVisibility={togglePasswordVisibility} />}
			placeholder={label.title}
			labelPlacement="outside"
			variant="bordered"
			label={<Label label={label.title} isRequired={required}></Label>}
			onPaste={e => {
				e.preventDefault()
			}}
			classNames={{ errorMessage: 'text-danger text-sm pt-1' }}
			errorMessage={errors[label.key] && generateError(label.key, errors[label.key])}
			{...register(label.key, {
				required,
				minLength: 6
			})}
		/>
	)
}
