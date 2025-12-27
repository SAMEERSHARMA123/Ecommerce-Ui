import { Zap } from 'lucide-react';
import ProductCard, { Product } from './ProductCard';

interface DealsOfDayProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const DealsOfDay = ({ products, onAddToCart }: DealsOfDayProps) => {
  return (
    <section className="py-6 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with timer feel */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-deal rounded-full flex items-center justify-center animate-pulse">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">Deals of the Day</h2>
              <p className="text-sm text-muted-foreground">Limited time offers - Don't miss out!</p>
            </div>
          </div>
          <a
            href="/deals"
            className="px-4 py-2 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors hidden sm:block"
          >
            View All Deals
          </a>
        </div>

        {/* Products scroll */}
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4">
          {products.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-[200px] sm:w-[220px]">
              <ProductCard product={product} onAddToCart={onAddToCart} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DealsOfDay;
