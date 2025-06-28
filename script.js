document.addEventListener('DOMContentLoaded', () => {
  const receiptData = {};
  const countSpans = document.querySelectorAll('.count');
  const chargeCells = document.querySelectorAll('td[class$="-charge"]');
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
        const parentCell = span.closest('td');
        const itemClass = Array.from(parentCell.classList).find(c => c !== 'count');
        const chargeCell = document.querySelector(`.${itemClass}-charge`);
        receiptData[itemClass] = {
          quantity: newQty,
          charge: chargeCell.textContent
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
        const itemClass = cell.className.replace('-charge', '');
        const quantity = document.querySelector(`.${itemClass} .count`).textContent;
        receiptData[itemClass] = {
          quantity,
          charge: newCharge
        };
        calculateTotal();
      }
    });
  });
});
