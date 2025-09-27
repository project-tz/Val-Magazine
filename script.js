document.addEventListener("DOMContentLoaded", () => {
  const productsGrid = document.getElementById("products-grid");
  const searchInput = document.getElementById("search");
  const categoryFilter = document.getElementById("category-filter");
  const cartBtn = document.getElementById("cart-btn");
  const cartDrawer = document.getElementById("cart-drawer");
  const closeCartBtn = document.getElementById("close-cart");
  const cartItemsEl = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const cartTotalEl = document.getElementById("cart-total");
  const clearCartBtn = document.getElementById("clear-cart");
  const checkoutBtn = document.getElementById("checkout");
  const modal = document.getElementById("img-modal");
  const modalImage = document.getElementById("modal-image");
  const modalCaption = document.getElementById("modal-caption");
  const closeModal = document.getElementById("close-modal");

  let cart = [];
  
  // Produtos definidos diretamente no JS
  const products = [
    { id: 1, name: "Caneca Time (Vasco)", category: "Canecas", price: 39.50, image: "canecavasco.jpeg" },
    { id: 2, name: "Creme Facial", category: "Beleza", price: 45.50, image: "creme.jpeg" },
    { id: 3, name: "Bolsa Casual", category: "Bolsas", price: 120.00, image: "bolsa.jpeg" },
    { id: 4, name: "Fone Bluetooth", category: "Eletrônicos", price: 220.00, image: "fone.jpeg" },
    { id: 5, name: "Pelúcia Urso", category: "Pelúcias", price: 55.00, image: "pelucia.jpeg" }
  ];

  // Atualiza ano no rodapé
  document.getElementById("year").textContent = new Date().getFullYear();

  // Renderiza produtos inicialmente
  renderProducts(products);

  // Renderiza produtos
  function renderProducts(list) {
    productsGrid.innerHTML = "";
    list.forEach(prod => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <div class="product-img-wrap">
          <img src="${prod.image}" alt="${prod.name}" class="product-img" data-img="${prod.image}" data-name="${prod.name}">
        </div>
        <h4 class="product-title">${prod.name}</h4>
        <p class="product-price">R$ ${prod.price.toFixed(2)}</p>
        <button class="btn primary add-to-cart" data-id="${prod.id}">Adicionar</button>
      `;
      productsGrid.appendChild(card);
    });
  }

  // Busca
  searchInput.addEventListener("input", filterProducts);

  // Filtro categoria
  categoryFilter.addEventListener("change", filterProducts);

  function filterProducts() {
    const term = searchInput.value.toLowerCase();
    const cat = categoryFilter.value;
    const filtered = products.filter(p => {
      const matchTerm = p.name.toLowerCase().includes(term);
      const matchCat = cat === "Todos" || p.category === cat;
      return matchTerm && matchCat;
    });
    renderProducts(filtered);
  }

  // Adicionar ao carrinho
  document.addEventListener("click", e => {
    if (e.target.classList.contains("add-to-cart")) {
      const id = parseInt(e.target.dataset.id);
      const prod = products.find(p => p.id === id);
      if (!prod) return;

      const item = cart.find(i => i.id === id);
      if (item) {
        item.qty++;
      } else {
        cart.push({ ...prod, qty: 1 });
      }
      updateCart();
    }

    // Imagem modal
    if (e.target.classList.contains("product-img")) {
      modalImage.src = e.target.dataset.img;
      modalCaption.textContent = e.target.dataset.name;
      modal.style.display = "flex";
      modal.setAttribute("aria-hidden", "false");
    }
  });

  // Fechar modal
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
  });

  // Carrinho abrir/fechar
  cartBtn.addEventListener("click", () => {
    cartDrawer.classList.add("open");
    cartDrawer.setAttribute("aria-hidden", "false");
  });
  closeCartBtn.addEventListener("click", () => {
    cartDrawer.classList.remove("open");
    cartDrawer.setAttribute("aria-hidden", "true");
  });

  // Atualizar carrinho
  function updateCart() {
    cartItemsEl.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
      total += item.price * item.qty;
      const div = document.createElement("div");
      div.className = "cart-item";
      div.innerHTML = `
        <div>${item.name} (x${item.qty})</div>
        <div>R$ ${(item.price * item.qty).toFixed(2)}</div>
      `;
      cartItemsEl.appendChild(div);
    });
    cartCount.textContent = cart.reduce((sum, i) => sum + i.qty, 0);
    cartTotalEl.textContent = total.toFixed(2);
  }

  // Limpar carrinho
  clearCartBtn.addEventListener("click", () => {
    cart = [];
    updateCart();
  });

  // Checkout via WhatsApp
  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) return;
    let msg = "Olá, quero finalizar meu pedido:%0A%0A";
    cart.forEach(item => {
      msg += `• ${item.name} (x${item.qty}) - R$ ${(item.price * item.qty).toFixed(2)}%0A`;
    });
    msg += `%0ATotal: R$ ${cartTotalEl.textContent}`;
    window.open(`https://wa.me/5577981543503?text=${msg}`, "_blank");
  });
});
