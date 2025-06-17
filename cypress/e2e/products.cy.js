/// <reference types="cypress" />

import ProductsPage from '../pages/ProductsPage';

const productsPage = new ProductsPage();

describe('Product Page Functionality', () => {
  beforeEach(() => {
    productsPage.visit();
  });

  // As of June 2025, the standard_user account sees 6 products
  it('displays 6 products', () => {
    productsPage.getProducts().should('have.length', 6);
  });

  it('adds selected product to cart', () => {
    const productName = 'Sauce Labs Backpack';
    productsPage.addProduct(productName);
    productsPage.getCartBadge().should('be.visible').and('contain', '1');
    cy.contains('.inventory_item', productName).should('contain', 'Remove');
  });

  it('removes selected product from cart', () => {
    const productName = 'Sauce Labs Bike Light';
    productsPage.addProduct(productName);
    productsPage.removeProduct(productName);
    productsPage.getCartBadge().should('not.exist');
    cy.contains('.inventory_item', productName).should('contain', 'Add to cart');
  });

  describe('Sorting Functionality', () => {
    it('sorts by name (A to Z)', () => {
      const sortMethod = 'Name (A to Z)';
      productsPage.sortProducts(sortMethod);
      productsPage.getProductNames().then((products) => {
        const sortedProducts = [...products].sort();
        expect(products).to.deep.equal(sortedProducts);
      });
    });

    it('sorts by name (Z to A)', () => {
      const sortMethod = 'Name (Z to A)';
      productsPage.sortProducts(sortMethod);
      productsPage.getProductNames().then((products) => {
        const reverseSorted = [...products].sort().reverse();
        expect(products).to.deep.equal(reverseSorted);
      });
    });

    it('sorts by price (low to high)', () => {
      const sortMethod = 'Price (low to high)';
      productsPage.sortProducts(sortMethod);
      productsPage.getProductPrices().then((prices) => {
        const pricesAscending = [...prices].sort((a, b) => a - b);
        expect(prices).to.deep.equal(pricesAscending);
      });
    });

    it('sorts by price (high to low)', () => {
      const sortMethod = 'Price (high to low)';
      productsPage.sortProducts(sortMethod);
      productsPage.getProductPrices().then((prices) => {
        const pricesDescending = [...prices].sort((a, b) => b - a);
        expect(prices).to.deep.equal(pricesDescending);
      });
    });
  });
});
