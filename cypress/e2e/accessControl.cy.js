/// <reference types="cypress" />

import LoginPage from '../pages/LoginPage';
import ProductsPage from '../pages/ProductsPage';
import Navbar from '../pages/Navbar';

const loginPage = new LoginPage();
const productsPage = new ProductsPage();
const navbar = new Navbar();

let usernames, passwords;

describe('Access Control', () => {
  beforeEach(() => {
    cy.fixture('users').then((data) => {
      ({ usernames, passwords } = data);
    });
  });

  it('prevents unauthorized access to /inventory.html and redirects to login page', () => {
    productsPage.visitWithoutLogin();
    cy.url().should('eq', `${Cypress.config('baseUrl')}`);
    loginPage
      .getErrorMessage()
      .should('be.visible')
      .and('contain', "You can only access '/inventory.html' when you are logged in");
  });

  it('prevents access to /inventory.html after logout and pressing the back button', () => {
    cy.login(usernames.standard, passwords.valid);
    cy.url().should('include', '/inventory.html');
    navbar.openNavbar();
    navbar.logout();
    cy.url().should('eq', `${Cypress.config('baseUrl')}`);
    cy.go('back');
    cy.url().should('eq', `${Cypress.config('baseUrl')}`);
    loginPage
      .getErrorMessage()
      .should('be.visible')
      .and('contain', "You can only access '/inventory.html' when you are logged in");
  });

  it('hides navbar before login', () => {
    loginPage.visit();
    navbar.getMenu().should('not.exist');
    navbar.getCartBadge().should('not.exist');
  });
});
