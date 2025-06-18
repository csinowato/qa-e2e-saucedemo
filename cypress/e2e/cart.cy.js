/// <reference types="cypress" />

import ProductsPage from '../pages/ProductsPage';
import CartPage from '../pages/CartPage';
import Navbar from '../pages/Navbar';

const productsPage = new ProductsPage();
const cartPage = new CartPage();
const navbar = new Navbar();

describe('Cart Functionality', () => {
  beforeEach(() => {
    productsPage.visit();
  });

  it('shows added products in cart', () => {
    const productName = 'Sauce Labs Fleece Jacket';
    productsPage.addProduct(productName);
    cartPage.visit();
    cartPage.checkProductInCart(productName).should('exist');
    navbar.getCartBadge().should('be.visible').and('contain', '1');
  });

  it('removes products from cart', () => {
    const productName = 'Sauce Labs Onesie';
    productsPage.addProduct(productName);
    cartPage.visit();
    cartPage.checkProductInCart(productName).should('exist');
    cartPage.removeFromCart(productName);
    cartPage.checkProductInCart(productName).should('not.exist');
    navbar.getCartBadge().should('not.exist');
  });

  it('shows empty cart when no items are added', () => {
    cartPage.visit();
    cartPage.checkEmptyCart().should('not.exist');
    navbar.getCartBadge().should('not.exist');
  });

  it('keeps cart contents when navigating away and back to cart', () => {
    const productName = 'Sauce Labs Backpack';
    productsPage.addProduct(productName);
    cartPage.visit();
    cartPage.checkProductInCart(productName).should('exist');
    cartPage.continueShopping();
    cartPage.visit();
    cartPage.checkProductInCart(productName).should('exist');
    navbar.getCartBadge().should('be.visible').and('contain', '1');
  });

  it('adds additional products via continue shopping', () => {
    const productName = 'Sauce Labs Backpack';
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
