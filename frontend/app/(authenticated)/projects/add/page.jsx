'use client'

import BreadCrumbs from '@/components/breadcrumbs'
import TextInput from '@/components/inputs/textInput'
import { label } from '@/config/labels'
import { breadcrumbs } from '@/config/links'
import { Button } from '@nextui-org/button'
import { useForm } from 'react-hook-form'

export default function AddProject() {
	const items = [breadcrumbs.projects, breadcrumbs.addProject]

	const {
		register,
		handleSubmit,
		reset,
		setError,
		clearErrors,
		formState: { errors }
	} = useForm()

	const onSubmit = async data => {
		console.log(data)
	}

	return (
		<div className="w-full h-full">
			<div className="h-5 mb-3">
				<BreadCrumbs items={items}></BreadCrumbs>
			</div>

			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="grid grid-cols-2 gap-3 mt-8">
					<TextInput errors={errors} label={label.projectName} register={register} required={true} />
					<TextInput errors={errors} label={label.website} register={register} />
					<TextInput errors={errors} label={label.discord} register={register} />
					<TextInput errors={errors} label={label.twitter} register={register} />
					<TextInput errors={errors} label={label.ruesLink} register={register} />
					<TextInput errors={errors} label={label.todos} register={register} required={true} />

                    <div className='text-'></div>
				</div>
				<Button type="submit"> Add Project</Button>
			</form>
		</div>
	)
}
