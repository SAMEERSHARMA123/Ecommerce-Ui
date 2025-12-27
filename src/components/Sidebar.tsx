import { X, Home, Grid3X3, Tag, Package, User, HelpCircle, LogIn } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: Grid3X3, label: 'All Categories', href: '/categories' },
  { icon: Tag, label: 'Offers Zone', href: '/offers' },
  { icon: Package, label: 'My Orders', href: '/orders' },
  { icon: User, label: 'My Account', href: '/account' },
  { icon: HelpCircle, label: 'Help & Support', href: '/support' },
];

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-foreground/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar panel */}
      <div
        className={`fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-card z-50 shadow-2xl transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-primary">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
              <User className="h-5 w-5 text-secondary-foreground" />
            </div>
            <div>
              <p className="text-primary-foreground font-medium">Hello, User</p>
              <button className="text-sm text-primary-foreground/80 hover:text-primary-foreground flex items-center gap-1">
                <LogIn className="h-3 w-3" />
                Login / Sign Up
              </button>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Menu items */}
        <nav className="p-4">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-muted transition-colors group"
                  onClick={onClose}
                >
                  <item.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="font-medium">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-muted/50">
          <p className="text-xs text-muted-foreground text-center">
            ShopEase © 2024. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
