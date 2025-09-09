// Paths to images. Replace the files in the assets folder to customize.
const heroImage = 'assets/hero.png';
const swordImage = 'assets/sword.png';

const hero = document.getElementById('hero');
hero.src = heroImage;
const gameArea = document.getElementById('game');

// Hero stats and equipment
const heroStats = { hp: 100, baseAttack: 0, attack: 0 };
const weapon = { attack: 2, img: swordImage };
heroStats.attack = heroStats.baseAttack + weapon.attack;
document.getElementById('weaponSlot').src = weapon.img;

let killCount = 0;
const killDisplay = document.getElementById('killCount');
const heroHpDisplay = document.getElementById('heroHp');
function updateDisplays() {
  killDisplay.textContent = `Enemies defeated: ${killCount}`;
  heroHpDisplay.textContent = `HP: ${heroStats.hp}`;
}

let currentEnemy = null;

// Configuration for enemy spawning
const ENEMIES_PER_STAGE = 10; // Change to set how many foes share the same level
const SUBLEVELS_PER_WORLD = 3; // Produces level strings like 1.1, 1.2...

function getLevelInfo(count) {
  const stage = Math.floor(count / ENEMIES_PER_STAGE);
  const world = Math.floor(stage / SUBLEVELS_PER_WORLD) + 1;
  const sub = (stage % SUBLEVELS_PER_WORLD) + 1;
  const level = `${world}.${sub}`;
  const hp = (stage + 1) * 10;
  return { level, hp };
}

function spawnEnemy() {
  if (currentEnemy) return;
  const enemyEl = document.createElement('img');
  const { level, hp } = getLevelInfo(killCount);
  enemyEl.src = `assets/enemy${level}.png`;
  enemyEl.className = 'enemy';
  enemyEl.style.left = gameArea.offsetWidth + 'px';
  gameArea.appendChild(enemyEl);

  const enemy = { element: enemyEl, hp, attack: 1 };
  currentEnemy = enemy;

  let position = gameArea.offsetWidth;
  const speed = 2 + Math.random() * 2;

  function move() {
    if (currentEnemy !== enemy) return;
    position -= speed;
    enemyEl.style.left = position + 'px';

    if (position < hero.offsetLeft + hero.offsetWidth) {
      enemyEl.style.left = hero.offsetLeft + hero.offsetWidth + 'px';
      startCombat(enemy);
      return;
    }
    requestAnimationFrame(move);
  }
  requestAnimationFrame(move);
}

function startCombat(enemy) {
  const interval = setInterval(() => {
    enemy.hp -= heroStats.attack;
    heroStats.hp -= enemy.attack;
    updateDisplays();

    if (heroStats.hp <= 0) {
      clearInterval(interval);
      alert('Game Over');
      return;
    }
    if (enemy.hp <= 0) {
      clearInterval(interval);
      enemy.element.remove();
      killCount++;
      currentEnemy = null;
      updateDisplays();
      spawnEnemy();
    }
  }, 1000);
}

updateDisplays();
spawnEnemy();

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
