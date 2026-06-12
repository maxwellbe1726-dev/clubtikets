document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('buyerForm');
  const nombre = document.getElementById('nombre');
  const apellidos = document.getElementById('apellidos');
  const email = document.getElementById('email');
  const confirmEmail = document.getElementById('confirmEmail');
  const telefono = document.getElementById('telefono');
  const consentTerms = document.getElementById('consentTerms');
  const submitBtn = document.getElementById('submitBtn');

  // Country dropdown
  const countrySelect = document.getElementById('countrySelect');
  const countryDropdown = document.getElementById('countryDropdown');
  const selectedFlag = document.getElementById('selectedFlag');
  const selectedDial = document.getElementById('selectedDial');

  const countries = [
    { flag: '🇬🇧', name: 'United Kingdom', dial: '+44' },
    { flag: '🇪🇸', name: 'Spain', dial: '+34' },
    { flag: '🇺🇸', name: 'United States', dial: '+1' },
    { flag: '�🇪', name: 'Germany', dial: '+49' },
    { flag: '�🇷', name: 'France', dial: '+33' },
    { flag: '🇮🇹', name: 'Italy', dial: '+39' },
    { flag: '🇳🇱', name: 'Netherlands', dial: '+31' },
    { flag: '🇧🇪', name: 'Belgium', dial: '+32' },
    { flag: '🇨🇭', name: 'Switzerland', dial: '+41' },
    { flag: '🇦🇹', name: 'Austria', dial: '+43' },
    { flag: '🇵🇹', name: 'Portugal', dial: '+351' },
    { flag: '🇸🇪', name: 'Sweden', dial: '+46' },
    { flag: '🇳🇴', name: 'Norway', dial: '+47' },
    { flag: '🇩�', name: 'Denmark', dial: '+45' },
    { flag: '🇫🇮', name: 'Finland', dial: '+358' },
    { flag: '🇮�', name: 'Ireland', dial: '+353' },
    { flag: '🇵🇱', name: 'Poland', dial: '+48' },
    { flag: '🇬🇷', name: 'Greece', dial: '+30' },
    { flag: '🇹🇷', name: 'Turkey', dial: '+90' },
    { flag: '🇷🇺', name: 'Russia', dial: '+7' },
    { flag: '🇨🇦', name: 'Canada', dial: '+1' },
    { flag: '🇦🇺', name: 'Australia', dial: '+61' },
    { flag: '🇧🇷', name: 'Brazil', dial: '+55' },
    { flag: '🇲🇽', name: 'Mexico', dial: '+52' },
    { flag: '🇦🇷', name: 'Argentina', dial: '+54' },
    { flag: '🇨🇴', name: 'Colombia', dial: '+57' },
    { flag: '🇮🇳', name: 'India', dial: '+91' },
    { flag: '🇨🇳', name: 'China', dial: '+86' },
    { flag: '🇯🇵', name: 'Japan', dial: '+81' },
    { flag: '🇰🇷', name: 'South Korea', dial: '+82' },
    { flag: '🇿🇦', name: 'South Africa', dial: '+27' },
    { flag: '🇦🇪', name: 'United Arab Emirates', dial: '+971' },
    { flag: '🇸🇦', name: 'Saudi Arabia', dial: '+966' },
  ];

  function renderCountryDropdown() {
    if (!countryDropdown) return;
    countryDropdown.innerHTML = countries.map(c => `
      <div class="country-dropdown-item" data-dial="${c.dial}" data-flag="${c.flag}">
        <span class="flag">${c.flag}</span>
        <span class="name">${c.name}</span>
        <span class="dial">${c.dial}</span>
      </div>
    `).join('');

    countryDropdown.querySelectorAll('.country-dropdown-item').forEach(item => {
      item.addEventListener('click', () => {
        selectedFlag.textContent = item.dataset.flag;
        selectedDial.textContent = item.dataset.dial;
        countryDropdown.classList.remove('open');
      });
    });
  }

  renderCountryDropdown();

  if (countrySelect) {
    countrySelect.addEventListener('click', (e) => {
      e.stopPropagation();
      countryDropdown.classList.toggle('open');
    });

    document.addEventListener('click', () => {
      countryDropdown.classList.remove('open');
    });

    countryDropdown.addEventListener('click', (e) => {
      e.stopPropagation();
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

  // Form submit → save buyer data + redirect to payment page
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const buyerData = {
      firstName: nombre.value.trim(),
      lastName: apellidos.value.trim(),
      email: email.value.trim(),
      phone: telefono.value.trim(),
      dial: selectedDial ? selectedDial.textContent.trim() : '+44'
    };
    localStorage.setItem('clubticketsBuyer', JSON.stringify(buyerData));
    window.location.href = 'payment.html';
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
        cartItemsContainer.innerHTML = '<div style="padding: 20px; text-align: center; color: #777;">Your cart is empty.</div>';
        updateCartTotal('0,00 €');
      }
    });
  }

  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', () => {
      if (cartItemsContainer) {
        cartItemsContainer.innerHTML = '<div style="padding: 20px; text-align: center; color: #777;">Your cart is empty.</div>';
        updateCartTotal('0,00 €');
      }
    });
  }

  // Render dynamic cart from localStorage
  function renderCart() {
    const cartData = JSON.parse(localStorage.getItem('clubticketsCart') || 'null');
    if (!cartData || !cartItemsContainer) return;

    const { event, tickets } = cartData;
    let total = 0;

    const ticketRowsHtml = tickets.map(t => {
      total += t.qty * t.price;
      return `
        <div class="cart-item-row">
          <div class="cart-item-desc">
            <span class="cart-item-qty">${t.qty} x</span>
            <span class="cart-item-name">${t.name}</span>
            <button class="icon-btn remove-item-btn" type="button" aria-label="Remove ticket">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
          <div class="cart-item-price">${(t.qty * t.price).toFixed(2).replace('.', ',')} €</div>
        </div>
      `;
    }).join('');

    cartItemsContainer.innerHTML = `
      <div class="cart-event-block">
        <div class="cart-event-title-row">
          <span class="cart-event-date">${event.date}</span>
        </div>
        <div class="cart-event-details">
          <p class="cart-event-venue">${event.venue}</p>
          <p class="cart-event-artist">${event.artist}</p>
        </div>
      </div>
      ${ticketRowsHtml}
    `;

    if (cartTotalVal) {
      cartTotalVal.textContent = `${total.toFixed(2).replace('.', ',')} €`;
    }
  }

  renderCart();
});
