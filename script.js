import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;

let cart = [];

async function renderProducts(containerId = 'product-list', limit = null) {
    const productList = document.getElementById(containerId);
    if (!productList) {
        console.error(`Container with id "${containerId}" not found`);
        return;
    }

    productList.innerHTML = '<div id="loading">Loading products...</div>';

    try {
        // Buscar produtos do banco usando Prisma
        const products = await prisma.product.findMany({
            include: {
                category: true // Inclui os dados da categoria relacionada
            },
            ...(limit ? { take: limit } : {}) // Aplica o limite se especificado
        });

        const productCards = products.map((product) => `
            <div class="product-card">
                <img src="/api/placeholder/200/150" alt="${product.name}" loading="lazy">
                <h3>${product.name}</h3>
                <p>R$ ${product.price.toFixed(2)}</p>
                <p>Categoria: ${product.category.name}</p>
                <button onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
            </div>
        `);

        productList.innerHTML = productCards.join('');
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        productList.innerHTML = '<div>Erro ao carregar produtos. Por favor, tente novamente.</div>';
    }
}

async function addToCart(productId) {
    try {
        const product = await prisma.product.findUnique({
            where: { id: productId }
        });

        if (!product) {
            console.error(`Produto com id ${productId} não encontrado`);
            return;
        }

        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        updateCartCount();
    } catch (error) {
        console.error('Erro ao adicionar ao carrinho:', error);
    }
}

// O resto das funções do carrinho permanecem as mesmas...

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    if (path.endsWith('index.html') || path === '/') {
        renderProducts('product-list', 4); // Mostra apenas 4 produtos em destaque
    } else if (path.endsWith('products.html')) {
        renderProducts(); // Mostra todos os produtos
    }

    // Resto dos event listeners permanecem os mesmos...
})
async function fetchProducts() {
    try {
      const response = await fetch('/api/products')
      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }
      const products = await response.json()
      // Aqui você pode atualizar o DOM com os produtos
      displayProducts(products)
    } catch (error) {
      console.error('Error:', error)
    }
  }
  
  function displayProducts(products) {
    const productContainer = document.getElementById('product-container')
    productContainer.innerHTML = products.map(product => `
      <div class="product">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p>Price: $${product.price}</p>
      </div>
    `).join('')
  }
  
  // Chame esta função quando a página carregar
  document.addEventListener('DOMContentLoaded', fetchProducts);