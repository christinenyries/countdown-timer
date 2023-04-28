<script setup lang="ts">
import PageHome from '@/pages/PageHome.vue'
</script>

<template>
  <main class="container">
    <PageHome />
  </main>
</template>

<style scoped>
.container {
  width: 360px;
  height: 160px;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -180px;
  margin-top: -160px;
}
</style>
