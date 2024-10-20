const customProducts = [
  {
    title: 'Luxury Sofa',
    description: 'A comfortable and stylish luxury sofa.',
    price: 2500000,
    image: 'imgs/sofa.png', 
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


function displayProducts(products) {
  const productsContainer = document.querySelector('#our-products-content .row');

  
  productsContainer.innerHTML = '';

  
  const limitedProducts = products.slice(0, 8);

  limitedProducts.forEach((product, index) => {
   
    let customTitle = `Syltherine`;
    let customImage = `imgs/image-${index + 1}.png`; // Custom images you have locally
    let customDescription = `Stylish cafe chair ${index + 1}.`;

    // Create the product card HTML
    const productCard = `
      <div class="col product-card">
        <a href="single-product.html?id=${product.id}" class="product-link">
          <img src="${customImage}" alt="${product.title}" />
          <div class="cardbox-content">
            <h3>${customTitle}</h3>
            <p class="product-description">${customDescription}</p>
            <p class="product-price">Rp ${product.price}</p>
          </div>
          </a>
          <div class="add-to-cart">
           <button class="add-to-cart-btn" data-id="${product.id}">Add To Cart</button>
         </div>
      </div>
    `;

    
    productsContainer.innerHTML += productCard;
  });

  
  addCartButtonListeners();
}

 

document.addEventListener('DOMContentLoaded', () => {
  fetchProducts();
});

document.addEventListener('DOMContentLoaded', () => {
  loadProducts(); 

  
  const showMoreBtn = document.querySelector('#show-more-btn');
  
  if (showMoreBtn) {
    showMoreBtn.addEventListener('click', () => {
      window.location.href = 'shop.html'; // Redirect to shop.html
    });
  }
});


function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function loadProductDetails() {
  const productId = getQueryParam('id'); // Get the product ID from the URL
  
  fetch(`https://fakestoreapi.com/products/${productId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((product) => {
      let customTitle = `Syltherine`; 
      let customImage = `imgs/image-${productId}.png`; 
      let customDescription = `Stylish cafe chair ${productId}.`; 

      document.getElementById('product-image').src = customImage; 
      document.getElementById('product-title').textContent = customTitle; 
      document.getElementById('product-price').textContent = `Rs. ${product.price.toFixed(2)}`; 
      document.getElementById('product-description').textContent = customDescription; 
      document.getElementById('customer-reviews').textContent = `${product.rating.count} Customer Reviews`; 
    })
    .catch((error) => console.error('Error loading product details:', error));
}

// Load the product details when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', loadProductDetails);


// Function to add item to the cart
function addToCart(productName, productPrice) {
  // Create a product object
  let product = {
    name: productName,
    price: productPrice,
  };

  // Add the product to the cart array
  cart.push(product);

  localStorage.setItem('localCart', JSON.stringify(cart));

  // Update cart count
  updateCartCount();

  // Display message
  alert(`${productName} has been added to your cart.`);
}

// Function to load cart items from localStorage and display them
function loadCartItems() {
  const cartItems = JSON.parse(localStorage.getItem('localCart')) || []; // Retrieve and parse cart items

  const billingProductList = document.getElementById('billing-product-list');

  // Clear any existing items
  billingProductList.innerHTML = '';

  // Check if there are products in the cart
  if (cartItems.length === 0) {
    billingProductList.innerHTML = '<p>Your cart is empty.</p>'; // Display message if cart is empty
    return;
  }

  // Loop through each item in the cart and create HTML elements for them
  cartItems.forEach(item => {
    const productRow = document.createElement('div');
    productRow.classList.add('product-row');

    productRow.innerHTML = `
      <span>${item.name}</span>
      <span>Rs. ${item.price.toFixed(2)}</span>
    `;

    billingProductList.appendChild(productRow); // Append product row to the list
  });
}

// Load the cart items when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', loadCartItems);


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
