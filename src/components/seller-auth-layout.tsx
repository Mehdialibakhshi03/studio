
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Building, ShoppingBasket } from 'lucide-react'; // Using Building icon for seller context

interface SellerAuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  illustrationUrl?: string;
  illustrationAlt?: string;
  illustrationAiHint?: string;
}

const SellerAuthLayout: React.FC<SellerAuthLayoutProps> = ({
  children,
  title,
  description,
  illustrationUrl = "https://placehold.co/1200x900.png", 
  illustrationAlt = "Seller Authentication Illustration",
  illustrationAiHint = "business seller online store" 
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-background to-secondary/70 flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8" dir="rtl">
      <div className="absolute top-6 right-6">
        <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse text-xl sm:text-2xl font-bold text-primary">
          <ShoppingBasket className="h-7 w-7 sm:h-8 sm:w-8 transition-transform hover:rotate-[-12deg] duration-300" />
          <span className="hidden sm:inline">خرید<span className="text-accent">گروهی</span></span>
        </Link>
      </div>
      <div className="w-full max-w-4xl lg:max-w-6xl bg-card shadow-2xl rounded-xl overflow-hidden lg:grid lg:grid-cols-2 animate-fade-in animation-delay-200">
        <div className="p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
          <div className="mb-8 text-center lg:text-right">
            <Building className="h-12 w-12 text-primary mx-auto lg:mx-0 mb-4" />
            <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-2">{title}</h1>
            {description && <p className="text-muted-foreground">{description}</p>}
          </div>
          {children}
        </div>
        <div className="hidden lg:block relative">
          <Image
            src={illustrationUrl}
            alt={illustrationAlt}
            layout="fill"
            objectFit="cover"
            data-ai-hint={illustrationAiHint}
            className="opacity-90"
          />
           <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent"></div>
        </div>
      </div>
      <p className="mt-8 text-sm text-muted-foreground animate-fade-in animation-delay-400">
        © {new Date().getFullYear()} خرید گروهی. تمامی حقوق محفوظ است.
      </p>
    </div>
  );
};

export default SellerAuthLayout;
