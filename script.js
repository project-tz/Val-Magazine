// Produtos
const PRODUCTS = [
  { "title": "Caneca Personalizada", "price": 59.90, "category": "Canecas", "image": "canecavasco.jpeg" },
  { "title": "Bolsa Feminina Luxo", "price": 199.90, "category": "Bolsas", "image": "bolsa.jpeg" },
  { "title": "Relógio Digital Futurista", "price": 299.90, "category": "Relógios", "image": "relogio.jpeg" },
  { "title": "Relógio Digital", "price": 299.90, "category": "Relógios", "image": "relogio.jpeg" }
];

let cart = {};

function normalize(str){
  return String(str || '').normalize('NFD').replace(/[̀-\u036f]/g,'').toLowerCase();
}

const productsGrid = document.getElementById('products-grid');
const searchInput = document.getElementById('search');
const categoryFilter = document.getElementById('category-filter');
const cartBtn = document.getElementById('cart-btn');
const cartCount = document.getElementById('cart-count');
const cartDrawer = document.getElementById('cart-drawer');
const cartItemsWrap = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');
const closeCartBtn = document.getElementById('close-cart');
const clearCartBtn = document.getElementById('clear-cart');
const checkoutBtn = document.getElementById('checkout');

const imgModal = document.getElementById('img-modal');
const modalImage = document.getElementById('modal-image');
const modalCaption = document.getElementById('modal-caption');
const closeModal = document.getElementById('close-modal');

// Render produtos
function renderProducts(list = PRODUCTS){
  productsGrid.innerHTML = '';
  list.forEach((p, idx) => {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="product-media" data-index="${idx}">
        <img src="${p.image}" alt="${p.title}" loading="lazy">
      </div>
      <div class="product-info">
        <div class="product-title">${p.title}</div>
        <div class="product-category">${p.category}</div>
      </div>
      <div class="product-bottom">
        <div class="price">R$ ${p.price.toFixed(2)}</div>
        <div class="card-actions">
          <button class="btn add" data-index="${idx}">Adicionar</button>
          <button class="btn primary buy" data-index="${idx}">Comprar</button>
        </div>
      </div>
    `;
    productsGrid.appendChild(card);
  });
}

// Filtros
function applyFilters(){
  const q = normalize(searchInput.value.trim());
  const cat = categoryFilter.value;
  const filtered = PRODUCTS.filter(p => {
    const matchesCat = (cat === 'Todos') || p.category === cat;
    const combined = `${p.title} ${p.category}`;
    const matchesQ = normalize(combined).includes(q);
    return matchesCat && matchesQ;
  });
  renderProducts(filtered);
}

// Atualiza carrinho
function updateCartUI(){
  const items = Object.values(cart);
  const total = items.reduce((s,it)=> s + it.price*it.qty, 0);
  cartTotalEl.textContent = total.toFixed(2);
  const count = items.reduce((s,it)=> s + it.qty, 0);
  cartCount.textContent = count;

  cartItemsWrap.innerHTML = '';
  if(items.length === 0){
    cartItemsWrap.innerHTML = `<p style="color:var(--muted)">Seu carrinho está vazio.</p>`;
    return;
  }

  items.forEach(it => {
    const el = document.createElement('div');
    el.className = 'cart-item';
    el.innerHTML = `
      <img src="${it.image}" alt="${it.title}" loading="lazy">
      <div style="flex:1">
        <div style="font-weight:600">${it.title}</div>
        <div style="color:var(--muted);font-size:0.9rem">R$ ${it.price.toFixed(2)}</div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px">
        <div class="qty-controls">
          <button data-decrease="${it.id}">-</button>
          <div style="padding:6px 8px">${it.qty}</div>
          <button data-increase="${it.id}">+</button>
        </div>
        <button data-remove="${it.id}" style="margin-top:6px">Remover</button>
      </div>
    `;
    cartItemsWrap.appendChild(el);
  });
}

// Adiciona item
function addToCart(product){
  const id = normalize(product.title + product.price);
  if(cart[id]) cart[id].qty += 1;
  else cart[id] = {...product, qty:1, id};
  updateCartUI();
}

// Eventos
searchInput.addEventListener('input', applyFilters);
categoryFilter.addEventListener('change', applyFilters);

productsGrid.addEventListener('click', e=>{
  if(e.target.classList.contains('add')){
    const idx = e.target.dataset.index;
    addToCart(PRODUCTS[idx]);
  }
  if(e.target.classList.contains('buy')){
    const idx = e.target.dataset.index;
    const p = PRODUCTS[idx];
    window.open(`https://wa.me/5577981543503?text=Olá! Quero comprar: ${encodeURIComponent(p.title)} - R$ ${p.price.toFixed(2)}`, '_blank');
  }
  if(e.target.closest('.product-media')){
    const idx = e.target.closest('.product-media').dataset.index;
    const p = PRODUCTS[idx];
    modalImage.src = p.image;
    modalCaption.textContent = p.title;
    imgModal.classList.add('show');
    imgModal.setAttribute('aria-hidden','false');
  }
});

imgModal.addEventListener('click', e=>{
  if(e.target===imgModal || e.target===closeModal){
    imgModal.classList.remove('show');
    imgModal.setAttribute('aria-hidden','true');
  }
});

// Carrinho
cartBtn.addEventListener('click', ()=>{
  cartDrawer.classList.add('open');
  cartDrawer.setAttribute('aria-hidden','false');
});
closeCartBtn.addEventListener('click', ()=>{
  cartDrawer.classList.remove('open');
  cartDrawer.setAttribute('aria-hidden','true');
});
clearCartBtn.addEventListener('click', ()=>{
  cart = {};
  updateCartUI();
});
checkoutBtn.addEventListener('click', ()=>{
  const items = Object.values(cart);
  if(items.length === 0) return alert("Carrinho vazio!");
  let text = "Olá! Gostaria de finalizar minha compra:\n\n";
  items.forEach(it => {
    text += `• ${it.title} (x${it.qty}) - R$ ${(it.price*it.qty).toFixed(2)}\n`;
  });
  text += `\nTotal: R$ ${cartTotalEl.textContent}`;
  window.open(`https://wa.me/5577981543503?text=${encodeURIComponent(text)}`, '_blank');
});
cartItemsWrap.addEventListener('click', e=>{
  if(e.target.dataset.increase){
    cart[e.target.dataset.increase].qty++;
    updateCartUI();
  }
  if(e.target.dataset.decrease){
    const id = e.target.dataset.decrease;
    if(cart[id].qty>1) cart[id].qty--;
    else delete cart[id];
    updateCartUI();
  }
  if(e.target.dataset.remove){
    delete cart[e.target.dataset.remove];
    updateCartUI();
  }
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Inicial
applyFilters();
updateCartUI();
