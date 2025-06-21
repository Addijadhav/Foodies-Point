// Global variables
let cart = [];
let cartTotal = 0;

// DOM elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const categoryBtns = document.querySelectorAll('.category-btn');
const foodCards = document.querySelectorAll('.food-card');
const cartModal = document.getElementById('cart-modal');
const cartIcon = document.querySelector('.cart-icon');
const closeModal = document.querySelector('.close');
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const addToCartBtns = document.querySelectorAll('.add-to-cart');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    updateCartDisplay();
});

// Initialize all event listeners
function initializeEventListeners() {
    // Mobile menu toggle
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Category filtering
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            filterFoodItems(category);
            updateActiveCategory(this);
        });
    });
    
    // Add to cart functionality
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const name = this.getAttribute('data-name');
            const price = parseFloat(this.getAttribute('data-price'));
            addToCart(name, price);
            showAddToCartAnimation(this);
        });
    });
    
    // Cart modal functionality
    cartIcon.addEventListener('click', function(e) {
        e.preventDefault();
        openCartModal();
    });
    
    closeModal.addEventListener('click', closeCartModal);
    
    window.addEventListener('click', function(e) {
        if (e.target === cartModal) {
            closeCartModal();
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Mobile menu toggle
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

// Filter food items by category
function filterFoodItems(category) {
    foodCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.classList.remove('hidden');
            // Add animation
            card.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
            card.classList.add('hidden');
        }
    });
}

// Update active category button
function updateActiveCategory(activeBtn) {
    categoryBtns.forEach(btn => btn.classList.remove('active'));
    activeBtn.classList.add('active');
}

// Add item to cart
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }
    
    updateCartDisplay();
    saveCartToMemory();
}

// Remove item from cart
function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    updateCartDisplay();
    saveCartToMemory();
}

// Update cart display
function updateCartDisplay() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart total
    cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalElement.textContent = cartTotal.toFixed(2);
    
    // Update cart items display
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #666;">Your cart is empty</p>';
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div>
                    <h4>${item.name}</h4>
                    <p>$${item.price.toFixed(2)} × ${item.quantity}</p>
                </div>
                <div>
                    <button onclick="updateQuantity('${item.name}', -1)" style="background: #dc3545; color: white; border: none; padding: 5px 10px; margin: 0 5px; border-radius: 3px; cursor: pointer;">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity('${item.name}', 1)" style="background: #28a745; color: white; border: none; padding: 5px 10px; margin: 0 5px; border-radius: 3px; cursor: pointer;">+</button>
                    <button onclick="removeFromCart('${item.name}')" style="background: #dc3545; color: white; border: none; padding: 5px 10px; margin-left: 10px; border-radius: 3px; cursor: pointer;">Remove</button>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });
    }
}

// Update item quantity
function updateQuantity(name, change) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(name);
        } else {
            updateCartDisplay();
            saveCartToMemory();
        }
    }
}

// Show add to cart animation
function showAddToCartAnimation(button) {
    const originalText = button.textContent;
    button.textContent = 'Added!';
    button.style.background = '#28a745';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
    }, 1000);
}

// Open cart modal
function openCartModal() {
    cartModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close cart modal
function closeCartModal() {
    cartModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Save cart to memory (simulating localStorage functionality)
function saveCartToMemory() {
    // In a real application, this would save to localStorage
    // For this demo, we're just keeping it in memory
    console.log('Cart saved:', cart);
}

// Scroll to menu section
function scrollToMenu() {