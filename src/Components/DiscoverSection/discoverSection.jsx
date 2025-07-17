import React from "react";
import Discover from "../../assets/Dicover.jpg";

function DiscoverSectiob() {
  const Section = ({
    imageSrc,
    imageAlt,
    title,
    description,
    imageOnLeft = true,
  }) => (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div
          className={`flex flex-col ${imageOnLeft ? "lg:flex-row" : "lg:flex-row-reverse"
            } items-center gap-12`}
        >
          <div className="w-full lg:w-1/2">
            <div className="relative">
              <img
                src={imageSrc || "/placeholder.svg"}
                alt={imageAlt}
                className="rounded-lg shadow-lg object-cover w-full h-auto"
              />
              <div className="absolute inset-0 border-8 border-orange-300 rounded-lg -m-4 z-0"></div>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <h2 className="text-4xl font-bold mb-6 text-orange-800 font-serif">
              {title}
            </h2>
            <div className="w-16 h-1 bg-orange-500 mb-6"></div>
            <p className="text-orange-900 leading-relaxed mb-8">
              {description}
            </p>
            <div className="flex justify-center lg:justify-start">
              <button className="bg-orange-600 text-white py-3 px-8 rounded-full hover:bg-orange-700 transition duration-300 ease-in-out transform hover:scale-105">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <main className=" min-h-screen">
      <Section
        imageSrc={Discover}
        imageAlt="Traditional cultural artifacts"
        title="Preserving Our Traditions"
        description="Our rich cultural heritage is a tapestry woven with the threads of ancient wisdom, vibrant traditions, and timeless artistry. We are dedicated to preserving and celebrating these invaluable treasures, ensuring that the echoes of our ancestors continue to resonate through generations."
        imageOnLeft={true}
      />
    </main>
  );
}

export default DiscoverSectiob;
