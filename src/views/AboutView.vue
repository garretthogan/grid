<script setup>
import SpinningBalls from '../components/SpinningBalls.vue';
import MinecraftWorld from '../components/MinecraftWorld.vue';
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <MinecraftWorld />
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
