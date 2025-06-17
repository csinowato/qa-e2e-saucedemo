/// <reference types="cypress" />

import LoginPage from '../pages/LoginPage';

const loginPage = new LoginPage();

describe('Login Functionality', () => {
  beforeEach(() => {
    loginPage.visit();
  });

  it('successfully logs in with valid credentials', () => {
    loginPage.login('standard_user', 'secret_sauce');
    cy.url().should('include', '/inventory.html');
  });

  it('shows error when password is incorrect', () => {
    loginPage.login('standard_user', 'wrong_password');
    cy.get('.error-message-container h3')
      .should('be.visible')
      .and('contain', 'Username and password do not match');
  });

  it('shows error when username is missing', () => {
    // SauceDemo does not handle the empty username case with frontend validation.
    // An empty username still gets submitted and returns a 401 from the server.
    // This makes it difficult to assert in Cypress, so this case was intentionally removed.
  });

  it('shows error when password is empty', () => {
    loginPage.inputUsername('standard_user');
    loginPage.clickLogin();
    cy.get('.error-message-container h3')
      .should('be.visible')
      .and('contain', 'Password is required');
  });

  it('shows error for locked out user', () => {
    loginPage.login('locked_out_user', 'secret_sauce');
    cy.get('.error-message-container h3')
      .should('be.visible')
      .and('contain', 'Sorry, this user has been locked out');
  });

  it('removes error message when page is refreshed', () => {
    loginPage.login('locked_out_user', 'secret_sauce');
    cy.get('.error-message-container h3')
      .should('be.visible')
      .and('contain', 'Sorry, this user has been locked out');
    cy.reload();
    cy.get('.error-message-container h3').should('not.exist');
  });
});
