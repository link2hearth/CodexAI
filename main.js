import { getAsset } from './assets.js';

const WORLD_ORDER = ['prairie', 'forest', 'dunes', 'cave', 'temple'];
let currentWorld = 1;

const hero = document.getElementById('hero');
hero.src = getAsset('hero');
const gameArea = document.getElementById('game');
const bgContainer = document.getElementById('background');
const worldNameDisplay = document.getElementById('worldName');
const enemyLevelDisplay = document.getElementById('enemyLevel');

// Hero stats and equipment
const heroStats = { hp: 100, baseAttack: 0, attack: 0 };
const weapon = { attack: 2, img: getAsset('equipment', 'weapon') };
heroStats.attack = heroStats.baseAttack + weapon.attack;
document.getElementById('weaponSlot').src = weapon.img;

let killCount = 0;
const killDisplay = document.getElementById('killCount');
const heroHpDisplay = document.getElementById('heroHp');
function setBackground(worldIndex) {
  const name = WORLD_ORDER[worldIndex - 1];
  const path = getAsset('backgrounds', name);
  bgContainer.innerHTML = '';
  if (!path) return;

  const isVideo = /\.(mp4|webm|ogg)$/i.test(path);
  const el = document.createElement(isVideo ? 'video' : 'img');
  el.src = path;
  if (isVideo) {
    el.autoplay = true;
    el.loop = true;
    el.muted = true;
    el.playsInline = true;
  }
  bgContainer.appendChild(el);

}

function updateDisplays() {
  killDisplay.textContent = `Enemies defeated: ${killCount}`;
  heroHpDisplay.textContent = `HP: ${heroStats.hp}`;
}

let currentEnemy = null;


// Enemy configuration
const MAX_SLIME_RARITY = 7;
const AUTO_ATTACK_INTERVAL = 500; // ms
const CLICK_DAMAGE = 1;

function spawnEnemy() {
  if (currentEnemy) return;
  const enemyEl = document.createElement('img');

  const rarity = Math.floor(Math.random() * MAX_SLIME_RARITY) + 1;
  enemyEl.src = `assets/enemies/slime${rarity}.png`;

  enemyEl.className = 'enemy';
  enemyEl.style.left = gameArea.offsetWidth + 'px';
  gameArea.appendChild(enemyEl);

  const hp = rarity * 10;
  const attack = rarity;
  const enemy = { element: enemyEl, hp, attack };
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

function applyDamage(amount, interval) {
  if (!currentEnemy) return;
  currentEnemy.hp -= amount;
  updateDisplays();

  if (currentEnemy.hp <= 0) {
    if (interval) clearInterval(interval);
    currentEnemy.element.remove();
    killCount++;
    currentEnemy = null;
    spawnEnemy();
  }
}

function startCombat(enemy) {
  const interval = setInterval(() => {
    applyDamage(heroStats.attack, interval);
    heroStats.hp -= enemy.attack;
    updateDisplays();

    if (heroStats.hp <= 0) {
      clearInterval(interval);
      alert('Game Over');
    }
  }, AUTO_ATTACK_INTERVAL);
}

gameArea.addEventListener('click', () => {
  applyDamage(CLICK_DAMAGE);
});

function resizeGame() {
  const topBar = document.getElementById('topBar');
  gameArea.style.height = window.innerHeight - topBar.offsetHeight + 'px';
}

window.addEventListener('resize', resizeGame);
resizeGame();
setBackground(currentWorld);
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
