// Produtos (exemplo)
const products = [
  { name: "Bolsa Preta", price: 120.00, category: "Bolsas", image: "produto1.jpg" },
  { name: "Perfume Avatim", price: 80.00, category: "Avatim", image: "produto2.jpg" },
  { name: "Relógio Digital", price: 150.00, category: "Relógios", image: "produto3.jpg" }
];

const productsGrid = document.getElementById("products-grid");
const searchInput = document.getElementById("search");
const categoryFilter = document.getElementById("category-filter");

const cartBtn = document.getElementById("cart-btn");
const cartDrawer = document.getElementById("cart-drawer");
const closeCartBtn = document.getElementById("close-cart");
const cartItemsEl = document.getElementById("cart-items");
const cartTotalEl = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");
const clearCartBtn = document.getElementById("clear-cart");
const checkoutBtn = document.getElementById("checkout");

let cart = [];

// Renderizar produtos
function renderProducts(filterText="", filterCategory="Todos") {
  productsGrid.innerHTML = "";
  products
    .filter(p => 
      p.name.toLowerCase().includes(filterText.toLowerCase()) &&
      (filterCategory === "Todos" || p.category === filterCategory)
    )
    .forEach(p => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${p.image}" alt="${p.name}" class="product-img" data-caption="${p.name} - R$ ${p.price.toFixed(2)}">
        <h4>${p.name}</h4>
        <p>R$ ${p.price.toFixed(2)}</p>
        <button class="btn add-to-cart" data-name="${p.name}">Adicionar</button>
      `;
      productsGrid.appendChild(card);
    });
}

// Atualizar carrinho
function updateCart(animate=false){
  cartItemsEl.innerHTML="";
  let total=0;
  cart.sort((a,b)=>a.name.localeCompare(b.name));
  cart.forEach(item=>{
    total+=item.price*item.qty;
    const div=document.createElement("div");
    div.className="cart-item";
    div.innerHTML=`
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-info">
        <strong>${item.name}</strong>
        <div class="cart-qty">
          <button class="cart-qty-minus" data-name="${item.name}">−</button>
          <span>${item.qty}</span>
          <button class="cart-qty-plus" data-name="${item.name}">+</button>
        </div>
        <div class="cart-price">R$ ${(item.price*item.qty).toFixed(2)}</div>
      </div>
      <button class="cart-remove" data-name="${item.name}">✕</button>
    `;
    cartItemsEl.appendChild(div);
  });
  cartCount.textContent=cart.reduce((sum,i)=>sum+i.qty,0);
  if(animate){
    cartCount.classList.add("bounce");
    setTimeout(()=>cartCount.classList.remove("bounce"),300);
  }
  cartTotalEl.textContent=total.toFixed(2);
}

// Adicionar ao carrinho
function addToCart(name){
  const product=products.find(p=>p.name===name);
  if(!product) return;
  const item=cart.find(i=>i.name===name);
  if(item){
    item.qty++;
  } else {
    cart.push({...product, qty:1});
  }
  updateCart(true);
}

// Eventos
productsGrid.addEventListener("click",e=>{
  if(e.target.classList.contains("add-to-cart")){
    addToCart(e.target.dataset.name);
  }
});
cartItemsEl.addEventListener("click",e=>{
  const name=e.target.dataset.name;
  if(e.target.classList.contains("cart-qty-minus")){
    const item=cart.find(i=>i.name===name);
    if(item){ item.qty--; if(item.qty<=0) cart=cart.filter(i=>i.name!==name); }
    updateCart();
  }
  if(e.target.classList.contains("cart-qty-plus")){
    const item=cart.find(i=>i.name===name);
    if(item){ item.qty++; updateCart(); }
  }
  if(e.target.classList.contains("cart-remove")){
    cart=cart.filter(i=>i.name!==name);
    updateCart();
  }
});

// Abrir/fechar carrinho
cartBtn.addEventListener("click",()=>cartDrawer.setAttribute("aria-hidden","false"));
closeCartBtn.addEventListener("click",()=>cartDrawer.setAttribute("aria-hidden","true"));

// Limpar carrinho
clearCartBtn.addEventListener("click",()=>{cart=[];updateCart();});

// Finalizar compra
checkoutBtn.addEventListener("click",()=>{
  if(cart.length===0) return alert("Seu carrinho está vazio!");
  let msg="Olá, gostaria de finalizar meu pedido:\n";
  cart.forEach(item=>{
    msg+=`- ${item.qty}x ${item.name} (R$ ${(item.price*item.qty).toFixed(2)})\n`;
  });
  msg+=`\nTotal: R$ ${cart.reduce((t,i)=>t+i.price*i.qty,0).toFixed(2)}`;
  const url=`https://wa.me/5599999999999?text=${encodeURIComponent(msg)}`;
  window.open(url,"_blank");
});

// Busca e filtro
searchInput.addEventListener("input",()=>renderProducts(searchInput.value,categoryFilter.value));
categoryFilter.addEventListener("change",()=>renderProducts(searchInput.value,categoryFilter.value));

// Ano no footer
document.getElementById("year").textContent=new Date().getFullYear();

// Inicializar
renderProducts();
updateCart();
