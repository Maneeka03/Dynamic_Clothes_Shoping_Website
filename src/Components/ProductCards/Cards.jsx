import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Snackbar from "../snackbar"
import { useAuth0 } from "@auth0/auth0-react"
import { Heart } from "lucide-react"
import ProductGridSkeleton from "../ProductSkeleton/ProductLoadingSkeleton"

export default function Cards({ search, bannerName, updateCartCount, updateWishlistCount }) {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedSize, setSelectedSize] = useState("")
  const [products, setProducts] = useState([])
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [selectedThumbnail, setSelectedThumbnail] = useState(0)
  const increaseQuantity = () => setQuantity((prev) => prev + 1)
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
  const { isAuthenticated, user, loginWithPopup } = useAuth0();
  const [wishlist, setWishlist] = useState([]);
  const [wishlistLoaded, setWishlistLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const baseUrl = process.env.REACT_APP_BASE_URL;


  useEffect(() => {
    if (selectedProduct) {
      setSelectedColor(selectedProduct.colorD?.[0] || "");
      setSelectedSize(selectedProduct.sizeD?.[0] || "");
    }
  }, [selectedProduct])

  useEffect(() => {
    getCloths(search)
  }, [search])

  const getCloths = async (search) => {
    if (!search) return
    const encodedSearchTerm = encodeURIComponent(search)
    try {
      setIsLoading(true);
      const responseCloth = await fetch(
        `${baseUrl}/api/cloth/searchClothsByProductCategory?query=${encodedSearchTerm}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
      if (!responseCloth.ok) {
        throw new Error(`HTTP Error: ${responseCloth.status}`)
      }
      const clothList = await responseCloth.json()
      setProducts(clothList)
    } catch (err) {
      console.error("Error fetching cloths:", err)
      setSnackbarMessage("Error fetching products. Please try again.")
      setSnackbarOpen(true);
      setError(err);
    }
    finally {
      setIsLoading(false);
    }

  }

  const handleAddToCart = async (item) => {
    // Check if user is NOT authenticated
    if (!isAuthenticated) {
      setSnackbarMessage("You must login first to add items to cart");
      setSnackbarOpen(true);
      loginWithPopup();
      return;
    }

    try {
      const productData = {
        idD: item.idD,
        nameD: item.nameD,
        selectedColorD: selectedColor,
        selectedSizeD: selectedSize,
        colorD: item.colorD,
        sizeD: item.sizeD,
        selectedQuantityD: quantity,
        quantityD: item.quantityD,
        detailD: item.detailD,
        priceD: item.priceD,
        imageD: item.imageD,
        originalPriceD: item.originalPriceD,
        ratingD: item.ratingD,
      };

      const response = await axios.post(
        `${baseUrl}/api/users/addToCart`,
        {
          email: user.email,
          product: productData,
        }
      );

      if (response.data && response.data.message) {
        setSnackbarMessage(response.data.message);

        if (response.data.message === "Product added to cart successfully") {
          updateCartCount((cartCount) => cartCount + 1);
          setSnackbarMessage("Product added to cart");
          setSnackbarOpen(true)
        } else if (response.data.message === "Item already exists in cart") {
          setSnackbarMessage(
            "This item is already in your cart with the same size and color."
          );
          setSnackbarOpen(true)
        }
      } else {
        setSnackbarMessage("Unexpected response format.");
        setSnackbarOpen(true)
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      setSnackbarMessage(err.response?.data?.message || "Error adding to cart");
      setSnackbarOpen(true)
    }
    finally {
      setSelectedProduct(null)
      setSelectedThumbnail(0)
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className={`w-3 h-3 ${index < Math.floor(rating)
              ? "fill-orange-500 text-orange-500"
              : index < rating
                ? "fill-orange-500 text-orange-500 opacity-50"
                : "text-gray-300"
              }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ))}
        <span className="text-xs text-gray-500 ml-1">{rating}</span>
      </div>
    )
  }


  useEffect(() => {
    const getWishlist = async (email) => {
      try {
        const response = await fetch(`${baseUrl}/api/users/getWishlist?email=${encodeURIComponent(email)}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch wishlist");
        }

        const data = await response.json(); // Parse the JSON response
        setWishlist(data.wishlist); // Store the wishlist data in state
        console.log(data.wishlist); // Log to verify data
        setWishlistLoaded(true); // Set loading to false once data is fetched
      } catch (err) {
        console.error("Error fetching wishlist:", err);
        setWishlistLoaded(true); // Set loading to false on error
      }
    };
    if (user && isAuthenticated)
      getWishlist(user.email);
  }, [isAuthenticated, user])

  const toggleWishlist = async (product) => {
    if (!isAuthenticated) {
      setSnackbarMessage("Please login to add items to wishlist")
      setSnackbarOpen(true)
      loginWithPopup()
      return
    }

    try {
      const isInWishlist = wishlist.some(item => item.idD === product.idD)
      const response = await axios.post(
        `${baseUrl}/api/users/addToWishlist`,
        {
          email: user.email,
          product
        }
      )

      if (response.data.success) {
        setWishlist(response.data.updatedWishlist)
        setSnackbarMessage(isInWishlist ? "Removed from wishlist" : "Added to wishlist");
        updateWishlistCount(prevCount => prevCount + (isInWishlist ? -1 : 1));
        setSnackbarOpen(true)
      }
    } catch (err) {
      console.error("Error updating wishlist:", err)
      setSnackbarMessage("Error updating wishlist")
      setSnackbarOpen(true)
    }
  }


  const splitName = bannerName.split(" ")


  const generateThumbnails = (images) => {
    return images.length ? images : ['/placeholder.svg']; // Fallback to placeholder if no images
  };
  useEffect(() => {
    if (snackbarOpen) {
      const timer = setTimeout(() => {
        setSnackbarOpen(false); // Automatically close snackbar after duration
      }, 2000); // Duration can be adjusted as needed

      return () => clearTimeout(timer); // Cleanup timer on unmount or when snackbarOpen changes
    }
  }, [snackbarOpen]);

  return (
    <div>
      {isLoading ? (<ProductGridSkeleton />) : error ? (
        <div className="text-center py-8">
          <p className="text-red-500">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Try Again
          </button>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No products found
        </div>
      ) : (

        <div>
          <div className="container">
            <h1 className="text-4xl font-bold tracking-tight mb-7">
              <span className="text-[#FF6B00]">{splitName[0]} </span>
              <span className="mr-4">{splitName[1]}</span>
              <span className="text-[#FF6B00]">FASH</span>
              IONS
            </h1>
            <div className="relative">
              <div className="flex overflow-x-auto gap-4 pb-4 scroll-smooth hide-scrollbar ps-2">
                {products.map((product, index) => {
                  const { idD, priceD, detailD, nameD, quantityD, ratingD, originalPriceD, imageD } = product;
                  const isInWishlist = wishlist.some(item => item.idD === product.idD);
                  if (index > 5) return;
                  return (
                    <div
                      key={idD}
                      className="min-w-[250px] max-w-[250px] bg-gradient-to-b from-white to-orange-50 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col relative group animate-fade-in-up"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(product);
                        }}
                        className="absolute top-3 left-3 z-10 p-2.5 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300 hover:scale-110 shadow-md"
                      >
                        <Heart
                          className={`w-5 h-5 ${isInWishlist
                            ? "fill-pink-500 text-pink-500"
                            : "text-gray-600 hover:text-pink-500"
                            }`}
                        />
                      </button>

                      <div className="relative">
                        <div className="flex justify-center items-center h-[220px] p-4 bg-gradient-to-br from-orange-100/50 to-pink-100/50 group-hover:scale-105 transition-transform duration-300">
                          <img
                            src={imageD || "/placeholder.svg"}
                            alt={nameD}
                            className="object-cover h-full rounded-2xl"
                          />
                        </div>

                        <span className="absolute top-3 right-3 px-3 py-1.5 bg-black/80 backdrop-blur-sm text-white text-xs font-bold rounded-full">
                          {Math.round(((parseFloat(originalPriceD) - parseFloat(priceD)) / parseFloat(originalPriceD)) * 100)}% OFF
                        </span>
                      </div>

                      <div className="flex flex-col h-full p-4">
                        {/* Product Info Section */}
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800">{nameD}</h3>
                          <p className="text-sm text-gray-600 line-clamp-2 mt-2">{detailD}</p>

                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-lg font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                              ₹ {priceD}
                            </span>
                            <span className="text-sm text-gray-400 line-through">
                              ₹ {originalPriceD}
                            </span>
                          </div>

                          {renderStars(ratingD)}

                          <div className="text-sm mt-2">
                            <span
                              className={`px-2 py-1 rounded-full ${quantityD < 5
                                ? "bg-red-100 text-red-600"
                                : quantityD < 10
                                  ? "bg-orange-100 text-orange-600"
                                  : "bg-green-100 text-green-600"
                                }`}
                            >
                              {quantityD === 0
                                ? "Sold out"
                                : quantityD < 5
                                  ? "Only " + quantityD + " left!"
                                  : quantityD < 10
                                    ? "Limited stock"
                                    : "In stock"}
                            </span>
                          </div>
                        </div>

                        {/* Button Section - Always at Bottom */}
                        <button
                          onClick={() => setSelectedProduct(product)}
                          className="w-full px-4 py-2.5 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl hover:opacity-90 transition-opacity duration-300 font-medium shadow-md hover:shadow-lg mt-4"
                        >
                          Quick View
                        </button>
                      </div>
                    </div>

                  )
                })}
                <div className="min-w-[220px] flex items-center justify-center">
                  <a
                    href="/collections"
                    className="px-4 py-2 bg-transparent hover:bg-orange-500 text-orange-500 hover:text-white border border-orange-500 rounded-md transition-all duration-300 flex items-center gap-2 group text-sm shadow-sm hover:shadow-md"
                  >
                    Explore More
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {selectedProduct && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-2 md:p-4">
              <div className="bg-white rounded-3xl w-full max-w-6xl h-[95vh] md:h-[85vh] overflow-y-auto">
                {/* Header Section - Same as before */}
                <div className="sticky top-0 bg-white p-3 md:p-4 border-b z-10">
                  <div className="flex justify-between items-center">
                    <div className="text-xs md:text-sm font-medium bg-purple-100 text-orange-600 px-2 py-1 rounded-full">
                      Limited Edition 🔥
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(selectedProduct);
                        }}
                        className="p-1.5 rounded-full bg-pink-50 hover:bg-pink-100 transition-all"
                      >
                        <Heart
                          className={`w-4 h-4 md:w-5 md:h-5 ${wishlist.some(item => item.idD === selectedProduct.idD)
                            ? "fill-pink-500 text-pink-500"
                            : "text-gray-600 hover:text-pink-500"
                            }`}
                        />
                      </button>
                      <button
                        onClick={() => setSelectedProduct(null)}
                        className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-all"
                      >
                        <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="flex flex-col lg:flex-row">
                  {/* Mobile View */}
                  <div className="flex lg:hidden flex-col">
                    {/* Mobile Thumbnail Strip */}
                    <div className="flex gap-2 p-2 overflow-x-auto sticky top-14 bg-white z-10">
                      {generateThumbnails(selectedProduct.imageD).map((img, index) => (
                        <div
                          key={index}
                          onClick={() => setSelectedThumbnail(index)}
                          className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden cursor-pointer ${selectedThumbnail === index
                            ? "ring-2 ring-orange-500"
                            : "hover:ring-1 hover:ring-orange-300"
                            }`}
                        >
                          <img
                            src={img || "/placeholder.svg"}
                            alt={`View ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>

                    {/* Mobile Main Image */}
                    <div className="p-3 flex items-center justify-center bg-gray-50">
                      <div className="relative w-full max-w-sm mx-auto h-[250px] rounded-xl overflow-hidden">
                        <img
                          src={generateThumbnails(selectedProduct.imageD)[selectedThumbnail] || "/placeholder.svg"}
                          alt={selectedProduct.nameD}
                          className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>

                    {/* Mobile Product Details */}
                    <div className="p-4">
                      {/* Product Title and Description */}
                      <div className="mb-4">
                        <h2 className="text-xl font-bold mb-2 bg-gradient-to-r from-orange-600 to-pink-500 bg-clip-text text-transparent">
                          {selectedProduct.nameD}
                        </h2>
                        <p className="text-gray-600 text-sm">{selectedProduct.detailD}</p>
                      </div>

                      {/* Price Section */}
                      <div className="flex items-center gap-2 mb-6">
                        <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-500 bg-clip-text text-transparent">
                          ₹ {selectedProduct.priceD}
                        </span>
                        <span className="text-base text-gray-400 line-through">₹ {selectedProduct.originalPriceD}</span>
                        <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          {Math.round(
                            ((Number.parseFloat(selectedProduct.originalPriceD) - Number.parseFloat(selectedProduct.priceD)) /
                              Number.parseFloat(selectedProduct.originalPriceD)) *
                            100
                          )}
                          % OFF
                        </span>
                      </div>

                      {/* Color Selection */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Vibe Check 🎨</label>
                        <div className="flex gap-2">
                          {selectedProduct.colorD?.map((color, index) => (
                            <label
                              key={index}
                              className={`cursor-pointer w-7 h-7 rounded-lg transition-all hover:scale-110 ${selectedColor === color ? "ring-2 ring-orange-500 shadow-sm" : ""
                                }`}
                              style={{ backgroundColor: color }}
                            >
                              <input
                                type="radio"
                                name="color"
                                value={color}
                                className="sr-only"
                                onChange={() => setSelectedColor(color)}
                                checked={selectedColor === color}
                              />
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Size Selection */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Size Feels ✨</label>
                        <div className="flex flex-wrap gap-2">
                          {selectedProduct.sizeD?.map((size, index) => (
                            <label
                              key={index}
                              className={`cursor-pointer px-3 py-1.5 rounded-lg text-sm transition-all hover:scale-105 ${selectedSize === size
                                ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-sm"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                            >
                              <input
                                type="radio"
                                name="size"
                                value={size}
                                className="sr-only"
                                onChange={() => setSelectedSize(size)}
                                checked={selectedSize === size}
                              />
                              {size}
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Quantity Selection */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Quantity Squad 👥</label>
                        <div className="flex items-center gap-3">
                          <button
                            className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 text-sm font-bold transition-all"
                            onClick={decreaseQuantity}
                          >
                            -
                          </button>
                          <span className="text-lg font-bold w-8 text-center">{quantity}</span>
                          <button
                            className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 text-sm font-bold transition-all"
                            onClick={increaseQuantity}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Stock Status and Rating */}
                      <div className="mb-4">
                        <div className="text-sm">
                          <span
                            className={`font-medium ${selectedProduct.quantityD < 5
                              ? "text-red-500"
                              : selectedProduct.quantityD < 10
                                ? "text-orange-500"
                                : "text-green-500"
                              }`}
                          >
                            {selectedProduct.quantityD < 5
                              ? "Selling Fast! Only " + selectedProduct.quantityD + " left! 🏃‍♂️"
                              : selectedProduct.quantityD < 10
                                ? "Almost Gone! 🔥"
                                : "In Stock & Ready to Ship! 🚀"}
                          </span>
                        </div>
                        {renderStars(selectedProduct.ratingD)}
                      </div>

                      {/* Add to Cart Button */}
                      <button
                        className="w-full py-3 mt-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-all text-sm font-bold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        onClick={() => handleAddToCart(selectedProduct)}
                      >
                        Add to Cart 🛍️
                      </button>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden lg:flex lg:flex-row w-full">
                    {/* Left Column - Images (35%) */}
                    <div className="w-[35%] bg-gray-50 p-4">
                      {/* Desktop Main Image */}
                      <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-4">
                        <img
                          src={generateThumbnails(selectedProduct.imageD)[selectedThumbnail] || "/placeholder.svg"}
                          alt={selectedProduct.nameD}
                          className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      {/* Desktop Thumbnails */}
                      <div className="flex flex-wrap gap-2">
                        {generateThumbnails(selectedProduct.imageD).map((img, index) => (
                          <div
                            key={index}
                            onClick={() => setSelectedThumbnail(index)}
                            className={`w-16 h-16 rounded-lg overflow-hidden cursor-pointer transition-all hover:scale-105 ${selectedThumbnail === index
                              ? "ring-2 ring-orange-500 shadow-sm"
                              : "hover:ring-1 hover:ring-orange-300"
                              }`}
                          >
                            <img
                              src={img || "/placeholder.svg"}
                              alt={`View ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right Column - Details (65%) */}
                    <div className="w-[65%] p-4">
                      {/* Product Title and Description */}
                      <div className="mb-4">
                        <h2 className="text-xl font-bold mb-2 bg-gradient-to-r from-orange-600 to-pink-500 bg-clip-text text-transparent">
                          {selectedProduct.nameD}
                        </h2>
                        <p className="text-gray-600 text-sm">{selectedProduct.detailD}</p>
                      </div>

                      {/* Price Section */}
                      <div className="flex items-center gap-2 mb-6">
                        <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-500 bg-clip-text text-transparent">
                          ₹ {selectedProduct.priceD}
                        </span>
                        <span className="text-base text-gray-400 line-through">₹ {selectedProduct.originalPriceD}</span>
                        <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          {Math.round(
                            ((Number.parseFloat(selectedProduct.originalPriceD) - Number.parseFloat(selectedProduct.priceD)) /
                              Number.parseFloat(selectedProduct.originalPriceD)) *
                            100
                          )}
                          % OFF
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          {/* Color Selection */}
                          <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Vibe Check 🎨</label>
                            <div className="flex gap-2">
                              {selectedProduct.colorD?.map((color, index) => (
                                <label
                                  key={index}
                                  className={`cursor-pointer w-7 h-7 rounded-lg transition-all hover:scale-110 ${selectedColor === color ? "ring-2 ring-orange-500 shadow-sm" : ""
                                    }`}
                                  style={{ backgroundColor: color }}
                                >
                                  <input
                                    type="radio"
                                    name="color"
                                    value={color}
                                    className="sr-only"
                                    onChange={() => setSelectedColor(color)}
                                    checked={selectedColor === color}
                                  />
                                </label>
                              ))}
                            </div>
                          </div>

                          {/* Size Selection */}
                          <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Size Feels ✨</label>
                            <div className="flex flex-wrap gap-2">
                              {selectedProduct.sizeD?.map((size, index) => (
                                <label
                                  key={index}
                                  className={`cursor-pointer px-3 py-1.5 rounded-lg text-sm transition-all hover:scale-105 ${selectedSize === size
                                    ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-sm"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                                >
                                  <input
                                    type="radio"
                                    name="size"
                                    value={size}
                                    className="sr-only"
                                    onChange={() => setSelectedSize(size)}
                                    checked={selectedSize === size}
                                  />
                                  {size}
                                </label>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div>
                          {/* Quantity Selection */}
                          <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Quantity Squad 👥</label>
                            <div className="flex items-center gap-3">
                              <button
                                className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 text-sm font-bold transition-all"
                                onClick={decreaseQuantity}
                              >
                                -
                              </button>
                              <span className="text-lg font-bold w-8 text-center">{quantity}</span>
                              <button
                                className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 text-sm font-bold transition-all"
                                onClick={increaseQuantity}
                              >
                                +
                              </button>
                            </div>
                          </div>

                          {/* Stock Status and Rating */}
                          <div className="mb-4">
                            <div className="text-sm">
                              <span
                                className={`font-medium ${selectedProduct.quantityD < 5
                                  ? "text-red-500"
                                  : selectedProduct.quantityD < 10
                                    ? "text-orange-500"
                                    : "text-green-500"
                                  }`}
                              >
                                {selectedProduct.quantityD < 5
                                  ? "Selling Fast! Only " + selectedProduct.quantityD + " left! 🏃‍♂️"
                                  : selectedProduct.quantityD < 10
                                    ? "Almost Gone! 🔥"
                                    : "In Stock & Ready to Ship! 🚀"}
                              </span>
                            </div>
                            {renderStars(selectedProduct.ratingD)}
                          </div>
                        </div>
                      </div>

                      {/* Add to Cart Button */}
                      <button
                        className="w-full py-3 mt-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-all text-sm font-bold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        onClick={() => handleAddToCart(selectedProduct)}
                      >
                        Add to Cart 🛍️
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <Snackbar
            message={snackbarMessage}
            isOpen={snackbarOpen}
            onClose={() => setSnackbarOpen(false)}
            duration={2000}
          />
          <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }
      `}</style>
        </div>)}
    </div>
  )
}
