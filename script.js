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
  { name: "Abridor de Latas", price: 11.00, image: "abridordelata.jpeg", category: "Utensílios" },
  { name: "Abridor de Latas e Garrafas", price: 22.00, image: "abridorlata.jpeg", category: "Utensílios" },
  { name: "Almofada Coração com Braços", price: 85.00, image: "almofadacoracao.jpeg", category: "Decoração" },
  { name: "Almofada Emoji", price: 48.00, image: "almofadaemoji.jpeg", category: "Decoração" },
  { name: "Almofada Estampada", price: 45.00, image: "almofadaestampada.jpeg", category: "Decoração" },
  { name: "Almofada Gatinho", price: 45.00, image: "almofadagato.jpeg", category: "Decoração" },
  { name: "Almofada Pelúcia", price: 52.00, image: "almofadapelu.jpeg", category: "Decoração" },
  { name: "Almofada Rosquinha", price: 48.00, image: "almofadarosquinha.jpeg", category: "Decoração" },
  { name: "Almofada Sorvete", price: 48.00, image: "almofadasorvete.jpeg", category: "Decoração" },
  { name: "Almofada Unicórnio", price: 48.00, image: "almofadaunicornio.jpeg", category: "Decoração" },
  { name: "Anel Regulável", price: 22.00, image: "anel.jpeg", category: "Acessórios" },
  { name: "Aparelho de Jantar", price: 290.00, image: "aparelho.jpeg", category: "Cozinha" },
  { name: "Aromatizador Avatim 250ml", price: 76.00, image: "aromatizador.jpeg", category: "Avatim" },
  { name: "Avental", price: 36.00, image: "avental.jpeg", category: "Cozinha" },
  { name: "Balde de Pipoca", price: 22.00, image: "baldepipoca.jpeg", category: "Cozinha" },
  { name: "Bandeja Decorada", price: 65.00, image: "bandeja.jpeg", category: "Decoração" },
  { name: "Batedor de Ovos", price: 18.00, image: "batedor.jpeg", category: "Utensílios" },
  { name: "Batedor Manual", price: 22.00, image: "batedormanual.jpeg", category: "Utensílios" },
  { name: "Batedor Multiuso", price: 20.00, image: "batedormultiuso.jpeg", category: "Utensílios" },
  { name: "Boleira", price: 68.00, image: "boleira.jpeg", category: "Cozinha" },
  { name: "Bolsa Feminina", price: 85.00, image: "bolsa.jpeg", category: "Acessórios" },
  { name: "Bomba de Tereré", price: 42.00, image: "bombaterere.jpeg", category: "Utensílios" },
  { name: "Buquê de Rosas de Sabonete", price: 110.00, image: "buque.jpeg", category: "Presentes" },
  { name: "Caderno Criativo", price: 25.00, image: "caderno.jpeg", category: "Papelaria" },
  { name: "Caixa de Som Bluetooth", price: 120.00, image: "caixadesom.jpeg", category: "Eletrônicos" },
  { name: "Caixa Organizadora", price: 38.00, image: "caixa.jpeg", category: "Organização" },
  { name: "Caneca de Vidro", price: 28.00, image: "canecavidro.jpeg", category: "Cozinha" },
  { name: "Caneca Dia das Mães", price: 32.00, image: "canecamaes.jpeg", category: "Presentes" },
  { name: "Caneca Dia dos Namorados", price: 35.00, image: "canecanamorados.jpeg", category: "Presentes" },
  { name: "Caneca Dia dos Pais", price: 32.00, image: "canecapais.jpeg", category: "Presentes" },
  { name: "Caneca Mágica", price: 40.00, image: "canecamagica.jpeg", category: "Presentes" },
  { name: "Caneca Porcelana", price: 28.00, image: "canecaporcelana.jpeg", category: "Cozinha" },
  { name: "Caneca Térmica", price: 58.00, image: "canecatermica.jpeg", category: "Cozinha" },
  { name: "Caneca Vidro com Tampa", price: 35.00, image: "canecavidrotampa.jpeg", category: "Cozinha" },
  { name: "Capa de Almofada", price: 25.00, image: "capaalmofada.jpeg", category: "Decoração" },
  { name: "Cesta de Café da Manhã", price: 150.00, image: "cestacafe.jpeg", category: "Presentes" },
  { name: "Cesta Dia das Mães", price: 180.00, image: "cestamaes.jpeg", category: "Presentes" },
  { name: "Cesta Dia dos Pais", price: 160.00, image: "cestapais.jpeg", category: "Presentes" },
  { name: "Cesta Namorados", price: 200.00, image: "cestanamorado.jpeg", category: "Presentes" },
  { name: "Chaleira Inox", price: 95.00, image: "chaleira.jpeg", category: "Utensílios" },
  { name: "Chaveiro", price: 18.00, image: "chaveiro.jpeg", category: "Acessórios" },
  { name: "Colar Feminino", price: 35.00, image: "colar.jpeg", category: "Acessórios" },
  { name: "Conjunto de Copos", price: 65.00, image: "copos.jpeg", category: "Cozinha" },
  { name: "Conjunto de Facas", price: 95.00, image: "facas.jpeg", category: "Cozinha" },
  { name: "Conjunto de Panelas", price: 320.00, image: "panelas.jpeg", category: "Cozinha" },
  { name: "Copo Canudo", price: 22.00, image: "copocanudo.jpeg", category: "Cozinha" },
  { name: "Copo Long Drink", price: 20.00, image: "copolongdrink.jpeg", category: "Cozinha" },
  { name: "Copo Térmico", price: 65.00, image: "copotermico.jpeg", category: "Cozinha" },
  { name: "Copo Térmico Stanley Azul", price: 150.00, image: "stanleyazul.jpeg", category: "Stanley" },
  { name: "Copo Térmico Stanley Branco", price: 150.00, image: "stanleybranco.jpeg", category: "Stanley" },
  { name: "Copo Térmico Stanley Preto", price: 150.00, image: "stanleypreto.jpeg", category: "Stanley" },
  { name: "Copo Térmico Stanley Verde", price: 150.00, image: "stanleyverde.jpeg", category: "Stanley" },
  { name: "Cortador de Pizza", price: 22.00, image: "cortadorpizza.jpeg", category: "Utensílios" },
  { name: "Cortador Multiuso", price: 28.00, image: "cortadormultiuso.jpeg", category: "Utensílios" },
  { name: "Creme Hidratante Avatim", price: 72.00, image: "cremeavatim.jpeg", category: "Avatim" },
  { name: "Difusor Avatim", price: 85.00, image: "difusoravatim.jpeg", category: "Avatim" },
  { name: "Escorredor de Arroz", price: 20.00, image: "escorredorarroz.jpeg", category: "Utensílios" },
  { name: "Escorredor de Louça", price: 55.00, image: "escorredorlouca.jpeg", category: "Utensílios" },
  { name: "Espátula de Silicone", price: 22.00, image: "espatula.jpeg", category: "Utensílios" },
  { name: "Esponja de Maquiagem", price: 15.00, image: "esponja.jpeg", category: "Beleza" },
  { name: "Estátua Decorativa", price: 120.00, image: "estatua.jpeg", category: "Decoração" },
  { name: "Forma de Bolo", price: 35.00, image: "formabolo.jpeg", category: "Utensílios" },
  { name: "Forma de Gelo", price: 20.00, image: "formagelo.jpeg", category: "Utensílios" },
  { name: "Forma de Pizza", price: 38.00, image: "formapizza.jpeg", category: "Utensílios" },
  { name: "Forma de Silicone", price: 40.00, image: "formasilicone.jpeg", category: "Utensílios" },
  { name: "Forma Retangular", price: 42.00, image: "formaretangular.jpeg", category: "Utensílios" },
  { name: "Fruteira de Mesa", price: 75.00, image: "fruteira.jpeg", category: "Cozinha" },
  { name: "Garrafa de Água", price: 35.00, image: "garrafaagua.jpeg", category: "Cozinha" },
  { name: "Garrafa Térmica", price: 95.00, image: "garrafatermica.jpeg", category: "Cozinha" },
  { name: "Kit Avatim", price: 150.00, image: "kitavatim.jpeg", category: "Avatim" },
  { name: "Kit Churrasco", price: 95.00, image: "kitchurrasco.jpeg", category: "Utensílios" },
  { name: "Kit Dia das Mães", price: 160.00, image: "kitmaes.jpeg", category: "Presentes" },
  { name: "Kit Dia dos Pais", price: 160.00, image: "kitpais.jpeg", category: "Presentes" },
  { name: "Kit Maquiagem", price: 85.00, image: "kitmaquiagem.jpeg", category: "Beleza" },
  { name: "Kit Namorados", price: 200.00, image: "kitnamorados.jpeg", category: "Presentes" },
  { name: "Kit Panelas Antiaderente", price: 280.00, image: "kitpanelas.jpeg", category: "Cozinha" },
  { name: "Kit Sensual", price: 99.90, image: "hot1.jpg", category: "Hot" },
  { name: "Kit Utensílios de Cozinha", price: 95.00, image: "kitutensilios.jpeg", category: "Utensílios" },
  { name: "Lanterna", price: 42.00, image: "lanterna.jpeg", category: "Eletrônicos" },
  { name: "Liquidificador", price: 160.00, image: "liquidificador.jpeg", category: "Cozinha" },
  { name: "Maquiagem Avatim", price: 90.00, image: "maquiagemavatim.jpeg", category: "Avatim" },
  { name: "Mixer", price: 140.00, image: "mixer.jpeg", category: "Cozinha" },
  { name: "Óculos de Sol", price: 65.00, image: "oculos.jpeg", category: "Acessórios" },
  { name: "Organizador de Maquiagem", price: 58.00, image: "organizadormaquiagem.jpeg", category: "Beleza" },
  { name: "Panela de Arroz", price: 180.00, image: "panelaarroz.jpeg", category: "Cozinha" },
  { name: "Panela de Pressão", price: 220.00, image: "panelapressao.jpeg", category: "Cozinha" },
  { name: "Pano de Prato", price: 15.00, image: "panodeprato.jpeg", category: "Cozinha" },
  { name: "Pipoqueira", price: 95.00, image: "pipoqueira.jpeg", category: "Cozinha" },
  { name: "Porta Chaves", price: 38.00, image: "portachaves.jpeg", category: "Decoração" },
  { name: "Porta Joias", price: 85.00, image: "portajoias.jpeg", category: "Decoração" },
  { name: "Porta Retrato", price: 42.00, image: "portaretrato.jpeg", category: "Decoração" },
  { name: "Porta Temperos", price: 65.00, image: "portatemperos.jpeg", category: "Cozinha" },
  { name: "Relógio de Parede", price: 95.00, image: "relogioparede.jpeg", category: "Decoração" },
  { name: "Relógio Digital", price: 120.00, image: "relogiodigital.jpeg", category: "Decoração" },
  { name: "Relógio Pulso Feminino", price: 150.00, image: "relogiofeminino.jpeg", category: "Acessórios" },
  { name: "Relógio Pulso Masculino", price: 150.00, image: "relogiomasculino.jpeg", category: "Acessórios" },
  { name: "Secador de Cabelo", price: 130.00, image: "secador.jpeg", category: "Beleza" },
  { name: "Tapete Decorativo", price: 120.00, image: "tapete.jpeg", category: "Decoração" },
  { name: "Toalha de Banho", price: 48.00, image: "toalhabanho.jpeg", category: "Cama, Mesa e Banho" },
  { name: "Toalha de Mesa", price: 55.00, image: "toalhamesa.jpeg", category: "Cama, Mesa e Banho" },
  { name: "Travesseiro", price: 65.00, image: "travesseiro.jpeg", category: "Cama, Mesa e Banho" },
  { name: "Vela Decorativa", price: 38.00, image: "vela.jpeg", category: "Decoração" }
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
    if (animate) {
      cartCount.classList.add("bounce");
      setTimeout(() => cartCount.classList.remove("bounce"), 300);
    }
  }
});
