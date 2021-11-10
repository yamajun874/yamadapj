import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp(
    {
      apiKey: "AIzaSyBguskO5yCI34Dng37NagQjdLZ_R4FgvfY",
  authDomain: "yamadapj-3396b.firebaseapp.com",
  projectId: "yamadapj-3396b",
  storageBucket: "yamadapj-3396b.appspot.com",
  messagingSenderId: "377112989895",
  appId: "1:377112989895:web:4e33565d666b7a2d9d6ee2",
  measurementId: "G-0E7VZ148ES"
    }
  )
}
  

export default firebase

