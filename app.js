// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Replace with YOUR config
const firebaseConfig = {
  apiKey: "YOUR-KEY",
  authDomain: "yourapp.firebaseapp.com",
  projectId: "yourapp",
  storageBucket: "yourapp.appspot.com",
  messagingSenderId: "123456",
  appId: "1:123456:web:abcdef"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Admin Add Product
const form = document.getElementById("productForm");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const price = parseFloat(document.getElementById("price").value);
    const quantity = parseInt(document.getElementById("quantity").value);
    const image = document.getElementById("image").value;

    await addDoc(collection(db, "products"), {
      name, price, quantity, image
    });

    alert("Product added!");
    form.reset();
  });
}

// Display Products
const productList = document.getElementById("productList");
if (productList) {
  const querySnapshot = await getDocs(collection(db, "products"));
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const div = document.createElement("div");
    div.innerHTML = `
      <img src="${data.image || 'https://via.placeholder.com/150'}" width="150"><br>
      <strong>${data.name}</strong><br>
      $${data.price} - ${data.quantity} in stock<br><br>
    `;
    productList.appendChild(div);
  });
}
