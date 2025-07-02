// assets/js/data.js
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
  },
  {
    id: 4,
    name: "Product Four",
    price: 25.00,
    image: "assets/img/new-arive/item4.jpg"
  }
];
//
// assets/js/render-carousel.js

document.addEventListener("DOMContentLoaded", () => {
  const carouselInner = document.getElementById("carouselInner");
  if (!carouselInner || !products.length) return;

  products.forEach((product, index) => {
    const isActive = index === 0 ? "active" : "";

    const item = document.createElement("div");
    item.className = `carousel-item ${isActive}`;
    item.innerHTML = `
      <div class="product-card text-center">
        <img src="${product.image}" class="img-fluid" alt="${product.name}" />
        <div class="product-overlay">
          <button class="btn btn-outline-light add-to-cart"
            data-id="${product.id}"
            data-name="${product.name}"
            data-price="${product.price}"
            data-image="${product.image}">
            Add to Cart
          </button>
        </div>
        <div class="cart-button mt-3">
          <h6>${product.name}</h6>
          <h6>$${product.price}</h6>
        </div>
      </div>
    `;
    carouselInner.appendChild(item);
  });
});
