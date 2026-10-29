const PATH = '/order';

const selectors = {
  lineItems: '#product-list-cart .cart-content-item',
  itemName: '#product-list-cart .cart-content-item .name',
  itemVariant: '#product-list-cart .cart-content-item .list-variant',
  itemQuantity: '#product-list-cart .cart-content-item input[type="number"]',
  itemPrice: '#product-list-cart .cart-content-item .final-price',
  increaseQuantityButton: '#btn-increase-product',
  quantityWarning: '#product-list-cart .warning-text',
  subtotal: '.subtotal-container .subtotal .price',
  // Read-only: the tests must never click Checkout.
  checkoutButton: '#btn-checkout',
  // Cart badge in the site header (shown on every page, including this one).
  headerCartBadge: '#cart-counter .cart-counter p',
};

class CartPage {
  // Waits until the browser is on the cart page and the cart list has rendered.
  waitUntilOpen() {
    cy.location('pathname').should('eq', PATH);
    cy.get(selectors.lineItems).should('exist');
  }

  lineItems() {
    return cy.get(selectors.lineItems);
  }

  itemName() {
    return cy.get(selectors.itemName);
  }

  itemVariant() {
    return cy.get(selectors.itemVariant);
  }

  itemQuantity() {
    return cy.get(selectors.itemQuantity);
  }

  itemPrice() {
    return cy.get(selectors.itemPrice);
  }

  subtotal() {
    return cy.get(selectors.subtotal);
  }

  quantityWarning() {
    return cy.get(selectors.quantityWarning);
  }

  checkoutButton() {
    return cy.get(selectors.checkoutButton);
  }

  headerCartBadge() {
    return cy.get(selectors.headerCartBadge);
  }

  // Clicks "+" until the line reaches `target`. Only the "+" button changes the cart
  // quantity (typed values are not saved), and each click waits for the new value
  // so no click is lost.
  increaseQuantityTo(target) {
    this.itemQuantity()
      .invoke('val')
      .then((current) => {
        for (let qty = Number(current) + 1; qty <= target; qty++) {
          cy.get(selectors.increaseQuantityButton).click();
          this.itemQuantity().should('have.value', String(qty));
        }
      });
  }
}

export default new CartPage();
