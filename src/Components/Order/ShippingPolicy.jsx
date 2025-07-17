import React from 'react';
import { useNavigate } from 'react-router-dom';

const PolicySection = ({ title, children }) => (
  <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
    <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-200">
      {title}
    </h2>
    {children}
  </div>
);

const Highlight = ({ children }) => (
  <div className="mt-4 p-4 bg-orange-50 rounded-md text-gray-700 border border-orange-100">
    {children}
  </div>
);

const ShoppingPolicies = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/")}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <span className="mr-2">←</span>
              Back to Shopping
            </button>
            <h1 className="text-2xl font-bold text-center flex items-center">
              <span className="mr-2">📋</span>
              Shopping Policies
            </h1>
            <div className="w-24" /> {/* Spacer for alignment */}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <PolicySection title="Shipping Policy">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Delivery Options</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-center">
                      <span className="w-4 h-4 mr-2 text-[#FF6B00]">•</span>
                      Standard Delivery (3-5 business days) - Free on orders above ₹999
                    </li>
                    <li className="flex items-center">
                      <span className="w-4 h-4 mr-2 text-[#FF6B00]">•</span>
                      Express Delivery (1-2 business days) - ₹199
                    </li>
                    <li className="flex items-center">
                      <span className="w-4 h-4 mr-2 text-[#FF6B00]">•</span>
                      Same Day Delivery - ₹299 (Select cities only)
                    </li>
                  </ul>
                </div>
                <Highlight>
                  Orders placed before 2 PM IST will be processed the same day.
                </Highlight>
              </div>
            </PolicySection>

            <PolicySection title="Returns & Refunds">
              <div className="space-y-4 text-gray-600">
                <p>We accept returns within 30 days of delivery for most items.</p>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <span className="w-4 h-4 mr-2 text-[#FF6B00]">•</span>
                    Item must be unused and in original packaging
                  </li>
                  <li className="flex items-center">
                    <span className="w-4 h-4 mr-2 text-[#FF6B00]">•</span>
                    Tags must be intact and attached
                  </li>
                  <li className="flex items-center">
                    <span className="w-4 h-4 mr-2 text-[#FF6B00]">•</span>
                    Refunds will be processed within 5-7 business days
                  </li>
                </ul>
                <Highlight>
                  Some items like intimate wear and customized products are not eligible for return.
                </Highlight>
              </div>
            </PolicySection>

            <PolicySection title="Payment Methods">
              <div className="grid grid-cols-2 gap-4 text-gray-600">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Online Payments</h3>
                  <ul className="space-y-2">
                    <li>Credit/Debit Cards</li>
                    <li>UPI</li>
                    <li>Net Banking</li>
                    <li>Mobile Wallets</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Other Options</h3>
                  <ul className="space-y-2">
                    <li>Cash on Delivery</li>
                    <li>EMI Available</li>
                  </ul>
                </div>
              </div>
            </PolicySection>
          </div>

          {/* Quick Links Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h2>
              <div className="space-y-3">
                <button onClick={() => navigate("/cart")}
                  className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-50 text-gray-600 transition-colors">
                  View Cart
                </button>
                <button onClick={() => navigate("/order")}
                  className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-50 text-gray-600 transition-colors">
                  Track Order
                </button>
                <button onClick={() => navigate("/")}
                  className="w-full bg-[#FF6B00] text-white py-3 px-4 rounded-md hover:bg-[#ff8533] transition-colors">
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingPolicies;