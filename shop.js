document.addEventListener("DOMContentLoaded", () => {
    const cart = [];
    const cartItemsContainer = document.getElementById("cartItems");

    function updateCartPreview() {
      cartItemsContainer.innerHTML = "";
      if (cart.length === 0) {
        cartItemsContainer.innerHTML =
          '<p style="color: #aaa;">Cart is empty</p>';
        return;
      }

      cart.forEach((item, index) => {
        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
        <span>${item}</span>
        <button class="remove-btn" onclick="removeFromCart(${index})">&times;</button>
      `;
        cartItemsContainer.appendChild(div);
      });
    }

    window.removeFromCart = function (index) {
      cart.splice(index, 1);
      updateCartPreview();
      Swal.fire({
        toast: true,
        icon: "info",
        title: "Removed from cart",
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
      });
    };

    document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
      button.addEventListener("click", () => {
        const name = button.getAttribute("data-name");
        cart.push(name);
        updateCartPreview();
        Swal.fire({
          toast: true,
          icon: "success",
          title: `${name} added!`,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
        });
      });
    });

    updateCartPreview();
  });

  document.addEventListener('DOMContentLoaded', () => {
    let cart = [];
  
    const buttons = document.querySelectorAll('.add-to-cart-btn');
    const cartCount = document.getElementById('cart-count');
    const checkoutOverlay = document.getElementById('checkoutOverlay');
    const cakeOrderInput = document.getElementById('cake_order');
    const orderForm = document.getElementById('orderForm');
    const checkoutBtn = document.getElementById('openCheckoutBtn');
    const closeBtn = document.querySelector('.close-btn');
  
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const cakeName = btn.getAttribute('data-name');
        cart.push(cakeName);
        cartCount.innerText = cart.length;
        alert(`${cakeName} added to cart!`);
      });
    });
  
    // ✅ Show checkout popup
    function openCheckout() {
      if (cart.length === 0) {
        alert("Your cart is empty! Add cakes first 🍰");
        return;
      }
      cakeOrderInput.value = cart.join(', ');
      checkoutOverlay.style.display = 'flex';
    }
  
    // ✅ Hide checkout popup
    function closeCheckout() {
      checkoutOverlay.style.display = 'none';
    }
  
    // ✅ Attach to the button
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', openCheckout);
    }
  
    // ✅ Attach close button
    if (closeBtn) {
      closeBtn.addEventListener('click', closeCheckout);
    }
  
    // ✅ EmailJS send form
    orderForm.addEventListener('submit', function (e) {
      e.preventDefault();
  
      emailjs.sendForm('service_cliifku', 'template_d4cyree', this)
        .then(function () {
          alert('🎉 Order sent! We’ll contact you shortly.');
          cart = [];
          cartCount.innerText = 0;
          orderForm.reset();
          closeCheckout();
        }, function (error) {
          console.log(error);
          alert('❌ Failed to send order. Try again.');
        });
    });
  
    // ✅ Make closeCheckout globally accessible (for inline onclick if still needed)
    window.closeCheckout = closeCheckout;
  });
  