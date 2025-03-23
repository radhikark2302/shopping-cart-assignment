📌 Solution of Shopping Cart Assignment

This document includes the logic for adding products, retrieving prices, computing totals, and handling tax calculations.

🚀 Implementation Details

1️⃣ Adding a Product to the Cart

Fetches the product price using a mock API.

Stores the product name, price, and quantity in the cart.

If the product already exists, updates its quantity accordingly.

2️⃣ Fetching Product Prices (Mock Implementation)

Uses Jest to mock the price retrieval function.

Returns predefined prices for known products (cornflakes and weetabix).

Handles cases where the product is not found by returning null.

3️⃣ Computing Cart Totals

Subtotal: Sum of (price × quantity) for all items.

Tax: 12.5% of subtotal.

Total Payable: Subtotal + Tax (rounded to 2 decimal places).

Example Calculation

Inputs:

Add 1 × cornflakes @ 4.99 each

Add 2 × weetabix @ 7.29 each

Expected Output:

{
  "items": {
    "cornflakes": { "price": 4.99, "quantity": 1 },
    "weetabix": { "price": 7.29, "quantity": 2 }
  },
  "subtotal": "19.57",  // (4.99 * 1) + (7.29 * 2)
  "tax": "2.45",         // 19.57 * 0.125
  "total": "22.02"       // 19.57 + 2.45
}

🛠 Unit Testing

Mocking API Calls: Used Jest to mock the fetchPrice function.

Testing Product Addition: Ensures new products are added with correct prices and quantities.

Testing Quantity Updates: Verifies that existing product quantities are updated correctly.

Validating Totals: Ensures correct computation of subtotal, tax, and total amount.

✅ Summary

The solution follows a structured and modular approach.

Jest is used to mock API calls for reliable testing.

Tax and total calculations are accurately validated.

Unit tests confirm the expected behavior of cart operations.
