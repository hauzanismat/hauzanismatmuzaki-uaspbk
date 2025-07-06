<script setup>
import Sidebar from './components/Sidebar.vue';
</script>

<template>
  <Sidebar />
  <div class="ml-48">
    <router-view />
  </div>
</template>

<style scoped></style>
