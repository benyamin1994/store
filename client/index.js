var user = { userId: 5675 };

var userCarts;

function getProducts() {
    DOM.List.innerHTML = "";
    $.ajax({
        url: "http://localhost/store/api/index.php",
        method: "GET",
        success: function (res) {
            draw(JSON.parse(res));
        },
        error: function (res) {
            alert(JSON.stringify(res));
        }

    })
}

function addToCart(_id) {
    var _amount = document.getElementsByName(`amountOf${_id}`)[0].value;
    $.ajax({
        url: "http://localhost/store/api/index.php?controller=cart&action=add_product",
        method: "POST",
        data: { id: _id, cartId: user.cartId, amount: _amount },
        success: function (res) {
            console.log(res);
        },
        error: function (res) {

        }

    })
    document.getElementsByName(`amountOf${_id}`)[0].value = "1";
}

function getCart(_id) {
    $.ajax({
        url: "http://localhost/store/api/index.php?controller=cart&action=get_cart&userId=" + user.userId,
        method: "GET",

        success: function (res) {
            user.cartId = JSON.parse(res).id; //the cart is return to the client or new or exist - set the user id
            console.log(res);
        },
        error: function (res) {

        }

    })
}



var DOM = {};
function init() {
    DOM.List = document.getElementById("main");
    getProducts();
    getCart();
    document.querySelector("#carts").addEventListener("click",
        function () {
            get_carts();
        });
    document.querySelector("#products").addEventListener("click",
        function () {
            getProducts();
        });

}


function draw(products) {
    for (let index = 0; index < products.length; index++) {
        DOM.List.appendChild(ProductCard(products[index]));
    }
}

function draw_carts(carts) {
    userCarts = carts;
    for (let index = 0; index < carts.length; index++) {
        DOM.List.appendChild(cartCard(carts[index]));

    }
}
function draw_cart_details(products) {
    for (let index = 0; index < products.length; index++) {
        DOM.List.appendChild(ProductCardDetails(products[index]));
    }
}
function ProductCardDetails(p) {

    var card = document.getElementsByName("productDetailTemplate")[0].cloneNode(true);

    card.style.display = "inline-block";
    card.querySelector("#img").src = p.image;
    card.querySelector("#name").innerHTML = p.name;
    card.querySelector("#amount").innerHTML = "amount:" + p.amount;
    card.querySelector("#price").innerHTML = "price:" + p.price;
    card.querySelector("#total").innerHTML = "total:" + p.total;
    return card;
}

function cartCard(c) {

    var cart = document.getElementsByName("cartTemplate")[0].cloneNode(true);
    cart.style.display = "inline-block";
    cart.querySelector("#id").innerHTML = "cart number: " + c.id;
    cart.querySelector("#creationDate").innerHTML = "created at: " + c.createDate;
    cart.querySelector("#totalProducts").innerHTML = "num of products: " + c.sop;
    cart.querySelector("#totalPrice").innerHTML = "total price: " + c.totalPrice;
    cart.querySelector("#detailsBtn").addEventListener("click",
        function () {
            openCartDetails(c.id);
        }
    )
    return cart;
}

function ProductCard(p) {

    var card = document.getElementsByName("template")[0].cloneNode(true);
    card.id = p.id;
    card.style.display = "inline-block";
    card.querySelector("#img").src = p.image;
    card.querySelector("#desc").innerHTML = p.description;
    card.querySelector("#title").innerHTML = p.name;
    card.querySelector("#amount").name = "amountOf" + p.id;
    card.querySelector("#addBtn").addEventListener("click", function () {
        addToCart(this.parentElement.parentElement.id);
    })
    return card;
}
function get_carts() {
    DOM.List.innerHTML = "";

    $.ajax({
        url: "http://localhost/store/api/index.php?controller=cart&action=get_carts",
        method: "POST",
        data: { userId: user.userId },
        success: function (res) {
            draw_carts(JSON.parse(res));
        },
        error: function (res) {
            alert(JSON.stringify(res));
        }



    })
}

function openCartDetails($cartId) {
    DOM.List.innerHTML = "";
    $.ajax({
        url: "http://localhost/store/api/index.php?controller=cart&action=get_cart_details",
        method: "POST",
        data: { cartId: $cartId },
        success: function (res) {
            draw_cart_details(JSON.parse(res));
        },
        error: function (res) {
            alert(JSON.stringify(res));
        }
    })

}


init();



