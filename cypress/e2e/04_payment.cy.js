import PaymentPage from '../page_objects/PaymentPage';

describe('Orang 4: Modul Pembayaran (Payment)', () => {
  beforeEach(() => {
    cy.loginSession('zqlwrna@gmail.com', 'Dohoonie24/7');
    PaymentPage.visitPaymentPage();
  });

  it('Harus menampilkan opsi metode pembayaran yang tersedia', () => {
    PaymentPage.getPaymentMethodOptions().should('be.visible');
  });

  it('Harus dapat memilih metode pembayaran Virtual Account', () => {
    PaymentPage.selectVirtualAccount();
    PaymentPage.getVirtualAccountOption().should('exist');
  });

  it('Harus dapat melakukan konfirmasi pembayaran hingga muncul instruksi pembayaran', () => {
    PaymentPage.selectVirtualAccount();
    PaymentPage.confirmPayment();
    PaymentPage.getSuccessPaymentHeader().should('be.visible');
  });
});