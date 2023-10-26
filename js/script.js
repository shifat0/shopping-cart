let cart = document.querySelector(".cart");
let cartCount = document.querySelector(".cart-count");
let cartItems = document.querySelector("#cart-items");
let addToCartBtns = document.querySelectorAll(".add-to-cart-btn");

document.addEventListener("DOMContentLoaded", getFromStore);
cartItems.addEventListener("click", removeFromStore);

addToCartBtns.forEach((addToCartBtn) =>
  addToCartBtn.addEventListener("click", () => {
    let productPrice = addToCartBtn.parentNode
      .querySelector(".product-price")
      .textContent.split(" ")[0];
    let productName =
      addToCartBtn.parentNode.parentNode.querySelector(
        ".product-name"
      ).textContent;
    addToStore(productName, productPrice);
  })
);

function store() {
  let cartProducts;
  if (localStorage.getItem("cart") === null) cartProducts = [];
  else cartProducts = JSON.parse(localStorage.getItem("cart"));
  return cartProducts;
}

function addToStore(name, price) {
  let cartProducts = store();
  cartProducts.push({
    productName: name,
    productPrice: price,
  });

  localStorage.setItem("cart", JSON.stringify(cartProducts));
  location.reload();
}

function getFromStore() {
  let cartProducts = store();
  let count = cartProducts.length;
  cartCount.innerHTML = `Product Count: ${count}`;

  cartProducts.map((product) => {
    cartItems.innerHTML += `
    <li style="display: flex; align-items: center; justify-content: space-between">
    ${product.productName}, Price: ${product.productPrice}
    <button style="background-color: red; color: white;">X</button>
    </li>`;
  });
}

function removeFromStore(e) {
  if (e.target.tagName === "BUTTON") {
    if (confirm("Are you want to delete this product?")) {
      let product = e.target.parentElement;
      product.remove();
      product.removeChild(product.children[0]);

      let cartProducts = store();

      cartProducts.map((p, i) => {
        if (product.textContent.split(",")[0].trim() === p.productName.trim())
          cartProducts.splice(i, 1);
      });
      localStorage.setItem("cart", JSON.stringify(cartProducts));
      location.reload();
    }
  }
}
