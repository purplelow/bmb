'use client';

import React from 'react';
import Link from 'next/link';
import { Share2, ExternalLink, Mail, Globe } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-zinc-950 text-white py-20">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <span className="text-3xl font-black text-gradient">BBM</span>
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Discover the most exquisite bakeries and artisanal bread makers. We curate the best flavors for your journey.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest">Platform</h4>
            <ul className="space-y-4 text-zinc-400 text-sm">
              <li><Link href="/" className="hover:text-accent-primary transition-colors">Bakeries</Link></li>
              <li><Link href="/" className="hover:text-accent-primary transition-colors">Special Offers</Link></li>
              <li><Link href="/" className="hover:text-accent-primary transition-colors">Gift Cards</Link></li>
              <li><Link href="/" className="hover:text-accent-primary transition-colors">Events</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest">Support</h4>
            <ul className="space-y-4 text-zinc-400 text-sm">
              <li><Link href="/" className="hover:text-accent-primary transition-colors">Help Center</Link></li>
              <li><Link href="/" className="hover:text-accent-primary transition-colors">Safety Center</Link></li>
              <li><Link href="/" className="hover:text-accent-primary transition-colors">Community</Link></li>
              <li><Link href="/" className="hover:text-accent-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest">Connect</h4>
            <div className="flex gap-4 mb-8">
              <Link href="#" className="p-2 bg-zinc-900 rounded-lg hover:bg-accent-primary transition-all">
                <Globe className="h-5 w-5" />
              </Link>
              <Link href="#" className="p-2 bg-zinc-900 rounded-lg hover:bg-accent-primary transition-all">
                <Share2 className="h-5 w-5" />
              </Link>
              <Link href="#" className="p-2 bg-zinc-900 rounded-lg hover:bg-accent-primary transition-all">
                <ExternalLink className="h-5 w-5" />
              </Link>
            </div>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Join our newsletter" 
                className="w-full bg-zinc-900 border-none rounded-lg py-3 px-4 text-sm focus:ring-1 focus:ring-accent-primary outline-none"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-accent-primary text-white p-1.5 rounded-md hover:bg-accent-primary/80 transition-all">
                <Mail className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-500 text-xs font-medium">
          <p>© 2026 Bakery Box Market. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
