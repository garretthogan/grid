<script setup>
import { inject, onMounted, reactive, ref } from '@vue/runtime-core';
import { Color, Object3D } from 'three';

import { generateWorldMesh } from '../utils/mesh.js';

import ambientLight from '../utils/ambientLight';
import directionalLight from '../utils/directionalLight';
import renderer from '../utils/renderer';
import scene from '../utils/scene';
import stats from '../utils/stats.js';
import clock from '../utils/clock.js';
import Pawn, { RemotePawn } from '../utils/Pawn.js';

import World from '../utils/World.js';
import CreateLobbyButton from './CreateLobbyButton.vue';
import JoinLobbyButton from './JoinLobbyButton.vue';
import throttle from 'lodash.throttle';

const socket = inject('socket');

const worldWidth = 128;
const worldDepth = 128;

const pawn = new Pawn();
const world = new World(worldWidth, worldDepth);

const joinKey = ref(null);
const lobbyName = ref(null);

onMounted(() => {
  socket.onmessage = handleNetowrkedEvent;

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

function updateMovement() {
  if (pawn.clientId) {
    socket.send(
      JSON.stringify({ type: POSITION_UPDATE, payload: pawn.camera.position })
    );
    socket.send(
      JSON.stringify({ type: ROTATION_UPDATE, payload: pawn.camera.rotation })
    );
  }
}

const throttledUpdateMovement = throttle(updateMovement, 100);

function animate() {
  requestAnimationFrame(animate);

  render();
  stats.update();

  throttledUpdateMovement();
}

const POSITION_UPDATE = 'position update';
const ROTATION_UPDATE = 'rotation update';
function render() {
  pawn.update(clock.getDelta());
  renderer.render(scene, pawn.camera);
}

// networking
const SERVER_CREATED_LOBBY = 'server created lobby';
const SERVER_CLIENT_JOINED = 'server client joined';
const SERVER_POSITION_UPDATE = 'server position update';

function onJoinLobby(lobbyId, clientId) {
  pawn.clientId = clientId;

  console.log('i just joined a new lobby!', lobbyId);
}

function onCreateLobby(lobbyId, clientId) {
  pawn.clientId = clientId;

  console.log('i just created a lobby!', lobbyId);
}

const remotePawns = new Map();
function onRemoteClientJoined(clientId) {
  const newRemotePawn = new RemotePawn();
  scene.add(newRemotePawn);
  remotePawns.set(clientId, newRemotePawn);
  console.log('a remote player just joined my lobby!', clientId);
}

function updateRemotePawnPosition(clientId, position) {
  console.log('remote pawns', remotePawns.values());
}

function handleNetowrkedEvent(event) {
  const parsed = JSON.parse(event.data);
  const clientId = parsed.payload?.clientId;
  const lobbyId = parsed.payload?.lobbyId;
  const position = parsed.payload?.position;

  switch (parsed.type) {
    case SERVER_POSITION_UPDATE:
      if (pawn.clientId === clientId) {
      } else if (pawn.clientId && clientId && clientId !== pawn.clientId) {
        updateRemotePawnPosition(clientId, position);
      }
      break;
    case SERVER_CREATED_LOBBY:
      onCreateLobby(lobbyId, clientId);
      break;
    case SERVER_CLIENT_JOINED:
      if (pawn.clientId) {
        onRemoteClientJoined(clientId);
      } else {
        onJoinLobby(lobbyId, clientId);
      }
      break;
  }
}
</script>

<template>
  <input v-model="joinKey" class="join-key-input" placeholder="join key" />
  <input
    v-model="lobbyName"
    class="lobby-name-input"
    placeholder="lobby name"
  />
  <JoinLobbyButton :joinKey="joinKey" />
  <CreateLobbyButton :lobbyName="lobbyName" />
  <div id="container"></div>
</template>

<style scoped>
.join-key-input {
  position: absolute;
  right: 512px;
  z-index: 1;
}

.lobby-name-input {
  position: absolute;
  right: 256px;
  z-index: 1;
}
</style>
