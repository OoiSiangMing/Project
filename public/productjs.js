sessionStorage.removeItem('DISCOUNT');
sessionStorage.removeItem('TOTAL');
sessionStorage.removeItem('SUBTOTAL');
sessionStorage.removeItem('item');


let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

var nowDate = new Date();
var day = nowDate.getDay();


cartIcon.onclick = () => {
	cart.classList.add("active");
}

closeCart.onclick = () => {
	cart.classList.remove("active");
}


if(document.readyState == 'loading'){
	document.addEventListener('DOMContentLoaded', ready);
}else{
	ready();
}

function ready(){
	var reomveCartButtons = document.getElementsByClassName("cart-remove");
	console.log(reomveCartButtons);
	for (var i = 0; i < reomveCartButtons.length; i++){
		var button = reomveCartButtons[i];
		button.addEventListener("click", removeCartItem);
	}
	var quantityInputs = document.getElementsByClassName("cart-quantity");
	for (var i = 0; i < quantityInputs.length; i++){
		var input = quantityInputs[i];
		input.addEventListener("change", quantityChanged);
	}
	var addCart = document.getElementsByClassName("add-cart");
	for (var i = 0; i < addCart.length; i++){
		var button = addCart[i];
		button.addEventListener("click", addCartClicked);
	}
	document.getElementsByClassName("btn-checkout")[0].addEventListener("click", checkoutButtonClicked);
}

function checkoutButtonClicked(){
	alert("Thank you For Your Purchase")
	var cartContent = document.getElementsByClassName("cart-content")[0];
	while(cartContent.hasChildNodes()){
		cartContent.removeChild(cartContent.firstChild);
	}
	window.location.href = "checkout.html"
	updatetotal();
}

function removeCartItem(event){
	var buttonClicked = event.target;
	buttonClicked.parentElement.remove();
	updatetotal();
}

function quantityChanged(event){
	var input = event.target;
	if (isNaN(input.value) || input.value <= 0){
		input.value = 1;
	}
	updatetotal();
}

function addCartClicked(event){
	var button = event.target;
	var shopProducts = button.parentElement;
	var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
	var price = shopProducts.getElementsByClassName("price")[0].innerText;
	var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
	addProductToCart(title, price, productImg);
	updatetotal();
}

function addProductToCart(title, price, productImg){
	var cartShopBox = document.createElement("div");
	cartShopBox.classList.add("cart-box");
	var cartItems = document.getElementsByClassName("cart-content")[0];
	var cartItemsNames = document.getElementsByClassName("cart-product-title");
	for (var i = 0; i < cartItemsNames.length; i++){
		if (cartItemsNames[i].innerText == title){
			alert("You have already add this to cart");
			return;
		}
	}

	var cartBoxContent = `
					<img src="${productImg}" class="cart-img">
					<div class="detail-box">
						<div class="cart-product-title">${title}</div>
						<div class="cart-price">${price}</div>
						<input type="number" value="1" class="cart-quantity">
					</div>
					<i class="fa-solid fa-trash cart-remove"></i>`;
cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem);
cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChanged);
}

function updatetotal(){
	var cartContent = document.getElementsByClassName("cart-content")[0];
	var cartBoxes = cartContent.getElementsByClassName("cart-box");
	var subtotal = 0;
	for (var i = 0; i < cartBoxes.length; i++){
		var cartBox = cartBoxes[i];
		var priceElement = cartBox.getElementsByClassName("cart-price")[0];
		var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
		var price = parseFloat(priceElement.innerText.replace("RM",""));
		var quantity = quantityElement.value;
		subtotal = subtotal + (price * quantity);
	}

	if(subtotal >= 100){
		discount =  0;
	}
	else{
		discount = 0;
	}

	total = subtotal - discount;

	discount = Math.round(discount * 100) / 100;
	total = Math.round(total * 100) / 100;

	document.getElementsByClassName("subtotal-price")[0].innerText = "RM" + subtotal.toFixed(2);
	document.getElementsByClassName("discount-price")[0].innerText = "-RM" + discount.toFixed(2);
	document.getElementsByClassName("total-price")[0].innerText = "RM" + total.toFixed(2);
	
	

}

/*Pass Value*/
function handleSubmit(){
	var cartContent = document.getElementsByClassName("cart-content")[0];
	var cartBoxes = cartContent.getElementsByClassName("cart-box");
	for (var i = 0; i < cartBoxes.length; i++){
		var cartBox = cartBoxes[i];
		var productImg = cartBox.getElementsByClassName("cart-img")[0].src;
		var flavour = cartBox.getElementsByClassName("cart-product-title")[0].innerText;
		var unitpriceElement = cartBox.getElementsByClassName("cart-price")[0];
		var unitprice = parseFloat(unitpriceElement.innerText.replace("RM",""));
		var quantity = cartBox.getElementsByClassName("cart-quantity")[0].value;

		let item_records = new Array();
		item_records = JSON.parse(sessionStorage.getItem("item"))?JSON.parse(sessionStorage.getItem("item")):[]
		
		item_records.push({
			"FLAVOUR":flavour,
			"QUANTITY":quantity,
			"UNITPRICE":unitprice
		})
		sessionStorage.setItem("item",JSON.stringify(item_records));

		var subtotalElement = document.getElementsByClassName("subtotal-price")[0];
		var cart_subtotal = parseFloat(subtotalElement.innerText.replace("RM",""));

		var discountElement = document.getElementsByClassName("discount-price")[0];
		var cart_discount = parseFloat(discountElement.innerText.replace("-RM",""));

		var totalElement = document.getElementsByClassName("total-price")[0];
		var cart_total = parseFloat(totalElement.innerText.replace("RM",""));

		sessionStorage.setItem("SUBTOTAL", cart_subtotal);
		sessionStorage.setItem("DISCOUNT", cart_discount);
		sessionStorage.setItem("TOTAL", cart_total);
	}
	
	return;
}


/*Slider*/
var counter = 1;
setInterval(function(){
	document.getElementById('radio' + counter).checked = true;
	counter++;
	if (counter > 2) {
		counter = 1;
	}
}, 5000);