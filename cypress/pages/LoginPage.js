class LoginPage {
  visit() {
    cy.visit('/');
  }

  inputUsername(username) {
    cy.get('#user-name').type(username);
  }

  inputPassword(password) {
    cy.get('#password').type(password);
  }

  clickLogin() {
    cy.get('#login-button').click();
  }

  getErrorMessage() {
    return cy.get('.error-message-container h3');
  }
}

export default LoginPage;
