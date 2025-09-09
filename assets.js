export const ASSETS = {
  hero: 'assets/hero.png',
  equipment: {
    armor: 'assets/equipment/armor.png',
    weapon: 'assets/equipment/sword.png',
    shoes: 'assets/equipment/shoes.png',
    ring: 'assets/equipment/ring.png',
    necklace: 'assets/equipment/necklace.png',
    chest: 'assets/equipment/chest.png',
    helmet: 'assets/equipment/helmet.png'
  },
  enemies: {
    slime: 'assets/enemies/slime.png',
    bat: 'assets/enemies/bat.png',
    snake: 'assets/enemies/snake.png',
    shroom: 'assets/enemies/shroom.png',
    goblin: 'assets/enemies/goblin.png'
  },
  backgrounds: {
    prairie: 'assets/backgrounds/prairie.png',
    forest: 'assets/backgrounds/forest.png',
    dunes: 'assets/backgrounds/dunes.png',
    cave: 'assets/backgrounds/cave.png',
    temple: 'assets/backgrounds/temple.png'
  }
};

export function getAsset(category, key) {
  return key ? ASSETS[category]?.[key] : ASSETS[category];
}
