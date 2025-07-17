import Banner2 from "../../assets/banner2.jpg";

const IconTruck = () => (
  <svg
    className="h-8 w-8 text-orange-500"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="1" y="3" width="15" height="13"></rect>
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
    <circle cx="5.5" cy="18.5" r="2.5"></circle>
    <circle cx="18.5" cy="18.5" r="2.5"></circle>
  </svg>
);

const IconLock = () => (
  <svg
    className="h-8 w-8 text-orange-500"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

const IconRefreshCw = () => (
  <svg
    className="h-8 w-8 text-orange-500"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M23 4v6h-6"></path>
    <path d="M1 20v-6h6"></path>
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
  </svg>
);

const IconHeadphones = () => (
  <svg
    className="h-8 w-8 text-orange-500"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
  </svg>
);

const IconFlag = () => (
  <svg
    className="h-8 w-8 text-orange-500"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
    <line x1="4" y1="22" x2="4" y2="15"></line>
  </svg>
);

const categories = [
  {
    title: "Fast Delivery",
    Icon: IconTruck,
    description: "Swift and reliable delivery to your doorstep",
  },
  {
    title: "Secure Payment",
    Icon: IconLock,
    description: "Safe and encrypted payment methods for your peace of mind",
  },
  {
    title: "Easy Exchange",
    Icon: IconRefreshCw,
    description: "Hassle-free exchange process for your convenience",
  },
  {
    title: "Customer Support",
    Icon: IconHeadphones,
    description: "24/7 dedicated support for all your queries",
  },
  {
    title: "Made in India",
    Icon: IconFlag,
    description: "Proudly supporting local craftsmanship and industry",
  },
];

export default function FashionCategories() {
  return (
    <div
      className="p-4 sm:p-8 lg:p-16 bg-cover bg-center bg-no-repeat mt-7"
      style={{
        backgroundImage: `url(${Banner2})`,
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-90 rounded-xl shadow-lg p-6 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl flex flex-col items-center text-center"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                <category.Icon />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {category.title}
              </h2>
              <p className="text-gray-600">{category.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
