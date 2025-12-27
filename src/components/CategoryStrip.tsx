import { Smartphone, Shirt, Home, Tv, Watch, ShoppingBag, Laptop, Gamepad2 } from 'lucide-react';

const categories = [
  { icon: Smartphone, name: 'Mobiles', color: 'bg-blue-100 text-blue-600' },
  { icon: Laptop, name: 'Laptops', color: 'bg-purple-100 text-purple-600' },
  { icon: Tv, name: 'Electronics', color: 'bg-orange-100 text-orange-600' },
  { icon: Shirt, name: 'Fashion', color: 'bg-pink-100 text-pink-600' },
  { icon: Home, name: 'Home', color: 'bg-green-100 text-green-600' },
  { icon: Watch, name: 'Watches', color: 'bg-amber-100 text-amber-600' },
  { icon: ShoppingBag, name: 'Groceries', color: 'bg-emerald-100 text-emerald-600' },
  { icon: Gamepad2, name: 'Gaming', color: 'bg-red-100 text-red-600' },
];

const CategoryStrip = () => {
  return (
    <section className="bg-card shadow-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
          {categories.map((category) => (
            <a
              key={category.name}
              href={`/category/${category.name.toLowerCase()}`}
              className="category-item flex flex-col items-center gap-2 min-w-[80px] group"
            >
              <div className={`w-14 h-14 rounded-full ${category.color} flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm`}>
                <category.icon className="h-6 w-6" />
              </div>
              <span className="text-sm font-medium text-foreground whitespace-nowrap group-hover:text-primary transition-colors">
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
