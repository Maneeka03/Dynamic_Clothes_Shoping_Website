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

const ReturnExchangePolicy = () => {
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
              <span className="mr-2">↺</span>
              Returns & Exchange Policy
            </h1>
            <div className="w-24" /> {/* Spacer for alignment */}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <PolicySection title="Return Policy Overview">
              <div className="space-y-4 text-gray-600">
                <p>We want you to love your purchase, but if you're not completely satisfied, we're here to help.</p>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <span className="w-4 h-4 mr-2 text-[#FF6B00]">•</span>
                    30-day return window from the date of delivery
                  </li>
                  <li className="flex items-center">
                    <span className="w-4 h-4 mr-2 text-[#FF6B00]">•</span>
                    Items must be unworn, unwashed, and with original tags
                  </li>
                  <li className="flex items-center">
                    <span className="w-4 h-4 mr-2 text-[#FF6B00]">•</span>
                    Original packaging must be intact
                  </li>
                </ul>
                <Highlight>
                  For hygiene reasons, intimate wear, jewelry, and customized products cannot be returned or exchanged.
                </Highlight>
              </div>
            </PolicySection>

            <PolicySection title="Exchange Process">
              <div className="space-y-4 text-gray-600">
                <h3 className="font-medium text-gray-900">How to Exchange</h3>
                <ol className="space-y-3">
                  <li className="flex">
                    <span className="font-medium text-[#FF6B00] mr-2">1.</span>
                    Log into your account and visit the Orders section
                  </li>
                  <li className="flex">
                    <span className="font-medium text-[#FF6B00] mr-2">2.</span>
                    Select the item you wish to exchange
                  </li>
                  <li className="flex">
                    <span className="font-medium text-[#FF6B00] mr-2">3.</span>
                    Choose "Exchange" and select your preferred size/color
                  </li>
                  <li className="flex">
                    <span className="font-medium text-[#FF6B00] mr-2">4.</span>
                    Schedule a pickup or drop at nearest store
                  </li>
                </ol>
                <Highlight>
                  Exchanges are subject to product availability. If your desired variant isn't available, you can opt for a refund.
                </Highlight>
              </div>
            </PolicySection>

            <PolicySection title="Refund Information">
              <div className="grid md:grid-cols-2 gap-6 text-gray-600">
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Refund Timeline</h3>
                  <ul className="space-y-2">
                    <li>• Online payment: 5-7 business days</li>
                    <li>• UPI/Net Banking: 3-5 business days</li>
                    <li>• Store credit: Immediate</li>
                    <li>• COD: 7-10 business days</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Refund Methods</h3>
                  <ul className="space-y-2">
                    <li>• Original payment method</li>
                    <li>• Store credit (10% extra value)</li>
                    <li>• Bank account transfer</li>
                  </ul>
                </div>
              </div>
            </PolicySection>

            <PolicySection title="Non-Returnable Items">
              <div className="space-y-4 text-gray-600">
                <p>The following items cannot be returned or exchanged:</p>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <span className="w-4 h-4 mr-2 text-[#FF6B00]">•</span>
                    Intimate wear and undergarments
                  </li>
                  <li className="flex items-center">
                    <span className="w-4 h-4 mr-2 text-[#FF6B00]">•</span>
                    Customized or personalized items
                  </li>
                  <li className="flex items-center">
                    <span className="w-4 h-4 mr-2 text-[#FF6B00]">•</span>
                    Sale items marked as 'Final Sale'
                  </li>
                  <li className="flex items-center">
                    <span className="w-4 h-4 mr-2 text-[#FF6B00]">•</span>
                    Products without original tags and packaging
                  </li>
                </ul>
              </div>
            </PolicySection>
          </div>

          {/* Quick Links Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h2>
              <div className="space-y-3">
                <button onClick={() => navigate("/order")}
                  className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-50 text-gray-600 transition-colors">
                  Track Your Return
                </button>
                <button onClick={() => navigate("/support")}
                  className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-50 text-gray-600 transition-colors">
                  Contact Support
                </button>
                <button onClick={() => navigate("/cart")}
                  className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-50 text-gray-600 transition-colors">
                  View Cart
                </button>
                <button onClick={() => navigate("/")}
                  className="w-full bg-[#FF6B00] text-white py-3 px-4 rounded-md hover:bg-[#ff8533] transition-colors">
                  Continue Shopping
                </button>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-md">
                <h3 className="font-medium text-gray-900 mb-2">Customer Support</h3>
                <p className="text-gray-600 text-sm mb-3">Available Mon-Sat, 10AM-6PM</p>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>Email: support@example.com</p>
                  <p>Phone: 1800-123-4567</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnExchangePolicy;