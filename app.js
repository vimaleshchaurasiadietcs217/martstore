// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

// Your Firebase config (use yours exactly)
const firebaseConfig = {
  apiKey: "AIzaSyDYHy7Tc1v6K1EVSk0QkYA9of4L8SGGFiw",
  authDomain: "grocerystore-69026.firebaseapp.com",
  projectId: "grocerystore-69026",
  storageBucket: "grocerystore-69026.appspot.com",  // corrected storageBucket domain
  messagingSenderId: "618172755403",
  appId: "1:618172755403:web:83e95d4ee3f07a6f961a4e",
  measurementId: "G-HSCY30YL2J"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Reference to your products collection in Firestore
const productsCollection = collection(db, 'GroceryStore'); // change 'GroceryStore' to your actual collection name if different

// Function to add product (example for admin.html)
async function addProduct(name, price, quantity) {
  try {
    await addDoc(productsCollection, { name, price, quantity });
    alert("Product added!");
  } catch (e) {
    console.error("Error adding product: ", e);
  }
}

// Function to get products (example for index.html)
async function getProducts() {
  const querySnapshot = await getDocs(productsCollection);
  const products = [];
  querySnapshot.forEach(doc => {
    products.push({ id: doc.id, ...doc.data() });
  });
  return products;
}

// Export functions for your HTML files to use
export { addProduct, getProducts };
