import React from 'react';

const ProductSkeleton = () => {
  return (
    <div className="w-full sm:min-w-[250px] sm:max-w-[250px] bg-white rounded-3xl overflow-hidden shadow-lg flex flex-col relative">
      {/* Image skeleton */}
      <div className="animate-pulse bg-gray-200 h-[220px] sm:h-[180px]" />
      
      {/* Favorite button skeleton */}
      <div className="absolute top-3 left-3 animate-pulse">
        <div className="w-10 h-10 bg-gray-200 rounded-full" />
      </div>
      
      {/* Discount tag skeleton */}
      <div className="absolute top-3 right-3 animate-pulse">
        <div className="w-16 h-7 bg-gray-200 rounded-full" />
      </div>
      
      {/* Content */}
      <div className="p-4 flex flex-col gap-3">
        {/* Title */}
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-3/4" />
        </div>
        
        {/* Description */}
        <div className="animate-pulse space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
        </div>
        
        {/* Price */}
        <div className="flex gap-2 animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-24" />
          <div className="h-6 bg-gray-200 rounded w-16" />
        </div>
        
        {/* Rating */}
        <div className="flex gap-1 animate-pulse">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-5 h-5 bg-gray-200 rounded-full" />
          ))}
        </div>
        
        {/* Stock status */}
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded-full w-24" />
        </div>
        
        {/* Button */}
        <div className="animate-pulse mt-2">
          <div className="h-10 bg-gray-200 rounded-xl w-full" />
        </div>
      </div>
    </div>
  );
};

const ProductGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-4 mx-auto">
      {[...Array(10)].map((_, index) => (
        <ProductSkeleton key={index} />
      ))}
    </div>
  );
};

export default ProductGridSkeleton;