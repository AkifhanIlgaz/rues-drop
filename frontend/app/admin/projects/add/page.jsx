'use client'

import BreadCrumbs from '@/components/breadcrumbs'
import TextInput from '@/components/inputs/textInput'
import Loading from '@/components/loading'
import api from '@/config/api'
import { label } from '@/config/labels'
import { adminBreadcrumbs, link } from '@/config/links'
import firebaseClient from '@/lib/firebase'
import { Button } from '@nextui-org/button'
import axios from 'axios'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useForm } from 'react-hook-form'

export default function AddProject() {
	const { theme } = useTheme()
	const [user, loading, error] = useAuthState(firebaseClient.auth)
	const router = useRouter()
	const items = [adminBreadcrumbs.projects, adminBreadcrumbs.addProject]

	const {
		register,
		handleSubmit,
		reset,
		clearErrors,
		formState: { errors }
	} = useForm()

	const onSubmit = async data => {
		try {
			const idToken = await user.getIdToken(true)

			const res = await axios.post(api.addProject, data, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${idToken}`
				}
			})

			router.push(link.admin.projects)
		} catch (error) {
			console.log(error)
		}

		// TODO: If project is added successfully reset and redirect to projects page
	}

	if (loading) {
		return <Loading />
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="h-5 mb-3">
				<BreadCrumbs items={items}></BreadCrumbs>
			</div>

			<div className="grid grid-cols-2 gap-3 my-8">
				<TextInput errors={errors} label={label.projectName} register={register} required={true} />
				<TextInput errors={errors} label={label.website} register={register} />
				<TextInput errors={errors} label={label.discord} register={register} />
				<TextInput errors={errors} label={label.twitter} register={register} />
				<TextInput errors={errors} label={label.logo} register={register} />
			</div>

			<div className="flex justify-end mr-3">
				<Button color={theme === 'light' ? 'primary' : 'default'} type="submit" size="sm">
					Save
				</Button>
			</div>
		</form>
	)
}
