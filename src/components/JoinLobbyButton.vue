<script setup>
import { inject } from '@vue/runtime-core';

defineProps({ joinKey: String });
const socket = inject('socket');
</script>

<template>
  <button
    @click="
      socket.send(
        JSON.stringify({
          type: 'join lobby',
          payload: joinKey,
        })
      )
    "
  >
    join lobby
  </button>
</template>

<style scoped>
button {
  position: absolute;
  right: 128px;
  z-index: 1;
}
</style>
