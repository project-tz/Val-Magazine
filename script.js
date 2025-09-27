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
  const buyNowModal = document.getElementById("buy-now-modal");

  let cart = [];
  let products = [
    { id:1,name:"Bolsa Casual",category:"Bolsas",price:120.00,image:"bolsa.jpeg" },
    { id:2,name:"Caneca Time (Vasco)",category:"Canecas",price:39.50,image:"canecavasco.jpeg" },
    { id:3,name:"Creme Facial",category:"Beleza",price:45.50,image:"creme.jpeg" },
    { id:4,name:"Fone Bluetooth",category:"Eletrônicos",price:220.00,image:"fone.jpeg" },
    { id:5,name:"Pelúcia Urso",category:"Pelúcias",price:55.00,image:"pelucia.jpeg" }
  ];

  products.sort((a,b)=>a.name.localeCompare(b.name));
  document.getElementById("year").textContent=new Date().getFullYear();

  function renderProducts(list){
    productsGrid.innerHTML="";
    list.forEach(prod=>{
      const card=document.createElement("div");
      card.className="product-card";
      card.innerHTML=`
        <div class="product-img-wrap">
          <img src="${prod.image}" alt="${prod.name}" class="product-img" data-id="${prod.id}" data-name="${prod.name}" data-price="${prod.price}" data-img="${prod.image}">
        </div>
        <h4 class="product-title">${prod.name}</h4>
        <p class="product-price">R$ ${prod.price.toFixed(2)}</p>
        <div class="product-actions">
          <button class="btn primary buy-now" data-id="${prod.id}">Comprar Agora</button>
          <button class="btn ghost add-cart" data-id="${prod.id}">Adicionar ao Carrinho</button>
        </div>
      `;
      productsGrid.appendChild(card);
    });
  }

  renderProducts(products);

  function filterProducts(){
    const term=searchInput.value.toLowerCase();
    const cat=categoryFilter.value;
    renderProducts(products.filter(p=>p.name.toLowerCase().includes(term)&&(cat==="Todos"||p.category===cat)));
  }

  searchInput.addEventListener("input",filterProducts);
  categoryFilter.addEventListener("change",filterProducts);

  function updateCart(){
    cartItemsEl.innerHTML="";
    let total=0;
    cart.forEach(item=>{
      total+=item.price*item.qty;
      const div=document.createElement("div");
      div.className="cart-item";
      div.innerHTML=`<img src="${item.image}" alt="${item.name}"><div>${item.name}</div><div>R$ ${item.price.toFixed(2)}</div><div>${item.qty}</div>`;
      cartItemsEl.appendChild(div);
    });
    cartTotalEl.textContent=total.toFixed(2);
    cartCount.textContent=cart.reduce((acc,i)=>acc+i.qty,0);
  }

  document.addEventListener("click", e=>{
    const id=parseInt(e.target.dataset.id);
    const prod=products.find(p=>p.id===id);

    if(e.target.classList.contains("product-img")){
      modalImage.src=e.target.dataset.img;
      modalCaption.textContent=e.target.dataset.name;
      modal.setAttribute("aria-hidden","false");
      modal.style.display="flex";
      buyNowModal.dataset.id=id;
    }

    if(e.target.classList.contains("buy-now")){
      if(!prod) return;
      window.open(`https://wa.me/5577981543503?text=${encodeURIComponent(`Olá, quero comprar: ${prod.name} - R$ ${prod.price.toFixed(2)}`)}`, "_blank");
    }

    if(e.target.classList.contains("add-cart")){
      if(!prod) return;
      const cartItem=cart.find(c=>c.id===prod.id);
      cartItem? cartItem.qty++ : cart.push({...prod,qty:1});
      updateCart();
      cartDrawer.classList.add("open");
    }
  });

  closeModal.addEventListener("click",()=>{
    modal.style.display="none";
    modal.setAttribute("aria-hidden","true");
  });

  buyNowModal.addEventListener("click",()=>{
    const id=parseInt(buyNowModal.dataset.id);
    const item=products.find(p=>p.id===id);
    if(!item) return;
    window.open(`https://wa.me/5577981543503?text=${encodeURIComponent(`Olá, quero comprar: ${item.name} - R$ ${item.price.toFixed(2)}`)}`, "_blank");
  });

  cartBtn.addEventListener("click",()=>cartDrawer.classList.add("open"));
  closeCartBtn.addEventListener("click",()=>cartDrawer.classList.remove("open"));
  clearCartBtn.addEventListener("click",()=>{cart=[];updateCart()});
  checkoutBtn.addEventListener("click",()=>{
    if(cart.length===0) return alert("Carrinho vazio!");
    let msg="Olá, quero comprar:\n";
    cart.forEach(i=>msg+=`${i.name} - ${i.qty} x R$ ${i.price.toFixed(2)}\n`);
    window.open(`https://wa.me/5577981543503?text=${encodeURIComponent(msg)}`, "_blank");
  });
});
