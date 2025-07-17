
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Library, TrendingUp, Users, MessageSquare, LogIn ,LogOut } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";

export const ResponsiveMenu = ({ open, setOpen }) => {
  const menuRef = useRef(null);
  const location = useLocation();
  
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  // Memoized click outside handler to prevent unnecessary re-renders
  const handleClickOutside = useCallback((event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setOpen(false);
    }
  }, [setOpen]);

  // Memoized scroll handler to close menu on scroll
  const handleScroll = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  // Consolidated effect for event listeners
  useEffect(() => {
    // Only add listeners if menu is open
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("scroll", handleScroll, { passive: true });

      // Clean up function
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("scroll", handleScroll);
      };
    }
  }, [open, handleClickOutside, handleScroll]);

  const handleLinkClick = () => {
    setOpen(false);
  };


  const handleAuth = () => {
    if (isAuthenticated) {
      logout({ logoutParams: { returnTo: window.location.origin } });
    } else {
      loginWithRedirect();
    }
    handleLinkClick();
  };
  
  const menuItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/collections", label: "Collection", icon: Library },
    { path: "/trending", label: "Trending", icon: TrendingUp },
    { path: "/aboutUs", label: "About", icon: Users },
    { path: "/contactUs", label: "Contact", icon: MessageSquare },
  ];

  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, x: 250 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 250 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
          className="fixed top-0 right-0 w-72 h-screen z-30 bg-gradient-to-b from-orange-500 to-pink-500 shadow-2xl pt-20 overflow-y-auto"
        >
          <div className="py-8 px-4">
            <ul className="space-y-4">
              {menuItems.map(({ path, label, icon: Icon }) => (
                <li key={path}>
                  <Link
                    to={path}
                    onClick={handleLinkClick}
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl backdrop-blur-sm transition-all duration-300
                  ${location.pathname === path
                        ? "bg-white/20 shadow-lg"
                        : "hover:bg-white/10 hover:translate-x-2"
                      }`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                    <span className="text-white font-medium">{label}</span>
                  </Link>
                </li>
              ))}
              <li className="mt-6">
                <button
                  onClick={handleAuth}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:translate-x-2"
                >
                  {isAuthenticated ? (
                    <LogOut className="w-5 h-5 text-white" />
                  ) : (
                    <LogIn className="w-5 h-5 text-white" />
                  )}
                  <span className="text-white font-medium">
                    {isAuthenticated ? "Logout" : "Login"}
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};