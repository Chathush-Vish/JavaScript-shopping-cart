let cartOpen = document.getElementById("cart-open");
let cartClose = document.getElementById("cart-close");
let cartContainer = document.querySelector(".cart-container");
let productArea = document.querySelector(".product-container");
let addCartBtn = document.querySelectorAll(".add-cart");
let cartProductArea = document.querySelector(".cart-product-area");
let cartDot = document.querySelector(".cart-dot");

const products = [
   {
      id: 1,
      name: "Blue",
      price: 34,
      img: "./src/n1.jpg",
   },
   {
      id: 2,
      name: "Grey",
      price: 19,
      img: "./src/n2.jpg",
   },
   {
      id: 3,
      name: "Brown",
      price: 23,
      img: "./src/n4.jpg",
   },
]; //product details
let cart = []; //cart details

//cart button working (toggle showing)
function cartDisplay() {
   cartContainer.style.display = "flex";
}
function cartHide() {
   cartContainer.style.display = "none";
}
cartOpen.addEventListener("click", cartDisplay);
cartClose.addEventListener("click", cartHide);

// showing dot in cart link
function showDot() {
   if (cart.length > 0) {
      cartDot.style.display = "block";
   } else if (cart.length === 0) {
      cartDot.style.display = "none";
   }
}

//display products in homepage
function displayProducts() {
   productArea.innerHTML = products
      .map((x) => {
         return `
         <div class="product " id=${x.id}>
            <img src="${x.img}" width="250" alt="" />
            <div>
               <p class="product-name">${x.name}</p>
               <p class="product-price">$ ${x.price}</p>
            </div>
            <button class="add-cart add-btn-text" id="add-cart"  onclick="addToCart(${x.id})">Add Cart</button>
         </div>`;
      })
      .join("");
}

function changeInnerText(id) {
   let addButton = document.querySelector(`.add-cart[id="${id}"]`);
   if (addButton) {
      addButton.textContent = "Added";
      console.log("ffs");
   }
}

//add to cart button working
function addToCart(id) {
   let search = cart.find((x) => x.id === id);
   if (search === undefined) {
      cart.push({
         id: id,
         item: 1,
      });
   } else {
      return;
   }
   generateCart();
   changeInnerText(id);
}

//display products in cart
function generateCart() {
   if (cart.length != 0) {
      cartProductArea.innerHTML = cart
         .map((x) => {
            let product = products.find((p) => p.id === x.id);
            return `
         <div class="cart-product" id=${x.id}>
         <img src="${product.img}" width="100" alt="" />
         <div class="details">
         <div class="name-price">
         <p>${product.name}</p>
         <p>$ ${x.item * product.price}</p>
                     </div>
                     <div class="amount">
                     <i><bi class="bi bi-dash" id="minus" onclick="minusItem(${
                        x.id
                     })"></bi></i>
                     <p class="qty">${x.item}</p>
                     <i><bi class="bi bi-plus" id="full" onclick="plusItem(${
                        x.id
                     })"></bi></i>
                     </div>
                     <button class="remove-cart" onclick="removeFromCart(${
                        x.id
                     })">Remove</button>
                     </div>
                     </div>
                     `;
         })
         .join("");
   } else {
      cartProductArea.innerHTML = `
      <div class="empty-show">
      <p>Cart is Empty!</p>
      </div>`;
   }
   showDot();
   totalGenerate();
}

//quantity increment
function plusItem(id) {
   let search = cart.find((x) => x.id === id);
   if (search.item >= 10) {
      return;
   } else {
      search.item++;
      generateCart();
   }
}

//quantity decrement
function minusItem(id) {
   let search = cart.find((x) => x.id === id);
   if (search.item <= 1) {
      return;
   } else {
      search.item--;
      generateCart();
   }
}

//cart item removing
function removeFromCart(id) {
   cart = cart.filter((x) => x.id !== id);
   generateCart();
}

//clear cart btn
function clearCart() {
   cart = [];
   generateCart();
}

let totalDisplay = document.querySelector(".total-price");

//total price displaying
function totalGenerate() {
   if (cart.length != 0) {
      let totalPrice = cart
         .map((x) => {
            let { id, item } = x;
            let search = products.find((x) => x.id === id) || [];
            return item * search.price;
         })
         .reduce((a, b) => a + b, 0);
      totalDisplay.innerHTML = `
      <p>Total : $ ${totalPrice}</p>
      `;
   } else {
      totalDisplay.innerHTML = `<p>Total : $0</p>`;
   }
}

displayProducts();
changeInnerText();
generateCart();
totalGenerate();
