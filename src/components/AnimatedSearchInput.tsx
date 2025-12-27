import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const placeholders = [
  'Search for mobiles',
  'Search for laptops',
  'Search for fashion',
  'Search for electronics',
  'Search for home essentials',
  'Search for watches',
  'Search for groceries',
];

const AnimatedSearchInput = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isPaused || inputValue.length > 0) return;

    const interval = setInterval(() => {
      setIsAnimating(true);
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % placeholders.length);
        setNextIndex((prev) => (prev + 1) % placeholders.length);
        setIsAnimating(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, inputValue]);

  const handleFocus = () => {
    setIsPaused(true);
  };

  const handleBlur = () => {
    if (inputValue.length === 0) {
      setIsPaused(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (e.target.value.length > 0) {
      setIsPaused(true);
    }
  };

  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
      
      {/* Animated placeholder container */}
      {inputValue.length === 0 && (
        <div className="absolute left-10 top-0 bottom-0 right-4 pointer-events-none overflow-hidden flex items-center">
          <div
            className={cn(
              "absolute w-full transition-all duration-500 ease-in-out",
              isAnimating 
                ? "-translate-y-full opacity-0" 
                : "translate-y-0 opacity-100"
            )}
          >
            <span className="text-muted-foreground text-sm">
              {placeholders[currentIndex]}
            </span>
          </div>
          <div
            className={cn(
              "absolute w-full transition-all duration-500 ease-in-out",
              isAnimating 
                ? "translate-y-0 opacity-100" 
                : "translate-y-full opacity-0"
            )}
          >
            <span className="text-muted-foreground text-sm">
              {placeholders[nextIndex]}
            </span>
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        type="search"
        value={inputValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="w-full h-10 pl-10 pr-4 bg-card border-0 rounded-lg text-foreground text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary transition-all"
        aria-label="Search products"
      />
    </div>
  );
};

export default AnimatedSearchInput;
