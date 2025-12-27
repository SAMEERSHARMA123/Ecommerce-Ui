import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, CreditCard, Truck, ShieldCheck, Headphones } from 'lucide-react';

const footerLinks = {
  about: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
    { label: 'Blog', href: '/blog' },
    { label: 'Corporate Information', href: '/corporate' },
  ],
  groupCompanies: [
    { label: 'ShopEase Wholesale', href: '#' },
    { label: 'ShopEase Express', href: '#' },
    { label: 'ShopEase Health+', href: '#' },
    { label: 'Cleartrip', href: '#' },
  ],
  help: [
    { label: 'Payments', href: '/help/payments' },
    { label: 'Shipping', href: '/help/shipping' },
    { label: 'Cancellation & Returns', href: '/help/returns' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Report Infringement', href: '/report' },
  ],
  consumerPolicy: [
    { label: 'Terms Of Use', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Security', href: '/security' },
    { label: 'Sitemap', href: '/sitemap' },
    { label: 'Grievance Redressal', href: '/grievance' },
    { label: 'EPR Compliance', href: '/epr' },
  ],
};

const paymentMethods = ['Visa', 'Mastercard', 'PayPal', 'UPI', 'Net Banking'];

const Footer = () => {
  return (
    <footer className="bg-footer text-footer-foreground">
      {/* Features bar */}
      <div className="border-b border-footer-foreground/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                <Truck className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Free Delivery</h4>
                <p className="text-xs text-footer-foreground/70">On orders over ₹499</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                <ShieldCheck className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Secure Payment</h4>
                <p className="text-xs text-footer-foreground/70">100% secure transactions</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Easy Returns</h4>
                <p className="text-xs text-footer-foreground/70">10 day return policy</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                <Headphones className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">24/7 Support</h4>
                <p className="text-xs text-footer-foreground/70">Dedicated help center</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-footer-foreground">
              About
            </h3>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-footer-foreground/70 hover:text-secondary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Group Companies */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-footer-foreground">
              Group Companies
            </h3>
            <ul className="space-y-2">
              {footerLinks.groupCompanies.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-footer-foreground/70 hover:text-secondary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-footer-foreground">
              Help
            </h3>
            <ul className="space-y-2">
              {footerLinks.help.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-footer-foreground/70 hover:text-secondary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Consumer Policy */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-footer-foreground">
              Consumer Policy
            </h3>
            <ul className="space-y-2">
              {footerLinks.consumerPolicy.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-footer-foreground/70 hover:text-secondary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2">
            <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-footer-foreground">
              Registered Office Address
            </h3>
            <div className="space-y-3 text-sm text-footer-foreground/70">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-secondary flex-shrink-0" />
                <p>
                  ShopEase Internet Private Limited,<br />
                  Buildings Alyssa, Begonia & Clove Embassy Tech Village,<br />
                  Outer Ring Road, Devarabeesanahalli Village,<br />
                  Bengaluru, 560103, Karnataka, India
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-secondary" />
                <span>1800-123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-secondary" />
                <span>support@shopease.com</span>
              </div>
            </div>

            {/* Social */}
            <div className="mt-6">
              <h4 className="font-semibold text-sm mb-3">Follow Us</h4>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-footer-foreground/10 flex items-center justify-center hover:bg-secondary transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-footer-foreground/10 flex items-center justify-center hover:bg-secondary transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-footer-foreground/10 flex items-center justify-center hover:bg-secondary transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-footer-foreground/10 flex items-center justify-center hover:bg-secondary transition-colors"
                  aria-label="Youtube"
                >
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Payment methods */}
        <div className="mt-10 pt-8 border-t border-footer-foreground/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Payment Methods:</span>
              <div className="flex gap-2">
                {paymentMethods.map((method) => (
                  <span
                    key={method}
                    className="px-3 py-1 text-xs bg-footer-foreground/10 rounded"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-foreground/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-footer-foreground/60">
            <div className="flex flex-wrap items-center gap-4">
              <a href="/seller" className="hover:text-secondary transition-colors">
                Become a Seller
              </a>
              <span>|</span>
              <a href="/advertise" className="hover:text-secondary transition-colors">
                Advertise
              </a>
              <span>|</span>
              <a href="/gift-cards" className="hover:text-secondary transition-colors">
                Gift Cards
              </a>
              <span>|</span>
              <a href="/help-center" className="hover:text-secondary transition-colors">
                Help Center
              </a>
            </div>
            <p>© 2024 ShopEase. All rights reserved. CIN: U51109KA2024PTC000000</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
