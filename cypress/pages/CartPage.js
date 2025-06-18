class CartPage {
  // Assumes user is logged in and on the products page
  visit() {
    cy.get('.shopping_cart_link').click();
  }

  checkProductInCart(productName) {
    return cy.contains('.cart_item', productName);
  }

  removeFromCart(productName) {
    cy.contains('.cart_item', productName).contains('Remove').click();
  }

  checkEmptyCart() {
    return cy.get('.cart_item');
  }

  continueShopping() {
    cy.get('#continue-shopping').click();
  }
}

export default CartPage;
