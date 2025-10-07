// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDYHy7Tc1v6K1EVSk0QkYA9of4L8SGGFiw",
  authDomain: "grocerystore-69026.firebaseapp.com",
  projectId: "grocerystore-69026",
  storageBucket: "grocerystore-69026.appspot.com",
  messagingSenderId: "618172755403",
  appId: "1:618172755403:web:83e95d4ee3f07a6f961a4e",
  measurementId: "G-HSCY30YL2J"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

// Reference your collection
const productsCollection = db.collection('GroceryStore');

// Function to get products example
async function getProducts() {
  const snapshot = await productsCollection.get();
  const products = [];
  snapshot.forEach(doc => {
    products.push({ id: doc.id, ...doc.data() });
  });
  return products;
}

// Example to display products
async function displayProducts() {
  const products = await getProducts();
  console.log(products);
  // Render your products here
}

displayProducts();
