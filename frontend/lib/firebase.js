// import { firebaseConfig } from '@/config/firebase'
import { getAuth } from 'firebase/auth'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

const init = () => {
	const config = JSON.parse(process.env.FIREBASE)

	return firebase.initializeApp(config)
}

const app = init()
export const auth = getAuth(app)
