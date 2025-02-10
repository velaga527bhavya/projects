const API_URL = "http://localhost:3000/api"; 

// Load products for a given category
function loadProducts(category) {
  fetch(`${API_URL}/products/${category}`)
      .then(response => response.json())
      .then(products => {
          const container = document.getElementById("products-container");
          container.innerHTML = ""; // Clear previous products

          products.forEach(product => {
              const productCard = document.createElement("div");
              productCard.className = "product-card";
              const sizeOptions = product.sizes.map(size => `<option value="${size}">${size}</option>`).join('');
              productCard.innerHTML = `
                  <img src="${product.image || 'placeholder.jpg'}" alt="${product.name}" class="product-image">
                  <h3>${product.name}</h3>
                  <p>Price: $${product.price}</p>
                  <p>Discount: ${product.discount}%</p>
                  <label for="size-${product._id}">Size:</label>
                  <select id="size-${product._id}">${sizeOptions}</select>
                  <button onclick="addToCart('${product._id}', '${product.name}', ${product.price}, 'size-${product._id}')">
                      Add to Cart
                  </button>
              `;
              container.appendChild(productCard);
          });
      })
      .catch(error => console.error("Error loading products:", error));
}


// Cart functions
function addToCart(id, name, price , sizeDropdownId) {
    const selectedSize = document.getElementById(sizeDropdownId).value;
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ id, name, price , size: selectedSize });
    localStorage.setItem("cart", JSON.stringify(cart));
    
    updateCartCount();
    alert(`${name} (Size: ${selectedSize}) added to cart!`);
}

// Update cart count in UI
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cart-count").textContent = cart.length;
}

// Show cart modal
function viewCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        cart.forEach((item, index) => {
            const li = document.createElement("li");
            li.textContent = `${index + 1}. ${item.name} - $${item.price} (Size: ${item.size})`;
            cartItems.appendChild(li);
        });
    }

    document.getElementById("cart-modal").style.display = "block";
}

// Close cart modal
function closeCart() {
    document.getElementById("cart-modal").style.display = "none";
}

// Place an order
function placeOrder() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("Your cart is empty. Add items before placing an order.");
        return;
    }

    fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ cart })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        clearCart();
    })
    .catch(error => console.error("Error placing order:", error));
}

// Clear cart
function clearCart() {
    localStorage.removeItem("cart");
    updateCartCount();
    viewCart();
}

// Initialize cart count on page load
document.addEventListener("DOMContentLoaded", updateCartCount);





