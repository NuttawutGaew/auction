'use client';
import React, { useState } from 'react';
import NavbarCart from '../../components/NavbarCart';

const Modal = ({ show, onClose, onConfirm, message, message2 }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-72 bg-white rounded-2xl flex flex-col items-center justify-center gap-5 p-8 relative shadow-lg">
        <div>
            <p className='text-xl font-bold text-gray-900'>{message}</p>
            <p className='font-light text-gray-600'>{message2}</p>
        </div>
        <div className="w-full flex items-center justify-center gap-2">
          <button onClick={onClose} className="w-1/2 h-9 rounded-lg bg-gray-300 hover:bg-gray-400 font-semibold">Cancel</button>
          <button onClick={onConfirm} className="w-1/2 h-9 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold">Confirm</button>
        </div>
        <button onClick={onClose} className="absolute top-5 right-5 flex items-center justify-center bg-transparent cursor-pointer">
              <svg height="20px" viewBox="0 0 384 512" className="fill-gray-400 hover:fill-black">
                <path
                  d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                ></path>
              </svg>
            </button>
      </div>
    </div>
  );
};

const CartPage = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'เก้าอี้สไตล์หลุยส์', price: 7000, quantity: 1, image: '/images/imgg.jpg', isAuction: true },
    { id: 2, name: 'เก้าอี้โครงไม้สนประสาน', price: 900, quantity: 1, image: '/images/p22222.jpg', isAuction: false },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Name:', name);
    console.log('Address:', address);
    console.log('Phone Number:', phoneNumber);
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity === 0) {
      setItemToDelete(id);
      setShowModal(true);
      return;
    }
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: quantity } : item
    ));
  };

  const handleIncrement = (id) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const handleDecrement = (id) => {
    const item = cartItems.find(item => item.id === id);
    if (item.quantity === 1) {
      setItemToDelete(id);
      setShowModal(true);
    } else {
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      ));
    }
  };

  const handleConfirmDelete = () => {
    setCartItems(cartItems.filter(item => item.id !== itemToDelete));
    setShowModal(false);
    setItemToDelete(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setItemToDelete(null);
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const auctionItems = cartItems.filter(item => item.isAuction);
  const purchaseItems = cartItems.filter(item => !item.isAuction);

  return (
    <div>
      <NavbarCart />
    <div className="max-w-md mx-auto mt-20 p-6 border border-gray-300 rounded-lg shadow-lg bg-white ">
      <h1 className="text-2xl font-bold text-center mb-6">Checkout</h1>
      <div>
        <h2 className="text-xl font-semibold mb-4">Auction Items</h2>
        {auctionItems.map(item => (
          <div key={item.id} className="flex items-center mb-4">
            <img src={item.image} alt={item.name} className="w-16 h-16 mr-4" />
            <div className="flex-1">
              <h2 className="font-semibold">{item.name}</h2>
              <p>Auction Price: ${item.price.toLocaleString()}</p>
              <div className="flex items-center">
                <span className="mx-2">{item.quantity}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='mt-4 ml-4 pt-4 border-t-2 border-gray-300'></div>
      <div>
        <h2 className="text-xl font-semibold mb-4">Purchase Items</h2>
        {purchaseItems.map(item => (
          <div key={item.id} className="flex items-center mb-4">
            <img src={item.image} alt={item.name} className="w-16 h-16 mr-4" />
            <div className="flex-1">
              <h2 className="font-semibold">{item.name}</h2>
              <p>Price: ${item.price.toLocaleString()}</p>
              <div className="flex items-center">
                <button onClick={() => handleDecrement(item.id)} className="px-2 py-1 bg-gray-300 rounded">-</button>
                <span className="mx-2">{item.quantity}</span>
                <button onClick={() => handleIncrement(item.id)} className="px-2 py-1 bg-gray-300 rounded">+</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-right font-bold">
        Total: ${calculateTotalPrice().toLocaleString()}
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <label className="block font-semibold mb-2">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded text-sm"
            placeholder="Name"
          />
        </div>
        <div className="form-group">
          <label className="block font-semibold mb-2">Phone Number:</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded text-sm"
            placeholder="Phone Number"
          />
        </div>
        <div className="form-group">
          <label className="block font-semibold mb-2">Address:</label>
          <textarea 
              className="w-full p-2 border rounded-lg focus:outline-none focus:border-blue-500 text-sm"
              rows="3"
              placeholder="Address"
          ></textarea>
        </div>
        <button type="submit" className="w-full py-2 px-4 bg-green-500 text-white font-semibold rounded hover:bg-green-600">
          Checkout
        </button>
      </form>
      <Modal
        show={showModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        message="Remove this product?"
        message2="Do you want to remove this product from the cart?"
      />
    </div>
    </div>
  );
}

export default CartPage;