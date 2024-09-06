// Update cart count across all pages
document.addEventListener('DOMContentLoaded', () => {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        cartCountElement.innerText = cart.length.toString();
    }
});

