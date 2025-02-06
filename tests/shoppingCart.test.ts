import ShoppingCart from '../src/shoppingCart';

describe('ShoppingCart', () => {
  let cart: ShoppingCart;

  beforeEach(() => {
    cart = new ShoppingCart();
  });

  test('adds products and calculates totals', async () => {
    await cart.addProduct('cornflakes', 2); // 2 x 2.52 = 5.04
    await cart.addProduct('weetabix', 1);  // 1 x 9.98 = 9.98

    const state = cart.getCartState();

    expect(state.subtotal).toBe(15.02);
    expect(state.tax).toBe(1.88);
    expect(state.total).toBe(16.90);
  });

  test('clears cart', () => {
    cart.clearCart();
    expect(cart.getCartState().items.length).toBe(0);
  });
});
