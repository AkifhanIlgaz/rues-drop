'use client'
import SignInWithGoogleButton from '@/components/buttons/signInWithGoogle'
import PasswordInput from '@/components/inputs/passwordInput'
import TextInput from '@/components/inputs/textInput'
import OrSeparator from '@/components/orSeparator'
import { label } from '@/config/labels'
import { link } from '@/config/links'
import { text } from '@/config/text'
import { validateEmail } from '@/lib/email'
import firebaseClient from '@/lib/firebase'
import { Button, Link } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { useForm } from 'react-hook-form'
export default function Page() {
	const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(firebaseClient.auth)
	const router = useRouter()

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors }
	} = useForm()

	const [pending, setPending] = useState(false)

	const onSubmit = async data => {
		if (setErrors(data)) {
			return
		}

		setPending(true)
		try {
			await createUserWithEmailAndPassword(data.email, data.password)
			router.push(link.home)
		} catch (error) {
			console.log(error)
			// TODO: Handle error
		} finally {
			setPending(false)
		}
	}

	const setErrors = data => {
		let errorCount = 0

		if (data.password !== data.passwordConfirm) {
			setError('password', { type: 'validate' })
			setError('passwordConfirm', { type: 'validate' })
			errorCount++
		}

		if (!validateEmail(data.email)) {
			setError('email', { type: 'validate' })
			errorCount++
		}

		return errorCount > 0
	}

	return (
		<main className="flex items-center justify-center h-full">
			<div className="flex flex-col items-center justify-center h-screen w-1/4 gap-2">
				<div className="flex flex-col items-center mb-3">
					<h1 className="text-3xl font-bold text-black ">{text.welcome}</h1>
				</div>
				<div className="flex flex-col w-full gap-3">
					<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
						<TextInput label={label.email} errors={errors} register={register} required={true} />

						<PasswordInput errors={errors} register={register} label={label.password} required={true} />
						<PasswordInput errors={errors} register={register} label={label.passwordConfirm} required={true} />

						<Button type="submit" className="mt-4 w-full" color="primary" isLoading={pending}>
							{text.signUp}
						</Button>

						<div className="flex items-center justify-center text-small gap-2 mt-2">
							<span className="text-default-400">{text.alreadyHaveAccount}</span>
							<Link size="sm" href={link.signIn}>
								{text.signIn}
							</Link>
						</div>

						<OrSeparator />

						<SignInWithGoogleButton />
					</form>
				</div>
			</div>
		</main>
	)
}
