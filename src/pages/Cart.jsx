import React, { useState, useEffect } from 'react'; 

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [notProduct, setNotProduct] = useState(false);

  function getItemFromLocalStorage() {
    const data = localStorage.getItem('cart');
    return data ? JSON.parse(data) : [];
  }

  function removeItemFromCart(cartID) {
    let YouSure = confirm('Are you sure you want to remove this item from the cart?')
    if (YouSure) {
      const updatedCart = cartItems.filter(item => item.cartID !== cartID);
      setCartItems(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      if (updatedCart.length === 0) {
        setNotProduct(true);
      }
    }
  }

  useEffect(() => {
    const items = getItemFromLocalStorage();
    if (items.length === 0) {
      setNotProduct(true);
    } else {
      setCartItems(items);
      setNotProduct(false);
    }
  }, []);

  const totalAmount = cartItems.reduce((total, item) => total + item.amount, 0);

  return (
    <div className='max-w-[1100px] w-full mx-auto py-[80px]'>
      <div className='border-b border-base-300 pb-5 capitalize text-gray-400'>
        <h2 className='text-3xl font-medium tracking-wider capitalize text-[30px]'>
          {notProduct ? 'Your cart is empty' : 'Your cart'}
        </h2>
      </div>
      {cartItems.length > 0 && (
        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            {cartItems.map((item, index) => (
              <article key={index} className="mb-12 flex flex-col gap-y-4 sm:flex-row flex-wrap border-b border-base-300 pb-6 last:border-b-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover" />
                <div className="sm:ml-16 sm:w-48">
                  <h3 className="capitalize font-medium">{item.title}</h3>
                  <h4 className="mt-2 capitalize text-sm text-neutral-content">{item.company}</h4>
                  <p className="mt-4 text-sm capitalize flex items-center gap-x-2">
                    color : <span className="badge badge-sm" style={{ backgroundColor: item.productColor }}></span>
                  </p>
                </div>
                <div className="sm:ml-12">
                  <div className="max-w-xs flex flex-col items-center gap-1">
                    <label htmlFor="amount" className="label p-0">
                      <span className="label-text">Amount</span>
                    </label>
                    <p>{item.amount}</p>
                  </div>
                  <button
                    className="mt-2 link link-primary link-hover text-sm"
                    onClick={() => removeItemFromCart(item.cartID)}
                  >
                    remove
                  </button>
                </div>
                <p className="font-medium sm:ml-auto">${item.price}</p>
              </article>
            ))}
          </div>

          <div className="lg:col-span-4 lg:pl-4">
            <div className="card bg-base-200">
              <div className="card-body">
                <p className="flex justify-between text-xs border-b border-base-300 pb-2">
                  <span>Subtotal</span><span className="font-medium">${cartItems.reduce((total, item) => total + (item.price * item.amount), 0).toFixed(2)}</span>
                </p>
                <p className="flex justify-between text-xs border-b border-base-300 pb-2">
                  <span>Shipping</span><span className="font-medium">$5.00</span>
                </p>
                <p className="flex justify-between text-xs border-b border-base-300 pb-2">
                  <span>Tax</span><span className="font-medium">${(cartItems.reduce((total, item) => total + (item.price * item.amount), 0) * 0.1).toFixed(2)}</span>
                </p>
                <p className="flex justify-between text-sm mt-4 pb-2">
                  <span>Order Total</span><span className="font-medium">${(cartItems.reduce((total, item) => total + (item.price * item.amount), 0) + 5 + (cartItems.reduce((total, item) => total + (item.price * item.amount), 0) * 0.1)).toFixed(2)}</span>
                </p>
              </div>
            </div>
            <a className="btn btn-secondary uppercase btn-block mt-8" href="/login">please login</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
