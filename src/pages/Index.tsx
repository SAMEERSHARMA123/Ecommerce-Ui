import { useState } from 'react';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import CategoryStrip from '@/components/CategoryStrip';
import HeroCarousel from '@/components/HeroCarousel';
import DealsOfDay from '@/components/DealsOfDay';
import ProductSection from '@/components/ProductSection';
import Footer from '@/components/Footer';
import { Product } from '@/components/ProductCard';
import { dealsProducts, trendingProducts, fashionProducts, recommendedProducts } from '@/data/products';

const Index = () => {
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = (product: Product) => {
    setCartCount((prev) => prev + 1);
    toast.success(`${product.name.substring(0, 30)}... added to cart!`, {
      description: `₹${product.price.toLocaleString()}`,
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Navbar */}
      <Navbar cartCount={cartCount} />

      {/* Main content with padding for fixed navbar */}
      <main className="pt-16">
        {/* Category Strip */}
        <CategoryStrip />

        {/* Hero Carousel */}
        <HeroCarousel />

        {/* Deals of the Day */}
        <DealsOfDay products={dealsProducts} onAddToCart={handleAddToCart} />

        {/* Trending Products - Grid Layout */}
        <ProductSection
          title="Trending Now"
          products={trendingProducts}
          layout="grid"
          onAddToCart={handleAddToCart}
        />

        {/* Fashion Products - Scroll Layout */}
        <div className="bg-card py-6">
          <ProductSection
            title="Fashion & Lifestyle"
            products={fashionProducts}
            layout="scroll"
            onAddToCart={handleAddToCart}
          />
        </div>

        {/* Recommended Products - Grid */}
        <ProductSection
          title="Recommended For You"
          products={recommendedProducts}
          layout="scroll"
          onAddToCart={handleAddToCart}
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
