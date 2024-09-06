// Login Functionality

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login') as HTMLFormElement;

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const usernameInput = document.getElementById('username') as HTMLInputElement;
            const passwordInput = document.getElementById('password') as HTMLInputElement;
            
            const username = usernameInput.value;
            const password = passwordInput.value;

            // Simple login check (for demonstration purposes)
            if (username === "user" && password === "password") {
                localStorage.setItem('isLoggedIn', 'true');
                alert('Login successful!');
                window.location.href = 'cart.html'; // Redirect to cart page
            } else {
                alert('Invalid username or password.');
            }
        });
    }
});

// Function to check if user is logged in
export function isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
}

// Logout function (optional)
export function logout(): void {
    localStorage.removeItem('isLoggedIn');
    alert('You have been logged out.');
    window.location.href = 'index.html'; // Redirect to home page
}
