// Select elements for user interaction
let userIcon = document.querySelector('#user-icon');
let user_ = document.querySelector('.user');
let registerPage = document.getElementById('uregister');
let loginButton = document.getElementById('lgn-btn');

let search = document.querySelector('.search-box');
let cart = document.querySelector('.cart');
let user = document.querySelector('.wrapper');
let navbar = document.querySelector('.navbar');

// Select the overlay and body for blur effect
let overlay = document.getElementById('overlay');
let body = document.body;
let mainContent = document.querySelector('main'); // Assuming the main content area

// Toggle login box visibility
userIcon.addEventListener('click', () => {
    user_.classList.toggle('active');
    user_.style.display = (user_.style.display === 'none' || user_.style.display === '') ? 'block' : 'none';
    registerPage.style.display = 'none';  // Hide register page if visible
    showBlurBackground();
});

// Close login box when clicking outside
document.addEventListener('click', (event) => {
    if (!user_.contains(event.target) && !userIcon.contains(event.target) && !registerPage.contains(event.target)) {
        user_.style.display = 'none';
        user_.classList.remove('active');
        registerPage.style.display = 'none';
        removeBlurBackground();
    }
});

// Function to show the registration form and hide the login form
function showRegister() {
    registerPage.style.display = 'block';
    user_.style.display = 'none';
    showBlurBackground();
}

// Function to show the login form and hide the registration form
function showLogin() {
    registerPage.style.display = 'none';
    user_.style.display = 'block';
    showBlurBackground();
}

// Function to show the blur effect on background
function showBlurBackground() {
    overlay.style.display = 'block';  // Show the overlay
    mainContent.classList.add('blur-background');  // Blur the background content
    body.classList.add('blur-background');  // Blur the entire body content
}

// Function to remove the blur effect from the background
function removeBlurBackground() {
    overlay.style.display = 'none';  // Hide the overlay
    mainContent.classList.remove('blur-background');  // Remove blur from the background content
    body.classList.remove('blur-background');  // Remove blur from the entire body content
}

// Close forms and remove blur when clicking on overlay
overlay.addEventListener('click', () => {
    user_.style.display = 'none';
    registerPage.style.display = 'none';
    removeBlurBackground();
});

// Login function
document.getElementById('login-btn')?.addEventListener('click', async () => {
    const email = document.querySelector('input[name="email"]').value.trim();
    const password = document.querySelector('input[name="password"]').value;

    if (!email || !password) {
        alert("❌ Please enter both email and password.");
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        
        if (response.ok) {
            alert("✅ Login successful!");
            console.log("User Info:", data.user);

            // Store user data in session storage for the next page
            sessionStorage.setItem('user', JSON.stringify(data.user));

            // Redirect to index.html after successful login
            window.location.href = 'index.html';
        } else {
            alert(`❌ ${data.error || "Login failed!"}`);
        }
    } catch (error) {
        console.error("❌ Error logging in user:", error);
        alert("❌ Failed to log in! Check console for details.");
    }
});


document.getElementById('register-btn')?.addEventListener('click', async () => {
    const firstname = document.getElementById('firstname').value.trim();
    const surname = document.getElementById('surname').value.trim();
    const mobile = document.getElementById('mobile').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirm_password = document.getElementById('confirm_password').value;

    if (!firstname || !surname || !mobile || !email || !password || !confirm_password) {
        alert("❌ All fields are required!");
        return;
    }

    if (password !== confirm_password) {
        alert("❌ Passwords do not match!");
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstname, surname, mobile, email, password, confirm_password })
        });

        const data = await response.json();
        
        if (response.ok) {
            alert("✅ Registration successful!");
            showLogin(); // Show login form after registration
        } else {
            alert(`❌ ${data.error || "Registration failed!"}`);
        }
    } catch (error) {
        console.error("❌ Error registering user:", error);
        alert("❌ Failed to register! Check console for details.");
    }
});





// Toggle other elements visibility
document.querySelector('#search-icon')?.addEventListener('click', () => {
    search.classList.toggle('active');
    cart.classList.remove('active');
    user.classList.remove('active');
    navbar.classList.remove('active');
});

document.querySelector('#cart-icon')?.addEventListener('click', () => {
    cart.classList.toggle('active');
    search.classList.remove('active');
    user.classList.remove('active');
    navbar.classList.remove('active');
});

document.querySelector('#user-icon')?.addEventListener('click', () => {
    user.classList.toggle('active');
    search.classList.remove('active');
    cart.classList.remove('active');
    navbar.classList.remove('active');
});

document.querySelector('#menu-icon')?.addEventListener('click', () => {
    navbar.classList.toggle('active');
    search.classList.remove('active');
    cart.classList.remove('active');
    user.classList.remove('active');
});

// Remove active classes on scroll
window.onscroll = () => {
    search.classList.remove('active');
    cart.classList.remove('active');
    user.classList.remove('active');
    navbar.classList.remove('active');
};

let header = document.querySelector('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('shadow', window.scrollY > 0);
});

// Swiper configuration
const swiper = new Swiper('.new-arrival', {
    loop: true,
    slidesPerView: 3,
    spaceBetween: 20,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
});


