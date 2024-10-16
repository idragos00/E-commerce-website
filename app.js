// Initialize an empty cart
let cart = [];

// Fetch products from the Fake Store API
function loadProducts() {
  fetch('https://fakestoreapi.com/products')
    .then((response) => response.json())
    .then((products) => displayProducts(products))
    .catch((error) => console.error('Error loading products:', error));
}

// Function to display products on the page
function displayProducts(products) {
  const productsContainer = document.querySelector('#our-products-content .row');

  // Clear any existing products
  productsContainer.innerHTML = '';

  products.forEach((product) => {
    // Create the product card HTML
    const productCard = `
      <div class="col product-card">
        <img src="${product.image}" alt="${product.title}" />
        <div class="cardbox-content">
          <h3>${product.title}</h3>
          <p class="product-description">${product.description.substring(0, 50)}...</p>
          <p class="product-price">Rp ${product.price}</p>
          <button>Add To Cart</button>
        </div>
      </div>
    `;

    // Add product card to the container
    productsContainer.innerHTML += productCard;
  });

  // Add event listeners for 'Add To Cart' buttons
  addCartButtonListeners();
}

// Function to add item to the cart
function addToCart(productName, productPrice) {
  // Create a product object
  let product = {
    name: productName,
    price: productPrice,
  };

  // Add the product to the cart array
  cart.push(product);

  // Update cart count
  updateCartCount();

  // Display message
  alert(`${productName} has been added to your cart.`);
}

// Function to update the cart count displayed on the shopping cart icon
function updateCartCount() {
  const cartIcon = document.querySelector('.shop-cart');
  const itemCount = cart.length;

  // Update cart count display
  if (!cartIcon.querySelector('.cart-count')) {
    let countBadge = document.createElement('span');
    countBadge.className = 'cart-count badge bg-secondary';
    countBadge.innerText = itemCount;
    cartIcon.appendChild(countBadge);
  } else {
    cartIcon.querySelector('.cart-count').innerText = itemCount;
  }
}

// Adding event listeners to 'Add to Cart' buttons
function addCartButtonListeners() {
  document.querySelectorAll('.product-card button').forEach((button, index) => {
    button.addEventListener('click', (event) => {
      const productCard = event.target.closest('.product-card');
      const productName = productCard.querySelector('h3').innerText;
      const productPrice = productCard.querySelector('.product-price').innerText;

      // Add product to cart
      addToCart(productName, productPrice);
    });
  });
}

// Load products when the page is ready
document.addEventListener('DOMContentLoaded', loadProducts);
