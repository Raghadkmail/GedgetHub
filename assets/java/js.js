/*
  let pendingItem = null;

 document.addEventListener("DOMContentLoaded", function () {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  addToCartButtons.forEach(button => {
    button.addEventListener("click", () => {
      const name = button.dataset.name;
      const price = button.dataset.price;
      const id = button.dataset.id;
      const image = button.dataset.image;

      pendingItem = { id, name, price, image, quantity: 1 };
      document.getElementById("popupText").innerHTML = `
        Product: <strong>${name}</strong><br>
        Price: <strong>$${price}</strong><br><br>
        Do you want to add this product to the cart?
      `;
      document.getElementById("confirmationPopup").classList.remove("d-none");
      document.getElementById("popupBackdrop").classList.remove("d-none");
    });
  });
});


    // تاكيد
    document.getElementById("confirmAddBtn").addEventListener("click", function () {
      if (!pendingItem) return;

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existing = cart.find(p => p.id === pendingItem.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push(pendingItem);
      }
      localStorage.setItem("cart", JSON.stringify(cart));

      // انتقال للcart
      closePopup();
      window.location.href = "car.html";
    });
  

  //  إغلاق 
  function closePopup() {
    document.getElementById("confirmationPopup").classList.add("d-none");
    document.getElementById("popupBackdrop").classList.add("d-none");
  }





 const overlay = document.getElementById("offlineOverlay");
  const bodyContent = document.body;

  function checkConnection() {
    if (!navigator.onLine) {
      overlay.style.display = "flex";
      bodyContent.style.pointerEvents = "none";
      bodyContent.style.opacity = "0.5";
    } else {
      overlay.style.display = "none";
      bodyContent.style.pointerEvents = "auto";
      bodyContent.style.opacity = "1";
    }
  }

  window.addEventListener("load", checkConnection);
  window.addEventListener("online", checkConnection);
  window.addEventListener("offline", checkConnection);




  /// car 
   const cartItemsContainer = document.getElementById("cart-items");
    const totalItems = document.getElementById("total-items");
    const totalPrice = document.getElementById("total-price");
    const clearCartBtn = document.getElementById("clear-cart");
    const actionMessage = document.getElementById("actionMessage");
    const deletePopup = document.getElementById("deletePopup");
    const deleteBackdrop = document.getElementById("deleteBackdrop");
    const deleteText = document.getElementById("deleteText");
    let pendingDelete = false;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function renderCart() {
      cartItemsContainer.innerHTML = "";
      let itemsCount = 0;
      let priceTotal = 0;

      if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p class="empty-message"> There are no products in the cart right now  </p>`;
        totalItems.textContent = 0;
        totalPrice.textContent = "0.00";
        return;
      }

      cart.forEach((item, index) => {
        itemsCount += item.quantity;
        priceTotal += item.price * item.quantity;

        const itemEl = document.createElement("div");
        itemEl.classList.add("cart-item");
        itemEl.innerHTML = `
          <img src="${item.image}" alt="${item.name}" class="cart-img" />
          <div class="cart-details">
            <h4>${item.name}</h4>
            <p>$${item.price}</p>
            <input type="number" min="1" value="${item.quantity}" data-index="${index}" class="quantity-input" />
            <button class="remove-btn" data-index="${index}">delete</button>
          </div>
        `;
        cartItemsContainer.appendChild(itemEl);
      });

      totalItems.textContent = itemsCount;
      totalPrice.textContent = priceTotal.toFixed(2);
      attachEventListeners();
    }

    function showMessage(text, color = 'green') {
      actionMessage.textContent = text;
      actionMessage.style.color = color;
      actionMessage.style.display = 'block';
      setTimeout(() => actionMessage.style.display = 'none', 2000);
    }

   let itemToDeleteIndex = null;

function attachEventListeners() {
  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      const name = cart[index].name;

      // حفظ الفهرس مؤقتاً
      itemToDeleteIndex = index;

      // عرض النافذة المنبثقة
      document.getElementById("singleDeleteText").innerHTML = `❌ Are you sure you want to remove "<strong>${name}</strong>" from the cart?`;
      document.getElementById("singleDeletePopup").classList.remove("d-none");
      document.getElementById("singleDeleteBackdrop").classList.remove("d-none");
    });
  });
}

// ✅ زر "تأكيد الحذف"
document.getElementById("confirmSingleDeleteBtn").addEventListener("click", () => {
  if (itemToDeleteIndex !== null) {
    const name = cart[itemToDeleteIndex].name;
    cart.splice(itemToDeleteIndex, 1);
    updateCart();
    showMessage(`❌ "${name}" has been removed from the cart`, "red");

    itemToDeleteIndex = null;
    closeSingleDeletePopup();
  }
});


document.getElementById("confirmSingleDeleteBtn").addEventListener("click", () => {
  if (itemToDeleteIndex !== null) {
    const name = cart[itemToDeleteIndex].name;
    cart.splice(itemToDeleteIndex, 1);
    updateCart();
    showMessage(`❌ "${name}" has been removed from the cart`, "red");

    itemToDeleteIndex = null;
    closeSingleDeletePopup();
  }
});

function closeSingleDeletePopup() {
  document.getElementById("singleDeletePopup").classList.add("d-none");
  document.getElementById("singleDeleteBackdrop").classList.add("d-none");
}







// ✅ إغلاق النافذة
function closeSingleDeletePopup() {
  document.getElementById("singleDeletePopup").classList.add("d-none");
  document.getElementById("singleDeleteBackdrop").classList.add("d-none");
}


     document.querySelectorAll(".quantity-input").forEach(input => {
  input.addEventListener("change", (e) => {
    const index = e.target.getAttribute("data-index");
    let newQuantity = parseInt(e.target.value);
    if (newQuantity < 1) newQuantity = 1;
    cart[index].quantity = newQuantity;
    updateCart();
    showMessage(`✅ Quantity for "${cart[index].name}" updated to ${newQuantity}`);
  });
});

function updateCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// ✅ Replace confirm with a custom popup
clearCartBtn.addEventListener("click", () => {
  pendingDelete = true;
  deleteText.innerHTML = `🧹 Are you sure you want to <strong>clear the entire cart?</strong>`;
  deletePopup.style.display = 'block';
  deleteBackdrop.style.display = 'block';
});

// ✅ "Confirm" button
document.getElementById("confirmDeleteBtn").addEventListener("click", () => {
  if (pendingDelete) {
    cart = [];
    updateCart();
    showMessage("🧹 The cart has been cleared", "red");
  }
  closeDeletePopup();
});


    function closeDeletePopup() {
      deletePopup.style.display = 'none';
      deleteBackdrop.style.display = 'none';
      pendingDelete = false;
    }

    renderCart();
*/
// ✅ بيانات المنتجات// ✅ بيانات المنتجات
// بيانات المنتجات
// ✅ المنتجات
/*const products = {
  newArrival: [
    { id: "1", name: "Product One", price: 22, image: "assets/img/new-arive/item1.jpg" },
    { id: "2", name: "Product Two", price: 22, image: "assets/img/new-arive/item2.jpg" },
    { id: "3", name: "Product Three", price: 22, image: "assets/img/new-arive/item3.jpg" },
    { id: "4", name: "Product Four", price: 22, image: "assets/img/new-arive/item4.jpg" },
    { id: "5", name: "Product Five", price: 22, image: "assets/img/new-arive/item5.jpg" },
    { id: "6", name: "Product Six", price: 22, image: "assets/img/new-arive/item6.jpg" }
  ],
  bestSelling: [
    { id: "101", name: "Product A", price: 22, image: "assets/img/Best/item1.jpg" },
    { id: "102", name: "Product B", price: 22, image: "assets/img/Best/item10.jpg" },
    { id: "103", name: "Product C", price: 22, image: "assets/img/Best/item7.jpg" },
    { id: "104", name: "Product D", price: 22, image: "assets/img/Best/item9.jpg" },
    { id: "105", name: "Product E", price: 22, image: "assets/img/new-arive/item5.jpg" },
    { id: "106", name: "Product F", price: 22, image: "assets/img/new-arive/item6.jpg" }
  ]
};

// ✅ إنشاء الكروت
function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card";

  const img = document.createElement("img");
  img.src = product.image;

  const infoBox = document.createElement("div");
  infoBox.className = "product-box-inside";

  const addBtn = document.createElement("button");
  addBtn.className = "add-to-cart";
  addBtn.innerHTML = `Add To Cart <i class="fa-solid fa-arrow-right"></i>`;
  addBtn.dataset.id = product.id;
  addBtn.dataset.name = product.name;
  addBtn.dataset.price = product.price;
  addBtn.dataset.image = product.image;

  const removeIcon = document.createElement("i");
  removeIcon.className = "fa-solid fa-xmark";

  const heartIcon = document.createElement("i");
  heartIcon.className = "fa-solid fa-heart";

  infoBox.appendChild(addBtn);
  infoBox.appendChild(removeIcon);
  infoBox.appendChild(heartIcon);

  card.appendChild(img);
  card.appendChild(infoBox);

  return card;
}

// ✅ عرض المنتجات داخل سلايدر
function renderSwiperSection(selector, productList) {
  const container = document.querySelector(selector + " .swiper-wrapper");
  if (!container) return;
  container.innerHTML = "";

  productList.forEach(product => {
    const slide = document.createElement("div");
    slide.className = "swiper-slide";
    slide.appendChild(createProductCard(product));
    container.appendChild(slide);
  });
  setupAddToCart();
}

// ✅ تفعيل زر الإضافة
function setupAddToCart() {
  const buttons = document.querySelectorAll(".add-to-cart");
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const id = button.dataset.id;
      const name = button.dataset.name;
      const price = parseFloat(button.dataset.price);
      const image = button.dataset.image;

      const newItem = { id, name, price, image, quantity: 1 };
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      const existingItem = cart.find(item => item.id === id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push(newItem);
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      window.location.href = "car.html";
    });
  });
}

// ✅ التحقق من الاتصال
function checkConnection() {
  const overlay = document.getElementById("offlineOverlay");
  if (navigator.onLine) {
    overlay.style.display = "none";
  } else {
    overlay.style.display = "flex";
  }
}

// ✅ تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
  renderSwiperSection(".new-arrival-swiper", products.newArrival);
  renderSwiperSection(".best-selling-swiper", products.bestSelling);

  new Swiper(".new-arrival-swiper", {
    slidesPerView: 4,
    spaceBetween: 20,
    loop: true,
    autoplay: { delay: 2000 },
    breakpoints: {
      0: { slidesPerView: 1.2 },
      576: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      992: { slidesPerView: 4 }
    }
  });

  new Swiper(".best-selling-swiper", {
    slidesPerView: 4,
    spaceBetween: 20,
    loop: true,
    autoplay: { delay: 2000 },
    breakpoints: {
      0: { slidesPerView: 1.2 },
      576: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      992: { slidesPerView: 4 }
    }
  });
});






    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function renderCart() {
      cartItemsContainer.innerHTML = "";
      let itemsCount = 0;
      let priceTotal = 0;

      if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p class="empty-message"> There are no products in the cart right now  </p>`;
        totalItems.textContent = 0;
        totalPrice.textContent = "0.00";
        return;
      }

      cart.forEach((item, index) => {
        itemsCount += item.quantity;
        priceTotal += item.price * item.quantity;

        const itemEl = document.createElement("div");
        itemEl.classList.add("cart-item");
        itemEl.innerHTML = `
          <img src="${item.image}" alt="${item.name}" class="cart-img" />
          <div class="cart-details">
            <h4>${item.name}</h4>
            <p>$${item.price}</p>
            <input type="number" min="1" value="${item.quantity}" data-index="${index}" class="quantity-input" />
            <button class="remove-btn" data-index="${index}">delete</button>
          </div>
        `;
        cartItemsContainer.appendChild(itemEl);
      });

      totalItems.textContent = itemsCount;
      totalPrice.textContent = priceTotal.toFixed(2);
      attachEventListeners();
    }

    function showMessage(text, color = 'green') {
      actionMessage.textContent = text;
      actionMessage.style.color = color;
      actionMessage.style.display = 'block';
      setTimeout(() => actionMessage.style.display = 'none', 2000);
    }

   let itemToDeleteIndex = null;

function attachEventListeners() {
  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      const name = cart[index].name;

      // حفظ الفهرس مؤقتاً
      itemToDeleteIndex = index;

      // عرض النافذة المنبثقة
      document.getElementById("singleDeleteText").innerHTML = `❌ Are you sure you want to remove "<strong>${name}</strong>" from the cart?`;
      document.getElementById("singleDeletePopup").classList.remove("d-none");
      document.getElementById("singleDeleteBackdrop").classList.remove("d-none");
    });
  });
}

// ✅ زر "تأكيد الحذف"
document.getElementById("confirmSingleDeleteBtn").addEventListener("click", () => {
  if (itemToDeleteIndex !== null) {
    const name = cart[itemToDeleteIndex].name;
    cart.splice(itemToDeleteIndex, 1);
    updateCart();
    showMessage(`❌ "${name}" has been removed from the cart`, "red");

    itemToDeleteIndex = null;
    closeSingleDeletePopup();
  }
});


document.getElementById("confirmSingleDeleteBtn").addEventListener("click", () => {
  if (itemToDeleteIndex !== null) {
    const name = cart[itemToDeleteIndex].name;
    cart.splice(itemToDeleteIndex, 1);
    updateCart();
    showMessage(`❌ "${name}" has been removed from the cart`, "red");

    itemToDeleteIndex = null;
    closeSingleDeletePopup();
  }
});

function closeSingleDeletePopup() {
  document.getElementById("singleDeletePopup").classList.add("d-none");
  document.getElementById("singleDeleteBackdrop").classList.add("d-none");
}







// ✅ إغلاق النافذة
function closeSingleDeletePopup() {
  document.getElementById("singleDeletePopup").classList.add("d-none");
  document.getElementById("singleDeleteBackdrop").classList.add("d-none");
}


     document.querySelectorAll(".quantity-input").forEach(input => {
  input.addEventListener("change", (e) => {
    const index = e.target.getAttribute("data-index");
    let newQuantity = parseInt(e.target.value);
    if (newQuantity < 1) newQuantity = 1;
    cart[index].quantity = newQuantity;
    updateCart();
    showMessage(`✅ Quantity for "${cart[index].name}" updated to ${newQuantity}`);
  });
});

function updateCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// ✅ Replace confirm with a custom popup
clearCartBtn.addEventListener("click", () => {
  pendingDelete = true;
  deleteText.innerHTML = `🧹 Are you sure you want to <strong>clear the entire cart?</strong>`;
  deletePopup.style.display = 'block';
  deleteBackdrop.style.display = 'block';
});

// ✅ "Confirm" button
document.getElementById("confirmDeleteBtn").addEventListener("click", () => {
  if (pendingDelete) {
    cart = [];
    updateCart();
    showMessage("🧹 The cart has been cleared", "red");
  }
  closeDeletePopup();
});


    function closeDeletePopup() {
      deletePopup.style.display = 'none';
      deleteBackdrop.style.display = 'none';
      pendingDelete = false;
    }

    renderCart();











window.addEventListener("load", checkConnection);
window.addEventListener("online", checkConnection);
window.addEventListener("offline", checkConnection);




document.addEventListener("DOMContentLoaded", () => {
  const products = [
    {
      id: 1,
      name: "Product One",
      price: 22.00,
      image: "assets/img/new-arive/item1.jpg"
    },
    {
      id: 2,
      name: "Product Two",
      price: 30.00,
      image: "assets/img/new-arive/item2.jpg"
    },
    {
      id: 3,
      name: "Product Three",
      price: 40.00,
      image: "assets/img/new-arive/item3.jpg"
    }
  ];

  const container = document.getElementById("carouselInner");
  if (!container) return;

  products.forEach(product => {
    const item = document.createElement("div");
    item.className = "product-card col-md-4 mb-4";
    item.innerHTML = `
      <div class="card h-100 text-center">
        <img src="${product.image}" class="card-img-top" alt="${product.name}">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">$${product.price.toFixed(2)}</p>
          <button class="btn btn-primary add-to-cart"
            data-id="${product.id}"
            data-name="${product.name}"
            data-price="${product.price}"
            data-image="${product.image}">
            Add to Cart
          </button>
        </div>
      </div>
    `;
    container.appendChild(item);
  });
});
*/ 
const products = {
  newArrival: [
    { id: "1", name: "Product One", price: 22, image: "assets/img/new-arive/item1.jpg" },
    { id: "2", name: "Product Two", price: 22, image: "assets/img/new-arive/item2.jpg" },
    { id: "3", name: "Product Three", price: 22, image: "assets/img/new-arive/item3.jpg" },
    { id: "4", name: "Product Four", price: 22, image: "assets/img/new-arive/item4.jpg" },
    { id: "5", name: "Product Five", price: 22, image: "assets/img/new-arive/item5.jpg" },
    { id: "6", name: "Product Six", price: 22, image: "assets/img/new-arive/item6.jpg" }
  ],
  bestSelling: [
    { id: "101", name: "Product A", price: 22, image: "assets/img/Best/item1.jpg" },
    { id: "102", name: "Product B", price: 22, image: "assets/img/Best/item10.jpg" },
    { id: "103", name: "Product C", price: 22, image: "assets/img/Best/item7.jpg" },
    { id: "104", name: "Product D", price: 22, image: "assets/img/Best/item9.jpg" },
    { id: "105", name: "Product E", price: 22, image: "assets/img/new-arive/item5.jpg" },
    { id: "106", name: "Product F", price: 22, image: "assets/img/new-arive/item6.jpg" }
  ]
};
// ✅ متغيرات عامة
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let pendingItem = null;
let itemToDeleteId = null;

// ✅ إنشاء بطاقة منتج ديناميكيًا
function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card";

  const img = document.createElement("img");
  img.src = product.image;

  const infoBox = document.createElement("div");
  infoBox.className = "product-box-inside";

  const addBtn = document.createElement("button");
  addBtn.className = "add-to-cart";
  addBtn.innerHTML = `Add To Cart <i class="fa-solid fa-arrow-right"></i>`;
  addBtn.dataset.id = product.id;
  addBtn.dataset.name = product.name;
  addBtn.dataset.price = product.price;
  addBtn.dataset.image = product.image;

  const removeIcon = document.createElement("i");
  removeIcon.className = "fa-solid fa-xmark";
  const heartIcon = document.createElement("i");
  heartIcon.className = "fa-solid fa-heart";

  infoBox.appendChild(addBtn);
  infoBox.appendChild(removeIcon);
  infoBox.appendChild(heartIcon);

  card.appendChild(img);
  card.appendChild(infoBox);

  return card;
}

// ✅ عرض المنتجات في Swiper
function renderSwiperSection(selector, productList) {
  const container = document.querySelector(selector + " .swiper-wrapper");
  if (!container) return;
  container.innerHTML = "";

  productList.forEach(product => {
    const slide = document.createElement("div");
    slide.className = "swiper-slide";
    slide.appendChild(createProductCard(product));
    container.appendChild(slide);
  });
  setupAddToCart();
}

// ✅ إعداد زر الإضافة
function setupAddToCart() {
  const buttons = document.querySelectorAll(".add-to-cart");
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const { id, name, price, image } = button.dataset;
      pendingItem = { id, name, price: parseFloat(price), image, quantity: 1 };
      document.getElementById("popupText").innerHTML = `Product: <strong>${name}</strong><br>Price: <strong>$${price}</strong><br><br>Do you want to add this product to the cart?`;
      document.getElementById("confirmationPopup").classList.remove("d-none");
      document.getElementById("popupBackdrop").classList.remove("d-none");
    });
  });
}

function confirmAddToCart() {
  if (!pendingItem) return;
  const existing = cart.find(p => p.id === pendingItem.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push(pendingItem);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  closePopup();
  window.location.href = "car.html";
}

function closePopup() {
  document.getElementById("confirmationPopup")?.classList.add("d-none");
  document.getElementById("popupBackdrop")?.classList.add("d-none");
}
new Swiper(".mySwiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    576: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 3,
    }
  }
});

// ✅ عرض السلة في car.html
function renderCart() {
  const container = document.getElementById("cart-items");
  const totalItemsSpan = document.getElementById("total-items");
  const totalPriceSpan = document.getElementById("total-price");

  if (!container || !totalItemsSpan || !totalPriceSpan) return;
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<p class='text-center'>🛒 Cart is empty</p>";
    totalItemsSpan.textContent = "0";
    totalPriceSpan.textContent = "0.00";
    return;
  }

  let totalItems = 0;
  let totalPrice = 0;

  cart.forEach(item => {
    totalItems += parseInt(item.quantity);
    totalPrice += item.price * item.quantity;

    const div = document.createElement("div");
    div.className = "cart-item border p-3 mb-3 rounded";
    div.innerHTML = `
      <div class="row align-items-center">
        <div class="col-md-2">
          <img src="${item.image}" alt="${item.name}" class="img-fluid rounded" />
        </div>
        <div class="col-md-4">
          <h5>${item.name}</h5>
          <p>Price: $${item.price}</p>
        </div>
        <div class="col-md-3">
          <label>Quantity:</label>
          <input type="number" min="1" value="${item.quantity}" data-id="${item.id}" class="form-control quantity-input" />
        </div>
        <div class="col-md-3 text-end">
          <button class="btn btn-danger btn-sm delete-btn" data-id="${item.id}">🗑️ Delete</button>
        </div>
      </div>
    `;
    container.appendChild(div);
  });

  totalItemsSpan.textContent = totalItems;
  totalPriceSpan.textContent = totalPrice.toFixed(2);

  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      itemToDeleteId = btn.dataset.id;
      showPopup("هل أنت متأكد أنك تريد حذف هذا المنتج؟");
    });
  });

  document.querySelectorAll(".quantity-input").forEach(input => {
    input.addEventListener("change", e => {
      const id = e.target.dataset.id;
      const newQty = parseInt(e.target.value);
      if (newQty < 1) return;
      const targetItem = cart.find(p => p.id === id);
      if (targetItem) {
        targetItem.quantity = newQty;
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      }
    });
  });
}

function deleteItemById(id) {
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function clearCart() {
  cart = [];
  localStorage.removeItem("cart");
  renderCart();
}

function showPopup(message) {
  document.getElementById("popupContent").innerHTML = `<p>${message}</p>`;
  document.getElementById("confirmationPopup").classList.remove("d-none");
  document.getElementById("popupBackdrop").classList.remove("d-none");
}

// ✅ تأكيد الطلب من صفحة checkout
function setupCheckout() {
  const form = document.getElementById("checkout-form");
  const summary = document.getElementById("order-summary");
  const message = document.getElementById("order-message");

  if (!form || !summary || !message) return;

  if (cart.length === 0) {
    summary.innerHTML = `
      <div class="text-center">
        <i class="fa-solid fa-cart-shopping fa-3x text-muted"></i>
        <p class="mt-3 text-danger fw-bold">⚠️ السلة فارغة، لا يمكنك متابعة الطلب.</p>
      </div>`;
    form.classList.add("d-none");
    return;
  }

  summary.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
    summary.innerHTML += `
      <div class="d-flex justify-content-between border-bottom py-2 align-items-center">
        <div class="d-flex align-items-center gap-3">
          <img src="${item.image}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 6px;">
          <div>
            <strong>${item.name}</strong><br>
            <small>× ${item.quantity}</small>
          </div>
        </div>
        <div>$${(item.price * item.quantity).toFixed(2)}</div>
      </div>`;
  });

  summary.innerHTML += `
    <div class="d-flex justify-content-between fw-bold pt-3">
      <div>Total:</div>
      <div>$${total.toFixed(2)}</div>
    </div>`;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const address = document.getElementById("address").value.trim();
    const email = document.getElementById("email").value.trim();
    const card = document.getElementById("card").value.trim();

    if (!name || !address || !email || !card) {
      message.className = "alert alert-danger text-center";
      message.textContent = "⚠️ الرجاء تعبئة جميع الحقول.";
      message.classList.remove("d-none");
      return;
    }

    // ✅ إظهار رسالة تأكيد و إعادة توجيه
    message.className = "alert alert-success text-center";
    message.textContent = "✅ تم تنفيذ الطلب بنجاح! سيتم تحويلك للصفحة الرئيسية...";
    message.classList.remove("d-none");

    localStorage.removeItem("cart");
    cart = [];
    form.reset();

    setTimeout(() => {
      window.location.href = "index.html";
    }, 3000);
  });
}

// ✅ تحميل الصفحة
window.addEventListener("DOMContentLoaded", () => {
  renderSwiperSection(".new-arrival-swiper", products.newArrival);
  renderSwiperSection(".best-selling-swiper", products.bestSelling);
  renderCart();
  setupCheckout();
  checkConnection();
  const confirmBtn = document.getElementById("confirmAddBtn");
  if (confirmBtn) confirmBtn.addEventListener("click", confirmAddToCart);
});


document.getElementById("confirmDeleteBtn")?.addEventListener("click", () => {
  if (itemToDeleteId === "clear") clearCart();
  else if (itemToDeleteId) deleteItemById(itemToDeleteId);
  closePopup();
  itemToDeleteId = null;
});

document.getElementById("clear-cart")?.addEventListener("click", () => {
  itemToDeleteId = "clear";
  showPopup("هل تريد مسح كل محتويات السلة؟");
});

function checkConnection() {
  const overlay = document.getElementById("offlineOverlay");
  if (!overlay) return;
  overlay.style.display = navigator.onLine ? "none" : "flex";
}

window.addEventListener("online", checkConnection);
window.addEventListener("offline", checkConnection);   