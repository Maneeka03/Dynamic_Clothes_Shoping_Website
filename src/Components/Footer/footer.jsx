import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-800 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">ADAA Jaipur</h3>
            <p className="text-white text-sm">
              Elevate your everyday style with our curated collection of fashion
              and accessories.
            </p>
            <div className="flex space-x-4">
              <Link to="https://www.facebook.com/Adaajaipur.official/" className="hover:text-[#FF7A00] text-white">
                <FaFacebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link to="https://www.instagram.com/adaajaipur.official/" className="hover:text-[#FF7A00] text-white">
                <FaInstagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link to="https://x.com/adaajaipur" className="hover:text-[#FF7A00] text-white">
                <FaTwitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-[#FF7A00]">Quick as</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-white hover:text-[#FF7A00]">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/collections"
                  className="text-white hover:text-[#FF7A00]"
                >
                  Collections
                </Link>
              </li>
              <li>
                <Link
                  to="/trending"
                  className="text-white hover:text-[#FF7A00]"
                >
                  Trendings
                </Link>
              </li>

              <li>
                <Link to="/aboutUs" className="text-white hover:text-[#FF7A00]">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-[#FF7A00]">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/contactUs" className="text-white hover:text-[#FF7A00]">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/shoppingPolicy" className="text-white hover:text-[#FF7A00]">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/exchange" className="text-white hover:text-[#FF7A00]">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/size" className="text-white hover:text-[#FF7A00]">
                  Sizes
                </Link>
              </li>

            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-[#FF7A00]">Newsletter</h4>
            <p className="text-sm text-white">
              Subscribe to get special offers, free giveaways, and updates.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7A00]"
              />
              <button
                type="submit"
                className="px-4 py-2 text-sm text-white bg-[#FF7A00] rounded-md hover:bg-[#FF7A00]/90 focus:outline-none focus:ring-2 focus:ring-[#FF7A00]"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white">
              © {new Date().getFullYear()} ADAA Jaipur. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-white">
              <Link to="/" className="hover:text-[#FF7A00]">
                Privacy Policy
              </Link>
              <Link to="/" className="hover:text-[#FF7A00]">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
