
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingBasket, LogIn, UserPlus, Search, Bell, Menu, ChevronDown, X, User, Heart, ShoppingCart, Phone, LifeBuoy, Building, Percent, Newspaper, Flame, HelpCircle, Store as StoreIconOriginal, ListChecks, PlusCircle, ShoppingBag } from 'lucide-react'; // Renamed Store to StoreIconOriginal
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
import { groupShoppingCategories, mainNavLinks as dataMainNavLinks, type MegaMenuCategory } from '@/lib/data'; // Import new mega menu categories

const StoreIcon = StoreIconOriginal; // Alias for clarity if needed, or use StoreIconOriginal directly

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon?: React.ElementType }
>(({ className, title, children, icon: Icon, href, ...props }, ref) => {
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
             {Icon && <Icon className="ml-2 rtl:mr-2 h-5 w-5 text-primary" />}
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
  const [cartItemCount, setCartItemCount] = React.useState(3); // Example count

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchQuery = formData.get('search');
    console.log("Search Query:", searchQuery);
    // Add actual search logic here, e.g., router.push(`/search?q=${searchQuery}`)
  };

  // Using the imported mainNavLinks from data.ts
  const mainNavLinks = dataMainNavLinks;


  return (
    <header className="bg-background shadow-sm sticky top-0 z-50 border-b border-border/80">
      {/* Top Bar */}
      <div className="bg-secondary/50">
        <div className="container mx-auto px-4 h-10 flex items-center justify-between text-xs text-secondary-foreground">
          <div className="flex items-center gap-4">
            <Link href="/contact-us" className="hover:text-primary transition-colors flex items-center gap-1">
              <Phone className="w-3.5 h-3.5"/>
              <span>پشتیبانی: ۰۲۱-۱۲۳۴۵۶۷۸</span>
            </Link>
            <Link href="/faq" className="hover:text-primary transition-colors hidden sm:flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5"/>
              <span>سوالات متداول</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
             <Link href="/seller/login" className="hover:text-primary transition-colors flex items-center gap-1">
                <StoreIcon className="w-3.5 h-3.5"/>
                <span>پنل فروشندگان</span>
            </Link>
             <Link href="/track-order" className="hover:text-primary transition-colors hidden sm:flex items-center gap-1">
               <Building className="w-3.5 h-3.5"/> {/* Using Building as a placeholder for tracking */}
               <span>پیگیری سفارش</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 lg:gap-4">
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
                          placeholder="چی می‌خوای ارزون‌تر بخری؟ بنویس…"
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
                     <SheetClose asChild>
                       <Link href="/categories" className="text-base font-medium text-foreground hover:text-primary transition-colors py-2 px-3 rounded-md hover:bg-secondary block flex items-center gap-2">
                         <ShoppingBag className="w-4 h-4"/> خرید گروهی (دسته‌بندی‌ها)
                       </Link>
                     </SheetClose>
                     {mainNavLinks.map((link) => (
                         <SheetClose asChild key={link.href}>
                           <Link href={link.href} className="text-base font-medium text-foreground hover:text-primary transition-colors py-2 px-3 rounded-md hover:bg-secondary block flex items-center gap-2">
                             {link.icon && <link.icon className="w-4 h-4"/>}
                             {link.ctaText || link.title}
                             {link.special && <Flame className="w-0 h-0 sm:w-4 sm:h-4 text-destructive animate-pulse inline-block ml-1"/>}
                           </Link>
                         </SheetClose>
                     ))}
                      <SheetClose asChild>
                           <Link href="/seller/register" className="text-base font-medium text-foreground hover:text-primary transition-colors py-2 px-3 rounded-md hover:bg-secondary block flex items-center gap-2">
                             <StoreIcon className="w-4 h-4"/> می‌خوای کالا بفروشی؟ بیا اینجا
                           </Link>
                      </SheetClose>
                  </nav>
                   <div className="p-4 border-t mt-auto space-y-3">
                      <SheetClose asChild>
                        <Link href="/register" className="w-full">
                            <Button variant="outline" className="w-full justify-center">
                               <UserPlus className="ml-2 rtl:mr-2 h-4 w-4" />
                               ثبت نام کاربر
                             </Button>
                        </Link>
                      </SheetClose>
                       <SheetClose asChild>
                         <Link href="/login" className="w-full">
                             <Button variant="cta" className="w-full justify-center"> {/* Changed to cta */}
                               <LogIn className="ml-2 rtl:mr-2 h-4 w-4" />
                               ورود کاربر
                             </Button>
                         </Link>
                       </SheetClose>
                   </div>
                </SheetContent>
              </Sheet>

            <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse text-xl sm:text-2xl font-bold text-primary shrink-0">
               <ShoppingBasket className="h-7 w-7 sm:h-8 sm:h-8 transition-transform hover:rotate-[-12deg] duration-300 text-primary" />
               <span className="hidden sm:inline">خرید<span className="text-accent">گروهی</span></span>
            </Link>
          </div>

          <div className="flex-grow max-w-xl hidden md:block mx-4">
             <form onSubmit={handleSearchSubmit} className="relative w-full">
                <Input
                  name="search"
                  type="search"
                  placeholder="چی می‌خوای ارزون‌تر بخری؟ بنویس…"
                  className="bg-secondary border-none focus:border-primary text-foreground placeholder:text-muted-foreground pl-10 rtl:pr-10 rounded-md text-sm focus:ring-1 focus:ring-ring focus:ring-offset-0 h-10 w-full"
                  dir="rtl"
                />
                <Button type="submit" variant="ghost" size="icon" className="absolute right-2 rtl:left-2 rtl:right-auto top-1/2 transform -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-primary">
                    <Search className="h-5 w-5" />
                    <span className="sr-only">جستجو</span>
                </Button>
              </form>
          </div>

          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            <Link href="/login" passHref>
                 <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-xs h-9 text-foreground hover:bg-secondary">
                    <User className="w-4 h-4 ml-1 rtl:mr-1"/>
                    ورود
                 </Button>
             </Link>
             <Link href="/register" passHref>
                 <Button variant="cta" size="sm" className="hidden sm:inline-flex text-xs h-9">
                     <UserPlus className="w-4 h-4 ml-1 rtl:mr-1"/>
                     ثبت نام
                 </Button>
             </Link>
            <Button variant="ghost" size="icon" className="relative transition-transform hover:scale-110 duration-300 text-muted-foreground hover:text-primary h-9 w-9">
              <ShoppingCart className="h-5 w-5" />
               {cartItemCount > 0 && (
                 <Badge variant="destructive" className="absolute -top-1 -right-1 rtl:-left-1 rtl:-right-auto h-4 w-4 min-w-4 p-0 flex items-center justify-center text-[10px] rounded-full animate-pulse">
                   {cartItemCount}
                 </Badge>
               )}
               <span className="sr-only">سبد خرید</span>
            </Button>
             <Button variant="ghost" size="icon" className="relative transition-transform hover:scale-110 duration-300 text-muted-foreground hover:text-primary h-9 w-9">
              <Heart className="h-5 w-5" />
               {/* Example badge for wishlist
               <Badge variant="destructive" className="absolute -top-1 -right-1 rtl:-left-1 rtl:-right-auto h-4 w-4 min-w-4 p-0 flex items-center justify-center text-[10px] rounded-full">1</Badge> 
               */}
               <span className="sr-only">علاقه‌مندی‌ها</span>
            </Button>
          </div>
        </div>
      </div>

       <nav className="border-t border-border/60 bg-background hidden lg:block">
         <div className="container mx-auto px-4 h-12 flex items-center justify-between"> {/* Added justify-between */}
            <NavigationMenu dir="rtl" className="justify-start"> {/* Removed w-full */}
              <NavigationMenuList className="gap-0.5">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={cn(navigationMenuTriggerStyle(), "h-10 text-sm bg-transparent shadow-none border-none hover:bg-accent/10 text-foreground hover:text-primary px-3 py-2")}>
                     <ShoppingBag className="ml-1.5 rtl:mr-1.5 h-4 w-4 text-muted-foreground group-hover:text-primary"/> خرید گروهی
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                     <ul className="grid gap-3 p-4 md:w-[500px] lg:w-[600px] grid-cols-2 lg:grid-cols-3">
                        {groupShoppingCategories.map((item) => (
                           <ListItem key={item.title} title={item.title} href={item.href} icon={item.icon}>
                             {item.description}
                           </ListItem>
                         ))}
                      </ul>
                   </NavigationMenuContent>
                </NavigationMenuItem>

                 {mainNavLinks.map(link => (
                    <NavigationMenuItem key={link.href}>
                        <Link href={link.href} legacyBehavior passHref>
                          <NavigationMenuLink className={cn(
                            navigationMenuTriggerStyle(),
                            "h-10 text-sm bg-transparent shadow-none border-none hover:bg-accent/10 text-foreground hover:text-primary px-3 py-2 font-normal flex items-center gap-1.5",
                            link.isCTA && "text-accent-foreground bg-accent hover:bg-accent/90 hover:text-accent-foreground font-semibold",
                            link.special && "text-destructive hover:text-destructive"
                            )}
                          >
                             {link.icon && <link.icon className={cn("h-4 w-4", link.isCTA ? "text-accent-foreground" : "text-muted-foreground group-hover:text-primary", link.special && "text-destructive")}/>}
                             {link.ctaText || link.title}
                             {link.special && <Flame className="w-0 h-0 sm:w-4 sm:h-4 text-destructive animate-pulse inline-block ml-1"/>}
                             {/* Chevron removed for simple links, kept for trigger */}
                             {/* {!link.icon && !link.special && !link.isCTA && <ChevronDown className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180 rtl:mr-1 rtl:ml-0 group-hover:opacity-0 invisible"/>} */}
                          </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                 ))}
              </NavigationMenuList>
            </NavigationMenu>
             <Link href="/seller/register" passHref>
              <Button variant="outline" size="sm" className="text-xs h-9 border-primary/50 text-primary hover:bg-primary/10 hover:border-primary">
                <StoreIcon className="ml-1.5 rtl:mr-1.5 h-4 w-4" />
                فروشنده شو!
              </Button>
            </Link>
         </div>
       </nav>
    </header>
  );
};

export default Header;
