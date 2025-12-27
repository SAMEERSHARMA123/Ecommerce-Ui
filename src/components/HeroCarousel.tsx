import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import banner1 from '@/assets/banner-1.jpg';
import banner2 from '@/assets/banner-2.jpg';
import banner3 from '@/assets/banner-3.jpg';

const banners = [
  {
    id: 1,
    image: banner1,
    title: 'Mega Electronics Sale',
    subtitle: 'Up to 50% off on Smartphones & Laptops',
    cta: 'Shop Now',
  },
  {
    id: 2,
    image: banner2,
    title: 'New Fashion Arrivals',
    subtitle: 'Discover the latest trends for every occasion',
    cta: 'Explore',
  },
  {
    id: 3,
    image: banner3,
    title: 'Home Essentials',
    subtitle: 'Premium appliances at unbeatable prices',
    cta: 'View Deals',
  },
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className="relative w-full overflow-hidden bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="relative rounded-xl overflow-hidden shadow-lg aspect-[21/9] sm:aspect-[3/1]">
          {/* Slides */}
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                index === currentSlide
                  ? 'opacity-100 translate-x-0'
                  : index < currentSlide
                  ? 'opacity-0 -translate-x-full'
                  : 'opacity-0 translate-x-full'
              }`}
            >
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 via-foreground/30 to-transparent" />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 lg:px-16">
                <div className={`max-w-lg transition-all duration-500 delay-200 ${
                  index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-card mb-2 sm:mb-4">
                    {banner.title}
                  </h2>
                  <p className="text-sm sm:text-lg text-card/90 mb-4 sm:mb-6">
                    {banner.subtitle}
                  </p>
                  <button className="px-6 py-2.5 bg-secondary text-secondary-foreground font-semibold rounded-lg hover:bg-secondary/90 transition-colors shadow-lg">
                    {banner.cta}
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation arrows */}
          <button
            onClick={goToPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-card/90 hover:bg-card rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5 text-foreground" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-card/90 hover:bg-card rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5 text-foreground" />
          </button>

          {/* Pagination dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === currentSlide
                    ? 'bg-secondary w-8'
                    : 'bg-card/60 hover:bg-card'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
