<template>
  <div class="p-4">
    <!-- Judul & Keranjang -->
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Transaksi</h1>

      <!-- Indikator Keranjang -->
      <button @click="router.push('/keranjang')" class="relative inline-block">
        <span class="bg-purple-600 text-white px-3 py-1 rounded-full">
          🛒 Keranjang
          <span
            v-if="totalItem > 0"
            class="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-purple-600 bg-white rounded-full"
          >
            {{ totalItem }}
          </span>
        </span>
      </button>
    </div>

    <!-- Search -->
    <input
      v-model="keyword"
      type="text"
      placeholder="Cari menu..."
      class="w-full md:w-1/3 p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
    />

    <!-- Grid Menu -->
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      <div
        v-for="item in hasilPencarian"
        :key="item.id"
        class="bg-white rounded-lg shadow p-4 hover:shadow-md transition"
      >
        <h2 class="font-semibold text-lg">{{ item.nama }}</h2>
        <p class="text-sm text-gray-500 mb-2">Rp {{ item.harga.toLocaleString() }}</p>
        <button
          @click="transaksiStore.tambahKeKeranjang(item)"
          class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1 rounded text-sm"
        >
          Tambah
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { createRouter, RouterLink } from 'vue-router'
import { useMenuStore } from '@/stores/menuStore.js'
import { useTransaksiStore } from '@/stores/transaksiStore.js'
import { useRouter } from 'vue-router'

const router = createRouter()

const menuStore = useMenuStore()
const transaksiStore = useTransaksiStore()

const keyword = ref('')

// Ambil menu saat halaman dibuka
onMounted(() => {
  menuStore.fetchMenu()
})

// Gunakan getter pencarian dari menuStore
const hasilPencarian = computed(() =>
  keyword.value
    ? menuStore.cariMenu(keyword.value)
    : menuStore.daftarMenu
)

// Total item keranjang
const totalItem = computed(() => transaksiStore.totalItem)
</script>
