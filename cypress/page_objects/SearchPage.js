class SearchPage {
  // Selector elemen input pencarian (tahan terhadap perubahan dinamis placeholder promo / class Sociolla)
  getSearchInput() {
    return cy.get('#main-search-input, input[name="main-search-input"], input[placeholder*="LUXCRIME"], input[placeholder*="Cari"], input[type="text"]', { timeout: 15000 }).first();
  }

  // Selector elemen kartu produk (mendukung berbagai layout dan variasi class Sociolla)
  getProductCard() {
    return cy.get('.product-container, .product-detail, [class*="product-container"], [class*="product-card"], .product-item', { timeout: 15000 });
  }

  // Pembersih pop-up promo yang aman tanpa memicu AssertionError
  clearPromoPopup() {
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
              // Abaikan jika ada error pada event
            }
          });
        }
      });
    });
  }

  // Membuka halaman utama Sociolla
  visit() {
    cy.visit('/', { failOnStatusCode: false });
    cy.wait(2500); // Beri jeda agar pop-up promo selesai memuat
    this.clearPromoPopup();
  }

  // Menjalankan pencarian kata kunci produk
  searchProduct(keyword) {
    this.clearPromoPopup();

    this.getSearchInput()
      .should('be.visible')
      .clear({ force: true })
      .type(keyword, { force: true });

    // Sociolla menampilkan dropdown saran pencarian (search "... in Sociolla")
    cy.wait(1500);
    cy.contains(new RegExp(`search .* in Sociolla|${keyword}`, 'i'), { timeout: 10000 })
      .first()
      .click({ force: true });
  }
}

export default new SearchPage();