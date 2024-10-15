// Array to hold the product data
const products = [
    { id: 1, name: "Syltherine", description: "Stylish cafe chair", price: 2500000, image: "imgs/image 1.png" },
    { id: 2, name: "Syltherine", description: "Stylish cafe chair", price: 2500000, image: "imgs/image 1.png" },
    { id: 3, name: "Syltherine", description: "Stylish cafe chair", price: 2500000, image: "imgs/image 1.png" },
    { id: 4, name: "Syltherine", description: "Stylish cafe chair", price: 2500000, image: "imgs/image 1.png" },
    { id: 5, name: "Syltherine", description: "Stylish cafe chair", price: 2500000, image: "imgs/image 1.png" },
    { id: 6, name: "Syltherine", description: "Stylish cafe chair", price: 2500000, image: "imgs/image 1.png" },
    { id: 7, name: "Syltherine", description: "Stylish cafe chair", price: 2500000, image: "imgs/image 1.png" },
    { id: 8, name: "Syltherine", description: "Stylish cafe chair", price: 2500000, image: "imgs/image 1.png" },
  ];
  
  let cart = [];
  
  function addToCart(productId) {
    const product = products.find((prod) => prod.id === productId);
    if (product) {
      cart.push(product);
      updateCartIcon();
    }
  }
  
  function updateCartIcon() {
    const cartIcon = document.querySelector(".shop-cart");
    cartIcon.setAttribute("data-items", cart.length); // Display number of items in the cart
  }
  
  
  function showMoreProducts() {
    const hiddenProducts = document.querySelectorAll(".product-card.hidden");
    hiddenProducts.forEach((product) => {
      product.classList.remove("hidden");
    });
  }
  
  
  document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    if (email) {
      alert(`Thank you for subscribing, ${email}!`);
    }
  });
  
  document.querySelectorAll(".product-card button").forEach((button, index) => {
    button.addEventListener("click", () => addToCart(index + 1));
  });
  
  document.querySelector(".button-flex button").addEventListener("click", showMoreProducts);
  
  document.querySelectorAll(".product-card").forEach((product, index) => {
    if (index >= 4) {
      product.classList.add("hidden");
    }
  });
  