'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, ShoppingCart, Users, Clock, ChevronLeft, ChevronRight, Bell, Heart, Truck, Star, Tag, Check, Gift, Percent, ShieldCheck, Package, Globe, Building, Store, Target, Handshake } from 'lucide-react'; // Import necessary icons
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Image from 'next/image';
import Link from 'next/link'; // Import Link
import Header from '@/components/header'; // Import Header component
import Footer from '@/components/footer'; // Import Footer component
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel"; // Import Carousel and types
import Autoplay from "embla-carousel-autoplay"; // Import Autoplay plugin
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Import Avatar
import CountdownTimer from '@/components/countdown-timer'; // Import CountdownTimer
import { cn } from '@/lib/utils'; // Import cn for conditional classnames

// Helper function to create future dates for consistent testing
const getFutureDate = (days: number, hours: number = 0, minutes: number = 0): Date => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    date.setHours(date.getHours() + hours);
    date.setMinutes(date.getMinutes() + minutes);
    return date;
};

// Define hero slides data
const heroSlides = [
    { id: 1, image: 'https://picsum.photos/seed/hero1navy/1200/400', alt: 'اسلاید اول', title: 'با هم بخرید و تخفیف بگیرید!', description: 'هرچه تعداد بیشتر، قیمت کمتر!', link: '#', aiHint: 'group shopping people illustration' },
    { id: 2, image: 'https://picsum.photos/seed/hero2navy/1200/400', alt: 'اسلاید دوم', title: 'جشنواره کالاهای ایرانی', description: 'تخفیف‌های ویژه برای حمایت از تولید ملی', link: '#', aiHint: 'iranian products promotion sale' },
    { id: 3, image: 'https://picsum.photos/seed/hero3navy/1200/400', alt: 'اسلاید سوم', title: 'لوازم دیجیتال با بهترین قیمت', description: 'جدیدترین گوشی‌ها و لپ‌تاپ‌ها با خرید گروهی', link: '#', aiHint: 'digital gadgets sale offer' },
];


// تعریف داده‌های نمونه برای خریدهای گروهی - Updated with endDate
const groupPurchases = [
  {
    id: 1,
    title: 'گوشی سامسونگ Galaxy S24',
    image: 'https://picsum.photos/seed/1navy/300/200',
    originalPrice: 45000000,
    groupPrice: 39500000,
    discount: 12,
    members: 18,
    requiredMembers: 25,
    endDate: getFutureDate(2, 6), // Ends in 2 days, 6 hours
    category: 'digital',
    isFeatured: true,
    aiHint: 'smartphone samsung galaxy',
    variations: [
        { type: 'رنگ', options: ['مشکی', 'نقره‌ای', 'بنفش', 'کرم'] },
        { type: 'حافظه', options: ['256GB', '512GB'] },
    ],
    recentMembers: [
      { name: 'AR', avatar: 'https://picsum.photos/seed/user10navy/40/40' },
      { name: 'ZM', avatar: 'https://picsum.photos/seed/user11navy/40/40' },
      { name: 'HN', avatar: 'https://picsum.photos/seed/user12navy/40/40' },
      { name: 'FK', avatar: 'https://picsum.photos/seed/user13navy/40/40' },
      { name: 'MJ', avatar: 'https://picsum.photos/seed/user14navy/40/40' },
    ],
  },
  {
    id: 2,
    title: 'روغن آفتابگردان لادن ۱ لیتری (بسته ۳ عددی)',
    image: 'https://picsum.photos/seed/2navy/300/200',
    originalPrice: 580000,
    groupPrice: 435000,
    discount: 25,
    members: 42,
    requiredMembers: 50,
    endDate: getFutureDate(0, 12, 30), // Ends in 12 hours, 30 minutes
    category: 'food',
    isIranian: true,
    aiHint: 'sunflower oil bottle',
    isPackage: true,
    packageContents: [
      { name: 'روغن آفتابگردان لادن', quantity: '۱ لیتر' },
      { name: 'روغن آفتابگردان لادن', quantity: '۱ لیتر' },
      { name: 'روغن آفتابگردان لادن', quantity: '۱ لیتر' },
    ],
    recentMembers: [
      { name: 'SA', avatar: 'https://picsum.photos/seed/user20navy/40/40' },
      { name: 'BN', avatar: 'https://picsum.photos/seed/user21navy/40/40' },
    ],
  },
  {
    id: 3,
    title: 'ماشین لباسشویی اسنوا ۸ کیلویی',
    image: 'https://picsum.photos/seed/3navy/300/200',
    originalPrice: 28500000,
    groupPrice: 24225000,
    discount: 15,
    members: 8,
    requiredMembers: 15,
    endDate: getFutureDate(3), // Ends in 3 days
    category: 'home-appliances',
    isIranian: true,
    aiHint: 'washing machine snowa',
    variations: [
        { type: 'رنگ', options: ['سفید', 'نقره‌ای'] },
    ],
    recentMembers: [
      { name: 'GH', avatar: 'https://picsum.photos/seed/user30navy/40/40' },
      { name: 'KP', avatar: 'https://picsum.photos/seed/user31navy/40/40' },
      { name: 'LM', avatar: 'https://picsum.photos/seed/user32navy/40/40' },
    ],
  },
  {
    id: 4,
    title: 'بسته گوشت گوسفندی تازه ۲ کیلویی',
    image: 'https://picsum.photos/seed/4navy/300/200',
    originalPrice: 1200000,
    groupPrice: 984000,
    discount: 18,
    members: 34,
    requiredMembers: 40,
    endDate: getFutureDate(1), // Ends in 1 day
    category: 'food',
    aiHint: 'lamb meat package',
    isPackage: true,
    packageContents: [
      { name: 'گوشت ران گوسفندی', quantity: '۱ کیلوگرم' },
      { name: 'گوشت سردست گوسفندی', quantity: '۱ کیلوگرم' },
    ],
     recentMembers: [
      { name: 'ER', avatar: 'https://picsum.photos/seed/user40navy/40/40' },
      { name: 'TY', avatar: 'https://picsum.photos/seed/user41navy/40/40' },
      { name: 'UI', avatar: 'https://picsum.photos/seed/user42navy/40/40' },
      { name: 'OP', avatar: 'https://picsum.photos/seed/user43navy/40/40' },
    ],
  },
    {
    id: 9,
    title: 'گوشی شیائومی Poco X6 Pro',
    image: 'https://picsum.photos/seed/9navy/300/200',
    originalPrice: 15500000,
    groupPrice: 13800000,
    discount: 11,
    members: 7,
    requiredMembers: 20,
    endDate: getFutureDate(5), // Ends in 5 days
    category: 'digital',
    aiHint: 'smartphone xiaomi poco',
     recentMembers: [
      { name: 'CV', avatar: 'https://picsum.photos/seed/user90navy/40/40' },
      { name: 'BN', avatar: 'https://picsum.photos/seed/user91navy/40/40' },
    ],
  },
  {
    id: 5,
    title: 'زعفران درجه یک قائنات ۵ مثقالی',
    image: 'https://picsum.photos/seed/5navy/300/200',
    originalPrice: 1850000,
    groupPrice: 1480000,
    discount: 20,
    members: 28,
    requiredMembers: 35,
    endDate: getFutureDate(4), // Ends in 4 days
    category: 'food',
    isIranian: true,
    isFeatured: true,
    aiHint: 'saffron spice box',
    recentMembers: [
        { name: 'AS', avatar: 'https://picsum.photos/seed/user50navy/40/40' },
        { name: 'DF', avatar: 'https://picsum.photos/seed/user51navy/40/40' },
        { name: 'GH', avatar: 'https://picsum.photos/seed/user52navy/40/40' },
    ],
  },
  {
    id: 6,
    title: 'تلویزیون ال‌جی ۵۵ اینچ ۴K',
    image: 'https://picsum.photos/seed/6navy/300/200',
    originalPrice: 38500000,
    groupPrice: 32725000,
    discount: 15,
    members: 12,
    requiredMembers: 20,
    endDate: getFutureDate(2), // Ends in 2 days
    category: 'digital',
    aiHint: 'smart tv lg living room',
    recentMembers: [
        { name: 'ZX', avatar: 'https://picsum.photos/seed/user60navy/40/40' },
        { name: 'CV', avatar: 'https://picsum.photos/seed/user61navy/40/40' },
    ],
  },
  {
    id: 7,
    title: 'فرش دستباف کاشان ۹ متری',
    image: 'https://picsum.photos/seed/7navy/300/200',
    originalPrice: 18500000,
    groupPrice: 14800000,
    discount: 20,
    members: 5,
    requiredMembers: 10,
    endDate: getFutureDate(5), // Ends in 5 days
    category: 'home-decor',
    isIranian: true,
    isFeatured: true,
    aiHint: 'persian carpet detail',
    recentMembers: [
        { name: 'QW', avatar: 'https://picsum.photos/seed/user70navy/40/40' },
    ],
  },
  {
    id: 8,
    title: 'گز اصفهان درجه یک (جعبه ۱ کیلویی)',
    image: 'https://picsum.photos/seed/8navy/300/200',
    originalPrice: 950000,
    groupPrice: 760000,
    discount: 20,
    members: 45,
    requiredMembers: 50,
    endDate: getFutureDate(0, 23, 59), // Ends in just under 1 day
    category: 'food',
    isIranian: true,
    aiHint: 'gaz candy box',
     recentMembers: [
      { name: 'PL', avatar: 'https://picsum.photos/seed/user80navy/40/40' },
      { name: 'OK', avatar: 'https://picsum.photos/seed/user81navy/40/40' },
      { name: 'IJ', avatar: 'https://picsum.photos/seed/user82navy/40/40' },
      { name: 'UH', avatar: 'https://picsum.photos/seed/user83navy/40/40' },
    ],
  }
];
// Export for use in product detail page and other potential pages
export { groupPurchases };

// تعریف دسته‌بندی‌های محصولات - Added image property
const categories = [
  { id: 1, name: 'دیجیتال', icon: '📱', slug: 'digital', image: 'https://picsum.photos/seed/cat1navy/80/80', aiHint: 'mobile phone category' },
  { id: 2, name: 'مواد غذایی', icon: '🍎', slug: 'food', image: 'https://picsum.photos/seed/cat2navy/80/80', aiHint: 'grocery food category' },
  { id: 3, name: 'لوازم خانگی', icon: '🏠', slug: 'home-appliances', image: 'https://picsum.photos/seed/cat3navy/80/80', aiHint: 'home appliance category' },
  { id: 4, name: 'پوشاک', icon: '👕', slug: 'fashion', image: 'https://picsum.photos/seed/cat4navy/80/80', aiHint: 'fashion clothing category' },
  { id: 5, name: 'زیبایی و سلامت', icon: '💄', slug: 'beauty-health', image: 'https://picsum.photos/seed/cat5navy/80/80', aiHint: 'beauty health cosmetic' },
  { id: 6, name: 'خانه و دکور', icon: '🛋️', slug: 'home-decor', image: 'https://picsum.photos/seed/cat6navy/80/80', aiHint: 'home decor furniture' },
  { id: 7, name: 'ابزار و تجهیزات', icon: '🛠️', slug: 'tools', image: 'https://picsum.photos/seed/cat7navy/80/80', aiHint: 'tools hardware category' },
  { id: 8, name: 'سایر', icon: '📦', slug: 'other', image: 'https://picsum.photos/seed/cat8navy/80/80', aiHint: 'miscellaneous package box' }
];

// تخفیف‌های شگفت‌انگیز
const specialOffers = [
  {
    id: 1,
    title: 'جشنواره نوروزی - تخفیف تا ۴۰٪',
    description: 'خرید گروهی محصولات نوروزی با تخفیف فوق‌العاده، فقط تا پایان اسفند',
    image: 'https://picsum.photos/seed/offer1navy/600/250',
    bgColorClass: 'bg-primary', // Use theme color class
    textColorClass: 'text-primary-foreground',
    aiHint: 'new year sale offer',
  },
  {
    id: 2,
    title: 'محصولات ایرانی - حمایت از تولید ملی',
    description: 'خرید گروهی کالاهای ایرانی با کیفیت و قیمت مناسب',
    image: 'https://picsum.photos/seed/offer2navy/600/250',
    bgColorClass: 'bg-accent', // Use theme color class
    textColorClass: 'text-accent-foreground',
    aiHint: 'iranian product support',
  },
  {
    id: 3,
    title: 'صنایع دستی اصیل ایرانی',
    description: 'مجموعه‌ای از بهترین صنایع دستی استان‌های مختلف ایران',
    image: 'https://picsum.photos/seed/offer3navy/600/250',
    bgColorClass: 'bg-secondary', // Use theme color class
    textColorClass: 'text-secondary-foreground',
    aiHint: 'iranian handicraft art',
  }
];

// داده‌های نمونه برای فروشندگان عمده (کارت‌های کوچک‌تر)
const wholesalers = [
  {
    id: 1,
    name: "شرکت پخش بهاران",
    logo: "https://picsum.photos/seed/wholesaler1navy/100/100",
    aiHint: "food distribution company logo",
    productHints: ['food', 'drink', 'snack'], // Keywords for tiny product images
  },
  {
    id: 2,
    name: "لوازم خانگی مدرن",
    logo: "https://picsum.photos/seed/wholesaler2navy/100/100",
    aiHint: "home appliance store logo",
    productHints: ['tv', 'fridge', 'washing machine'],
  },
  {
    id: 3,
    name: "پوشاک ایرانیان",
    logo: "https://picsum.photos/seed/wholesaler3navy/100/100",
    aiHint: "clothing manufacturer logo",
    productHints: ['shirt', 'trousers', 'dress'],
  },
  {
    id: 4,
    name: "دیجیتال پارس",
    logo: "https://picsum.photos/seed/wholesaler4navy/100/100",
    aiHint: "digital electronics company logo",
    productHints: ['phone', 'laptop', 'headphone'],
  },
    {
    id: 5,
    name: "ابزار یراق مرکزی",
    logo: "https://picsum.photos/seed/wholesaler5navy/100/100",
    aiHint: "hardware tools supplier logo",
    productHints: ['drill', 'hammer', 'screwdriver'],
  },
    {
    id: 6,
    name: "دکوراسیون داخلی زیبا",
    logo: "https://picsum.photos/seed/wholesaler6navy/100/100",
    aiHint: "interior decoration shop logo",
    productHints: ['lamp', 'vase', 'painting'],
  },
];


// داده‌های نمونه برای فروشگاه‌ها و محصولاتشان (برای اسلایدر)
// IMPORTANT: Ensure product IDs here are unique and don't clash with groupPurchases IDs
const stores = [
  {
    id: 101, // Store ID
    name: "فروشگاه بزرگ شهر",
    logo: "https://picsum.photos/seed/store1navy/100/100",
    aiHint: "city mega store logo",
    offersInstallments: true, // آیا قسطی می‌فروشد؟
    products: [
      { ...groupPurchases[1], id: 201, endDate: getFutureDate(1, 12) }, // Create NEW unique IDs and dates
      { ...groupPurchases[3], id: 202, endDate: getFutureDate(2) },
      { ...groupPurchases[7], id: 203, endDate: getFutureDate(4, 5) },
      { ...groupPurchases[4], id: 204, endDate: getFutureDate(0, 10) },
    ],
  },
  {
    id: 102, // Store ID
    name: "هایپر مارکت آفتاب",
    logo: "https://picsum.photos/seed/store2navy/100/100",
    aiHint: "sun hypermarket logo",
    offersInstallments: false,
    products: [
      { ...groupPurchases[0], id: 301, endDate: getFutureDate(0, 2) },
      { ...groupPurchases[5], id: 302, endDate: getFutureDate(3) },
      { ...groupPurchases[8], id: 303, endDate: getFutureDate(1, 1) },
    ],
  },
  {
    id: 103, // Store ID
    name: "خانه و زندگی لوکس",
    logo: "https://picsum.photos/seed/store3navy/100/100",
    aiHint: "luxury home living logo",
    offersInstallments: true,
    products: [
      { ...groupPurchases[2], id: 401, endDate: getFutureDate(2, 18) },
      { ...groupPurchases[6], id: 402, endDate: getFutureDate(1) },
      { ...groupPurchases[4], id: 403, endDate: getFutureDate(0, 5) }, // Note: Use unique IDs
      { ...groupPurchases[7], id: 404, endDate: getFutureDate(4) },
    ],
  },
];
export { stores }; // Export stores data


// تبدیل اعداد به فرمت فارسی با جداکننده هزارگان
const formatNumber = (num:number | undefined) => {
  if (num === undefined || num === null) return '';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Check if the deal ends within 24 hours
const isEndingSoon = (endDate: Date | undefined): boolean => {
    if (!endDate) return false;
    const now = new Date();
    const timeDiff = endDate.getTime() - now.getTime();
    const hoursRemaining = timeDiff / (1000 * 60 * 60);
    return hoursRemaining > 0 && hoursRemaining <= 24;
};


export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('همه');
  const [featuredItems, setFeaturedItems] = useState(groupPurchases);
  const { toast } = useToast(); // Initialize useToast
  const [heroApi, setHeroApi] = useState<CarouselApi>(); // State for hero carousel API
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0); // State for current hero slide index
  const autoplayPlugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true })); // Autoplay plugin ref


  const handleJoinClick = (title: string) => {
    console.log(`User wants to join the group buy for: ${title}`);
    toast({
      title: "عضویت موفق!",
      description: `شما با موفقیت به گروه خرید ${title} پیوستید.`,
      variant: "default",
    });
  };

  useEffect(() => {
    setFeaturedItems(groupPurchases);
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  // Update current slide index when hero carousel changes
  useEffect(() => {
    if (!heroApi) return;
    setCurrentHeroSlide(heroApi.selectedScrollSnap());
    heroApi.on("select", () => setCurrentHeroSlide(heroApi.selectedScrollSnap()));
    heroApi.on("reInit", () => setCurrentHeroSlide(heroApi.selectedScrollSnap()));
  }, [heroApi]);


  const filteredItems = activeCategory === 'همه'
    ? featuredItems
    : featuredItems.filter(item => item.category === categories.find(cat => cat.name === activeCategory)?.slug);


  const getCategoryNameBySlug = (slug: string | undefined) => {
    return categories.find(cat => cat.slug === slug)?.name || slug;
  }

  return (
    <div dir="rtl" className="font-['Vazirmatn'] bg-background min-h-screen text-foreground">
      <Header /> {/* Use Header component */}

      {/* Hero Slider */}
      <section className="relative w-full mb-12">
        <Carousel
          setApi={setHeroApi}
          plugins={[autoplayPlugin.current]}
          opts={{ loop: true, direction: 'rtl' }}
          className="w-full"
          onMouseEnter={autoplayPlugin.current.stop}
          onMouseLeave={autoplayPlugin.current.reset}
        >
          <CarouselContent>
            {heroSlides.map((slide) => (
              <CarouselItem key={slide.id}>
                <div className="relative w-full h-[300px] md:h-[400px]">
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    layout="fill"
                    objectFit="cover"
                    className="brightness-75"
                    data-ai-hint={slide.aiHint}
                    priority={slide.id === 1} // Prioritize first slide image
                  />
                  <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white bg-gradient-to-t from-black/60 to-transparent p-8">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg animate-fade-in">{slide.title}</h1>
                    <p className="text-lg md:text-xl mb-8 drop-shadow-md animate-fade-in animation-delay-200">{slide.description}</p>
                    <Link href={slide.link}>
                      <Button size="lg" variant="default" className="transition-transform hover:scale-105 duration-300 shadow-md animate-fade-in animation-delay-400">
                        مشاهده بیشتر
                      </Button>
                    </Link>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-background/60 hover:bg-background text-foreground border-none rounded-full w-10 h-10 shadow-md transition-opacity opacity-70 hover:opacity-100 disabled:opacity-30" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-background/60 hover:bg-background text-foreground border-none rounded-full w-10 h-10 shadow-md transition-opacity opacity-70 hover:opacity-100 disabled:opacity-30" />

         {/* Pagination Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex space-x-2 rtl:space-x-reverse">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => heroApi?.scrollTo(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index === currentHeroSlide ? "w-4 bg-primary" : "bg-white/50 hover:bg-white/80"
                )}
                aria-label={`برو به اسلاید ${index + 1}`}
              />
            ))}
          </div>
        </Carousel>
      </section>

       {/* دسته‌بندی‌ها (Style like Instagram Stories) */}
       <section className="container mx-auto px-4 py-8">
         <h2 className="text-2xl font-bold mb-6 text-center text-foreground">دسته‌بندی‌ها</h2>
         <div className="flex justify-center space-x-6 rtl:space-x-reverse overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-muted scrollbar-track-secondary -mx-4 px-4">
           {categories.map(category => (
             <Link href={`/category/${category.slug}`} key={category.id} className="flex flex-col items-center text-center group flex-shrink-0 w-20">
               <div className="relative w-16 h-16 mb-2">
                 <div className="absolute inset-0 rounded-full border-2 border-primary group-hover:border-accent transition-colors duration-300 p-0.5">
                   <Image
                     src={category.image}
                     width={60}
                     height={60}
                     alt={category.name}
                     className="rounded-full object-cover w-full h-full"
                     data-ai-hint={category.aiHint || category.name}
                   />
                 </div>
                 {/* Optional: Add story ring effect if needed */}
                 {/* <div className="absolute -inset-1 rounded-full border-2 border-transparent group-hover:border-accent transition-all duration-300"></div> */}
               </div>
               <span className="text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors duration-300">{category.name}</span>
             </Link>
           ))}
         </div>
       </section>

       {/* خریدهای گروهی فعال (Moved Higher) */}
        <section className="bg-background py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-foreground mb-4 sm:mb-0">خریدهای گروهی فعال</h2>
            <div className="flex">
               <Button variant="ghost" size="icon" className="mr-2 rtl:ml-2 transition-transform hover:scale-110 duration-300">
                <ChevronRight className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="transition-transform hover:scale-110 duration-300">
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="flex space-x-4 rtl:space-x-reverse mb-10 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-muted scrollbar-track-secondary -mx-4 px-4"> {/* Negative margin trick for full-width scroll */}
            <Button
              variant={activeCategory === 'همه' ? 'default' : 'outline'}
              onClick={() => setActiveCategory('همه')}
              className="whitespace-nowrap transition-transform hover:scale-105 duration-300 shadow-sm flex-shrink-0"
            >
              همه
            </Button>
            {categories.map(category => (
              <Button
                key={category.id}
                variant={activeCategory === category.name ? 'default' : 'outline'}
                onClick={() => setActiveCategory(category.name)}
                className="whitespace-nowrap transition-transform hover:scale-105 duration-300 shadow-sm flex-shrink-0"
              >
                {category.name}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6"> {/* Changed grid-cols-3 */}
            {filteredItems.slice(0, 6).map(item => ( // Slice 6 items for 2 rows of 3
              <Link href={`/product/${item.id}`} key={item.id}>
                <Card className="bg-card rounded-lg shadow-md overflow-hidden border border-border hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer h-full flex flex-col">
                   <CardHeader className="p-0 relative aspect-[4/3]">
                    <Image src={item.image} width={300} height={225} alt={item.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint={item.aiHint} />
                    <Badge variant="destructive" className="absolute top-3 right-3">
                      {item.discount}٪ تخفیف
                    </Badge>
                     <Badge variant="outline" className="absolute top-3 left-3 bg-background/80">
                      {getCategoryNameBySlug(item.category)}
                    </Badge>
                    {item.isIranian && (
                       <Badge variant="secondary" className="absolute top-11 right-3 flex items-center bg-background/80">
                        <Image src="https://picsum.photos/seed/iranflagnavy/20/20" width={20} height={20} alt="پرچم ایران" className="w-3 h-3 rounded-full ml-1 rtl:mr-1" data-ai-hint="iran flag" />
                        تولید ایران
                      </Badge>
                    )}
                    {item.isFeatured && (
                      <Badge variant="accent" className="absolute bottom-3 right-3 flex items-center shadow-md">
                        <Star className="w-3 h-3 ml-1 rtl:mr-1 fill-current" />
                        پیشنهاد ویژه
                      </Badge>
                    )}
                     <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-end">
                         <Button size="sm" variant="default" className="h-8 px-3 text-xs">افزودن به سبد</Button>
                     </div>
                   </CardHeader>
                  <CardContent className="p-4 flex-grow flex flex-col">
                    <h3 className="font-semibold text-card-foreground mb-2 text-base h-14 overflow-hidden flex-grow">{item.title}</h3>
                    <div className="flex justify-between items-baseline mb-3">
                      <div className="text-muted-foreground line-through text-sm">{formatNumber(item.originalPrice)} <span className="text-xs">تومان</span></div>
                      <div className="text-primary font-bold text-xl">{formatNumber(item.groupPrice)} <span className="text-xs">تومان</span></div>
                    </div>
                     {item.isPackage && item.packageContents && (
                      <div className="my-3 border-t border-border pt-3">
                        <p className="text-xs font-semibold mb-1 text-muted-foreground">محتویات بسته:</p>
                        <ul className="list-disc list-inside text-xs text-muted-foreground space-y-0.5 pr-4">
                          {item.packageContents.map((content, index) => (
                            <li key={index}>
                              {content.name} ({content.quantity})
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="mt-4 space-y-2 flex-grow">
                      <div className="flex justify-between text-sm text-muted-foreground mb-1">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 ml-1 rtl:mr-1" />
                          <span>{item.members} / {item.requiredMembers} نفر</span>
                        </div>
                         {item.endDate && isEndingSoon(item.endDate) ? (
                            <CountdownTimer endDate={item.endDate} />
                        ) : item.endDate ? (
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 ml-1 rtl:mr-1" />
                               <span>{`بیش از ${Math.ceil((item.endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} روز`}</span>
                            </div>
                        ) : null}
                      </div>

                      <Progress value={item.requiredMembers > 0 ? (item.members / item.requiredMembers) * 100 : 0} className="h-2" />
                    </div>
                   </CardContent>
                   <CardFooter className="p-4 pt-0 mt-auto">
                        <Button onClick={(e) => { e.preventDefault(); handleJoinClick(item.title); }} variant="default" className="w-full flex items-center justify-center transition-transform hover:scale-105 duration-300">
                          <ShoppingCart className="h-4 w-4 ml-2 rtl:mr-2" />
                          پیوستن به گروه
                        </Button>
                   </CardFooter>
                </Card>
              </Link>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <Button variant="outline" size="lg" className="transition-transform hover:scale-105 duration-300">
              مشاهده همه خریدهای گروهی
            </Button>
          </div>
        </div>
      </section>


      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">نحوه عملکرد خرید گروهی</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center bg-card p-6 rounded-xl shadow-lg border border-border transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4 shadow-inner">
                <Search className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-card-foreground">۱. کالا را پیدا کنید</h3>
            <p className="text-muted-foreground text-sm">کالای مورد نظر خود را از بین خریدهای گروهی فعال پیدا کنید یا درخواست جدید ثبت کنید.</p>
          </div>
          <div className="flex flex-col items-center text-center bg-card p-6 rounded-xl shadow-lg border border-border transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
             <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4 shadow-inner">
                <Users className="h-10 w-10 text-primary" />
             </div>
            <h3 className="text-xl font-semibold mb-2 text-card-foreground">۲. به گروه بپیوندید</h3>
            <p className="text-muted-foreground text-sm">به گروه خرید کالا بپیوندید و دوستان خود را برای رسیدن به حد نصاب دعوت کنید.</p>
          </div>
          <div className="flex flex-col items-center text-center bg-card p-6 rounded-xl shadow-lg border border-border transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
             <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4 shadow-inner">
                 <Target className="h-10 w-10 text-primary" />
             </div>
            <h3 className="text-xl font-semibold mb-2 text-card-foreground">۳. خرید نهایی و تحویل</h3>
            <p className="text-muted-foreground text-sm">پس از رسیدن به حد نصاب، خرید نهایی شده و کالا با تخفیف ویژه برای شما ارسال می‌شود.</p>
          </div>
        </div>
      </section>


      {/* تخفیف‌های شگفت‌انگیز */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-10 text-center">تخفیف‌های شگفت‌انگیز</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8"> {/* Changed grid-cols-3 */}
          {specialOffers.map(offer => (
            <div key={offer.id} className={`rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group ${offer.bgColorClass} ${offer.textColorClass}`}>
              <div className="relative h-48">
                <Image src={offer.image} layout="fill" objectFit="cover" alt={offer.title} className="transition-transform duration-500 group-hover:scale-110" data-ai-hint={offer.aiHint} />
                <div className="absolute inset-0 flex flex-col justify-end items-start p-6 bg-gradient-to-t from-black/70 to-transparent">
                  <h3 className="font-bold text-xl mb-2">{offer.title}</h3>
                  <p className="text-sm mb-4 line-clamp-2">{offer.description}</p>
                  <Button variant="outline" className="mt-auto border-current text-current hover:bg-background hover:text-foreground transition-transform hover:scale-105 duration-300">
                    مشاهده جزئیات
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


     {/* درخواست‌های خرید گروهی */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-secondary-foreground mb-4 sm:mb-0">درخواست‌های خرید گروهی</h2>
            <Button variant="default" className="transition-transform hover:scale-105 duration-300 shadow-md">
                ایجاد درخواست جدید
             </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6"> {/* Changed grid-cols-3 */}
            {groupPurchases.slice(4, 7).map(item => ( // Slice 3 items
              <Link href={`/product/${item.id}`} key={item.id}>
                <Card className="bg-card rounded-lg shadow-md overflow-hidden border border-border hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer h-full flex flex-col">
                  <CardHeader className="p-0 relative aspect-[4/3]">
                     <Image src={item.image} width={300} height={225} alt={item.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint={item.aiHint} />
                    <Badge variant="destructive" className="absolute top-3 right-3">
                      {item.discount}٪ تخفیف
                    </Badge>
                     <Badge variant="outline" className="absolute top-3 left-3 bg-background/80">
                      {getCategoryNameBySlug(item.category)}
                    </Badge>
                    {item.isIranian && (
                      <Badge variant="secondary" className="absolute top-11 right-3 flex items-center bg-background/80">
                        <Image src="https://picsum.photos/seed/iranflagnavy/20/20" width={20} height={20} alt="پرچم ایران" className="w-3 h-3 rounded-full ml-1 rtl:mr-1" data-ai-hint="iran flag" />
                        تولید ایران
                      </Badge>
                    )}
                    {item.isFeatured && (
                      <Badge variant="accent" className="absolute bottom-3 right-3 flex items-center shadow-md">
                        <Star className="w-3 h-3 ml-1 rtl:mr-1 fill-current" />
                        پیشنهاد ویژه
                      </Badge>
                    )}
                    <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-end">
                        <Button size="sm" variant="default" className="h-8 px-3 text-xs">افزودن به سبد</Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 flex-grow flex flex-col">
                    <h3 className="font-semibold text-card-foreground mb-2 text-base h-14 overflow-hidden flex-grow">{item.title}</h3>
                    <div className="flex justify-between items-baseline mb-3">
                      <div className="text-muted-foreground line-through text-sm">{formatNumber(item.originalPrice)} <span className="text-xs">تومان</span></div>
                      <div className="text-primary font-bold text-xl">{formatNumber(item.groupPrice)} <span className="text-xs">تومان</span></div>
                    </div>
                     {/* Package Contents Display */}
                    {item.isPackage && item.packageContents && (
                      <div className="my-3 border-t border-border pt-3">
                        <p className="text-xs font-semibold mb-1 text-muted-foreground">محتویات بسته:</p>
                        <ul className="list-disc list-inside text-xs text-muted-foreground space-y-0.5 pr-4">
                          {item.packageContents.map((content, index) => (
                            <li key={index}>
                              {content.name} ({content.quantity})
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="mt-4 space-y-2 flex-grow">
                      <div className="flex justify-between text-sm text-muted-foreground mb-1">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 ml-1 rtl:mr-1" />
                          <span>{item.members} / {item.requiredMembers} نفر</span>
                        </div>
                        {/* Display Countdown or Remaining Time */}
                        {item.endDate && isEndingSoon(item.endDate) ? (
                            <CountdownTimer endDate={item.endDate} />
                        ) : item.endDate ? (
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 ml-1 rtl:mr-1" />
                              <span>{`بیش از ${Math.ceil((item.endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} روز`}</span>
                            </div>
                        ) : null}
                      </div>

                      <Progress value={(item.members / item.requiredMembers) * 100} className="h-2" />
                    </div>
                   </CardContent>
                   <CardFooter className="p-4 pt-0 mt-auto">
                        <Button onClick={(e) => { e.preventDefault(); handleJoinClick(item.title); }} variant="default" className="w-full flex items-center justify-center transition-transform hover:scale-105 duration-300">
                          <ShoppingCart className="h-4 w-4 ml-2 rtl:mr-2" />
                          پیوستن به گروه
                        </Button>
                   </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
          <div className="flex justify-center mt-12">
            <Button variant="outline" size="lg" className="transition-transform hover:scale-105 duration-300">
              مشاهده همه درخواست‌ها
            </Button>
          </div>
        </div>
      </section>

      {/* نمایش فروشگاه‌ها و محصولاتشان */}
       <section className="bg-background py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">ویترین فروشگاه‌ها</h2>
          <div className="space-y-16">
            {stores.map((store) => (
              <Card key={store.id} className="bg-card border border-border shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
                <CardHeader className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-secondary/50 border-b border-border">
                  <Avatar className="w-20 h-20 border-4 border-background shadow-lg">
                    <AvatarImage src={store.logo} alt={`لوگوی ${store.name}`} data-ai-hint={store.aiHint} />
                    <AvatarFallback className="text-2xl">{store.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="text-center sm:text-right flex-grow">
                    <CardTitle className="text-2xl font-bold text-card-foreground mb-1">{store.name}</CardTitle>
                    {store.offersInstallments && (
                      <Badge variant="default" className="bg-green-600 hover:bg-green-700 text-white">
                        فروش اقساطی
                      </Badge>
                    )}
                  </div>
                  <Button variant="outline" size="lg" className="transition-transform hover:scale-105 duration-300 mt-4 sm:mt-0 shadow-sm">
                    مشاهده فروشگاه
                    <Store className="mr-2 h-5 w-5" />
                  </Button>
                </CardHeader>
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold mb-6 text-muted-foreground">محصولات منتخب برای خرید گروهی:</h4>
                  <Carousel
                    opts={{
                      align: "start",
                      direction: "rtl",
                      loop: store.products.length > 3, // Enable loop if enough items for 3 columns
                    }}
                    className="w-full relative"
                  >
                    <CarouselContent className="-ml-4 rtl:-mr-4">
                      {store.products.map((product) => (
                        <CarouselItem key={product.id} className="basis-full md:basis-1/3 pl-4 rtl:pr-4 mb-1"> {/* Changed basis-1/3 */}
                          <Link href={`/product/${product.id}`} className="block h-full">
                            <Card className="overflow-hidden h-full flex flex-col border group transition-all duration-300 hover:border-primary hover:shadow-lg cursor-pointer bg-background/50">
                              <CardHeader className="p-0 relative aspect-[4/3]">
                                <Image src={product.image} width={300} height={225} alt={product.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint={product.aiHint}/>
                                <Badge variant="destructive" className="absolute top-2 right-2">
                                  {product.discount}٪ تخفیف
                                </Badge>
                                {product.isFeatured && (
                                  <Badge variant="accent" className="absolute bottom-2 right-2 flex items-center shadow-md text-xs px-1.5 py-0.5">
                                    <Star className="w-2.5 h-2.5 ml-1 rtl:mr-1 fill-current" />
                                    ویژه
                                  </Badge>
                                )}
                                <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-end">
                                    <Button size="sm" variant="default" className="h-7 px-2 text-xs">افزودن</Button>
                                </div>
                              </CardHeader>
                              <CardContent className="p-3 flex-grow flex flex-col">
                                <h5 className="font-semibold text-sm mb-1 h-10 overflow-hidden flex-grow text-card-foreground">{product.title}</h5>
                                <div className="flex justify-between items-baseline text-xs mb-2 mt-1">
                                  <span className="text-muted-foreground line-through">{formatNumber(product.originalPrice)}</span>
                                  <span className="text-primary font-bold">{formatNumber(product.groupPrice)} <span className="text-xs">تومان</span></span>
                                </div>
                                <Progress value={product.requiredMembers > 0 ? (product.members / product.requiredMembers) * 100 : 0} className="h-1.5 mt-auto" />
                                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                   <span>{product.members}/{product.requiredMembers} نفر</span>
                                     {product.endDate && isEndingSoon(product.endDate) ? (
                                        <CountdownTimer endDate={product.endDate} size="xs" />
                                    ) : product.endDate ? (
                                         <span className="flex items-center gap-1"> <Clock className="w-3 h-3" /> {`بیش از ${Math.ceil((product.endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} ر`}</span>
                                    ) : null}
                                </div>
                              </CardContent>
                              <CardFooter className="p-3 pt-0">
                                <Button onClick={(e) => { e.preventDefault(); handleJoinClick(product.title); }} size="sm" variant="default" className="w-full text-xs transition-transform hover:scale-105 duration-300">پیوستن</Button>
                              </CardFooter>
                            </Card>
                          </Link>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                     {/* Carousel Arrows - Enhanced Styling */}
                    <CarouselPrevious className="absolute right-[-12px] rtl:left-[-12px] rtl:right-auto top-1/2 -translate-y-1/2 z-10 bg-background/80 border hover:bg-background transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed h-9 w-9 shadow-md"/>
                    <CarouselNext className="absolute left-[-12px] rtl:right-[-12px] rtl:left-auto top-1/2 -translate-y-1/2 z-10 bg-background/80 border hover:bg-background transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed h-9 w-9 shadow-md"/>
                  </Carousel>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


     {/* لیست فروشندگان عمده - بازطراحی شده (کارت کوچک‌تر) */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-secondary-foreground">فروشندگان عمده همکار</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {wholesalers.map((wholesaler) => (
              <Card key={wholesaler.id} className="bg-card p-4 rounded-xl shadow-md border border-border transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex flex-col items-center text-center group aspect-[3/4]"> {/* Adjusted aspect ratio */}
                 <Avatar className="w-16 h-16 mb-3 border-4 border-background shadow-md transition-transform duration-300 group-hover:scale-110">
                  <AvatarImage src={wholesaler.logo} alt={`لوگوی ${wholesaler.name}`} data-ai-hint={wholesaler.aiHint} />
                  <AvatarFallback>{wholesaler.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-sm font-semibold mb-2 text-card-foreground h-10 overflow-hidden flex items-center justify-center flex-grow">{wholesaler.name}</CardTitle>
                 {wholesaler.productHints && wholesaler.productHints.length > 0 && (
                   <div className="flex -space-x-1 rtl:space-x-reverse justify-center mt-auto mb-3"> {/* Moved to bottom */}
                     {wholesaler.productHints.slice(0, 3).map((hint, index) => (
                       <Avatar key={index} className="w-7 h-7 border-2 border-background shadow-sm">
                         <AvatarImage src={`https://picsum.photos/seed/${wholesaler.id}-${index}navy/30/30`} alt={hint} data-ai-hint={hint} />
                         <AvatarFallback className="text-xs">{hint.charAt(0)}</AvatarFallback>
                       </Avatar>
                     ))}
                   </div>
                 )}
                 <Button variant="link" size="sm" className="text-primary hover:text-primary/80 mt-auto text-xs h-6 px-2">
                   مشاهده
                 </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

     {/* Benefits Section */}
      <section className="container mx-auto px-4 py-16 bg-secondary rounded-xl">
        <h2 className="text-3xl font-bold text-center mb-12 text-secondary-foreground">چرا خرید گروهی؟</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Percent, title: "تخفیف‌های ویژه", description: "با افزایش تعداد خریداران، تخفیف‌های بیشتری دریافت کنید.", colorClass: "text-accent" },
            { icon: ShieldCheck, title: "تضمین اصالت", description: "تمامی کالاها دارای تضمین اصالت و کیفیت هستند.", colorClass: "text-green-500" }, // Using explicit green for checkmark
            { icon: Package, title: "تنوع بی‌نظیر", description: "از کالاهای دیجیتال تا مواد غذایی، هر آنچه نیاز دارید را پیدا کنید.", colorClass: "text-primary" },
            { icon: Handshake, title: "خرید مستقیم", description: "ارتباط مستقیم با فروشندگان عمده و تولیدکنندگان.", colorClass: "text-purple-500" } // Added new benefit
          ].map((benefit, index) => (
            <div key={index} className="bg-card p-6 rounded-xl shadow-lg text-center border border-border hover:border-primary transition-all duration-300 transform hover:-translate-y-1.5 group">
               <div className={`relative w-20 h-20 bg-gradient-to-br from-background to-secondary dark:from-card dark:to-secondary/70 rounded-full flex items-center justify-center mx-auto mb-6 transition-transform duration-300 group-hover:scale-110 shadow-md`}>
                 {/* Subtle animated ping effect */}
                 <div className={`absolute inset-0 ${benefit.colorClass.replace('text-', 'bg-')}/20 rounded-full animate-ping group-hover:animate-none opacity-50`}></div>
                 <benefit.icon className={`h-10 w-10 ${benefit.colorClass} relative z-10`} />
               </div>
               <h3 className="font-bold text-xl mb-3 text-card-foreground">{benefit.title}</h3>
               <p className="text-muted-foreground text-sm">{benefit.description}</p>
             </div>
          ))}
        </div>
      </section>

      {/* بخش آمار */}
      <section className="bg-gradient-to-br from-primary to-blue-800 dark:from-primary dark:to-blue-900 text-primary-foreground py-16 my-16 container mx-auto px-4 rounded-xl shadow-xl">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">با ما همراه شوید</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="transition-transform hover:scale-110 duration-300">
              <div className="text-5xl font-bold mb-2">+۲۵,۰۰۰</div>
              <div className="text-primary-foreground/90">کاربر فعال</div>
            </div>
            <div className="transition-transform hover:scale-110 duration-300">
              <div className="text-5xl font-bold mb-2">+۱۸۰</div>
              <div className="text-primary-foreground/90">خرید گروهی موفق</div>
            </div>
            <div className="transition-transform hover:scale-110 duration-300">
              <div className="text-5xl font-bold mb-2">۲۵٪</div>
              <div className="text-primary-foreground/90">میانگین تخفیف</div>
            </div>
            <div className="transition-transform hover:scale-110 duration-300">
              <div className="text-5xl font-bold mb-2">+۵۰</div>
              <div className="text-primary-foreground/90">فروشنده معتبر</div>
            </div>
          </div>
        </div>
      </section>

      {/* خبرنامه */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-secondary rounded-xl p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between shadow-lg border border-border">
          <div className="lg:w-1/2 mb-6 lg:mb-0 text-center lg:text-right">
            <h3 className="text-3xl font-bold mb-3 text-secondary-foreground">از تخفیف‌های ویژه باخبر شوید</h3>
            <p className="text-muted-foreground">با عضویت در خبرنامه ما، از جدیدترین خریدهای گروهی و تخفیف‌های ویژه باخبر شوید.</p>
          </div>
          <form className="w-full lg:w-auto flex max-w-md mx-auto lg:mx-0" onSubmit={(e) => e.preventDefault()}> {/* Added form and prevent default */}
            <Input
              type="email"
              placeholder="ایمیل خود را وارد کنید..."
              className="flex-grow px-4 py-3 rounded-r-lg rounded-l-none border-input focus:outline-none focus:ring-2 focus:ring-primary text-base h-12" // Matched button height
              required // Added required attribute
            />
            <Button type="submit" className="rounded-l-lg rounded-r-none px-6 transition-transform hover:scale-105 duration-300 h-12 shadow-sm">
              عضویت
            </Button>
          </form>
        </div>
      </section>

      <Footer /> {/* Use Footer component */}
    </div>
  );
}
