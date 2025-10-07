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

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const productsCollection = db.collection("GroceryStore");

// Load and display products (on index.html)
function loadProducts() {
  const container = document.getElementById("productList");
  if (!container) return;

  productsCollection.get().then((querySnapshot) => {
    if (querySnapshot.empty) {
      container.innerHTML = "<p>No products found.</p>";
      return;
    }

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const div = document.createElement("div");
      div.innerHTML = `
        <strong>${data.name}</strong><br>
        ₹${data.price} - ${data.quantity} in stock<br><br>
      `;
      container.appendChild(div);
    });
  }).catch((error) => {
    console.error("Error loading products:", error);
    container.innerHTML = `<p>Error: ${error.message}</p>`;
  });
}

// Handle product form (on admin.html)
document.addEventListener("DOMContentLoaded", () => {
  loadProducts();

  const form = document.getElementById("productForm");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const price = parseFloat(document.getElementById("price").value);
      const quantity = parseInt(document.getElementById("quantity").value);
      const image = document.getElementById("image").value;

      try {
        await productsCollection.add({ name, price, quantity, image });
        alert("Product added!");
        form.reset();
      } catch (error) {
        console.error("Error adding product:", error);
        alert("Failed to add product.");
      }
    });
  }
});
