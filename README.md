# 🧪 E2E Automation Testing - Sociolla Website

Proyek pengujian otomatis End-to-End (E2E) untuk website [Sociolla](https://www.sociolla.com) menggunakan Cypress dan arsitektur Page Object Model (POM).

## 👥 Anggota Kelompok & Pembagian Tugas
- Callysta Cendikia Diba Putri - Modul 1: Login & Pencarian Produk (`01_login_search.cy.js`)
- Shabrina Rahmania - Modul 2: Keranjang Belanja / Cart (`02_cart.cy.js`)
- Muhammad Okto Syaifudi - Modul 3: Checkout & Pembayaran (`03_checkout.cy.js`)
- Muhammad Rafi Pramana - Modul 4: Profil & Wishlist (`04_profile_wishlist.cy.js`)

## 🛠️ Teknologi & Tools
- Framework: Cypress
- Bahasa Pemrograman: JavaScript / Node.js
- **Design Pattern**: Page Object Model (POM)

## 📁 Struktur Folder Proyek

sociolla-cypress-testing/

├── cypress/
│   ├── e2e/
│   │   ├── 01_login_search.cy.js        
│   │   ├── 02_cart.cy.js               
│   │   ├── 03_checkout.cy.js           
│   │   └── 04_payment.cy.js             
│   ├── page_objects/
│   │   ├── LoginPage.js               
│   │   ├── SearchPage.js               
│   │   ├── CartPage.js                  
│   │   ├── CheckoutPage.js              
│   │   └── PaymentPage.js               
│   └── support/
│       ├── commands.js                  
│       └── e2e.js                      
├── .gitignore                           
├── cypress.config.js                    
└── package.json                        

## ⚡ Strategi & Fitur Utama Pengujian
- Page Object Model (POM): Pemisahan tegas antara selector elemen UI/aksi halaman (page_objects/) dengan skenario pengujian utama (e2e/).
- Session Management (cy.session()): Mempertahankan status autentikasi login pengguna di seluruh test suite tanpa perlu mengulang alur login UI pada setiap skenario tes.
- Overlays & Promo Modal Handling: Injeksi CSS dinamis untuk menyembunyikan pop-up promo/iklan Sociolla yang berpotensi menghalangi interaksi elemen saat pengujian berjalan.

## 🚀 Cara Menjalankan Proyek di Lokal
### 1. Prasyarat Sistem
Sebelum menjalankan proyek, pastikan perangkat kamu sudah terinstal:
* **Node.js** (Sangat direkomendasikan versi 16.x atau lebih baru)
* **Git**

---

### 2. Kloning Repository & Install Dependencies
Buka terminal / Command Prompt, lalu jalankan perintah berikut secara berurutan:

```bash
# 1. Kloning repository proyek dari GitHub
git clone https://github.com/artsyllac/sociolla-cypress-testing.git

# 2. Masuk ke folder proyek
cd sociolla-cypress-testing

# 3. Install seluruh paket & dependensi Cypress
npm install

# 4. Jalankan Automated Testing
npx cypress open

- Pilih menu E2E Testing.
- Pilih browser yang ingin digunakan (misal: Chrome / Electron), lalu klik Start E2E Testing.
- Klik file spec pengujian yang ingin dijalankan (01_login_search.cy.js, 02_cart.cy.js, dsb).
