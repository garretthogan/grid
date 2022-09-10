<script setup>
import { onMounted } from '@vue/runtime-core';
import { Color } from 'three';

import { generateWorldMesh } from '../utils/mesh.js';

import ambientLight from '../utils/ambientLight';
import directionalLight from '../utils/directionalLight';
import renderer from '../utils/renderer';
import scene from '../utils/scene';
import stats from '../utils/stats.js';
import clock from '../utils/clock.js';
import Pawn from '../utils/Pawn.js';

import World from '../utils/World.js';

const worldWidth = 128;
const worldDepth = 128;

const pawn = new Pawn();
const world = new World(worldWidth, worldDepth);

onMounted(() => {
  const container = document.getElementById('container');
  container.appendChild(stats.dom);
  container.appendChild(renderer.domElement);

  scene.background = new Color(0xbfd1e5);
  scene.add(ambientLight);
  scene.add(directionalLight);

  const worldMesh = generateWorldMesh(world);
  scene.add(worldMesh);

  const startY = world.getY(worldWidth / 2, worldDepth / 2) * 100 + 100;
  pawn.register(renderer);
  pawn.camera.position.y = startY;

  animate();

  window.addEventListener('resize', onWindowResize);
});

function onWindowResize() {
  pawn.handleResize();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);

  render();
  stats.update();
}

function render() {
  pawn.update(clock.getDelta());
  renderer.render(scene, pawn.camera);
}
</script>

<template>
  <div id="container"></div>
</template>

<style scoped></style>
