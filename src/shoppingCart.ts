import fetch from 'node-fetch';

interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
}

interface Product {
    name: string;
    price: number;
  }

class ShoppingCart {
  private cart: CartItem[] = [];
  private readonly taxRate = 0.125;

  
  async addProduct(productName: string, quantity: number): Promise<void> {
    const response = await fetch(`http://localhost:3001/products/${productName}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch price for ${productName}`);
    }
    const product = (await response.json()) as Product;
    
    const existingItem = this.cart.find(item => item.name === productName);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cart.push({ name: productName, price: product.price, quantity });
    }
  }


  getCartState(): CartState {
    const subtotal = this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = Math.ceil(subtotal * this.taxRate * 100) / 100;
    const total = Math.ceil((subtotal + tax) * 100) / 100;

    return { items: this.cart, subtotal, tax, total };
  }

 
  clearCart(): void {
    this.cart = [];
  }
}

export default ShoppingCart;
