import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import InfiniteScrolling from "../InfiniteScrolling/infinitescroll";
import FashionCategories from "../FashionCategory/Fashioncategory";
import ProductScroll from "../ProductCards/Product";
import Winter from "../../assets/winter_offer.jpg";
import Summer from "../../assets/summer.webp";
import Festive from "../../assets/festive.webp";
import Waves from "../Waves/waves";
// import Discover from "../../assets/Dicover.jpg";
import DiscoverSectiob from "../DiscoverSection/discoverSection";
import { useNavigate } from "react-router-dom";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const products = [
  {
    id: 1,
    image: Winter,
    title: "Winter Essentials",
    price: "Rs. 2999/-",
  },
  {
    id: 2,
    image: Summer,
    title: "Summer Collection",
    price: "Rs. 3400/-",
  },
  {
    id: 3,
    image: Festive,
    title: "Festive Specials",
    price: "Rs. 7450/-",
  },
];

export default function Home({ updateCartCount, cartCount, updateWishlistCount }) {
  const [showVideo, setShowVideo] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const navigate = useNavigate();

  const VideoPlayer = () => {
    useEffect(() => {
      const handleYouTubeMessage = (event) => {
        // Check if the message is from YouTube and indicates video ended
        if (event.origin === 'https://www.youtube.com' &&
          event.data &&
          event.data.event === 'onStateChange' &&
          event.data.info === 0) {
          setShowVideo(false); // Set showVideo to false when video ends
        }
      };

      // Add event listener for YouTube player messages
      window.addEventListener('message', handleYouTubeMessage);

      // Cleanup listener on component unmount
      return () => {
        window.removeEventListener('message', handleYouTubeMessage);
      };
    }, []);

    const videoUrl = `https://www.youtube.com/embed/x_nbPiZsdVM?autoplay=1&controls=1&mute=0&loop=0&enablejsapi=1&origin=${window.location.origin}`;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative flex justify-center items-center"
      >
        <div className="relative w-full aspect-[4/3] bg-[#F8F8F8] rounded-3xl overflow-hidden border-r-8 border-primary">
          <iframe
            src={videoUrl}
            title="YouTube Video"
            className="w-full h-full"
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
            frameBorder="0"
          />
        </div>
      </motion.div>
    );
  };

  const toggleVideoMode = () => {
    setShowVideo((prev) => !prev);
    setCurrentSlide(0);
  };

  useEffect(() => {
    let timer;
    if (!showVideo) {
      timer = setInterval(() => {
        setDirection(1);
        setCurrentSlide((prevSlide) => (prevSlide + 1) % products.length);
      }, 3000);
    }

    return () => clearInterval(timer);
  }, [showVideo]);

  const headlines = [
    "Everyday Style",
    "Unique Fashion",
    "Perfect Look",
    "Bold Statement",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  const sliderTransition = {
    x: { type: "spring", stiffness: 200, damping: 30 },
    opacity: { duration: 0.5 },
  };

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-100 to-white">
        <div className="absolute bottom-0 left-0 right-0 ">
          <svg
            viewBox="0 0 1200 12"
            className="w-full h-3 fill-primary mt-6"
            preserveAspectRatio="none"
          >
            <path d="M0,0 L20,12 L40,0 L60,12 L80,0 L100,12 L120,0 L140,12 L160,0 L180,12 L200,0 L220,12 L240,0 L260,12 L280,0 L300,12 L320,0 L340,12 L360,0 L380,12 L400,0 L420,12 L440,0 L460,12 L480,0 L500,12 L520,0 L540,12 L560,0 L580,12 L600,0 L620,12 L640,0 L660,12 L680,0 L700,12 L720,0 L740,12 L760,0 L780,12 L800,0 L820,12 L840,0 L860,12 L880,0 L900,12 L920,0 L940,12 L960,0 L980,12 L1000,0 L1020,12 L1040,0 L1060,12 L1080,0 L1100,12 L1120,0 L1140,12 L1160,0 L1180,12 L1200,0" />
          </svg>
        </div>
        <div className="container mx-auto h-[140vh] relative sm:h-[100vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Brand Info */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="flex flex-col justify-center  mt-12 sm:mt-20 md:py-0 font-playfair relative z-10"
            >
              <div className="space-y-8 max-w-xl">
                <motion.span
                  variants={fadeInUp}
                  className="inline-block px-4 py-1 rounded-full bg-orange-200 text-orange-600 text-sm font-medium"
                >
                  New Collection 2024
                </motion.span>

                <motion.h1
                  variants={fadeInUp}
                  className="text-5xl lg:text-7xl font-bold leading-tight text-gray-800"
                >
                  Elevate Your{" "}
                  <div className="text-orange-500 relative h-24">
                    {" "}
                    {/* Fixed height container */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentIndex}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                          y: { type: "spring", stiffness: 300, damping: 30 },
                          opacity: { duration: 0.5 },
                        }}
                        className="absolute w-[90%]"
                      >
                        {headlines[currentIndex]}
                        <svg
                          className="absolute -bottom-2 left-0 "
                          viewBox="0 0 358 8"
                          fill="none"
                        >
                          <motion.path
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1 }}
                            d="M2 5.5C59.3333 2.5 174.5 -0.5 356 6"
                            stroke="currentColor"
                            strokeWidth="4"
                            strokeLinecap="round"
                          />
                        </svg>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </motion.h1>

                <motion.p
                  variants={fadeInUp}
                  className="text-lg text-gray-600 leading-relaxed"
                >
                  Discover our curated collection of premium fashion pieces
                  designed to enhance your personal style. Shop the latest
                  trends and timeless classics.
                </motion.p>

                <motion.div
                  variants={fadeInUp}
                  className="flex flex-wrap gap-4 pt-4"
                >
                  <button className="group flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-4 rounded-full font-medium  hover:!scale-110 duration-300" onClick={() => navigate("/collections")}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 group-hover:scale-110 transition-transform"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Shop Now
                  </button>
                  <button className="group flex items-center gap-2 bg-white text-gray-800 px-8 py-4 rounded-full font-medium border-2 border-orange-500   hover:!scale-110 duration-300" onClick={toggleVideoMode}>
                    {!showVideo ?
                      <><svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-orange-500 group-hover:scale-110 transition-transform"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                          clipRule="evenodd"
                        />
                      </svg>
                        Watch Video</> :
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-orange-500 group-hover:scale-110 transition-transform"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM6 7h2v6H6V7zm6 0h2v6h-2V7z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Stop Video

                      </>
                    }

                  </button>
                </motion.div>

                {/* Stats Section */}
                <motion.div
                  variants={fadeInUp}
                  className="flex gap-8 pt-8 border-t"
                >
                  <div className="bg-white p-4 rounded-[15%] border-t-8  border-primary  hover:!scale-110 duration-300">
                    <p className="text-3xl font-bold text-gray-900">50k+</p>
                    <p className="text-sm text-gray-600">Happy Customers</p>
                  </div>
                  <div className="bg-white p-4 rounded-[15%] border-t-8 px-10 border-primary  hover:!scale-110 duration-300">
                    <p className="text-3xl font-bold text-gray-900">4.9</p>
                    <div className="flex items-center gap-1 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-yellow-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <p className="text-sm text-gray-600">Rating</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Image Carousel */}
            {showVideo ? <VideoPlayer /> :

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex justify-center items-center w-full px-4 md:px-0 md:w-[700px]"
              >
                <div className="relative w-full md:w-[2000px] aspect-[4/3] bg-[#F8F8F8] rounded-2xl md:rounded-3xl overflow-hidden border-r-4 md:border-r-8 border-primary h-[50vh] md:h-[75vh]">
                  <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                      key={currentSlide}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={sliderTransition}
                      className="absolute inset-0 w-full h-full"
                    >
                      <img
                        src={products[currentSlide].image || "/placeholder.svg"}
                        alt={products[currentSlide].title}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Product Card */}
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="absolute top-0 right-2 md:right-4 bg-white p-2 md:p-4 rounded-b-lg md:rounded-b-xl shadow-lg  w-auto"
                  >
                    <div className="flex items-center gap-2 md:gap-3">
                      <div>
                        <p className="text-xs md:text-sm font-medium text-gray-900">
                          {products[currentSlide].title}
                        </p>
                        <p className="text-sm md:text-base text-orange-500 font-bold">
                          {products[currentSlide].price}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Shipping Card */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="absolute -bottom-4 md:-bottom-6 left-2 md:left-4 bg-white p-4 md:p-8 rounded-lg md:rounded-xl shadow-lg z-20"
                  >
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-8 h-8 md:w-12 md:h-12 bg-orange-100 rounded-full flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 md:h-6 md:w-6 text-orange-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs md:text-sm font-medium text-gray-600">
                          Free Shipping
                        </p>
                        <p className="text-sm md:text-lg font-bold text-gray-900">
                          Worldwide
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>}
          </div>
        </div>
      </section>
      <InfiniteScrolling />
      <ProductScroll updateCartCount={updateCartCount} cartCount={cartCount} updateWishlistCount={updateWishlistCount} />
      <FashionCategories />
      <DiscoverSectiob />
      <Waves />
    </>
  );
}
