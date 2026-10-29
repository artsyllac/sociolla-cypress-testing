import loginPage from '../page_objects/LoginPage';
import searchPage from '../page_objects/SearchPage';

describe('Orang 1: Modul Login dan Pencarian Produk Sociolla', () => {

  // ==========================================
  // 1. MODUL FITUR LOGIN
  // ==========================================
  context('Fitur Login', () => {
    beforeEach(() => {
      loginPage.visit();
    });

    it('Harus berhasil login dengan kredensial yang valid', () => {
      // Masukkan email dan password akun uji coba
      loginPage.login('zqlwrna@gmail.com', 'Dohoonie24/7');

      // Assertion: Memastikan akun berhasil diautentikasi (mencapai tahap verifikasi OTP / dashboard)
      loginPage.verifyLoginSuccess();
    });

    it('Harus gagal login dan menampilkan pesan kesalahan jika password salah', () => {
      loginPage.login('zqlwrna@gmail.com', 'PasswordSalah123');

      // Assertion: Memastikan pesan error muncul
      loginPage.verifyErrorMessage();
    });
  });

  // ==========================================
  // 2. MODUL FITUR PENCARIAN PRODUK
  // ==========================================
  context('Fitur Pencarian Produk', () => {
    it('Harus menampilkan daftar produk yang sesuai saat mencari "skin1004 sunscreen"', () => {
      searchPage.visit();

      // Melakukan pencarian spesifik produk Skin1004 Sunscreen
      searchPage.searchProduct('skin1004 sunscreen');

      // Assertion: Memastikan URL memuat keyword dan kartu produk muncul
      cy.url({ timeout: 15000 }).should('include', 'skin1004');
      searchPage.getProductCard().should('have.length.greaterThan', 0);
    });
  });

});