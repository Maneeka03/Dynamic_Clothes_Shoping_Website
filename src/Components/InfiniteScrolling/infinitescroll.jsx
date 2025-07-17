import React from "react";
import { useNavigate } from "react-router-dom";
import Dress7 from "../../assets/dress7.jpeg";
import Dress8 from "../../assets/dress8.jpeg";
import Dress2 from "../../assets/dress2.webp";
import Dress6 from "../../assets/dress6.webp";
import Dress4 from "../../assets/dress4.webp";
import Dress5 from "../../assets/dress5.webp";
import Dress1 from "../../assets/dress1.webp";
import Dress9 from "../../assets/dress9.webp";
import Dress10 from "../../assets/dress10.avif";
import Dress11 from "../../assets/dress11.jpeg";
import Dress12 from "../../assets/dress12.webp";
import Dress13 from "../../assets/dress13.webp";
import Dress14 from "../../assets/dress14.jpeg";
import Dress15 from "../../assets/dress15.jpeg";

const brandImages = [
  Dress4,
  Dress1,
  Dress2,
  Dress5,
  Dress6,
  Dress7,
  Dress8,
  Dress9,
  Dress10,
  Dress11,
  Dress12,
  Dress13,
  Dress14,
  Dress15,
];

const Scroller = ({ direction }) => {
  const navigate = useNavigate();

  return (
    <div className="scroller-container">
      <div className={`scroller-content animate-scroll-${direction}`}>
        {brandImages.concat(brandImages).map((imageUrl, index) => (
          <div
            key={index}
            className="w-24 h-24 flex-shrink-0 rounded-full border-4 border-primary overflow-hidden shadow-md transition-transform hover:scale-110 cursor-pointer"
            onClick={() => navigate("/collections")}
          >
            <div className="w-full h-full relative">
              <img
                src={imageUrl}
                className="absolute inset-0 w-full h-full object-cover rounded-full"

              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const InfiniteImageScroll = () => {
  return (
    <>
      <style>
        {`
          @keyframes scroll-left {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-100%);
            }
          }

          @keyframes scroll-right {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(0);
            }
          }

          .animate-scroll-left {
            animation: scroll-left 40s linear infinite;
          }

          .animate-scroll-right {
            animation: scroll-right 40s linear infinite;
          }

          .scroller-container {
            display: flex;
            overflow: hidden;
            width: 100%;
          }

          .scroller-content {
            display: flex;
            gap: 1rem;
            padding: 1rem 0;
            white-space: nowrap;
            min-width: 100%;
          }
        `}
      </style>
      <div className="flex flex-col items-center justify-center mt-9">
        <div className="w-full overflow-hidden">
          <div className="mb-5">
            <Scroller direction="left" />
          </div>
          {/* <div>
            <Scroller direction="right" />
          </div> */}
        </div>
      </div>
    </>
  );
};

export default InfiniteImageScroll;
