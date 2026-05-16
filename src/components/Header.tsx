"use client";

import React from "react";
import Link from "next/link";
import { Search, User, Heart, ShoppingBag } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

export const Header = () => {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <header className="glass fixed top-0 w-full z-50 h-16 flex items-center px-6 transition-all duration-300">
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tight text-gradient">BMB</span>
          <span className="text-sm font-medium text-secondary hidden sm:block">Bakery Box Market</span>
        </Link>

        <div className="flex-1 max-w-md mx-8 relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted h-4 w-4" />
          <input
            type="text"
            placeholder="Search for bakeries..."
            className="w-full bg-secondary border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-accent-primary transition-all outline-none"
          />
        </div>

        <nav className="flex items-center gap-6">
          <Link href="/favorites" className="text-secondary hover:text-accent-primary transition-colors">
            <Heart className="h-5 w-5" />
          </Link>
          <Link href="/cart" className="text-secondary hover:text-accent-primary transition-colors">
            <ShoppingBag className="h-5 w-5" />
          </Link>
          {isAuthenticated ? (
            <Link href="/mypage" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full premium-gradient flex-center text-white text-xs font-bold">
                {user?.name.charAt(0)}
              </div>
            </Link>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 text-sm font-semibold text-accent-primary border border-accent-primary px-4 py-1.5 rounded-full hover:bg-accent-primary hover:text-white transition-all"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};
