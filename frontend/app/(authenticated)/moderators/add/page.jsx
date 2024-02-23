'use client'

import BreadCrumbs from '@/components/breadcrumbs'
import PasswordInput from '@/components/inputs/passwordInput'
import ProjectInput from '@/components/inputs/projectInput'
import TextInput from '@/components/inputs/textInput'
import Loading from '@/components/loading'
import api from '@/config/api'
import { label } from '@/config/labels'
import { breadcrumbs } from '@/config/links'
import firebaseClient from '@/lib/firebase'
import { Button } from '@nextui-org/button'
import axios from 'axios'
import { useTheme } from 'next-themes'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useForm } from 'react-hook-form'

// TODO: Get projects from backend
const projects = [{ name: 'Zircuit' }, { name: 'Dymension' }, { name: 'Blocksense' }, { name: 'Blockless' }, { name: 'Superposition' }]

export default function Page() {
	const { theme } = useTheme()
	const [user, loading, error] = useAuthState(firebaseClient.auth)
	const items = [breadcrumbs.moderators, breadcrumbs.createModerator]

	const {
		register,
		handleSubmit,
		setError,
		setValue,
		formState: { errors }
	} = useForm({ defaultValues: { projects: [] } })

	const onSubmit = async data => {
		if (data.password !== data.confirmPassword) {
			setError('password', { type: 'validate' })
			setError('confirmPassword', { type: 'validate' })
			return
		}

		if (data.projects.length === 0) return
		try {
			const idToken = await user.getIdToken(true)

			const res = await axios.post(api.addModerator, data, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${idToken}`
				}
			})

			console.log(res)
		} catch (error) {
			console.log(error)
		}
		console.log(data)
	}

	if (loading) {
		return <Loading />
	}
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="h-5 mb-3">
				<BreadCrumbs items={items}></BreadCrumbs>
			</div>

			<div className="grid grid-cols-2 gap-3 mt-8">
				<TextInput errors={errors} label={label.username} register={register} required={true} />
				<PasswordInput errors={errors} label={label.password} register={register} required={true} />
				<ProjectInput errors={errors} projects={projects} setValue={setValue} />
				<div className="flex  flex-col gap-6">
					<PasswordInput errors={errors} label={label.passwordConfirm} register={register} required={true} />
					<Button className="w-1/12 self-end " color={theme === 'light' ? 'primary' : 'default'} type="submit" size="sm">
						Save
					</Button>
				</div>
			</div>
		</form>
	)
}
