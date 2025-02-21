const pump = document.getElementById('pump');
const gameContainer = document.querySelector('.game-container');
const burstEffect = document.getElementById('burst-effect');
const clouds = document.querySelectorAll('.cloud');

let balloonCount = 0;

function createBalloon() {
  const balloon = document.createElement('div');
  balloon.className = 'balloon';
  balloon.innerHTML=`<img src="assests/Balloon Image.png" alt="Balloon">`;
  gameContainer.appendChild(balloon);
  balloonCount++;

  balloon.style.left = '50%';
  balloon.style.bottom = '100px';

  setTimeout(() => {
    balloon.style.width = '120px';
    balloon.style.bottom = '200px';
    moveBalloonRandomly(balloon);
  }, 500);

  balloon.addEventListener('click', () => {
    burstBalloon(balloon);
  });
}

function moveBalloonRandomly(balloon) {
  const moveInterval = setInterval(() => {
    if (balloon.parentElement) {
      const x = Math.random() * (window.innerWidth - 120);
      const y = Math.random() * (window.innerHeight - 120);
      balloon.style.left = `${x}px`;
      balloon.style.top = `${y}px`;

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

function burstBalloon(balloon) {
  burstEffect.style.display = 'block';
  burstEffect.style.left = `${balloon.offsetLeft}px`;
  burstEffect.style.top = `${balloon.offsetTop}px`;
  balloon.remove();
  setTimeout(() => {
    burstEffect.style.display = 'none';
  }, 500);
}

pump.addEventListener('click', () => {
  createBalloon();
});
