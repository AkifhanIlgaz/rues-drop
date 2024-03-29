import { link } from '@/config/links'
import { text } from '@/config/text'
import { Button } from '@nextui-org/button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { auth } from '../../lib/firebase'
import { GoogleLogo } from '../icons'

export default function SignInWithGoogleButton() {
	const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth)
	const [pending, setPending] = useState(false)
	const router = useRouter()

	const signIn = async () => {
		try {
			const credentials = await signInWithGoogle()
			if (credentials === undefined) {
				// TODO: Handle
				return
			}
			router.replace(link.home)
		} catch (error) {
			console.log(error)
			// TODO: Handle error
		}
	}

	// TODO: Show different components based on loading, error state

	return (
		<Button className="text-sm flex gap-2 shadow-md" variant="ghost" startContent={<GoogleLogo size={20} />} onClick={signIn} isLoading={pending}>
			{text.signInWithGoogle}
		</Button>
	)
}
