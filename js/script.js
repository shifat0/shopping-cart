let cartCount = document.querySelector(".cart-count");
let cartItems = document.querySelector("#cart-items");
let addToCartBtns = document.querySelectorAll(".add-to-cart-btn");
let clearCart = document.querySelector(".clear-cart");
let cartTotal = document.querySelector(".cart-total");

document.addEventListener("DOMContentLoaded", getFromStore);
cartItems.addEventListener("click", removeFromStore);
clearCart.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});

addToCartBtns.forEach((addToCartBtn) =>
  addToCartBtn.addEventListener("click", (e) => {
    let productPrice = addToCartBtn.parentNode
      .querySelector(".product-price")
      .textContent.split(" ")[0];
    let productName =
      addToCartBtn.parentNode.parentNode.querySelector(
        ".product-name"
      ).textContent;
    addToStore(productName, productPrice, e.target.dataset.id);
  })
);

function store() {
  let cartProducts;
  if (localStorage.getItem("cart") === null) cartProducts = {};
  else cartProducts = JSON.parse(localStorage.getItem("cart"));
  return cartProducts;
}

function addToStore(name, price, id) {
  let cartProducts = store();

  // if (cartProducts) {
  //   cartProducts.map((product, i) => {
  //     pName = cartProducts[i].productName;
  //     if (product.productName === name) {
  //       cartProducts[i].quantity++;
  //     }
  //   });
  // }

  if (id in cartProducts) {
    cartProducts[id].quantity++;
  } else {
    let cart = {
      productName: name,
      productPrice: price,
      quantity: 1,
    };
    cartProducts[id] = cart;
  }

  // cartProducts.push({
  //   productName: name,
  //   productPrice: price,
  //   quantity: quantity,
  // });

  localStorage.setItem("cart", JSON.stringify(cartProducts));
  location.reload();
}

function getFromStore() {
  let cartProducts = store();
  let count = 0;
  let total = 0;

  // cartProducts.map((product) => {
  //   cartItems.innerHTML += `
  //   <li style="display: flex; align-items: center; justify-content: space-between">
  //   ${product.productName}, Price: ${product.productPrice}, Quantity: ${product.quantity}
  //   <button style="background-color: red; color: white;">X</button>
  //   </li>`;
  // });

  for (let p in cartProducts) {
    let product = cartProducts[p];
    cartCount.innerHTML = `Product Count: ${(count += product.quantity)}`;
    cartTotal.innerHTML = `Total Price: ${(total +=
      +product.productPrice * product.quantity)} BDT`;
    cartItems.innerHTML += `
     <li style="display: flex; align-items: center; justify-content: space-between">
     ${product.productName}, Price: ${product.productPrice}, Quantity: ${product.quantity}
     <button style="background-color: red; color: white;">X</button>
     </li>`;
  }
}

function removeFromStore(e) {
  if (e.target.tagName === "BUTTON") {
    if (confirm("Are you want to delete this product?")) {
      let product = e.target.parentElement;
      product.remove();
      product.removeChild(product.children[0]);

      let cartProducts = store();

      // console.log(cartProducts);
      for (let p in cartProducts) {
        if (
          cartProducts[p].productName ===
          product.textContent.split(",")[0].trim()
        )
          delete cartProducts[p];
      }

      // Object.values(cartProducts).map((p, i) => {
      //   if (product.textContent.split(",")[0].trim() === p.productName.trim())
      //     cartProducts.splice(i, 1);
      // });

      localStorage.setItem("cart", JSON.stringify(cartProducts));
      location.reload();
    }
  }
}
