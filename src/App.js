import "./App.css";
import { useState, useEffect } from "react";
import Navbar from "./Components/Navigation";
import Home from "./Components/Homepage/homePage";
import Footer from "./Components/Footer/footer";
import CollectionPage from "./Components/Collections/collections";
import { Route, Routes, Link } from "react-router-dom";
import Cart from './Components/Cart/CartPage';
import SearchResults from './Components/searchItems/SearchResult'
import ContactPage from "./Components/ContactUs/contactUs";
import AboutUs from "./Components/AboutUs/aboutPage"
import Chatbot from "./Chatbot/chatbot";
import Order from "./Components/Order/Order"
import Trending from "./Components/Trending/Trending";
import axios from "axios";
import Snackbar from "./Components/snackbar";
import { useLocation } from "react-router-dom";
import ShoppingPolicies from "./Components/Order/ShippingPolicy";
import Exchange from "./Components/Order/Exchange";
import Sizes from "./Components/Collections/Sizes";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import WishlistPage from "./Components/ProductCards/WishlistPage";



const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top of the page
  }, [pathname]); // Trigger effect on pathname change

  return null; // This component doesn't render anything
};

function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" style={{ textDecoration: "none", color: "#007bff" }}>
        Go Back To Home
      </Link>
    </div>
  );
}


function App() {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [userLoggedIn, setUserLoggedIn] = useState(false); // Track login state
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const { isAuthenticated, user } = useAuth0();
  const baseUrl = process.env.RREACT_APP_BASE_URL;

  const fetchCartItems = async () => {
    if (!isAuthenticated || !user?.email) {
      return;
    }

    try {
      const response = await axios.post(
        `${baseUrl}/api/users/getCart`,
        { email: user.email }
      );
      const fetchedCart = response.data.cart;
      setCartItems(fetchedCart);
      setSnackbarMessage(response.data.message);

      // Only update cart count if it differs from the state value
      if (fetchedCart.length !== cartCount) {
        setCartCount(fetchedCart.length);
      }
    } catch (err) {
      console.error("Error fetching cart items:", err);
      setSnackbarMessage(err.response?.data?.message || "Error fetching cart items");
      setSnackbarOpen(true);
    }
  };

  const getWishlist = async () => {
    if (!isAuthenticated || !user?.email) {
      return;
    }

    try {
      const response = await fetch(
        `${baseUrl}/api/users/getWishlist?email=${encodeURIComponent(user.email)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch wishlist");
      }

      const data = await response.json(); // Parse the JSON response
      setWishlistItems(data);
      if (data.length !== wishlistCount) {
        setWishlistCount(data.length);
      }
    } catch (err) {
      console.error("Error fetching wishlist:", err);
    }
  };


  const updateCartCount = (newCount) => {
    if (newCount !== cartCount) {
      setCartCount(newCount);
      fetchCartItems();
    }
  };

  const updateWishlistCount = (newCount) => {
    if (newCount !== wishlistCount) {
      setWishlistCount(newCount);
      getWishlist();
    }
  };

  useEffect(() => {
    if (isAuthenticated && user?.email) {  // Add a check for `user.email`
      fetchCartItems();
      getWishlist();
    }
  }, [isAuthenticated, user?.email]);
  useEffect(() => {
    fetchCartItems();
    getWishlist();
  }, [])

  return (
    <div className="overflow-x-hidden">
      <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN}
        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
        cacheLocation='localstorage'
      >
        <ScrollToTop />
        <Navbar cartCount={cartCount} setUserLoggedIn={setUserLoggedIn} wishlistCount={wishlistCount} updateCartCount={updateCartCount} updateWishlistCount={updateWishlistCount} />

        <Routes>
          <Route path="/" element={<Home updateCartCount={updateCartCount} updateWishlistCount={updateWishlistCount} />} />
          <Route path="/trending" element={<Trending updateCartCount={updateCartCount} updateWishlistCount={updateWishlistCount} />} />
          
          <Route path="/collections" element={<CollectionPage updateCartCount={updateCartCount} updateWishlistCount={updateWishlistCount} />} />
          <Route path="/cart" element={<Cart updateCartCount={updateCartCount} />} />
          <Route path="/contactUs" element={<ContactPage />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/shoppingPolicy" element={<ShoppingPolicies />} />
          <Route path="/size" element={<Sizes />} />
          <Route path="/wishlist" element={<WishlistPage updateWishlistCount={updateWishlistCount} updateCartCount={updateCartCount} />} />
          <Route path="/exchange" element={<Exchange />} />
          <Route path="/order" element={<Order />} />
          <Route path="/searchResult" element={<SearchResults updateCartCount={updateCartCount} updateWishlistCount={updateWishlistCount} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
        <Snackbar
          message={snackbarMessage}
          isOpen={snackbarOpen}
          onClose={() => setSnackbarOpen(false)}
          duration={2000}
        />
        <Chatbot className="-z-50" updateCartCount={updateCartCount} cartCount={cartCount} />
      </Auth0Provider>
    </div>
  );
}

export default App;

