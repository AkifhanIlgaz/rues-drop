// import { firebaseConfig } from '@/config/firebase'
import { getAuth } from 'firebase/auth'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

const app = firebase.initializeApp(JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG))
export const auth = getAuth(app)
