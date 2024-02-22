import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { firebaseConfig } from '../config/firebase'

firebase.initializeApp(firebaseConfig)

class Firebase {
	constructor() {
		this.auth = firebase.auth()
		this.googleProvider = new firebase.auth.GoogleAuthProvider()
	}

	async signOut() {
		this.auth.signOut()
	}
}

const firebaseClient = new Firebase()

export default firebaseClient
