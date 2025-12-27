const categories = [
  { name: 'Mobiles', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=80&h=80&fit=crop&auto=format' },
  { name: 'Laptops', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=80&h=80&fit=crop&auto=format' },
  { name: 'Electronics', image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=80&h=80&fit=crop&auto=format' },
  { name: 'Fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=80&h=80&fit=crop&auto=format' },
  { name: 'Home', image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=80&h=80&fit=crop&auto=format' },
  { name: 'Watches', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop&auto=format' },
  { name: 'Groceries', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=80&h=80&fit=crop&auto=format' },
  { name: 'Gaming', image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=80&h=80&fit=crop&auto=format' },
  { name: 'Beauty', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=80&h=80&fit=crop&auto=format' },
  { name: 'Sports', image: 'https://images.unsplash.com/photo-1461896836934- voices-1?w=80&h=80&fit=crop&auto=format' },
  { name: 'Books', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=80&h=80&fit=crop&auto=format' },
];

const CategoryStrip = () => {
  return (
    <section className="bg-card shadow-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-2 justify-center">
          {categories.map((category) => (
            <a
              key={category.name}
              href={`/category/${category.name.toLowerCase()}`}
              className="category-item flex flex-col items-center gap-2 min-w-[72px] group"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-border bg-muted transition-all group-hover:border-primary group-hover:scale-105 shadow-sm">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <span className="text-xs font-medium text-foreground whitespace-nowrap group-hover:text-primary transition-colors">
                {category.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryStrip;
