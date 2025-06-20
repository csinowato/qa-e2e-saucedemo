/// <reference types="cypress" />

import Navbar from '../pages/Navbar';
import ProductsPage from '../pages/ProductsPage';
import CartPage from '../pages/CartPage';

const navbar = new Navbar();
const productsPage = new ProductsPage();
const cartPage = new CartPage();

let usernames, passwords;
let products;

describe('Navbar Functionality', () => {
  beforeEach(() => {
    cy.fixture('products').then((data) => {
      products = data;
    });
    cy.fixture('users').then((data) => {
      ({ usernames, passwords } = data);
      cy.login(usernames.standard, passwords.valid);
    });
  });

  it('opens sidebar menu', () => {
    navbar.openNavbar();
    navbar.getMenu().should('have.css', 'display', 'block');
  });

  it('opens All Items page', () => {
    navbar.openNavbar();
    navbar.clickAllItems();
    cy.url().should('include', '/inventory.html');
  });

  it('logs out and redirects to login page', () => {
    navbar.openNavbar();
    cy.getCookie('session-username').should('exist');
    navbar.logout();
    cy.getCookie('session-username').should('not.exist');
    cy.url().should('eq', `${Cypress.config('baseUrl')}`);
  });

  it('resets app state', () => {
    productsPage.addProduct(products.backpack);
    productsPage.addProduct(products.onesie);
    navbar.getCartBadge().should('be.visible').and('contain', '2');
    navbar.openNavbar();
    navbar.resetAppState();
    navbar.getCartBadge().should('not.exist');
    cartPage.visit();
    cartPage.getCartItem().should('not.exist');
  });

  it('prevents access to links when menu is closed', () => {
    cy.on('fail', (err) => {
      expect(err.message).to.include('failed because this element is not visible');
      // Prevents test from failing since this is expected behavior - links should not be accessible when menu is closed
      return false;
    });
    navbar.clickAllItems();
  });
});
