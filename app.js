function engageOverclock(){
  const btn = document.getElementById('action-btn');
  const bar = document.getElementById('load-line');
  const counter = document.getElementById('cycle-counter');
  const alertStatus = document.getElementById('sys-alert');

  // Stop the user from spam clicking while it is running
  if (btn.disabled) return;
  btn.disabled = true;
  btn.style.opacity='0.5';

  alertStatus.textContent = 'STATUS: OVERCLOCKING';
  alertStatus.style.color = "var(--acid-yellow)";

  let cycles = 0;

  // Run the loop every 10 milliseconds
  const streamTimer = setInterval(() => {
    // Increment cycles by 10
    cycles += 10;

    // Update the counter text
    counter.textContent = `${String(cycles).padStart(4, '0')}/1000`;

    // map the progress to CSS width percentage (cycles/1000 * 100)
    const percentage = (cycles/1000) * 100;
    bar.style.width = `${percentage}`;

    // visual snap to alert color when load crosses 750 cycles
    if(cycles >= 750){
      bar.classList.add('critical-bar');
      counter.classList.add('critical-text');
      alertStatus.classList.add('critical-text');
      alertStatus.textContent = "STATUS: CRITICAL";
    }

    // Stop the timer thread once it hits 1000 cycles
    if(cycles >= 1000){
      clearInterval(streamTimer);
      btn.innerText = "SEQUENCE COMPLETE"
    }

  }, 30);
}
