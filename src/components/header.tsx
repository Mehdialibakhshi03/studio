
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingBasket, LogIn, UserPlus, Search, Bell, Menu, ChevronDown, X, User, Heart, ShoppingCart, Phone, LifeBuoy, Building, Percent, Newspaper } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from '@/components/ui/badge';
import { categories as appCategories } from '@/lib/data'; // Import categories from data.ts

// Define categories and other nav items
// Using appCategories from data.ts, mapping them to the expected structure if needed.
const navItems = appCategories.map(cat => ({
    name: cat.name,
    icon: cat.icon, // Assuming lucide-react icons can be mapped or icon is a string/emoji
    slug: cat.slug,
    description: `محصولات دسته ${cat.name}` // Generic description
}));


const otherLinks = [
    { name: 'فروش ویژه', icon: Percent , slug: 'special-offers'},
    { name: 'وبلاگ', icon: Newspaper , slug: 'blog'},
    { name: 'درباره ما', icon: Building , slug: 'about'},
    { name: 'تماس با ما', icon: Phone, slug: 'contact'},
]

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { iconString?: string } // Changed icon to iconString for emoji/char
>(({ className, title, children, iconString, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href || '#'}
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none flex items-center">
             {iconString && <span className="mr-2 rtl:ml-2 text-lg text-primary">{iconString}</span>}
             <span>{title}</span>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [cartItemCount, setCartItemCount] = React.useState(3);
  const [wishlistItemCount, setWishlistItemCount] = React.useState(1);

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchQuery = formData.get('search');
    console.log("Search Query:", searchQuery);
    // Add actual search logic here
  };


  return (
    <header className="bg-background shadow-sm sticky top-0 z-50 border-b border-border/80">
      {/* Top Bar */}
      <div className="bg-secondary/50 text-secondary-foreground text-xs border-b border-border/60">
        <div className="container mx-auto px-4 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/contact" className="flex items-center gap-1 hover:text-primary transition-colors">
              <Phone className="w-3.5 h-3.5" />
              <span>تماس با ما</span>
            </Link>
            <Link href="/help" className="hidden sm:flex items-center gap-1 hover:text-primary transition-colors">
              <LifeBuoy className="w-3.5 h-3.5" />
              <span>راهنمای خرید</span>
            </Link>
            <Link href="/become-seller" className="hidden md:flex items-center gap-1 hover:text-primary transition-colors">
              <Building className="w-3.5 h-3.5" />
              <span>فروشنده شوید</span>
            </Link>
          </div>
          <div className="flex items-center gap-3">
             <Link href="/register">
                <Button variant="link" size="sm" className="text-xs h-auto px-1 py-0.5 text-secondary-foreground hover:text-primary">
                    <UserPlus className="ml-1 rtl:mr-1 h-3.5 w-3.5" />
                    ثبت نام
                </Button>
             </Link>
              <span className="text-muted-foreground/50">|</span>
             <Link href="/login">
                <Button variant="link" size="sm" className="text-xs h-auto px-1 py-0.5 text-secondary-foreground hover:text-primary">
                    <LogIn className="ml-1 rtl:mr-1 h-3.5 w-3.5" />
                    ورود
                </Button>
             </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 lg:gap-6">
             <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                   <Button variant="ghost" size="icon" className="lg:hidden h-9 w-9">
                      <Menu className="h-5 w-5" />
                      <span className="sr-only">باز کردن منو</span>
                   </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[350px] bg-background p-0 flex flex-col" dir="rtl">
                  <SheetHeader className="p-4 pb-3 border-b flex flex-row items-center justify-between">
                    <SheetTitle className="flex items-center gap-2 text-primary">
                      <ShoppingBasket className="h-6 w-6" />
                       <span className="text-lg font-bold">خرید<span className="text-accent">گروهی</span></span>
                    </SheetTitle>
                     <SheetClose asChild>
                        <Button variant="ghost" size="icon" className="-mr-2 text-muted-foreground h-8 w-8">
                           <X className="h-4 w-4" />
                           <span className="sr-only">بستن</span>
                        </Button>
                      </SheetClose>
                  </SheetHeader>
                  <div className="p-4 border-b">
                     <form onSubmit={handleSearchSubmit} className="relative">
                        <Input
                          name="search"
                          type="search"
                          placeholder="جستجو..."
                          className="bg-secondary border-none pl-10 rtl:pr-10 rounded-md text-sm focus:ring-1 focus:ring-ring focus:ring-offset-0 focus:bg-background h-9 w-full"
                          dir="rtl"
                        />
                        <Button type="submit" variant="ghost" size="icon" className="absolute right-1 rtl:left-1 rtl:right-auto top-1/2 transform -translate-y-1/2 h-7 w-7 text-muted-foreground">
                           <Search className="h-4 w-4" />
                           <span className="sr-only">جستجو</span>
                        </Button>
                      </form>
                  </div>
                  <nav className="flex-grow flex flex-col space-y-1 p-4 overflow-y-auto">
                     <SheetClose asChild>
                      <Link href="/" className="text-base font-medium text-foreground hover:text-primary transition-colors py-2 px-3 rounded-md hover:bg-secondary block">صفحه اصلی</Link>
                    </SheetClose>
                     {navItems.map((item) => (
                         <SheetClose asChild key={item.slug}>
                           <Link href={`/category/${item.slug}`} className="text-base font-medium text-foreground hover:text-primary transition-colors py-2 px-3 rounded-md hover:bg-secondary block">
                             <span className="mr-2 rtl:ml-2">{item.icon}</span>{item.name}
                           </Link>
                         </SheetClose>
                     ))}
                     {otherLinks.map((item) => (
                         <SheetClose asChild key={item.slug}>
                             <Link href={`/${item.slug}`} className="text-base font-medium text-foreground hover:text-primary transition-colors py-2 px-3 rounded-md hover:bg-secondary block flex items-center gap-2">
                                <item.icon className="w-4 h-4"/> {item.name}
                             </Link>
                         </SheetClose>
                     ))}
                  </nav>
                   <div className="p-4 border-t mt-auto space-y-3">
                      <SheetClose asChild>
                        <Link href="/register" className="w-full">
                            <Button variant="outline" className="w-full justify-center">
                               <UserPlus className="ml-2 rtl:mr-2 h-4 w-4" />
                               ثبت نام
                             </Button>
                        </Link>
                      </SheetClose>
                       <SheetClose asChild>
                         <Link href="/login" className="w-full">
                             <Button className="w-full justify-center">
                               <LogIn className="ml-2 rtl:mr-2 h-4 w-4" />
                               ورود
                             </Button>
                         </Link>
                       </SheetClose>
                   </div>
                </SheetContent>
              </Sheet>

            <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse text-xl sm:text-2xl font-bold text-primary shrink-0">
               <ShoppingBasket className="h-7 w-7 sm:h-8 sm:w-8 transition-transform hover:rotate-[-12deg] duration-300" />
               <span className="hidden sm:inline">خرید<span className="text-accent">گروهی</span></span>
            </Link>
          </div>

          <div className="flex-grow max-w-lg hidden md:block">
             <form onSubmit={handleSearchSubmit} className="relative w-full">
                <Input
                  name="search"
                  type="search"
                  placeholder="جستجو در میان هزاران کالا..."
                  className="bg-secondary border-none pl-10 rtl:pr-10 rounded-md text-sm focus:ring-1 focus:ring-ring focus:ring-offset-0 focus:bg-background h-10 w-full"
                  dir="rtl"
                />
                <Button type="submit" variant="ghost" size="icon" className="absolute right-2 rtl:left-2 rtl:right-auto top-1/2 transform -translate-y-1/2 h-8 w-8 text-muted-foreground">
                    <Search className="h-5 w-5" />
                    <span className="sr-only">جستجو</span>
                </Button>
              </form>
          </div>

          <div className="flex items-center space-x-1 sm:space-x-2 rtl:space-x-reverse">
             <Button variant="ghost" size="icon" className="relative transition-transform hover:scale-110 duration-300 text-muted-foreground hover:text-foreground h-9 w-9">
              <User className="h-5 w-5" />
               <span className="sr-only">حساب کاربری</span>
            </Button>
             <Button variant="ghost" size="icon" className="relative transition-transform hover:scale-110 duration-300 text-muted-foreground hover:text-foreground h-9 w-9">
              <Heart className="h-5 w-5" />
              {wishlistItemCount > 0 && (
                  <Badge variant="destructive" className="absolute -top-1 -right-1 rtl:-left-1 rtl:-right-auto h-4 w-4 min-w-4 p-0 flex items-center justify-center text-[10px] rounded-full">
                   {wishlistItemCount}
                 </Badge>
               )}
               <span className="sr-only">علاقه‌مندی‌ها</span>
            </Button>
            <Button variant="ghost" size="icon" className="relative transition-transform hover:scale-110 duration-300 text-muted-foreground hover:text-foreground h-9 w-9">
              <ShoppingCart className="h-5 w-5" />
               {cartItemCount > 0 && (
                 <Badge variant="destructive" className="absolute -top-1 -right-1 rtl:-left-1 rtl:-right-auto h-4 w-4 min-w-4 p-0 flex items-center justify-center text-[10px] rounded-full animate-pulse">
                   {cartItemCount}
                 </Badge>
               )}
               <span className="sr-only">سبد خرید</span>
            </Button>
          </div>
        </div>
      </div>

       <nav className="border-t border-border/60 bg-background hidden lg:block">
         <div className="container mx-auto px-4">
            <NavigationMenu dir="rtl" className="justify-start">
              <NavigationMenuList className="gap-1">
                {navItems.map((item) => (
                    <NavigationMenuItem key={item.slug}>
                      <NavigationMenuTrigger className={cn(navigationMenuTriggerStyle(), "h-10 text-sm bg-transparent shadow-none border-none hover:bg-accent/50")}>
                         <span className="mr-1 rtl:ml-1 text-base">{item.icon}</span> {item.name}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                         <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                            <li className="row-span-3">
                              <NavigationMenuLink asChild>
                                <Link
                                  className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                  href={`/category/${item.slug}`}
                                >
                                   <span className="text-3xl">{item.icon}</span>
                                  <div className="mb-2 mt-4 text-lg font-medium">
                                    {item.name}
                                  </div>
                                  <p className="text-sm leading-tight text-muted-foreground">
                                    {item.description}
                                  </p>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                            {/* Example Sub-items - these should be dynamically generated if you have subcategories */}
                            <ListItem href={`/category/${item.slug}?filter=brand-a`} title="برند الف" iconString="⭐">
                               زیرمجموعه اول محصولات {item.name}
                             </ListItem>
                             <ListItem href={`/category/${item.slug}?filter=brand-b`} title="برند ب" iconString="✨">
                               زیرمجموعه دوم محصولات {item.name}
                             </ListItem>
                             <ListItem href={`/category/${item.slug}`} title="مشاهده همه" iconString="➡️">
                               نمایش تمام محصولات {item.name}
                             </ListItem>
                          </ul>
                       </NavigationMenuContent>
                    </NavigationMenuItem>
                 ))}
                 <span className="h-6 w-px bg-border mx-2 self-center"></span>
                 {otherLinks.map(link => (
                    <NavigationMenuItem key={link.slug}>
                        <Link href={`/${link.slug}`} legacyBehavior passHref>
                          <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "h-10 text-sm bg-transparent shadow-none border-none hover:bg-accent/50 font-normal")}>
                             <link.icon className="ml-1.5 rtl:mr-1.5 h-4 w-4 text-muted-foreground"/> {link.name}
                          </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                 ))}
              </NavigationMenuList>
            </NavigationMenu>
         </div>
       </nav>
    </header>
  );
};

export default Header;
