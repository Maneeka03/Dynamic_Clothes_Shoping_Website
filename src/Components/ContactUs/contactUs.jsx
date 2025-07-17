import React from "react";

const ContactPage = () => {
  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 bg-[#FFF5EB]/90"></div>
      <div className="relative max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 mb-4 bg-[#FF6B2C]/10 rounded-full">
            <span className="text-[#FF6B2C] text-sm font-medium">
              Contact Us
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-[#1A2B3B] mb-4">
            Get in Touch
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions about our products or services? We're here to help
            you find the perfect style for every occasion.
          </p>
        </div>

        {/* Contact Information Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/70 p-6 rounded-lg shadow-sm backdrop-blur-sm border-t-8  border-primary hover:!scale-110 duration-300">
            <div className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-[#FF6B2C] mt-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <div className="ml-4">
                <h3 className="font-medium text-[#1A2B3B]">Email Us</h3>
                <p className="text-gray-600 mt-1">
                  {" "}
                  adaajaipur4india@gmail.com
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/70 p-6 rounded-lg shadow-sm backdrop-blur-sm border-t-8  border-primary hover:!scale-110 duration-300">
            <div className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-[#FF6B2C] mt-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <div className="ml-4">
                <h3 className="font-medium text-[#1A2B3B]">Call Us</h3>
                <p className="text-gray-600 mt-1">+91 98281 70003</p>
                <p className="text-gray-600">Mon-Sat: 9:30 AM - 6:30 PM</p>
              </div>
            </div>
          </div>

          <div className="bg-white/70 p-6 rounded-lg shadow-sm backdrop-blur-sm border-t-8  border-primary hover:!scale-110 duration-300">
            <div className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-[#FF6B2C] mt-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <div className="ml-4">
                <h3 className="font-medium text-[#1A2B3B]">Visit Us</h3>
                <p className="text-gray-600 mt-1">Address: H-5</p>
                <p className="text-gray-600">
                  RIICO MANSAROVAR INDUSTRIAL AREA, JAIPUR – 302020.t
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="max-w-2xl mx-auto bg-white/70 p-8 rounded-lg shadow-sm backdrop-blur-sm border-t-8 border-b-8   border-primary">
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  className="text-sm font-medium text-gray-900"
                  htmlFor="first-name"
                >
                  First Name
                </label>
                <input
                  id="first-name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FF6B2C] focus:border-[#FF6B2C]"
                  placeholder="Enter your first name"
                />
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm font-medium text-gray-900"
                  htmlFor="last-name"
                >
                  Last Name
                </label>
                <input
                  id="last-name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FF6B2C] focus:border-[#FF6B2C]"
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                className="text-sm font-medium text-gray-900"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FF6B2C] focus:border-[#FF6B2C]"
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-2">
              <label
                className="text-sm font-medium text-gray-900"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                id="message"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FF6B2C] focus:border-[#FF6B2C] min-h-[120px]"
                placeholder="How can we help you?"
              ></textarea>
            </div>

            <button className="w-[35%] ml-48 bg-[#FF6B2C] hover:!scale-110  text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out">
              Send Message
            </button>
          </form>
        </div>

        {/* Business Hours Section */}
        <div className="max-w-2xl mx-auto mt-16 text-center">
          <div className="flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-[#FF6B2C] mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="text-xl font-medium text-[#1A2B3B]">
              Business Hours
            </h2>
          </div>
          <div className="space-y-2 text-gray-600">
            <p>Monday - Saturday: 9:30 AM - 6:30 PM</p>
            <p>Sunday: Closed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
