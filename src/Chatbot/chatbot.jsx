import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { ScrollableProductCard } from "./ScrollableProductCard";
import { CancelOrderForm } from "./Cancel_order_form";
import { ReturnExchangeForm } from "./return_exchange_form";
import { useAuth0 } from "@auth0/auth0-react";

import Snackbar from "../Components/snackbar";
const categories = {
  "Gown": ["Ankle Gown", "Gown With Malmal Dupatta", "Gown With Chinon Dupatta"],
  "Kurtas Sets": [
      "Ethnic Embroidered Sequinned Kurta",
      "Printed Kurtas",
      "Kurta With Trousers & With Dupatta",
    ],
  "Bottom": ["Pant", "Palazzo"],
  "Kurta": [
    "A-Line Straight Kurta", "Embroidery Kurta", "Straight Kurta"
  ],
  "Tops": ["Co-Ords", "Shirt", "Short", "Tunics"],
};

const mainMenuOption = {
  id: "main-menu",
  text: "Back to Main Menu",
  response: "How can I assist you today?"
};

const chatOptions = [
  {
    id: "products",
    text: "View Products",
    response: "Choose a category:",
    nextOptions: Object.keys(categories).map(category => ({
      id: category.toLowerCase().replace(/\s+/g, '-'),
      text: category,
      response: `Browse our ${category} collection:`,
      category: category,
      subCategories: categories[category]
    })).concat([mainMenuOption])
  },
  {
    id: "sizes",
    text: "Size Guide",
    response: "What would you like to know about sizing?",
    nextOptions: [
      {
        id: "size-chart",
        text: "View Size Chart",
        response: "Our sizes range from XS to XXL. For detailed measurements, please visit our size guide page."
      },
      mainMenuOption
    ]
  },
  {
    id: "support",
    text: "Customer Support",
    response: "How can we help you?",
    nextOptions: [
      {
        id: "return",
        text: "Returns & Exchange",
        response: "Please fill out the form for returns and exchanges:",
        form: "return-exchange"
      },
      {
        id: "cancel-order",
        text: "Cancel Order",
        response: "Please fill out the form to cancel your order:",
        form: "cancel-order"
      },
      mainMenuOption
    ]
  }
];

export default function Chatbot({ updateCartCount,cartCount }) {
  const [isOpen, setIsOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const chatbotRef = useRef(null);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [selectedThumbnail, setSelectedThumbnail] = useState(0);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const { isAuthenticated, user, loginWithPopup } = useAuth0();
  const [messages, setMessages] = useState([{
    id: 1,
    text: "Welcome to ADAA Jaipur. How can I help you?",
    sender: "bot",
    options: chatOptions
  }]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const fetchProducts = async (category, subCategory) => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/api/cloth/getCloth`);
      let filteredProducts = response.data;

      // Flexible matching with partial and case-insensitive checks
      filteredProducts = filteredProducts.filter(product => {
        const matchCategory = !category ||
          product.nameD.toLowerCase().includes(category.toLowerCase()) ||
          product.nameD.toLowerCase().includes(category.toLowerCase());

        const matchSubCategory = !subCategory ||
          product.nameD.toLowerCase().includes(subCategory.toLowerCase());

        return matchCategory && matchSubCategory;
      });

      // Log detailed filtering information
      console.log('Total Products:', response.data.length);
      console.log('Filtered Products:', filteredProducts.length);
      console.log('Category:', category);
      console.log('Subcategory:', subCategory);

      return filteredProducts.map(product => ({
        id: product.idD,
        name: product.nameD || 'Unnamed Product',
        price: product.priceD || 0,
        originalPrice: product.originalPriceD || 0,
        image: (product.imageD && product.imageD.length > 0)
          ? product.imageD
          : "/placeholder.svg",
        images: product.imageD || [],
        category: product.brandD || category,
        subCategory: product.categoryD || subCategory,
        details: product.detailD || '',
        colors: product.colorD || [],
        sizes: product.sizeD || [],
        rating: product.ratingD || 0,
        quantity: product.quantityD || 0,
        productCategory: product.productCategoryD || ''
      }));
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    } finally {
      setLoading(false);
    }
  };
  const handleOptionClick = async (option) => {
    const userMessage = {
      id: messages.length + 1,
      text: option.text,
      sender: "user"
    };

    let botMessage = {
      id: messages.length + 2,
      sender: "bot",
      text: option.response
    };

    if (option.id === "main-menu") {
      botMessage.options = chatOptions;
    } else if (option.category) {
      if (option.subCategory) {
        const products = await fetchProducts(option.category, option.subCategory);
        botMessage.products = products;
        botMessage.options = [mainMenuOption];
      } else {
        botMessage.options = [
          ...categories[option.category].map(sub => ({
            id: `${option.id}-${sub.toLowerCase().replace(/\s+/g, '-')}`,
            text: sub,
            response: `Here are our ${sub} products:`,
            category: option.category,
            subCategory: sub
          })),
          mainMenuOption
        ];
      }
    } else {
      botMessage.options = option.nextOptions;
      botMessage.form = option.form;
    }

    if (option.action) {
      option.action(); // Call the viewCart function
    } else if (option.options) {
      // Handle nested options
      setMessages(prevMessages => [...prevMessages, { ...option }]);
    }

    setMessages([...messages, userMessage, botMessage]);
  };

  const addToCart = async (product) => {
    // Check authentication first
    if (!isAuthenticated) {
      setSnackbarMessage("You must login first to add items to cart");
      setSnackbarOpen(true);
      loginWithPopup();
      return;
    }

    try {
      const productData = {
        idD: product.id,
        nameD: product.name,
        selectedColorD: product.selectedColorD,
        selectedSizeD: product.selectedSizeD,
        colorD: product.colors,
        sizeD: product.sizes,
        selectedQuantityD: product.quantity,
        quantityD: product.quantity,
        detailD: product.details,
        priceD: product.price,
        imageD: product.image,
        originalPriceD: product.originalPrice,
        ratingD: product.rating,
      };

      const response = await axios.post(
        `${baseUrl}/api/users/addToCart`,
        {
          email: user.email,
          product: productData,
          increaseQuantity: true
        }
      );

      // Handle response messages
      if (response.data && response.data.message) {
        setSnackbarMessage(response.data.message);

        if (response.data.message === "Product added to cart successfully") {
          updateCartCount((cartCount) => cartCount + 1);
          setSnackbarMessage("Product added to cart");
          setSnackbarOpen(true);
        } else if (response.data.message === "Item already exists in cart") {
          setSnackbarMessage(
            "This item is already in your cart with the same size and color."
          );
          setSnackbarOpen(true);
        }
      } else {
        setSnackbarMessage("Unexpected response format.");
        setSnackbarOpen(true);
      }

      // Create bot message for chat interface
      const botMessage = {
        id: messages.length + 1,
        text: `Added ${product.name} to your cart.`,
        sender: "bot",
        options: [
          {
            id: "view-cart",
            text: "View Cart",
            response: "Here's your cart:",
            action: viewCart
          },
          {
            id: "continue-shopping",
            text: "Continue Shopping",
            response: "What else would you like to see?",
            options: chatOptions
          }
        ]
      };

      setMessages([...messages, botMessage]);
    } catch (err) {
      console.error("Error adding to cart:", err);
      setSnackbarMessage(err.response?.data?.message || "Error adding to cart");
      setSnackbarOpen(true);
    } finally {
      setSelectedProduct(null);
      setSelectedThumbnail(0);
    }
  };



  const viewCart = async () => {
    if (!isAuthenticated) {
      setSnackbarMessage("You have to Login First");
      setSnackbarOpen(true);
      loginWithPopup();
      return;
    }
  
    try {
      const response = await axios.post(
        `${baseUrl}/api/users/getCart`,
        { email: user.email }
      );
  
      console.log("Cart Response:", response.data); // Detailed logging
  
      const cartItems = response.data?.cart || []; 
      updateCartCount(cartItems.length);
  
      if (cartItems.length === 0) {
        const botMessage = {
          id: messages.length + 1,
          text: "Your cart is empty. Would you like to see our products?",
          sender: "bot",
          options: chatOptions.filter(option => option.id === "products")
        };
        setMessages(prevMessages => [...prevMessages, botMessage]);
        return;
      }
  
      const cartTotal = cartItems.reduce((total, item) =>
        total + (item.priceD || 0) * (item.selectedQuantityD || 1), 0
      );
      console.log("cart items"+cartItems);
      const cartItemsList = cartItems
        .map(item => ` ${item.nameD || 'Unknown Product'} (x${item.selectedQuantityD || 1}): ₹${((item.priceD || 0) * (item.selectedQuantityD || 1)).toLocaleString()}`)
        .join("\n");
  
      const botMessage = {
        id: messages.length + 1,
        text: `Cart:\n${cartItemsList}\n\nTotal: ₹${cartTotal.toLocaleString()}`,
        sender: "bot",
        options: [
          {
            id: "checkout",
            text: "Checkout",
            response: "Proceeding to checkout..."
          },
          {
            id: "continue-shopping",
            text: "Continue Shopping",
            response: "What would you like to see?",
            options: chatOptions
          }
        ]
      };
      
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (err) {
      console.error("Error fetching cart items:", err);
      setSnackbarMessage(
        err.response?.data?.message || "Error fetching cart items"
      );
      setSnackbarOpen(true);
    }
  };
  const handleFormSubmit = (formData) => {
    const botMessage = {
      id: messages.length + 1,
      text: `Request received:\n${Object.entries(formData)
        .map(([key, value]) => `${key}: ${value}`)
        .join("\n")}\n\nWe'll process your request shortly.`,
      sender: "bot",
      options: [mainMenuOption]
    };
    setMessages([...messages, botMessage]);
  };

  const renderForm = (formType) => {
    switch (formType) {
      case "cancel-order":
        return <CancelOrderForm onSubmit={handleFormSubmit} />;
      case "return-exchange":
        return <ReturnExchangeForm onSubmit={handleFormSubmit} />;
      default:
        return null;
    }
  };

  const resetChat = () => {
    setMessages([{
      id: 1,
      text: "Welcome to ADAA Jaipur. How can I help you?",
      sender: "bot",
      options: chatOptions
    }]);
    setCart([]);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatbotRef.current && 
          !chatbotRef.current.contains(event.target) && 
          isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  return (
    <div >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed bottom-4 right-4 h-12 w-12 rounded-full bg-[#FF8A00] hover:bg-[#FF8A00]/90 text-white flex items-center justify-center z-50"
        >
          {isOpen ? "✕" : "💬"}
        </button>

      {isOpen && (
        <div className="fixed bottom-20 right-4 w-96 max-h-[80vh] flex flex-col shadow-xl bg-white rounded-lg overflow-hidden z-50">
          <div className="bg-[#FF8A00] text-white p-3 flex justify-between items-center">
            <h3 className="font-semibold">ADAA Jaipur Support</h3>
            <div className="flex items-center gap-2">
              <button
                className="text-white hover:text-white hover:bg-[#FF8A00]/90 p-1 rounded"
                onClick={viewCart}
              >
                🛒 {cartCount}
              </button>
              <button
                className="text-white hover:text-white hover:bg-[#FF8A00]/90 p-1 rounded"
                onClick={resetChat}
              >
                ↺
              </button>
            </div>
          </div>

          <div ref={chatContainerRef} className="flex-1 overflow-auto p-4 space-y-4">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-2 ${message.sender === "user"
                    ? "bg-[#FF8A00] text-white"
                    : "bg-gray-100 text-gray-800"
                    }`}
                >
                  <p className="whitespace-pre-wrap">{message.text}</p>
                  {loading && <p className="text-sm italic">Loading products...</p>}
                  {message.products && (
                    <ScrollableProductCard
                      products={message.products}
                      addToCart={addToCart}
                    />
                  )}
                  {message.options && (
                    <div className="mt-2 space-y-2">
                      {message.options.map(option => (
                        <button
                          key={option.id}
                          onClick={() => handleOptionClick(option)}
                          className="w-full text-left px-3 py-2 rounded-md bg-white text-gray-800 hover:bg-gray-100 transition-colors duration-200"
                        >
                          {option.text}
                        </button>
                      ))}
                    </div>
                  )}
                  {message.form && renderForm(message.form)}
                </div>
              </div>
            ))}
          </div>
          <Snackbar
            message={snackbarMessage}
            isOpen={snackbarOpen}
            onClose={() => setSnackbarOpen(false)}
            duration={2000}
          />
        </div>
      )}
    </div>
  );
}