import { useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, Tag, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState } from 'react';

const Cart = () => {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);

  const subtotal = getCartTotal();
  const deliveryCharges = subtotal > 500 ? 0 : 40;
  const tax = Math.round(subtotal * 0.18);
  const finalTotal = subtotal - discount + deliveryCharges + tax;

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'SAVE10') {
      setDiscount(Math.round(subtotal * 0.1));
      setAppliedCoupon('SAVE10');
    } else if (couponCode.toUpperCase() === 'FLAT500') {
      setDiscount(500);
      setAppliedCoupon('FLAT500');
    } else {
      setDiscount(0);
      setAppliedCoupon(null);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center py-20 px-4">
          <ShoppingBag className="w-24 h-24 text-muted-foreground mb-6" />
          <h2 className="text-2xl font-semibold text-foreground mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Button onClick={() => navigate('/')} className="bg-primary text-primary-foreground">
            Continue Shopping
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 py-6 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate('/')}
              className="text-foreground"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-semibold text-foreground">Shopping Cart ({items.length} items)</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Section - Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-card rounded-lg border border-border p-4 flex gap-4"
                >
                  {/* Product Image */}
                  <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm md:text-base font-medium text-foreground line-clamp-2">
                        {item.name}
                      </h3>
                      {item.variant && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Variant: {item.variant}
                        </p>
                      )}
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-lg font-semibold text-foreground">
                          {formatPrice(item.price)}
                        </span>
                        {item.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            {formatPrice(item.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-border rounded-md">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="p-2 hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Minus className="w-4 h-4 text-foreground" />
                        </button>
                        <span className="px-4 py-2 text-sm font-medium text-foreground min-w-[40px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-muted"
                        >
                          <Plus className="w-4 h-4 text-foreground" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="hidden md:inline">Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Section - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg border border-border p-6 sticky top-24">
                <h2 className="text-lg font-semibold text-foreground mb-4">Order Summary</h2>

                {/* Coupon Section */}
                <div className="mb-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1"
                    />
                    <Button 
                      variant="outline" 
                      onClick={handleApplyCoupon}
                      className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      Apply
                    </Button>
                  </div>
                  {appliedCoupon && (
                    <div className="flex items-center gap-2 mt-2 text-sm text-secondary">
                      <Tag className="w-4 h-4" />
                      <span>Coupon "{appliedCoupon}" applied!</span>
                    </div>
                  )}
                </div>

                <Separator className="my-4" />

                {/* Price Details */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">{formatPrice(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-secondary">Discount</span>
                      <span className="text-secondary">-{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery Charges</span>
                    <span className={deliveryCharges === 0 ? 'text-secondary' : 'text-foreground'}>
                      {deliveryCharges === 0 ? 'FREE' : formatPrice(deliveryCharges)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (18% GST)</span>
                    <span className="text-foreground">{formatPrice(tax)}</span>
                  </div>
                </div>

                <Separator className="my-4" />

                {/* Total */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-semibold text-foreground">Total Amount</span>
                  <span className="text-xl font-bold text-primary">{formatPrice(finalTotal)}</span>
                </div>

                {/* Proceed Button */}
                <Button
                  onClick={() => navigate('/payment')}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  size="lg"
                >
                  Proceed to Checkout
                </Button>

                {/* Info */}
                <p className="text-xs text-muted-foreground text-center mt-4">
                  Free delivery on orders above ₹500
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
