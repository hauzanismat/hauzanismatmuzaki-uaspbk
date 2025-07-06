import { defineStore } from 'pinia'
import axios from 'axios'

export const useMenuStore = defineStore('menu', {
  state: () => ({
    daftarMenu: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchMenu() {
      this.loading = true
      this.error = null
      try {
        const response = await axios.get('http://localhost:3000/menu')
        this.daftarMenu = response.data
      } catch (err) {
        this.error = 'Gagal memuat menu'
        console.error('Fetch Menu Error:', err)
      } finally {
        this.loading = false
      }
    }
  },

  getters: {
    // Jika ingin menambahkan pencarian atau filter
    cariMenu: (state) => (keyword) => {
      return state.daftarMenu.filter((item) =>
        item.nama.toLowerCase().includes(keyword.toLowerCase())
      )
    }
  }
})
