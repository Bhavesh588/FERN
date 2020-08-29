import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage'
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBIM2wxfyuGAeJzdCSuh8FbLphlivUbgOM",
    authDomain: "agriculture-d64a9.firebaseapp.com",
    databaseURL: "https://agriculture-d64a9.firebaseio.com",
    projectId: "agriculture-d64a9",
    storageBucket: "agriculture-d64a9.appspot.com",
    messagingSenderId: "520877436094",
    appId: "1:520877436094:web:579b8c08150468e32642ef",
    measurementId: "G-1LLQ83EEGG"
};

export const createuser = async (user) => {
    const userRef = firestore.doc(`users/${user.fname}`)
    const snapshot = await userRef.get()
    
    if(!snapshot.exists) {
        try {
            await userRef.set({
                "name": user.fname,
                "email": user.email,
                "mobno": user.mobileno,
                "subject": user.subject,
                "message": user.message
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}

export const getAllUser = async () => {
    const userRef = firestore.collection('users')
    let record = []
    await userRef.get()
    .then(snapshot => {
        snapshot.docs.map(doc => record.push(doc.data()))
    })
    return record
}

export const updateuser = async (id,number) => {
    firestore.doc(`users/${id}`)
    .update({
        'mobno': number,
    })
    .then(() => {
        console.log('User updated!');
    });
}

export const deleteuser = async (id) => {
    firestore.doc(`users/${id}`)
    .delete()
    .then(() => {
        console.log('User updated!');
    });
}

try {
    firebase.initializeApp(config);
} catch (er) {
    console.log('It is already Initialize')
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();