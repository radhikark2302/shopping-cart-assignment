const taxRate = 0.125;
const apiUrl = "http://localhost:3001/products";

async function getProductPrice(productName) {
  try {
    const response = await fetch(`${apiUrl}/${productName}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.price;
  } catch (error) {
    console.error(`Error fetching price for ${productName}:`, error);
    return null;
  }
}

async function addProduct(cart, productName, quantity) {
  const price = await getProductPrice(productName);
  if (price !== null) {
    if (cart[productName]) {
      cart[productName].quantity += quantity;
    } else {
      cart[productName] = { price, quantity };
    }
  }
}

function calculateSubtotal(cart) {
  return Object.values(cart).reduce((subtotal, item) => {
    return subtotal + item.price * item.quantity;
  }, 0);
}

function calculateTax(subtotal) {
  return subtotal * taxRate;
}

function calculateTotal(subtotal, tax) {
  return subtotal + tax;
}

function getCartState(cart) {
  const subtotal = calculateSubtotal(cart);
  const tax = calculateTax(subtotal);
  const total = calculateTotal(subtotal, tax);

  return {
    items: cart,
    subtotal: subtotal.toFixed(2),
    tax: tax.toFixed(2),
    total: total.toFixed(2),
  };
}

module.exports = {
  addProduct,
  getCartState,
};

// Example usage
(async () => {
  const cart = {};
  await addProduct(cart, "cornflakes", 1);
  await addProduct(cart, "cornflakes", 1);
  await addProduct(cart, "weetabix", 1);

  const cartState = getCartState(cart);
  console.log("Cart State:", cartState);
})();
