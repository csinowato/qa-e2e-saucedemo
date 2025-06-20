class ProductsPage {
  visitWithoutLogin() {
    cy.visit('/inventory.html', { failOnStatusCode: false });
  }

  getProducts() {
    return cy.get('.inventory_item');
  }

  addProduct(productName) {
    cy.contains('.inventory_item', productName).contains('Add to cart').click();
  }

  removeProduct(productName) {
    cy.contains('.inventory_item', productName).contains('Remove').click();
  }

  sortProducts(sortMethod) {
    cy.get('.product_sort_container').select(sortMethod);
  }

  getProductNames() {
    const productNames = [];
    return cy
      .get('.inventory_item')
      .each(($el) => {
        const productName = $el.find('.inventory_item_name').text().trim();
        productNames.push(productName);
      })
      .then(() => {
        return productNames;
      });
  }

  getProductPrices() {
    const productPrices = [];
    return cy
      .get('.inventory_item')
      .each(($el) => {
        const price = $el.find('.inventory_item_price').text().trim();
        productPrices.push(Number(price.slice(1)));
      })
      .then(() => {
        return productPrices;
      });
  }
}

export default ProductsPage;
