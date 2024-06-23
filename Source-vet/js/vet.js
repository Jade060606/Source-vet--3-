// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Replace with your actual Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAwXqTkiGgwMQsEz-LPatRyLdiFctQ9SBY",
    authDomain: "vetcare-5693d.firebaseapp.com",
    projectId: "vetcare-5693d",
    storageBucket: "vetcare-5693d.appspot.com",
    messagingSenderId: "327794904860",
    appId: "1:327794904860:web:c669da5ef884c0cdf9f4d9",
    measurementId: "G-KZGR3E1K14"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to calculate distance between two coordinates
function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        0.5 - Math.cos(dLat) / 2 +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        (1 - Math.cos(dLon)) / 2;

    return R * 2 * Math.asin(Math.sqrt(a));
}

// Function to find nearby vets
async function findNearbyVets(userLocation) {
    const vetList = document.getElementById('vet-list');
    const querySnapshot = await getDocs(collection(db, 'vets'));
    const nearbyVets = [];

    querySnapshot.forEach((doc) => {
        const vet = doc.data();
        const distance = getDistance(userLocation.lat, userLocation.lng, vet.location.lat, vet.location.lng);
        if (distance <= 100) {
            nearbyVets.push({ ...vet, distance });
        }
    });

    vetList.innerHTML = '';
    if (nearbyVets.length === 0) {
        vetList.innerHTML = '<p>No veterinarians found within 100 km of your location.</p>';
    } else {
        nearbyVets.forEach(vet => {
            const vetElement = document.createElement('div');
            vetElement.className = 'vet';
            vetElement.innerHTML = `
                <img src="images/R.png" alt="${vet.name}" class="vet-image">
                <div>
                    <h2>${vet.name}</h2>
                    <p>Distance: ${vet.distance.toFixed(2)} km</p>
                </div>
            `;
            vetList.appendChild(vetElement);
        });
    }
}

// Function to show error
function showError(error) {
    const vetList = document.getElementById('vet-list');
    vetList.innerHTML = `<p>Error finding your location: ${error.message}</p>`;
}

// Function to initialize app and get user's location
function initApp() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            findNearbyVets(userLocation);
        }, showError);
    } else {
        const vetList = document.getElementById('vet-list');
        vetList.innerHTML = '<p>Geolocation is not supported by your browser.</p>';
    }
}

// Initialize the app on page load
document.addEventListener("DOMContentLoaded", initApp);
