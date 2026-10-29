const selectors = {
  title: '#product-description h1',
  price: '#price-components .main-price',
  selectedSize: '#combination-size.selected-size',
  // The quantity counter has no id or label, so we rely on its structure; the number is a <p>.
  quantity: '.product-sidebar-container .counter p',
  // The visible text lives in a <span>; the clickable element is its parent <a role="button">.
  addToCartButton: 'a[role="button"][aria-label="Masukkan keranjang"]',

  confirmationModal: '#add_to_bag_modal',
  confirmationMessage: '#add_to_bag_modal .action-container p',
  confirmationProductName: '#add_to_bag_modal .name',
  confirmationVariant: '#add_to_bag_modal .variation',
  viewCartButton: '#add_to_bag_modal a[role="button"][aria-label="Lihat Keranjang"]',
};

class ProductDetailPage {
  visit(url) {
    cy.visit(url);
    // Product details are loaded by an API call after the page opens, so wait
    // (up to 15s) for the product title before interacting with the page.
    cy.get(selectors.title, { timeout: 15000 }).should('be.visible');
  }

  title() {
    return cy.get(selectors.title);
  }

  selectedVariant() {
    return cy.get(selectors.selectedSize);
  }

  quantity() {
    return cy.get(selectors.quantity);
  }

  price() {
    return cy.get(selectors.price);
  }

  addToCart() {
    cy.get(selectors.addToCartButton).click();
  }

  // --- Add-to-cart confirmation popup ---

  confirmationModal() {
    return cy.get(selectors.confirmationModal);
  }

  confirmationMessage() {
    return cy.get(selectors.confirmationMessage);
  }

  confirmationProductName() {
    return cy.get(selectors.confirmationProductName);
  }

  confirmationVariant() {
    return cy.get(selectors.confirmationVariant);
  }

  // Clicks "Lihat Keranjang" in the confirmation popup (navigates to the cart page).
  openCartFromConfirmation() {
    cy.get(selectors.viewCartButton).click();
  }
}

export default new ProductDetailPage();
