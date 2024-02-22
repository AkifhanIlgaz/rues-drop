'use client'

import BreadCrumbs from '@/components/breadcrumbs'
import { breadcrumbs } from '@/config/links'

import PasswordInput from '@/components/inputs/passwordInput'
import TextInput from '@/components/inputs/textInput'
import Loading from '@/components/loading'
import { label } from '@/config/labels'
import firebaseClient from '@/lib/firebase'
import { Button } from '@nextui-org/button'
import { useTheme } from 'next-themes'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useForm } from 'react-hook-form'

export default function Page() {
	const { theme } = useTheme()
	const [user, loading, error] = useAuthState(firebaseClient.auth)
	const items = [breadcrumbs.users, breadcrumbs.createAdmin]

	const {
		register,
		handleSubmit,
		reset,
		clearErrors,
		formState: { errors }
	} = useForm()

	const onSubmit = async data => {
		console.log(data)
	}

	if (loading) {
		return <Loading />
	}
	return (
		<div className="w-full h-full">
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="h-5 mb-3">
					<BreadCrumbs items={items}></BreadCrumbs>
				</div>

				<div className="grid grid-cols-2 gap-3 mt-8">
					<TextInput errors={errors} label={label.username} register={register} required={true} />
					<PasswordInput errors={errors} label={label.password} register={register} required={true} />
				</div>

				<div className="flex justify-end mt-8 mr-3">
					<Button color={theme === 'light' ? 'primary' : 'default'} type="submit" size="sm">
						Save
					</Button>
				</div>
			</form>
		</div>
	)
}
