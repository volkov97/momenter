let counter = 100;

setInterval(() => {
  const counterEl = document.getElementById("counterEl");
  
  if (counterEl) {
    counterEl.innerHTML = String(++counter);
  }
}, 1000);
