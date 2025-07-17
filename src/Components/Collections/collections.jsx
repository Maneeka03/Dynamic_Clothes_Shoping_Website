import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Snackbar from "../snackbar";
import { ChevronDown, ChevronUp, Heart } from 'lucide-react';
import { useAuth0 } from "@auth0/auth0-react";
import ProductGridSkeleton from "../ProductSkeleton/ProductLoadingSkeleton";

const FilterDropdown = ({ title, items, checkedItems, onItemChange, isActive, onClick, renderItem }) => (
  <div className="relative">
    <button
      onClick={onClick}
      className="flex items-center justify-between w-full px-4 py-2.5 rounded-full border-2 border-orange-200 
      hover:border-orange-400 hover:shadow-md transition-all duration-200 bg-white group"
    >
      <span className="text-sm font-medium">{title}</span>
      <ChevronDown className={`w-4 h-4 text-orange-500 transition-transform duration-200 
        ${isActive ? 'rotate-180' : ''} group-hover:scale-110`} />
    </button>


    {isActive && (
      <div className="absolute z-10 mt-3 w-56 bg-gradient-to-b from-white to-orange-50 border-2 border-orange-200 rounded-3xl shadow-2xl animate-fadeIn">
        <div className="p-4 space-y-3">
          {items.map((item) => (
            <label key={item}
              className="relative flex items-center px-3 py-2 text-sm font-medium rounded-xl 
          hover:bg-white hover:shadow-md transition-all duration-200 cursor-pointer group"
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type="checkbox"
                checked={checkedItems[item]}
                onChange={() => onItemChange(item)}
                className="peer sr-only"
              />
              <div className="w-4 h-4 mr-3 rounded-full border-2 border-orange-300 
            peer-checked:bg-orange-500 peer-checked:border-orange-500 transition-colors duration-200
            after:content-['✓'] after:text-white after:text-xs after:opacity-0 
            peer-checked:after:opacity-100 after:absolute after:left-4 after:top-2.5"
              />
              <span className="group-hover:text-orange-600 transition-colors duration-200">
                {renderItem ? renderItem(item) : item}
              </span>
            </label>
          ))}
        </div>
      </div>
    )}
  </div>
);

const ClothFilter = ({ updateCartCount, updateWishlistCount }) => {
  const [clothList, setClothList] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [subCategoryFilters, setSubCategoryFilters] = useState({});
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const [quantity, setQuantity] = useState(1);
  const [selectedThumbnail, setSelectedThumbnail] = useState(0);
  const { isAuthenticated, user, loginWithPopup } = useAuth0();
  const bannerName = "FILTERED RESULTS";
  const [wishlist, setWishlist] = useState([]);
  const [wishlistLoaded, setWishlistLoaded] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [error, setError] = useState('');

  const handleDropdownClick = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

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

  const [activeFilter, setActiveFilter] = useState(null);
  const [nameFilters, setNameFilters] = useState({
    Kurta: false,
    "Kurtas Sets": false,
    Gown: false,
    Bottom: false,
    Tops: false
  });

  const subCategories = {
    Kurta: ["A-Line Straight Kurta", "Embroidery Kurta", "Straight Kurta"],
    "Kurtas Sets": [
      "Ethnic Embroidered Sequinned Kurta",
      "Printed Kurtas",
      "Kurta With Trousers & With Dupatta",
    ],
    Gown: ["Ankle Gown", "Gown With Malmal Dupatta", "Gown With Chinon Dupatta"],
    Bottom: ["Pant", "Palazzo"],
    Tops: ["Co-Ords", "Shirt", "Short", "Tunics"],
  };

  const [ratingFilters, setRatingFilters] = useState({
    '4.5+': false,
    '4.0-4.4': false,
    '3.5-3.9': false,
    '3.0-3.4': false,
    'Below 3.0': false
  });

  const [colorFilters, setColorFilters] = useState({
    Orange: false,
    Purple: false,
    Yellow: false,
    Blue: false,
    Black: false,
    Red: false,
    Green: false,
    Pink: false,

  });

  const [sizeFilters, setSizeFilters] = useState({
    S: false,
    M: false,
    L: false,
    XL: false,
    XXL: false,

  });

  const [priceFilters, setPriceFilters] = useState({
    "0-1500": false,
    "1500-3500": false,
    "3500+": false,
  });

  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    if (selectedProduct) {
      setSelectedColor(selectedProduct.colorD?.[0] || "");
      setSelectedSize(selectedProduct.sizeD?.[0] || "");
    }
  }, [selectedProduct])

  useEffect(() => {

    const fetchCloths = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get(
          `${baseUrl}/api/cloth/getCloth`
        );
        setClothList(response.data);
      } catch (e) {
        console.error("Error fetching cloths:", e);
        setError(e)
      } finally {
        setIsLoading(false);
      }
    };

    fetchCloths();
  }, []);

  const handleNameChange = (name) => {
    setNameFilters((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));

    if (nameFilters[name]) {
      setSubCategoryFilters((prev) => {
        const newFilters = { ...prev };
        subCategories[name].forEach((subCat) => {
          delete newFilters[subCat];
        });
        return newFilters;
      });
    }
  };

  const handleSubCategoryChange = (subCategory) => {
    setSubCategoryFilters((prev) => ({
      ...prev,
      [subCategory]: !prev[subCategory],
    }));
  };

  const handleRatingChange = (range) => {
    setRatingFilters(prev => ({ ...prev, [range]: !prev[range] }));
  };


  const handleSizeChange = (size) => {
    setSizeFilters((prev) => ({ ...prev, [size]: !prev[size] }));
  };

  const handleColorChange = (color) => {
    setColorFilters((prev) => ({ ...prev, [color]: !prev[color] }));
  };

  const handlePriceChange = (range) => {
    setPriceFilters((prev) => ({ ...prev, [range]: !prev[range] }));
  };


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
          increaseQuantity: true
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

  const generateThumbnails = (images) => {
    return images.length ? images : ['/placeholder.svg']; // Fallback to placeholder if no images
  };
  const filteredCloths = clothList.filter((cloth) => {
    const matchesName =
      Object.values(nameFilters).every((val) => !val) ||
      Object.keys(nameFilters).some(
        (name) =>
          nameFilters[name] &&
          cloth.nameD.toLowerCase().includes(name.toLowerCase())
      );

    const matchesSubCategory =
      Object.values(subCategoryFilters).every((val) => !val) ||
      Object.keys(subCategoryFilters).some(
        (subCat) =>
          subCategoryFilters[subCat] &&
          cloth.nameD.toLowerCase().includes(subCat.toLowerCase())
      );

    const matchesColor =
      Object.values(colorFilters).every((val) => !val) ||
      (cloth.colorD.length > 0 &&
        cloth.colorD.some((color) => colorFilters[color]));

    const matchesSize =
      Object.values(sizeFilters).every((val) => !val) ||
      (cloth.sizeD.length > 0 && cloth.sizeD.some((size) => sizeFilters[size]));

    const matchesPrice =
      Object.values(priceFilters).every((val) => !val) ||
      (priceFilters["0-1500"] && cloth.priceD >= 0 && cloth.priceD <= 1500) ||
      (priceFilters["1500-3500"] &&
        cloth.priceD > 1500 &&
        cloth.priceD <= 3500) ||
      (priceFilters["3500+"] && cloth.priceD > 3500);

    const matchesRating =
      Object.values(ratingFilters).every(val => !val) ||
      (ratingFilters['4.5+'] && cloth.ratingD >= 4.5) ||
      (ratingFilters['4.0-4.4'] && cloth.ratingD >= 4.0 && cloth.ratingD < 4.5) ||
      (ratingFilters['3.5-3.9'] && cloth.ratingD >= 3.5 && cloth.ratingD < 4.0) ||
      (ratingFilters['3.0-3.4'] && cloth.ratingD >= 3.0 && cloth.ratingD < 3.5) ||
      (ratingFilters['Below 3.0'] && cloth.ratingD < 3.0);

    return (
      matchesName &&
      matchesSubCategory &&
      matchesColor &&
      matchesSize &&
      matchesPrice &&
      matchesRating
    );
  });

  const sortedCloths = filteredCloths.sort((a, b) => {
    return sortOrder === "asc" ? a.priceD - b.priceD : b.priceD - a.priceD;
  });

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
    );
  };

  const splitName = bannerName.split(" ");


  // ... [Previous state declarations remain the same]

  const handleFilterClick = (filterName) => {
    setActiveFilter(activeFilter === filterName ? null : filterName);
  };

  return (
    <div className="flex flex-col lg:flex-row p-4 lg:p-10 gap-6">
      {/* Filters Section */}
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Search and Filter Bar */}
          <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-3xl shadow-lg mb-8">
            <div className="p-4 border-b border-orange-100">
              <h2 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                ✨ Filter Your Vibe ✨
              </h2>
            </div>

            <div className="p-6">
              <div className="flex flex-wrap gap-4">
                <FilterDropdown
                  title="Categories"
                  items={Object.keys(nameFilters)}
                  checkedItems={nameFilters}
                  onItemChange={handleNameChange}
                  isActive={activeFilter === 'categories'}
                  onClick={() => handleFilterClick('categories')}
                  className="flex-1 min-w-[200px]"
                  renderItem={(name) => (
                    <div>
                      <span>{name}</span>
                      {nameFilters[name] && subCategories[name] && (
                        <div className="ml-4 mt-2 space-y-1">
                          {subCategories[name].map((subCat) => (
                            <label key={subCat} className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={subCategoryFilters[subCat]}
                                onChange={() => handleSubCategoryChange(subCat)}
                                className="w-3 h-3"
                              />
                              <span className="text-sm text-gray-600">{subCat}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                />

                <FilterDropdown
                  title="Colors"
                  items={Object.keys(colorFilters)}
                  checkedItems={colorFilters}
                  onItemChange={handleColorChange}
                  isActive={activeFilter === 'colors'}
                  onClick={() => handleFilterClick('colors')}
                  className="flex-1 min-w-[160px]"
                  renderItem={(color) => (
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full border border-gray-200"
                        style={{ backgroundColor: color.toLowerCase() }}
                      />
                      <span>{color}</span>
                    </div>
                  )}
                />

                <FilterDropdown
                  title="Sizes"
                  items={Object.keys(sizeFilters)}
                  checkedItems={sizeFilters}
                  onItemChange={handleSizeChange}
                  isActive={activeFilter === 'sizes'}
                  onClick={() => handleFilterClick('sizes')}
                  className="flex-1 min-w-[120px]"
                />

                <FilterDropdown
                  title="Price Range"
                  items={Object.keys(priceFilters)}
                  checkedItems={priceFilters}
                  onItemChange={handlePriceChange}
                  isActive={activeFilter === 'price'}
                  onClick={() => handleFilterClick('price')}
                  className="flex-1 min-w-[160px]"
                />

                <FilterDropdown
                  title="Rating"
                  items={Object.keys(ratingFilters)}
                  checkedItems={ratingFilters}
                  onItemChange={handleRatingChange}
                  isActive={activeFilter === 'rating'}
                  onClick={() => handleFilterClick('rating')}
                  className="flex-1 min-w-[160px]"
                  renderItem={(rating) => (
                    <div className="flex items-center gap-1">
                      {rating}
                      {rating !== 'Below 3.0' && (
                        <div className="flex">
                          {[...Array(Math.floor(parseFloat(rating)))].map((_, i) => (
                            <svg
                              key={i}
                              className="w-4 h-4 text-orange-500 fill-current"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                />

                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="flex-1 min-w-[160px] px-4 py-3 bg-white rounded-2xl border-2 border-gray-200 
              focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300
              hover:border-orange-400 hover:shadow-lg"
                >
                  <option value="asc">💰 Price: Low to High</option>
                  <option value="desc">💎 Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
          {/* Products Section */}
          <div className="flex-1 p-0 m-0">
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
            ) :
              sortedCloths.length === 0 ? (
                <p>No items found matching your criteria.</p>
              ) : (
                <div>
                  <div className="container space-y-4 p-0 m-0 ">
                    <h1 className="text-4xl font-bold tracking-tight mb-7">
                      <span className="text-[#FF6B00]">{splitName[0]} </span>
                      <span className="mr-4">{splitName[1]}</span>
                      <span className="text-[#FF6B00]">FASH</span>
                      IONS
                    </h1>
                    <div className="relative">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-4 mx-auto">
                        {sortedCloths.map((product, index) => {
                          const { idD, priceD, detailD, nameD, quantityD, ratingD, originalPriceD, imageD } = product;
                          const isInWishlist = wishlist.some(item => item.idD === product.idD);
                          return (
                            <div
                              key={idD}
                              className="w-full sm:min-w-[250px] sm:max-w-[250px] bg-gradient-to-b from-white to-orange-50 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col relative group animate-fade-in-up"
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
                                <div className="flex justify-center items-center h-[220px] sm:h-[180px] p-4 bg-gradient-to-br from-orange-100/50 to-pink-100/50 group-hover:scale-105 transition-transform duration-300">
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
                                <div className="flex-1">
                                  <h3 className="font-bold text-gray-800 text-lg sm:text-base">{nameD}</h3>
                                  <p className="text-sm text-gray-600 line-clamp-2 mt-2">{detailD}</p>

                                  <div className="flex items-center gap-2 mt-2">
                                    <span className="text-xl sm:text-lg font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                                      ₹ {priceD}
                                    </span>
                                    <span className="text-base sm:text-sm text-gray-400 line-through">
                                      ₹ {originalPriceD}
                                    </span>
                                  </div>

                                  {renderStars(ratingD)}

                                  <div className="text-base sm:text-sm mt-2">
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

                                <button
                                  onClick={() => setSelectedProduct(product)}
                                  className="w-full px-4 py-3 sm:py-2.5 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl hover:opacity-90 transition-opacity duration-300 font-medium shadow-md hover:shadow-lg mt-4 text-lg sm:text-base"
                                >
                                  Quick View
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  {/* </div> */}


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
                </div>
              )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ClothFilter;

