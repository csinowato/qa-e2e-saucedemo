class Navbar {
  // Navbar actions
  openNavbar() {
    cy.get('#react-burger-menu-btn').click();
  }

  clickAllItems() {
    cy.get('#inventory_sidebar_link').click();
  }

  logout() {
    cy.get('#logout_sidebar_link').click();
  }

  resetAppState() {
    cy.get('#reset_sidebar_link').click();
  }

  getMenu() {
    return cy.get('.bm-menu-wrap');
  }

  // Cart badge
  getCartBadge() {
    return cy.get('.shopping_cart_badge');
  }
}

export default Navbar;
