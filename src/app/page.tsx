
'use client';

import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Users, Clock, ChevronLeft, ChevronRight, Bell, Heart, Truck, Star, Tag, Check, Gift, Percent, ShieldCheck, Package, Globe, Building, Store } from 'lucide-react'; // Import necessary icons
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Progress } from "@/components/ui/progress";
import Image from 'next/image';
import Link from 'next/link'; // Import Link
import Header from '@/components/header'; // Import Header component
import Footer from '@/components/footer'; // Import Footer component
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"; // Import Carousel
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Import Avatar

// تعریف داده‌های نمونه برای خریدهای گروهی
const groupPurchases = [
  {
    id: 1,
    title: 'گوشی سامسونگ Galaxy S24',
    image: 'https://picsum.photos/seed/1/300/200',
    originalPrice: 45000000,
    groupPrice: 39500000,
    discount: 12,
    members: 18,
    requiredMembers: 25,
    remainingTime: '۲ روز',
    category: 'digital',
    isFeatured: true,
    aiHint: 'smartphone samsung galaxy',
    variations: [
        { type: 'رنگ', options: ['مشکی', 'نقره‌ای', 'بنفش', 'کرم'] },
        { type: 'حافظه', options: ['256GB', '512GB'] },
    ],
    recentMembers: [
      { name: 'AR', avatar: 'https://picsum.photos/seed/user10/40/40' },
      { name: 'ZM', avatar: 'https://picsum.photos/seed/user11/40/40' },
      { name: 'HN', avatar: 'https://picsum.photos/seed/user12/40/40' },
      { name: 'FK', avatar: 'https://picsum.photos/seed/user13/40/40' },
      { name: 'MJ', avatar: 'https://picsum.photos/seed/user14/40/40' },
    ],
  },
  {
    id: 2,
    title: 'روغن آفتابگردان لادن ۱ لیتری (بسته ۳ عددی)',
    image: 'https://picsum.photos/seed/2/300/200',
    originalPrice: 580000,
    groupPrice: 435000,
    discount: 25,
    members: 42,
    requiredMembers: 50,
    remainingTime: '۱۲ ساعت',
    category: 'food',
    isIranian: true,
    aiHint: 'sunflower oil bottle', // Changed hint
    isPackage: true,
    packageContents: [
      { name: 'روغن آفتابگردان لادن', quantity: '۱ لیتر' },
      { name: 'روغن آفتابگردان لادن', quantity: '۱ لیتر' },
      { name: 'روغن آفتابگردان لادن', quantity: '۱ لیتر' },
    ],
    recentMembers: [
      { name: 'SA', avatar: 'https://picsum.photos/seed/user20/40/40' },
      { name: 'BN', avatar: 'https://picsum.photos/seed/user21/40/40' },
    ],
  },
  {
    id: 3,
    title: 'ماشین لباسشویی اسنوا ۸ کیلویی',
    image: 'https://picsum.photos/seed/3/300/200',
    originalPrice: 28500000,
    groupPrice: 24225000,
    discount: 15,
    members: 8,
    requiredMembers: 15,
    remainingTime: '۳ روز',
    category: 'home-appliances',
    isIranian: true,
    aiHint: 'washing machine snowa', // Changed hint
    variations: [
        { type: 'رنگ', options: ['سفید', 'نقره‌ای'] },
    ],
    recentMembers: [
      { name: 'GH', avatar: 'https://picsum.photos/seed/user30/40/40' },
      { name: 'KP', avatar: 'https://picsum.photos/seed/user31/40/40' },
      { name: 'LM', avatar: 'https://picsum.photos/seed/user32/40/40' },
    ],
  },
  {
    id: 4,
    title: 'بسته گوشت گوسفندی تازه ۲ کیلویی',
    image: 'https://picsum.photos/seed/4/300/200',
    originalPrice: 1200000,
    groupPrice: 984000,
    discount: 18,
    members: 34,
    requiredMembers: 40,
    remainingTime: '۱ روز',
    category: 'food',
    aiHint: 'lamb meat package', // Changed hint
    isPackage: true,
    packageContents: [
      { name: 'گوشت ران گوسفندی', quantity: '۱ کیلوگرم' },
      { name: 'گوشت سردست گوسفندی', quantity: '۱ کیلوگرم' },
    ],
     recentMembers: [
      { name: 'ER', avatar: 'https://picsum.photos/seed/user40/40/40' },
      { name: 'TY', avatar: 'https://picsum.photos/seed/user41/40/40' },
      { name: 'UI', avatar: 'https://picsum.photos/seed/user42/40/40' },
      { name: 'OP', avatar: 'https://picsum.photos/seed/user43/40/40' },
    ],
  },
    {
    id: 9,
    title: 'گوشی شیائومی Poco X6 Pro',
    image: 'https://picsum.photos/seed/9/300/200',
    originalPrice: 15500000,
    groupPrice: 13800000,
    discount: 11,
    members: 7,
    requiredMembers: 20,
    remainingTime: '۵ روز',
    category: 'digital',
    aiHint: 'smartphone xiaomi poco',
     recentMembers: [
      { name: 'CV', avatar: 'https://picsum.photos/seed/user90/40/40' },
      { name: 'BN', avatar: 'https://picsum.photos/seed/user91/40/40' },
    ],
  },
  {
    id: 5,
    title: 'زعفران درجه یک قائنات ۵ مثقالی',
    image: 'https://picsum.photos/seed/5/300/200',
    originalPrice: 1850000,
    groupPrice: 1480000,
    discount: 20,
    members: 28,
    requiredMembers: 35,
    remainingTime: '۴ روز',
    category: 'food',
    isIranian: true,
    isFeatured: true,
    aiHint: 'saffron spice box', // Changed hint
    recentMembers: [
        { name: 'AS', avatar: 'https://picsum.photos/seed/user50/40/40' },
        { name: 'DF', avatar: 'https://picsum.photos/seed/user51/40/40' },
        { name: 'GH', avatar: 'https://picsum.photos/seed/user52/40/40' },
    ],
  },
  {
    id: 6,
    title: 'تلویزیون ال‌جی ۵۵ اینچ ۴K',
    image: 'https://picsum.photos/seed/6/300/200',
    originalPrice: 38500000,
    groupPrice: 32725000,
    discount: 15,
    members: 12,
    requiredMembers: 20,
    remainingTime: '۲ روز',
    category: 'digital',
    aiHint: 'smart tv lg living room', // Changed hint
    recentMembers: [
        { name: 'ZX', avatar: 'https://picsum.photos/seed/user60/40/40' },
        { name: 'CV', avatar: 'https://picsum.photos/seed/user61/40/40' },
    ],
  },
  {
    id: 7,
    title: 'فرش دستباف کاشان ۹ متری',
    image: 'https://picsum.photos/seed/7/300/200',
    originalPrice: 18500000,
    groupPrice: 14800000,
    discount: 20,
    members: 5,
    requiredMembers: 10,
    remainingTime: '۵ روز',
    category: 'home-decor',
    isIranian: true,
    isFeatured: true,
    aiHint: 'persian carpet detail', // Changed hint
    recentMembers: [
        { name: 'QW', avatar: 'https://picsum.photos/seed/user70/40/40' },
    ],
  },
  {
    id: 8,
    title: 'گز اصفهان درجه یک (جعبه ۱ کیلویی)',
    image: 'https://picsum.photos/seed/8/300/200',
    originalPrice: 950000,
    groupPrice: 760000,
    discount: 20,
    members: 45,
    requiredMembers: 50,
    remainingTime: '۱ روز',
    category: 'food',
    isIranian: true,
    aiHint: 'gaz candy box', // Changed hint
     recentMembers: [
      { name: 'PL', avatar: 'https://picsum.photos/seed/user80/40/40' },
      { name: 'OK', avatar: 'https://picsum.photos/seed/user81/40/40' },
      { name: 'IJ', avatar: 'https://picsum.photos/seed/user82/40/40' },
      { name: 'UH', avatar: 'https://picsum.photos/seed/user83/40/40' },
    ],
  }
];
// Export for use in product detail page and other potential pages
export { groupPurchases };

// تعریف دسته‌بندی‌های محصولات
const categories = [
  { id: 1, name: 'دیجیتال', icon: '📱', slug: 'digital' },
  { id: 2, name: 'مواد غذایی', icon: '🍎', slug: 'food' },
  { id: 3, name: 'لوازم خانگی', icon: '🏠', slug: 'home-appliances' },
  { id: 4, name: 'پوشاک', icon: '👕', slug: 'fashion' },
  { id: 5, name: 'زیبایی و سلامت', icon: '💄', slug: 'beauty-health' },
  { id: 6, name: 'خانه و دکوراسیون', icon: '🛋️', slug: 'home-decor' },
  { id: 7, name: 'ابزار و تجهیزات', icon: '🛠️', slug: 'tools' },
  { id: 8, name: 'سایر', icon: '📦', slug: 'other' }
];

// تخفیف‌های شگفت‌انگیز
const specialOffers = [
  {
    id: 1,
    title: 'جشنواره نوروزی - تخفیف تا ۴۰٪',
    description: 'خرید گروهی محصولات نوروزی با تخفیف فوق‌العاده، فقط تا پایان اسفند',
    image: 'https://picsum.photos/seed/offer1/600/250',
    bgColor: 'bg-green-600',
    aiHint: 'new year sale offer',
  },
  {
    id: 2,
    title: 'محصولات ایرانی - حمایت از تولید ملی',
    description: 'خرید گروهی کالاهای ایرانی با کیفیت و قیمت مناسب',
    image: 'https://picsum.photos/seed/offer2/600/250',
    bgColor: 'bg-blue-600',
    aiHint: 'iranian product support',
  },
  {
    id: 3,
    title: 'صنایع دستی اصیل ایرانی',
    description: 'مجموعه‌ای از بهترین صنایع دستی استان‌های مختلف ایران',
    image: 'https://picsum.photos/seed/offer3/600/250',
    bgColor: 'bg-purple-600',
    aiHint: 'iranian handicraft art',
  }
];

// داده‌های نمونه برای فروشندگان عمده (کارت‌های کوچک‌تر)
const wholesalers = [
  {
    id: 1,
    name: "شرکت پخش بهاران",
    logo: "https://picsum.photos/seed/wholesaler1/100/100",
    aiHint: "food distribution company logo",
    productHints: ['food', 'drink', 'snack'], // Keywords for tiny product images
  },
  {
    id: 2,
    name: "لوازم خانگی مدرن",
    logo: "https://picsum.photos/seed/wholesaler2/100/100",
    aiHint: "home appliance store logo",
    productHints: ['tv', 'fridge', 'washing machine'],
  },
  {
    id: 3,
    name: "پوشاک ایرانیان",
    logo: "https://picsum.photos/seed/wholesaler3/100/100",
    aiHint: "clothing manufacturer logo",
    productHints: ['shirt', 'trousers', 'dress'],
  },
  {
    id: 4,
    name: "دیجیتال پارس",
    logo: "https://picsum.photos/seed/wholesaler4/100/100",
    aiHint: "digital electronics company logo",
    productHints: ['phone', 'laptop', 'headphone'],
  },
    {
    id: 5,
    name: "ابزار یراق مرکزی",
    logo: "https://picsum.photos/seed/wholesaler5/100/100",
    aiHint: "hardware tools supplier logo",
    productHints: ['drill', 'hammer', 'screwdriver'],
  },
    {
    id: 6,
    name: "دکوراسیون داخلی زیبا",
    logo: "https://picsum.photos/seed/wholesaler6/100/100",
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
    logo: "https://picsum.photos/seed/store1/100/100",
    aiHint: "city mega store logo",
    offersInstallments: true, // آیا قسطی می‌فروشد؟
    products: [
      { ...groupPurchases[1], id: 201 }, // Create NEW unique IDs for products within stores
      { ...groupPurchases[3], id: 202 },
      { ...groupPurchases[7], id: 203 },
      { ...groupPurchases[4], id: 204 },
    ],
  },
  {
    id: 102, // Store ID
    name: "هایپر مارکت آفتاب",
    logo: "https://picsum.photos/seed/store2/100/100",
    aiHint: "sun hypermarket logo",
    offersInstallments: false,
    products: [
      { ...groupPurchases[0], id: 301 },
      { ...groupPurchases[5], id: 302 },
      { ...groupPurchases[8], id: 303 },
    ],
  },
  {
    id: 103, // Store ID
    name: "خانه و زندگی لوکس",
    logo: "https://picsum.photos/seed/store3/100/100",
    aiHint: "luxury home living logo",
    offersInstallments: true,
    products: [
      { ...groupPurchases[2], id: 401 },
      { ...groupPurchases[6], id: 402 },
      { ...groupPurchases[4], id: 403 }, // Note: Product ID 4 is used twice, give unique IDs
      { ...groupPurchases[7], id: 404 },
    ],
  },
];
export { stores }; // Export stores data


// تبدیل اعداد به فرمت فارسی با جداکننده هزارگان
const formatNumber = (num:number | undefined) => {
  if (num === undefined || num === null) return '';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('همه');
  const [featuredItems, setFeaturedItems] = useState(groupPurchases);
  const { toast } = useToast(); // Initialize useToast

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

  const filteredItems = activeCategory === 'همه'
    ? featuredItems
    : featuredItems.filter(item => item.category === categories.find(cat => cat.name === activeCategory)?.slug);


  const getCategoryNameBySlug = (slug: string | undefined) => {
    return categories.find(cat => cat.slug === slug)?.name || slug;
  }

  return (
    <div dir="rtl" className="font-['Vazirmatn'] bg-background min-h-screen text-foreground">
      <Header /> {/* Use Header component */}

      {/* بنر اصلی */}
      <div className="bg-gradient-to-r from-blue-600 to-green-500 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2 mb-8 md:mb-0 text-center md:text-right animate-fade-in-right">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">با هم بخرید و تخفیف بگیرید!</h1>
              <p className="text-lg lg:text-xl mb-8 text-blue-100">با پیوستن به خریدهای گروهی، از تخفیف‌های ویژه بهره‌مند شوید. هرچه تعداد بیشتر، قیمت کمتر!</p>
              <div className="flex justify-center md:justify-start space-x-4 rtl:space-x-reverse">
                <Button size="lg" variant="secondary" className="transition-transform hover:scale-105 duration-300">
                  شروع خرید گروهی
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 transition-transform hover:scale-105 duration-300">
                  راهنمای خرید
                </Button>
              </div>
              <div className="flex items-center justify-center md:justify-start mt-10 text-sm">
                <div className="flex items-center ml-6 rtl:mr-6">
                  <Check className="h-5 w-5 ml-1 rtl:mr-1 text-yellow-300" />
                  <span>تضمین اصالت کالا</span>
                </div>
                <div className="flex items-center ml-6 rtl:mr-6">
                  <Check className="h-5 w-5 ml-1 rtl:mr-1 text-yellow-300" />
                  <span>پرداخت امن</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 ml-1 rtl:mr-1 text-yellow-300" />
                  <span>ارسال سریع</span>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center animate-fade-in-left">
              <Image src="https://picsum.photos/500/350" width={500} height={350} alt="خرید گروهی" className="rounded-lg shadow-2xl" data-ai-hint="group shopping people illustration"/>
            </div>
          </div>
        </div>
      </div>

      {/* نوار کمپین */}
      <div className="bg-destructive text-destructive-foreground py-3 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-3 md:mb-0 animate-pulse">
              <Gift className="h-6 w-6 ml-2 rtl:mr-2" />
              <span className="text-lg font-bold">جشنواره خرید کالای ایرانی با تخفیف ویژه تا ۴۰٪</span>
            </div>
            <div className="flex items-center">
              <span className="ml-3 rtl:mr-3 text-sm">فقط تا پایان هفته</span>
              <Button variant="secondary" size="sm" className="transition-transform hover:scale-105 duration-300">
                مشاهده پیشنهادات
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* تخفیف‌های شگفت‌انگیز */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">تخفیف‌های شگفت‌انگیز</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {specialOffers.map(offer => (
            <div key={offer.id} className={`${offer.bgColor} rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 text-white group`}>
              <div className="relative h-48">
                <Image src={offer.image} layout="fill" objectFit="cover" alt={offer.title} className="transition-transform duration-500 group-hover:scale-110" data-ai-hint={offer.aiHint} />
                <div className="absolute inset-0 flex flex-col justify-end items-start p-6 bg-gradient-to-t from-black/70 to-transparent">
                  <h3 className="font-bold text-xl mb-2">{offer.title}</h3>
                  <p className="text-sm mb-4 line-clamp-2">{offer.description}</p>
                  <Button variant="outline" className="mt-auto border-white text-white hover:bg-white hover:text-current transition-transform hover:scale-105 duration-300">
                    مشاهده جزئیات
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* دسته‌بندی‌ها */}
      <div className="container mx-auto px-4 py-12 bg-secondary rounded-xl">
        <h2 className="text-3xl font-bold mb-8 text-center text-secondary-foreground">دسته‌بندی‌های محبوب</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map(category => (
            <Link href={`/category/${category.slug}`} key={category.id} className="bg-card rounded-xl shadow-md p-4 flex flex-col items-center justify-center cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105 aspect-square group">
              <div className="text-4xl mb-3 transition-transform duration-300 group-hover:scale-125">{category.icon}</div>
              <div className="text-sm font-medium text-card-foreground text-center group-hover:text-primary transition-colors duration-300">{category.name}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* محصولات ایرانی برتر */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="bg-card rounded-lg p-6 shadow-lg border border-border">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
              <div className="flex items-center mb-4 sm:mb-0">
                <Image src="https://picsum.photos/seed/iranflag/50/50" width={50} height={50} alt="پرچم ایران" className="w-10 h-10 rounded-full ml-3 rtl:mr-3 shadow-md" data-ai-hint="iran flag" />
                <h2 className="text-3xl font-bold text-card-foreground">محصولات ایرانی برتر</h2>
              </div>
              <Link href="/iranian-products" className="text-primary hover:text-primary/80 text-sm font-medium flex items-center transition-colors duration-300 group">
                مشاهده همه
                <ChevronLeft className="h-4 w-4 mr-1 rtl:ml-1 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {groupPurchases.filter(item => item.isIranian).slice(0, 4).map(item => (
                <Link href={`/product/${item.id}`} key={item.id}> {/* Added Link */}
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-card border group cursor-pointer"> {/* Added cursor-pointer */}
                    <CardHeader className="p-0 relative aspect-[4/3]">
                        <Image src={item.image} width={300} height={225} alt={item.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint={item.aiHint}/>
                        <Badge variant="destructive" className="absolute top-2 right-2">
                          {item.discount}٪ تخفیف
                        </Badge>
                        <Badge variant="secondary" className="absolute top-2 left-2 flex items-center">
                           <Image src="https://picsum.photos/seed/iranflag/20/20" width={20} height={20} alt="پرچم ایران" className="w-3 h-3 rounded-full mr-1 rtl:ml-1" data-ai-hint="iran flag" />
                           ایران
                        </Badge>
                        <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-end">
                            <Button size="sm" variant="default" className="h-8 px-3 text-xs">افزودن به سبد</Button>
                        </div>
                     </CardHeader>
                     <CardContent className="p-4">
                        <h3 className="font-semibold text-card-foreground mb-2 text-base h-14 overflow-hidden">{item.title}</h3>
                        <div className="flex justify-between text-sm items-center text-muted-foreground mb-3">
                          <div className="flex items-center">
                             <Users className="h-4 w-4 ml-1 rtl:mr-1" />
                             <span>{item.members}/{item.requiredMembers}</span>
                          </div>
                           <span className="text-primary font-bold text-lg">{formatNumber(item.groupPrice)} <span className="text-xs">تومان</span></span>
                        </div>
                         <Button variant="outline" size="sm" className="w-full transition-transform hover:scale-105 duration-300">مشاهده و پیوستن</Button>
                     </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

     {/* درخواست‌های خرید گروهی */}
      <div className="bg-secondary py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-secondary-foreground mb-4 sm:mb-0">درخواست‌های خرید گروهی</h2>
            <Button variant="default" className="transition-transform hover:scale-105 duration-300">
                ایجاد درخواست جدید
             </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {groupPurchases.slice(4, 8).map(item => (
              <Link href={`/product/${item.id}`} key={item.id}> {/* Added Link */}
                <Card className="bg-card rounded-lg shadow-md overflow-hidden border border-border hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer"> {/* Added cursor-pointer */}
                  <CardHeader className="p-0 relative aspect-[4/3]">
                     <Image src={item.image} width={300} height={225} alt={item.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint={item.aiHint} />
                    <Badge variant="destructive" className="absolute top-2 right-2">
                      {item.discount}٪ تخفیف
                    </Badge>
                     <Badge variant="outline" className="absolute top-2 left-2 bg-background/80">
                      {getCategoryNameBySlug(item.category)}
                    </Badge>
                    {item.isIranian && (
                      <Badge variant="secondary" className="absolute top-10 right-2 flex items-center">
                        <Image src="https://picsum.photos/seed/iranflag/20/20" width={20} height={20} alt="پرچم ایران" className="w-3 h-3 rounded-full ml-1 rtl:mr-1" data-ai-hint="iran flag" />
                        تولید ایران
                      </Badge>
                    )}
                    {item.isFeatured && (
                      <Badge variant="default" className="absolute bottom-2 right-2 bg-yellow-500 text-white flex items-center shadow-md">
                        <Star className="w-3 h-3 ml-1 rtl:mr-1 fill-current" />
                        پیشنهاد ویژه
                      </Badge>
                    )}
                    <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-end">
                        <Button size="sm" variant="default" className="h-8 px-3 text-xs">افزودن به سبد</Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-card-foreground mb-2 text-lg h-14 overflow-hidden">{item.title}</h3>
                    <div className="flex justify-between items-baseline mb-3">
                      <div className="text-muted-foreground line-through text-sm">{formatNumber(item.originalPrice)} <span className="text-xs">تومان</span></div>
                      <div className="text-primary font-bold text-xl">{formatNumber(item.groupPrice)} <span className="text-xs">تومان</span></div>
                    </div>
                     {/* Package Contents Display */}
                    {item.isPackage && item.packageContents && (
                      <div className="my-3 border-t border-border pt-3">
                        <p className="text-xs font-semibold mb-1 text-muted-foreground">محتویات بسته:</p>
                        <ul className="list-disc list-inside text-xs text-muted-foreground space-y-0.5 pr-4"> {/* Added pr-4 for RTL list */}
                          {item.packageContents.map((content, index) => (
                            <li key={index}>
                              {content.name} ({content.quantity})
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm text-muted-foreground mb-1">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 ml-1 rtl:mr-1" />
                          <span>{item.members} / {item.requiredMembers} نفر</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 ml-1 rtl:mr-1" />
                          <span>{item.remainingTime}</span>
                        </div>
                      </div>

                      <Progress value={(item.members / item.requiredMembers) * 100} className="h-2" />
                    </div>
                   </CardContent>
                   <CardFooter className="p-4 pt-0">
                        <Button onClick={(e) => { e.preventDefault(); handleJoinClick(item.title); }} variant="default" className="w-full flex items-center justify-center transition-transform hover:scale-105 duration-300"> {/* Prevent navigation and handle click */}
                          <ShoppingCart className="h-4 w-4 ml-2 rtl:mr-2" />
                          پیوستن به گروه
                        </Button>
                   </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <Button variant="outline" className="transition-transform hover:scale-105 duration-300">
              مشاهده همه درخواست‌ها
            </Button>
          </div>
        </div>
      </div>

      {/* نمایش فروشگاه‌ها و محصولاتشان */}
       <div className="bg-background py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">ویترین فروشگاه‌ها</h2>
          <div className="space-y-12">
            {stores.map((store) => (
              <Card key={store.id} className="bg-card border border-border shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
                <CardHeader className="flex flex-col sm:flex-row items-center gap-4 p-6 bg-secondary/50 border-b border-border">
                  <Avatar className="w-16 h-16 border-4 border-background shadow-md">
                    <AvatarImage src={store.logo} alt={`لوگوی ${store.name}`} data-ai-hint={store.aiHint} />
                    <AvatarFallback>{store.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="text-center sm:text-right flex-grow">
                    <CardTitle className="text-2xl font-bold text-card-foreground">{store.name}</CardTitle>
                    {store.offersInstallments && (
                      <Badge variant="default" className="mt-2 bg-green-600 hover:bg-green-700">
                        فروش اقساطی
                      </Badge>
                    )}
                  </div>
                  <Button variant="outline" size="sm" className="transition-transform hover:scale-105 duration-300 mt-4 sm:mt-0">
                    مشاهده فروشگاه
                    <Store className="mr-2 h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold mb-4 text-muted-foreground">محصولات منتخب برای خرید گروهی:</h4>
                  <Carousel
                    opts={{
                      align: "start",
                      direction: "rtl", // Set carousel direction to RTL
                      loop: true, // Enable loop for continuous scrolling
                    }}
                    className="w-full relative" // Add relative for positioning arrows
                  >
                    <CarouselContent className="-ml-4 rtl:-mr-4">
                      {store.products.map((product) => (
                        <CarouselItem key={product.id} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 pl-4 rtl:pr-4">
                          <Link href={`/product/${product.id}`}> {/* Added Link */}
                            <Card className="overflow-hidden h-full flex flex-col border group transition-all duration-300 hover:border-primary hover:shadow-md cursor-pointer"> {/* Added cursor-pointer */}
                              <CardHeader className="p-0 relative aspect-[4/3]">
                                <Image src={product.image} width={300} height={225} alt={product.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint={product.aiHint}/>
                                <Badge variant="destructive" className="absolute top-2 right-2">
                                  {product.discount}٪ تخفیف
                                </Badge>
                                {product.isFeatured && (
                                  <Badge variant="default" className="absolute bottom-2 right-2 bg-yellow-500 text-white flex items-center shadow-md text-xs px-1.5 py-0.5">
                                    <Star className="w-2.5 h-2.5 ml-1 rtl:mr-1 fill-current" />
                                    ویژه
                                  </Badge>
                                )}
                                <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-end">
                                    <Button size="sm" variant="default" className="h-7 px-2 text-xs">افزودن</Button>
                                </div>
                              </CardHeader>
                              <CardContent className="p-3 flex-grow flex flex-col">
                                <h5 className="font-semibold text-sm mb-1 h-10 overflow-hidden flex-grow">{product.title}</h5>
                                <div className="flex justify-between items-baseline text-xs mb-2 mt-1">
                                  <span className="text-muted-foreground line-through">{formatNumber(product.originalPrice)}</span>
                                  <span className="text-primary font-bold">{formatNumber(product.groupPrice)} <span className="text-xs">تومان</span></span>
                                </div>
                                <Progress value={product.requiredMembers > 0 ? (product.members / product.requiredMembers) * 100 : 0} className="h-1.5 mt-auto" />
                                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                  <span>{product.members}/{product.requiredMembers} نفر</span>
                                  <span>{product.remainingTime}</span>
                                </div>
                              </CardContent>
                              <CardFooter className="p-3 pt-0">
                                <Button onClick={(e) => { e.preventDefault(); handleJoinClick(product.title); }} size="sm" variant="default" className="w-full text-xs transition-transform hover:scale-105 duration-300">پیوستن</Button> {/* Prevent navigation */}
                              </CardFooter>
                            </Card>
                          </Link>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                     {/* Carousel Arrows - Enhanced Styling */}
                    <CarouselPrevious className="absolute right-[-10px] rtl:left-[-10px] rtl:right-auto top-1/2 -translate-y-1/2 z-10 bg-background/80 border-border hover:bg-background transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed h-8 w-8"/> {/* Adjusted left/right for RTL */}
                    <CarouselNext className="absolute left-[-10px] rtl:right-[-10px] rtl:left-auto top-1/2 -translate-y-1/2 z-10 bg-background/80 border-border hover:bg-background transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed h-8 w-8"/> {/* Adjusted left/right for RTL */}
                  </Carousel>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>


     {/* لیست فروشندگان عمده - بازطراحی شده (کارت کوچک‌تر) */}
      <div className="bg-secondary py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-secondary-foreground">فروشندگان عمده همکار</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {wholesalers.map((wholesaler) => (
              <Card key={wholesaler.id} className="bg-card p-4 rounded-xl shadow-md border border-border transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex flex-col items-center text-center group">
                 <Avatar className="w-16 h-16 mb-3 border-4 border-background shadow-md transition-transform duration-300 group-hover:scale-110">
                  <AvatarImage src={wholesaler.logo} alt={`لوگوی ${wholesaler.name}`} data-ai-hint={wholesaler.aiHint} />
                  <AvatarFallback>{wholesaler.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-sm font-semibold mb-2 text-card-foreground h-10 overflow-hidden flex items-center justify-center">{wholesaler.name}</CardTitle>
                 {/* Tiny Product Image Placeholders */}
                 {wholesaler.productHints && wholesaler.productHints.length > 0 && (
                   <div className="flex -space-x-1 rtl:space-x-reverse justify-center mt-1 mb-3">
                     {wholesaler.productHints.slice(0, 3).map((hint, index) => (
                       <Avatar key={index} className="w-6 h-6 border border-background shadow-sm">
                         {/* Use a placeholder service or a generic icon */}
                         <AvatarImage src={`https://picsum.photos/seed/${wholesaler.id}-${index}/30/30`} alt={hint} data-ai-hint={hint} />
                         <AvatarFallback>{hint.charAt(0)}</AvatarFallback>
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
      </div>


      {/* خریدهای گروهی فعال */}
      <div className="bg-background py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
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

          <div className="flex space-x-4 rtl:space-x-reverse mb-10 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-muted scrollbar-track-secondary">
            <Button
              variant={activeCategory === 'همه' ? 'default' : 'outline'}
              onClick={() => setActiveCategory('همه')}
              className="whitespace-nowrap transition-transform hover:scale-105 duration-300" // Animation
            >
              همه
            </Button>
            {categories.map(category => (
              <Button
                key={category.id}
                variant={activeCategory === category.name ? 'default' : 'outline'}
                onClick={() => setActiveCategory(category.name)}
                className="whitespace-nowrap transition-transform hover:scale-105 duration-300" // Animation
              >
                {category.name}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredItems.map(item => (
              <Link href={`/product/${item.id}`} key={item.id}> {/* Added Link */}
                <Card className="bg-card rounded-lg shadow-md overflow-hidden border border-border hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer"> {/* Added cursor-pointer */}
                   <CardHeader className="p-0 relative aspect-[4/3]">
                    <Image src={item.image} width={300} height={225} alt={item.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint={item.aiHint} />
                    <Badge variant="destructive" className="absolute top-2 right-2">
                      {item.discount}٪ تخفیف
                    </Badge>
                     <Badge variant="outline" className="absolute top-2 left-2 bg-background/80">
                      {getCategoryNameBySlug(item.category)}
                    </Badge>
                    {item.isIranian && (
                       <Badge variant="secondary" className="absolute top-10 right-2 flex items-center">
                        <Image src="https://picsum.photos/seed/iranflag/20/20" width={20} height={20} alt="پرچم ایران" className="w-3 h-3 rounded-full ml-1 rtl:mr-1" data-ai-hint="iran flag" />
                        تولید ایران
                      </Badge>
                    )}
                    {item.isFeatured && (
                      <Badge variant="default" className="absolute bottom-2 right-2 bg-yellow-500 text-white flex items-center shadow-md">
                        <Star className="w-3 h-3 ml-1 rtl:mr-1 fill-current" />
                        پیشنهاد ویژه
                      </Badge>
                    )}
                     <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-end">
                         <Button size="sm" variant="default" className="h-8 px-3 text-xs">افزودن به سبد</Button>
                     </div>
                   </CardHeader>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-card-foreground mb-2 text-lg h-14 overflow-hidden">{item.title}</h3>
                    <div className="flex justify-between items-baseline mb-3">
                      <div className="text-muted-foreground line-through text-sm">{formatNumber(item.originalPrice)} <span className="text-xs">تومان</span></div>
                      <div className="text-primary font-bold text-xl">{formatNumber(item.groupPrice)} <span className="text-xs">تومان</span></div>
                    </div>
                     {/* Package Contents Display */}
                     {item.isPackage && item.packageContents && (
                      <div className="my-3 border-t border-border pt-3">
                        <p className="text-xs font-semibold mb-1 text-muted-foreground">محتویات بسته:</p>
                        <ul className="list-disc list-inside text-xs text-muted-foreground space-y-0.5 pr-4"> {/* Added pr-4 */}
                          {item.packageContents.map((content, index) => (
                            <li key={index}>
                              {content.name} ({content.quantity})
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm text-muted-foreground mb-1">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 ml-1 rtl:mr-1" />
                          <span>{item.members} / {item.requiredMembers} نفر</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 ml-1 rtl:mr-1" />
                          <span>{item.remainingTime}</span>
                        </div>
                      </div>

                      <Progress value={item.requiredMembers > 0 ? (item.members / item.requiredMembers) * 100 : 0} className="h-2" />
                    </div>
                   </CardContent>
                   <CardFooter className="p-4 pt-0">
                        <Button onClick={(e) => { e.preventDefault(); handleJoinClick(item.title); }} variant="default" className="w-full flex items-center justify-center transition-transform hover:scale-105 duration-300"> {/* Prevent navigation */}
                          <ShoppingCart className="h-4 w-4 ml-2 rtl:mr-2" />
                          پیوستن به گروه
                        </Button>
                   </CardFooter>
                </Card>
              </Link>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <Button variant="outline" className="transition-transform hover:scale-105 duration-300">
              مشاهده همه خریدهای گروهی
            </Button>
          </div>
        </div>
      </div>

     {/* Benefits Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">چرا خرید گروهی؟</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Percent, title: "تخفیف‌های ویژه", description: "با افزایش تعداد خریداران، تخفیف‌های بیشتری دریافت کنید.", color: "blue" },
            { icon: ShieldCheck, title: "تضمین اصالت", description: "تمامی کالاها دارای تضمین اصالت و کیفیت هستند.", color: "green" },
            { icon: Package, title: "تنوع بی‌نظیر", description: "از کالاهای دیجیتال تا مواد غذایی، هر آنچه نیاز دارید را پیدا کنید.", color: "yellow" },
            { icon: Globe, title: "حمایت از تولید ملی", description: "با خرید کالاهای ایرانی، به اقتصاد کشور کمک کنید.", color: "red" }
          ].map((benefit, index) => (
            <div key={index} className="bg-card p-6 rounded-xl shadow-lg text-center border border-border hover:border-primary transition-all duration-300 transform hover:-translate-y-1 group">
              <div className={`relative w-20 h-20 bg-${benefit.color}-100 dark:bg-${benefit.color}-900/50 rounded-full flex items-center justify-center mx-auto mb-6 transition-transform duration-300 group-hover:scale-110 shadow-md`}>
                <div className={`absolute inset-0 bg-${benefit.color}-500 opacity-10 rounded-full animate-ping group-hover:animate-none`}></div>
                <benefit.icon className={`h-10 w-10 text-${benefit.color}-600 dark:text-${benefit.color}-400 relative z-10`} />
              </div>
              <h3 className="font-bold text-xl mb-3 text-card-foreground">{benefit.title}</h3>
              <p className="text-muted-foreground text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* بخش آمار */}
      <div className="bg-gradient-to-br from-blue-700 to-primary text-white py-16 rounded-lg my-12 container mx-auto px-4 shadow-xl">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">با ما همراه شوید</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="transition-transform hover:scale-110 duration-300">
              <div className="text-5xl font-bold mb-2">+۲۵,۰۰۰</div>
              <div className="text-blue-200">کاربر فعال</div>
            </div>
            <div className="transition-transform hover:scale-110 duration-300">
              <div className="text-5xl font-bold mb-2">+۱۸۰</div>
              <div className="text-blue-200">خرید گروهی موفق</div>
            </div>
            <div className="transition-transform hover:scale-110 duration-300">
              <div className="text-5xl font-bold mb-2">۲۵٪</div>
              <div className="text-blue-200">میانگین تخفیف</div>
            </div>
            <div className="transition-transform hover:scale-110 duration-300">
              <div className="text-5xl font-bold mb-2">+۵۰</div>
              <div className="text-blue-200">فروشنده معتبر</div>
            </div>
          </div>
        </div>
      </div>

      {/* خبرنامه */}
      <div className="container mx-auto px-4 py-12">
        <div className="bg-secondary rounded-xl p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between shadow-lg border border-border">
          <div className="lg:w-1/2 mb-6 lg:mb-0 text-center lg:text-right">
            <h3 className="text-3xl font-bold mb-3 text-secondary-foreground">از تخفیف‌های ویژه باخبر شوید</h3>
            <p className="text-muted-foreground">با عضویت در خبرنامه ما، از جدیدترین خریدهای گروهی و تخفیف‌های ویژه باخبر شوید.</p>
          </div>
          <div className="w-full lg:w-auto flex max-w-md mx-auto lg:mx-0">
            <Input
              type="email"
              placeholder="ایمیل خود را وارد کنید..."
              className="flex-grow px-4 py-3 rounded-r-lg rounded-l-none border-border focus:outline-none focus:ring-2 focus:ring-primary text-base"
            />
            <Button className="rounded-l-lg rounded-r-none px-6 transition-transform hover:scale-105 duration-300">
              عضویت
            </Button>
          </div>
        </div>
      </div>

      <Footer /> {/* Use Footer component */}
    </div>
  );
}

