function engageOverclock(){
  const btn = document.getElementById('action-btn');
  const bar = document.getElementById('load-line');
  const stepsCounter = document.getElementById('cycle-counter');
  const timeCounter = document.getElementById('time-counter');
  const piCounter = document.getElementById('pi-counter');
  const alertStatus = document.getElementById('sys-alert');

  // Stop the user from spam clicking while it is running
  if (btn.disabled) return;
  btn.disabled = true;
  btn.innerText = "Processing mathematical stress..."

  alertStatus.textContent = 'Status: Computing Pi...';
  alertStatus.style.color = "var(--acid-yellow)";

  // Track initial milliseconds timestamp when button is pressed
  const startTime = performance.now();


   let totalSteps = 0;
  let currentWave = 0;
  const maxWaves = 10;
  const stepsPerWave = 2000000; // 2 Million operations per burst

  let piApproximation = 0;

  // Asynchronous calculation intervals prevent screen locking
  const engineThread = setInterval(() => {

    // Execute the infinite math series expansion loop
    for (let i = 0; i < stepsPerWave; i++) {
      const k = totalSteps;
      // Leibniz formula for Pi calculation
      piApproximation += (k % 2 === 0 ? 1 : -1) / (2 * k + 1);
      totalSteps++;
    }

    currentWave++;

    // Update screen data panels live
    const currentPiValue = piApproximation * 4; // Multiply by 4 based on Leibniz math formula
    piCounter.textContent = currentPiValue.toFixed(8);
    stepsCounter.textContent = totalSteps.toLocaleString();

    // Calculate elapsed time in seconds live
    const elapsedTime = ((performance.now() - startTime) / 1000).toFixed(2);
    timeCounter.textContent = `${elapsedTime}s`;

    // Map progress tracks
    const progressPercent = (currentWave / maxWaves) * 100;
    bar.style.width = `${progressPercent}%`;

    // Trigger visual Edgerunners style alert once math crosses step threshold
    if (currentWave >= 8) {
      bar.classList.add('critical-bar');
      stepsCounter.classList.add('critical-text');
      alertStatus.classList.add('critical-text');
      alertStatus.textContent = "STATUS: THERMAL_LIMIT";
    }

    // Terminate calculation threads safely at maximum processing thresholds
    if (currentWave >= maxWaves) {
      clearInterval(engineThread);

      const totalTime = ((performance.now() - startTime) / 1000).toFixed(2);
      timeCounter.textContent = `${totalTime}s`;

      btn.innerText = `CALCULATION_COMPLETE IN ${totalTime}s`;
      alertStatus.textContent = "STATUS: BENCHMARK_STABLE";
      alertStatus.style.color = "var(--neon-cyan)";
    }
  }, 40); // 40ms breather breaks give the browser window room to render frames smoothly
}
