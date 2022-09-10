import { ImprovedNoise } from 'three/examples/jsm/math/ImprovedNoise.js';

export function generateHeight(width, height) {
  const data = [],
    perlin = new ImprovedNoise(),
    size = width * height,
    z = Math.random() * 100;

  let quality = 2;

  for (let j = 0; j < 4; j++) {
    if (j === 0) for (let i = 0; i < size; i++) data[i] = 0;

    for (let i = 0; i < size; i++) {
      const x = i % width,
        y = (i / width) | 0;
      data[i] += perlin.noise(x / quality, y / quality, z) * quality;
    }

    quality *= 4;
  }

  return data;
}

export default class World {
  constructor(width, depth) {
    this.width = width;
    this.depth = depth;
    this.data = generateHeight(width, depth);

    this.getY = this.getY.bind(this);
  }
  getY(x, z) {
    return (this.data[x + z * this.width] * 0.15) | 0;
  }
}
