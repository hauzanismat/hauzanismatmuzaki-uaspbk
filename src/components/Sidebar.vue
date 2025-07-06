<template>
  <div class="fixed top-0 left-0 h-screen w-48 bg-purple-700 text-white flex flex-col shadow-lg">
    <div class="p-4 text-2xl font-bold border-b border-white">
      Kasir Jus
    </div>

    <nav class="flex-1 mt-4">
      <RouterLink
        to="/"
        class="block px-4 py-2 hover:bg-purple-800"
        :class="{ 'bg-purple-900': $route.name === 'transaksi' }"
      >
        Transaksi
      </RouterLink>

      <RouterLink
        to="/keranjang"
        class="block px-4 py-2 hover:bg-purple-800"
        :class="{ 'bg-purple-900': $route.name === 'keranjang' }"
      >
        Keranjang
      </RouterLink>

      <RouterLink
        to="/riwayat"
        class="block px-4 py-2 hover:bg-purple-800"
        :class="{ 'bg-purple-900': $route.name === 'profile' }"
      >
        Riwayat
      </RouterLink>

      <RouterLink
        to="/laporan"
        class="block px-4 py-2 hover:bg-purple-800"
        :class="{ 'bg-purple-900': $route.name === 'laporan' }"
      >
        Laporan
      </RouterLink>
    </nav>
  </div>
</template>

<script setup>
import { RouterLink, useRoute } from 'vue-router'
const route = useRoute()
</script>

<style scoped>
/* Optional: Tambahkan transisi halus */
.router-link-exact-active {
  font-weight: bold;
}
</style>
