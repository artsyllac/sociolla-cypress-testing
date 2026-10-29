const selectors = {
  modal: '#popup_banner',
  closeButton: '#popup_banner #btn-close',
};

class PromoModal {
  modal() {
    return cy.get(selectors.modal);
  }

  // Closes the popup only when it is currently visible; does nothing (and does not
  // fail) when it is absent. Call it after the page content has loaded.
  dismissIfPresent() {
    cy.get('body').then(($body) => {
      if ($body.find(`${selectors.modal}:visible`).length === 0) {
        cy.log('Promo popup not shown - nothing to close');
        return;
      }
      cy.log('Promo popup shown - closing it');
      cy.get(selectors.closeButton).click();
      // Passes whether the popup is removed from the page or only hidden.
      cy.get(`${selectors.modal}:visible`).should('not.exist');
    });
  }
}

export default new PromoModal();
