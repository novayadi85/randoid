import Firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyDb3ISBVv1j3Ye0nAx1cQ1bo-kpNMO3los",
    authDomain: "hello-world-9a3ca.firebaseapp.com",
    databaseURL: "https://hello-world-9a3ca.firebaseio.com",
    projectId: "hello-world-9a3ca",
    storageBucket: "hello-world-9a3ca.appspot.com",
    messagingSenderId: "933690374825",
    appId: "1:933690374825:web:5f8b18c9ff1a7d570887b8"
};


export default !Firebase.apps.length 
  ? Firebase.initializeApp(firebaseConfig).firestore({experimentalForceLongPolling: true})
  : Firebase.app().firestore();



//db.settings({experimentalForceLongPolling: true});
/*
nSQL().createDatabase({
  id: "tourism-db",
  mode: "TEMP", 
  tables: [
    {
      name: "listings",
      model: {
        "id:uuid": {pk: true},
        "data:string": {},
      }
    }
  ]
}).then(() => {
  // ready to query!
}).catch(() => {
  // ran into a problem
})

*/