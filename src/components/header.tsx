'use client'; // Added 'use client' directive

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingBasket, LogIn, UserPlus, Search, Bell, Menu, ChevronDown, X } from 'lucide-react'; // Import necessary icons, including X for close
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"; // Import NavigationMenu components
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose, // Import SheetClose
} from "@/components/ui/sheet"; // Import Sheet components
import * as React from "react";
import { cn } from "@/lib/utils";

// Define categories directly here or fetch from an API/data source
const categories = [
  { id: 1, name: 'دیجیتال', icon: '📱', slug: 'digital', description: 'جدیدترین گجت‌ها و لوازم الکترونیکی' },
  { id: 2, name: 'مواد غذایی', icon: '🍎', slug: 'food', description: 'محصولات تازه و با کیفیت خوراکی' },
  { id: 3, name: 'لوازم خانگی', icon: '🏠', slug: 'home-appliances', description: 'بهترین‌ها برای خانه شما' },
  { id: 4, name: 'پوشاک', icon: '👕', slug: 'fashion', description: 'مد روز و لباس‌های با کیفیت' },
  { id: 5, name: 'زیبایی و سلامت', icon: '💄', slug: 'beauty-health', description: 'محصولات مراقبت شخصی' },
  { id: 6, name: 'خانه و دکوراسیون', icon: '🛋️', slug: 'home-decor', description: 'زیبایی و آسایش برای منزلتان' },
  { id: 7, name: 'ابزار و تجهیزات', icon: '🛠️', slug: 'tools', description: 'ابزارآلات مورد نیاز شما' },
  { id: 8, name: 'سایر', icon: '📦', slug: 'other', description: 'دسته‌بندی‌های متنوع دیگر' }
];

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none flex items-center">
             {/* Optionally add icon here if needed */}
             <span className="ml-2 rtl:mr-2">{title}</span>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"


const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header className="bg-background shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 lg:gap-8">
            <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse text-2xl font-bold text-primary">
               <ShoppingBasket className="h-8 w-8 transition-transform hover:scale-110 duration-300" />
               <span className="hidden sm:inline">خرید<span className="text-blue-600">گروهی</span></span>
            </Link>
            {/* Desktop Mega Menu - Adjusted for RTL */}
            <NavigationMenu dir="rtl" className="hidden lg:flex"> {/* Ensure dir="rtl" on NavigationMenu */}
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "hover:bg-accent/80 transition-colors")}>
                      صفحه اصلی
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="hover:bg-accent/80 transition-colors">دسته‌بندی‌ها</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    {/* Adjusted grid and width for potentially better RTL layout */}
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {categories.map((category) => (
                        <ListItem
                          key={category.id}
                          title={`${category.icon} ${category.name}`}
                          href={`/category/${category.slug}`}
                          className="text-right" // Ensure text aligns right within the list item
                        >
                          {category.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                 <NavigationMenuItem>
                  <Link href="/active-deals" legacyBehavior passHref>
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "hover:bg-accent/80 transition-colors")}>
                      خریدهای فعال
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                 <NavigationMenuItem>
                  <Link href="/about" legacyBehavior passHref>
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "hover:bg-accent/80 transition-colors")}>
                      درباره ما
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
             {/* Mobile Menu Trigger */}
             <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                   <Button variant="ghost" size="icon" className="lg:hidden">
                      <Menu className="h-6 w-6" />
                      <span className="sr-only">باز کردن منو</span>
                   </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]" dir="rtl">
                  <SheetHeader className="mb-6 border-b pb-4">
                    <SheetTitle className="flex items-center gap-2 text-primary">
                      <ShoppingBasket className="h-6 w-6" />
                       <span className="text-lg font-bold">خرید<span className="text-blue-600">گروهی</span></span>
                    </SheetTitle>
                     <SheetClose asChild>
                        <Button variant="ghost" size="icon" className="absolute left-4 top-4">
                           <X className="h-5 w-5" />
                           <span className="sr-only">بستن</span>
                        </Button>
                      </SheetClose>
                  </SheetHeader>
                  <nav className="flex flex-col space-y-4">
                     <SheetClose asChild>
                      <Link href="/" className="text-lg text-foreground hover:text-primary transition-colors py-2">صفحه اصلی</Link>
                    </SheetClose>
                     <SheetClose asChild>
                       <Link href="/categories" className="text-lg text-foreground hover:text-primary transition-colors py-2">دسته‌بندی‌ها</Link>
                     </SheetClose>
                     <SheetClose asChild>
                       <Link href="/active-deals" className="text-lg text-foreground hover:text-primary transition-colors py-2">خریدهای فعال</Link>
                     </SheetClose>
                     <SheetClose asChild>
                       <Link href="/about" className="text-lg text-foreground hover:text-primary transition-colors py-2">درباره ما</Link>
                     </SheetClose>
                    {/* Add category links or dropdown here if needed */}
                     <div className="pt-6 border-t mt-4 space-y-3">
                        <Button variant="outline" className="w-full justify-start">
                           <UserPlus className="ml-2 rtl:mr-2 h-4 w-4" />
                           ثبت نام
                         </Button>
                         <Button className="w-full justify-start">
                           <LogIn className="ml-2 rtl:mr-2 h-4 w-4" />
                           ورود
                         </Button>
                     </div>
                  </nav>
                </SheetContent>
              </Sheet>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3 rtl:space-x-reverse">
             <div className="relative hidden sm:block">
                <Input
                  type="text"
                  placeholder="جستجو..."
                  className="bg-secondary px-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-ring w-48 md:w-64 transition-all duration-300 focus:w-64 md:focus:w-72"
                  dir="rtl" // Keep dir="rtl" for input field if needed
                />
                {/* Adjusted search icon position for RTL */}
                <Search className="absolute right-3 rtl:left-3 rtl:right-auto top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            <Button variant="ghost" size="icon" className="relative transition-transform hover:scale-110 duration-300">
              <Bell className="h-5 w-5" />
              {/* Adjusted badge position for RTL */}
              <span className="absolute -top-1 -left-1 rtl:-right-1 rtl:-left-auto bg-destructive text-destructive-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
                ۳
              </span>
               <span className="sr-only">Notifications</span>
            </Button>
            <Button variant="outline" className="transition-transform hover:scale-105 duration-300 hidden sm:inline-flex">
              <UserPlus className="ml-2 rtl:mr-2 h-4 w-4" />
              ثبت نام
            </Button>
            <Button className="transition-transform hover:scale-105 duration-300">
              <LogIn className="ml-2 rtl:mr-2 h-4 w-4" />
              ورود
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
