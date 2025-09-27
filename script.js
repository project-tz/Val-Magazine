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

  let products = [
    { name: "Bolsa Casual", category: "Bolsas", price: 120.00, image: "bolsa.jpeg" },
    { name: "Caneca Time (Vasco)", category: "Canecas", price: 39.50, image: "canecavasco.jpeg" },
    { name: "Creme Facial", category: "Beleza", price: 45.50, image: "creme.jpeg" },
    { name: "Fone Bluetooth", category: "Eletrônicos", price: 220.00, image: "fone.jpeg" },
    { name: "Pelúcia Urso", category: "Pelúcias", price: 55.00, image: "pelucia.jpeg" }
  ];

  products.sort((a,b)=>a.name.localeCompare(b.name));
  document.getElementById("year").textContent = new Date().getFullYear();

  function renderProducts(list){
    productsGrid.innerHTML="";
    list.forEach(prod=>{
      const card = document.createElement("div");
      card.className="product-card";
      card.innerHTML=`
        <div class="product-img-wrap">
          <img src="${prod.image}" alt="${prod.name}" class="product-img" data-name="${prod.name}" data-img="${prod.image}">
        </div>
        <h4 class="product-title">${prod.name}</h4>
        <p class="product-price">R$ ${prod.price.toFixed(2)}</p>
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

  function filterProducts(){
    const term = searchInput.value.toLowerCase();
    const cat = categoryFilter.value;
    const filtered = products.filter(p=>{
      const matchTerm=p.name.toLowerCase().includes(term);
      const matchCat=cat==="Todos"||p.category===cat;
      return matchTerm&&matchCat;
    });
    renderProducts(filtered);
  }

  searchInput.addEventListener("input",filterProducts);
  categoryFilter.addEventListener("change",filterProducts);

  document.addEventListener("click", e=>{
    const name=e.target.dataset.name;

    // Quantidade no card
    if(e.target.classList.contains("qty-plus")){
      const input=document.querySelector(`input[data-name='${name}']`);
      input.value=parseInt(input.value)+1;
    }
    if(e.target.classList.contains("qty-minus")){
      const input=document.querySelector(`input[data-name='${name}']`);
      if(parseInt(input.value)>1) input.value=parseInt(input.value)-1;
    }

    // Adicionar ao carrinho
    if(e.target.classList.contains("add-to-cart")){
      const prod=products.find(p=>p.name===name);
      const input=document.querySelector(`input[data-name='${name}']`);
      const qty=parseInt(input.value);
      if(!prod) return;
      const item=cart.find(i=>i.name===name);
      if(item) item.qty+=qty;
      else cart.push({...prod,qty});
      updateCart(true);
    }

    // Comprar Agora
    if(e.target.classList.contains("buy-now")){
      const prod=products.find(p=>p.name===name);
      if(!prod) return;
      const msg=`Olá, quero comprar agora:%0A%0A• ${prod.name} - R$ ${prod.price.toFixed(2)}`;
      window.open(`https://wa.me/5577981543503?text=${msg}`,"_blank");
    }

    // Modal de imagem
    if(e.target.classList.contains("product-img")){
      modalImage.src=e.target.dataset.img;
      modalCaption.textContent=e.target.dataset.name;
      modal.style.display="flex";
      modal.setAttribute("aria-hidden","false");
    }

    // Carrinho interno
    if(e.target.classList.contains("cart-qty-plus")){
      const item=cart.find(i=>i.name===name);
      if(item) item.qty++;
      updateCart();
    }
    if(e.target.classList.contains("cart-qty-minus")){
      const item=cart.find(i=>i.name===name);
      if(item && item.qty>1) item.qty--;
      updateCart();
    }
    if(e.target.classList.contains("cart-remove")){
      cart=cart.filter(i=>i.name!==name);
      updateCart();
    }
  });

  closeModal.addEventListener("click",()=>{
    modal.style.display="none";
    modal.setAttribute("aria-hidden","true");
  });

  cartBtn.addEventListener("click",()=>{
    cartDrawer.classList.add("open");
    cartDrawer.setAttribute("aria-hidden","false");
  });
  closeCartBtn.addEventListener("click",()=>{
    cartDrawer.classList.remove("open");
    cartDrawer.setAttribute("aria-hidden","true");
  });

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
    cartCount.textContent=cart.reduce((sum,i)=>sum+i.qty,0);
    if(animate){
      cartCount.classList.add("bounce");
      setTimeout(()=>cartCount.classList.remove("bounce"),300);
    }
    cartTotalEl.textContent=total.toFixed(2);
  }

  clearCartBtn.addEventListener("click",()=>{
    cart=[];
    updateCart(true);
  });

  checkoutBtn.addEventListener("click",()=>{
    if(cart.length===0) return;
    let msg="Olá, quero finalizar meu pedido:%0A%0A";
    cart.forEach(item=>{
      msg+=`• ${item.name} (x${item.qty}) - R$ ${(item.price*item.qty).toFixed(2)}%0A`;
    });
    msg+=`%0ATotal: R$ ${cartTotalEl.textContent}`;
    window.open(`https://wa.me/5577981543503?text=${msg}`,"_blank");
  });
});
