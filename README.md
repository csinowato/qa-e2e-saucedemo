# SauceDemo E2E Test Suite with Cypress

Automated end-to-end test suite for [SauceDemo](https://www.saucedemo.com/)

## Features Covered

**Login**

- Handle valid and invalid login attempts (incl. locked_out_user)
- Remove error message on page reload

**Products**

- Add and remove items from the products page
- Sort products by name and price

**Cart**

- Add and remove items from the cart
- Maintain cart state across navigation
- Persist cart items after page reload

**Checkout**

- Complete checkout with valid input
- Validate checkout form for missing fields
- Cancel checkout without clearing the cart
- Calculate the correct total with multiple items

**Access control**

- Prevent unauthorized access to the products page

**Navbar functionality**

- Validate menu links and logout functionality
- Reset app state from the menu
- Prevent access to links when the menu is closed

**Problem user behavior**

- Verify behavior for the following problem users:
  - problem_user: displays broken product images
  - performance_glitch_user: triggers performance lags
  - error_user: prevents items from being removed

## Tools

- Cypress 14.4.1
- JavaScript
- Node.js
- Mocha (test runner)
- Chai (assertion library)

## Folder Structure

Inside the `cypress/` directory:

- `e2e/` - test specs organized by feature
- `pages/` - page object model files
- `fixtures/` - user and product test data
- `support/` - custom commands

## Running the Tests

1. Clone the repository:

   - `git clone https://github.com/csinowato/qa-e2e-saucedemo`
   - `cd qa-e2e-saucedemo`

2. Install dependencies:

   - `npm install`

3. Run the test suite:

   - `npx cypress open`
   - or `npx cypress run` for headless mode

## Test Credentials

These are the test accounts provided by SauceDemo.
They are also stored in `fixtures/users.json`.

- **Username:** `standard_user`
- **Password:** `secret_sauce`

Other users available for testing:

- `locked_out_user`
- `problem_user`
- `performance_glitch_user`
- `error_user`
