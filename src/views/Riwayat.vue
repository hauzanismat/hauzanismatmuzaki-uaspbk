<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Riwayat Transaksi</h1>

    <!-- Kosong -->
    <div v-if="riwayat.length === 0" class="text-gray-500">
      Belum ada transaksi.
    </div>

    <!-- List Riwayat -->
    <div v-else class="space-y-6">
      <div
        v-for="trx in riwayat"
        :key="trx.id"
        class="bg-white rounded shadow p-4"
      >
        <div class="flex justify-between items-center mb-2">
          <div>
            <p class="text-sm text-gray-500">
              Tanggal: {{ formatTanggal(trx.tanggal) }}
            </p>
            <p class="font-bold">ID: {{ trx.id }}</p>
          </div>
          <p class="font-semibold text-purple-700">
            Total: Rp {{ hitungTotal(trx.pesanan).toLocaleString() }}
          </p>
        </div>

        <!-- Daftar Pesanan -->
        <ul class="mt-2 space-y-1">
          <li
            v-for="item in trx.pesanan"
            :key="item.id_menu"
            class="text-sm text-gray-700 flex justify-between"
          >
            <span>{{ item.nama_menu }} x{{ item.jumlah }}</span>
            <span>Rp {{ (item.harga * item.jumlah).toLocaleString() }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useTransaksiStore } from '@/stores/transaksiStore'

const transaksiStore = useTransaksiStore()
const riwayat = transaksiStore.riwayat

onMounted(() => {
  transaksiStore.fetchRiwayat()
})

// Hitung total dari setiap transaksi
const hitungTotal = (pesanan) => {
  return pesanan.reduce(
    (sum, item) => sum + item.harga * item.jumlah,
    0
  )
}

// Format tanggal
const formatTanggal = (isoString) => {
  const date = new Date(isoString)
  return date.toLocaleString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>
