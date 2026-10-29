import ProductDetailPage from '../page_objects/ProductDetailPage';
import PromoModal from '../pages_objects/PromoModal';
import CartPage from '../pages/CartPage';
import { toRupiahNumber } from '../support/utils';

const PRODUCT = {
  url: 'https://www.sociolla.com/sunscreen/73301-madagascar-centella-tone-brightening-tone-up-sunscreen-50ml?size=50ml',
  name: 'SKIN1004 Madagascar Centella Tone Brightning Tone- Up Sunscreen',
  variant: '50ml',
};
const PURCHASE_LIMIT = 100;

describe('Sociolla - Shopping Cart', () => {
  beforeEach(() => {
    ProductDetailPage.visit(PRODUCT.url);
    PromoModal.dismissIfPresent();
    ProductDetailPage.title().should('have.text', PRODUCT.name);

    ProductDetailPage.price()
      .invoke('text')
      .then(toRupiahNumber)
      .should('be.greaterThan', 0)
      .as('unitPrice');
  });

  it('AC-01: add 1 unit of an available product → cart shows correct name, variant, quantity, price and subtotal', () => {
    ProductDetailPage.selectedVariant().should('have.text', PRODUCT.variant);
    ProductDetailPage.quantity().should('have.text', '1');

    ProductDetailPage.addToCart();

    // --- Confirmation popup ---
    ProductDetailPage.confirmationModal().should('be.visible');
    ProductDetailPage.confirmationMessage().should('be.visible').and('have.text', 'Dimasukkan ke keranjang!');
    ProductDetailPage.confirmationProductName().should('have.text', PRODUCT.name);
    ProductDetailPage.confirmationVariant().should('have.text', PRODUCT.variant);

    ProductDetailPage.openCartFromConfirmation();

    // --- Cart page ---
    CartPage.waitUntilOpen();
    // Exactly one cart line: proves the cart started empty and the product was added once.
    CartPage.lineItems().should('have.length', 1);
    CartPage.itemName().should('have.text', PRODUCT.name);
    CartPage.itemVariant().should('contain.text', PRODUCT.variant);
    CartPage.itemQuantity().should('have.value', '1');

    cy.get('@unitPrice').then((unitPrice) => {
      CartPage.itemPrice().should(($price) => {
        expect(toRupiahNumber($price.text())).to.eq(unitPrice);
      });
      // Subtotal = unit price × accepted quantity (1).
      CartPage.subtotal().should(($subtotal) => {
        expect(toRupiahNumber($subtotal.text())).to.eq(unitPrice * 1);
      });
    });

    // The cart badge in the header also reflects 1 item.
    CartPage.headerCartBadge().should('have.text', '1');
  });

  it('AC-02 (guest): raise cart quantity from 100 to 101 → "Maksimum pembelian 100 pcs" warning and Checkout disabled', () => {
    ProductDetailPage.addToCart();
    ProductDetailPage.confirmationMessage().should('have.text', 'Dimasukkan ke keranjang!');
    ProductDetailPage.openCartFromConfirmation();

    CartPage.waitUntilOpen();
    CartPage.lineItems().should('have.length', 1);

    // At the limit: no warning, Checkout still available (we never click it).
    CartPage.increaseQuantityTo(PURCHASE_LIMIT);
    CartPage.quantityWarning().should('not.exist');
    CartPage.checkoutButton().should('have.class', 'btn-primary').and('not.have.class', 'btn-primary-disabled');

    // One more than the limit.
    CartPage.increaseQuantityTo(PURCHASE_LIMIT + 1);
    CartPage.quantityWarning()
      .should('be.visible')
      .and('have.text', `Maksimum pembelian ${PURCHASE_LIMIT} pcs`);
    CartPage.checkoutButton().should('have.class', 'btn-primary-disabled');
  });
});
