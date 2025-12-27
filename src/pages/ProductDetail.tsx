import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Star, 
  Heart, 
  Share2, 
  ShoppingCart, 
  Truck, 
  Shield, 
  RotateCcw, 
  ChevronLeft,
  ThumbsUp,
  ThumbsDown,
  User,
  TrendingUp,
  Package,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { dealsProducts, trendingProducts, fashionProducts } from '@/data/products';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext 
} from '@/components/ui/carousel';
import ProductCard from '@/components/ProductCard';
import { useToast } from '@/hooks/use-toast';

// All products combined
const allProducts = [...dealsProducts, ...trendingProducts, ...fashionProducts];

// Mock additional product images
const getProductImages = (mainImage: string) => [
  mainImage,
  mainImage.replace('w=400', 'w=800'),
  mainImage.replace('fit=crop', 'fit=cover'),
  mainImage.replace('h=400', 'h=600'),
];

// Mock specifications based on product category
const getSpecifications = (productName: string) => {
  if (productName.toLowerCase().includes('phone') || productName.toLowerCase().includes('iphone') || productName.toLowerCase().includes('galaxy')) {
    return [
      { label: 'Display', value: '6.7" Super Retina XDR OLED' },
      { label: 'Processor', value: 'A17 Pro / Snapdragon 8 Gen 3' },
      { label: 'RAM', value: '8GB' },
      { label: 'Storage', value: '256GB / 512GB' },
      { label: 'Battery', value: '4422 mAh' },
      { label: 'Camera', value: '48MP + 12MP + 12MP' },
      { label: '5G', value: 'Yes' },
      { label: 'OS', value: 'iOS 17 / Android 14' },
    ];
  }
  if (productName.toLowerCase().includes('laptop') || productName.toLowerCase().includes('macbook')) {
    return [
      { label: 'Processor', value: 'Apple M3 / Intel Core i9' },
      { label: 'RAM', value: '16GB / 32GB' },
      { label: 'Storage', value: '256GB / 1TB SSD' },
      { label: 'Display', value: '15.3" Liquid Retina' },
      { label: 'Graphics', value: 'Integrated 10-Core GPU' },
      { label: 'Battery Life', value: 'Up to 18 hours' },
      { label: 'Weight', value: '1.51 kg' },
      { label: 'Ports', value: 'MagSafe, 2x Thunderbolt, 3.5mm' },
    ];
  }
  if (productName.toLowerCase().includes('headphone') || productName.toLowerCase().includes('earbuds')) {
    return [
      { label: 'Driver Size', value: '40mm' },
      { label: 'Frequency Response', value: '4Hz - 40kHz' },
      { label: 'Battery Life', value: '30 hours' },
      { label: 'Noise Cancellation', value: 'Active (ANC)' },
      { label: 'Connectivity', value: 'Bluetooth 5.3' },
      { label: 'Weight', value: '250g' },
      { label: 'Microphone', value: '8 microphones' },
      { label: 'Water Resistance', value: 'IPX4' },
    ];
  }
  return [
    { label: 'Material', value: 'Premium Quality' },
    { label: 'Warranty', value: '1 Year Manufacturer' },
    { label: 'Origin', value: 'Imported' },
    { label: 'Care', value: 'See product label' },
  ];
};

// Mock reviews
const mockReviews = [
  {
    id: 1,
    user: 'Rahul S.',
    rating: 5,
    date: '2 weeks ago',
    title: 'Excellent product, highly recommended!',
    comment: 'The quality exceeded my expectations. Fast delivery and great packaging. Would definitely buy again.',
    helpful: 45,
    notHelpful: 2,
    verified: true,
  },
  {
    id: 2,
    user: 'Priya M.',
    rating: 4,
    date: '1 month ago',
    title: 'Good value for money',
    comment: 'Product works as described. Minor issues with the initial setup but customer support was helpful.',
    helpful: 32,
    notHelpful: 5,
    verified: true,
  },
  {
    id: 3,
    user: 'Amit K.',
    rating: 5,
    date: '3 weeks ago',
    title: 'Amazing quality!',
    comment: 'Best purchase I have made this year. The build quality is top-notch and it performs beautifully.',
    helpful: 28,
    notHelpful: 1,
    verified: true,
  },
];

// Rating distribution
const ratingDistribution = [
  { stars: 5, percentage: 68 },
  { stars: 4, percentage: 20 },
  { stars: 3, percentage: 7 },
  { stars: 2, percentage: 3 },
  { stars: 1, percentage: 2 },
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const product = allProducts.find(p => p.id === Number(id));
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const productImages = useMemo(() => 
    product ? getProductImages(product.image) : [], 
    [product]
  );
  
  const specifications = useMemo(() => 
    product ? getSpecifications(product.name) : [], 
    [product]
  );
  
  const relatedProducts = useMemo(() => 
    allProducts.filter(p => p.id !== product?.id).slice(0, 6), 
    [product]
  );

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
          <Button onClick={() => navigate('/')}>Go Back Home</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      rating: product.rating,
      reviews: product.reviews,
      originalPrice: product.originalPrice,
      badge: product.badge,
    });
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleBuyNow = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      rating: product.rating,
      reviews: product.reviews,
      originalPrice: product.originalPrice,
      badge: product.badge,
    });
    navigate('/cart');
  };

  const handleRelatedAddToCart = (p: typeof product) => {
    addToCart({
      id: p.id,
      name: p.name,
      price: p.price,
      image: p.image,
      rating: p.rating,
      reviews: p.reviews,
      originalPrice: p.originalPrice,
      badge: p.badge,
    });
    toast({
      title: "Added to Cart",
      description: `${p.name} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="text-sm">Back</span>
        </button>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left Panel - Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-card rounded-lg overflow-hidden border border-border">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <Badge className="absolute top-4 left-4 bg-secondary text-secondary-foreground">
                  {product.badge}
                </Badge>
              )}
              <button 
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  isWishlisted 
                    ? 'bg-destructive text-destructive-foreground' 
                    : 'bg-card/90 text-foreground hover:bg-destructive hover:text-destructive-foreground'
                }`}
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index 
                      ? 'border-primary ring-2 ring-primary/20' 
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} - View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Panel - Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-3">
                {product.name}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1 px-2 py-1 bg-secondary text-secondary-foreground rounded">
                  <span className="font-semibold">{product.rating}</span>
                  <Star className="h-4 w-4 fill-current" />
                </div>
                <span className="text-muted-foreground">
                  {product.reviews.toLocaleString()} Reviews
                </span>
                <button className="text-primary hover:underline text-sm">
                  Write a Review
                </button>
              </div>

              <Separator className="my-4" />

              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-foreground">
                    ₹{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-lg text-muted-foreground line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        {discount}% OFF
                      </Badge>
                    </>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  Inclusive of all taxes
                </p>
              </div>
            </div>

            <Separator />

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={handleAddToCart}
                variant="outline" 
                size="lg" 
                className="flex-1"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button 
                onClick={handleBuyNow}
                size="lg" 
                className="flex-1"
              >
                Buy Now
              </Button>
            </div>

            {/* Share */}
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <Share2 className="h-4 w-4" />
                <span className="text-sm">Share</span>
              </button>
            </div>

            <Separator />

            {/* Delivery & Services */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Truck className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">Free Delivery</p>
                  <p className="text-xs text-muted-foreground">Orders over ₹500</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <RotateCcw className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">Easy Returns</p>
                  <p className="text-xs text-muted-foreground">7 days return</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Shield className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">Warranty</p>
                  <p className="text-xs text-muted-foreground">1 year covered</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                Experience premium quality with this exceptional product. Designed with attention to detail 
                and crafted from the finest materials, it delivers outstanding performance and reliability. 
                Perfect for everyday use, this product combines style with functionality to meet all your needs.
              </p>
            </div>

            {/* Specifications */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Specifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {specifications.map((spec, index) => (
                  <div key={index} className="flex justify-between p-3 bg-muted/30 rounded-lg">
                    <span className="text-muted-foreground text-sm">{spec.label}</span>
                    <span className="text-foreground text-sm font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Ratings & Reviews Section */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-foreground mb-6">Ratings & Reviews</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Rating Summary */}
            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-foreground mb-2">{product.rating}</div>
                <div className="flex items-center justify-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-secondary fill-secondary' : 'text-muted'}`} 
                    />
                  ))}
                </div>
                <p className="text-muted-foreground">{product.reviews.toLocaleString()} Reviews</p>
              </div>
              
              <div className="space-y-2">
                {ratingDistribution.map((item) => (
                  <div key={item.stars} className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground w-8">{item.stars}★</span>
                    <Progress value={item.percentage} className="flex-1 h-2" />
                    <span className="text-sm text-muted-foreground w-10">{item.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews List */}
            <div className="lg:col-span-2 space-y-4">
              {mockReviews.map((review) => (
                <div key={review.id} className="bg-card p-5 rounded-lg border border-border">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-foreground">{review.user}</span>
                          {review.verified && (
                            <Badge variant="secondary" className="text-xs">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground">{review.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < review.rating ? 'text-secondary fill-secondary' : 'text-muted'}`} 
                        />
                      ))}
                    </div>
                  </div>
                  
                  <h4 className="font-medium text-foreground mb-2">{review.title}</h4>
                  <p className="text-muted-foreground text-sm mb-4">{review.comment}</p>
                  
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm">
                      <ThumbsUp className="h-4 w-4" />
                      <span>Helpful ({review.helpful})</span>
                    </button>
                    <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm">
                      <ThumbsDown className="h-4 w-4" />
                      <span>({review.notHelpful})</span>
                    </button>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" className="w-full">
                View All Reviews
              </Button>
            </div>
          </div>
        </section>

        {/* Analytics Section */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-foreground mb-6">Product Insights</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-card p-5 rounded-lg border border-border text-center">
              <TrendingUp className="h-8 w-8 text-primary mx-auto mb-3" />
              <p className="text-2xl font-bold text-foreground">89%</p>
              <p className="text-sm text-muted-foreground">Positive Reviews</p>
            </div>
            <div className="bg-card p-5 rounded-lg border border-border text-center">
              <Package className="h-8 w-8 text-primary mx-auto mb-3" />
              <p className="text-2xl font-bold text-foreground">2.3K</p>
              <p className="text-sm text-muted-foreground">Units Sold</p>
            </div>
            <div className="bg-card p-5 rounded-lg border border-border text-center">
              <Star className="h-8 w-8 text-secondary mx-auto mb-3" />
              <p className="text-2xl font-bold text-foreground">Top 10</p>
              <p className="text-sm text-muted-foreground">In Category</p>
            </div>
            <div className="bg-card p-5 rounded-lg border border-border text-center">
              <RotateCcw className="h-8 w-8 text-primary mx-auto mb-3" />
              <p className="text-2xl font-bold text-foreground">2%</p>
              <p className="text-sm text-muted-foreground">Return Rate</p>
            </div>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Related Products */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-foreground mb-6">You May Also Like</h2>
          <Carousel className="w-full">
            <CarouselContent className="-ml-4">
              {relatedProducts.map((relatedProduct) => (
                <CarouselItem key={relatedProduct.id} className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                  <ProductCard 
                    product={relatedProduct} 
                    onAddToCart={() => handleRelatedAddToCart(relatedProduct)}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4 hidden md:flex" />
            <CarouselNext className="-right-4 hidden md:flex" />
          </Carousel>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
