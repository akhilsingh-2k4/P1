const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');

function update() {
  const now = new Date();
  const h = String(now.getHours() % 12 || 12).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  const ap = now.getHours() >= 12 ? 'PM' : 'AM';
  timeEl.textContent = `${h}:${m}:${s} ${ap}`;
  dateEl.textContent = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
}

update();
setInterval(update, 1000);