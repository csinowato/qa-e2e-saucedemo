/// <reference types="cypress" />

import ProductsPage from '../pages/ProductsPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import Navbar from '../pages/Navbar';

const productsPage = new ProductsPage();
const cartPage = new CartPage();
const checkoutPage = new CheckoutPage();
const navbar = new Navbar();

const firstName = 'John';
const lastName = 'Doe';
const postalCode = '12345';
const productName = 'Sauce Labs Backpack';

describe('Checkout Functionality', () => {
  beforeEach(() => {
    productsPage.visit();
  });

  it('successfully checks out with items in cart', () => {
    productsPage.addProduct(productName);
    cartPage.visit();
    checkoutPage.visit();
    checkoutPage.fillCheckoutForm(firstName, lastName, postalCode);
    checkoutPage.continueCheckout();
    checkoutPage.finishCheckout();
    checkoutPage.getSuccessMessage().should('contain', 'Thank you for your order');
  });

  // No validation error when checking out with an empty cart - might be intended behavior or a validation gap
  it('allows checkout with an empty cart', () => {
    cartPage.visit();
    checkoutPage.visit();
    checkoutPage.fillCheckoutForm(firstName, lastName, postalCode);
    checkoutPage.continueCheckout();
    checkoutPage.finishCheckout();
    checkoutPage.getSuccessMessage().should('contain', 'Thank you for your order');
  });

  it('shows error when first name is blank', () => {
    productsPage.addProduct(productName);
    cartPage.visit();
    checkoutPage.visit();
    checkoutPage.inputLastName(lastName);
    checkoutPage.inputPostalCode(postalCode);
    checkoutPage.continueCheckout();
    checkoutPage
      .getErrorMessage()
      .should('be.visible')
      .and('contain', 'Error: First Name is required');
  });

  it('shows error when last name is blank', () => {
    productsPage.addProduct(productName);
    cartPage.visit();
    checkoutPage.visit();
    checkoutPage.inputFirstName(firstName);
    checkoutPage.inputPostalCode(postalCode);
    checkoutPage.continueCheckout();
    checkoutPage
      .getErrorMessage()
      .should('be.visible')
      .and('contain', 'Error: Last Name is required');
  });

  it('shows error when zipcode is blank', () => {
    productsPage.addProduct(productName);
    cartPage.visit();
    checkoutPage.visit();
    checkoutPage.inputFirstName(firstName);
    checkoutPage.inputLastName(lastName);
    checkoutPage.continueCheckout();
    checkoutPage
      .getErrorMessage()
      .should('be.visible')
      .and('contain', 'Error: Postal Code is required');
  });

  it('cancel from information form page redirects to cart page and keeps items in cart', () => {
    productsPage.addProduct(productName);
    cartPage.visit();
    checkoutPage.visit();
    checkoutPage.cancelCheckout();
    cy.url().should('include', '/cart.html');
    cartPage.checkProductInCart(productName).should('exist');
    navbar.getCartBadge().should('be.visible').and('contain', '1');
  });

  it('cancel from overview page redirects to product page and keeps items in cart', () => {
    productsPage.addProduct(productName);
    cartPage.visit();
    checkoutPage.visit();
    checkoutPage.fillCheckoutForm(firstName, lastName, postalCode);
    checkoutPage.continueCheckout();
    checkoutPage.cancelCheckout();
    cy.url().should('include', '/inventory.html');
    navbar.getCartBadge().should('be.visible').and('contain', '1');
    cartPage.visit();
    cartPage.checkProductInCart(productName).should('exist');
  });

  it('shows correct total when checking out with multiple items', () => {
    const secondProduct = 'Sauce Labs Bike Light';
    productsPage.addProduct(productName);
    productsPage.addProduct(secondProduct);
    cartPage.visit();
    checkoutPage.visit();
    checkoutPage.fillCheckoutForm(firstName, lastName, postalCode);
    checkoutPage.continueCheckout();
    checkoutPage.calculateSubtotal().then((manualSubtotal) => {
      // Compare manually calculated subtotal to displayed subtotal
      checkoutPage.getSubtotal().then(($subtotal) => {
        const subtotal = Number($subtotal.text().split('$')[1]);
        expect(manualSubtotal).to.eq(subtotal);

        // Add tax to manual subtotal
        checkoutPage.getTax().then(($tax) => {
          const tax = Number($tax.text().split('$')[1]);
          const manualTotal = manualSubtotal + tax;

          // Compare calculated final total (subtotal + tax) to displayed total
          checkoutPage.getTotal().then(($total) => {
            const total = Number($total.text().split('$')[1]);
            expect(manualTotal).to.eq(total);
          });
        });
      });
    });
  });
});
