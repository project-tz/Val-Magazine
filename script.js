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
  // PRODUTOS (JSON INCORPORADO)
  // ===============================
  let products = [
    { name: "Kit Sensual", price: 99.90, image: "hot1.jpg", category: "hot" },
    { name: "Kit Dia dos Pais", price: 116.90, image: "cestapais.jpeg", category: "cestas" },
    { name: "Kit Natura TodoDia", price: 184.90, image: "kitnaturatd.jpeg", category: "cestas" },
    { name: "Caneca Time (Flamengo)", price: 39.50, image: "canecaflame.jpeg", category: "canecas" },
    { name: "Caneca Time (Corinthians)", price: 39.50, image: "canecacorint.jpeg", category: "canecas" },
    { name: "Urso de Pelúcia Médio", price: 38.90, image: "ursopeluciap.jpeg", category: "pelucias" },
    { name: "Pelúcia Angel Stitch G", price: 68.90, image: "peluciastitchrs.jpeg", category: "pelucias" },
    { name: "Pelúcia Coração FIZZY", price: 45.90, image: "peluciacoracaofizz.jpeg", category: "pelucias" },
    { name: "Copo Térmico Stanley (Azul)", price: 35.00, image: "copostanleyaz.jpeg", category: "utensilios" },
    { name: "Copo Térmico para Café", price: 35.00, image: "copotermicocf.jpeg", category: "utensilios" },
    { name: "Caixinha de Som Bluetooth GP-359 Golden Pro", price: 129.90, image: "caixasomgolden.jpeg", category: "eletronicos" },
    { name: "Caixinha de Som Bluetooth LivStar CNN-4114Sp", price: 140.00, image: "caixasomlivstar.jpeg", category: "eletronicos" },
    { name: "Fone de Ouvido Bluetooth Pro 5s", price: 44.90, image: "fonepro5s.jpeg", category: "eletronicos" },
    { name: "Laço para Cabelo (Preto)", price: 18.90, image: "lacopreto.jpeg", category: "acessorios" },
    { name: "Chaveiro Capivara", price: 13.90, image: "chaveirocapi.jpeg", category: "acessorios" },
    { name: "Boné Blck Brasil", price: 31.50, image: "boneclck.jpeg", category: "acessorios" },
    { name: "Boné New York", price: 31.50, image: "bonenew.jpeg", category: "acessorios" },
    { name: "Touca Infantil", price: 24.00, image: "toucainfant.jpeg", category: "acessorios" },
    { name: "Meia Masculina Cano Baixo", price: 10.00, image: "meiacbmasc.jpeg", category: "acessorios" },
    { name: "Meia Masculina Cano Alto", price: 11.00, image: "meiacamasc.jpeg", category: "acessorios" },
    { name: "Meia Feminina Cano Baixo", price: 10.00, image: "meiafemcb.jpeg", category: "acessorios" },
    { name: "Meia Feminina Cano Alto", price: 11.00, image: "meiafemca.jpeg", category: "acessorios" },
    { name: "Meia Infantil Feminina", price: 10.00, image: "meiafeminf.jpeg", category: "acessorios" },
    { name: "Meia Infantil Masculina", price: 10.00, image: "meiamascinf.jpeg", category: "acessorios" },
    { name: "Perfume para Interiores (Flor de algodão) 200ml", price: 55.90, image: "avatimalgodao.jpeg", category: "avatim" },
    { name: "Essência para Difusor (Avadore) 210ml", price: 68.50, image: "essenciaavadore.jpeg", category: "avatim" },
    { name: "Essência Concentrada (Cascas e Folhas) 30ml", price: 47.50, image: "essenciafolhas.jpeg", category: "avatim" },
    { name: "Kit Lavabo Esférico Marrom", price: 102.90, image: "lavabomarrom.jpeg", category: "casa/decoracao" },
    { name: "Kit Lavabo Cinza", price: 89.90, image: "lavabocinza.jpeg", category: "casa/decoracao" },
    { name: "Conjunto Caneca Gratidão + Pires Coração", price: 35.90, image: "canecagratidao.jpeg", category: "casa/decoracao" },
    { name: "Difusor Umidificador Luminária OIH-6610", price: 119.90, image: "difluminariaoih.jpeg", category: "difusores" },
    { name: "Difusor Elétrico Amadeirado OHEY DL-512", price: 84.90, image: "difamadeirado.jpeg", category: "difusores" },
    { name: "Carrinho Bombeiro Nova Toys", price: 38.50, image: "carrinhobomb.jpeg", category: "brinquedos" },
    { name: "Carrinho Monstro Faster", price: 26.50, image: "carrinhomonstro.jpeg", category: "brinquedos" },
    { name: "Motinha de Trilha Mega Cross Kendy", price: 31.50, image: "motinhatrilha.jpeg", category: "brinquedos" },
    { name: "Balde de Praia Kendy", price: 35.00, image: "baldepraia.jpeg", category: "brinquedos" },
    { name: "Boneca Sereia Mermaid Dressup", price: 22.75, image: "bonecasereia.jpeg", category: "brinquedos" },
    { name: "Carrinho Polícia", price: 15.90, image: "carrinhopol.jpeg", category: "brinquedos" },
    { name: "Bicicleta Bike Miniatura", price: 48.00, image: "bikeminiatura.jpeg", category: "brinquedos" },
    { name: "Garrafa Motivação 2000ml", price: 17.00, image: "garrafa2000ml.jpeg", category: "utensilios" },
    { name: "Garrafa Motivacional 900ml", price: 13.90, image: "garrafa900ml.jpeg", category: "utensilios" },
    { name: "Garrafa Motivacional 300ml", price: 9.95, image: "garrafa300ml.jpeg", category: "utensilios" },
    { name: "Garrafa Drink Up 500ml", price: 9.90, image: "garrafa500ml.jpeg", category: "utensilios" },
    { name: "Copo Térmico Stanley (Verde)", price: 35.00, image: "copostanleyverde.jpeg", category: "utensilios" },
    { name: "Copo Térmico Stanley (Preto)", price: 35.00, image: "copostanleypreto.jpeg", category: "utensilios" },
    { name: "Copo Térmico Stanley (Rosa)", price: 35.00, image: "copostanleyrosa.jpeg", category: "utensilios" },
    { name: "Copo Térmico Stanley c/ Tampa Para Cerveja (Rosa)", price: 42.00, image: "copostanleytampa.jpeg", category: "utensilios" },
    { name: "Garrafa Térmica c/ Led Marcador de Temperatura", price: 38.90, image: "garrafaled.jpeg", category: "utensilios" },
    { name: "Pano de Prato Un", price: 3.50, image: "panodeprato.jpeg", category: "utensilios" },
    { name: "Coqueteleira Alumínio", price: 34.90, image: "coqueteleira.jpeg", category: "utensilios" },
    { name: "Balde de Cerveja", price: 34.90, image: "baldecerveja.jpeg", category: "utensilios" },
    { name: "Pote Hermético Un", price: 4.90, image: "potehermetico.jpeg", category: "utensilios" },
    { name: "Protetor de Quina", price: 10.00, image: "protetorquina.jpeg", category: "utensilios" },
    { name: "Kit de Prendedores de Metal", price: 9.00, image: "kitprendedor.jpeg", category: "utensilios" },
    { name: "Abridor de Latas e Garrafas", price: 22.00, image: "abridorlata.jpeg", category: "utensilios" },
    { name: "Fouet", price: 9.00, image: "fouet.jpeg", category: "utensilios" },
    { name: "Taça para Champanhe", price: 17.50, image: "tacachamp.jpeg", category: "utensilios" },
    { name: "Taça para Vinho", price: 21.90, image: "tacavinho.jpeg", category: "utensilios" },
    { name: "Taça Transparente para Suco", price: 14.00, image: "tacasuco.jpeg", category: "utensilios" },
    { name: "Taça Preta para Suco", price: 17.00, image: "tacasucopreta.jpeg", category: "utensilios" },
    { name: "Copo de Wisky", price: 8.90, image: "copowk.jpeg", category: "utensilios" },
    { name: "Copo de Cachaça", price: 5.25, image: "copocachaca.jpeg", category: "utensilios" },
    { name: "Caneca Time (Palmeiras)", price: 39.50, image: "canecapalmeiras.jpeg", category: "canecas" },
    { name: "Caneca Time (São Paulo)", price: 39.50, image: "canecasp.jpeg", category: "canecas" },
    { name: "Caneca Pais N1", price: 29.90, image: "canecapaisn1.jpeg", category: "canecas" },
    { name: "Caneca Pais N2", price: 29.90, image: "canecapaisn2.jpeg", category: "canecas" },
    { name: "Caneca Mães N1", price: 39.90, image: "canecamaesn1.jpeg", category: "canecas" },
    { name: "Caneca Mães N2", price: 39.90, image: "canecamaesn2.jpeg", category: "canecas" },
    { name: "Caneca Mães N3", price: 39.90, image: "canecamaesn3.jpeg", category: "canecas" },
    { name: "Caneca Mães N4", price: 39.90, image: "canecamaesn4.jpeg", category: "canecas" },
    { name: "Caneca Mães N5", price: 39.90, image: "canecamaesn5.jpeg", category: "canecas" },
    { name: "Caneca Namorados N1", price: 29.90, image: "canecanamoradosn1.jpeg", category: "canecas" },
    { name: "Caneca Namorados N2", price: 29.90, image: "canecanamoradosn2.jpeg", category: "canecas" },
    { name: "Caneca Namorados N3", price: 29.90, image: "canecanamoradosn3.jpeg", category: "canecas" },
    { name: "Caneca Namorados N4", price: 29.90, image: "canecanamoradosn4.jpeg", category: "canecas" },
    { name: "Mini Caneca Frases N1", price: 19.90, image: "minicanecan1.jpeg", category: "canecas" },
    { name: "Mini Caneca Frases N2", price: 19.90, image: "minicanecan2.jpeg", category: "canecas" },
    { name: "Abridor de Latas", price: 11.00, image: "abridordelata.jpeg", category: "utensilios" },
    { name: "Taça Cerveja", price: 10.50, image: "tacacerveja.jpeg", category: "utensilios" },
    { name: "Pelúcia Stitch P", price: 43.90, image: "peluciastitchp.jpeg", category: "pelucias" },
    { name: "Pelúcia Angel Stitch P", price: 39.90, image: "peluciastitchangelp.jpeg", category: "pelucias" },
    { name: "Pelúcia Stitch G", price: 68.90, image: "peluciastitchg.jpeg", category: "pelucias" },
    { name: "Pelúcia Fúria da Noite Banguela", price: 43.90, image: "peluciafuria.jpeg", category: "pelucias" },
    { name: "Pelúcia Fúria da Luz", price: 43.90, image: "peluciafurialuz.jpeg", category: "pelucias" },
    { name: "Urso de Pelúcia Médio Rosa", price: 38.90, image: "ursomediorosa.jpeg", category: "pelucias" },
    { name: "Urso de Pelúcia Médio Marfim", price: 38.90, image: "ursomediomarfim.jpeg", category: "pelucias" },
    { name: "Almofada Coração c/ Braços N1", price: 69.90, image: "almofadacoracao.jpeg", category: "pelucias" },
    { name: "Almofada Coração c/ Braços N2", price: 32.90, image: "almofadacoracaon2.jpeg", category: "pelucias" },
    { name: "Almofada Emoji Coração", price: 26.90, image: "almofadaemoji.jpeg", category: "pelucias" },
    { name: "Almofada Emoji Rosto Feliz", price: 26.90, image: "almofadarostofeliz.jpeg", category: "pelucias" },
    { name: "Almofada Emoji Apaixonado", price: 26.90, image: "almofadaemojiapaix.jpeg", category: "pelucias" },
    { name: "Almofada Emoji Risada", price: 26.90, image: "almofadaemojirisada.jpeg", category: "pelucias" },
    { name: "Almofada Emoji Corações", price: 26.90, image: "almofadaemojicoracoes.jpeg", category: "pelucias" },
    { name: "Relógio Champion Feminino Dourado", price: 152.00, image: "relogiochampfemdour.jpeg", category: "relogios" },
    { name: "Relógio Champion Feminino Prata", price: 149.90, image: "relogiochampfemprat.jpeg", category: "relogios" },
    { name: "Relógio Champion Masculino Dourado", price: 148.90, image: "relogiochampmascdour.jpeg", category: "relogios" },
    { name: "Relógio Champion Masculino Prata", price: 148.90, image: "relogiochampmascprat.jpeg", category: "relogios" },
    { name: "Relógio Champion Unissex Preto", price: 148.90, image: "relogiochampunipret.jpeg", category: "relogios" }
  ];

  // Adicionando produtos vazios até 200 (mantém compatibilidade para você preencher depois)
  while (products.length < 200) {
    products.push({ name: "", category: "", price: 0, image: "" });
  }

  // Ordena por nome (alfabética) — strings vazias vão pro topo, caso queira mudar esse comportamento depois fala que eu ajusto
  products.sort((a, b) => a.name.localeCompare(b.name));

  // Atualiza ano (se tiver elemento #year)
  if (document.getElementById("year")) {
    document.getElementById("year").textContent = new Date().getFullYear();
  }

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

  function filterProducts() {
    const term = (searchInput.value || "").toLowerCase();
    const cat = categoryFilter.value || "Todos";
    const filtered = products.filter(p => {
      const matchTerm = (p.name || "").toLowerCase().includes(term);
      const matchCat = cat === "Todos" || (p.category === cat);
      return matchTerm && matchCat;
    });
    filtered.sort((a, b) => a.name.localeCompare(b.name)); // garante ordem alfabética
    renderProducts(filtered);
  }

  searchInput.addEventListener("input", filterProducts);
  categoryFilter.addEventListener("change", filterProducts);

  document.addEventListener("click", e => {
    const name = e.target.dataset.name;

    if (e.target.classList.contains("qty-plus")) {
      const input = document.querySelector(`input[data-name='${name}']`);
      if (input) input.value = parseInt(input.value) + 1;
    }
    if (e.target.classList.contains("qty-minus")) {
      const input = document.querySelector(`input[data-name='${name}']`);
      if (input && parseInt(input.value) > 1) input.value = parseInt(input.value) - 1;
    }

    if (e.target.classList.contains("add-to-cart")) {
      const prod = products.find(p => p.name === name);
      const input = document.querySelector(`input[data-name='${name}']`);
      const qty = input ? parseInt(input.value) : 1;
      if (!prod) return;
      const item = cart.find(i => i.name === name);
      if (item) item.qty += qty;
      else cart.push({ ...prod, qty });
      updateCart(true);
    }

    if (e.target.classList.contains("buy-now")) {
      const prod = products.find(p => p.name === name);
      if (!prod) return;
      const msg = `Olá, quero comprar agora:%0A%0A• ${prod.name} - R$ ${Number(prod.price).toFixed(2)}`;
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
      if (item) item.qty++;
      updateCart();
    }
    if (e.target.classList.contains("cart-qty-minus")) {
      const item = cart.find(i => i.name === name);
      if (item && item.qty > 1) item.qty--;
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

  function updateCart(animate = false) {
    cartItemsEl.innerHTML = "";
    let total = 0;
    cart.sort((a, b) => a.name.localeCompare(b.name));
    cart.forEach(item => {
      total += Number(item.price) * item.qty;
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
        <div>R$ ${(Number(item.price) * item.qty).toFixed(2)}</div>
        <button class="cart-remove" data-name="${item.name}">✕</button>
      `;
      cartItemsEl.appendChild(div);
    });
    cartCount.textContent = cart.reduce((sum, i) => sum + i.qty, 0);
    if (animate) {
      cartCount.classList.add("bounce");
      setTimeout(() => cartCount.classList.remove("bounce"), 300);
    }
    cartTotalEl.textContent = total.toFixed(2);
  }

  clearCartBtn.addEventListener("click", () => {
    cart = [];
    updateCart(true);
  });

  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) return;
    let msg = "Olá, quero finalizar meu pedido:%0A%0A";
    cart.forEach(item => {
      msg += `• ${item.name} (x${item.qty}) - R$ ${(Number(item.price) * item.qty).toFixed(2)}%0A`;
    });
    msg += `%0ATotal: R$ ${cartTotalEl.textContent}`;
    window.open(`https://wa.me/5577981543503?text=${msg}`, "_blank");
  });
});
