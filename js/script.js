let cart = document.querySelector(".cart");
let cartCount = document.querySelector(".cart-count");
let cartItems = document.querySelector(".cart-items");
let addToCartBtns = document.querySelectorAll(".add-to-cart-btn");

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
}
