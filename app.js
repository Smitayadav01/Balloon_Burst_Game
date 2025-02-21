const pump = document.getElementById('pump');
const gameContainer = document.querySelector('.game-container');
const burstEffect = document.getElementById('burst-effect');
const clouds = document.querySelectorAll('.cloud');

let balloonCount = 0;

// Function to create a new balloon
function createBalloon() {
  const balloon = document.createElement('div');
  balloon.className = 'balloon';
  balloon.innerHTML=`<img src="assests/Balloon Image.png" alt="Balloon">`;
  gameContainer.appendChild(balloon);
  balloonCount++;

  // Position the balloon above the pump
  balloon.style.left = '50%';
  balloon.style.bottom = '100px';

  // Inflate the balloon
  setTimeout(() => {
    balloon.style.width = '120px';
    balloon.style.bottom = '200px';
    moveBalloonRandomly(balloon);
  }, 500);

  // Add click event to burst the balloon
  balloon.addEventListener('click', () => {
    burstBalloon(balloon);
  });
}

// Function to move the balloon randomly
function moveBalloonRandomly(balloon) {
  const moveInterval = setInterval(() => {
    if (balloon.parentElement) {
      const x = Math.random() * (window.innerWidth - 120);
      const y = Math.random() * (window.innerHeight - 120);
      balloon.style.left = `${x}px`;
      balloon.style.top = `${y}px`;

      // Check for collision with clouds
      clouds.forEach(cloud => {
        if (checkCollision(balloon, cloud)) {
          burstBalloon(balloon);
          clearInterval(moveInterval);
        }
      });
    } else {
      clearInterval(moveInterval);
    }
  }, 2000);
}

// Function to check collision between balloon and cloud
function checkCollision(balloon, cloud) {
  const balloonRect = balloon.getBoundingClientRect();
  const cloudRect = cloud.getBoundingClientRect();

  return !(
    balloonRect.top > cloudRect.bottom ||
    balloonRect.bottom < cloudRect.top ||
    balloonRect.left > cloudRect.right ||
    balloonRect.right < cloudRect.left
  );
}

// Function to burst the balloon
function burstBalloon(balloon) {
  burstEffect.style.display = 'block';
  burstEffect.style.left = `${balloon.offsetLeft}px`;
  burstEffect.style.top = `${balloon.offsetTop}px`;
  balloon.remove();
  setTimeout(() => {
    burstEffect.style.display = 'none';
  }, 500);
}

// Pump click event to create a new balloon
pump.addEventListener('click', () => {
  createBalloon();
});