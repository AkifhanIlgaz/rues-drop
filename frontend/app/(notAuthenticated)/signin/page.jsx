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
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { useForm } from 'react-hook-form'

export default function Page() {
	const router = useRouter()

	const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(firebaseClient.auth)

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors }
	} = useForm()

	const [pending, setPending] = useState(false)

	const onSubmit = async data => {
		if (!validateEmail(data.email)) {
			setError('email', { type: 'validate' })
			return
		}

		setPending(true)
		try {
			const credentials = await signInWithEmailAndPassword(data.email, data.password)
			if (credentials == undefined) {
				// TODO: show error
				return
			}
			router.replace(link.home)
		} catch (error) {
			console.log(error)
			// TODO: Handler error
		} finally {
			setPending(false)
		}
	}

	return (
		<main className="flex items-center justify-center h-full">
			<div className="flex flex-col items-center justify-center h-screen w-1/4 gap-2">
				<div className="flex flex-col items-center mb-3">
					<h1 className="text-3xl font-bold text-black ">{text.welcome}</h1>
				</div>
				<div className="flex flex-col w-full ">
					<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
						<TextInput label={label.email} errors={errors} register={register} required={true} />

						<PasswordInput errors={errors} register={register} label={label.password} required={true} />

						<div className="flex justify-between">
							<Link size="sm" href={link.signUp}>
								{text.noAccount}
							</Link>
							<Link size="sm" href={link.forgotPassword}>
								{text.forgotPassword}
							</Link>
						</div>

						<Button type="submit" className="mt-2 w-full" color="primary" isLoading={pending}>
							{text.signIn}
						</Button>

						<OrSeparator />

						<SignInWithGoogleButton />
					</form>
				</div>
			</div>
		</main>
	)
}
