/// <reference types="cypress" />

import ProductsPage from '../pages/ProductsPage';
import CartPage from '../pages/CartPage';
import Navbar from '../pages/Navbar';

const productsPage = new ProductsPage();
const cartPage = new CartPage();
const navbar = new Navbar();

let usernames, passwords;
let products;

describe('Cart Functionality', () => {
  beforeEach(() => {
    cy.fixture('users').then((data) => {
      ({ usernames, passwords } = data);
      cy.login(usernames.standard, passwords.valid);
    });
    cy.fixture('products').then((data) => {
      products = data;
    });
  });

  it('shows added products in cart', () => {
    productsPage.addProduct(products.backpack);
    cartPage.visit();
    cartPage.checkProductInCart(products.backpack).should('exist');
    navbar.getCartBadge().should('be.visible').and('contain', '1');
  });

  it('removes products from cart', () => {
    productsPage.addProduct(products.backpack);
    cartPage.visit();
    cartPage.checkProductInCart(products.backpack).should('exist');
    cartPage.removeFromCart(products.backpack);
    cartPage.checkProductInCart(products.backpack).should('not.exist');
    navbar.getCartBadge().should('not.exist');
  });

  it('shows empty cart when no items are added', () => {
    cartPage.visit();
    cartPage.getCartItem().should('not.exist');
    navbar.getCartBadge().should('not.exist');
  });

  it('keeps cart contents when page is refreshed', () => {
    productsPage.addProduct(products.backpack);
    cartPage.visit();
    cartPage.checkProductInCart(products.backpack).should('exist');
    cy.reload();
    cartPage.checkProductInCart(products.backpack).should('exist');
    navbar.getCartBadge().should('be.visible').and('contain', '1');
  });

  it('keeps cart contents when navigating away and back to cart', () => {
    productsPage.addProduct(products.backpack);
    cartPage.visit();
    cartPage.checkProductInCart(products.backpack).should('exist');
    cartPage.continueShopping();
    cartPage.visit();
    cartPage.checkProductInCart(products.backpack).should('exist');
    navbar.getCartBadge().should('be.visible').and('contain', '1');
  });

  it('adds additional products via continue shopping', () => {
    productsPage.addProduct(products.backpack);
    cartPage.visit();
    cartPage.checkProductInCart(products.backpack).should('exist');
    cartPage.continueShopping();
    productsPage.addProduct(products.onesie);
    cartPage.visit();
    cartPage.checkProductInCart(products.backpack).should('exist');
    cartPage.checkProductInCart(products.onesie).should('exist');
    navbar.getCartBadge().should('be.visible').and('contain', '2');
  });
});
