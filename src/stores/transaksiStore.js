import { defineStore } from 'pinia'
import axios from 'axios'

export const useTransaksiStore = defineStore('transaksi', {
  state: () => ({
    keranjang: [],
    riwayat: [],
    laporanTotal: 0
  }),

  getters: {
    totalHarga: (state) =>
      state.keranjang.reduce((sum, item) => sum + item.harga * item.jumlah, 0),

    totalItem: (state) =>
      state.keranjang.reduce((sum, item) => sum + item.jumlah, 0)
  },

  actions: {
    // Tambah item ke keranjang
    tambahKeKeranjang(menu) {
      const existing = this.keranjang.find(item => item.id_menu === menu.id)
      if (existing) {
        existing.jumlah++
      } else {
        this.keranjang.push({
          id_menu: menu.id,
          nama_menu: menu.nama,
          harga: menu.harga,
          jumlah: 1
        })
      }
    },

    // Hapus item dari keranjang
    hapusDariKeranjang(id_menu) {
      this.keranjang = this.keranjang.filter(item => item.id_menu !== id_menu)
    },

    // Kosongkan keranjang
    kosongkanKeranjang() {
      this.keranjang = []
    },

    // Checkout dan simpan ke JSON Server
    async checkout() {
      const transaksiBaru = {
        id: Date.now().toString(),
        tanggal: new Date().toISOString(),
        pesanan: this.keranjang.map(item => ({
          id_menu: item.id_menu,
          nama_menu: item.nama_menu,
          harga: item.harga,
          jumlah: item.jumlah
        }))
      }

      try {
        await axios.post('http://localhost:3000/transaksi', transaksiBaru)
        this.kosongkanKeranjang()
      } catch (error) {
        console.error('Gagal melakukan checkout:', error)
      }
    },

    // Ambil riwayat transaksi
    async fetchRiwayat() {
      try {
        const res = await axios.get('http://localhost:3000/transaksi')
        this.riwayat = res.data
      } catch (error) {
        console.error('Gagal ambil riwayat:', error)
      }
    },

    // Hitung total dari semua transaksi
    async fetchLaporanTotal() {
      try {
        const res = await axios.get('http://localhost:3000/transaksi')
        const data = res.data

        const total = data.reduce((sum, trx) => {
          return sum + trx.pesanan.reduce((subSum, item) => {
            return subSum + (item.harga * item.jumlah)
          }, 0)
        }, 0)

        this.laporanTotal = total
      } catch (error) {
        console.error('Gagal ambil laporan:', error)
      }
    }
  }
})
