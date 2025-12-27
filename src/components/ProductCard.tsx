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
    <div className="product-card bg-card rounded-xl overflow-hidden shadow-product group">
      {/* Image container */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 px-2 py-1 bg-deal text-primary-foreground text-xs font-bold rounded">
            {product.badge}
          </span>
        )}

        {/* Wishlist button */}
        <button className="absolute top-3 right-3 w-8 h-8 bg-card/90 rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all hover:bg-deal hover:text-primary-foreground">
          <Heart className="h-4 w-4" />
        </button>

        {/* Quick add button */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-foreground/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            onClick={() => onAddToCart(product)}
            size="sm"
            className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-medium text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1 px-2 py-0.5 bg-success text-success-foreground text-xs font-bold rounded">
            <span>{product.rating}</span>
            <Star className="h-3 w-3 fill-current" />
          </div>
          <span className="text-sm text-muted-foreground">
            ({product.reviews.toLocaleString()})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-lg font-bold text-foreground">
            ₹{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <>
              <span className="text-sm text-muted-foreground line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
              <span className="text-sm font-medium text-success">
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
