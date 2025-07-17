import { useState } from "react";
import ProductQuickView from './ProductQuickView';

export function ScrollableProductCard({ products, addToCart }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);

  if (!products || products.length === 0) {
    return (
      <div className="w-full text-center p-4 bg-gray-100 rounded-lg">
        <p className="text-gray-600">No products available in this category.</p>
      </div>
    );
  }

  const nextProduct = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const prevProduct = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? products.length - 1 : prevIndex - 1
    );
  };

  const currentProduct = products[currentIndex];

  if (!currentProduct) {
    return (
      <div className="w-full text-center p-4 bg-red-100 rounded-lg">
        <p className="text-red-600">Error loading product details</p>
      </div>
    );
  }

  const handleAddToCart = (productWithSelections) => {
    addToCart(productWithSelections); // Pass the enriched product data up
  };

  // Prepare product data for quick view
  const enrichedProduct = {
    ...currentProduct,
    images: Array.isArray(currentProduct.images) 
      ? currentProduct.images 
      : [currentProduct.image],
    colors: Array.isArray(currentProduct.colors) 
      ? currentProduct.colors 
      : [],
    sizes: Array.isArray(currentProduct.sizes) 
      ? currentProduct.sizes 
      : [],
    stock: currentProduct.quantity || 0
  };

  return (
    <>
      <div className="w-full max-w-sm mx-auto mt-4 bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4">
          <div
            className="relative aspect-square mb-4 cursor-pointer"
            
          >
            <img
              src={currentProduct.image || '/placeholder.svg'}
              alt={currentProduct.name || 'Product'}
              className="w-full h-full object-cover rounded-md"
              onError={(e) => { e.target.src = '/placeholder.svg' }}
            />
          </div>
          <h3 className="text-lg font-semibold mb-2">
            {currentProduct.name || 'Unnamed Product'}
          </h3>
          <p className="text-[#FF8A00] font-bold mb-4">
            ₹{currentProduct.price?.toLocaleString() || 'N/A'}
          </p>
          <button
            // onClick={() => addToCart(enrichedProduct)}
            onClick={() => setSelectedProduct(enrichedProduct)}
            className="mt-2 w-full px-4 py-2 bg-orange-500 bg-transparent hover:bg-orange-500 text-orange-500 hover:text-white border border-orange-500 rounded-md transition-all duration-300 text-sm"
          >
            Quick View
          </button>
          <div className="flex justify-between items-center">
            <button
              onClick={prevProduct}
              className="rounded-full p-2 border border-gray-300 hover:bg-gray-100 transition-colors duration-200"
              aria-label="Previous product"
            >
              &#8592;
            </button>
            <span className="text-sm text-gray-500">
              {currentIndex + 1} of {products.length}
            </span>
            <button
              onClick={nextProduct}
              className="rounded-full p-2 border border-gray-300 hover:bg-gray-100 transition-colors duration-200"
              aria-label="Next product"
            >
              &#8594;
            </button>
          </div>
        </div>
      </div>

      {selectedProduct && (
        <ProductQuickView
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}
    </>
  );
}