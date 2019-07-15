import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: 'AIzaSyA8V0b985TZCvwEWBIT_xmoctvQAR536qI',
    authDomain: 'crown-db-5533a.firebaseapp.com',
    databaseURL: 'https://crown-db-5533a.firebaseio.com',
    projectId: 'crown-db-5533a',
    storageBucket: '',
    messagingSenderId: '676981850362',
    appId: '1:676981850362:web:cf89647770526698'
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    // Check if there is any data (or user) in the SnapShot
    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        // If no data in Snapshot create new user data using userAuth object
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('Error creating user', error.message);
        }
    }
    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
