document.addEventListener('DOMContentLoaded', () => {
  const ticketRows = document.querySelectorAll('.ticket-row');
  const footer = document.getElementById('checkoutFooter');
  const footerItemCount = document.getElementById('footerItemCount');
  const footerTotalPrice = document.getElementById('footerTotalPrice');
  
  if (!footer) return;

  const checkoutBtn = footer.querySelector('.checkout-footer-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      const selectedTickets = [];
      ticketRows.forEach(row => {
        const nameEl = row.querySelector('h3');
        const priceEl = row.querySelector('strong');
        const qtySpan = row.querySelector('.quantity span');
        if (nameEl && priceEl && qtySpan) {
          const qty = parseInt(qtySpan.textContent, 10) || 0;
          if (qty > 0) {
            selectedTickets.push({
              name: nameEl.childNodes[0].textContent.trim(),
              qty: qty,
              price: parseFloat(priceEl.textContent.replace('€', '').trim()) || 0
            });
          }
        }
      });
      const cartData = {
        event: {
          date: 'Sat 13 Jun',
          venue: 'Hï Ibiza',
          artist: 'Black Coffee'
        },
        tickets: selectedTickets
      };
      localStorage.setItem('clubticketsCart', JSON.stringify(cartData));
      window.location.href = 'checkout.html';
    });
  }

  function updateFooter() {
    let totalItems = 0;
    let totalPrice = 0;

    ticketRows.forEach(row => {
      const quantitySpan = row.querySelector('.quantity span');
      const priceStrong = row.querySelector('strong');
      if (quantitySpan && priceStrong) {
        const qty = parseInt(quantitySpan.textContent, 10) || 0;
        const price = parseFloat(priceStrong.textContent.replace('€', '').trim()) || 0;
        totalItems += qty;
        totalPrice += qty * price;
      }
    });

    if (totalItems > 0) {
      footerItemCount.textContent = totalItems === 1 ? '1 item' : `${totalItems} items`;
      footerTotalPrice.textContent = `${totalPrice.toFixed(2)}€`;
      footer.classList.add('is-visible');
      document.body.classList.add('has-checkout-footer');
    } else {
      footer.classList.remove('is-visible');
      document.body.classList.remove('has-checkout-footer');
    }
  }

  ticketRows.forEach(row => {
    const qtyDiv = row.querySelector('.quantity');
    if (!qtyDiv) return;

    const minusBtn = qtyDiv.firstElementChild;
    const plusBtn = qtyDiv.lastElementChild;
    const quantitySpan = qtyDiv.querySelector('span');

    minusBtn.addEventListener('click', () => {
      let qty = parseInt(quantitySpan.textContent, 10) || 0;
      if (qty > 0) {
        qty--;
        quantitySpan.textContent = qty;
        updateFooter();
      }
    });

    plusBtn.addEventListener('click', () => {
      let qty = parseInt(quantitySpan.textContent, 10) || 0;
      qty++;
      quantitySpan.textContent = qty;
      updateFooter();
    });
  });

  // Run initial update in case some items are pre-selected in HTML
  updateFooter();
});
