<script setup>
import { inject } from '@vue/runtime-core';

const socket = inject('socket');
defineProps({ lobbyName: String });
const CREATE_LOBBY = 'create lobby';
</script>

<template>
  <button
    @click="
      socket.send(JSON.stringify({ type: CREATE_LOBBY, payload: lobbyName }))
    "
  >
    create lobby
  </button>
</template>

<style scoped>
button {
  position: absolute;
  right: 0;
  z-index: 1;
}
</style>
