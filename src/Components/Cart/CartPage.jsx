import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Snackbar from "../snackbar";
import { useAuth0 } from "@auth0/auth0-react";

const LoadingSkeleton = () => (
  <div className="animate-pulse">
    <div className="divide-y divide-orange-100">
      {[1, 2].map((item) => (
        <div key={item} className="p-6">
          <div className="flex gap-6">
            {/* Image skeleton */}
            <div className="w-1/4">
              <div className="aspect-square bg-gray-200 rounded-xl"></div>
            </div>
            
            {/* Content skeleton */}
            <div className="w-3/4 space-y-4">
              <div className="flex justify-between">
                <div className="space-y-2">
                  <div className="h-6 w-32 bg-gray-200 rounded"></div>
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                </div>
                <div className="h-6 w-6 bg-gray-200 rounded"></div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="h-4 w-16 bg-gray-200 rounded"></div>
                  <div className="flex gap-2">
                    {[1, 2, 3].map((btn) => (
                      <div key={btn} className="h-8 w-12 bg-gray-200 rounded-lg"></div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="h-4 w-16 bg-gray-200 rounded"></div>
                  <div className="flex gap-2">
                    {[1, 2, 3].map((btn) => (
                      <div key={btn} className="h-8 w-8 bg-gray-200 rounded-full"></div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="h-10 w-32 bg-gray-200 rounded-lg"></div>
                <div className="space-y-1">
                  <div className="h-4 w-16 bg-gray-200 rounded"></div>
                  <div className="h-6 w-24 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ProductDetails = ({ item, handleRemoveFromCart, handleSizeChange, handleColorChange, handleQuantityChange }) => {
  return (
    <>
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {item.nameD}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {item.brandD}
          </p>
        </div>
        <button
          onClick={() => handleRemoveFromCart(item.uniqueIdD, item.selectedColorD, item.selectedSizeD)}
          className="text-gray-400 hover:text-red-500 transition-colors duration-200"
        >
          ✕
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Size Selection */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Size
          </label>
          <div className="mt-2 flex flex-wrap gap-2">
            {item.sizeD.map((size) => (
              <button
                key={size}
                onClick={() => handleSizeChange(item.uniqueIdD, size)}
                className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-200 transform hover:scale-105 ${
                  item.selectedSizeD === size
                    ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Color Selection */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Color
          </label>
          <div className="mt-2 flex flex-wrap gap-2">
            {item.colorD.map((color) => (
              <button
                key={color}
                onClick={() => handleColorChange(item.uniqueIdD, color)}
                className={`w-8 h-8 rounded-full transition-all duration-200 transform hover:scale-110 flex items-center justify-center ${
                  item.selectedColorD === color
                    ? "ring-2 ring-orange-500 ring-offset-2 shadow-md"
                    : "border-2 border-gray-300"
                }`}
                style={{ backgroundColor: color }}
              >
                {item.selectedColorD === color && (
                  <span className="text-xs font-bold text-white drop-shadow-md">
                    ✓
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center bg-gray-50 rounded-lg border border-orange-200 w-fit">
          <button
            onClick={() => handleQuantityChange(item.uniqueIdD, item.selectedQuantityD - 1)}
            disabled={item.selectedQuantityD <= 1}
            className="p-2 hover:bg-orange-100 rounded-l-lg transition-colors duration-200 disabled:opacity-50"
          >
            −
          </button>
          <span className="px-4 py-2 text-sm font-medium">
            {item.selectedQuantityD}
          </span>
          <button
            onClick={() => handleQuantityChange(item.uniqueIdD, item.selectedQuantityD + 1)}
            className="p-2 hover:bg-orange-100 rounded-r-lg transition-colors duration-200"
          >
            +
          </button>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Price</p>
          <p className="text-lg font-semibold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
            ₹{item.priceD}
          </p>
        </div>
      </div>
    </>
  );
};


export default function CartPage({ updateCartCount }) {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const {isAuthenticated,user , loginWithPopup} = useAuth0();
  const [isLoading, setIsLoading] = useState(true);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const handleColorChange = (id, newColor) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.uniqueIdD === id ? { ...item, selectedColorD: newColor } : item
      )
    );
  };

  const handleSizeChange = (id, newSize) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.uniqueIdD === id ? { ...item, selectedSizeD: newSize } : item
      )
    );
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity > 0) {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.uniqueIdD === id
            ? { ...item, selectedQuantityD: newQuantity }
            : item
        )
      );
    }
  };

  // Function to fetch cart items
  const fetchCartItems = async () => {
    if(!isAuthenticated){
      setSnackbarMessage("You have to Login First");
      setSnackbarOpen(true);
      loginWithPopup();
      return;
    }

    try {
      
    setIsLoading(true);
      const response = await axios.post(
        `${baseUrl}/api/users/getCart`,
        { email:user.email }
      );
      setCartItems(response.data.cart); // Set cart items from response
      setSnackbarMessage(response.data.message);
      updateCartCount(response.data.cart.length); // Update count
      console.log(response);
    } catch (err) {
      console.error("Error fetching cart items:", err);
      setSnackbarMessage(
        err.response?.data?.message || "Error fetching cart items"
      );
      setSnackbarOpen(true);
    }
    finally {
      setIsLoading(false);
    }
  };



  const handleRemoveFromCart = async (uniqueId) => {
    if(!isAuthenticated){
      setSnackbarMessage("You have to Login First");
      setSnackbarOpen(true);
      loginWithPopup();
      return;
    }

    try {
      // Make the API call to remove the product from the cart
      const response = await axios.post(
        `${baseUrl}/api/users/deleteFromCart`,
        {
          email :user.email,
          uniqueId,
        }
      );

      setSnackbarMessage(response.data.message);
      setSnackbarMessage("Product is Removed");
      setSnackbarOpen(true);

      // Remove the product from the cartItems state
      const updatedCart = cartItems.filter(
        (item) => item.uniqueIdD !== uniqueId
      );

      setCartItems(updatedCart); // Update state with filtered cart
      updateCartCount(updatedCart.length); // Update the global cart count
    } catch (err) {
      console.error("Error removing product from cart:", err);
      setSnackbarMessage(
        err.response?.data?.message || "Error removing product from cart"
      );
      setSnackbarOpen(true);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.priceD * item.selectedQuantityD,
      0
    );
  };

  // Handle proceeding to checkout
  const handleCheckout = async () => {
    if (!isAuthenticated) {
      setSnackbarMessage("You have to Log in First.");
      setSnackbarOpen(true);
      loginWithPopup();
      return;
    }

    try {
      // Assuming you want to place an order with the items in the cart
      const orderPayload = {
        email: user.email,
        orderDetails: cartItems.map(item => ({
          productId: item.uniqueIdD,
          name: item.nameD,
          price: item.priceD,
          quantity: item.selectedQuantityD,
          selectedSize: item.selectedSizeD,
          selectedColor: item.selectedColorD,
          image:item.imageD
        })),
        totalAmount: calculateTotal(), // Get the total amount for the order
      };

      // Make the API call to place the order
      const response = await axios.post(
        `${baseUrl}/api/users/placeOrder`, // Adjust API endpoint
        orderPayload
      );

      setSnackbarMessage(response.data.message); // Success message from backend
      setSnackbarOpen(true);

      // Optionally clear the cart or redirect the user
      setCartItems([]); // Clear the cart after successful order
      updateCartCount(0); // Update global cart count

      // Redirect to order confirmation page or another page
      navigate('/order', { state: { orderId: response.data.orderId } }); // Pass orderId or other info
    } catch (error) {
      console.error("Error placing order:", error);
      setSnackbarMessage(
        error.response?.data?.message || "Error placing the order"
      );
      setSnackbarOpen(true);
    }
};


  // Effect to fetch cart items when the component mounts
  useEffect(() => {
    fetchCartItems();
  }, [isAuthenticated,user]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/")}
              className="flex items-center text-gray-600 hover:text-orange-500 transition-colors duration-300"
            >
              <span className="mr-2">←</span>
              Continue Shopping
            </button>
            <button
              onClick={() => navigate("/order")}
              className="flex items-center text-gray-600 hover:text-orange-500 transition-colors duration-300"
            >
              <span className="mr-2">←</span>
              Your Orders
            </button>
            <h1 className="text-2xl font-bold text-center flex items-center text-gray-800">
              <span className="mr-2">🛍️</span>
              Shopping Cart
            </h1>
            <div className="w-24" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-md border border-orange-100">
              {isLoading ? (
                  <LoadingSkeleton />
                ) :
                cartItems.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="text-6xl mb-4 animate-bounce">🛍️</div>
                  <p className="text-gray-500 mb-4">Your cart is empty</p>
                  <button
                    onClick={() => navigate("/")}
                    className="mt-4 inline-flex items-center px-6 py-3 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                
                <div className="divide-y divide-orange-100">
                  {cartItems.map((item, index) => (
                    <div key={index} className="p-6 hover:bg-orange-50/50 transition-colors duration-200">
                      {/* Mobile Layout */}
                      <div className="flex flex-col lg:hidden">
                        {/* Image at the top */}
                        <div className="w-full aspect-square max-h-[300px] mb-6">
                          <img
                            src={item.imageD || "/placeholder.svg"}
                            alt={item.nameD}
                            className="w-full h-full object-cover rounded-xl transform hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        
                        {/* Details below */}
                        <div className="flex-1">
                          {/* Product details content */}
                          <ProductDetails 
                            item={item}
                            handleRemoveFromCart={handleRemoveFromCart}
                            handleSizeChange={handleSizeChange}
                            handleColorChange={handleColorChange}
                            handleQuantityChange={handleQuantityChange}
                          />
                        </div>
                      </div>

                      {/* Desktop Layout */}
                      <div className="hidden lg:flex gap-6">
                        {/* Image taking 25% width */}
                        <div className="w-1/4">
                          <div className="aspect-square">
                            <img
                              src={item.imageD || "/placeholder.svg"}
                              alt={item.nameD}
                              className="w-full h-full object-cover rounded-xl transform hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        </div>
                        
                        {/* Details taking 75% width */}
                        <div className="w-3/4">
                          {/* Product details content */}
                          <ProductDetails 
                            item={item}
                            handleRemoveFromCart={handleRemoveFromCart}
                            handleSizeChange={handleSizeChange}
                            handleColorChange={handleColorChange}
                            handleQuantityChange={handleQuantityChange}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          {cartItems.length > 0 && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-md border border-orange-100 p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  Order Summary
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium">₹{calculateTotal()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-green-500 font-medium">Free</span>
                  </div>
                  <div className="border-t border-orange-100 pt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-gray-800">Total</span>
                      <span className="text-lg font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                        ₹{calculateTotal().toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
      <Snackbar
        message={snackbarMessage}
        isOpen={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        duration={2000}
      />
    </div>
  );
}
