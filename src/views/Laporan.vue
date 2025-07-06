<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Laporan Penjualan</h1>

    <!-- Ringkasan -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      <div class="bg-white p-4 rounded shadow">
        <p class="text-gray-600">Total Transaksi</p>
        <p class="text-xl font-bold text-purple-700">{{ jumlahTransaksi }}</p>
      </div>
      <div class="bg-white p-4 rounded shadow">
        <p class="text-gray-600">Total Pemasukan</p>
        <p class="text-xl font-bold text-green-600">
          Rp {{ totalPemasukan.toLocaleString() }}
        </p>
      </div>
    </div>

    <!-- Rekap Transaksi -->
    <div v-if="riwayat.length > 0" class="space-y-4">
      <div
        v-for="trx in riwayat"
        :key="trx.id"
        class="bg-white p-4 rounded shadow"
      >
        <div class="flex justify-between">
          <div>
            <p class="font-semibold">ID: {{ trx.id }}</p>
            <p class="text-sm text-gray-500">Tanggal: {{ formatTanggal(trx.tanggal) }}</p>
          </div>
          <p class="text-purple-700 font-bold">
            Rp {{ hitungTotal(trx.pesanan).toLocaleString() }}
          </p>
        </div>
      </div>
    </div>

    <div v-else class="text-gray-500">
      Tidak ada transaksi untuk dilaporkan.
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useTransaksiStore } from '@/stores/transaksiStore'

const transaksiStore = useTransaksiStore()

onMounted(() => {
  transaksiStore.fetchRiwayat()
})

const riwayat = computed(() => transaksiStore.riwayat)

const jumlahTransaksi = computed(() => riwayat.value.length)

const totalPemasukan = computed(() =>
  riwayat.value.reduce((sum, trx) => {
    return sum + trx.pesanan.reduce((s, item) => s + item.harga * item.jumlah, 0)
  }, 0)
)

const hitungTotal = (pesanan) =>
  pesanan.reduce((sum, item) => sum + item.harga * item.jumlah, 0)

const formatTanggal = (iso) => {
  const d = new Date(iso)
  return d.toLocaleString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>
