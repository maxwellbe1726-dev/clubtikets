document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('buyerForm');
  const nombre = document.getElementById('nombre');
  const apellidos = document.getElementById('apellidos');
  const email = document.getElementById('email');
  const confirmEmail = document.getElementById('confirmEmail');
  const telefono = document.getElementById('telefono');
  const consentTerms = document.getElementById('consentTerms');
  const submitBtn = document.getElementById('submitBtn');

  // Country code selector toggle simulation
  const countrySelect = document.getElementById('countrySelect');
  const flags = ['🇬🇧', '🇪🇸', '🇺🇸', '🇫🇷', '🇩🇪'];
  let currentFlagIndex = 0;

  if (countrySelect) {
    countrySelect.addEventListener('click', () => {
      currentFlagIndex = (currentFlagIndex + 1) % flags.length;
      countrySelect.querySelector('.flag').textContent = flags[currentFlagIndex];
    });
  }

  // Form validation logic
  function validateForm() {
    const isNombreValid = nombre.value.trim() !== '';
    const isApellidosValid = apellidos.value.trim() !== '';
    const isEmailValid = email.value.trim() !== '' && email.validity.valid;
    const isConfirmEmailValid = confirmEmail.value.trim() === email.value.trim() && confirmEmail.value.trim() !== '';
    const isTelefonoValid = telefono.value.trim() !== '';
    const isTermsChecked = consentTerms.checked;

    if (
      isNombreValid && 
      isApellidosValid && 
      isEmailValid && 
      isConfirmEmailValid && 
      isTelefonoValid && 
      isTermsChecked
    ) {
      submitBtn.removeAttribute('disabled');
    } else {
      submitBtn.setAttribute('disabled', 'true');
    }
  }

  // Attach event listeners to all form controls
  [nombre, apellidos, email, confirmEmail, telefono].forEach(input => {
    input.addEventListener('input', validateForm);
  });
  
  consentTerms.addEventListener('change', validateForm);

  // Form submit simulation
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('¡Formulario enviado con éxito! Redirigiendo a pasarela de pago simulada...');
  });

  // Cart interaction simulation
  const clearCartBtn = document.querySelector('.clear-cart-btn');
  const removeEventBtn = document.querySelector('.remove-event-btn');
  const removeItemBtn = document.querySelector('.remove-item-btn');
  const cartItemsContainer = document.querySelector('.cart-items-container');
  const cartTotalVal = document.querySelector('.cart-total-val');

  function updateCartTotal(priceStr) {
    cartTotalVal.textContent = priceStr;
  }

  if (removeItemBtn) {
    removeItemBtn.addEventListener('click', () => {
      const row = removeItemBtn.closest('.cart-item-row');
      if (row) {
        row.remove();
        updateCartTotal('0,00 €');
      }
    });
  }

  if (removeEventBtn) {
    removeEventBtn.addEventListener('click', () => {
      if (cartItemsContainer) {
        cartItemsContainer.innerHTML = '<div style="padding: 20px; text-align: center; color: #777;">El carrito está vacío.</div>';
        updateCartTotal('0,00 €');
      }
    });
  }

  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', () => {
      if (cartItemsContainer) {
        cartItemsContainer.innerHTML = '<div style="padding: 20px; text-align: center; color: #777;">El carrito está vacío.</div>';
        updateCartTotal('0,00 €');
      }
    });
  }
});
