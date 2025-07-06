import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import axios from 'axios'
import { useMenuStore } from '@/stores/menuStore'

vi.mock('axios')

describe('menuStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('fetchMenu - berhasil mengambil data menu', async () => {
    const dummyMenu = [
      { id: '1', nama: 'Jus Mangga', harga: 10000 },
      { id: '2', nama: 'Jus Alpukat', harga: 12000 }
    ]
    axios.get.mockResolvedValue({ data: dummyMenu })

    const store = useMenuStore()
    await store.fetchMenu()

    expect(store.daftarMenu).toEqual(dummyMenu)
    expect(store.loading).toBe(false)
    expect(store.error).toBeNull()
  })

  it('fetchMenu - gagal mengambil data menu', async () => {
    axios.get.mockRejectedValue(new Error('Network Error'))

    const store = useMenuStore()
    await store.fetchMenu()

    expect(store.daftarMenu).toEqual([])
    expect(store.loading).toBe(false)
    expect(store.error).toBe('Gagal memuat menu')
  })

  it('cariMenu - filter menu berdasarkan keyword', () => {
    const store = useMenuStore()
    store.daftarMenu = [
      { id: '1', nama: 'Jus Mangga', harga: 10000 },
      { id: '2', nama: 'Jus Alpukat', harga: 12000 },
      { id: '3', nama: 'Teh Manis', harga: 5000 }
    ]

    const hasil = store.cariMenu('jus')
    expect(hasil.length).toBe(2)
    expect(hasil.map(i => i.nama)).toContain('Jus Mangga')
    expect(hasil.map(i => i.nama)).toContain('Jus Alpukat')
  })
})
