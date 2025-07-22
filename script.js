document.addEventListener('DOMContentLoaded', () => {
  const receiptData = {};
  const countSpans = document.querySelectorAll('.count');
  const chargeCells = document.querySelectorAll('.item-charge');
  const totalDisplay = document.querySelector('.total-display');

  function calculateTotal() {
    let total = 0;
    for (const key in receiptData) {
      const { quantity, charge } = receiptData[key];
      total += (parseInt(quantity) || 0) * (parseFloat(charge) || 0);
    }
    totalDisplay.textContent = `Total: ₦${total}`;
  }

  countSpans.forEach(span => {
    span.addEventListener('click', () => {
      const newQty = prompt('Enter quantity:', span.textContent);
      if (newQty !== null) {
        span.textContent = newQty;

        const row = span.closest('tr');
        const itemKey = row.dataset.item;
        const chargeText = row.querySelector('.item-charge').textContent;

        receiptData[itemKey] = {
          quantity: newQty,
          charge: chargeText
        };
        calculateTotal();
      }
    });
  });

  chargeCells.forEach(cell => {
    cell.addEventListener('click', () => {
      const newCharge = prompt('Enter price per item (₦):', cell.textContent);
      if (newCharge !== null) {
        cell.textContent = newCharge;

        const row = cell.closest('tr');
        const itemKey = row.dataset.item;
        const qty = row.querySelector('.count').textContent;

        receiptData[itemKey] = {
          quantity: qty,
          charge: newCharge
        };
        calculateTotal();
      }
    });
  });
});
