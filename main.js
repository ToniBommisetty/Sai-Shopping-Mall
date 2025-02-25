// Select elements for user interaction
let userIcon = document.querySelector('#user-icon');
let user_ = document.querySelector('.user');

let search = document.querySelector('.search-box');
let cart = document.querySelector('.cart');
let user = document.querySelector('.wrapper');
let navbar = document.querySelector('.navbar');






userIcon.addEventListener('click', () => {
    user_.classList.toggle('active');
});


// Function to show the registration form
function showRegister() {
    document.getElementById("uregister").style.display = "block";
    document.getElementById("lgn-btn").style.display = "none";
}

// Function to show the login form
function showLogin() {
    document.getElementById("uregister").style.display = "none";
    document.getElementById("lgn-btn").style.display = "block";
}




document.querySelector('#search-icon').onclick = () => {
    search.classList.toggle('active');
    cart.classList.remove('active');
    user.classList.remove('active');
    navbar.classList.remove('active');
}

document.querySelector('#cart-icon').onclick = () => {
    cart.classList.toggle('active');
    search.classList.remove('active');
    user.classList.remove('active');
    navbar.classList.remove('active');
}

document.querySelector('#user-icon').onclick = () => {
    user.classList.toggle('active');
    search.classList.remove('active');
    cart.classList.remove('active');
    navbar.classList.remove('active');
}

document.querySelector('#menu-icon').onclick = () => {
    navbar.classList.toggle('active');
    search.classList.remove('active');
    cart.classList.remove('active');
    user.classList.remove('active');
}

window.onscroll = () => {
    search.classList.remove('active');
    cart.classList.remove('active');
    user.classList.remove('active');
    navbar.classList.remove('active');
}

let header = document.querySelector('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('shadow', window.scrollY > 0);
});

userIcon.addEventListener('click', () => {
    user2.classList.toggle('active');
});





