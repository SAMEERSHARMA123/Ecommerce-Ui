import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';

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
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isPaused || inputValue.length > 0) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % placeholders.length);
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
          {placeholders.map((placeholder, index) => (
            <div
              key={index}
              className="absolute w-full transition-none"
              style={{
                transform: index === activeIndex 
                  ? 'translateY(0)' 
                  : index === (activeIndex - 1 + placeholders.length) % placeholders.length
                    ? 'translateY(-100%)'
                    : 'translateY(100%)',
                opacity: index === activeIndex ? 1 : 0,
                animation: index === activeIndex 
                  ? 'slideInFromBottom 0.5s ease-out forwards'
                  : index === (activeIndex - 1 + placeholders.length) % placeholders.length
                    ? 'slideOutToTop 0.5s ease-out forwards'
                    : 'none',
              }}
            >
              <span className="text-muted-foreground text-sm">
                {placeholder}
              </span>
            </div>
          ))}
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

      <style>{`
        @keyframes slideInFromBottom {
          0% {
            transform: translateY(100%);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes slideOutToTop {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(-100%);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedSearchInput;
