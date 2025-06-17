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

  login(username, password) {
    this.inputUsername(username);
    this.inputPassword(password);
    this.clickLogin();
  }
}

export default LoginPage;
