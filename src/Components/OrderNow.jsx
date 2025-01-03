import React, { useEffect, useState } from 'react';
import products from './products';
import { addToCart } from '../features/CartSlice';
import { useDispatch } from 'react-redux';

const OrderNow = () => {
  const [pro, setPro] = useState(products);
  const [showNotification, setShowNotification] = useState(false); // State for the notification
  const [notificationMessage, setNotificationMessage] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const send = (product) => {
    console.log(product);
    dispatch(addToCart(product));
    setNotificationMessage(`${product.name} added to cart!`); // Set message
    setShowNotification(true); // Show the notification

    // Hide the notification after 3 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  return (
    <div className="container mx-auto p-4 mt-[130px]">
      <div className="text-black text-center font-bold text-4xl mb-10">Order Now</div>
      
      {/* Pop-up notification in the center */}
      {showNotification && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-black">
          <div className="bg-green-500 text-white font-bold py-4 px-6 rounded-lg shadow-lg animate-pulse text-center">
            {notificationMessage}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 bg-black rounded-t-3xl border-black">
        {pro.map((product, index) => (
          <div key={index} className="bg-white border border-gray-200 p-4 rounded-lg shadow-lg text-center">
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-32 object-cover mb-4 rounded-full"
            />
            <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
            <p className="text-green-600 mt-2">{product.price}</p>
            <p className="text-red-500 text-sm mt-1">{product.offer}</p>
            <button
              onClick={() => send(product)}
              className="mt-4 bg-yellow-300 text-white font-bold py-2 px-4 rounded hover:bg-yellow-600"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderNow;
