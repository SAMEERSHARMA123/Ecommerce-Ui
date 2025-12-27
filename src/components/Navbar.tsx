import { useState, useEffect } from 'react';
import { Menu, ShoppingCart, User, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedSearchInput from './AnimatedSearchInput';
import Sidebar from './Sidebar';

interface NavbarProps {
  cartCount: number;
  onCartBump?: () => void;
}

const Navbar = ({ cartCount, onCartBump }: NavbarProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [prevCartCount, setPrevCartCount] = useState(cartCount);
  const [cartBump, setCartBump] = useState(false);

  // Cart bump animation
  useEffect(() => {
    if (cartCount > prevCartCount) {
      setCartBump(true);
      setTimeout(() => setCartBump(false), 300);
    }
    setPrevCartCount(cartCount);
  }, [cartCount, prevCartCount]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-navbar shadow-navbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Left section: Hamburger + Logo */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 rounded-lg text-navbar-foreground hover:bg-primary-foreground/10 transition-colors"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </button>
              
              <a href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                  <ShoppingCart className="h-5 w-5 text-secondary-foreground" />
                </div>
                <span className="text-xl font-semibold text-navbar-foreground hidden sm:block">
                  ShopEase
                </span>
              </a>
            </div>

            {/* Center section: Search with animated placeholder */}
            <div className="flex-1 max-w-2xl">
              <AnimatedSearchInput />
            </div>

            {/* Right section: Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Wishlist - hidden on mobile */}
              <button className="hidden md:flex p-2 rounded-lg text-navbar-foreground hover:bg-primary-foreground/10 transition-colors">
                <Heart className="h-5 w-5" />
              </button>

              {/* Auth buttons */}
              <div className="hidden sm:flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-navbar-foreground hover:bg-primary-foreground/10 hover:text-navbar-foreground"
                >
                  Login
                </Button>
                <Button 
                  size="sm"
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                >
                  Sign Up
                </Button>
              </div>

              {/* Mobile user icon */}
              <button className="sm:hidden p-2 rounded-lg text-navbar-foreground hover:bg-primary-foreground/10 transition-colors">
                <User className="h-5 w-5" />
              </button>

              {/* Cart */}
              <button 
                className="relative p-2 rounded-lg text-navbar-foreground hover:bg-primary-foreground/10 transition-colors"
                onClick={onCartBump}
              >
                <ShoppingCart className={`h-6 w-6 transition-transform ${cartBump ? 'animate-cart-bump' : ''}`} />
                {cartCount > 0 && (
                  <span 
                    className={`absolute -top-1 -right-1 bg-deal text-primary-foreground text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1 ${
                      cartBump ? 'animate-pulse-badge' : ''
                    }`}
                  >
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
};

export default Navbar;
