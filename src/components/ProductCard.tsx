import { Star, Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  badge?: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="product-card bg-card rounded-lg overflow-hidden shadow-product group h-full flex flex-col">
      {/* Image container - fixed aspect ratio */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Badge - using secondary color */}
        {product.badge && (
          <span className="absolute top-2 left-2 px-2 py-1 bg-secondary text-secondary-foreground text-xs font-semibold rounded">
            {product.badge}
          </span>
        )}

        {/* Wishlist button */}
        <button className="absolute top-2 right-2 w-8 h-8 bg-card/90 rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-all hover:bg-primary hover:text-primary-foreground">
          <Heart className="h-4 w-4" />
        </button>

        {/* Quick add button */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-accent/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            onClick={() => onAddToCart(product)}
            size="sm"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Content - consistent padding */}
      <div className="p-3 flex flex-col flex-1">
        <h3 className="text-sm font-medium text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors flex-1">
          {product.name}
        </h3>

        {/* Rating - using secondary color */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1 px-1.5 py-0.5 bg-secondary text-secondary-foreground text-xs font-semibold rounded">
            <span>{product.rating}</span>
            <Star className="h-3 w-3 fill-current" />
          </div>
          <span className="text-xs text-muted-foreground">
            ({product.reviews.toLocaleString()})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-base font-bold text-foreground">
            ₹{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <>
              <span className="text-xs text-muted-foreground line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
              <span className="text-xs font-medium text-primary">
                {discount}% off
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
