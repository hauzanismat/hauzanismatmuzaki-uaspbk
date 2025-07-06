
# 🧾 Aplikasi Kasir UMKM Jus — Vue + Pinia + JSON Server

Aplikasi ini dibuat untuk membantu **UMKM (Usaha Mikro Kecil Menengah)** dalam melakukan penjualan minuman seperti **jus**, dengan fitur pencatatan transaksi, pengelolaan keranjang, serta laporan penjualan.

## 🚀 Teknologi yang Digunakan

- **Vue 3**
- **Pinia** (state management)
- **Tailwind CSS** (UI styling)
- **Vue Router**
- **JSON Server** (mock API backend)

## 📱 Fitur Aplikasi

### 1. Transaksi
- Menampilkan daftar menu minuman
- Fitur pencarian menu
- Menambahkan item ke **keranjang**
- Indikator jumlah item di keranjang

### 2. Keranjang
- Menampilkan isi keranjang
- Hapus item dari keranjang
- Checkout untuk menyimpan transaksi ke database

### 3. Riwayat Transaksi
- Menampilkan daftar transaksi yang telah dilakukan
- Menampilkan detail pesanan tiap transaksi
- Menampilkan total harga dan tanggal transaksi

### 4. Laporan
- Menampilkan total transaksi dan total pemasukan
- Rekap transaksi per hari

## ✅ Masalah yang Diselesaikan

| Masalah                                                                 | Solusi                                                                 |
|-------------------------------------------------------------------------|------------------------------------------------------------------------|
| Pelaku UMKM kesulitan mencatat transaksi harian                        | Aplikasi ini menyimpan semua transaksi ke backend secara otomatis     |
| Tidak tahu total pendapatan harian/bulanan                             | Tersedia fitur **Laporan** yang menghitung pemasukan dari semua transaksi |
| Kurangnya efisiensi pencatatan menu dan pesanan                        | Fitur keranjang dengan UI cepat & sederhana                           |
| Sulit melakukan pencarian menu yang banyak                             | Tersedia **fitur search menu**                                        |

## 🔀 Routingan Vue

| Path             | Komponen        | Deskripsi                                |
|------------------|------------------|-------------------------------------------|
| `/`              | `Transaksi.vue` | Halaman utama untuk memilih dan menambahkan pesanan |
| `/keranjang`     | `Keranjang.vue` | Menampilkan keranjang dan tombol checkout |
| `/riwayat`       | `Riwayat.vue`   | Daftar transaksi yang telah dilakukan     |
| `/laporan`       | `Laporan.vue`   | Ringkasan pemasukan dan jumlah transaksi  |

## 🔗 Endpoint JSON Server

Pastikan JSON Server berjalan di:  
`http://localhost:3000`

### 📦 Menu
```
GET    /menu              # Ambil semua menu
```

### 🧾 Transaksi
```
GET    /transaksi         # Ambil semua transaksi
POST   /transaksi         # Simpan transaksi baru
```

## 💡 Menjalankan Project

### 1. Install dependencies
```
npm install
```

### 2. Jalankan JSON Server
```
npx json-server --watch db.json --port 3000
```

### 3. Jalankan Vue App
```
npm run dev
```

## ✍️ Penutup

Aplikasi ini sangat cocok untuk digunakan oleh usaha kecil seperti kios jus, stand minuman, atau kafe kecil yang ingin mencatat transaksi tanpa sistem kasir yang mahal.

