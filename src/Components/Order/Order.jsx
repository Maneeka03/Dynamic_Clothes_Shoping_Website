import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth0();
  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/users/getOrder?email=${user.email}`
        );
        setOrders(response.data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
            <span className="mr-2">📦</span>
            My Orders
          </h1>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md border border-orange-100 p-8 text-center">
            <div className="text-6xl mb-4 animate-bounce">📦</div>
            <p className="text-gray-500 mb-4">No orders placed yet</p>
            <button
              onClick={() => window.location.href = '/'}
              className="mt-4 inline-flex items-center px-6 py-3 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
            {orders.map((order, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md border border-orange-100 overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {/* Order Header */}
                <div className="p-6 bg-gradient-to-r from-orange-50 to-pink-50">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Order #{index + 1}
                    </h3>
                    <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-sm rounded-full">
                      ₹{order.totalAmount ? order.totalAmount.toFixed(2) : "0.00"}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Placed on{" "}
                    {new Date(order.placedAt.seconds * 1000).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                {/* Order Items */}
                <div className="divide-y divide-orange-100">
                  {order.orderDetails.map((item, itemIndex) => (
                    <div key={itemIndex} className="p-6 hover:bg-orange-50/50 transition-colors duration-200">
                      <div className="flex flex-col sm:flex-row gap-4">
                        {/* Image Gallery */}
                        <div className="flex gap-2 sm:w-1/3">
                          <img
                            key={item.id}
                            src={item.image}
                            alt={`${item.name} view`}
                            className="w-20 h-20 object-cover rounded-lg shadow-sm transform hover:scale-105 transition-transform duration-200"
                          />
                        </div>

                        {/* Item Details */}
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 mb-2">
                            {item.name}
                          </h4>
                          <div className="space-y-1">
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Quantity:</span>{" "}
                              {item.quantity}
                            </p>
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Size:</span>{" "}
                              <span className="px-2 py-1 bg-orange-100 rounded-md text-orange-700">
                                {item.selectedSize}
                              </span>
                            </p>
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Color:</span>{" "}
                              <span
                                className="inline-block w-6 h-6 rounded-full border-2 border-white shadow-sm ml-2"
                                style={{ backgroundColor: item.selectedColor }}
                              />
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;


