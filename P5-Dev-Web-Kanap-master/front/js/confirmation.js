let orderID = document.getElementById("orderId");
let orderConfirm = JSON.parse(localStorage.getItem("confirmationProduit"));

orderID.textContent = orderConfirm.orderId;