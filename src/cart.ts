import { isLoggedIn } from './auth';  // Import the isLoggedIn function from auth.ts

let cart: number[] = JSON.parse(localStorage.getItem('cart') || '[]');

// Function to update cart count in the navbar
function updateCartCount(): void {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.innerText = cart.length.toString();
    }
}

// Add to Cart Functionality
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();

    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const target = event.target as HTMLButtonElement;
            const productId = target.getAttribute('data-id');
            if (productId) {
                addToCart(Number(productId));
            }
        });
    });
});

// Function to add a product to the cart
function addToCart(productId: number): void {
    cart.push(productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert('Product added to cart!');
}

// Cart page script
document.addEventListener('DOMContentLoaded', () => {
    const cartItems: number[] = JSON.parse(localStorage.getItem('cart') || '[]');
    const cartList = document.getElementById('cart-list') as HTMLElement;
    const checkoutButton = document.getElementById('checkout') as HTMLButtonElement;
    const emptyCartMessage = document.getElementById('empty-cart-message') as HTMLElement;

    // Display Cart Items
    function displayCartItems(): void {
        cartList.innerHTML = '';
        if (cartItems.length === 0) {
            emptyCartMessage.style.display = 'block';
            checkoutButton.style.display = 'none';
        } else {
            emptyCartMessage.style.display = 'none';
            checkoutButton.style.display = 'block';
            cartItems.forEach((item, index) => {
                const div = document.createElement('div');
                div.classList.add('cart-item');
                div.innerHTML = `
                    Product ${item} 
                    <button class="remove-item" data-index="${index}">Remove</button>
                `;
                cartList.appendChild(div);
            });
        }
    }

    // Remove item from cart
    cartList.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        if (target.classList.contains('remove-item')) {
            const index = target.getAttribute('data-index');
            if (index) {
                removeFromCart(Number(index));
            }
        }
    });

    // Function to remove product from cart
    function removeFromCart(index: number): void {
        cartItems.splice(index, 1); // Remove item from cart array
        localStorage.setItem('cart', JSON.stringify(cartItems)); // Update localStorage
        displayCartItems(); // Re-render the cart items
        updateCartCount(); // Update cart count in navbar
    }

    // Initial render of cart items
    displayCartItems();

    // Checkout button click
    checkoutButton.addEventListener('click', () => {
        if (isLoggedIn()) {
            alert('Proceeding to payment');
            window.location.href = 'confirmation.html'; // Redirect to confirmation page
        } else {
            alert('You must be logged in to checkout.');
            window.location.href = 'login.html'; // Redirect to login page
        }
    });
});

