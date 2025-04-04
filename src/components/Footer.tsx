import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
} from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-invest-dark text-white">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-invest to-invest-accent">
                <div className="absolute inset-1 rounded-full bg-invest-dark flex items-center justify-center">
                  <div className="h-4 w-4 rounded-full bg-gradient-to-br from-invest to-invest-accent"></div>
                </div>
              </div>
              <span className="text-xl font-bold">Investo</span>
            </div>
            <p className="text-white/70">
              Invest smarter, not harder. Build your wealth with our data-driven
              platform.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-white/70 hover:text-white transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-white/70 hover:text-white transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-white/70 hover:text-white transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-white/70 hover:text-white transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Investing</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/stocks-etfs"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Stocks & ETFs
                </Link>
              </li>
              <li>
                <Link
                  href="/retirement"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Retirement
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio-management"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Portfolio Management
                </Link>
              </li>
              <li>
                <Link
                  href="/tax-loss-harvesting"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Tax-Loss Harvesting
                </Link>
              </li>
              <li>
                <Link
                  href="/socially-responsible"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Socially Responsible
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about-us"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/press"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Press
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-invest-accent" />
                <a
                  href="mailto:support@investo.com"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  support@investo.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-invest-accent" />
                <a
                  href="tel:+1234567890"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  +1 (234) 567-890
                </a>
              </li>
            </ul>

            <div className="mt-6">
              {/* <h4 className="font-semibold text-lg mb-4">Newsletter</h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="bg-white/10 text-white border border-white/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-invest-accent/50 placeholder-white/50"
                />
                <button className="bg-invest-accent hover:bg-invest-accent/90 text-white px-4 py-2 rounded-lg">
                  Subscribe
                </button>
              </div> */}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} Investo. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link
              href="/privacy"
              className="text-white/60 hover:text-white text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-white/60 hover:text-white text-sm transition-colors"
            >
              Terms of Service
            </Link>
            <a
              href="#"
              className="text-white/60 hover:text-white text-sm transition-colors"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
