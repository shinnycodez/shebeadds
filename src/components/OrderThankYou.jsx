import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';

const OrderThankYou = () => {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#FFF4EA] p-6 text-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border-4 border-dashed border-pink-200">
        <div className="text-[#1c5078] text-5xl mb-4">
          <FaHeart className="mx-auto animate-bounce" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Thankyou For Ordering Luvvv </h1>
        <p className="text-gray-600 mb-6">
          Your order has been placed successfully. 
        </p>
        <button
          onClick={handleContinueShopping}
          className="bg-[#1c5078] hover:bg-pink-500 text-white font-semibold px-6 py-3 rounded-full transition duration-300 shadow-md"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderThankYou;
