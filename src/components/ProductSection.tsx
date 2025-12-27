import { ChevronRight } from 'lucide-react';
import ProductCard, { Product } from './ProductCard';

interface ProductSectionProps {
  title: string;
  products: Product[];
  layout: 'scroll' | 'grid';
  onAddToCart: (product: Product) => void;
}

const ProductSection = ({ title, products, layout, onAddToCart }: ProductSectionProps) => {
  return (
    <section className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">{title}</h2>
          <a
            href="#"
            className="flex items-center gap-1 text-primary font-medium hover:underline"
          >
            View All
            <ChevronRight className="h-4 w-4" />
          </a>
        </div>

        {/* Products */}
        {layout === 'scroll' ? (
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4">
            {products.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-[200px] sm:w-[220px]">
                <ProductCard product={product} onAddToCart={onAddToCart} />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductSection;
