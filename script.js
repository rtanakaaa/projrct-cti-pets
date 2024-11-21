const PEXELS_API_KEY = 'fCVpdmt6KJDfnNt3QzPUMzQq4NTuNyBuQvTG3zXE18aXq6HXm82j0fWt'; // Replace with your actual Pexels API key

const products = [
    { id: 1, name: 'Royal Canin Dog Food', price: 54.99, category: 'dog food' },
    { id: 2, name: 'Cat Tree Condo', price: 89.99, category: 'cat furniture' },
    { id: 3, name: 'Aqueon Fish Tank Kit', price: 129.99, category: 'aquarium' },
    { id: 4, name: 'Kaytee Hamster Cage', price: 49.99, category: 'small pet habitat' },
    { id: 5, name: 'Fluker\'s Reptile Heat Lamp', price: 24.99, category: 'reptile supplies' },
    { id: 6, name: 'Kong Classic Dog Toy', price: 12.99, category: 'dog toy' },
    { id: 7, name: 'Purina Pro Plan Cat Food', price: 39.99, category: 'cat food' },
    { id: 8, name: 'Tetra Fish Food Flakes', price: 9.99, category: 'fish food' }
];

let cart = [];

async function fetchImageUrl(query) {
    try {
        const response = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=1`, {
            headers: {
                Authorization: PEXELS_API_KEY
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.photos && data.photos.length > 0) {
            return data.photos[0].src.medium;
        } else {
            throw new Error('No images found');
        }
    } catch (error) {
        console.error('Error fetching image:', error);
        return 'https://placehold.co/200x150?text=No+Image';
    }
}

async function renderProducts(containerId = 'product-list', limit = products.length) {
    const productList = document.getElementById(containerId);
    if (!productList) {
        console.error(`Container with id "${containerId}" not found`);
        return;
    }

    productList.innerHTML = '<div id="loading">Loading products...</div>';

    const productsToRender = products.slice(0, limit);

    try {
        const productCards = await Promise.all(productsToRender.map(async (product) => {
            const imageUrl = await fetchImageUrl(product.category);
            return `
                <div class="product-card">
                    <img src="${imageUrl}" alt="${product.name}" loading="lazy">
                    <h3>${product.name}</h3>
                    <p>$${product.price.toFixed(2)}</p>
                    <button onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            `;
        }));

        productList.innerHTML = productCards.join('');
    } catch (error) {
        console.error('Error rendering products:', error);
        productList.innerHTML = '<div>Error loading products. Please try again later.</div>';
    }
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) {
        console.error(`Product with id ${productId} not found`);
        return;
    }
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartCount();
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (!cartCount) {
        console.error('Cart count element not found');
        return;
    }
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalCount;
}

function showCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const modal = document.getElementById('cart-modal');

    if (!cartItems || !cartTotal || !modal) {
        console.error('One or more cart elements not found');
        return;
    }

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement('div');
        li.innerHTML = `
            ${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItems.appendChild(li);
        total += item.price * item.quantity;
    });

    cartTotal.textContent = total.toFixed(2);
    modal.style.display = 'block';
}

function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
        } else {
            cart.splice(index, 1);
        }
    }
    updateCartCount();
    showCart();
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

function showCheckout() {
    const checkoutModal = document.getElementById('checkout-modal');
    if (checkoutModal) {
        checkoutModal.style.display = 'block';
        closeModal('cart-modal');
    }
}

// Initialize the store
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    if (path.endsWith('index.html') || path === '/') {
        renderProducts('product-list', 4); // Show only 4 featured products on the home page
    } else if (path.endsWith('products.html')) {
        renderProducts(); // Show all products on the products page
    }

    // Event listeners
    const cartIcon = document.getElementById('cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', showCart);
    }

    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', showCheckout);
    }

    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => closeModal(closeBtn.closest('.modal').id));
    });

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message. We will get back to you soon!');
            e.target.reset();
        });
    }

    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your order! It will be processed soon.');
            cart = [];
            updateCartCount();
            closeModal('checkout-modal');
        });
    }

    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target.id);
        }
    });

    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            alert(`Thank you for subscribing with email: ${emailInput.value}`);
            newsletterForm.reset();
        });
    }
});