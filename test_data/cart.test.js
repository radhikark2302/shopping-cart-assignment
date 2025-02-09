const { addProduct, getCartState, fetchPrice } = require("../cart");

// Mock fetchPrice to simulate API calls
jest.mock("../cart", () => {
  const originalModule = jest.requireActual("../cart");
  return {
    ...originalModule,
    fetchPrice: jest.fn((productName) => {
      if (productName === "cornflakes") {
        return Promise.resolve({ price: 4.99 });
      } else if (productName === "weetabix") {
        return Promise.resolve({ price: 7.29 });
      } else {
        return Promise.resolve(null);
      }
    }),
  };
});

describe("Cart", () => {
  let cart;

  beforeEach(() => {
    cart = {};
  });

  test("addProduct adds a new product to the cart", async () => {
    await addProduct(cart, "cornflakes", 1);

    expect(cart).toEqual({
      cornflakes: { price: 4.99, quantity: 1 },
    });
  });

  test("addProduct updates quantity if product already exists", async () => {
    await addProduct(cart, "cornflakes", 1);
    await addProduct(cart, "cornflakes", 2);

    expect(cart).toEqual({
      cornflakes: { price: 4.99, quantity: 3 },
    });
  });

  test("getCartState returns correct cart state", async () => {
    await addProduct(cart, "cornflakes", 1);
    await addProduct(cart, "weetabix", 2);

    const cartState = getCartState(cart);

    expect(cartState).toEqual({
      items: {
        cornflakes: { price: 4.99, quantity: 1 },
        weetabix: { price: 7.29, quantity: 2 },
      },
      subtotal: "19.57", // 4.99 + (7.29 * 2)
      tax: "2.45", // 19.57 * 0.125
      total: "22.02", // 19.57 + 2.45
    });
  });
});
