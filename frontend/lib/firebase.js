import fb from 'firebase/compat/app'
import 'firebase/compat/auth'
import { firebaseConfig } from '../config/firebase'

fb.initializeApp(firebaseConfig)

class Firebase {
	constructor() {
		this.auth = fb.auth()
		this.googleProvider = new fb.auth.GoogleAuthProvider()
	}

	async signInWithGoogle() {
		try {
			const userCredential = await this.auth.signInWithPopup(provider)
			const user = {
				displayName: userCredential.user.displayName,
				uid: userCredential.user.uid,
				photoUrl: userCredential.user.photoURL,
				isProfileSet: userCredential.user.photoURL === '' || userCredential.user.displayName === '' ? false : true
			}

			//   if (userCredential.additionalUserInfo.isNewUser) {
			//     await fetch(`${baseUrl}${addUser}`, {
			//       method: 'POST',
			//       headers: {
			//         Authorization: await userCredential.user.getIdToken(true),
			//         'Content-Type': 'application/json',
			//       },
			//       body: JSON.stringify(user),
			//     });
			//   }

			return user
		} catch (error) {
			throw error
		}
	}

	async signOut() {
		this.auth.signOut()
	}
}

const firebase = new Firebase()

export default firebase
