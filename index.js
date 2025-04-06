// adding order to cart
document.addEventListener('DOMContentLoaded', () => {
  let cart = [];

  const buttons = document.querySelectorAll('.add-to-cart-btn');
  const cartCount = document.getElementById('cart-count');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const cakeName = btn.getAttribute('data-name');
      cart.push(cakeName);
      cartCount.innerText = cart.length;
      alert(`${cakeName} added to cart!`);
    });
  });

  function openCheckout() {
    if (cart.length === 0) {
      alert("Your cart is empty! Add cakes first 🍰");
      return;
    }
    document.getElementById('cake_order').value = cart.join(', ');
    document.getElementById('checkoutOverlay').style.display = 'flex';
  }
  
  function closeCheckout() {
    document.getElementById('checkoutOverlay').style.display = 'none';
  }
  
  document.getElementById('openCheckoutBtn').addEventListener('click', openCheckout);


// function to open checkout form and send the mail to the emailjs service

function openCheckout() {
  document.getElementById('checkout-form').style.display = 'block';
  document.getElementById('cake_order').value = cart.join(', ');
}

document.getElementById('orderForm').addEventListener('submit', function(e) {
  e.preventDefault();

  emailjs.sendForm('service_cliifku', 'template_d4cyree', this)
    .then(function() {
      alert('🎉 Order sent! We’ll contact you shortly.');
      cart = [];
      document.getElementById('cart-count').innerText = 0;
      document.getElementById('orderForm').reset();
      document.getElementById('checkout-form').style.display = 'none';
    }, function(error) {
      console.log(error);
      alert('❌ Failed to send order. Try again.');
    });
});
});

