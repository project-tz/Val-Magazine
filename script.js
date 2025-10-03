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

  // ===============================
  // PRODUTOS
  // ===============================
  let products = [ 
    // ... teu array de produtos (igualzinho estava)
  ];

  // Ordena produtos alfabeticamente
  products.sort((a, b) => a.name.localeCompare(b.name));

  // ===============================
  // RENDERIZAÇÃO DE PRODUTOS
  // ===============================
  function renderProducts(list) {
    productsGrid.innerHTML = "";
    list.forEach(prod => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <div class="product-img-wrap">
          <img src="${prod.image}" alt="${prod.name}" class="product-img" data-name="${prod.name}" data-img="${prod.image}">
        </div>
        <h4 class="product-title">${prod.name}</h4>
        <p class="product-price">R$ ${Number(prod.price).toFixed(2)}</p>
        <div class="quantity-select">
          <button class="qty-minus" data-name="${prod.name}">-</button>
          <input type="number" min="1" value="1" data-name="${prod.name}">
          <button class="qty-plus" data-name="${prod.name}">+</button>
        </div>
        <div class="card-actions">
          <button class="btn ghost buy-now" data-name="${prod.name}">Comprar Agora</button>
          <button class="btn primary add-to-cart" data-name="${prod.name}">Adicionar ao Carrinho</button>
        </div>
      `;
      productsGrid.appendChild(card);
    });
  }

  renderProducts(products);

  // ===============================
  // FILTRO E BUSCA
  // ===============================
  function filterProducts() {
    const term = searchInput.value.toLowerCase();
    const cat = categoryFilter.value;
    let filtered = products.filter(p => p.name.toLowerCase().includes(term));
    if (cat !== "Todos") filtered = filtered.filter(p => p.category === cat);
    filtered.sort((a, b) => a.name.localeCompare(b.name));
    renderProducts(filtered);
  }

  searchInput.addEventListener("input", filterProducts);
  categoryFilter.addEventListener("change", filterProducts);

  // ===============================
  // INTERAÇÕES DE QUANTIDADE E CARRINHO
  // ===============================
  document.addEventListener("click", e => {
    const name = e.target.dataset.name;

    if (e.target.classList.contains("qty-plus")) {
      const input = document.querySelector(`input[data-name="${name}"]`);
      input.value = parseInt(input.value) + 1;
    }

    if (e.target.classList.contains("qty-minus")) {
      const input = document.querySelector(`input[data-name="${name}"]`);
      if (parseInt(input.value) > 1) input.value = parseInt(input.value) - 1;
    }

    if (e.target.classList.contains("add-to-cart")) {
      const prod = products.find(p => p.name === name);
      const input = document.querySelector(`input[data-name="${name}"]`);
      const qty = input ? parseInt(input.value) : 1;
      const existing = cart.find(i => i.name === name);
      if (existing) existing.qty += qty;
      else cart.push({ ...prod, qty });
      updateCart(true);
    }

    if (e.target.classList.contains("buy-now")) {
      const prod = products.find(p => p.name === name);
      const msg = `Olá, quero comprar agora:%0A• ${prod.name} - R$ ${Number(prod.price).toFixed(2)}`;
      window.open(`https://wa.me/5577981543503?text=${msg}`, "_blank");
    }

    if (e.target.classList.contains("product-img")) {
      modalImage.src = e.target.dataset.img;
      modalCaption.textContent = e.target.dataset.name;
      modal.style.display = "flex";
      modal.setAttribute("aria-hidden", "false");
    }

    if (e.target.classList.contains("cart-qty-plus")) {
      const item = cart.find(i => i.name === name);
      item.qty++;
      updateCart();
    }

    if (e.target.classList.contains("cart-qty-minus")) {
      const item = cart.find(i => i.name === name);
      if (item.qty > 1) item.qty--;
      updateCart();
    }

    if (e.target.classList.contains("cart-remove")) {
      cart = cart.filter(i => i.name !== name);
      updateCart();
    }
  });

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
  });

  cartBtn.addEventListener("click", () => {
    cartDrawer.classList.add("open");
    cartDrawer.setAttribute("aria-hidden", "false");
  });

  closeCartBtn.addEventListener("click", () => {
    cartDrawer.classList.remove("open");
    cartDrawer.setAttribute("aria-hidden", "true");
  });

  clearCartBtn.addEventListener("click", () => {
    cart = [];
    updateCart(true);
  });

  checkoutBtn.addEventListener("click", () => {
    if (!cart.length) return;
    let msg = "Olá, quero finalizar meu pedido:%0A%0A";
    cart.forEach(i => {
      msg += `• ${i.name} (x${i.qty}) - R$ ${(i.price*i.qty).toFixed(2)}%0A`;
    });
    msg += `%0ATotal: R$ ${cartTotalEl.textContent}`;
    window.open(`https://wa.me/5577981543503?text=${msg}`, "_blank");
  });

  // ===============================
  // FUNÇÃO DE ATUALIZAÇÃO DO CARRINHO
  // ===============================
  function updateCart(animate = false) {
    cartItemsEl.innerHTML = "";
    cart.sort((a, b) => a.name.localeCompare(b.name));
    let total = 0;
    cart.forEach(item => {
      total += item.price * item.qty;
      const div = document.createElement("div");
      div.className = "cart-item";
      div.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div>${item.name}</div>
        <div>
          <button class="cart-qty-minus" data-name="${item.name}">-</button>
          ${item.qty}
          <button class="cart-qty-plus" data-name="${item.name}">+</button>
        </div>
        <div>R$ ${(item.price*item.qty).toFixed(2)}</div>
        <button class="cart-remove" data-name="${item.name}">✕</button>
      `;
      cartItemsEl.appendChild(div);
    });

    cartCount.textContent = cart.reduce((acc,i)=>acc+i.qty,0);
    cartTotalEl.textContent = total.toFixed(2);

    // 🔹 Salva no LocalStorage sempre que atualizar
    localStorage.setItem("cart", JSON.stringify(cart));

    if (animate) {
      cartCount.classList.add("bounce");
      setTimeout(() => cartCount.classList.remove("bounce"), 300);
    }
  }

  // ===============================
  // CARREGA CARRINHO SALVO AO INICIAR
  // ===============================
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCart();
  }
});
