import React from "react";
import Owner from "../../assets/owner.png";
import Owner2 from "../../assets/owner2.png";
import Banner from "../../assets/banner.webp";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-[#FFF5EE]">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-56 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={Banner}
            alt="Elegant fabric background"
            className="w-full object-cover"
          />
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="h-20 w-20 bg-[#FFF5EE] rounded-full flex items-center justify-center mx-auto mb-4 ">
                <svg
                  className="w-10 h-10 text-[#FF6B35]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Artisanal Quality</h3>
              <p className="text-gray-600">
                Every piece is crafted with precision and care by skilled
                artisans.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="h-20 w-20 bg-[#FFF5EE] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-[#FF6B35]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
              <p className="text-gray-600">
                Delivering authentic Indian fashion to over 50 countries
                worldwide.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="h-20 w-20 bg-[#FFF5EE] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-[#FF6B35]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Customer Love</h3>
              <p className="text-gray-600">
                Trusted by 50,000+ happy customers with a 4.9 rating.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="container mx-auto px-4 py-20 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="grid grid-cols-2 gap-8">
            <div className="overflow-hidden bg-gray-200 rounded-3xl h-[480px] border-l-8 border-primary ">
              <div className="p-6 flex flex-col items-center ">
                <div className="relative w-full aspect-[3/4] mb-4">
                  <img
                    src={Owner2}
                    alt="Keshav Shukla"
                    class="object-cover rounded-2xl w-full h-full"
                    width="400"
                    height="400"
                  />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Keshav Shukla
                </h2>
                <p className="text-gray-600 text-lg">Founder</p>
              </div>
            </div>

            <div className="overflow-hidden bg-gray-200  border-l-8 border-primary rounded-3xl mt-10">
              <div className="p-6 flex flex-col items-center h-[490px]">
                <div className="relative w-full aspect-[3/4] mb-4">
                  <img
                    src={Owner}
                    alt="Tulsi Prasad Shukla"
                    class="object-cover rounded-2xl w-full h-full"
                    width="400"
                    height="400"
                  />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Tulsi Prasad Shukla
                </h2>
                <p className="text-gray-600 text-lg text-center">
                  Co-Founder & Strategic Brand Manager
                </p>
              </div>
            </div>
          </div>
          <div className="bg-orange-100 p-20 rounded-[10%]">
            <h2 className="text-4xl md:text-5xl font-serif mb-8 text-center">
              Our Story
            </h2>
            <div className="space-y-6 text-gray-600 text-lg text-center">
              <p>
                ADAA JAIPUR was started by Keshav Shukla in 2010 and is now
                managed by his elder son Tulsi Prasad Shukla. It is much
                reckoned for its in-house exclusive Feminine brand “ADAA”. Adaa
                has almost all types of collections that an Indian Woman needs,
                be it Kurties, Plazzos, Gowns, Sharara, and many more. Our
                mission is to provide the best quality product at its best
                price. And we love to read your feedback as it encourages us to
                be more productive to our lovable customers.
              </p>
              <p className="text-xl font-bold">
                "STYLE YOURSELF{" "}
                <span className="text-primary">WITH ADAA!"</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#FF6B35]/5 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-32 text-center">
            <div className="bg-white p-7 border-primary border-t-8 border-b-8 rounded-tl-[20%] rounded-br-[20%] ">
              <div className="text-4xl font-bold text-[#FF6B35] mb-2">50k+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div className="bg-white p-7 border-primary border-t-8 border-b-8 rounded-tl-[20%] rounded-br-[20%]">
              <div className="text-4xl font-bold text-[#FF6B35] mb-2">4.9</div>
              <div className="text-gray-600">Customer Rating</div>
            </div>
            <div className="bg-white p-7 border-primary border-t-8 border-b-8 rounded-tl-[20%] rounded-br-[20%]">
              <div className="text-4xl font-bold text-[#FF6B35] mb-2">50+</div>
              <div className="text-gray-600">Countries Served</div>
            </div>
            <div className="bg-white p-7 border-primary border-t-8 border-b-8 rounded-tl-[20%] rounded-br-[20%]">
              <div className="text-4xl font-bold text-[#FF6B35] mb-2">5k+</div>
              <div className="text-gray-600">Products</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
