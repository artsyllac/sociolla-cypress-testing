class LoginPage {
  // --- SELECTOR ELEMEN ---
  getSocoHeaderBtn() {
    return cy.get('#btn-login, #btn-profile a, #action-login a, a:contains("Login with")', { timeout: 15000 }).first();
  }

  getSocoModalBtn() {
    return cy.contains(/Masuk \/ Daftar dengan SOCO|Masuk.*SOCO|Daftar.*SOCO/i, { timeout: 15000 });
  }

  getLoginWithPasswordBtn() {
    return cy.contains(/Login dengan Password|Masuk dengan Password|Password/i, { timeout: 15000 });
  }

  getEmailInput() {
    return cy.get('input[name="identifier"], input[placeholder*="Email"], input[type="text"]', { timeout: 15000 }).first();
  }

  getPasswordInput() {
    return cy.get('input[name="password"], input[type="password"]', { timeout: 15000 }).first();
  }

  getSubmitButton() {
    return cy.get('button[type="submit"], button:contains("Masuk")', { timeout: 15000 }).first();
  }

  // --- PEMBERSIH POP-UP PROMO (SAFE CYPRESS JQUERY) ---
  clearPromoPopup() {
    // Gunakan Cypress.$ (jQuery) agar aman dari AssertionError jika elemen tidak ditemukan
    cy.get('body').then(($body) => {
      const closeSelectors = [
        '#popup_banner #btn-close',
        'button#btn-close',
        '.react-modal-overlay #btn-close',
        '#popup_banner .btn-close',
        '#modal-close',
        '.react-modal-overlay',
        '.modal-close',
        '.close',
        '.btn-close',
        '[aria-label="Close"]',
        '#close-popup'
      ];

      closeSelectors.forEach((selector) => {
        const $el = $body.find(selector);
        if ($el.length > 0) {
          $el.each((_, btn) => {
            try {
              Cypress.$(btn).trigger('click');
            } catch (e) {
              // Abaikan error agar tidak menggagalkan test runner
            }
          });
        }
      });
    });
  }

  // --- ALUR TINDAKAN (ACTION METHODS) ---
  // Langkah 1: Buka halaman utama Sociolla (/)
  visit() {
    cy.visit('/', { failOnStatusCode: false });
    cy.wait(2500); // Beri waktu aset dan pop-up promo selesai dimuat
    this.clearPromoPopup();
  }

  // Alur Login Lengkap (Langkah 2 s/d 6)
  login(email, password) {
    this.clearPromoPopup();

    // Langkah 2: Klik tombol "Log in with SOCO" di header Sociolla
    this.getSocoHeaderBtn().should('be.visible').click({ force: true });

    // Langkah 3 s/d 6 di domain login SOCO (https://login.soco.id)
    cy.origin('https://login.soco.id', { args: { email, password } }, ({ email, password }) => {
      // Langkah 3: Klik tombol modal "Masuk / Daftar dengan SOCO"
      cy.contains(/Masuk \/ Daftar dengan SOCO|Masuk.*SOCO|Daftar.*SOCO/i, { timeout: 15000 })
        .should('be.visible')
        .click({ force: true });

      // Langkah 4: Klik pilihan "Login dengan Password" / "Masuk dengan Password"
      cy.contains(/Login dengan Password|Masuk dengan Password|Password/i, { timeout: 15000 })
        .should('be.visible')
        .click({ force: true });

      // Langkah 5: Isi input Email / Username / No. Telp dan Password
      cy.get('input[name="identifier"], input[placeholder*="Email"], input[type="text"]', { timeout: 15000 })
        .first()
        .should('be.visible')
        .clear({ force: true })
        .type(email, { force: true });

      cy.get('input[name="password"], input[type="password"]', { timeout: 15000 })
        .first()
        .should('be.visible')
        .clear({ force: true })
        .type(password, { force: true });

      // Langkah 6: Klik tombol "Masuk"
      cy.get('button[type="submit"], button:contains("Masuk")', { timeout: 15000 })
        .first()
        .should('be.visible')
        .click({ force: true });
    });
  }

  // Verifikasi kredensial valid berhasil diterima sistem
  verifyLoginSuccess() {
    cy.origin('https://login.soco.id', () => {
      // Memastikan akun valid berhasil diautentikasi (mencapai tahap verifikasi OTP 2FA atau dashboard)
      cy.contains(/Pilih Metode Verifikasi|kode verifikasi|WhatsApp|SMS/i, { timeout: 15000 })
        .should('be.visible');
    });
  }

  // Verifikasi pesan kesalahan muncul saat kredensial salah
  verifyErrorMessage() {
    cy.origin('https://login.soco.id', () => {
      cy.get('.toasted-message, .Vue-Toastification__toast--error, [class*="error"], .toasted-container', { timeout: 10000 })
        .first()
        .should('be.visible');
    });
  }
}

export default new LoginPage();