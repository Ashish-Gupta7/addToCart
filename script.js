let showCartBtn = document.querySelector("#main #home #header .show-cart-btn");
let showCart = document.querySelector("#main #show-cart");
let closeShowCart = document.querySelector("#main #show-cart #nav #right i");
let home = document.querySelector("#main #home");
let homepage = document.querySelector("#main #home #homepage");
let items = document.querySelector("#main #home #homepage .items");
let addedCarts = document.querySelector("#main #show-cart .added-carts");
let cartNum = document.querySelector("#main #home #header .show-cart-btn #cartNum h4");
let totalNum = document.querySelector("#main #show-cart #nav #right h4:nth-child(2)");
let addedCartIsEmpty = document.querySelector("#main #show-cart .addedCartIsEmpty");
let itemList = [];
let itemCart = [];

function showCartButton() {
    showCartBtn.addEventListener("click", function () {
        gsap.to(showCart, {
            top: 0,
            duration: .8,
        });
        gsap.to(showCart, {
            delay: .4,
            filter: "drop-shadow(0 400px 70px rgba(8, 8, 8, 0.919))"
        });
    });
    closeShowCart.addEventListener("click", function () {
        gsap.to(showCart, {
            top: "-100%",
            duration: 1.5,
        });
    });
};
showCartButton();

const addDataToHtml = () => {
    items.innerHTML = "";
    if (itemList.length > 0) {
        itemList.forEach(fruit => {
            let newFruit = document.createElement("div");
            newFruit.dataset.id = fruit.id;
            items.appendChild(newFruit);
            newFruit.classList.add("item");
            newFruit.innerHTML = `
            <div class="img-box">
                <img src="${fruit.image}"
                alt="">
            </div>
            <div class="pricing">
                <div class="name">${fruit.name}</div>
                <h4>${fruit.price}</h4>
            </div>
            <div class="quantity">
                <h4>Quantity</h4>
                <div class="num">1</div>
            </div>
            <div class="add-button">
                <div class="addRem btn" id="${fruit.id}">Add to cart</div>
            </div>
            `;
        })
    }
};

items.addEventListener("click", (elm) => {
    let positionClick = elm.target;
    if(positionClick.classList.contains("btn")){
        let fruit_id = positionClick.parentElement.parentElement.dataset.id;
        addToCart(fruit_id);
    };
});

const addToCart = (mainElm) => {
    let thisFruitInCart = itemCart.findIndex((elm) => elm.mainElm == mainElm)
    if(itemCart.length <= 0){
        itemCart = [{
            mainElm: mainElm,
            quantity: 1
        }];
    } else if(thisFruitInCart < 0){
        itemCart.push({
            mainElm: mainElm,
            quantity:1
        });
    } else{
        itemCart[thisFruitInCart].quantity = itemCart[thisFruitInCart].quantity + 1;
    }
    // console.log(itemCart);
    addCartToHTML();
};


const addCartToHTML = () => {
    addedCarts.innerHTML = "";
    let totalQuantity = 0;
    let totalAddedCartPrice = 0;
    if(itemCart.length > 0){
        itemCart.forEach((elm) => {
            // console.log(elm);
            totalQuantity = totalQuantity + elm.quantity;
            let newCart = document.createElement("div");
            newCart.classList.add('item', 'addedItem', 'addedItem1');
            newCart.dataset.id = elm.mainElm;
            let fruitPosition = itemList.findIndex((inner) => inner.id == elm.mainElm);
            let fruitInfo = itemList[fruitPosition];
            totalAddedCartPrice = totalAddedCartPrice + fruitInfo.price * elm.quantity;
            addedCarts.appendChild(newCart);
            newCart.innerHTML = `
            <img src="${fruitInfo.image}"
            alt="">
            <div class="details">
            <div class="name">
                <h3>${fruitInfo.name}</h3>
                <h3 class="price">Price = <span>${fruitInfo.price * elm.quantity}</span> INR</h3>
            </div>
            <div class="quantity">
                <h3>Quantity</h3>
                <div class="num">
                    <i class="minus ri-skip-left-fill"></i>
                    <h3>${elm.quantity}</h3>
                    <i class="plus ri-skip-right-fill"></i>
                </div>
                </div>
                <div id="button">
                    <div class="addRem placeOrder">Place Order</div>
                    <div class="addRem remove">Remove</div>
                </div>
            </div>
            `
        })
    }

    let totalINR = () => {
        let count = 0;
        if(totalQuantity < 10){
            count = `00${totalQuantity}`;
        } else if(totalQuantity < 100){
            count = `0${totalQuantity}`
        } else if(totalQuantity >= 1000){
            count = alert("Please add less items. This cart is overloaded, please clear it.");
        } else{
            count = totalQuantity;
        }
        if(count === undefined){
            cartNum.innerText = totalQuantity;
        } else{
            cartNum.innerText = count;
        }
        totalNum.innerText = totalAddedCartPrice + " INR";
    };
    totalINR();
};

addedCarts.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
        let mainElm = positionClick.parentElement.parentElement.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if (positionClick.classList.contains('plus')) {
            type = 'plus';
        }
        changeQuantity(mainElm, type);
        // console.log(mainElm);
    }
});


// addedCarts.addEventListener("click", (event) => {
//     let placeBtn = event.target;
//     console.log(placeBtn);
//     if(placeBtn.classList.contains("placeOrder")){
//         // let placeOrder = placeBtn.parentElement.parentElement.parentElement.childNode.classList.contains("price");
//         // console.log(placeOrder);
//         // let fruitOrder = document.querySelector(".added-carts .item .name h3:first-child").textContent;

//         btn = placeBtn.parentElement.parentElement.parentElement.dataset.id;
//         // alert(`Pahle ${placeOrder.innerText} INR nikal phir khana ${fruitOrder} 🤣🤣🤣`);
//     } 
//     placeCartOrder(btn);
// });


// let placeCartOrder = (btn) => {
//     // console.log(price);
//     console.log(btn);

//     if(addedCarts){
//         let dataOrder = document.querySelectorAll('.added-cart .item');
//         console.log(dataOrder);
//     }

//     // if(itemCart.length > 0){7
//     //     itemCart.forEach((elm) => {
//     //         if(elm.mainElm == btn){
//     //             let cartOrder = elm;
//     //             console.log(cartOrder);
//     //             console.log(addedCarts);
//     //             let infoOrder = elm.mainElm == btn;
//     //             console.log(infoOrder);
//     //             // console.log(infoOrder.price);            
//     //             // console.log(btn);
//     //         }
//     //     })
//     // }
// }

const changeQuantity = (mainElm, type) => {
    let fruitItemInCart = itemCart.findIndex((elm) => elm.mainElm == mainElm);
    console.log(fruitItemInCart);
    if ((fruitItemInCart + 1) >= 0) {
        let info = itemCart[fruitItemInCart];
        console.log(info);
        switch (type) {
            case 'plus':
                itemCart[fruitItemInCart].quantity = itemCart[fruitItemInCart].quantity + 1;
                break;

            default:
                let minusQuantity = itemCart[fruitItemInCart].quantity - 1;
                if (minusQuantity > 0) {
                    itemCart[fruitItemInCart].quantity = minusQuantity;
                } else {
                    itemCart.splice(fruitItemInCart, 1);
                }
                break;
        }
    }
    addCartToHTML();
};

if(addedCartIsEmpty.innerText == ""){
    let h1Content = document.createElement("h1");
    addedCartIsEmpty.appendChild(h1Content);
    h1Content.innerText = "Your Cart is Empty, Add some Fruits.";
};

const fruitItem = async () => {
    try {
        const response = await fetch("fruitItem.json");
        const data = await response.json();
        itemList = data;
        addDataToHtml();

    }
    catch(err) {
        console.error("Error hai", err);
    }
};
fruitItem();