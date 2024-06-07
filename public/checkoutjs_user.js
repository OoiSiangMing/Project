let username = sessionStorage.getItem('USERNAME');
document.getElementById('username').innerText = username;

const card_btn = document.querySelector("#card");
const container = document.querySelector(".payment-form");

card_btn.addEventListener("click",() => {
	container.classList.add("card-mode");
});



window.addEventListener('load',() => {

	const subtotal = (Math.round(sessionStorage.getItem('SUBTOTAL') * 100) / 100).toFixed(2);
	const discount = (Math.round(sessionStorage.getItem('DISCOUNT') * 100) / 100).toFixed(2);
	const total = (Math.round(sessionStorage.getItem('TOTAL') * 100) / 100).toFixed(2);

	var cardItems = document.getElementsByClassName("card")[0];
	let item_records = new Array();
	item_records = JSON.parse(sessionStorage.getItem("item"))?JSON.parse(sessionStorage.getItem("item")):[]
	if(item_records){
		for (var i = 0; i<item_records.length; i++) {
			let addDiv = document.createElement('div');
			addDiv.className = 'row';
			addDiv.innerHTML = '<div class="detail"><h4><span class="product-title">'+item_records[i].FLAVOUR+'</span></h4><div class="cart-quantity"><span id="quantity">'+ "Qty:&nbsp;&nbsp;" +item_records[i].QUANTITY+'</span></div><div class="price"><span id="price">'+ "Price:&nbsp;&nbsp;RM" +(Math.round((item_records[i].UNITPRICE*item_records[i].QUANTITY) * 100) / 100).toFixed(2)+'</span></div></div>'
			cardItems.append(addDiv);
		}
	}	
	

	document.getElementById('checkout-subtotal').innerText = subtotal;
	document.getElementById('checkout-discount').innerText = discount;
	document.getElementById('checkout-total').innerText = total;
	document.getElementById('card-payAmount').innerText = total;
})
