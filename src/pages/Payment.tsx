import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, CreditCard, Banknote, Smartphone, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

interface PaymentMethod {
  id: string;
  name: string;
  icon?: React.ReactNode;
  logo?: string;
  description?: string;
}

const paymentMethods: { category: string; icon: React.ReactNode; methods: PaymentMethod[] }[] = [
  {
    category: 'Cash on Delivery',
    icon: <Banknote className="w-5 h-5" />,
    methods: [
      {
        id: 'cod',
        name: 'Cash on Delivery',
        description: 'Pay when you receive your order',
      },
    ],
  },
  {
    category: 'Credit / Debit Card',
    icon: <CreditCard className="w-5 h-5" />,
    methods: [
      {
        id: 'visa',
        name: 'Visa',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/200px-Visa_Inc._logo.svg.png',
      },
      {
        id: 'mastercard',
        name: 'MasterCard',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/200px-Mastercard-logo.svg.png',
      },
      {
        id: 'rupay',
        name: 'RuPay',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/RuPay.svg/200px-RuPay.svg.png',
      },
    ],
  },
  {
    category: 'UPI',
    icon: <Smartphone className="w-5 h-5" />,
    methods: [
      {
        id: 'phonepe',
        name: 'PhonePe',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/PhonePe.svg/200px-PhonePe.svg.png',
      },
      {
        id: 'gpay',
        name: 'Google Pay',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/200px-Google_Pay_Logo.svg.png',
      },
      {
        id: 'bhim',
        name: 'BHIM UPI',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/200px-UPI-Logo-vector.svg.png',
      },
    ],
  },
  {
    category: 'Net Banking',
    icon: <Building2 className="w-5 h-5" />,
    methods: [
      {
        id: 'sbi',
        name: 'State Bank of India',
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/58/State_Bank_of_India_logo.svg/200px-State_Bank_of_India_logo.svg.png',
      },
      {
        id: 'hdfc',
        name: 'HDFC Bank',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/HDFC_Bank_Logo.svg/200px-HDFC_Bank_Logo.svg.png',
      },
      {
        id: 'icici',
        name: 'ICICI Bank',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/ICICI_Bank_Logo.svg/200px-ICICI_Bank_Logo.svg.png',
      },
      {
        id: 'axis',
        name: 'Axis Bank',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Axis_Bank_logo.svg/200px-Axis_Bank_logo.svg.png',
      },
    ],
  },
];

const Payment = () => {
  const navigate = useNavigate();
  const { items, getCartTotal, clearCart } = useCart();
  const { toast } = useToast();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const subtotal = getCartTotal();
  const deliveryCharges = subtotal > 500 ? 0 : 40;
  const tax = Math.round(subtotal * 0.18);
  const finalTotal = subtotal + deliveryCharges + tax;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handlePlaceOrder = () => {
    if (!selectedMethod) return;
    
    toast({
      title: 'Order Placed Successfully!',
      description: 'Thank you for your purchase. Your order is being processed.',
    });
    
    clearCart();
    navigate('/');
  };

  const getSelectedMethodName = () => {
    for (const category of paymentMethods) {
      const method = category.methods.find((m) => m.id === selectedMethod);
      if (method) return method.name;
    }
    return '';
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 py-6 px-4 md:px-8 lg:px-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/cart')}
              className="text-foreground"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-semibold text-foreground">Payment</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Payment Methods */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-lg font-medium text-foreground mb-4">Select Payment Method</h2>

              <RadioGroup value={selectedMethod || ''} onValueChange={setSelectedMethod}>
                {paymentMethods.map((category) => (
                  <div key={category.category} className="bg-card rounded-lg border border-border overflow-hidden">
                    {/* Category Header */}
                    <button
                      onClick={() =>
                        setExpandedCategory(
                          expandedCategory === category.category ? null : category.category
                        )
                      }
                      className="w-full flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors"
                    >
                      <span className="text-primary">{category.icon}</span>
                      <span className="font-medium text-foreground flex-1 text-left">
                        {category.category}
                      </span>
                      <span className="text-muted-foreground text-sm">
                        {category.methods.length} option{category.methods.length > 1 ? 's' : ''}
                      </span>
                    </button>

                    {/* Methods List */}
                    {(expandedCategory === category.category || category.methods.some(m => m.id === selectedMethod)) && (
                      <div className="border-t border-border">
                        {category.methods.map((method) => (
                          <label
                            key={method.id}
                            className={`flex items-center gap-4 p-4 cursor-pointer hover:bg-muted/30 transition-colors ${
                              selectedMethod === method.id ? 'bg-primary/5' : ''
                            }`}
                          >
                            <RadioGroupItem value={method.id} className="text-primary" />
                            {method.logo ? (
                              <img
                                src={method.logo}
                                alt={method.name}
                                className="h-6 w-auto object-contain"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                            ) : null}
                            <div className="flex-1">
                              <span className="text-sm font-medium text-foreground">{method.name}</span>
                              {method.description && (
                                <p className="text-xs text-muted-foreground">{method.description}</p>
                              )}
                            </div>
                            {selectedMethod === method.id && (
                              <Check className="w-5 h-5 text-primary" />
                            )}
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg border border-border p-6 sticky top-24">
                <h2 className="text-lg font-semibold text-foreground mb-4">Order Summary</h2>

                {/* Items Preview */}
                <div className="space-y-3 mb-4">
                  {items.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-md overflow-hidden bg-muted flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                  {items.length > 3 && (
                    <p className="text-sm text-muted-foreground">+{items.length - 3} more items</p>
                  )}
                </div>

                <Separator className="my-4" />

                {/* Price Details */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery</span>
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
                  <span className="text-lg font-semibold text-foreground">Total</span>
                  <span className="text-xl font-bold text-primary">{formatPrice(finalTotal)}</span>
                </div>

                {/* Selected Method Display */}
                {selectedMethod && (
                  <div className="mb-4 p-3 bg-muted/50 rounded-md">
                    <p className="text-xs text-muted-foreground">Paying with</p>
                    <p className="text-sm font-medium text-foreground">{getSelectedMethodName()}</p>
                  </div>
                )}

                {/* Pay Button */}
                <Button
                  onClick={handlePlaceOrder}
                  disabled={!selectedMethod}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                  size="lg"
                >
                  Pay {formatPrice(finalTotal)}
                </Button>

                {!selectedMethod && (
                  <p className="text-xs text-muted-foreground text-center mt-3">
                    Please select a payment method
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Payment;
