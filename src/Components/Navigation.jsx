import React, { useState, useRef, useEffect } from "react";
import { Heart, Search, Menu, ShoppingBag, LogIn, LogOut } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
import { NavbarMenu } from "../mockdata/data";
import { NavLink, useNavigate } from "react-router-dom";
import { ResponsiveMenu } from "./ResponsiveMenu";
import axios from "axios";

const Navbar = ({ cartCount, wishlistCount, updateCartCount, updateWishlistCount }) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const navigate = useNavigate();
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const baseUrl = process.env.REACT_APP_BASE_URL

  const searchContainerRef = useRef(null);
  const formRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsSearchVisible(false);
        setSearchTerm("");
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleWishlistClick = () => {
    if (!isAuthenticated) {
      loginWithRedirect();
      return;
    }
    navigate("/wishlist");
  };

  const handleCartClick = () => {
    if (!isAuthenticated) {
      loginWithRedirect();
      return;
    }
    navigate("/cart");
  };


  const fetchCartItems = async () => {
    if (!isAuthenticated) {
      return;
    }

    try {
      const response = await axios.post(
        `${baseUrl}/api/users/getCart`,
        { email: user.email }
      );
      updateCartCount(response.data.cart.length); // Update count
      console.log(response);
    } catch (err) {
      console.error("Error fetching cart items:", err);
    }
  };

  const fetchWishlist = async () => {
    try {
      if (!user.email) {
        throw new Error("Email is required to fetch the wishlist.");
      }
      const response = await axios.get(
        `${baseUrl}/api/users/getWishlist`,
        {
          params: { email: user.email },
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          validateStatus: status => status >= 200 && status < 300
        }
      );

      const data = response.data;
      updateWishlistCount(data.wishlist.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCartItems();
    fetchWishlist();
  }, [isAuthenticated, user])




  return (
    <nav className="sticky top-0 backdrop-blur-md bg-white/80 z-[20]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="text-3xl font-black bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              ADAA
            </div>
            <span className="text-lg font-medium bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              Jaipur
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {NavbarMenu.map((item) => (
                <li key={item.id}>
                  <NavLink
                    to={item.link}
                    className={({ isActive }) =>
                      `group flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300
                      ${isActive
                        ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white'
                        : 'hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-500 hover:text-white'
                      }`
                    }
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.title}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative" ref={searchContainerRef}>
              <button
                onClick={() => setIsSearchVisible(!isSearchVisible)}
                className="p-2 rounded-full hover:bg-orange-100 transition-colors duration-300"
              >
                <Search className="w-5 h-5" />
              </button>

              {isSearchVisible && (
                <div className="absolute left-1/2 transform -translate-x-1/2 w-screen md:w-auto px-4 md:px-0 top-full">
                  <form
                    ref={formRef}
                    onSubmit={(e) => {
                      e.preventDefault();
                      navigate("/searchResult", { state: { searchText: searchTerm } });
                      setSearchTerm("");
                      setIsSearchVisible(false);
                    }}
                    className="flex items-center bg-white rounded-full shadow-lg border border-orange-200 max-w-md mx-auto md:mx-0"
                  >
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search..."
                      className="w-full md:w-64 px-4 py-2 rounded-l-full focus:outline-none"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="px-6 py-2 rounded-r-full bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:opacity-90 transition-opacity whitespace-nowrap"
                    >
                      Search
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Wishlist */}
            {/* Update the Wishlist button */}
            <button
              onClick={handleWishlistClick}
              className="relative p-2 rounded-full hover:bg-orange-100 transition-colors duration-300"
            >
              <Heart className="w-5 h-5" />
              {isAuthenticated && wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs font-medium text-white bg-gradient-to-r from-orange-500 to-pink-500 rounded-full">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Update the Cart button */}
            <button
              onClick={handleCartClick}
              className="relative p-2 rounded-full hover:bg-orange-100 transition-colors duration-300"
            >
              <ShoppingBag className="w-5 h-5" />
              {isAuthenticated && cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs font-medium text-white bg-gradient-to-r from-orange-500 to-pink-500 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Auth Button */}
            <button
              onClick={() => isAuthenticated
                ? logout({ logoutParams: { returnTo: window.location.origin } })
                : loginWithRedirect()
              }
              className="hidden md:block px-6 py-2 rounded-full font-medium text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:opacity-90 transition-opacity"
            >
            <div className="flex">
              {isAuthenticated ? (
                <LogOut className="w-5 h-5 text-white" />
              ) : (
                <LogIn className="w-5 h-5 text-white" />
              )}
              <span className="text-white font-medium ps-2">
                {isAuthenticated ? "Logout" : "Login"}
              </span>
              </div>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 rounded-full hover:bg-orange-100 transition-colors duration-300"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[999] lg:hidden ${open ? 'visible' : 'invisible'}`}>
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setOpen(false)}
        />
        <ResponsiveMenu open={open} setOpen={setOpen} />
      </div>
    </nav>
  );
};

export default Navbar;