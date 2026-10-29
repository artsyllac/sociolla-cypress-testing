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

```text
sociolla-cypress-testing/
├── cypress/
│   ├── e2e/
│   │   ├── 01_login_search.cy.js     
│   │   ├── 02_cart.cy.js          
│   │   ├── 03_checkout.cy.js         
│   │   └── 04_profile_wishlist.cy.js  
│   ├── page_objects/
│   │   ├── LoginPage.js             
│   │   ├── SearchPage.js              
│   │   ├── CartPage.js                
│   │   ├── CheckoutPage.js          
│   │   └── ProfilePage.js         
│   ├── fixtures/                     
│   │   └── userData.json
│   └── support/                   
│       ├── commands.js
│       └── e2e.js
├── cypress.config.js
├── package.json                   
├── .gitignore                        
└── README.md
