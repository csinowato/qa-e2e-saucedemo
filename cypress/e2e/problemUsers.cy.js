/// <reference types="cypress" />

import ProductsPage from '../pages/ProductsPage';
import Navbar from '../pages/Navbar';

const productsPage = new ProductsPage();
const navbar = new Navbar();

let usernames, passwords;
let products;

describe('Problem User Cases', () => {
  beforeEach(() => {
    cy.fixture('users').then((data) => {
      ({ usernames, passwords } = data);
    });
    cy.fixture('products').then((data) => {
      products = data;
    });
  });

  describe('problem_user', () => {
    it('displays broken product images on /inventory.html', () => {
      cy.login(usernames.problem, passwords.valid);
      cy.url().should('include', '/inventory.html');
      productsPage.getProductImages().each(($img) => {
        // SauceDemo broken image paths include 404
        cy.wrap($img).should('have.attr', 'src').and('include', '/static/media/sl-404');
      });
    });
  });

  describe('performance_glitch_user', () => {
    it('experiences performance lags on /inventory.html', () => {
      let startTime;
      cy.then(() => {
        startTime = Date.now();
      });
      cy.login(usernames.performanceGlitch, passwords.valid);
      cy.url().should('include', '/inventory.html');
      productsPage.getProducts().then(() => {
        const loadTime = Date.now() - startTime;
        // standard_user usually loads in < 800ms,
        expect(loadTime).to.be.greaterThan(1000);
      });
    });
  });

  describe('error_user', () => {
    it('does not remove items from cart when clicking remove', () => {
      cy.login(usernames.error, passwords.valid);
      cy.url().should('include', '/inventory.html');
      productsPage.addProduct(products.backpack);
      navbar.getCartBadge().should('be.visible').and('contain', '1');
      cy.on('uncaught:exception', (err) => {
        expect(err.message).to.include('Failed to remove item from cart');
        // Prevents test from failing since this is a known bug for error_user
        return false;
      });
      productsPage.removeProduct(products.backpack);
    });
  });
});
