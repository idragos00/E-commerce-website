const customProducts = [
  {
    title: 'Luxury Sofa',
    description: 'A comfortable and stylish luxury sofa.',
    price: 2500000,
    image: 'imgs/sofa.png', // Path to your custom image
  },
  {
    title: 'Modern Coffee Table',
    description: 'A sleek, modern coffee table for your living room.',
    price: 1500000,
    image: 'imgs/coffee-table.png',
  },
  {
    title: 'Elegant Chair',
    description: 'An elegant chair for dining or working.',
    price: 1200000,
    image: 'imgs/chair.png',
  },
  {
    title: 'Wooden Desk',
    description: 'A wooden desk perfect for study or work.',
    price: 3000000,
    image: 'imgs/desk.png',
  },
];



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

  products.forEach((product, index) => {
    // Customize image and description
    let customTitle = `Syltherine`;
    let customImage = `imgs/image ${index + 1}.png`; // Custom images you have locally
    let customDescription = `Stylish cafe chair ${index + 1}.`;

    // Create the product card HTML
    const productCard = `
      <div class="col product-card">
        <img src="${customImage}" alt="${product.title}" />
        <div class="cardbox-content">
          <h3>${customTitle}</h3>
          <p class="product-description">${customDescription}</p>
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
