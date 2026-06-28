"use client";

import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-background border-t border-divider pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="font-bold text-inherit mb-4 block">
              <span className="text-2xl text-primary tracking-tighter">Nex<span className="text-secondary">Shop</span></span>
            </Link>
            <p className="text-foreground/70 mb-6 text-sm">
              The next generation of e-commerce, powered by advanced artificial intelligence to provide you with the ultimate shopping experience.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-foreground/60 hover:text-primary"><FaFacebook size={20} /></Link>
              <Link href="#" className="text-foreground/60 hover:text-primary"><FaInstagram size={20} /></Link>
              <Link href="#" className="text-foreground/60 hover:text-primary"><FaLinkedin size={20} /></Link>
              <Link href="#" className="text-foreground/60 hover:text-primary"><FaGithub size={20} /></Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-foreground/70 hover:text-primary text-sm">Home</Link></li>
              <li><Link href="/explore" className="text-foreground/70 hover:text-primary text-sm">Explore Products</Link></li>
              <li><Link href="/categories" className="text-foreground/70 hover:text-primary text-sm">Categories</Link></li>
              <li><Link href="/about" className="text-foreground/70 hover:text-primary text-sm">About Us</Link></li>
              <li><Link href="/contact" className="text-foreground/70 hover:text-primary text-sm">Contact</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-foreground">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link href="/faq" className="text-foreground/70 hover:text-primary text-sm">FAQ</Link></li>
              <li><Link href="/shipping" className="text-foreground/70 hover:text-primary text-sm">Shipping Policy</Link></li>
              <li><Link href="/returns" className="text-foreground/70 hover:text-primary text-sm">Returns & Refunds</Link></li>
              <li><Link href="/track-order" className="text-foreground/70 hover:text-primary text-sm">Track Order</Link></li>
              <li><Link href="/support" className="text-foreground/70 hover:text-primary text-sm">Support Center</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-foreground">Contact Us</h3>
            <ul className="space-y-3 text-sm text-foreground/70">
              <li className="flex flex-col">
                <span className="font-semibold text-foreground">Email:</span>
                <a href="mailto:support@nexshop.ai" className="hover:text-primary">support@nexshop.ai</a>
              </li>
              <li className="flex flex-col">
                <span className="font-semibold text-foreground">Phone:</span>
                <a href="tel:+1234567890" className="hover:text-primary">+1 (555) 123-4567</a>
              </li>
              <li className="flex flex-col">
                <span className="font-semibold text-foreground">Address:</span>
                <span>123 AI Boulevard, Tech District<br/>San Francisco, CA 94105</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-divider pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-foreground/60">
            &copy; {new Date().getFullYear()} NexShop AI. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-xs text-foreground/60 hover:text-primary">Privacy Policy</Link>
            <Link href="/terms" className="text-xs text-foreground/60 hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
