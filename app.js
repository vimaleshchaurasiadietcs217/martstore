import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDYHy7Tc1v6K1EVSk0QkYA9of4L8SGGFiw",
  authDomain: "grocerystore-69026.firebaseapp.com",
  projectId: "grocerystore-69026",
  storageBucket: "grocerystore-69026.appspot.com",
  messagingSenderId: "618172755403",
  appId: "1:618172755403:web:83e95d4ee3f07a6f961a4e",
  measurementId: "G-HSCY30YL2J"
};

// Initialize Firebase app and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const productsCollection = collection(db, "GroceryStore");

// On index.html: Load and display products
async function loadProducts() {
  const productList = document.getElementById("productList");
  if (!productList) return; // Not on index.html

  try {
    const querySnapshot = await getDocs(productsCollection);
    if (querySnapshot.empty) {
      productList.innerHTML = "<p>No products found.</p>";
      return;
    }

    productList.innerHTML = ""; // Clear previous content
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const div = document.createElement("div");
      div.innerHTML = `
        <strong>${data.name}</strong><br>
        ₹${data.price} - ${data.quantity} in stock<br><br>
      `;
      productList.appendChild(div);
    });
  } catch (error) {
    console.error("Error loading products:", error);
    if (productList) productList.innerHTML = `<p>Error loading products.</p>`;
  }
}

// On admin.html: Handle form submit to add product
function setupAddProductForm() {
  const form = document.getElementById("productForm");
  if (!form) return; // Not on admin.html

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const price = parseFloat(document.getElementById("price").value);
    const quantity = parseInt(document.getElementById("quantity").value);
    const image = document.getElementById("image").value.trim();

    if (!name || isNaN(price) || isNaN(quantity)) {
      alert("Please fill in all required fields correctly.");
      return;
    }

    try {
      await addDoc(productsCollection, { name, price, quantity, image });
      alert("Product added successfully!");
      form.reset();
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
    }
  });
}

// Initialize
loadProducts();
setupAddProductForm();
