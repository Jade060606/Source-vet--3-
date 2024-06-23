import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAwXqTkiGgwMQsEz-LPatRyLdiFctQ9SBY",
    authDomain: "vetcare-5693d.firebaseapp.com",
    projectId: "vetcare-5693d",
    storageBucket: "vetcare-5693d.appspot.com",
    messagingSenderId: "327794904860",
    appId: "1:327794904860:web:c669da5ef884c0cdf9f4d9",
    measurementId: "G-KZGR3E1K14"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const vets = [
  { name: "Dr. Rexcelle Sunio", location: { lat: 40.7128, lng: -74.0060 } },
  { name: "Dr. Angel Galacio", location: { lat: 40.730610, lng: -73.935242 } },
  { name: "Dr. Learsi Canosa", location: { lat: 40.730610, lng: -73.935242 } },
  { name: "Dr. Rica Arellano", location: { lat: 40.758896, lng: -73.985130 } },
  { name: "Dr. Jairus King", location: { lat: 40.706001, lng: -74.008801 } }
];

async function addVeterinarians() {
  try {
    for (const vet of vets) {
      const docRef = await addDoc(collection(db, 'vets'), vet);
      console.log("Document written with ID: ", docRef.id);
    }
  } catch (e) {
    console.error("Error adding documents: ", e);
  }
}

addVeterinarians();
