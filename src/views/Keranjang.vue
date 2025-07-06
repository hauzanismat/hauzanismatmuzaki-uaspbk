<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Keranjang</h1>

    <!-- Kosong -->
    <div v-if="keranjang.length === 0" class="text-gray-500">
      Keranjang masih kosong.
    </div>

    <!-- Daftar Item -->
    <div v-else class="space-y-4">
      <div
        v-for="item in keranjang"
        :key="item.id_menu"
        class="flex items-center justify-between bg-white shadow rounded p-4"
      >
        <div>
          <h2 class="font-semibold">{{ item.nama_menu }}</h2>
          <p class="text-sm text-gray-500">Rp {{ item.harga.toLocaleString() }} x {{ item.jumlah }}</p>
        </div>
        <div>
          <p class="font-bold text-purple-700">Rp {{ (item.harga * item.jumlah).toLocaleString() }}</p>
          <button
            @click="hapusItem(item.id_menu)"
            class="mt-1 text-xs text-red-600 hover:underline"
          >
            Hapus
          </button>
        </div>
      </div>

      <!-- Total & Checkout -->
      <div class="text-right mt-6">
        <p class="text-lg font-bold mb-2">
          Total: Rp {{ totalHarga.toLocaleString() }}
        </p>
        <button
          @click="checkout"
          class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded"
        >
          Checkout
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTransaksiStore } from '@/stores/transaksiStore'

const transaksiStore = useTransaksiStore()

const keranjang = computed(() => transaksiStore.keranjang)
const totalHarga = computed(() => transaksiStore.totalHarga)

const hapusItem = (id_menu) => {
  transaksiStore.hapusDariKeranjang(id_menu)
}

const checkout = async () => {
  await transaksiStore.checkout()
  alert('Checkout berhasil!')
}
</script>
