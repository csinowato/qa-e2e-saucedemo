/// <reference types="cypress" />

import ProductsPage from '../pages/ProductsPage';
import CartPage from '../pages/CartPage';
import Navbar from '../pages/Navbar';

const productsPage = new ProductsPage();
const cartPage = new CartPage();
const navbar = new Navbar();

const productName = 'Sauce Labs Backpack';

describe('Cart Functionality', () => {
  beforeEach(() => {
    productsPage.visit();
  });

  it('shows added products in cart', () => {
    productsPage.addProduct(productName);
    cartPage.visit();
    cartPage.checkProductInCart(productName).should('exist');
    navbar.getCartBadge().should('be.visible').and('contain', '1');
  });

  it('removes products from cart', () => {
    productsPage.addProduct(productName);
    cartPage.visit();
    cartPage.checkProductInCart(productName).should('exist');
    cartPage.removeFromCart(productName);
    cartPage.checkProductInCart(productName).should('not.exist');
    navbar.getCartBadge().should('not.exist');
  });

  it('shows empty cart when no items are added', () => {
    cartPage.visit();
    cartPage.getCartItem().should('not.exist');
    navbar.getCartBadge().should('not.exist');
  });

  it('keeps cart contents when page is refreshed', () => {
    productsPage.addProduct(productName);
    cartPage.visit();
    cartPage.checkProductInCart(productName).should('exist');
    cy.reload();
    cartPage.checkProductInCart(productName).should('exist');
    navbar.getCartBadge().should('be.visible').and('contain', '1');
  });

  it('keeps cart contents when navigating away and back to cart', () => {
    productsPage.addProduct(productName);
    cartPage.visit();
    cartPage.checkProductInCart(productName).should('exist');
    cartPage.continueShopping();
    cartPage.visit();
    cartPage.checkProductInCart(productName).should('exist');
    navbar.getCartBadge().should('be.visible').and('contain', '1');
  });

  it('adds additional products via continue shopping', () => {
    const secondProduct = 'Sauce Labs Bolt T-Shirt';
    productsPage.addProduct(productName);
    cartPage.visit();
    cartPage.checkProductInCart(productName).should('exist');
    cartPage.continueShopping();
    productsPage.addProduct(secondProduct);
    cartPage.visit();
    cartPage.checkProductInCart(productName).should('exist');
    cartPage.checkProductInCart(secondProduct).should('exist');
    navbar.getCartBadge().should('be.visible').and('contain', '2');
  });
});
