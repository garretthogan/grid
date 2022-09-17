<script setup>
import { provide } from '@vue/runtime-core';
import { RouterView } from 'vue-router';

const prod = 'wss://grid-net.onrender.com';
const local = 'ws://localhost:3000';

const socketUrl = import.meta.env.VITE_IS_DEV === 'true' ? local : prod;

const socket = new WebSocket(socketUrl);
socket.onopen = () => console.log('client opened socket');
socket.onclose = () => console.log('socket closed');
socket.onmessage = (data) => {
  console.log(data);
};

provide('socket', socket);
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
