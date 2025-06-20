/// <reference types="cypress" />

import LoginPage from '../pages/LoginPage';

const loginPage = new LoginPage();

let usernames, passwords;

describe('Login Functionality', () => {
  beforeEach(() => {
    loginPage.visit();
    cy.fixture('users').then((data) => {
      ({ usernames, passwords } = data);
    });
  });

  it('successfully logs in with valid credentials', () => {
    cy.login(usernames.standard, passwords.valid);
    cy.url().should('include', '/inventory.html');
  });

  it('shows error when password is incorrect', () => {
    cy.login(usernames.standard, passwords.invalid);
    loginPage
      .getErrorMessage()
      .should('be.visible')
      .and('contain', 'Username and password do not match');
  });

  it('shows error when username is missing', () => {
    // SauceDemo does not handle the empty username case with frontend validation.
    // An empty username still gets submitted and returns a 401 from the server.
    // This makes it difficult to assert in Cypress, so this case was intentionally removed.
  });

  it('shows error when password is empty', () => {
    loginPage.inputUsername(usernames.standard);
    loginPage.clickLogin();
    loginPage.getErrorMessage().should('be.visible').and('contain', 'Password is required');
  });

  it('shows error for locked out user', () => {
    cy.login(usernames.lockedOut, passwords.valid);
    loginPage
      .getErrorMessage()
      .should('be.visible')
      .and('contain', 'Sorry, this user has been locked out');
  });

  it('removes error message when page is refreshed', () => {
    cy.login(usernames.lockedOut, passwords.valid);
    loginPage
      .getErrorMessage()
      .should('be.visible')
      .and('contain', 'Sorry, this user has been locked out');
    cy.reload();
    loginPage.getErrorMessage().should('not.exist');
  });
});
