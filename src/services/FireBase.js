import Rebase from 're-base'
import firebase from 'firebase'
import * as FireBaseCons from '../constants/firebase';

const config = {
  apiKey: FireBaseCons.API_KEY,
  authDomain: FireBaseCons.AUTH_DOMAIN,
  databaseURL: FireBaseCons.DATABASE_URL,
  projectId: FireBaseCons.PROJECT_ID,
  storageBucket: FireBaseCons.STORAGE_BUCKET,
  messagingSenderId: FireBaseCons.STORAGE_BUCKET
}

const app = firebase.initializeApp(config)
export const FireBase = Rebase.createClass(app.database())
