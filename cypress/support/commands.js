// ***********************************************
// Custom Commands for Cypress
// ***********************************************

Cypress.Commands.add('loginSession', (email, password) => {
  cy.session([email, password], () => {
    cy.visit('/', { failOnStatusCode: false });
    cy.wait(2500);

    // Bersihkan pop-up promo jika ada
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
              // Abaikan error agar tidak memicu kegagalan tes
            }
          });
        }
      });
    });

    // Langkah 2: Klik Log in with SOCO di Header
    cy.get('#btn-login, #btn-profile a, #action-login a, a:contains("Login with")', { timeout: 15000 })
      .first()
      .should('be.visible')
      .click({ force: true });

    // Langkah 3 s/d 6 di domain login SOCO (https://login.soco.id)
    cy.origin('https://login.soco.id', { args: { email, password } }, ({ email, password }) => {
      // Langkah 3: Klik modal "Masuk / Daftar dengan SOCO"
      cy.contains(/Masuk \/ Daftar dengan SOCO|Masuk.*SOCO|Daftar.*SOCO/i, { timeout: 15000 })
        .should('be.visible')
        .click({ force: true });

      // Langkah 4: Klik "Login dengan Password" / "Masuk dengan Password"
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
  });
});