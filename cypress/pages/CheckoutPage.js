class CheckoutPage {
  // Assumes user is logged in and on the cart page
  visit() {
    cy.get('#checkout').click();
  }

  inputFirstName(firstName) {
    cy.get('#first-name').type(firstName);
  }

  inputLastName(lastName) {
    cy.get('#last-name').type(lastName);
  }

  inputPostalCode(postalCode) {
    cy.get('#postal-code').type(postalCode);
  }

  fillCheckoutForm(firstName, lastName, postalCode) {
    this.inputFirstName(firstName);
    this.inputLastName(lastName);
    this.inputPostalCode(postalCode);
  }

  continueCheckout() {
    cy.get('#continue').click();
  }

  cancelCheckout() {
    cy.get('#cancel').click();
  }

  finishCheckout() {
    cy.get('#finish').click();
  }

  getSuccessMessage() {
    return cy.get('#checkout_complete_container h2');
  }

  getErrorMessage() {
    return cy.get('.error-message-container h3');
  }

  calculateSubtotal() {
    let totalPrice = 0;
    return cy
      .get('.cart_item')
      .each(($el) => {
        const price = $el.find('.inventory_item_price').text().trim();
        totalPrice += Number(price.slice(1));
      })
      .then(() => {
        return totalPrice;
      });
  }

  getSubtotal() {
    return cy.get('.summary_subtotal_label');
  }

  getTax() {
    return cy.get('.summary_tax_label');
  }

  getTotal() {
    return cy.get('.summary_total_label');
  }
}

export default CheckoutPage;
