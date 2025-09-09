// Paths to images. Replace the files in the assets folder to customize.
const heroImage = 'assets/hero.svg';
const enemyImage = 'assets/enemy.svg';

const hero = document.getElementById('hero');
hero.src = heroImage;

const gameArea = document.getElementById('game');
let killCount = 0;

function spawnEnemy() {
  const enemy = document.createElement('img');
  enemy.src = enemyImage;
  enemy.className = 'enemy';
  enemy.style.left = gameArea.offsetWidth + 'px';
  gameArea.appendChild(enemy);

  let position = gameArea.offsetWidth;
  const speed = 2 + Math.random() * 2;

  function move() {
    position -= speed;
    enemy.style.left = position + 'px';

    if (position < hero.offsetLeft + hero.offsetWidth) {
      // Enemy reached hero; remove enemy and increment counter
      killCount++;
      document.getElementById('killCount').textContent = `Enemies defeated: ${killCount}`;
      enemy.remove();
      return;
    }
    requestAnimationFrame(move);
  }
  requestAnimationFrame(move);
}

setInterval(spawnEnemy, 2000);

// Character menu logic
const characterBtn = document.getElementById('characterBtn');
const characterMenu = document.getElementById('characterMenu');
const closeCharacter = document.getElementById('closeCharacter');

characterBtn.addEventListener('click', () => {
  characterMenu.classList.add('visible');
});

closeCharacter.addEventListener('click', () => {
  characterMenu.classList.remove('visible');
});
