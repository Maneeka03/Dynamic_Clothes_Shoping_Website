import React, { useState } from 'react';

const ProductQuickView = ({ product, onClose, onAddToCart }) => {
  const [selectedThumbnail, setSelectedThumbnail] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]);
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  const handleAddToCart = () => {
    onAddToCart({
      ...product,
      selectedColorD: selectedColor,
      selectedSizeD: selectedSize,
      selectedQuantityD:quantity
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Close Button */}
          <div className="flex justify-end mb-4">
            <button 
              onClick={onClose} 
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Image Gallery */}
            <div className="flex gap-4 lg:w-2/3">
              <div className="flex flex-col gap-3">
                {product.images.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedThumbnail(index)}
                    className={`w-20 h-24 border-2 rounded-lg overflow-hidden cursor-pointer ${
                      selectedThumbnail === index 
                        ? "border-orange-500" 
                        : "border-gray-200"
                    }`}
                  >
                    <img 
                      src={img} 
                      alt={`Thumbnail ${index + 1}`} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                ))}
              </div>
              <div className="flex-1 border rounded-lg overflow-hidden">
                <img
                  src={product.images[selectedThumbnail]}
                  alt={product.name}
                  className="w-full object-cover"
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="lg:w-1/3 flex flex-col gap-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
                <p className="text-gray-600">{product.description}</p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-orange-500">${product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                    <span className="bg-orange-100 text-orange-800 text-sm px-2 rounded">
                      {Math.round(
                        ((product.originalPrice - product.price) / product.originalPrice) * 100
                      )}% OFF
                    </span>
                  </>
                )}
              </div>

              {/* Color Selection */}
              {product.colors && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Color:
                  </label>
                  <div className="flex gap-2">
                    {product.colors.map((color, index) => (
                      <label
                        key={index}
                        className={`cursor-pointer w-8 h-8 rounded-full border-2 ${
                          selectedColor === color 
                            ? "border-orange-500 ring-2 ring-orange-500" 
                            : "border-gray-300"
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
              )}

              {/* Size Selection */}
              {product.sizes && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Size:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size, index) => (
                      <label
                        key={index}
                        className={`cursor-pointer px-4 py-2 border rounded-md text-sm ${
                          selectedSize === size
                            ? "border-orange-500 text-orange-500 bg-orange-100"
                            : "border-gray-300 text-gray-700"
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
              )}

              {/* Quantity Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity:
                </label>
                <div className="flex items-center gap-3">
                  <button
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                    onClick={decreaseQuantity}
                  >
                    -
                  </button>
                  <span className="text-lg font-medium w-12 text-center">{quantity}</span>
                  <button
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                    onClick={increaseQuantity}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Stock and Rating */}
              <div className="border-t pt-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className={`
                    ${product.stock < 5 
                      ? "text-red-500" 
                      : product.stock < 10 
                        ? "text-orange-500" 
                        : "text-green-500"
                    }`}
                  >
                    {product.stock < 5 
                      ? `Only ${product.stock} left!` 
                      : product.stock < 10 
                        ? "Limited stock" 
                        : "In stock"}
                  </span>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                className="w-full py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductQuickView;