
import React from 'react';
import Card from './Cards';

export default function ProductCard({ updateCartCount, cartCount, updateWishlistCount }) {
  return (
    <div>
      <div className='mt-20'>
        {/* Passing 'T-shirt' as the product search term to the Card component */}
        <Card search="Kurta" bannerName="TRENDING KURTAS" updateCartCount={updateCartCount} cartCount={cartCount} updateWishlistCount={updateWishlistCount} />
      </div>
      <div className='mt-20'>
        <Card search="Embroidery" bannerName="TRENDING EMBROIDERY KURTA" updateCartCount={updateCartCount} cartCount={cartCount} updateWishlistCount={updateWishlistCount} />
      </div>
      <div className='mt-20'>
        <Card search="Palazzo" bannerName="TRENDING PALAZZO" updateCartCount={updateCartCount} cartCount={cartCount} updateWishlistCount={updateWishlistCount} />
      </div>
    </div>
  );
}