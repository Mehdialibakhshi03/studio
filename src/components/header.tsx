import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingBasket, LogIn, UserPlus, Search, Bell, Menu, ChevronDown } from 'lucide-react'; // Import necessary icons
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"; // Import NavigationMenu components
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
  return (
    <header className="bg-background shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 lg:gap-8"> {/* Adjusted gap */}
            <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse text-2xl font-bold text-primary">
               <ShoppingBasket className="h-8 w-8 transition-transform hover:scale-110 duration-300" />
               <span className="hidden sm:inline">خرید<span className="text-blue-600">گروهی</span></span>
            </Link>
            {/* Mega Menu */}
            <NavigationMenu className="hidden lg:flex"> {/* Hide on smaller screens */}
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
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      {categories.map((category) => (
                        <ListItem
                          key={category.id}
                          title={`${category.icon} ${category.name}`}
                          href={`/category/${category.slug}`}
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
             {/* Mobile Menu Trigger (Optional) */}
             <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">منو</span>
             </Button>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3 rtl:space-x-reverse">
             <div className="relative hidden sm:block">
                <Input
                  type="text"
                  placeholder="جستجو..."
                  className="bg-secondary px-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-ring w-48 md:w-64 transition-all duration-300 focus:w-64 md:focus:w-72" // Added transition
                  dir="rtl"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            <Button variant="ghost" size="icon" className="relative transition-transform hover:scale-110 duration-300">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center animate-pulse"> {/* Added pulse */}
                ۳
              </span>
               <span className="sr-only">Notifications</span>
            </Button>
            <Button variant="outline" className="transition-transform hover:scale-105 duration-300 hidden sm:inline-flex">
              <UserPlus className="ml-2 h-4 w-4" />
              ثبت نام
            </Button>
            <Button className="transition-transform hover:scale-105 duration-300">
              <LogIn className="ml-2 h-4 w-4" />
              ورود
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
